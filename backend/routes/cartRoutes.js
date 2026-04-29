const express = require('express');
const { getCart, updateCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getCart)
  .post(protect, updateCart);

module.exports = router;
