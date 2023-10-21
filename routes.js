const bodyParser = require('body-parser');
const test = require("./controller/test");
module.exports = function(app) {
    app.use(bodyParser);
    app.post("/get" , (req, res) => {
        console.log("called")
        test.doWebScrapping(req, res);
    })
    test.doWebScrapping("https://www.amazon.in/l/976419031/?_encoding=UTF8&pd_rd_w=zC5DT&content-id=amzn1.sym.370ccac9-3da7-42e7-a632-4f4c472551fd&pf_rd_p=370ccac9-3da7-42e7-a632-4f4c472551fd&pf_rd_r=B63PP58Q8ZG6DQ7SHMJM&pd_rd_wg=zfi7V&pd_rd_r=f862fd19-f411-4aba-8f1c-78cad97ca173&ref_=pd_gw_unk")
}