const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const auth = require('../middleware/auth');

// Get all members of a community
router.get('/:communityId/members', auth, AdminController.getCommunityMembers);

// Remove a member from a community
router.delete('/:communityId/members/:memberId', auth, AdminController.removeMember);

// Update a member's role in a community
router.put('/:communityId/members/:memberId/role', auth, AdminController.updateMemberRole);

module.exports = router;
