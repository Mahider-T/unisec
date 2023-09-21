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
  "/:id",
  asyncHandler(async (req, res) => {
    const memberId = req.params.id;
    const member = await Member.findById(memberId);

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

module.exports = router;
