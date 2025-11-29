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
import { FormattedMessage, useIntl } from "react-intl";

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
  const { formatMessage } = useIntl();

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
              color={"white"}
              sx={{ letterSpacing: "2px", fontSize: { xs: 40, md: 48 } }}
            >
              LibraryHub
            </Typography>
          </Stack>
          <Typography
            variant="h6"
            color={"text.secondary"}
            maxWidth={600}
            sx={{
              fontSize: { xs: 18, md: 20 },
              color: (theme) =>
                theme.palette.mode === "light"
                  ? "white"
                  : theme.palette.text.secondary,
            }}
          >
            <FormattedMessage id="homePage.subTitle" />
          </Typography>
        </Box>
      </Box>

      <Box px={{ xs: 2, md: 8 }} py={{ xs: 2, md: 4 }}>
        {/* Header */}
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={4}
        >
          <Typography
            variant="h2"
            fontSize={{ xs: 18, md: 24 }}
            color="text.primary"
            fontWeight={500}
          >
            <FormattedMessage id="homePage.yourLib" />
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
              width: { xs: "100%", md: "500px" },
              borderRadius: "10px",
            }}
          >
            <AppTab label={<FormattedMessage id="homePage.browseBooks" />} />
            <AppTab
              label={`${formatMessage({ id: "homePage.myBooks" })} (${
                borrowedBooks.length
              })`}
            />
          </AppTabs>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: { xs: "0px", sm: "10px" },
            mb: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <AppInputFiled
            fullWidth
            type="text"
            name="search"
            value={search}
            placeholder={`${formatMessage({
              id: "homePage.searchBy",
            })} ${formatMessage({ id: `homePage.${searchBy}` })}`}
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
              {
                label: formatMessage({ id: "homePage.title" }),
                value: "title",
              },
              {
                label: formatMessage({ id: "homePage.author" }),
                value: "author",
              },
              { label: formatMessage({ id: "homePage.isbn" }), value: "isbn" },
            ]}
            sx={{ width: { xs: "100%", sm: "40%", md: "20%" } }}
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
                <Grid key={book.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <BookCard
                    book={book}
                    handleOnClick={handleOnClick}
                    myBooks={false}
                  />
                </Grid>
              ))
          ) : tab === 1 && borrowedBooks.length === 0 ? (
            <NoResult text="homePage.empty" />
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
                <Grid
                  key={borrowedBook.book.id + index}
                  size={{ xs: 12, sm: 6, md: 4 }}
                >
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
