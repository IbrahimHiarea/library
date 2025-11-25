import {
  InputAdornment,
  TextField,
  type SxProps,
  type Theme,
} from "@mui/material";
import { type ChangeEvent, type FC } from "react";

interface AppInputFiledProps {
  name: string;
  label?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const AppInputFiled: FC<AppInputFiledProps> = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  sx,
  startIcon,
  endIcon,
  placeholder,
  disabled = false,
  fullWidth = true,
}) => {
  return (
    <TextField
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={sx}
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : undefined,
        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : undefined,
      }}
      variant="outlined"
    />
  );
};
