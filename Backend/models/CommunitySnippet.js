const mongoose = require('mongoose');

const communitySnippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  language: { type: String, required: true },
  tags: [{ type: String }],
  code: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  community: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' ,required: true },
});

const CommunitySnippet = mongoose.model('CommunitySnippet', communitySnippetSchema);

module.exports = CommunitySnippet;
