import { Category } from "./category";

export interface Book {
  book_id: number;
  bookTitle: string;
  description: string;
  author: string;
  image: string;
  categoryList: Category[];
}
