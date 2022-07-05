import React from 'react';
import BackToTop from './components/back-to-top';
import Footer from './modules/footer';
import Header from './modules/header';
import Home from './pages/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className='app'>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      <BackToTop />
    </>
  );
};

export default App;
