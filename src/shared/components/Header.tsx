import React from 'react';

function Header() {
  return (
    <header>
      <div>
        <img src="https://i.imgur.com/K6wVERD.png" alt="logo" className="brand-logo" />
        <ul>
          <li>
            <a href="/">SSR</a>
          </li>
          <li>
            <a href="/csr">CSR</a>
          </li>
          <li>
            <a href="/ssr-image">SSR Image optimised</a>
          </li>
          <li>
            <a href="/ssr-skeleton">SSR Skeleton + CSR data</a>
          </li>
          <li>
            <a href="/ssr-react-query">SSR React query</a>
          </li>
        </ul>
      </div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
        alt="cart"
        className="cart-logo"
      />
    </header>
  );
}

export default Header;
