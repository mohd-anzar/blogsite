import express from "express";
import { addBlog, blogDelete, getAllblogs, getById, getByuserid, updateBlog } from "../controllers/blog-contoller";

const blogRouter = express.Router();

blogRouter.get("/",getAllblogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog)
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",blogDelete)
blogRouter.get('/user/:id',getByuserid);
export default blogRouter;