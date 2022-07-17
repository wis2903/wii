import React from 'react';
import BackToTop from './components/basic/back-to-top-button';
import HomePage from './pages/home';
import SearchPage from './pages/search';
import AdminMainPage from './pages/admin/main';
import config from './config.json';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={config.routes.home.path} element={<HomePage />} />
          <Route path={`${config.routes.search.path}/:keyword`} element={<SearchPage />} />
          <Route path={config.routes.admin.path} element={<AdminMainPage />} />
        </Routes>
      </BrowserRouter>
      <BackToTop />
    </>
  );
};

export default App;
