import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export function SearchBar({ value, onChange }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <TextField
      value={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {!isEditing && value === "" && <SearchIcon />}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {value !== "" && (
              <IconButton edge="end" onClick={handleClear}>
                <CloseIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}
