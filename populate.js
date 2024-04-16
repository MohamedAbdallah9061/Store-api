const Product=require('./model/product');
const connectDB=require('./db/connect');
const jsonProduct=require('./products.json');
const product = require('./model/product');
require('dotenv').config()

const start=async ()=>
{
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProduct);
        console.log("success...!");
    } catch (error) {
        console.log(error)
    }
}

start();