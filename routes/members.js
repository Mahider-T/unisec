const members = require('../models/members');
const express = require('express');
const router = express.Router();
router.use(express.json())

//endpoints go here
//register a member 

//First name, Last name, Age, University, Area of study,email, phone number

router.post("/register", async(req, res)=>{
   try{
    const newMember = new members(req.body);
    newMember.save();
    res.send(newMember);
    // console.log(newMember);
   }catch(e){
    res.status(500).send(e);
   }
})

//Get a paginated list of members (3 per page)
router.get("/getAll/:pageNumber", async(req,res)=>{
    const pageNumber = req.params.pageNumber || 1;
    const pageSize = 3;
    try{
        const allMembers = await members.find({}).sort({registered_on: -1}).skip((pageNumber - 1)*pageSize).limit(pageSize)
        res.send(allMembers)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get("/getMemberById/:memberId", async(req, res)=>{
    try{
        const theMember = await members.findById(req.params.memberId)
        if(!theMember){
            res.status(404).send("No such member");
            return;
        }
        res.send(theMember);
    }catch(e){
        res.status(500).send(e)
    }

})

//Edit a member's profile
router.put("/editProfile/:memberId", async(req, res)=>{
    try{
        const memberId = req.params.memberId;
        const editedProfile = req.body;

        const theNewProfile = await members.findByIdAndUpdate(memberId, editedProfile);
        res.send(theNewProfile);

    }catch(e){
        res.status(500).send(e);
    }
})

//Search for member by name
router.get("/searchByName", async(req, res)=>{
    const queryString = req.query.queryString;
    const regex = new RegExp(queryString, 'i');
    try{
        const searchResult = await members.find({
            $or: [
                {first_name: {$regex: regex}},
                {last_name: {$regex: regex}}
            ]
        })
        res.send(searchResult);
    }catch(e){
        res.status(500).send(e)
    }

})

//delete a student by id

router.delete("/deleteMember/:memberId", async(req, res)=>{
    try{
        const deletedResult = await members.findByIdAndDelete(req.params.memberId)
        if(!deletedResult){
            res.status(404).send("No member with that id");
        }
        res.send(`Member with id ${req.params.memberId} deleted successfully! `)
    }catch(e){
        res.status(500).send(e);
    }
})



module.exports = router;