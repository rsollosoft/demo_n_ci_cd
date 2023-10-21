const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors);

require('./routes')(app);

app.listen(1000, (error) =>{
    console.log("Text is running");
})