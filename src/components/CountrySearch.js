import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCountries } from '../slices/countrySlice';
import { TextField, Button, Box } from '@mui/material';

const CountrySearch = () => {
  const [name, setName] = useState(''); // Use 'name' instead of 'search'
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchCountries({ page: 1, limit: 8, name })); // Pass 'name' to the thunk
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 3,
      }}
    >
      <TextField
        label="Search for a country"
        variant="outlined"
        value={name} // Use 'name' for value
        onChange={(e) => setName(e.target.value)} // Use 'setName' to update state
        sx={{ marginRight: 2 }}
      />
      <Button onClick={handleSearch} variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default CountrySearch;
