const {StatusCodes} = require('http-status-codes');
const Url = require('../models/Url');
const generateCode = require('../../utils');

const createShortURL = async (req, res) => {
 const payload = req.body;
 const {userId} = req.user;
 payload.ownerId = userId;
 console.log(payload);
 if (!payload.longURL) {
  return res.status(StatusCodes.BAD_REQUEST).json({message: "Long URL is required"});
 }
 payload.code = generateCode();
 const resp = await Url.create(payload);
 res.status(StatusCodes.CREATED).json({message: "Short URL Created", data: resp});
}

const getShortURL = async (req,res) => {
 const userId = req.user.userId;
 const resp = await Url.find({ownerId: userId});
 res.status(StatusCodes.OK).json({data: resp, count: resp.length});
}

const redirectToLongURL = async (req,res) => {
 const {id: shortURLId} = req.params;
 const resp = await Url.findOne({code: shortURLId});
 if (!resp) {
  return res.status(StatusCodes.NOT_FOUND).json({message: "Short URL not found"});
 }
 if (!resp.active) {
  return res.status(StatusCodes.BAD_REQUEST).json({message: "Short URL is not active"});
 }
 return res.status(StatusCodes.TEMPORARY_REDIRECT).redirect(resp.longURL);

}

const getSingleShortURL = async (req,res) => {
 const userId = req.user.userId;
 const {id: shortURLId} = req.params;
 const resp = await Url.findOne({code: shortURLId, ownerId: userId});
 if (!resp) {
  return res.status(StatusCodes.NOT_FOUND).json({message: "Short URL not found"});
 }
 res.status(StatusCodes.OK).json({ data: resp });
}

const deleteShortURL = async (req, res) => {
 const {id: shortURLId} = req.params;
 const userId = req.user.userId;
 const resp = await Url.findOneAndDelete({code: shortURLId, ownerId: userId});
 if (!resp) {
  return res.status(StatusCodes.NOT_FOUND).json({message: "Short URL not found"});
 }
 return res.status(StatusCodes.OK).json({message: "Short URL Deleted"});
}

module.exports = {
 createShortURL,
 getShortURL,
 redirectToLongURL,
 deleteShortURL,
 getSingleShortURL
}