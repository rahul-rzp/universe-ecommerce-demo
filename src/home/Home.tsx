import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Products from '../shared/components/Products';

export const callAPI = async () => {
  console.log('log..');
  const res = await axios.get('https://nodejs-ecommerce-crud-api.vercel.app/products');
  return res.data;
};
// import styles from '../styles/Home.module.css';

function ProductsCSR() {
  const { data, error, isLoading } = useQuery(['product'], callAPI, { staleTime: 5000 });

  if (isLoading) return 'Loading...';
  if (error) return 'Something went wrong';

  return (
    <div id="products">
      <Products data={data} />
    </div>
  );
}

export default ProductsCSR;
