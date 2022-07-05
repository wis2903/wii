import React from 'react';
import BackToTop from './components/basic/back-to-top-button';
import Footer from './modules/footer';
import Header from './modules/header';
import HomePage from './pages/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/search';

const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className='app'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:keyword" element={<SearchPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      <BackToTop />
    </>
  );
};

export default App;
