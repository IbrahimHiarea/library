import { Menu, MenuItem } from "@mui/material";
import { useLanguage, type LanguageType } from "@providers/LanguageProvider";
import { useState } from "react";
import { MdLanguage } from "react-icons/md";
import { AppButton } from "..";

export const LanguageButton = () => {
  const { changeLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (lang: LanguageType) => {
    changeLanguage(lang);
    handleClose();
  };

  return (
    <>
      <AppButton
        onClick={handleClick}
        startIcon={<MdLanguage />}
        sx={{
          minHeight: "35px",
          minWidth: "35px",
          padding: 0,
          backgroundColor: (theme) => theme.palette.background.default,
          color: (theme) => theme.palette.text.primary,
          border: "1px solid",
          borderColor: (theme) => theme.palette.text.secondary,
          borderRadius: "10px",

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
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // anchorReference="anchorPosition"
        // anchorPosition={{ top: 60, left: 1550 }}
        PaperProps={{
          sx: {
            backgroundColor: (theme) => theme.palette.background.default,
            width: 120,
            borderRadius: "10px",
          },
        }}
      >
        <MenuItem
          onClick={() => handleSelect("en")}
          sx={{
            borderRadius: "10px",
            fontSize: "14px",
            margin: "0px 4px",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.light,
            },
          }}
        >
          English
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect("ar")}
          sx={{
            borderRadius: "10px",
            fontSize: "14px",
            margin: "0px 4px",

            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.light,
            },
          }}
        >
          العربية
        </MenuItem>
      </Menu>
    </>
  );
};
