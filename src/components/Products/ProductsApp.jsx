import React, { useReducer, useEffect } from "react";
import ProductItem from "./ProductItem";
import styled from "styled-components";

const getInitialValue = () => {
  const cartData = localStorage.getItem("cart");
  const cart = cartData ? JSON.parse(cartData) : [];
  const products = [
    {
      id: 1,
      name: "Product 1",
      number: 1,
      price: 1,
      src: "https://avatars.mds.yandex.net/i?id=dcdcc92e2edf11946da7be90a01d5d8f93767955-10106325-images-thumbs&n=13",
      alt: "Strawberry",
      quantity: cart.filter((id) => id === 1).length,
      remove: "Remove",
    },
    {
      id: 2,
      name: "Product 2",
      number: 2,
      price: 2,
      src: "https://avatars.mds.yandex.net/i?id=db4436b0a72e5cdb8034f28a1ba1d6e6520c2db7-10611957-images-thumbs&n=13",
      alt: "Orange",
      quantity: cart.filter((id) => id === 2).length,
      remove: "Remove",
    },
    {
      id: 3,
      name: "Product 3",
      number: 3,
      price: 3,
      src: "https://avatars.mds.yandex.net/i?id=2f765a31ce961efc8f0d41b70532a53ae945df1e-9137656-images-thumbs&n=13",
      alt: "Kiwi",
      quantity: cart.filter((id) => id === 3).length,
      remove: "Remove",
    },
  ];

  return {
    products,
    cart,
    totalPrice: 0,
  };
};

const productsReducer = (state, action) => {
  switch (action.type) {
    case "AddProduct":
      const productId = action.payload;
      const updatedProducts = state.products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      const updatedCart = [...state.cart, productId];
      const newTotalPrice = updatedProducts.reduce((acc, product) => {
        return acc + product.quantity * product.price;
      }, 0);
      return {
        ...state,
        products: updatedProducts,
        cart: updatedCart,
        totalPrice: newTotalPrice,
      };

    case "RemoveProduct":
      const removedProductId = action.payload;
      const updatedCartAfterRemoval = state.cart.filter(
        (id) => id !== removedProductId
      );
      const updatedProductsAfterRemoval = state.products.map((product) => {
        if (product.id === removedProductId && product.quantity > 0) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
      const newTotalPriceAfterRemoval = updatedProductsAfterRemoval.reduce(
        (acc, product) => {
          return acc + product.quantity * product.price;
        },
        0
      );
      return {
        ...state,
        products: updatedProductsAfterRemoval,
        cart: updatedCartAfterRemoval,
        totalPrice: newTotalPriceAfterRemoval,
      };
    case "ResetQuantity":
      const resetProductCardId = action.payload;
      const updatedCartAfterCardRemoval = state.cart.filter(
        (id) => id !== resetProductCardId
      );
      const updatedProductsAfterCardRemoval = state.products.map((product) => {
        if (product.id === resetProductCardId) {
          return {
            ...product,
            quantity: 0,
          };
        }
        return product;
      });
      const newTotalPriceAfterCardRemoval =
        updatedProductsAfterCardRemoval.reduce((acc, product) => {
          return acc + product.quantity * product.price;
        }, 0);
      return {
        ...state,
        products: updatedProductsAfterCardRemoval,
        cart: updatedCartAfterCardRemoval,
        totalPrice: newTotalPriceAfterCardRemoval,
      };

    default:
      return state;
  }
};

const ProductsApp = () => {
  const [products, dispatch] = useReducer(productsReducer, getInitialValue());

  useEffect(() => {
    saveCartToLocalStorage();
  }, [products.cart]);

  const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(products.cart));
  };

  const addProductHandler = (id) => {
    dispatch({ type: "AddProduct", payload: id });
  };

  const removeProductHandler = (id) => {
    dispatch({ type: "RemoveProduct", payload: id });
  };
  const ResetQuantity = (id) => {
    dispatch({ type: "ResetQuantity", payload: id });
  };
  return (
    <ConProducts>
      <ProductItem
        onAddProduct={addProductHandler}
        onRemoveProduct={removeProductHandler}
        onRemoveProductCard={ResetQuantity}
        products={products.products}
      />
      <h1>TOTAL : ${products.totalPrice}</h1>
    </ConProducts>
  );
};

export default ProductsApp;

const ConProducts = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  h1 {
    margin: 2rem 0;
  }
`;
