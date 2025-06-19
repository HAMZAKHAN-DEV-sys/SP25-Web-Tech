const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

app.use('/', vehicleRoutes);

app.get('/', (req, res) => {
  res.redirect('/vehicles');
});


app.listen(3000, () => console.log('Server running on port 3000'));