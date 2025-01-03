const CommunitySnippet = require('../models/CommunitySnippet');
const Community = require('../models/CommunitySchema');

// Create a new community snippet
exports.createCommunitySnippet = async (req, res) => {
  try {
    const { title, language, tags, code, community } = req.body;
    const createdBy = req.user.id;

    const newSnippet = new CommunitySnippet({
      title,
      language,
      tags,
      code,
      createdBy,
      community,
    });

    const savedSnippet = await newSnippet.save();

    // Update the community document by adding the snippet ID
    await Community.findByIdAndUpdate(community, {
      $push: { snippets: savedSnippet._id },
    });

    res.status(201).json(savedSnippet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all community snippets
exports.getAllCommunitySnippets = async (req, res) => {
  try {
    const snippets = await CommunitySnippet.find()
      .populate('createdBy', '_id name')
      .populate('community', '_id name');
    res.status(200).json(snippets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single community snippet by ID
exports.getCommunitySnippetById = async (req, res) => {
  try {
    const snippet = await CommunitySnippet.findById(req.params.id)
      .populate('createdBy', '_id name')
      .populate('community', '_id name');
    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }
    res.status(200).json(snippet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a community snippet
exports.updateCommunitySnippet = async (req, res) => {
  try {
    const updatedSnippet = await CommunitySnippet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSnippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    res.status(200).json(updatedSnippet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a community snippet
exports.deleteCommunitySnippet = async (req, res) => {
  try {
    const deletedSnippet = await CommunitySnippet.findByIdAndDelete(
      req.params.id
    );
    if (!deletedSnippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    // Update the community document by removing the snippet ID
    await Community.findByIdAndUpdate(deletedSnippet.community, {
      $pull: { snippets: deletedSnippet._id },
    });

    res.status(200).json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all community snippets by community ID
exports.getCommunitySnippetsByCommunityId = async (req, res) => {
  try {
    const communityId = req.params.communityId;
    const snippets = await CommunitySnippet.find({ community: communityId })
      .populate('createdBy', '_id name')
      .populate('community', '_id name');
    res.status(200).json(snippets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
