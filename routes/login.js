var express = require('express');
var app = express.Router();
const yup = require('yup');
const User = require('../user_schema');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const saltRounds = 14;
const SECRET_CODE = '1728946';

mongoose.connect('mongodb://localhost:27017/myDb');
const { MongoClient } = require('mongoDb');

app.get('/', function (req, res) {
  res.render('login',{});
});

app.post('/', cors(), async function (req, res) {
  //const pwd = bcrypt.hashSync(req.body.password, saltRounds);
  const {username, password} = req.body;
  const user = await User.findOne({username});
  if(!user){
      res.sendStatus(404);
  }
  else{
      const isCorrect = bcrypt.compareSync(password, user.password);
      if(isCorrect){
          const token = jwt.sign({username:user.username}, SECRET_CODE);
          console.log(token);
          res.end('Login successful');
      }
      else{
          res.sendStatus(403);
      }
  }
 
})


module.exports = app;
