export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: 'stud' | 'hoop' | 'dangle';
  material: 'gold' | 'silver' | 'beads';
  color: 'gold' | 'silver' | 'green' | 'blue' | 'pink';
  isNew: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  total: number;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  fulfillmentStatus: 'Fulfilled' | 'Unfulfilled' | 'Processing';
  items: {
    productId: string;
    quantity: number;
    name: string;
    price: number;
  }[];
}
