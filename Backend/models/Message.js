const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  communityId: { type: Schema.Types.ObjectId, ref: 'Community', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
