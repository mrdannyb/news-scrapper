const express = require('express');

const db = require("./models");

let router = express.Router();

router.get('/', function (req,res) {
  db.Article
    .find({})
    .then(function (articles) {
      res.render(articles);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get('/scrape', function (req,res) {
  //run a scrape into the db
  //then read the db into the page
  res.render('home')
});

router.get('/saved', function (req,res) {
  res.render('home')
})

router.post('/save/:id',function (req,res) {
  res.json(data)
})

router.post('/addComment/:id',function (req,res) {
  //use mongoose to add the comment (req.body.comment)
  //we will make
  res.json(data)
});

router.delete('/delComment/:id', function (req,res) {
  res.json(data)
})

router.delete('/delete/:id', function (req,res) {
  res.json(data)
})

module.exports = router;
