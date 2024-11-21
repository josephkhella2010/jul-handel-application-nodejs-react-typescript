import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Products from "./products.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000; // Default to 5000 if no PORT is defined

// test
app.get("/", (req, res) => {
    res.status(200).json({ sms: "welcome to jesus" });
});
/// pagination get request with id
// Route to get paginated products
app.get("/Products/page/:id", (req, res) => {
    try {
        const page = Number(req.params.id);
        if (isNaN(page)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid page number" });
        }

        // Find the data for the specified page
        const pageData = Products.pages.find(item => item.page === page);

        if (pageData) {
            return res.status(200).json({
                success: true,
                products: pageData.products,
                totalPages: Products.pages.length // Corrected to use Products.pages.length
            });
        } else {
            return res
                .status(404)
                .json({ success: false, message: "Page not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

//////////////////////////////////////////////////////////////
// post request with cart
// Cart functionality
let cart = [];

// POST route to add product to cart
app.post("/addproduct", (req, res) => {
    try {
        const { name, price, counter, url, ind } = req.body;
        if (!name || !price || !counter || !url || !ind) {
            return res.status(400).json({ error: "Invalid product data" });
        }
        cart.push({ name, price, counter, url, ind });
        console.log(cart);
        res.status(200).json({ success: true, products: cart });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

//////////////////////////////////////////////////////////////////////////////////7
// get  method for  cart product
app.get("/cart", (req, res) => {
    try {
        res.status(200).json({ success: true, products: cart }); // Fixed the "sucess" typo
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
//////////////////////////////////////////////////////////////////////////////////////
//get methd by id with cart product according to ind
app.get("/product/:ind", (req, res) => {
    const { ind } = req.params;
    console.log("Requested ind:", ind);
    console.log("Products.pages:", Products.pages);

    // Search through each page
    let foundProduct = null;
    for (let page of Products.pages) {
        foundProduct = page.products.find(item => item.ind === Number(ind));
        if (foundProduct) break;
    }

    if (foundProduct) {
        res.status(200).json(foundProduct);
    } else {
        console.log("Product not found for ind:", ind);
        res.status(404).json({ message: "Product not found" });
    }
});
/////////////////////////////////////////////////////////////////////////////////////////
//delete cart items by ind
app.delete("/deletecart/:id", (req, res) => {
    const { id } = req.params;
    try {
        const itemIndex = cart.findIndex(item => item.ind === Number(id));
        if (itemIndex === -1) {
            return res.status(404).json({ error: "Product not found" });
        }
        cart.splice(itemIndex, 1);
        res.status(200).json({ message: "Product successfully deleted", cart });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

/////////////////////////////////////////////////////////////////////////////////////7
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});