import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { deleteItem, fetchCartData } from "../utilities/Fetch";
import SubMenu from "./SubMenu";

interface ProductType {
  name: string;
  price: number;
  counter: number;
  imgs?: string[];
  ind: number;
  url: string;
}

export default function NavBar() {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [total, setTotal] = useState(0);

  // Fetch cart data
  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch cart data
  const fetchCart = async () => {
    const data = await fetchCartData();
    if (data) setProducts(data);
  };

  // Handle delete product from cart
  const handleDelete = async (ind: number, counter: number) => {
    try {
      await deleteItem(ind);
      const updatedProducts = products.filter((item) => item.ind !== ind);
      setProducts(updatedProducts);

      // Adjust stock
      const currentStock = Number(localStorage.getItem(`stock-${ind}`)) || 0;
      const newStock = currentStock + counter;
      localStorage.setItem(`stock-${ind}`, String(newStock));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Update total price
  useEffect(() => {
    const sumTotal = products.reduce((acc, product) => acc + product.price, 0);
    setTotal(sumTotal);
  }, [products]);

  return (
    <nav>
      <ul>
        <Link to="/" className="li">
          Home
        </Link>
        <div className="cart-container">
          <p className="cart-number">{products.length}</p>
          <FaCartPlus
            className="cart-sign"
            onClick={() => setShowSubMenu(!showSubMenu)}
          />
          {showSubMenu && (
            <div className="sub-menu">
              {products.length > 0 ? (
                products.map((product) => (
                  <SubMenu
                    key={product.ind}
                    product={product}
                    handleDelete={handleDelete}
                  />
                  /*   <div key={product.ind} className="sub-menu-section">
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
                    <button
                      onClick={() => handleDelete(product.ind, product.counter)}
                    >
                      Delete
                    </button>
                  </div> */
                ))
              ) : (
                <p>No products found</p>
              )}
              <h5>Total: {total.toFixed(2)} kronor</h5>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
}
