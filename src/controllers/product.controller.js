import { Product } from "../shared/models/products.model.js";
import { SuccessResponse } from "../shared/responseProcessor.js";
import { PageNotFoundError } from "../shared/error.js";

const getProductController = async (req, res) => {
  const { limit, skip, page } = req.pagination;
  const products = await Product.find().skip(skip).limit(limit);
  const total = await Product.countDocuments();
  return new SuccessResponse({
    data: products,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

const postCreateProductController = async (req, res) => {
  const data = req.body;
  const createProduct = await Product.create(data);
  const newProduct = createProduct.toObject();
  return new SuccessResponse(newProduct, "Product created successfully", 201);
};

const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new PageNotFoundError("Product not found");
  }
  return new SuccessResponse(product, "Product fetched successfully");
};

const putProductByIdController = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const product = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!product) {
    throw new PageNotFoundError("Product not found");
  }

  return new SuccessResponse(product, "Product updated successfully");
};

const patchProductByIdController = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const product = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!product) {
    throw new PageNotFoundError("Product not found");
  }
  return new SuccessResponse(product, "Product updated successfully");
};

const deleteProductByIdController = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new PageNotFoundError("Product not found");
  }
  return new SuccessResponse(null, "Product deleted successfully");
};

export {
  getProductController,
  postCreateProductController,
  getProductByIdController,
  putProductByIdController,
  patchProductByIdController,
  deleteProductByIdController,
};
