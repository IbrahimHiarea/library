import { Box, CircularProgress } from "@mui/material";

export function Loader({ sx }: { sx?: React.CSSProperties }) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      sx={{
        width: "100%",
        color: (theme) => theme.palette.primary.main,
        ...sx,
      }}
    >
      <CircularProgress enableTrackSlot size="3rem" />
    </Box>
  );
}
