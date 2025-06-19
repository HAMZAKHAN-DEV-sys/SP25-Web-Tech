const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');
const multer = require('multer');
const path = require('path');
const { isAdmin } = require('../middleware/auth');

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads/vehicles'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Public: List all vehicles
router.get('/', async (req, res) => {
    const vehicles = await Vehicle.find();
    res.render('vehicles/index', { vehicles });
});

// Admin: New vehicle form
router.get('/admin/new', isAdmin, (req, res) => {
    res.render('vehicles/new');
});

// Admin: Create vehicle
router.post('/admin', isAdmin, upload.single('image'), async (req, res) => {
    const { name, brand, price, type } = req.body;
    const image = req.file ? '/uploads/vehicles/' + req.file.filename : '';
    await Vehicle.create({ name, brand, price, type, image });
    res.redirect('/vehicles/admin');
});

// Admin: List all vehicles (manage)
router.get('/admin', isAdmin, async (req, res) => {
    const vehicles = await Vehicle.find();
    res.render('vehicles/admin', { vehicles });
});

// Admin: Edit vehicle form
router.get('/admin/:id/edit', isAdmin, async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id);
    res.render('vehicles/edit', { vehicle });
});

// Admin: Update vehicle
router.post('/admin/:id', isAdmin, upload.single('image'), async (req, res) => {
    const { name, brand, price, type } = req.body;
    const update = { name, brand, price, type };
    if (req.file) {
        update.image = '/uploads/vehicles/' + req.file.filename;
    }
    await Vehicle.findByIdAndUpdate(req.params.id, update);
    res.redirect('/vehicles/admin');
});

// Admin: Delete vehicle
router.post('/admin/:id/delete', isAdmin, async (req, res) => {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.redirect('/vehicles/admin');
});

module.exports = router;
