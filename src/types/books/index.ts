export interface IBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  availableCopies: number;
  totalCopies: number;
  coverImage: string;
  rate: number;
}

export interface IBorrowedBook {
  id: string;
  bookId: string;
  book: IBook;
  borrowedAt: string;
  dueDate: string;
  returned: boolean;
}
