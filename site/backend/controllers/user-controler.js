import User from '../model/User';
import bcrypt from 'bcryptjs';

export const getAllUser = async(req,res,next) => {
    let Users;
    try {
        Users = await User.find();
    }
    catch(err) {
        console.log(err);
    }
    if(!Users){
        return res.status(400).json({message: "No User Found"});
    }
    return res.status(200).json({Users});

}
export const signup = async(req,res,next) => {
    const {name,email,password} = req.body;
    let existingUser;
    try {
     existingUser = await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message: "user already login"});
    }
    const hashpassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashpassword,
        blogs: []
    });
    try{
       await user.save();
    }
    catch(err){
       return console.log(err);
    }
    return res.status(201).json({user});
}



export const login = async(req,res,next) => {
    const {email,password} =req.body;
    let existingUser;
    try {
     existingUser = await User.findOne({email});
    }catch(err){
        console.log(err);
    }

    if(!existingUser){
        return res.status(400).json({message: "Could Not Find User"});
    }
    const checkpassword = bcrypt.compareSync(password,existingUser.password);
    if(!checkpassword){
        return res.status(404).json({message: "Password doest match"});
    }
    return res.status(201).json({mesage: "Login SuccesFull",user : existingUser} );
}