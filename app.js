const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const api = process.env.API_URL;

// const errorHandler = require("./helpers/error-handler");

//routes
const coursesRoutes = require('./routes/courses');
const studentRoutes = require('./routes/students');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//middleware
app.use(bodyParser.json()); //TP MAKE IT UNDERSTAND JASON SENT FROM FRONT END
app.use(morgan('tiny')); //console logging all requests, we can also save logs ing files
// app.use(errorHandler);
app.use(cors()); //enable any backend to use our backend apis
app.options('*', cors()); //allowing all http request to passed from any origin

//routes

app.use(`${api}/courses`, coursesRoutes);
app.use(`${api}/students`, studentRoutes);


//create database connection before starting server
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'LMS-DB'
})
    .then(() => {
        console.log('data base connection is ready');
    })
    .catch(err => {
        console.log(err);
    })

app.get('/', ((req, res) => {
    res.sendFile(__dirname +"/index.html");
    // res.send(200);
}))





app.listen(process.env.PORT || 3000 ,function(){

    console.log("listenning on port 3000");
});
