import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  function onAdd(product, quantity) {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id)
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart.`);
  }
  function toggleCartItemQuantity(id, value) {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);

    if (value === "inc") {
      let foundProductCopy = foundProduct;
      foundProductCopy.quantity += 1;
      let cartItemsCopy = [...cartItems];
      cartItemsCopy[index] = foundProductCopy;
      setCartItems(cartItemsCopy);
      setTotalPrice((prevPrice) => prevPrice + foundProduct.price);
      setTotalQuantities((prevQty) => prevQty + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        let foundProductCopy = foundProduct;
        foundProductCopy.quantity -= 1;
        let cartItemsCopy = [...cartItems];
        cartItemsCopy[index] = foundProductCopy;
        setCartItems(cartItemsCopy);
        setTotalPrice((prevPrice) => prevPrice - foundProduct.price);
        setTotalQuantities((prevQty) => prevQty - 1);
      }
    }
  }
  function removeFromCart(product) {
    foundProduct = cartItems.find((item) => item._id === product._id);
    index = cartItems.find((item) => item._id === product._id);
    let cartItemsCopy = cartItems;
    cartItemsCopy.splice(index, 1);
    setCartItems(cartItemsCopy);
    setTotalPrice(
      (prevPrice) => prevPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities((prevQty) => prevQty - foundProduct.quantity);
  }
  function incQtyCallback() {
    setQty((prevQty) => prevQty + 1);
  }
  function decQtyCallback() {
    if (qty - 1 < 1) {
      setQty(1);
      return;
    }
    setQty((prevQty) => prevQty - 1);
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQtyCallback,
        decQtyCallback,
        onAdd,
        toggleCartItemQuantity,
        removeFromCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);
