import { Box, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Typography
        variant="h2"
        fontSize={36}
        color="text.primary"
        fontWeight={700}
      >
        404
      </Typography>

      <Typography variant="h2" fontSize={20} color="text.secondary">
        <FormattedMessage id="notFoundPage.oops" />
      </Typography>

      <a href="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="h2"
          fontSize={18}
          sx={{
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <FormattedMessage id="notFoundPage.returnHome" />
        </Typography>
      </a>
    </Box>
  );
}
