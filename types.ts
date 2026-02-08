
export enum MetalType {
  GOLD = 'Gold',
  SILVER = 'Silver',
  PLATINUM = 'Platinum'
}

export enum Purity {
  GOLD_24K = '24K',
  GOLD_22K = '22K',
  GOLD_18K = '18K',
  SILVER_999 = '999',
  PLAT_950 = '950'
}

export interface MetalPrice {
  type: MetalType;
  pricePerGram: number;
  change: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  metal: MetalType;
  purity: Purity;
  weight: number; 
  imageUrl: string;
}

export interface BillItem {
  productId: string;
  productName: string;
  weight: number;
  rate: number;
  makingCharges: number;
  gst: number;
  total: number;
}

export interface ShippingAddress {
  fullName: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface Bill {
  id: string;
  customerId?: string; // Linked to customer account if available
  customerName: string;
  customerPhone: string;
  shippingAddress?: ShippingAddress;
  date: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  grandTotal: number;
  paymentMethod: 'UPI' | 'Card' | 'Cash';
  status: 'Paid' | 'Pending';
}

export interface CustomerUser {
  id: string;
  email: string;
  phone: string;
  password?: string;
  fullName: string;
  role: 'CUSTOMER';
  shippingAddress?: ShippingAddress;
}

export interface AdminUser {
  role: 'ADMIN';
}

export type AuthState = {
  user: CustomerUser | AdminUser | null;
  isAuthenticated: boolean;
};
