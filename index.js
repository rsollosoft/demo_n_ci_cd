const express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

require('./routes')(app);

app.listen(4000, (error) =>{
    console.log("Text is running at 4000");
})