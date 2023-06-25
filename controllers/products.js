const {Product} = require('../models');
const fs =require("fs")
// Get all products
async function getAllProducts (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  try {
    // include:category
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a single product by ID
async function getProductById (req, res) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new product
async function createProduct(req, res) {
  const { name, description, price, categoryId } = req.body;
  console.log("nameeeeeeeee",req.body);
  try {     
  let image = '';
        if (req.file) {
            image = `_uploads/products/${req.file.filename}`;
        }

  // const image = req.file.filename
  // const imgUrl = image ? `${req.protocol}://${req.hostname}:${process.env.PORT}/_uploads/products/${image}` : null;
 
    const product = await Product.create
    ({ name,image, description, price, categoryId });
            const imgUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}/${image}`;
       console.log(imgUrl);
            product.image = imgUrl;
        await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({status:'Server Error'});
  }
};

// const { name, price, description, underCategory_id } = req.body;

//         let image = '';
//         if (req.file) {
//             image = `uploads/${req.file.filename}`;
//         }

//         const data = await Product.create({ name, price, description, underCategory_id, image });

//         const imgUrl = `${req.protocol}://${req.hostname}:6005/${image}`;
//         data.image = imgUrl;
//         await data.save();



// Update an existing product by ID
async function updateProduct(req, res) {
  const { name, image, description, price, categoryId } = req.body;
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    product.name = name;
    product.image = image;
    product.description = description;
    product.price = price;
    product.categoryId = categoryId
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete an existing product by ID

async function deleteProduct(req, res)  {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    await product.destroy();
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct}

