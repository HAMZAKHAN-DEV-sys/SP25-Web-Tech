
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const routes = require('./routes/index');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: false }));
app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('layout', './layouts/layout');

app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
