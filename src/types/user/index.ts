import type { IBorrowedBook } from "types/books";

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  borrowedBooks?: IBorrowedBook[];
}
