// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountrySearch from './components/CountrySearch';
import CountryList from './components/CountryList';
import CountryCard from './components/CountryCard';
import ErrorNotification from './components/ErrorNotification';
import { useSelector } from 'react-redux';

function App() {
  const { error } = useSelector((state) => state.country);

  return (
    <Router>
      <div>
        <CountrySearch />
        {error && <ErrorNotification message={error} />}
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/details/:code" element={<CountryCard />} />
          <Route path="/search" element={<CountrySearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
