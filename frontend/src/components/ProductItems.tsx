import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
interface ProductType {
  name: string;
  price: number;
  ind: number;
  url: string;
  imgs?: string[];
}

interface ProductItemsProps {
  item: ProductType;
  index: number;
}

export default function ProductItems({ item, index }: ProductItemsProps) {
  const { name, price, ind, url, imgs } = item;
  return (
    <div className="card">
      <Link to={`/details/${ind}`} state={item} className="card-section">
        <img src={url} alt={name} />
        <div className="text-container">
          <div className="text">
            <h5> Product Name: {name}</h5>
            <h5> Price: {price} kr</h5>
            <h5>Description:</h5>
            <p>
              Lorem ipsum dolor sit, commodi odit nisi quae,commodi odit nisi
              quae.
            </p>
          </div>
          <div className="btn-container">
            <button>
              Lägg till korg <MdOutlineShoppingCart id="cart-icons" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
