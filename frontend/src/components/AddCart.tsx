import React, { useEffect, useState } from "react";
import { fetchPostData } from "../utilities/Fetch";

interface ProductType {
  name: string;
  price: number;
  url: string;
  ind: number;
}

export default function AddCart({ price, name, url, ind }: ProductType) {
  const [counter, setCounter] = useState<number>(1);
  const initialStock = 101;
  const [mount, setMount] = useState<number>(
    () => Number(localStorage.getItem(`stock-${ind}`)) || initialStock
  );

  // Set initial stock in localStorage if not already set
  useEffect(() => {
    if (!localStorage.getItem(`stock-${ind}`)) {
      localStorage.setItem(`stock-${ind}`, String(initialStock));
    }
  }, [ind, initialStock]);

  // Increase counter function
  const handleIncrease = () => {
    if (counter < mount) {
      setCounter((prev) => prev + 1);
    }
  };

  // Decrease counter function
  const handleDecrease = () => {
    if (counter > 1) {
      setCounter((prev) => prev - 1);
    }
  };

  // post  req add to cart
  async function handleAdd() {
    await fetchPostData(name, counter, url, price, ind);
    const newStock = mount - counter;
    setMount(newStock);
    localStorage.setItem(`stock-${ind}`, String(newStock));
    window.location.reload();
  }

  return (
    <div className="text">
      <div className="text-section">
        <h5>Product Name: {name}</h5>
        <h5>Price: {(price * counter).toFixed(2)} kronor</h5>
        <h5>Description</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam.
        </p>
        <p>Stock available: ({mount - counter}) units</p>
      </div>

      <div className="btn-container">
        <div className="counter">
          <p className="stycke">Choose quantity:</p>
          <div className="counter-section">
            <button onClick={handleDecrease} disabled={counter <= 1}>
              -
            </button>
            <p>{counter}</p>
            <button onClick={handleIncrease} disabled={counter >= mount}>
              +
            </button>
          </div>
        </div>

        <button onClick={handleAdd}>
          Lägg till korg<span>({counter})</span>
        </button>
      </div>
    </div>
  );
}
