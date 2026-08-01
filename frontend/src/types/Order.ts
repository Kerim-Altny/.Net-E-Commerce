export interface OrderItem {
  id: number;
  productId: number;
  productTitle: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface Order {
  id: number;
  userId: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  shippingFullName: string;
  shippingPhoneNumber: string;
  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  items: OrderItem[];
}
