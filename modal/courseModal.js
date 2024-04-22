const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
    },
    description:{
        type:String,
    },
    department:{
        type:String,
    },
    professor_name:{
        type:String
    },
    applicants:{
        type: Array
    },
    ta_name:{
        type : String,
        default: ""
    },
    ta_selected:{
        type:Boolean,
        default : false
    }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);