import { BookDetails } from "@components/Home/bookDetails";
import { useAuth } from "@providers/AuthProvider";
import { API_URL } from "@services/apiUrls";
import axiosInstance from "@services/axiosInstance";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { IBook, IBorrowedBook } from "types/books";

export function useHome() {
  // *@ Component Hooks
  const { user } = useAuth();

  // *@ Component States
  const [tab, setTab] = useState<number>(0);

  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState<"title" | "author" | "isbn">(
    "title"
  );

  const [books, setBooks] = useState<IBook[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<IBorrowedBook[]>([]);

  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [selectedBook, setSelectedBook] = useState<IBook>();
  const [selectedBorrowedBook, setSelectedBorrowedBook] =
    useState<IBorrowedBook>();

  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [isLoadingBorrowed, setIsLoadingBorrowed] = useState(true);

  const isLoading = isLoadingBooks || isLoadingBorrowed;

  // * search on the books based on search by
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      if (!search) return true;
      const field = searchBy;
      const value = book[field]?.toString().toLowerCase() || "";
      return value.includes(search.toLowerCase());
    });
  }, [books, search, searchBy]);

  // * search on the borrowed books based on search by
  const filteredBorrowedBooks = useMemo(() => {
    return borrowedBooks.filter((borrowedBook) => {
      if (!search) return true;
      const field = searchBy;
      const value = borrowedBook.book[field]?.toString().toLowerCase() || "";
      return value.includes(search.toLowerCase());
    });
  }, [borrowedBooks, search, searchBy]);

  // *@ Component Functions
  // * Handle Tab Change
  const handleChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      setTab(newValue);
      setSearch("");
    },
    []
  );

  // * Handle on click on book
  const handleOnClick = useCallback(
    (book: IBook, borrowedBook?: IBorrowedBook) => {
      setShowDetailsModal(true);
      setSelectedBook(book);

      setSelectedBorrowedBook(borrowedBook);
    },
    []
  );

  // * Get the books
  const handleGetBooks = async () => {
    setIsLoadingBooks(true);
    try {
      const res = await axiosInstance.get<IBook[]>(API_URL.books, {
        params: search ? { [searchBy]: search } : undefined,
      });
      setBooks(res.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
    setIsLoadingBooks(false);
  };

  // * Get My Borrowed Books
  const handleGetBorrowedBooks = async () => {
    setIsLoadingBorrowed(true);
    try {
      const res = await axiosInstance.get<{ borrowedBooks?: IBorrowedBook[] }>(
        `${API_URL.user}/${user?.id}`
      );

      setBorrowedBooks(res.data.borrowedBooks || []);
    } catch (error) {
      console.error("Failed to fetch borrowed books:", error);
    }
    setIsLoadingBorrowed(false);
  };

  // *@ Component Effects
  useEffect(() => {
    handleGetBooks();
  }, []);

  useEffect(() => {
    handleGetBorrowedBooks();
  }, []);

  // *@ Details Modal
  const BookDetailsModal = (
    <BookDetails
      book={selectedBook!}
      open={showDetailsModal}
      onClose={() => setShowDetailsModal(false)}
      refetchBooks={handleGetBooks}
      refetchBorrowed={handleGetBorrowedBooks}
      myBooks={tab === 1}
      borrowedBook={selectedBorrowedBook}
    />
  );

  return {
    tab,
    search,
    searchBy,
    books,
    borrowedBooks,
    filteredBooks,
    filteredBorrowedBooks,

    handleChange,
    setSearch,
    setSearchBy,
    handleOnClick,

    BookDetailsModal,
    isLoading,
  };
}
