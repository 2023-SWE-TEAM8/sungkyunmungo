exports.get404= (req, res, next) => {
    // res.status(404).render("404", {pageTitle: 'Page not found'})
    console.log("error")
    res.status(404).send("rendering error");
};