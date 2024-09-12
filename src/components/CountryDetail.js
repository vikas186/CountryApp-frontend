import React from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
import ErrorNotification from './ErrorNotification';

const CountryDetail = () => {
  const { country, status, error } = useSelector((state) => state.detailedCountry);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <ErrorNotification message={error} />;
  }

  if (!country) {
    return <p>Select a country to see the details.</p>;
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Region: {country.region}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Languages: {Object.values(country.languages).join(', ')}</p>
    </div>
  );
};

export default CountryDetail;
