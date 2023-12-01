

import React,{useState,useEffect} from 'react';
import { Table,Checkbox } from 'semantic-ui-react';
import DataTable from '../DataTable';
// import AppliedUser from './AppliedUser';
// import AddJob from './AddJob';
import { useDispatch, useSelector } from "react-redux";
import {regersterCourse,getCourse} from '../actions/course_action'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
const TACommitteeDashboard = () => {
  const history=useNavigate()
  // Sample data for Active Jobs table
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCourse());
  },[])
  // const {courses}=useSelector((state)=>state.getAllCourseReducer)
  // console.log("MyCourse",courses)
  // const [openAppliedUser,setAppliedUser]=useState(false);
  // const [openAddNewJob,setNewJob]=useState(false);
  // const [opendCourse,setOpendCourse]=useState({})
  // let activeJobsData = []
  // let deadlinePassedData = []
  // let taSettledCoursesData = [] 
  // if(courses && courses.length>0)
  // {
  //   //activeJobsData=courses
  //   for(let i=0;i<courses.length;i++){
  //     if(courses[i] && courses[i].ta_selected){
  //       taSettledCoursesData.push(courses[i]) 
  //     }
  //     else{
  //       console.log("jansii",courses[0].createdAt)
  //       const momentCreatedAt=moment(courses[i].createdAt,'YYYY-MM-DDTHH:mm:ss')
  //       if (momentCreatedAt.isValid()) {
  //         const currentDate = moment();
  //         const differenceInDays = currentDate.diff(momentCreatedAt, 'days');
  //         if(differenceInDays>5){
  //           deadlinePassedData.push(courses[i]) 
  //         }
  //         else{
  //           activeJobsData.push(courses[i])
  //         }
  //       } else {
  //         console.error('Invalid date format');
  //       }
  //     }
  //   }
  // }

  // console.log("all Jobs",activeJobsData,deadlinePassedData,taSettledCoursesData)
  
  

  
  const taSelectedUsers=[
    { Header: 'SNO', accessor: 'sno'},
    { Header: 'User Name', accessor: 'applicant_name' },
    { Header: 'Course Name', accessor: 'course_name' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'GPA', accessor: 'gpa' },
    { Header: 'Suggest', Cell: ({ row }) => (
        <Checkbox toggle/>
      ), },
    {Header:'Actions',Cell: ({ row }) => {
     
      return(
        <div>
          <button className='cancel-button'
          //  onClick={onViewUserHandler}
           >view Users</button>
        </div>
      )
    }
      
    }
    ]
    const ta_data=[
      {sno:1,applicant_name:"hari",course_name:"Software Engineering",gpa:"3.0"},
      {sno:1,applicant_name:"Ruchir",course_name:"Ananlysis of Algorithms",gpa:"3.0"},
      {sno:1,applicant_name:"Eren",course_name:"Software Engineering",gpa:"3.0"}
    ]
  // Row click handler function
  const handleRowClick = (rowData) => {
    // Customize this function to perform actions when a row is clicked
    console.log('Row clicked:', rowData);
    // Add your logic here
  };

  // const closeTAApplicantsHandler=()=>{
  //   setAppliedUser(false);
  //   setOpendCourse({})
  // }

  // const addNewJobHandler=()=>{
  //   console.log("heree")
  //   setNewJob(true)
  // }
  // const closeAddJobHandler=()=>{
  //   console.log("Inside Close")
  //   setNewJob(false)
  //   dispatch(getCourse())
  // }

  // const onOpenTaApplicants=(data)=>{
  //   setAppliedUser(true);
  //   setOpendCourse(data)
  // }
// console.log("myopenn",openAddNewJob)
  return (
    <div>
      {/* Top Header */}
      {/* {openAppliedUser && <AppliedUser onClose={closeTAApplicantsHandler} isOpend={openAppliedUser} opendCourse={opendCourse} />} */}
      <div className='top-header'>
        <div className='bottom-header'>
          <p className='link-styles' style={{ fontWeight: 'bolder', marginRight: 'auto' }}>Welcome User</p>
          <p className='link-styles'>Notifications</p>
          <p className='link-styles' onClick={()=>history("/")}>Logout</p>
        </div>
      </div>

      {/* Dashboard Tape */}
      <div className='dashboard-page'>
        {/* Active Jobs */}
       

        {/* TA Settled Courses */}
        <div style={{margin:0}}>
          <h2>TA Suggested Course</h2>
          <DataTable columns={taSelectedUsers} data={ta_data} />
        </div>
      </div>
    </div>
  );
};

export default TACommitteeDashboard;

