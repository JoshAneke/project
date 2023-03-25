const express = require("express");

const router = express.Router();

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const cors = require('cors')
//middleware need to use read json requests (req.body)
router.use(express.json());
//middleware needed to access information between different domains
router.use(cors());



//this helps enforce field validation when we are trying to add a new user 
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, minLength: 8, maxLength: 20},
    password: {type: String, required: true, minLength: 8, maxLength: 20},
  });
  
  const User = mongoose.model("User", userSchema);
  
  
  router.post("/register", async (req, res) => {
      try {
        const username = req.body.username;
        const password = req.body.password;
        var saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ username: username, password: hashedPassword });
        await user.save();
        res.json({ success: true });
      } catch (error) {
        res.json({ success: false, error : error.message });
      }
    });
    
router.get("/signin", async (req, res) => {
      // for now we will let anyone log in, we will implement login authentication when we have a database
       res.send("True");
    });



module.exports = router
