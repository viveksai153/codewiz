const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    try {
        const { communityId, content } = req.body;
        const userId = req.user._id;
        const userName = req.user.name;

        // Create the message without createdAt
        const message = new Message({ communityId, userId, content });
        await message.save();
        
        // Fetch the newly saved message to get createdAt
        const savedMessage = await Message.findById(message._id);

        // Emit the new message event to the community room along with user ID, name, and createdAt
        const io = req.app.get('socketio');
        io.to(communityId).emit('newMessage', { 
            communityId,
            userId,
            userName,
            content,
            createdAt: savedMessage.createdAt // Include the createdAt field from the saved message
        });

        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message', details: error.message });
    }
};


// Get all messages for a community
exports.getMessages = async (req, res) => {
    try {
        const { communityId } = req.params;
        const messages = await Message.find({ communityId }).populate('userId', 'name');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};
