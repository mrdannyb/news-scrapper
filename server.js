const cheerio = require("cheerio");
const request = require("request");
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

const mongodb_uri = process.env.MONGODB_URI || 'mongodb://localhost/newscrap';

//MONGODB_URI: mongodb://heroku_7q2xxbx7:6v48rq989jb78ago9t2bftfn3b@ds121696.mlab.com:21696/heroku_7q2xxbx7
// mongodb://heroku_7q2xxbx7:6v48rq989jb78ago9t2bftfn3b@ds121696.mlab.com:21696/heroku_7q2xxbx7

mongoose.Promise = Promise;
mongoose.connect(mongodb_uri, { useMongoClient: true });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false })); //not sure what the difference is
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
