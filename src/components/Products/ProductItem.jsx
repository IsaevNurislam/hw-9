import React from "react";
import styled from "styled-components";

const ProductsItem = ({
  products,
  onAddProduct,
  onRemoveProduct,
  onRemoveProductCard,
}) => {
  return (
    <>
      {
        <COn>
          {products.map(({ id, name, quantity, price, src, alt }) => {
            if (quantity > 0) {
              return (
                <ConCard key={id}>
                  <img src={src} alt={alt} />
                  <p>
                    {name} - {price ? quantity * price : ""} $
                    <button>Added</button>
                  </p>
                </ConCard>
              );
            }
          })}
        </COn>
      }
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {products.map(
            ({ id, name, quantity, price, src, alt, number, remove }) => (
              <tr key={id}>
                <td>{number}</td>
                <td>
                  <ProductImage src={src} alt={alt} />
                </td>
                <td>{name}</td>
                <td>${price}</td>
                <td>
                  <CounterBtn onClick={() => onAddProduct(id)}>+</CounterBtn>
                  {quantity}
                  <CounterBtn onClick={() => onRemoveProduct(id)}>-</CounterBtn>
                </td>
                <td>
                  <RemoveBtn onClick={() => onRemoveProductCard(id)}>
                    {remove}
                  </RemoveBtn>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ProductsItem;

const Table = styled.table`
  width: 95%;
  border-collapse: collapse;
  th,
  td {
    text-align: center;
    padding: 8px;
    width: 200px;
    height: 80px;
    border-top: 1px solid #000;
    border-bottom: none;
  }
  td {
    font-size: 20px;
    font-weight: 500;
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: auto;
`;

const ConCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin-bottom: 2rem;
  border: 1px solid rgb(211, 207, 207);
  flex-direction: column;
  border-radius: 3px;
  text-align: center;
`;
const COn = styled.div`
  display: flex;
  gap: 20px;
  img {
    width: 8rem;
    height: 8rem;
    margin-top: 0.5rem;
  }
  button {
    width: 8rem;
    height: 3rem;
    margin: 1rem 0;
    background-color: rgb(98, 222, 98);
    border: none;
    border-radius: 3px;
  }
`;

const CounterBtn = styled.button`
  text-align: center;
  background-color: rgb(26, 227, 221);
  width: 1.2rem;
  height: 2rem;
  margin: 0 10px;
  border-radius: 3px;
`;

const RemoveBtn = styled.button`
  text-align: center;
  background-color: red;
  border-radius: 3px;
  width: 5rem;
  height: 2rem;
`;
