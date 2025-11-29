import { Box, Typography } from "@mui/material";

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
        Oops! Page not found
      </Typography>

      <a href="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="h2"
          fontSize={18}
          sx={{
            color: (theme) => theme.palette.primary.main,
          }}
        >
          Return to Home
        </Typography>
      </a>
    </Box>
  );
}
