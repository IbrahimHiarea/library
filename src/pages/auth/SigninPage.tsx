import { AppButton } from "@components/shared/buttons";
import { LanguageButton } from "@components/shared/buttons/languageButton";
import { ThemeToggleButton } from "@components/shared/buttons/themeButton";
import { AppInputFiled } from "@components/shared/input/inputField";
import { AppTab, AppTabs } from "@components/shared/tabs";
import { Box, styled, Typography } from "@mui/material";
import { Loader } from "@utils/loader/Loader";
import { LuLibrary } from "react-icons/lu";
import { useSignin } from "./useSignin";
import { FormattedMessage } from "react-intl";

export const Container = styled("div")(({ theme }) => ({
  background: theme.palette.background.default,
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function SigninPage() {
  // *@ Component Hooks
  const {
    tab,
    email,
    fullName,
    password,
    isLoading,

    setEmail,
    setFullName,
    setPassword,

    handleChange,
    handleSignIn,
  } = useSignin();

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
    <Container sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <ThemeToggleButton />
        <LanguageButton />
      </Box>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRadius: "12px",
          width: "450px",
        }}
      >
        {/* Header */}
        <Box padding={"24px"} textAlign={"center"}>
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.main,
              fontSize: "24px",
              fontWeight: 700,
              margin: 0,
              marginBottom: "8px",
              direction: "rtl",
            }}
          >
            <LuLibrary /> LibraryHub
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.primary,
              fontSize: "24px",
              fontWeight: 600,
              margin: 0,
              marginTop: "4px",
            }}
          >
            <FormattedMessage id="signinPage.welcome" />
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
              fontSize: "14px",
              fontWeight: 500,
              margin: 0,
              marginTop: "4px",
            }}
          >
            <FormattedMessage id="signinPage.signinToYourAccount" />
          </Typography>
        </Box>

        {/* Tabs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "4px 24px",
          }}
        >
          <AppTabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            sx={{
              backgroundColor: "#2d3643",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <AppTab label={<FormattedMessage id="signinPage.signIn" />} />
            <AppTab label={<FormattedMessage id="signinPage.signUp" />} />
          </AppTabs>
        </Box>

        {/* Tabs Panel */}
        <Box
          component="form"
          onSubmit={handleSignIn}
          sx={{ padding: "12px 24px 24px" }}
        >
          {tab === 0 && (
            <>
              <AppInputFiled
                fullWidth
                label="signinPage.label.email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <AppInputFiled
                name="password"
                fullWidth
                label="signinPage.label.password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <AppButton
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                <FormattedMessage id="signinPage.signIn" />
              </AppButton>
            </>
          )}

          {/* Sign Up */}
          {tab === 1 && (
            <>
              <AppInputFiled
                fullWidth
                name="fullName"
                label="signinPage.label.fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              <AppInputFiled
                name="email"
                fullWidth
                label="signinPage.label.email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <AppInputFiled
                name="password"
                fullWidth
                label="signinPage.label.password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <AppButton
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                <FormattedMessage id="signinPage.signUp" />
              </AppButton>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
