import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { FaFlag, FaFlagUsa } from "react-icons/fa"; // USA for "en", custom for "ar"
import { MdLanguage } from "react-icons/md";
import { AppButton } from "..";
import { useLanguage, type LanguageType } from "@providers/LanguageProvider";

export const LanguageButton = () => {
  const { language, changeLanguage } = useLanguage();
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
        sx={{ minWidth: 40, padding: "6px 12px" }}
      >
        {language.toUpperCase()}
      </AppButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleSelect("en")}>
          <ListItemIcon>
            <FaFlagUsa />
          </ListItemIcon>
          EN
        </MenuItem>
        <MenuItem onClick={() => handleSelect("ar")}>
          <ListItemIcon>
            <FaFlag />
          </ListItemIcon>
          AR
        </MenuItem>
      </Menu>
    </>
  );
};
