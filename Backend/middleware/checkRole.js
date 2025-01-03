const Community = require('../models/CommunitySchema');

const checkRole = (roles) => {
  return async (req, res, next) => {
    const { id: communityId } = req.params;
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    const member = community.members.find(member => member.user.toString() === req.user.id);

    if (!member || !roles.includes(member.role)) {
      return res.status(403).json({ error: 'Access denied: You do not have the required permissions' });
    }

    next();
  };
};

module.exports = checkRole;
