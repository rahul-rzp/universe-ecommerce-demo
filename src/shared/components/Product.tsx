/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
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

export function ProductSkeletons() {
  const dummy = Array(10).fill('test');
  return (
    <>
      {dummy.map((item, i) => (
        <div className="product" key={i}>
          <Skeleton height={250} width={250} />
          <div className="product-text">
            <div className="left">
              <h3>
                <Skeleton height={10} width={100} />
              </h3>
              <h5>
                {' '}
                <Skeleton height={10} width={100} />
              </h5>
            </div>
            <div className="right">
              <Skeleton />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
