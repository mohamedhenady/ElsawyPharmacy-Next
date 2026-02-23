import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import * as XLSX from 'xlsx'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const workbook = XLSX.read(buffer, { type: 'buffer' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const rows = XLSX.utils.sheet_to_json(sheet) as any[]

        const results = {
            success: 0,
            failed: 0,
            errors: [] as string[],
        }

        for (const row of rows) {
            try {
                const {
                    sku,
                    name_en,
                    name_ar,
                    price,
                    category: categoryName,
                    subcategory: subcategoryName,
                    image_url,
                    description,
                } = row

                if (!sku || !name_en || !name_ar || !price || !categoryName) {
                    throw new Error(`Missing required fields for SKU: ${sku || 'Unknown'}`)
                }

                // 1. Find or create Category
                let category = await prisma.category.findFirst({
                    where: {
                        OR: [{ nameEn: categoryName }, { nameAr: categoryName }],
                    },
                })

                if (!category) {
                    const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cat-${Date.now()}`
                    category = await prisma.category.create({
                        data: {
                            nameEn: categoryName,
                            nameAr: categoryName,
                            slug,
                        },
                    })
                }

                // 2. Find or create Subcategory if exists
                let subcategoryId = null
                if (subcategoryName) {
                    let subcategory = await prisma.category.findFirst({
                        where: {
                            AND: [
                                { parentId: category.id },
                                { OR: [{ nameEn: subcategoryName }, { nameAr: subcategoryName }] },
                            ],
                        },
                    })

                    if (!subcategory) {
                        const subSlug = subcategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `sub-${Date.now()}`
                        subcategory = await prisma.category.create({
                            data: {
                                nameEn: subcategoryName,
                                nameAr: subcategoryName,
                                slug: subSlug,
                                parentId: category.id,
                            },
                        })
                    }
                    subcategoryId = subcategory.id
                }

                // 3. Create or Update Product
                await prisma.product.upsert({
                    where: { sku: sku.toString() },
                    update: {
                        nameEn: name_en,
                        nameAr: name_ar,
                        price: parseFloat(price),
                        imageUrl: image_url || null,
                        description: description || null,
                        categoryId: category.id,
                        subcategoryId,
                    },
                    create: {
                        sku: sku.toString(),
                        nameEn: name_en,
                        nameAr: name_ar,
                        price: parseFloat(price),
                        imageUrl: image_url || null,
                        description: description || null,
                        categoryId: category.id,
                        subcategoryId,
                    },
                })

                results.success++
            } catch (err: any) {
                results.failed++
                results.errors.push(err.message)
            }
        }

        return NextResponse.json({
            message: 'Import completed',
            ...results,
        })
    } catch (error) {
        console.error('Import Error:', error)
        return NextResponse.json({ error: 'Failed to process import' }, { status: 500 })
    }
}
