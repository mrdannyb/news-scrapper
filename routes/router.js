const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const db = require("../model");

let router = express.Router();

router.get('/', function (req,res) {
  db.Article
    .find({})
    .then(function (data) {
      res.render('home', {articles: data})
    }).catch(function (err) {
      if (err) throw err;
    })
});

router.get('/scrape', function (req,res) {
  console.log("scraping");
  const scrapURL = 'https://www.nytimes.com/section/science/space?action=click&contentCollection=science&region=navbar&module=collectionsnav&pagetype=sectionfront&pgtype=sectionfront'
  request(scrapURL, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $('#latest-panel a.story-link').each(function (i, elem) {
        if (i < 15) {
          let data = {};
          data.headline = $(this).find('h2.headline').text().trim();
          data.url = $(this).attr('href');
          data.summary = $(this).find('p.summary').text().trim();
          data.saved = false;
          db.Article
            .update(data,data, { upsert:true })
            .then(function (articles) {
              res.send("Scrape Complete");
            })
            .catch(function (err) {
              res.json(err);
            });
          console.log(data);
          console.log('++++++++++++++++++++');
        } else {
          return false;
        };
      });
      res.redirect('back');
    }
  });
});

router.get('/saved', function (req,res) {
  db.Article
    .find({
      saved: true
    })
    .then(function (articles) {
      res.json(articles);
    });
});

router.post('/save/:id',function (req,res) {
  res.json(data)
});

router.post('/addComment/:id',function (req,res) {
  db.Comment.create({"body": req.body.body})
  .then(function (dbComment) {
    return db.Article.findOneAndUpdate({_id: req.params.id}, { $push: { comments: dbComment._id } }, { new: true });
  })
  .then(function (dbArticle) {
    res.json(dbArticle);
  })
  .catch(function (error) {
    res.json(error);
  });
});

router.delete('/delComment/:artID/:comID', function (req,res) {
  res.json(data)
});

router.delete('/forget/:id', function (req,res) {
  res.json(data)
});

module.exports = router;
