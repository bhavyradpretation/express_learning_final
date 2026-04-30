import { Product } from "../shared/models/products.model";

const getProductController = async (req, res) => {
  const { limit, skip, page } = req.pagination;

  const Products = await Product.find().skip(skip).limit(limit);

  const total = await Product.countDocuments();

  return new SuccessResponse({
    data: Products,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

const postCreateProductController = async (req, res, next) => {
  const { data } = req;
  console.log({ data });
  data.password = await hash(data.password, 10);
  console.log({ data });
  const createProduct = await Product.create(data);
  const newProduct = createProduct.toObject();
  delete newProduct.password;
  return new SuccessResponse(newProduct, "Product created successfully", 201);
};

const getProductByIdController = () => {};

const putProductByIdController = () => {};

const patchProductByIdController = () => {};

const deleteProductByIdController = () => {};

export {
  getProductController,
  postCreateProductController,
  getProductByIdController,
  putProductByIdController,
  patchProductByIdController,
  deleteProductByIdController,
};
