const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ติดต่อ MongoDB
mongoose.connect('mongodb://localhost:27017/productDB');

// สร้าง Schema และ Model
const productSchema = new mongoose.Schema
({
    name: String,
    category: String,
    price: Number,
    stock: Number
    });

const Product = mongoose.model('Product', productSchema);

// รันเซิร์ฟเวอร์
app.listen(3000, () => 
{
    console.log('Server is running on port 3000');
});

// API Endpoint: ดูรายการสินค้า
app.get('/products', async (req, res) => 
{
    try 
    {
        const products = await Product.find();
        console.log('ข้อมูลที่ถูกเรียกดูสินค้าทั้งหมด', products);
        res.status(200).send(products);
    } catch (err) 
    {
        res.status(500).send(err);
    }
});

// API Endpoint: ดูรายการสินค้าตาม ID
app.get('/products/:id', async (req, res) => 
{
    try 
    {
        const products = await Product.findOne({ _id: req.params.id });
        console.log('ข้อมูลที่ถูกเรียกดูสินค้าตาม ID', products);
        res.status(200).send(products);
    } catch (err) 
    {
        res.status(500).send(err);
    }
});

// API Endpoint: เพิ่มสินค้า
app.post('/products', async (req, res) => 
{
    try 
    {
        const newProduct = new Product(req.body);
        await newProduct.save();
        console.log('ข้อมูลที่ถูกเพิ่ม', newProduct);
        res.status(201).send(newProduct);
    } catch (err) 
    {
        res.status(500).send(err);
    }
});

// API Endpoint: แก้ไขสินค้า
app.put('/products/:id', async (req, res) => 
{
    try 
    {
        await Product.updateOne({ _id: req.params.id }, req.body);
        const updatedProduct = await Product.findOne({ _id: req.params.id });
        console.log('ข้อมูลที่ถูกแก้ไข', updatedProduct);
        res.status(200).send('Updated successfully');
    } catch (err) 
    {
        res.status(500).send(err);
    }
});


// API Endpoint: ลบสินค้า
app.delete('/products/:id', async (req, res) => 
{
    try {
        const products = await Product.deleteOne({ _id: req.params.id });
        console.log('ข้อมูลที่ถูกลบ',products);
        res.status(200).send('Deleted successfully');
    } catch (err) 
    {
        res.status(500).send(err);
    }
});