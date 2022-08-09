/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product, { ProductSkeletons } from '../shared/components/Product';
// import 'react-loading-skeleton/dist/skeleton.css';

function SSRSkeleton(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    callAPI();
  }, []);

  const callAPI = async () => {
    setLoading(true);
    const res = await axios.get('https://nodejs-ecommerce-crud-api.vercel.app/products');
    setData(res.data);
    setLoading(false);
  };

  return (
    <div id="products">
      {loading ? <ProductSkeletons /> : data.map((item) => <Product {...item} key={item._id} />)}
    </div>
  );
}

export default SSRSkeleton;
