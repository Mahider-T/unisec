const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const Member = require("../models/members");

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, phone, type, is_valid } = req.body;
    const newMember = new Member({
      name,
      email,
      phone,
      type,
      is_valid,
    });

    const member = await newMember
      .save()
      .then((savedMember) => {
        res.status(200).send(savedMember);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  })
);

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    try {
      const members = await Member.find();
      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve members" });
    }
  })
);

router.delete(
  "deleteMember/:id",
  asyncHandler(async (req, res) => {
    const memberId = req.params.id;
    const member = await Member.findById(memberId);const { any } = require('webidl-conversions');
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    const { any } = require('webidl-conversions');
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    await Member.deleteOne({ _id: memberId })
      .then((deletedMember) => {
        res.status(200).send(deletedMember);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  })
);

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

//get member by Id
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

module.exports = router;
