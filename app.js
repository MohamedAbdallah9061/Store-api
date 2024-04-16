require('dotenv').config();
require('express-async-errors');
//aysnc errors 
const connectDB=require('./db/connect');
const express=require('express');
const notFound=require('./middleware/NotFound');
const erroHandlerMiddlware=require('./middleware/ErrorHandler');
const app=express();
const router=require('./routes/product');

const port=4000||process.env.PORT;
//middleware
app.use(express.json());

app.use('/api/v1/products',router);

app.use(notFound);
app.use(erroHandlerMiddlware);

const start=async()=>
{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{console.log(`Server Is Listening ${port}....`)})
        
    } catch (error) {
        console.log(error);
    }
}

start();


