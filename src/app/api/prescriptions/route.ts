import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fullName, phone, address, notes, imageUrl, userId } = body;

        if (!fullName || !phone || !address || !imageUrl) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const prescription = await prisma.prescription.create({
            data: {
                fullName,
                phone,
                address,
                notes,
                imageUrl,
                userId: userId || null,
            },
        });

        return NextResponse.json(
            { message: 'Prescription uploaded successfully', prescription },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating prescription:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
