const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri,(err)=>{
  if(err){
    console.log("Could not connect to database: " + err);
  }else{
    console.log("Connected to database: " + config.db);
  }
})

var app = express();
const PORT = process.env.PORT || 8080;


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/client/dist/')))

app.get('/' , (req,res)=> {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
})

app.listen(PORT , () => {
  console.log("Listening on port: " + PORT);
})
