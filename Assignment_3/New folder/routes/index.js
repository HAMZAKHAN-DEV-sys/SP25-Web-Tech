
const express = require('express');
const router = express.Router();

const products = [
  { name: 'MENS', image: 'MENS_JACKETS.webp' },
  { name: 'WOMEN', image: 'WOMENS_ACCESSORIES_1.webp' },
  { name: 'JACKETS', image: 'WOMENS_JACKET_DROP_ONE.webp' },
  { name: 'SHOES', image: 'SS25_FOOTWEAR.webp' }
];

let users = [];

router.get('/', (req, res) => {
  res.render('index', { products });
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/product', (req, res) => {
  res.render('product', { products });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.send('Login failed');
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.redirect('/login');
});

module.exports = router;
