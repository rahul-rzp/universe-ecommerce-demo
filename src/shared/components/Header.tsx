import React from 'react';
import styled from 'styled-components';

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid black;

  & > div {
    display: flex;
  }

  & ul {
    display: flex;
    padding: 0px;
    margin: 0px;
    list-style: none;
  }

  & li {
    padding: 10px;
    color: blue;
  }

  img.brand-logo,
  img.cart-logo {
    max-width: 50px;
  }
`;

function Header() {
  return (
    <header>
      <div>
        <img src="https://i.imgur.com/K6wVERD.png" alt="logo" className="brand-logo" width="50" />
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
