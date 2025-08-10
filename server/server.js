const express = require('express');
const dotenv = require('dotenv');
const connectDb = require("./config/connect")

dotenv.config();

connectDb()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(PORT, (error) => {
    console.log(error);
    
    console.log(`Server running successfully at port ${PORT}`);
});



