import { styled, Tab, Tabs } from "@mui/material";

export const AppTabs = styled(Tabs)(({ theme }) => ({
  width: "100%",
  minHeight: 32,
  border: "none",

  "& .MuiTabs-flexContainer": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    backgroundColor: theme.palette.mode === "light" ? "#f6f4ee" : "#2d3643s",
    borderRadius: "10px",
    padding: "4px",
    height: 32,
    border: "none",
  },

  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

export const AppTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  fontSize: 14,
  borderRadius: "8px",
  transition: "all 0.3s ease-out",
  minHeight: 32,
  border: "none",

  "&.Mui-selected": {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}));
