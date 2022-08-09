import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { routes } from './shared/routes';
import Navbar from './shared/components/Navbar';
import Head from './shared/components/Head';
import Header from './shared/components/Header';
import Footer from './shared/components/Footer';

const App = (): React.ReactElement => {
  return (
    <>
      <Header />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
