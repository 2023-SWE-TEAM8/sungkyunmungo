//라우트마다 실행하는 함수에 대해서 컨트롤러 파일과 함수에서 쉽게 알 수 있다.

const products = [];
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  console.log("admin-product");
  res.status(200).send("<h1>admin-getproduct page</h1>");
};

exports.postAddProduct = (req, res, next) => {
  console.log("admin-product");
  res.status(200).send("<h1>admin-product page</h1>");
  console.log(req.body);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  });
  product
    .save()
    .then((result) => {
      console.log("Create Product");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.products = products;
