import React from 'react';
import Product from './Product';

function Products({ data }) {
  return (
    <div id="products">
      {data?.map((item) => (
        <Product {...item} key={item._id} />
      ))}
    </div>
  );
}

export default Products;
