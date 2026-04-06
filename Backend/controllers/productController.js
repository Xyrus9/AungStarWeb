import asyncHandler from '../middleware/asyncHandler.js';  
import Product from '../models/productModel.js';


const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    price,
    description,
    image,
    maker,
    brand,
    accessoriesType,
    goldType,
    jewelryType,
    countInStock,
    numReviews,
  } = req.body;

  const product = new Product({
    name,
    category,
    price,
    description,
    image,
    maker,
    brand,
    accessoriesType,
    goldType,
    jewelryType,
    countInStock: countInStock ?? 0,
    numReviews: numReviews ?? 0,
    user: req.user?._id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, price, description, image, maker, accessoriesType, goldType, jewelryType } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.category = category;
    product.price = price;
    product.description = description;
    product.image = image;
    product.maker = maker;
    product.accessoriesType = accessoriesType;
    product.goldType = goldType;
    product.jewelryType = jewelryType;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };