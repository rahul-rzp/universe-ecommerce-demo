import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { routes } from './shared/routes';
import Navbar from './shared/components/Navbar';
import Head from './shared/components/Head';

const App = (): React.ReactElement => {
  return (
    <>
      <Head />
      <Navbar />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </>
  );
};

export default App;
