const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

// MONGO-DB
mongoose.set('strictQuery', true);

// ENVIRONMENT VARIABLES
dotenv.config();

// MONGO-DB CONNECTION
mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DB Connection Successful!"))
    .catch((err)=>{
        console.log(err);
});

// ROUTES FOR API
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/users", userRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running!");
});