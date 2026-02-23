const PAYMOB_BASE_URL = 'https://accept.paymob.com/api'

interface PaymobOrderItem {
    name: string;
    amount_cents: number;
    description?: string;
    quantity: number;
}

interface PaymobBillingData {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    city?: string;
    street?: string;
}

export async function getPaymobToken() {
    const res = await fetch(`${PAYMOB_BASE_URL}/auth/tokens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: process.env.PAYMOB_API_KEY })
    })
    const data = await res.json()
    return data.token
}

export async function registerPaymobOrder(token: string, amount_cents: number, items: PaymobOrderItem[]) {
    const res = await fetch(`${PAYMOB_BASE_URL}/ecommerce/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            auth_token: token,
            delivery_needed: "false",
            amount_cents: amount_cents.toString(),
            currency: "EGP",
            items: items
        })
    })
    const data = await res.json()
    return data.id
}

export async function getPaymentKey(token: string, orderId: string, amount_cents: number, billingData: PaymobBillingData) {
    const res = await fetch(`${PAYMOB_BASE_URL}/acceptance/payment_keys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            auth_token: token,
            amount_cents: amount_cents.toString(),
            expiration: 3600,
            order_id: orderId,
            billing_data: {
                apartment: "NA",
                email: billingData.email || "test@test.com",
                floor: "NA",
                first_name: billingData.first_name || "Guest",
                street: billingData.street || "NA",
                building: "NA",
                phone_number: billingData.phone_number || "0123456789",
                shipping_method: "PKG",
                postal_code: "NA",
                city: billingData.city || "Cairo",
                country: "EG",
                last_name: billingData.last_name || "User",
                state: "NA"
            },
            currency: "EGP",
            integration_id: process.env.PAYMOB_INTEGRATION_ID,
            lock_order_when_paid: "false"
        })
    })
    const data = await res.json()
    return data.token
}
