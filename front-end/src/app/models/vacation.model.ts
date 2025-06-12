export interface Vacation {
  vacation_id: number;
  vacation_title: string;
  description: string;
  travel_fare_price: number;
  image_url: string;
  create_date: Date;
  last_update: Date;
  excursions: Excursion[];
}

export interface Excursion {
  excursion_id: number;
  excursion_title: string;
  excursion_price: number;
  image_url: string;
  create_date: Date;
  last_update: Date;
  vacation_id: number;
}

export interface Country {
  country_id: number;
  country: string;
  create_date: Date;
  last_update: Date;
}

export interface Division {
  division_id: number;
  division: string;
  create_date: Date;
  last_update: Date;
  country_id: number;
}

export interface Customer {
  customer_id?: number;
  customer_first_name: string;
  customer_last_name: string;
  address: string;
  postal_code: string;
  phone: string;
  create_date?: Date;
  last_update?: Date;
  division_id: number;
}

export interface CartItem {
  cart_item_id?: number;
  vacation: Vacation;
  excursions: Excursion[];
  create_date?: Date;
  last_update?: Date;
}

export interface Cart {
  cart_id?: number;
  package_price: number;
  party_size: number;
  status: StatusType;
  order_tracking_number?: string;
  create_date?: Date;
  last_update?: Date;
  customer: Customer;
  cartItems: CartItem[];
}

export interface PurchaseData {
  customer: Customer;
  cart: Cart;
}

export interface PurchaseResponse {
  orderTrackingNumber: string;
}

export enum StatusType {
  PENDING = 'pending',
  ORDERED = 'ordered',
  CANCELED = 'canceled'
}