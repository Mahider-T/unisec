const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const Members = require("../models/members");

//register members to database
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      phone,
      age,
      type,
      university,
      field,
    } = req.body;

    const newMemberData = {
      first_name,
      last_name,
      email,
      phone,
      age,
      type,
    };

    if (university !== undefined) {
      newMemberData.university = university;
    }

    if (field !== undefined) {
      newMemberData.field = field;
    }
    const newMember = new Members(newMemberData);

    await newMember
      .save()
      .then((savedMember) => {
        res.status(200).send(savedMember);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  })
);

//get all the members (admin only)
router.get(
  "/all",
  asyncHandler(async (req, res) => {
    try {
      const members = await Members.find();
      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve members" });
    }
  })
);

//to delete members (admin only)
router.delete(
  "/deleteMember/:id",
  asyncHandler(async (req, res) => {
    const memberId = req.params.id;
    const member = await Members.findById(memberId);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    await Member.deleteOne({ _id: memberId })
      .then((deletedMember) => {
        res.status(200).send(deletedMember);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  })
);

//Get a paginated list of members (3 per page) (admin only)
router.get(
  "/getAll/:pageNumber",
  asyncHandler(async (req, res) => {
    const pageNumber = req.params.pageNumber || 1;
    const pageSize = 3;

    await Members.find({})
      .sort({ registered_on: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .then((allMembers) => {
        res.status(200).send(allMembers);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  })
);

//get member by Id (admin only)
router.get(
  "/getMemberById/:memberId",
  asyncHandler(async (req, res) => {
    await Members.findById(req.params.memberId)
      .then((member) => {
        if (!member) {
          res.status(404).send("No such member");
          return;
        }
        res.status(200).send(member);
      })
      .catch((err) => {
        res.status(500).send(error);
      });
  })
);

//Edit a member's profile
router.put(
  "/editProfile/:memberId",
  asyncHandler(async (req, res) => {
    const memberId = req.params.memberId;
    const editedProfile = req.body;

    await Members.findByIdAndUpdate(memberId, editedProfile)
      .then((updatedMember) => {
        res.status(200).send(updatedMember);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  })
);

//Search for member by name (admin only)
router.get(
  "/searchByName",
  asyncHandler(async (req, res) => {
    const queryString = req.query.queryString;
    const regex = new RegExp(queryString, "i");

    await Members.find({
      $or: [
        { first_name: { $regex: regex } },
        { last_name: { $regex: regex } },
      ],
    })
      .then((member) => {
        res.status(200).send(member);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  })
);

module.exports = router;
