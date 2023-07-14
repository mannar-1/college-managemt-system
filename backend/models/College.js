const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  rollno: String,
  name: String,
  age: Number,
  gender: String,
  email: String,
  branch: String,
  collegeId: String,
  mathmarks: Number,
  phymarks: Number,
  chemmarks: Number
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
