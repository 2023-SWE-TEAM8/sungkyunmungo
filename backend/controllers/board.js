exports.getAddBoard = (req, res, next) => {
    res.render("/product",{
        pageTitle: "Add Product",
        path: "/board/product",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}