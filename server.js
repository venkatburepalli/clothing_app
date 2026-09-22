const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/api/products", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Classic T-Shirt",
            price: 799,
            category: "T-Shirts",
            image: "/images/tshirt.jpg"
        },
        {
            id: 2,
            name: "Slim Fit Jeans",
            price: 1499,
            category: "Jeans",
            image: "/images/jeans.jpg"
        },
        {
            id: 3,
            name: "Formal Shirt",
            price: 1199,
            category: "Shirts",
            image: "/images/shirt.jpg"
        },
        {
            id: 4,
            name: "Premium Hoodie",
            price: 1799,
            category: "Hoodies",
            image: "/images/hoodie.jpg"
        }
    ]);
});

app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        application: "Clothing App"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Clothing App running on port ${PORT}`);
});