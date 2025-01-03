const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const errorHandler = require('../middleware/errorHandler');
const fetchuser = require('../middleware/fetchuser');

// Create a new community
router.post('/', fetchuser, communityController.createCommunity);

// Get all communities
router.get('/', fetchuser, communityController.getAllCommunities);

// Get a single community by ID
router.get('/:id', fetchuser, communityController.getCommunityById);

// Join a community
router.post('/:id/join', fetchuser, communityController.joinCommunity);

// Leave a community
router.post('/:id/leave', fetchuser, communityController.leaveCommunity);

// Add a snippet to a community
router.post('/:id/snippets', fetchuser, communityController.addSnippetToCommunity);

// Update a community
router.put('/:id', fetchuser, communityController.updateCommunity);

// Delete a community
router.delete('/:id', fetchuser, communityController.deleteCommunity);

router.get('/user/communities', fetchuser, communityController.getJoinedCommunities);


router.get('/community/:communityId/members', communityController.getCommunityMembers);
// Error handler middleware
router.use(errorHandler);


module.exports = router;
