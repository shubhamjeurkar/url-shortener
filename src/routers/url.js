const express = require('express');

const router = express.Router();

const { createShortURL, getShortURL, deleteShortURL, getSingleShortURL } = require('../controllers/url');

router.post("/urls", createShortURL).get("/urls", getShortURL);
router.get("/urls/:id", getSingleShortURL).delete("/urls/:id", deleteShortURL);

module.exports = router;