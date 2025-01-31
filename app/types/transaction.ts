export interface Address {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}

export interface Transaction {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: Address;
    amount: number;
    reason: string;
    projectDetails?: string;
    paymentId: string;
    orderId: string;
    status: 'pending' | 'completed' | 'failed';
    createdAt: string;
} 