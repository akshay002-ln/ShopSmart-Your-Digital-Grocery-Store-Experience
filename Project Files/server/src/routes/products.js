const app = require("../app");
const models = require("../models/schema");

app.post('/api/admin/add-product', async (req, res) => {
  try {
    const {
      productname,
      description,
      price,
      brand,
      image,
      category,
      countInStock,
      rating
    } = req.body;

    // Validate required fields
    if (!productname || !description || !price || !image || !category || !countInStock || !rating) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    // Check if category exists
    const foundCategory = await models.Category.findOne({ category });
    if (!foundCategory) {
      return res.status(404).send({ message: 'Category not found' });
    }

    // Create product
    const product = new models.Product({
      productname,
      description,
      price,
      image,
      brand: brand || '', // optional
      category: foundCategory.category, // or foundCategory._id
      countInStock,
      rating,
      dateCreated: new Date()
    });

    // Save to DB
    await product.save();

    res.status(201).send({ message: 'Product added', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});
