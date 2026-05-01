const mongoose = require('mongoose');
async function fix() {
  await mongoose.connect('mongodb://127.0.0.1:27017/retailbridge');
  const Store = mongoose.model('Store', new mongoose.Schema({ owner: mongoose.Schema.Types.ObjectId }));
  const result = await Store.updateMany({ owner: { $exists: false } }, { owner: new mongoose.Types.ObjectId('69f2fa8da580ffa172460d96') });
  console.log('Updated ' + result.modifiedCount + ' stores');
  process.exit(0);
}
fix();
