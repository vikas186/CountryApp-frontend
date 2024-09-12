import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Avatar, Box } from '@mui/material';
import { clearCountryDetails, fetchCountryDetails } from '../slices/countrySlice';
import LoadingSpinner from './LoadingSpinner'; 

const CountryCard = () => {
  const dispatch = useDispatch();
  const { code } = useParams();
  const { countryDetails, loading } = useSelector((state) => state.country); // Add loading state

  useEffect(() => {
    if (code) {
      dispatch(fetchCountryDetails(code));
    }
    // Clean up function to clear details on unmount
    return () => {
      dispatch(clearCountryDetails());
    };
  }, [code, dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height
        }}
      >
        <LoadingSpinner />
      </Box>
    );
  }

  if (!countryDetails) return null;

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 2,
        boxShadow: 4,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', // Light blue gradient
        border: '1px solid #90caf9',
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} container justifyContent="center">
            <Avatar
              alt={`${countryDetails.name} flag`}
              src={countryDetails.flag}
              sx={{
                width: 120,  // Set a fixed width
                height: 120, // Set a fixed height
                borderRadius: 1,
                border: '2px solid #90caf9',
                boxShadow: 3,
                objectFit: 'cover', // Ensure the image covers the avatar without stretching
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                background: 'linear-gradient(90deg, #c8e6c9, #a5d6a7)', // Light green gradient
                padding: 2,
                borderRadius: 2,
                boxShadow: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Typography variant="h5" component="div" gutterBottom>
                {countryDetails.name}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                <strong>Capital:</strong> {countryDetails.capital}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                <strong>Population:</strong> {countryDetails.population.toLocaleString()}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                <strong>Region:</strong> {countryDetails.region}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                <strong>Subregion:</strong> {countryDetails.subregion}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                <strong>Languages:</strong> {countryDetails.languages}
              </Typography>
              <Button
                component={Link}
                to="/"
                onClick={() => dispatch(clearCountryDetails())}
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  bgcolor: '#90caf9',
                  '&:hover': {
                    bgcolor: '#64b5f6',
                  },
                  alignSelf: 'flex-start', // Align button to the start of the container
                }}
              >
                Back to List
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
