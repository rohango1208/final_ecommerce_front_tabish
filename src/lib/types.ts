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
