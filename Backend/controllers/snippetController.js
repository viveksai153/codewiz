const Snippet = require('../models/Snippet');  // Assuming you move Snippet.js into a 'models' directory
const User = require('../models/User');
const { generateUniqueSid } = require('../models/sid');


// Controller function to fetch all public snippets
exports.getPublicSnippets = async (req, res) => {
    try {
        const publicSnippets = await Snippet.find({ isPublic: true });
        res.status(200).json(publicSnippets);
    } catch (error) {
        console.error('Error fetching public snippets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// Controller for creating a snippet
exports.createSnippet = async (req, res) => {
    const { title, language, tags, code, isPublic } = req.body;
    try {
        const sid = generateUniqueSid();
        const newSnippet = new Snippet({ 
            user: req.user.id, 
            sid, 
            title, 
            language, 
            tags, 
            code, 
            isPublic // Adding isPublic field
        });
        await newSnippet.save();
        res.status(201).json({ message: 'Snippet saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving snippet', error: error.message });
    }
};

 

// Controller for deleting a snippet
exports.deleteSnippet = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSnippet = await Snippet.findOneAndDelete({ _id: id, user: req.user.id });
        if (!deletedSnippet) {
            return res.status(404).send('Snippet not found');
        }
        res.status(200).send('Snippet deleted successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

// Controller for updating a snippet
exports.updateSnippet = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, language, tags, code } = req.body;
        const snippet = await Snippet.findOne({ _id: id, user: req.user.id });
        if (!snippet) {
            return res.status(404).json({ message: 'Snippet not found or you are not authorized to update it' });
        }
        snippet.title = title;
        snippet.language = language;
        snippet.tags = tags;
        snippet.code = code;
        await snippet.save();
        res.status(200).json({ message: 'Snippet updated successfully', snippet });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




 

exports.getUserSnippets = async (req, res) => {
    try {
        const userId = req.user.id;  // Extracted from token by fetchuser middleware
        const snippets = await Snippet.find({ user: userId });
        if (snippets.length === 0) {
            return res.json([]); // Return an empty array if no snippets are found
        }
        res.json(snippets);
    } catch (error) {
        console.error("Failed to retrieve snippets:", error);
        res.status(500).json({ msg: "Server error" });
    }
};



exports.getAllSnippets = async (req, res) => {
    try {
        const snippets = await Snippet.find();
        res.json(snippets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getSnippetById = async (req, res) => {
    try {
        const snippet = await Snippet.findById(req.params.id);
        if (!snippet) {
            return res.status(404).send('Snippet not found');
        }
        res.json(snippet);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).send('Snippet not found');
        }
        res.status(500).send('Server Error');
    }
};



exports.getSnippetLikes = async (req, res) => {
    try {
        const snippetId = req.params.snippetId;
        const snippet = await Snippet.findById(snippetId);

        if (!snippet) {
            return res.status(404).json({ message: 'Snippet not found' });
        }

        res.status(200).json({ likes: snippet.likes.length });
    } catch (error) {
        console.error('Error fetching snippet likes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};






 

 

exports.toggleLikeSnippet = async (req, res) => {
    const { snippetId } = req.params;
    const { username } = req.body;

    try {
        // Find the snippet by ID and populate the user field
        const snippet = await Snippet.findById(snippetId).populate('user');
        if (!snippet) {
            return res.status(404).json({ message: 'Snippet not found' });
        }

        // Check if the user already liked the snippet
        const likedIndex = snippet.likes.indexOf(username);
        const isLikeAction = likedIndex === -1;

        // Handle like/unlike
        if (isLikeAction) {
            snippet.likes.push(username);
        } else {
            snippet.likes.splice(likedIndex, 1);
        }

        // Update the last action
        snippet.lastAction = {
            username,
            action: isLikeAction ? 'like' : 'unlike',
            timestamp: new Date()
        };

        await snippet.save();

        // Check if snippet.user exists and has notifications
        if (snippet.user && snippet.user.notifications) {
            // Find the user who liked the snippet
            const user = await User.findOne({ name: username });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check for existing notification and update or create accordingly
            const notificationMessage = `${user.name} ${isLikeAction ? 'liked' : 'unliked'} your snippet "${snippet.title}"`;
            const existingNotificationIndex = snippet.user.notifications.findIndex(
                (notification) => notification.message === notificationMessage
            );

            if (existingNotificationIndex !== -1) {
                // Update existing notification
                snippet.user.notifications[existingNotificationIndex].read = false;
                snippet.user.notifications[existingNotificationIndex].createdAt = new Date();
            } else {
                // Create new notification
                snippet.user.notifications.push({
                    type: 'liked',
                    message: notificationMessage,
                    read: false,
                    createdAt: new Date()
                });
            }

            await snippet.user.save();
        }

        return res.status(200).json({ liked: isLikeAction, message: `Snippet ${isLikeAction ? 'liked ' : 'unliked'} ` });
    } catch (error) {
        console.error('Error toggling like:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




// You can add more functions here for creating, updating, deleting snippets
