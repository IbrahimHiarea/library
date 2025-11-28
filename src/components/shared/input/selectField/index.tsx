import {
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  type SxProps,
  type Theme,
} from "@mui/material";
import { type FC, type ReactNode } from "react";

interface AppSelectProps {
  name: string;
  label?: string;
  value?: string | number;
  onChange?: (e: SelectChangeEvent<any>) => void;
  sx?: SxProps<Theme>;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  options: { label: string; value: string | number }[];
}

export const AppSelect: FC<AppSelectProps> = ({
  name,
  label,
  value,
  onChange,
  sx,
  startIcon,
  endIcon,
  fullWidth = true,
  disabled = false,
  options,
}) => {
  return (
    <FormControl
      fullWidth={fullWidth}
      disabled={disabled}
      variant="outlined"
      margin="normal"
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          height: "40px",
          borderRadius: "8px",
        },
        "& .MuiInputLabel-root": {
          top: "-6px",
        },
        "& .MuiInputLabel-shrink": {
          top: 0,
        },
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
        },
        ...sx,
      }}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        name={name}
        value={value}
        onChange={onChange}
        startAdornment={
          startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : undefined
        }
        endAdornment={
          endIcon ? (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ) : undefined
        }
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
