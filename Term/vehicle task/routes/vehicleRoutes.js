const express = require('express');
const router = express.Router();
const multer = require('multer');
const Vehicle = require('../models/Vehicle');
const isAdmin = require('../middlewares/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.get('/vehicles', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render('vehicles', { vehicles, isAdmin: req.session.isAdmin });
});

router.get('/vehicles/new', isAdmin, (req, res) => {
  res.render('create');
});

router.post('/vehicles', isAdmin, upload.single('image'), async (req, res) => {
  const vehicle = new Vehicle({
    ...req.body,
    image: req.file ? `/uploads/${req.file.filename}` : '',
  });
  await vehicle.save();
  res.redirect('/vehicles');
});

router.get('/vehicles/:id/edit', isAdmin, async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.render('edit', { vehicle });
});

router.put('/vehicles/:id', isAdmin, upload.single('image'), async (req, res) => {
  const data = {
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    type: req.body.type,
  };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  await Vehicle.findByIdAndUpdate(req.params.id, data);
  res.redirect('/vehicles');
});

router.delete('/vehicles/:id', isAdmin, async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.redirect('/vehicles');
});

module.exports = router;
