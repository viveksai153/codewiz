const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    sid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    tags: [String],
    code: {
        type: String,
        required: true
    },
    likes: {
        type: [String], // Array of usernames who liked the snippet
        default: [] // Default value is an empty array
    },
    isPublic: {
        type: Boolean,
        default: false // Default value is false, meaning the snippet is private
    },
    lastAction: {
        type: {
            username: String,
            action: String,
            timestamp: Date
        },
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model('Snippet', SnippetSchema);
