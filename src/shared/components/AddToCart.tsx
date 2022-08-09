import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../store/Cart';

const AddToCart = ({ productId, price }) => {
  const { cart, addToCart, reduceQuantity } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const isFound = cart.find((item) => item._id === productId);
    console.log(isFound);
    setIsAdded(Boolean(isFound));
    setQuantity(isFound ? isFound.quantity : 0);
  }, [cart]);

  const handleIncreaseQuantity = () => {
    addToCart({ _id: productId, price });
  };
  const handleReduceQuantity = () => {
    reduceQuantity({ _id: productId, price });
  };
  return (
    <div className="add-to-cart">
      {!isAdded ? (
        <button onClick={handleIncreaseQuantity}>Add to cart</button>
      ) : (
        <div className="quantity-button">
          <button onClick={handleReduceQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncreaseQuantity}>+</button>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
