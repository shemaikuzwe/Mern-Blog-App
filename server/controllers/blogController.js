const express = require('express');
const mongoose = require('mongoose');
const Blog = require("../model/blogModel")
const findBlogs = async (req, res) => {
    const blogs = await  Blog.find()
    res.status(200).json(blogs)

}
const findBlog=async (req, res) => {
    try{
        const id=req.params.id;
        const blog=await Blog.findById(id)
        if(!blog){
            res.status(404).json({error:"No blog found"})
            return
        }
        res.status(200).json(blog)
    }catch (e){
        res.status(500).json({error:e})
    }
}
const createBlog=async (req,res)=>{
    try {
        const newBlog=await Blog.create(req.body);
        res.status(201).json(newBlog)
    }catch (e) {
        res.status(500).json({error:e})
    }

}

const editBlog=async (req,res)=>{
    try {
        const id=req.params.id;
        const updateBlog= await Blog.findByIdAndUpdate(id,req.body);
        if(!updateBlog){
            res.status(404).json({error:"No blog found"})
            return;
        }
        const editedBlog=await Blog.findById(id);
        res.status(200).json(editedBlog)
    }catch (e){
        res.status(500).json({error:e})
    }
}
const deleteBlog=async (req,res)=>{
   try {
       const id=req.params.id;
       const blog=await Blog.findByIdAndDelete(id)
       if(!blog){
           res.status(404).json({error:"No blog found"})
         return;
       }
       res.status(200).json("BlogCard.jsx deleted")
   }catch (e){
       res.status(500).json({error:"something went wrong"})
   }
}
module.exports = {
    findBlogs,
    createBlog,
    editBlog,
    findBlog,
    deleteBlog
}