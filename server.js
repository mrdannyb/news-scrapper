const cheerio = require("cheerio");
const request = require("request");
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

const mongodb_uri = process.env.mongodb_uri || 'mongodb://localhost/newscrap';

mongoose.Promise = Promise;
mongoose.connect(mongodb_uri, { useMongoClient: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true })); //not sure what the difference is
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.static('./public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const routes = require('./routes/router.js');

app.use('/',routes);

app.listen(port, function () {
 console.log("You're tuning into server radio, port: " + port);
});

// request('https://www.nytimes.com/', function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     const $ = cheerio.load(html);
//     $('h2.story-heading').each(function (i, elem) {
//       let art = $(this).children('a');
//       let data = {
//         title: art.html(),
//         url: art.attr('href')
//       }
//       console.log(data);
//       console.log(art.html());
//       console.log(art.attr('href'));
//       console.log('++++++++++++++++++++');
//     });
//   }
// });
