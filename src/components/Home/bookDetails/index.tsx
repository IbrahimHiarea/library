import { AppButton } from "@components/shared/buttons";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useAuth } from "@providers/AuthProvider";
import { toastSuccess } from "@providers/ToastProvider";
import { API_URL } from "@services/apiUrls";
import axiosInstance from "@services/axiosInstance";
import { Loader } from "@utils/loader/Loader";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { LuBook } from "react-icons/lu";
import { FormattedMessage, useIntl } from "react-intl";
import type { IBook, IBorrowedBook } from "types/books";
import type { IUser } from "types/user";

interface IBookDetailsProps {
  open: boolean;
  onClose: () => void;
  book: IBook;
  borrowedBook?: IBorrowedBook;
  refetchBooks: () => void;
  refetchBorrowed: () => void;
  myBooks: boolean;
}

export function BookDetails({
  open,
  onClose,
  book,
  refetchBooks,
  refetchBorrowed,
  myBooks,
  borrowedBook,
}: IBookDetailsProps) {
  if (!book) return null;
  // *@ Component States
  const {
    title,
    author,
    rate,
    isbn,
    description,
    coverImage,
    totalCopies,
    availableCopies,
  } = book!;

  const { user } = useAuth();
  const { formatMessage } = useIntl();

  const isAvailable = availableCopies > 0;

  const [isLoading, setIsLoading] = useState(false);

  // *@ Component Function
  // * handle BarrowBook
  const handleBarrowBook = async () => {
    setIsLoading(true);
    try {
      // 1. Get user borrowedBooks
      const userRes = await axiosInstance.get<IUser>(
        `${API_URL.user}/${user?.id}`
      );

      const { borrowedBooks } = userRes.data;

      // 2. Prepare borrowed record
      const borrowedItem: IBorrowedBook = {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2), // make a fake id
        bookId: book.id,
        book: { ...book, availableCopies: book.availableCopies - 1 },
        borrowedAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // +5 days
        returned: false,
      };

      // 3. Update user --> add new borrowed item
      await axiosInstance.patch(`${API_URL.user}/${user?.id}`, {
        borrowedBooks: [...(borrowedBooks ?? []), borrowedItem],
      });

      // 4. Update book --> decrease available copies
      await axiosInstance.patch(`${API_URL.books}/${book.id}`, {
        availableCopies: book.availableCopies - 1,
      });

      await refetchBooks();
      await refetchBorrowed();
      onClose();
      toastSuccess(
        formatMessage(
          { id: "toast.borrowed.success" },
          {
            title: title,
            author: author,
          }
        )
      );
    } catch (error) {
      console.error("Borrow book failed:", error);
      throw new Error("Something went wrong while borrowing the book.");
    }
    setIsLoading(false);
  };

  // * handle returnBook
  const handleReturnBook = async () => {
    setIsLoading(true);
    try {
      // 1. Get user borrowedBooks
      const userRes = await axiosInstance.get<IUser>(
        `${API_URL.user}/${user?.id}`
      );

      const { borrowedBooks } = userRes.data;

      // 2. Update borrowedBooks → mark returned = true
      const updatedBorrowedBooks =
        borrowedBooks?.map((item) =>
          item.id === borrowedBook?.id ? { ...item, returned: true } : item
        ) ?? [];

      await axiosInstance.patch(`${API_URL.user}/${user?.id}`, {
        borrowedBooks: updatedBorrowedBooks,
      });

      // 3. Update the book → increase availableCopies
      const { data } = await axiosInstance.get<IBook>(
        `${API_URL.books}/${book.id}`
      );
      await axiosInstance.patch(`${API_URL.books}/${book.id}`, {
        availableCopies: data.availableCopies + 1,
      });

      // 4. Refetch data
      await refetchBooks();
      await refetchBorrowed();

      // 5. Close modal & notify
      onClose();
      toastSuccess(
        formatMessage(
          { id: "toast.return.success" },
          {
            title: title,
            author: author,
          }
        )
      );
    } catch (error) {
      console.error("Return book failed:", error);
      throw new Error("Something went wrong while returning the book.");
    }
    setIsLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 0,
        sx: {
          backgroundImage: "none",
          boxShadow: "none",
          padding: "24px",
          borderRadius: "12px",
          backgroundColor: (theme) => theme.palette.background.default,
        },
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              padding: 0,
              mb: 4,
            }}
          >
            <div>
              <Typography fontSize={24} variant="h6">
                {title}
              </Typography>
              <Typography
                variant="h5"
                fontSize={18}
                color="text.secondary"
                mt={1}
                display={"flex"}
                gap={1}
              >
                <GoPerson />
                {author}
              </Typography>
            </div>

            <IconButton onClick={onClose}>
              <IoMdClose />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ p: 0 }}>
            {/* Cover */}

            <div style={{ height: "250px", width: "100%" }}>
              <img
                src={coverImage}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </div>

            {/* Main Info */}
            <Box mt={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  fontSize={16}
                  color="text.main"
                  mt={1}
                  display="flex"
                  gap={1}
                >
                  <FaStar color="#fbbf24" /> {rate}
                </Typography>
                <Typography
                  sx={{
                    color: (theme) =>
                      (!myBooks && isAvailable) ||
                      (myBooks && borrowedBook?.returned)
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                    border: "1px solid",
                    borderColor: (theme) =>
                      (!myBooks && isAvailable) ||
                      (myBooks && borrowedBook?.returned)
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                    borderRadius: "10px",
                    backgroundColor: (theme) =>
                      (!myBooks && isAvailable) ||
                      (myBooks && borrowedBook?.returned)
                        ? theme.palette.success.dark
                        : theme.palette.error.dark,
                    fontSize: "12px",
                    p: "2px 10px",
                  }}
                >
                  {!myBooks && isAvailable ? (
                    <FormattedMessage id="homePage.available" />
                  ) : !myBooks && !isAvailable ? (
                    <FormattedMessage id="homePage.notAvailable" />
                  ) : myBooks && borrowedBook?.returned ? (
                    <FormattedMessage id="homePage.returned" />
                  ) : (
                    <FormattedMessage id="homePage.notReturned" />
                  )}
                </Typography>
              </Box>
            </Box>

            {/* Extra Fields */}
            <Box mt={3}>
              <Typography
                fontSize={16}
                color="text.secondary"
                mt={2}
                display="flex"
                gap={1}
              >
                <LuBook size={16} /> <FormattedMessage id="homePage.isbn" /> :{" "}
                {isbn}
              </Typography>

              <Typography fontSize={18} color="text.main" mt={2}>
                <FormattedMessage id="homePage.description" />
              </Typography>
              <Typography fontSize={16} color="text.secondary" mt={2}>
                {description}
              </Typography>

              <Typography
                display={myBooks ? "none" : ""}
                fontSize={16}
                color="text.secondary"
                mt={2}
              >
                <FormattedMessage id="homePage.copies" /> : {availableCopies} /{" "}
                {totalCopies} <FormattedMessage id="homePage.available" />
              </Typography>

              <Typography
                display={!myBooks ? "none" : ""}
                fontSize={16}
                color="text.secondary"
                mt={2}
              >
                <FormattedMessage id="homePage.borrowDate" /> :{" "}
                {new Date(borrowedBook?.borrowedAt ?? "").toUTCString()}
              </Typography>

              <Typography
                display={!myBooks ? "none" : ""}
                fontSize={16}
                color="text.secondary"
                mt={2}
              >
                <FormattedMessage id="homePage.dueDate" /> :{" "}
                {new Date(borrowedBook?.dueDate ?? "").toUTCString()}
              </Typography>
            </Box>

            <Box mt={3}>
              <AppButton
                sx={{
                  width: "100%",
                  padding: "8px 16px",
                  backgroundColor: (theme) => theme.palette.background.default,
                  color: (theme) => theme.palette.text.primary,
                  border: "1px solid #333e4d",

                  ":hover": {
                    backgroundColor: (theme) => theme.palette.primary.main,
                    borderColor: (theme) => theme.palette.primary.main,
                    transition: "0.3",
                  },
                }}
                disabled={
                  (availableCopies === 0 && !myBooks) ||
                  (myBooks && borrowedBook?.returned)
                }
                onClick={!myBooks ? handleBarrowBook : handleReturnBook}
              >
                {!myBooks ? (
                  <FormattedMessage id="homePage.borrow" />
                ) : (
                  <FormattedMessage id="homePage.return" />
                )}
              </AppButton>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
