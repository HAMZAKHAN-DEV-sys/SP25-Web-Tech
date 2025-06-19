
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const { ensureAuth } = require('./middleware');

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  await User.create({ email, password });
  res.redirect('/login');
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email, password: req.body.password });
  if (!user) return res.redirect('/login');
  req.session.user = user;
  res.redirect('/my-orders');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

router.get('/my-orders', ensureAuth, async (req, res) => {
  const orders = await Order.find({ userEmail: req.session.user.email });
  res.render('my-orders', { orders });
});

module.exports = router;
