import axios from "axios";

// Base API URL
const API_BASE_URL = "http://localhost:5000";

export interface ProductType {
  name: string;
  price: number;
  counter: number;
  imgs?: string[];
  ind: number;
  url: string;
}

///////////////////////////////////////////////////////////////////////////////////////////
// Fetch cart data
 export const fetchCartData = async (): Promise<ProductType[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`);
    return response.data.products; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching cart data:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return [];
  }
};
 
///////////////////////////////////////////////////////////////////////////////////////////
// Add a product to the cart
export const fetchPostData = async (
  name: string,
  counter: number,
  url: string,
  price: number,
  ind: number
): Promise<void> => {
  try {
    const newProduct = {
      name,
      counter,
      url,
      price: parseFloat((price * counter).toFixed(2)),
      ind,
    };
    const response = await axios.post(`${API_BASE_URL}/addproduct`, newProduct);
    console.log("Product added:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error adding product:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

///////////////////////////////////////////////////////////////////////////////////////////
// Delete an item from the cart
export const deleteItem = async (ind: number): Promise<void> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/deletecart/${ind}`);
    console.log("Item deleted:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error deleting item:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

///////////////////////////////////////////////////////////////////////////////////////////
// Fetch a single product by ID
export const getSingleApi = async (id: number): Promise<ProductType | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/${id}`);
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching product with ID ${id}:`, error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};
