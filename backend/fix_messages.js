const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });
const Message = require('./models/Message');
const Negotiation = require('./models/Negotiation');

async function fix() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/retailbridge');
  
  const negotiations = await Negotiation.find({});
  for (const neg of negotiations) {
    // Find messages that start with "I'm interested" for this negotiation
    await Message.updateMany(
      { negotiation: neg._id, content: { $regex: /^I'm interested/ } },
      { $set: { sender: neg.user } }
    );
  }
  console.log('Fixed existing messages!');
  process.exit(0);
}
fix();
