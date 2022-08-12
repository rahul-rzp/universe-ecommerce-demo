import { createGlobalStyle } from 'styled-components';
// import ReactSkeletonStyles from 'react-loading-skeleton/dist/react-loading-skeleton/dist/skeleton.css';

export const GlobalStyles = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }

  body {
    color: white;
    background: black;
  }
}

header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid black;
}

header > div {
  display: flex;
}

header ul {
  display: flex;
  padding: 0px;
  margin: 0px;
  list-style: none;
}

header li {
  padding: 10px;
  color: blue;
}

img.brand-logo,
img.cart-logo {
  max-width: 50px;
}

#products {
  display: flex;
  flex-wrap: wrap;
}

.product {
  padding: 0px 20px;
}

.product img {
  width: 250px;
  height: 250px;
}

.product-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-to-cart button {
  padding: 10px;
}

.quantity-button button {
  margin: 10px;
}
`;
