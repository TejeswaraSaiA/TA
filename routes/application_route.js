const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Application = require('../modal/applicationModal')
const Applicant = require("../modal/studentModal")
const Course= require("../modal/courseModal")
// const requireLogin = require("../middleware/auth")
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const { JWT_SECRET } = require("../keys");
// const { restartDelay } = require("concurrently/src/defaults");


router.post("/new_application", async(req, res) => {


    const {course_name,course_id,gpa,previous_experience,applicant_id,department,professor_name,applicant_name}=req.body
    const application = req.body;

  // Create a new User instance with the extracted data
  const newApplication = new Application(application);

  // Save the user to the database
  await newApplication.save()
    .then((user) => {
      console.log('User saved:', user);
      res.status(201).json({ message: 'User saved successfully', user });
    })
    .catch((err) => {
      console.error('Error saving user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
    const applicant=await Applicant.findOne({_id:applicant_id})
    const course= await Course.findOne({_id:course_id})
    applicant.applied_jobs=[...applicant.applied_jobs,{course_name:course_name,description:course.description,professor_name:professor_name}]
    course.applicants=[...course.applicants,applicant_id]
    await course.save();
    await applicant.save();

});

router.post("/applicant_update",async(req,res)=>{
    const {course_name,course_id,gpa,previous_experience,applicant_id,department,professor_name,applicant_name,short_listed,admin_selected,committee_selected,offer_accepted}=req.body
    await Application.updateOne({ _id: req.body._id }, {...req.body })
        .then((data) => res.json(data))
        .catch((e) => res.status(400).json({ error: e.message }));
    if(offer_accepted){
        const course= await Course.findOne({_id:course_id})
        course.ta_selected=true;
        course.ta_name=applicant_name;
        await course.save();
        const applicant=await Applicant.findOne({_id:applicant_id})
        applicant.selected={course_id:course_id,course_name:course_name,department:department,professor_name:professor_name,description:course.description}
    }
    if(admin_selected){
        const applicant=await Applicant.findOne({_id:applicant_id})
        const course= await Course.findOne({_id:course_id})
        applicant.availOffers=[...applicant.availOffers,{course_id:course_id,course_name:course_name,description:course.description}]
    }

})



router.get("/application", (req, res) => {

    Application.find({ _id: req.user._id })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/allApplications", (req, res) => {
    Application.find().sort({ createdAt: -1 }).then(data => {
        res.status(200).json(
            data
        );
    });
});





module.exports = router;