var express = require('express');
var app = express.Router();
const yup = require('yup');
const User = require('../user_schema');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const saltRounds = 14;

mongoose.connect('mongodb://localhost:27017/myDb');
const { MongoClient } = require('mongoDb');

const userschema = yup.object().shape({
  username: yup.string().required(),
  password : yup.string().required(),
});

app.get('/', function (req, res) {
  res.render('Users',{});
});

app.post('/', cors(),async function (req, res) {
  const {username, password} = req.body;
  const pwd = bcrypt.hashSync(password, saltRounds);
  const userExist = await User.findOne({username});
  if(userExist){
    res.end('User already exists');
  }

  const user = new User({...req.body, password: pwd});
  try{
      userschema.validateSync(req.body);
      try{
          await user.save();
          res.sendStatus(201);
      }
      catch(err){
          console.error(err);
      }
  }
  catch(err){
      console.log(err);
  }
  
})


module.exports = app;
