import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, setPage } from '../slices/countrySlice';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const CountryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countries, status, page, totalPages } = useSelector((state) => state.country);
  const [loadingDetail, setLoadingDetail] = React.useState(null);

  useEffect(() => {
    // Ensure that the page parameter is correctly set
    console.log(`Fetching countries for page ${page}`);
    dispatch(fetchCountries({ page, limit: 8, name: '' }));
  }, [dispatch, page]);

  const handlePageChange = (event, value) => {
    console.log(`Page changed to ${value}`); // Debug log
    dispatch(setPage(value));
  };

  const handleViewDetailsClick = (cca3) => {
    setLoadingDetail(cca3);
    setTimeout(() => {
      navigate(`/details/${cca3}`);
    }, 500);
  };

  return (
    <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        sx={{
          fontWeight: 'bold',
          mb: 3,
          color: 'primary.main',
          textTransform: 'uppercase',
          letterSpacing: 2,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        Country App
      </Typography>

      <Box sx={{ flex: 1, mt: 2 }}>
        {status === 'loading' ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <LoadingSpinner />
          </Box>
        ) : status === 'failed' ? (
          <Typography color="error" align="center" variant="h6">
            Failed to load countries. Please try again.
          </Typography>
        ) : (
          <>
            {countries.length > 0 ? (
              <Grid container spacing={4}>
                {countries.map((country) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
                    <Card
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        borderRadius: 2,
                        boxShadow: 3,
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          boxShadow: 6,
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <CardContent>
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                          <img
                            src={country.flag}
                            alt={`${country.name} flag`}
                            style={{ width: '120px', height: 'auto', borderRadius: '8px' }}
                          />
                        </Box>
                        <Typography variant="h6" component="div" gutterBottom align="center">
                          {country.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          align="center"
                          sx={{ mb: 2 }}
                        >
                          Population: {country.population.toLocaleString()}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ width: '100%', mt: 1, position: 'relative' }}
                          onClick={() => handleViewDetailsClick(country.cca3)}
                          disabled={loadingDetail === country.cca3}
                        >
                          {loadingDetail === country.cca3 ? (
                            <LoadingSpinner />
                          ) : (
                            'View Details'
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography align="center" variant="h6">
                No countries available.
              </Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CountryList;
