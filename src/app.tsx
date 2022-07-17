import React from 'react';
import BackToTop from './components/basic/back-to-top-button';
import HomePage from './pages/home';
import SearchPage from './pages/search';
import AdminMainPage from './pages/admin/main';
import routes from './routes.json';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home.path} element={<HomePage />} />
          <Route path={`${routes.search.path}/:keyword`} element={<SearchPage />} />
          <Route path={routes.admin.path} element={<AdminMainPage />} />
        </Routes>
      </BrowserRouter>
      <BackToTop />
    </>
  );
};

export default App;
