// Make sure the import statement is correct
const Community = require('../models/CommunitySchema');

const User = require('../models/User');
const Snippet = require('../models/Snippet');

exports.createCommunity = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if a community with the same name already exists
    const existingCommunity = await Community.findOne({ name });
    if (existingCommunity) {
      return res.status(400).json({ message: 'Community name already exists' });
    }

    const community = new Community({
      name,
      description,
      createdBy: userId,
      members: [
        {
          user: userId,
          role: 'administrator',
        }
      ]
    });

    await community.save();
    res.status(201).json(community);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find().populate('members.user', 'name email').populate('snippets');
    res.status(200).json(communities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id).populate('members.user', 'name email').populate('snippets');
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    res.status(200).json(community);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Join a community
exports.joinCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    const communityId = req.params.id;

    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    // Check if the user is already a member
    const isMember = community.members.some(member => member.user.toString() === userId.toString());
    if (isMember) {
      return res.status(400).json({ message: 'User is already a member of this community' });
    }

    // Add the user as a member with a default role (e.g., 'member')
    community.members.push({ user: userId, role: 'member' });

    // Set the createdBy field if it's not already set
    if (!community.createdBy) {
      community.createdBy = userId;
    }

    await community.save();

    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.leaveCommunity = async (req, res) => {
  try {
    const userId = req.user._id;
    const communityId = req.params.id;

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    const memberIndex = community.members.findIndex(member => member.user.toString() === userId.toString());
    if (memberIndex === -1) {
      return res.status(400).json({ message: 'User is not a member of this community' });
    }

    community.members.splice(memberIndex, 1);
    await community.save();

    res.status(200).json({ message: 'Successfully left the community' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addSnippetToCommunity = async (req, res) => {
  try {
    const { snippetId } = req.body;
    const communityId = req.params.id;

    const community = await Community.findById(communityId);
    const snippet = await Snippet.findById(snippetId);
    if (!community || !snippet) {
      return res.status(404).json({ message: 'Community or Snippet not found' });
    }

    community.snippets.push(snippetId);
    await community.save();

    res.status(200).json(community);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateCommunity = async (req, res) => {
  try {
    const communityId = req.params.id;
    const { name, description } = req.body;

    const community = await Community.findByIdAndUpdate(communityId, { name, description }, { new: true });
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    res.status(200).json(community);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteCommunity = async (req, res) => {
  try {
    const communityId = req.params.id;

    const community = await Community.findByIdAndDelete(communityId);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    res.status(200).json({ message: 'Community deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getJoinedCommunities = async (req, res) => {
  try {
    const userId = req.user._id;
    const communities = await Community.find({ 'members.user': userId }).populate('members.user', 'name email').populate('snippets');
    res.status(200).json(communities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getCommunityMembers = async (req, res) => {
  const { communityId } = req.params;

  try {
    // Find the community by ID and populate the members array with user details
    const community = await Community.findById(communityId).populate('members.user', 'name email');
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    // Send the members array in the response
    res.status(200).json(community.members);
  } catch (error) {
    console.error('Error fetching community members:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
