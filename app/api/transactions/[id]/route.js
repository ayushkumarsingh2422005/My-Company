import { NextResponse } from 'next/server'
import Transaction from '@/app/models/Transiction'
import dbConnect from '@/app/lib/mongodb'

export async function GET(){
  try {
    await dbConnect()

    const transaction = await Transaction.findById(params.id)
    if (!transaction) {
      return NextResponse.json(
        { success: false, message: 'Transaction not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      transaction,
    })
  } catch (error) {
    console.error('Error fetching transaction:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch transaction' },
      { status: 500 }
    )
  }
} 