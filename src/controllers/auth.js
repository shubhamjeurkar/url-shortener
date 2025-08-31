const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
 try {
  const {name, email, password} = req.body;
 
  if(!name ||!email || !password) {
   return res.status(StatusCodes.BAD_REQUEST).json({msg: "Please provide all values"});
  }
 
  const user = await User.create({name, email, password});
  const token = await user.createJWT();
  res.status(StatusCodes.CREATED).json({user: {name: user.name, email: user.email}, token});
  
 } catch (error) {
  console.log(error);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong, please try again"});
 }


}

const login = async (req, res) => {
 try {
  const {email, password} = req.body;

  if(!email || !password) {
   return res.status(StatusCodes.BAD_REQUEST).json({msg: "Please provide all values"});
  }

  const user =await User.findOne({email});

  if(!user) {
   return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Invalid Credentials"});
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if(!isPasswordCorrect) {
   return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Invalid Credentials"});
  }

  const token = await user.createJWT();
  res.status(StatusCodes.OK).json({user: {name: user.name, email: user.email}, token});
 } catch (error) {
  console.log(error);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong, please try again"});
 }
}

module.exports = {
 register,
 login
}