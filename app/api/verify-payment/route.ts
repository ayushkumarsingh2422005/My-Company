import { NextResponse } from 'next/server'
import crypto from 'crypto'
import Transaction from '@/app/models/Transiction'
import dbConnect from '@/app/lib/mongodb'

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET
if (!RAZORPAY_KEY_SECRET) {
    throw new Error('RAZORPAY_KEY_SECRET is not configured')
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {
            paymentId,
            orderId,
            signature,
            name,
            email,
            phone,
            address,
            amount,
            reason,
            projectDetails,
        } = body

        // Validate required fields
        if (!paymentId || !orderId || !signature || !name || !email || !amount) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Verify Razorpay signature
        const text = orderId + '|' + paymentId
        const generated_signature = crypto
            .createHmac('sha256', RAZORPAY_KEY_SECRET as string)
            .update(text)
            .digest('hex')

        if (generated_signature !== signature) {
            return NextResponse.json(
                { success: false, message: 'Invalid signature' },
                { status: 400 }
            )
        }

        // Connect to database
        await dbConnect()

        // Create transaction record
        const transaction = await Transaction.create({
            name,
            email,
            phone,
            address,
            amount,
            reason,
            projectDetails,
            paymentId,
            orderId,
            status: 'completed',
        })

        return NextResponse.json({
            success: true,
            transactionId: transaction._id,
            detailsUrl: `/pay/${transaction._id}` // URL where they can view their transaction details
        })
    } catch (error) {
        console.error('Error verifying payment:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to verify payment' },
            { status: 500 }
        )
    }
} 