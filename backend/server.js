// const express=require("express");
// const mongoose=require("mongoose")
// const student=require("./models/College")
// const app=express()


// app.use(express.json())

// const MONGODB_URI = "mongodb+srv://malyada11:rangamannar@cluster0.jz0lhvx.mongodb.net/";
// app.get('/college',async (req,res)=>{
//    const data= await student.find({})
//     res.status(200).json(data);

// })
// app.get('/college/:query', (req, res) => {
//     const query = req.params.query;
    
//     // Check if the query is a number (assuming it's a roll number)
//     if (!isNaN(query)) {
//         // Logic to retrieve data for a roll number
//         res.json({ mssg: `Data for roll number ${query}` });
//     } else {
//         // Logic to retrieve data for a name
//         res.json({ mssg: `Data for name ${query}` });
//     }
// });
// mongoose.connect(MONGODB_URI)
//         .then(()=>{
//             app.listen(4000,()=>{
//                 console.log("listining");
//             })
//         })
//         .catch((error)=>{
//             console.log("ram ram !bhai error")
//         })

const express = require('express');
const mongoose = require('mongoose');
const student = require('./models/College');
const app = express();

app.use(express.json());

const MONGODB_URI =
  'mongodb+srv://malyada11:rangamannar@cluster0.jz0lhvx.mongodb.net/';
app.get('/college', async (req, res) => {
  try {
    const data = await student.find({});
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'An error occurred while fetching students' });
  }
});

app.get('/college/:query', async (req, res) => {
  const query = req.params.query;

  try {
    const students = await student.find({ $or: [{ name: query }, { rollno: query },{branch:query},{collegeId:query}] });
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'An error occurred while fetching students' });
  }
});


mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(4000, () => {
      console.log('Listening on port 4000');
    });
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

