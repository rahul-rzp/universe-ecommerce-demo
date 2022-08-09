import React from 'react';
import { NavLink } from 'react-router-dom';

import { paths } from '../routes';

const Navbar = (): JSX.Element => (
  <nav>
    <NavLink to={paths.HOME}>Home</NavLink>
    {' • '}
    <NavLink to={paths.ABOUT}>About</NavLink>
  </nav>
);

export default Navbar;
