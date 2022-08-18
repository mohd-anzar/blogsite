import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-route';
import router from './routes/user-route';
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blogs",blogRouter);
mongoose.connect(
"mongodb+srv://admin:Ze9GdfFYk9pZDJrC@cluster0.xyfdb.mongodb.net/Blog?retryWrites=true&w=majority"
).then(() => app.listen(5000)).then(() => console.log("Connect to Data  Base")).catch((err) => console.log(err));

//app.listen(3000);

//Ze9GdfFYk9pZDJrC