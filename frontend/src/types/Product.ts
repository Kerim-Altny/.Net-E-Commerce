import type { Category } from './Category';

export interface Product {
  id: number;
  title: string;
  author: string;
  isbn: string;
  description: string | null;
  imageUrl: string | null;
  listPrice: number;
  price: number;
  price50: number;
  price100: number;
  category: Category;
}
