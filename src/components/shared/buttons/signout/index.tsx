import { useAuth } from "@providers/AuthProvider";
import { LuLogOut } from "react-icons/lu";
import { AppButton } from "..";
import { FormattedMessage } from "react-intl";

export const Signout = () => {
  const { logout } = useAuth();

  return (
    <AppButton
      onClick={logout}
      startIcon={<LuLogOut size={"15px"} />}
      sx={{
        minHeight: "35px",
        minWidth: "35px",
        padding: 0,
        gap: "10px",
        px: 2,
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        border: "1px solid",
        borderColor: (theme) => theme.palette.text.secondary,
        borderRadius: "10px",
        fontSize: { xs: 14, md: 16 },

        "&:hover": {
          backgroundColor: (theme) => theme.palette.primary.main,
          color: "white",
          border: "none",
        },

        "& .MuiButton-startIcon": {
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },

        "& .MuiButton-endIcon": {
          margin: 0,
        },
      }}
    >
      <FormattedMessage id="signinPage.signOut" />
    </AppButton>
  );
};
