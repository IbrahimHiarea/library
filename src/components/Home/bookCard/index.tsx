import { AppButton } from "@components/shared/buttons";
import { Box, Card, Typography } from "@mui/material";
import { FaStar } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
import { LuBook } from "react-icons/lu";
import type { IBook, IBorrowedBook } from "types/books";

interface IBookCardProps {
  book: IBook;
  handleOnClick: (book: IBook, borrowedBook?: IBorrowedBook) => void;
  myBooks: boolean;
  borrowedBook?: IBorrowedBook;
}

export function BookCard({
  book,
  handleOnClick,
  myBooks,
  borrowedBook,
}: IBookCardProps) {
  // *@ Component States
  const {
    author,
    coverImage,
    availableCopies,
    description,
    isbn,
    rate,
    title,
    totalCopies,
  } = book;

  const isAvailable = availableCopies > 0;

  return (
    <Card
      elevation={0}
      sx={{
        "--Paper-overlay": "none",
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: "12px",
        border: "1px solid",
        borderColor: "#333e4d",
      }}
    >
      <div style={{ height: "190px", width: "100%" }}>
        <img
          src={coverImage}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <Box p={4}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography
            variant="h2"
            fontSize={20}
            color="text.primary"
            fontWeight={500}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: (theme) =>
                (!myBooks && isAvailable) || (myBooks && borrowedBook?.returned)
                  ? theme.palette.success.main
                  : theme.palette.error.main,
              border: "1px solid",
              borderColor: (theme) =>
                (!myBooks && isAvailable) || (myBooks && borrowedBook?.returned)
                  ? theme.palette.success.main
                  : theme.palette.error.main,
              borderRadius: "10px",
              backgroundColor: (theme) =>
                (!myBooks && isAvailable) || (myBooks && borrowedBook?.returned)
                  ? theme.palette.success.dark
                  : theme.palette.error.dark,
              fontSize: "12px",
              p: "2px 10px",
            }}
          >
            {!myBooks && isAvailable
              ? "Available"
              : !myBooks && !isAvailable
              ? "Not Available"
              : myBooks && borrowedBook?.returned
              ? "Returned"
              : "Not Returned"}
          </Typography>
        </Box>
        <Typography
          variant="h2"
          fontSize={14}
          color="text.secondary"
          mt={1}
          display={"flex"}
          gap={1}
        >
          <GoPerson />
          {author}
        </Typography>
        <Typography variant="h2" fontSize={14} color="text.main" mt={1}>
          <FaStar color="#fbbf24" /> {rate}
        </Typography>
      </Box>

      <Box p={4} pt={0}>
        <Typography
          variant="h2"
          fontSize={14}
          color="text.secondary"
          mt={2}
          display={"flex"}
          gap={1}
        >
          <LuBook size={16} /> ISBN : {isbn}
        </Typography>
        <Typography variant="h2" fontSize={14} color="text.secondary" mt={2}>
          {description}
        </Typography>
        <Typography
          display={myBooks ? "none" : ""}
          variant="h2"
          fontSize={14}
          color="text.secondary"
          mt={2}
        >
          Copies : {availableCopies} / {totalCopies} available
        </Typography>
        <Typography
          display={!myBooks ? "none" : ""}
          variant="h2"
          fontSize={14}
          color="text.secondary"
          mt={2}
        >
          Borrow Date : {new Date(borrowedBook?.borrowedAt ?? "").toUTCString()}
        </Typography>
        <Typography
          display={!myBooks ? "none" : ""}
          variant="h2"
          fontSize={14}
          color="text.secondary"
          mt={2}
        >
          Due Date : {new Date(borrowedBook?.dueDate ?? "").toUTCString()}
        </Typography>
      </Box>

      <Box p={4} pt={0}>
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
          onClick={() => handleOnClick(book, borrowedBook)}
        >
          View Details
        </AppButton>
      </Box>
    </Card>
  );
}
