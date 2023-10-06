if(process.env.NODE_ENV === 'production') { //환경 변수가 production이면 작동한다.
    module.exports = require("./prod");
}
else{ //production이 아니면 여기가 작동한다.
    module.exports = require ("./dev");
}