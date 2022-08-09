/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../shared/components/Product';

function ProductsCSR(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    callAPI();
  }, []);

  async function callAPI() {
    const res = await axios.get('https://nodejs-ecommerce-crud-api.vercel.app/products');
    setData(res.data);
  }
  return (
    <div id="products">
      {data?.map((item: any) => (
        <Product {...item} key={item._id} />
      ))}
    </div>
  );
}

export default ProductsCSR;
