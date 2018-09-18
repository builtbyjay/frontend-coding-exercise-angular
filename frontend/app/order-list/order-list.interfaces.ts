export type PaymentType = 'CARD' | 'CASH' | 'PAY_ON_ACCOUNT';

export type ServingStyleType = 'BUFFET' | 'INDIVIDUAL_PORTIONS';

export type LateReasonType = 'VENDOR_LATE' | 'TRAFFIC' | 'DRIVER_LATE_FOR_PICKUP' | 'BAD_INSTRUCTIONS' | null;

export type PackagingType = 'HOTBOX' | 'COLDBOX' | 'VENDOR_PROVIDED';

export interface LatLong {
  lat: number;
  long: number;
}

export interface Price {
  delivery: number;
  items: number;
  total: number;
  vatRate: number;
  vatableItems: number;
  vatAmount: number;
}

export interface Order {
  id: number;
  lastModified: string;
  customer: string;
  vendor: string;
  commissionRate: number;
  requestedDeliveryDate: string;
  price: Price;
  paymentType: PaymentType;
  headcount: number;
  servingStyle: ServingStyleType;
  deliveredAt: string;
  delayMinutes: number;
  lateReason: LateReasonType;
  packaging: PackagingType;
  driverName: string;
  deliveryLocation: LatLong;
  currentLocation: LatLong;
  vendorLocation: LatLong;
}

export interface OrderListResponse {
  page: number;
  pageSize: number;
  total: number;
  count: number;
  items: Order[];
}
