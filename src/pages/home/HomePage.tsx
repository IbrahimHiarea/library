import { BookCard } from "@components/Home/bookCard";
import { LanguageButton } from "@components/shared/buttons/languageButton";
import { Signout } from "@components/shared/buttons/signout";
import { ThemeToggleButton } from "@components/shared/buttons/themeButton";
import { AppInputFiled } from "@components/shared/input/inputField";
import { AppSelect } from "@components/shared/input/selectField";
import { AppTab, AppTabs } from "@components/shared/tabs";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import { LuLibrary } from "react-icons/lu";
import { useHome } from "./useHome";
import { NoResult } from "@utils/noResult";
import { Loader } from "@utils/loader/Loader";

export default function HomePage() {
  // *@ Component Hooks
  const {
    tab,
    search,
    searchBy,

    books,
    borrowedBooks,

    handleChange,
    setSearch,
    setSearchBy,
    handleOnClick,

    BookDetailsModal,

    isLoading,
  } = useHome();

  if (isLoading) {
    return (
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Loader sx={{ height: "100vh" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Box position="relative" height={300} width="100%">
        <Box
          component="img"
          src="/asset/libraryBackground.png"
          alt="Library"
          width="100%"
          height="100%"
          sx={{ objectFit: "cover" }}
        />

        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          sx={{
            background: (theme) =>
              `linear-gradient(to top, ${theme.palette.background.default}, rgba(21, 29, 40,0.6), transparent)`,
          }}
        />

        <Box
          position="absolute"
          top="50%"
          left="50%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          px={2}
          zIndex={10}
          sx={{ transform: "translate(-50%, -50%)" }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography sx={{ color: (theme) => theme.palette.primary.main }}>
              <LuLibrary size={48} />
            </Typography>

            <Typography
              variant="h1"
              fontWeight="bold"
              fontSize={48}
              color="text.primary"
              sx={{ letterSpacing: "2px" }}
            >
              LibraryHub
            </Typography>
          </Stack>
          <Typography variant="h6" color="text.secondary" maxWidth={600}>
            Discover, borrow, and enjoy a world of books
          </Typography>
        </Box>
      </Box>

      <Box px={8} py={4}>
        {/* Header */}
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={4}
        >
          <Typography
            variant="h2"
            fontSize={24}
            color="text.primary"
            fontWeight={500}
          >
            Your Library
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ThemeToggleButton />
            <LanguageButton />
            <Signout />
          </Box>
        </Box>

        {/* Tabs */}
        <Box mb={2}>
          <AppTabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            sx={{
              backgroundColor: "#2d3643",
              width: "500px",
              borderRadius: "10px",
            }}
          >
            <AppTab label="Browse Books" />
            <AppTab label={`My Books (${borrowedBooks.length})`} />
          </AppTabs>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            mb: 2,
          }}
        >
          <AppInputFiled
            fullWidth
            type="text"
            name="search"
            value={search}
            placeholder={`Search By ${searchBy}`}
            onChange={(e) => setSearch(e.target.value)}
            startIcon={<CiSearch />}
          />

          <AppSelect
            name="searchBy"
            value={searchBy}
            onChange={(e) => {
              setSearchBy(e.target.value), setSearch("");
            }}
            options={[
              { label: "title", value: "title" },
              { label: "author", value: "author" },
              { label: "ISBN", value: "isbn" },
            ]}
            sx={{ width: "20%" }}
          />
        </Box>

        {/* Books */}
        <Grid container spacing={3} width={"100%"} key={tab}>
          {tab === 0 ? (
            books
              ?.filter((book) => {
                if (!search) return true;
                const field = searchBy;
                const value = book[field]?.toString().toLowerCase() || "";
                return value.includes(search.toLowerCase());
              })
              ?.map((book) => (
                <Grid key={book.id} size={4}>
                  <BookCard
                    book={book}
                    handleOnClick={handleOnClick}
                    myBooks={false}
                  />
                </Grid>
              ))
          ) : tab === 1 && borrowedBooks.length === 0 ? (
            <NoResult text="You haven't borrowed any books yet" />
          ) : (
            borrowedBooks
              ?.filter((borrowedBook) => {
                if (!search) return true;
                const field = searchBy;
                const value =
                  borrowedBook?.book[field]?.toString().toLowerCase() || "";
                return value.includes(search.toLowerCase());
              })
              ?.map((borrowedBook, index) => (
                <Grid key={borrowedBook.book.id + index} size={4}>
                  <BookCard
                    book={borrowedBook.book}
                    handleOnClick={handleOnClick}
                    myBooks={true}
                    borrowedBook={borrowedBook}
                  />
                </Grid>
              ))
          )}
        </Grid>
      </Box>

      {BookDetailsModal}
    </Box>
  );
}
