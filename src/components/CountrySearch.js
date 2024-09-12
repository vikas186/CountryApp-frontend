// src/components/CountrySearch.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCountries } from '../slices/countrySlice';
import { TextField, Button, Box } from '@mui/material';

const CountrySearch = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchCountries({ page: 1, limit: 8, search }));
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        alignItems: 'center', // Align items vertically centered
        justifyContent: 'flex-end', // Align items to the right
        marginBottom: 3, // Add margin-bottom for spacing
      }}
    >
      <TextField
        label="Search for a country"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginRight: 2 }} // Add margin-right for spacing between TextField and Button
      />
      <Button onClick={handleSearch} variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default CountrySearch;
