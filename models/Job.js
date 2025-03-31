const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide the company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide the position details"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide hiring manager"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
