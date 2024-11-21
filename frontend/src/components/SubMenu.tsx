import React from "react";
interface ProductProps {
  name: string;
  ind: number;
  url: string;
  counter: number;
  price: number;
}
interface SubMenuProps {
  product: ProductProps;
  handleDelete: (ind: number, counter: number) => void;
}

export default function SubMenu({ product, handleDelete }: SubMenuProps) {
  return (
    <div key={product.ind} className="sub-menu-section">
      <img
        src={product.url}
        alt={product.name}
        style={{ width: "50px", height: "70px" }}
      />
      <div className="text-container">
        <p>Name: {product.name}</p>
        <p>Price: {product.price.toFixed(2)} kr</p>
        <p>Quantity: {product.counter} stycke</p>
      </div>
      <button onClick={() => handleDelete(product.ind, product.counter)}>
        Delete
      </button>
    </div>
  );
}
