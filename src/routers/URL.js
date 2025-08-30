const express = require('express');

const router = express.Router();

const {createShortURL, getShortURL, redirectToLongURL, deleteShortURL, getSingleShortURL} = require('../controllers/URL');

router.post("/urls", createShortURL).get("/urls", getShortURL);
router.get("/urls/:id", getSingleShortURL).delete("/urls/:id", deleteShortURL);
router.get("/:id", redirectToLongURL);

module.exports = router;