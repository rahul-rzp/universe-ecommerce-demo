/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import AddToCart from './AddToCart';

const Product = ({ name, image, price, _id }: any) => {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <div className="product-text">
        <div className="left">
          <h3>{name}</h3>
          <h5>{price}</h5>
        </div>
        <div className="right">{/* <AddToCart productId={_id} price={price} /> */}</div>
      </div>
    </div>
  );
};

export default Product;
