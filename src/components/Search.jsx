/* eslint-disable react/prop-types */
import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
export const Search = ({ search, setSearch }) => {
  return (
    <FormControl variant="standard">
      <InputLabel htmlFor="input-with-icon-adornment">Buscar</InputLabel>
      <Input
        id="input-with-icon-adornment"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          <button onClick={() => setSearch("")}>
            <InputAdornment position="end">
              <CloseIcon />
            </InputAdornment>
          </button>
        }
      />
    </FormControl>
  );
};
