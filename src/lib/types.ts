// types/product.ts

export type AdminProduct = {
  id: number;
  name: string;
  price: number;
  imageURL: string;
  description: string;
  categoryID: number;
  categoryName?: string;
  discount?: number;
  stockQuantity?: number;
};

export interface StorefrontProduct {
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
