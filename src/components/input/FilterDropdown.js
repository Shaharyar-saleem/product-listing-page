import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const FilterDropdown = ({ filters, selectedFilter, onFilterChange }) => {
  return (
    <FormControl sx={{ width: 150 }}>
      <InputLabel>Filter By</InputLabel>
      <Select
        labelId="filter-label"
        value={selectedFilter}
        onChange={onFilterChange}
        label="Filter By"
      >
        {filters.map((filter) => (
          <MenuItem key={filter} value={filter}>
            {filter}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterDropdown;
