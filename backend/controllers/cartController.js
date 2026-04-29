const User = require('../models/User');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.error('Get Cart Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update user cart
// @route   POST /api/cart
// @access  Private
exports.updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    
    // Validate cartItems is an array
    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ success: false, message: 'Invalid cart data' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Map frontend items to backend structure
    const formattedCart = cartItems.map(item => ({
      product: item._id,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category
    }));

    user.cart = formattedCart;
    await user.save();

    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.error('Update Cart Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
