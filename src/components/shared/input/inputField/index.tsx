import {
  InputAdornment,
  TextField,
  type SxProps,
  type Theme,
} from "@mui/material";
import { type ChangeEvent, type FC } from "react";
import { useIntl } from "react-intl";

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
  required?: boolean;
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
  required = false,
}) => {
  const { formatMessage } = useIntl();

  return (
    <TextField
      name={name}
      label={label ? formatMessage({ id: label }) : ""}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      fullWidth={fullWidth}
      margin="normal"
      required={required}
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
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

        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0px 1000px transparent inset",
          WebkitTextFillColor: (theme) => theme.palette.text.primary,
          transition: "background-color 9999s ease-in-out 0s",
        },

        ...sx,
      }}
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
