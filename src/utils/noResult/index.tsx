import { Box, Typography } from "@mui/material";
import { LuLibrary } from "react-icons/lu";

export function NoResult({ text }: { text: string }) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={"10px"}
      sx={{
        width: "100%",
        minHeight: "300px",
        color: (theme) => theme.palette.text.secondary,
      }}
    >
      <LuLibrary size={40} />
      <Typography variant="h2" fontSize={24} color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}
