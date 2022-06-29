import React from 'react';
import BackToTop from './components/back-to-top';
import Footer from './modules/footer';
import Header from './modules/header';
import Home from './pages/home';
import Product from './pages/product';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className='app'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      <BackToTop />
    </>
  );
};

export default App;
