const express = require('express');
const {findBlogs, createBlog, editBlog, findBlog, deleteBlog} = require("../controllers/blogController");
const router = express.Router();

router.get("/",findBlogs)
router.get("/:id",findBlog)
router.post("/",createBlog)
router.put("/:id",editBlog)
router.delete("/:id",deleteBlog)
module.exports=router;