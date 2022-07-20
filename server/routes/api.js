var express = require('express');
var router = express.Router();
const Book = require('../models/Books');


router.post('/book', (req, res, next) => {
  Book.create(
    {
        name: req.body.name,
        author: req.body.author,
        pages: req.body.pages
    },
    (error, ok) => {
        if (error) throw error;
        return res.send("ok");
    }
  )
});

module.exports = router;
