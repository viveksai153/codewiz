const Snippet = require('../models/Snippet');

// Function to get statistics data for a specific user
exports.getUserStatistics = async (req, res) => {
    try {
        const userId = req.params.userId;
        const today = new Date();
        const lastWeekDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        // Get total snippets and public snippets
        const totalSnippets = await Snippet.countDocuments({ user: userId });
        const publicSnippets = await Snippet.countDocuments({ user: userId, isPublic: true });

        // Get snippets created in the last week
        const snippetsLastWeek = await Snippet.find({ 
            user: userId, 
            createdAt: { $gte: lastWeekDate } 
        });

        // Group snippets by creation date and count them
        const weeklyStats = snippetsLastWeek.reduce((acc, snippet) => {
            const date = snippet.createdAt.toISOString().split('T')[0];
            acc[date] = acc[date] ? acc[date] + 1 : 1;
            return acc;
        }, {});

        // Generate array of objects with date and count
        const weekly = Object.entries(weeklyStats).map(([date, count]) => ({ date, count }));

        // Response format
        const response = {
            totalSnippets,
            publicSnippets,
            weekly
        };

        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
