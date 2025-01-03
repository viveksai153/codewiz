const express = require('express');
const router = express.Router();
const communitySnippetController = require('../controllers/communitySnippetController');
const fetchuser = require('../middleware/fetchuser');

// Route to create a new community snippet
router.post('/', fetchuser, communitySnippetController.createCommunitySnippet);

// Route to get all community snippets
router.get('/', communitySnippetController.getAllCommunitySnippets);

// Route to get a single community snippet by ID
router.get('/:id', communitySnippetController.getCommunitySnippetById);

// Route to update a community snippet by ID
router.put('/:id', communitySnippetController.updateCommunitySnippet);

// Route to delete a community snippet by ID
router.delete('/:id', communitySnippetController.deleteCommunitySnippet);

// Route to get all community snippets by community ID
router.get('/community/:communityId', communitySnippetController.getCommunitySnippetsByCommunityId);

module.exports = router;
