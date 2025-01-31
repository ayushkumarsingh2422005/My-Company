import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Transaction } from '@/app/types/transaction'

export const generateReceipt = (transaction: Transaction) => {
    try {
        const doc = new jsPDF()
        
        // Add company header
        doc.setFontSize(24)
        doc.setTextColor(123, 49, 255) // Purple color
        doc.text('DigiCraft Solutions', 15, 25)
        
        // Add company address
        doc.setFontSize(9)
        doc.setTextColor(100)
        doc.text([
            'Jamui, Chunar',
            'Mirzapur, Uttar Pradesh - 231304',
            'India',
            'Email: support@digicraft.one',
            'Website: www.digicraft.one'
        ], 15, 35)

        // Add receipt title and number
        doc.setFontSize(16)
        doc.setTextColor(123, 49, 255)
        doc.text('PAYMENT RECEIPT', doc.internal.pageSize.width - 15, 25, { align: 'right' })
        
        // Add receipt details in a box
        doc.setDrawColor(123, 49, 255)
        doc.setFillColor(245, 245, 255)
        doc.roundedRect(doc.internal.pageSize.width - 90, 30, 75, 25, 2, 2, 'FD')
        
        doc.setFontSize(9)
        doc.setTextColor(60, 60, 60)
        doc.text([
            `Receipt No: ${transaction._id}`,
            `Date: ${new Date(transaction.createdAt).toLocaleString('en-IN')}`,
            `Status: ${(transaction.status || '').toUpperCase()}`
        ], doc.internal.pageSize.width - 85, 37)

        // Add divider
        doc.setDrawColor(200, 200, 200)
        doc.line(15, 65, doc.internal.pageSize.width - 15, 65)
        
        // Add customer details
        autoTable(doc, {
            startY: 75,
            head: [
                [{ content: 'Customer Details', colSpan: 2, styles: { fillColor: [123, 49, 255] } }]
            ],
            body: [
                ['Name', transaction.name || ''],
                ['Email', transaction.email || ''],
                ['Phone', transaction.phone || ''],
                ['Address', transaction.address ? 
                    `${transaction.address.street}, ${transaction.address.city}, ${transaction.address.state} - ${transaction.address.pincode}, ${transaction.address.country}` 
                    : ''
                ]
            ],
            theme: 'grid',
            headStyles: { 
                fontSize: 11,
                halign: 'left',
                textColor: [255, 255, 255]
            },
            styles: {
                fontSize: 9,
                cellPadding: 5,
                lineColor: [220, 220, 220]
            },
            columnStyles: {
                0: { cellWidth: 40, fontStyle: 'bold', textColor: [80, 80, 80] },
                1: { cellWidth: 'auto', textColor: [60, 60, 60] }
            },
            margin: { bottom: 10 }
        })
        
        // Add payment details with fixed position
        autoTable(doc, {
            startY: 140, // Fixed position with enough space for customer details
            head: [
                [{ content: 'Payment Details', colSpan: 2, styles: { fillColor: [123, 49, 255] } }]
            ],
            body: [
                ['Amount', new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 2
                }).format(transaction.amount || 0)],
                ['Payment ID', transaction.paymentId || ''],
                ['Order ID', transaction.orderId || ''],
                ['Reason', transaction.reason || ''],
                ['Project Details', transaction.projectDetails || 'Not provided']
            ],
            theme: 'grid',
            headStyles: { 
                fontSize: 11,
                halign: 'left',
                textColor: [255, 255, 255]
            },
            styles: {
                fontSize: 9,
                cellPadding: 5,
                lineColor: [220, 220, 220]
            },
            columnStyles: {
                0: { cellWidth: 40, fontStyle: 'bold', textColor: [80, 80, 80] },
                1: { cellWidth: 'auto', textColor: [60, 60, 60] }
            },
        })
        
        // Add footer
        const pageHeight = doc.internal.pageSize.height
        doc.setDrawColor(123, 49, 255)
        doc.setFillColor(245, 245, 255)
        doc.roundedRect(15, pageHeight - 35, doc.internal.pageSize.width - 30, 25, 2, 2, 'FD')
        
        doc.setFontSize(8)
        doc.setTextColor(80, 80, 80)
        doc.text([
            'This is a computer-generated receipt and does not require a signature.',
            'For any queries, please contact support@digicraft.one',
            'Thank you for your business!'
        ], doc.internal.pageSize.width / 2, pageHeight - 25, { align: 'center' })
        
        // Save the PDF
        doc.save(`DigiCraft-Receipt-${transaction._id}.pdf`)
    } catch (error) {
        console.error('Error generating receipt:', error)
        throw new Error('Failed to generate receipt')
    }
} 