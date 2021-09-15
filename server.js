const express = require('express');
const startConnection=require('./config/dbConnect');
const cors=require('cors');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const routes=require('./routes/index');
const { urlencoded } = require('body-parser');

startConnection();

const app=express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


const PORT=process.env.PORT||8080

app.use(cors());
app.use(urlencoded({extended:false}));
app.use(routes)
app.use(bodyParser.json());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});