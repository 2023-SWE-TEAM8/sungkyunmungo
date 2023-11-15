const Product = require("../models/product");

// board의 모든 물건 보여주기
exports.postBoardAll = (req, res, next) => {
    // res.render("/postall",{
    //     pageTitle: "Post Product All",
    //     path: "/board/postall",
    //     formsCSS: true,
    //     productCSS: true,
    //     activeAddProduct: true

    Product.find((error, article_api) => {
        //에러가 발생할 경우
        if (error) {
            console.log(error);
            return res.send({ success: false, err });
            //에러가 발생 안할 경우에
        }
        else{
            data = article_api; //api 데이터를 data 변수에 담는다.
            res.status(200).json({
            // 에러가 발생 안했으므로. json으로 던져준다.
            success: true,
            data: data,
            });
        }
    });
}

exports.postBoardPage = async (req, res, next) => {
    try {
        var page = Math.max(1, parseInt(req.query.page)) || 1;
        var limit = Math.max(1, parseInt(req.query.limit)) || 10;
        var major = req.query.major || 'all'; // Get the major query parameter or default to 'all'

        var skip = (page - 1) * limit;
        var query = {};

        if (major !== 'all') {
            query.major = major; // If a specific major is provided, filter by it
        }

        var count = await Product.countDocuments(query);
        var maxPage = Math.ceil(count / limit);
        var posts = await Product.find(query)
            .sort("-createdAt")
            .skip(skip)
            .limit(limit)
            .exec();

        res.status(200).json({
            success: true,
            data: posts,
            currentPage: page,
            maxPage: maxPage,
            limit: limit,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err.message });
    }
}

exports.postBoard = async (req, res, next) => {
    try {
        const newProduct = await Product.create({
            writer: req.body.writer,
            title: req.body.title,
            price: req.body.price, // Fixed typo here
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            campus: req.body.campus,
            major: req.body.major,
            condition: req.body.condition, // Fixed typo here
            status: req.body.status
        });
        res.status(200).json({
            "code": 200,
            "isSuccess": true,
            "message": "게시글 작성에 성공하였습니다.",
            "data": newProduct // Optional: Return the created product
        });
    } 
    catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({
            "code": 500,
            "isSuccess": false,
            "message": "서버에서 오류가 발생했습니다. 나중에 다시 시도하세요"
        });
    }
};


exports.searchProduct = async (req, res, next) => {
    try {
        const searchTerm = req.query.searchTerm; // 검색어는 쿼리 파라미터로 

        // 정규표현식을 사용하여 검색어에 대한 패턴을 생성
        const regex = new RegExp(searchTerm, 'i'); // 'i' -> 대소문자를 구분하지 않도록

        // 몽고DB에서 데이터를 찾을 때 제품 이름에 대한 검색을 수행
        const foundProducts = await Product.find({ title: regex });

        if (foundProducts.length === 0) {
            return res.status(404).json({ message: '검색 결과가 없습니다.' });
        }

        res.status(200).json(foundProducts);

    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버에서 오류가 발생했습니다. 나중에 다시 시도하세요' });
    }
};


