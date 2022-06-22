import React from 'react';
import BackToTop from './components/back-to-top';
import Footer from './components/footer';
import Header from './components/header';
import Home from './pages/home';

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <div className='app'>
        <Home />
      </div>
      <Footer />
      <BackToTop />
    </>
  );
};

export default App;
