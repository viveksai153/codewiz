const Community = require('../models/CommunitySchema');
const User = require('../models/User'); // Assuming you have a User model

const AdminController = {
  getCommunityMembers: async (req, res) => {
    try {
      const communityId = req.params.communityId;
      const community = await Community.findById(communityId).populate('members.user', 'name email role');

      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      res.json(community.members);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  removeMember: async (req, res) => {
    try {
      const { communityId, memberId } = req.params;

      console.log(`Community ID: ${communityId}, Member ID: ${memberId}`);
      console.log(`Requesting User: ${req.user}`);

      const community = await Community.findById(communityId);

      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      const memberIndex = community.members.findIndex(member => member.user.toString() === memberId);
      if (memberIndex === -1) {
        return res.status(404).json({ message: 'Member not found' });
      }

      // Check if the requester is an administrator
      const requester = community.members.find(member => member.user.toString() === req.user._id.toString());
      if (!requester || requester.role !== 'administrator') {
        return res.status(403).json({ message: 'Access Denied: Administrators Only' });
      }

      community.members.splice(memberIndex, 1);
      await community.save();

      res.json({ message: 'Member removed successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateMemberRole: async (req, res) => {
    try {
      const { communityId, memberId } = req.params;
      const { role } = req.body;

      if (!['administrator', 'moderator', 'member'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      const community = await Community.findById(communityId);

      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      const member = community.members.find(member => member.user.toString() === memberId);
      if (!member) {
        return res.status(404).json({ message: 'Member not found' });
      }

      // Check if the requester is an administrator
      const requester = community.members.find(member => member.user.toString() === req.user._id.toString());
      if (!requester || requester.role !== 'administrator') {
        return res.status(403).json({ message: 'Access Denied: Administrators Only' });
      }

      member.role = role;
      await community.save();

      res.json(member);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = AdminController;
