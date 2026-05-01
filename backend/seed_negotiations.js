const mongoose = require('mongoose');
const User = require('./models/User');
const Store = require('./models/Store');
const Product = require('./models/Product');
const Negotiation = require('./models/Negotiation');
const Message = require('./models/Message');
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/retailbridge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const seedNegotiations = async () => {
  try {
    // 1. Find a product first to ensure we have one
    const product = await Product.findOne();
    if (!product) {
      console.log('No product found. Please add a product first.');
      process.exit(1);
    }

    // 2. Find the associated store
    const store = await Store.findById(product.store);
    if (!store) {
      console.log('No store found for the product.');
      process.exit(1);
    }

    // 3. Find or create a dummy customer user
    let customer = await User.findOne({ email: 'customer@example.com' });
    if (!customer) {
      customer = await User.create({
        name: 'John Doe',
        email: 'customer@example.com',
        password: 'password123',
        role: 'customer' // Valid enum value
      });
      console.log('Created dummy customer.');
    }

    // 4. Create a negotiation
    // First remove any existing negotiation to avoid duplicates
    await Negotiation.deleteMany({ user: customer._id, product: product._id });
    await Message.deleteMany({}); // Delete all messages for clean slate

    const negotiation = await Negotiation.create({
      product: product._id,
      user: customer._id,
      store: store._id,
      initialPrice: product.price,
      currentOffer: product.price * 0.85, // Customer offered 85% of price
      status: 'PENDING'
    });

    console.log('Created negotiation:', negotiation._id);

    // 5. Add messages
    await Message.create([
      {
        negotiation: negotiation._id,
        sender: customer._id,
        content: `Hi, I am interested in ${product.name}.`,
        type: 'TEXT'
      },
      {
        negotiation: negotiation._id,
        sender: customer._id,
        content: `I would like to offer ₹${(product.price * 0.85).toLocaleString()}`,
        type: 'OFFER',
        offerAmount: product.price * 0.85
      }
    ]);

    console.log('Added messages to negotiation.');
    console.log('Seed successful!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedNegotiations();
