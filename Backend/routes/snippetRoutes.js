const express = require("express");
const router = express.Router();
const {
  getAllSnippets,
  createSnippet,
  deleteSnippet,
  updateSnippet,
  getUserSnippets,
  getSnippetById,
  toggleLikeSnippet,
  getSnippetLikes,
  getPublicSnippets,
} = require("../controllers/snippetController");
const fetchuser = require("../middleware/fetchuser");

router.get("/public", getPublicSnippets);
router.get("/", getAllSnippets);

router.post("/createsnippet", fetchuser, createSnippet);
router.delete("/delete/:id", fetchuser, deleteSnippet);
router.put("/update/:id", fetchuser, updateSnippet);
router.get("/usersnippets", fetchuser, getUserSnippets);
router.get("/snippets/:id", getSnippetById);

router.put("/like/:snippetId", fetchuser, toggleLikeSnippet);
router.get("/likes/:snippetId", fetchuser, getSnippetLikes);

module.exports = router;
