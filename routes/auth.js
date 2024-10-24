const express = require("express");
const router = express.Router();

const User = require("../models/User");
const {registerValidation,loginValidation} = require("../validations/validation");

const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

// register flow
router.post("/register", async(req,res)=>{

    // validation for user input
    const {error} = registerValidation(req.body);
    if(error){
        res.status(400).send({message:error["details"][0]["message"]});
    }

    // validation to check if user exists
    const userExists = await User.findOne({email:req.body.email});
    if(userExists){
        return res.status(400).send({message:"user already exists"});
    };

    // hashed representation of password
    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(req.body.password,salt);

    // code to insert data
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
    });

    try{
        const savedUser = await user.save();
        res.send(savedUser);    
    }catch(err){
        res.status(400).send({message:err});
    };
});

router.post("/login", async(req,res)=>{
    // validation for user input
    const {error} = loginValidation(req.body);
    if(error){
        res.status(400).send({message:error["details"][0]["message"]});
    }

    // validation to check if user exists
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send({message:"user does not exists"});
    }

    // validation to check user password
    const passwordValidation = await bcryptjs.compare(req.body.password, user.password);
    if(!passwordValidation){
        return res.status(400).send({message:"Password is wrong"});
    }

    // generate auth-token for user
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({"auth-token":token});
});

module.exports=router;