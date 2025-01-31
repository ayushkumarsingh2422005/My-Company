import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
// import { Transaction } from '@/app/models/Transiction'

export const generateReceipt = (transaction: any) => {
    const doc = new jsPDF()
    
    // Add logo
    const logoUrl = '/logo.svg' // Make sure to add your logo in public folder
    doc.addImage(logoUrl, 'PNG', 15, 15, 30, 30)
    
    // Add company details
    doc.setFontSize(20)
    doc.setTextColor(123, 49, 255) // Purple color
    doc.text('DigiCraft Solutions', 50, 30)
    
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text('Payment Receipt', 50, 40)
    
    // Add receipt details
    doc.setFontSize(12)
    doc.text(`Receipt No: ${transaction._id}`, 15, 60)
    doc.text(`Date: ${new Date(transaction.createdAt).toLocaleDateString('en-IN')}`, 15, 70)
    
    // Add customer details
    const customerTable = autoTable(doc, {
        startY: 80,
        head: [['Customer Details']],
        body: [
            ['Name', transaction.name],
            ['Email', transaction.email],
            ['Phone', transaction.phone],
            ['Address', `${transaction.address.street}, ${transaction.address.city}, ${transaction.address.state} - ${transaction.address.pincode}, ${transaction.address.country}`]
        ],
        theme: 'striped',
        headStyles: { fillColor: [123, 49, 255] },
        columnStyles: {
            0: { cellWidth: 40 },
            1: { cellWidth: 'auto' }
        },
    })
    
    // Add payment details
    autoTable(doc, {
        startY: (customerTable as any).finalY + 10,
        head: [['Payment Details']],
        body: [
            ['Amount', new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
            }).format(transaction.amount)],
            ['Payment ID', transaction.paymentId],
            ['Order ID', transaction.orderId],
            ['Status', transaction.status.toUpperCase()],
            ['Reason', transaction.reason],
            ['Project Details', transaction.projectDetails || 'Not provided']
        ],
        theme: 'striped',
        headStyles: { fillColor: [123, 49, 255] },
        columnStyles: {
            0: { cellWidth: 40 },
            1: { cellWidth: 'auto' }
        },
    })
    
    // Add footer
    const pageHeight = doc.internal.pageSize.height
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text('This is a computer-generated receipt and does not require a signature.', 15, pageHeight - 20)
    doc.text('For any queries, please contact support@digicraft.one', 15, pageHeight - 15)
    
    // Save the PDF
    doc.save(`DigiCraft-Receipt-${transaction._id}.pdf`)
} 