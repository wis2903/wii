import React from 'react';
import BackToTop from './components/basic/back-to-top-button';
import HomePage from './pages/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/search';
import AdminMainPage from './pages/admin/main';

const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:keyword" element={<SearchPage />} />
          <Route path="/admin" element={<AdminMainPage />} />
        </Routes>
      </BrowserRouter>
      <BackToTop />
    </>
  );
};

export default App;
