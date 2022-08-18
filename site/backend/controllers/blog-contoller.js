import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllblogs = async(req,res,next) => {
    let blogs;
    try{
        blogs = await Blog.find().populate("user");
    }
    catch(err) {
       return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message: "No Blog Found"});
    }
    return res.status(202).json({blogs});
}

export const addBlog = async(req,res,next) => {
    const {title,discription,image,user} = req.body;
    let existingUser;
    try{
        existingUser = await User.findById(user);
    }
    catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message: "Unavle To Detect The User"});
    }
    const blog = new Blog({
        title,
        discription,
        image,
        user,
    });
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    }
    catch(err){
        return console.log(err);
    }
    return res.status(200).json({blog});

}

export const updateBlog = async(req,res,next) => {
     const {title,discription} = req.body;
     const updateiD = req.params.id;
     let blog;
     try{
        blog = await Blog.findByIdAndUpdate(updateiD,{
            title,
            discription
        });
     }
     catch(err){
        return console.log(err);
     }
     return res.status(200).json({blog});

}
export const getById = async(req,res,next) => {
    const Id = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(Id);
    }
    catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({mesage: "No Blog Found"});
    }
    return res.status(200).json({blog});
}
export const blogDelete = async(req,res,next) => {
    const Id = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndRemove(Id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }
    catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({mesage: "Unable to Delete The Blog"});
    }
    return res.status(200).json({message: "SucessFuly deleted"});
}
export const getByuserid = async(req,res,next) => {
    const Id = req.params.id;
    let blog;
    try{
        blog = await User.findById(Id).populate('blogs');
    }
    catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({mesage: "No Blog Found"});
    }
    return res.status(200).json({blog});
}