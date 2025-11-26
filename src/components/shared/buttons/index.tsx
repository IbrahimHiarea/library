import {
  Button,
  type ButtonProps as MUIButtonProps,
  type SxProps,
  type Theme,
} from "@mui/material";
import { type FC, type ReactNode } from "react";

interface AppButtonProps {
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: MUIButtonProps["variant"];
  color?: MUIButtonProps["color"];
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

export const AppButton: FC<AppButtonProps> = ({
  children,
  onClick,
  variant = "contained",
  color = "primary",
  startIcon,
  endIcon,
  sx,
  disabled = false,
  fullWidth = false,
  type = "button",
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      variant={variant}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={{ borderRadius: "10px", textTransform: "none", ...sx }}
    >
      {children}
    </Button>
  );
};
