import React, { useState,useEffect } from 'react';
import { Form, Checkbox, Input, Button, Modal, Icon, Grid } from 'semantic-ui-react';
import DataTable from '../DataTable';
import { toast } from 'react-toastify';
import UserProfile from './UserProfile';
import { useDispatch, useSelector } from 'react-redux'
import {getCourse} from '../actions/course_action'
import {createApplication,updateApplication,getApplications} from '../actions/application_actions'
const AppliedUser = (props) => {
  const dispatch=useDispatch();
    const [onViewUser,setViewUser]=useState(false);
    const [courseAppliedUsers,setAppliedUsers]=useState([])
    const [viewedUser,setViewUserData]=useState({})
    //const {applications}=useSelector((state)=>state.getAllApplicationReducer)
    useEffect(()=>{
      dispatch(getApplications());
    },[])
    const {applications}=useSelector((state)=>state.getAllApplicationReducer)
    useEffect(()=>{
    let appliedUsers = []
    if(applications && applications.length>0){
      for(let i=0;i<applications.length;i++){
        if(applications[i].course_id===props.opendCourse._id && applications[i].short_listed===false){
          appliedUsers.push(applications[i])
        }
      }
      // props.opendCourse
      // appliedUsers=
    }
    setAppliedUsers(appliedUsers)
    // console.log("appp",appliedUsers)
    },applications)
    // console.log("Applicationss",applications)
    const appliedUsersColumns=[
    { Header: 'SNO', accessor: '_id',},
    { Header: 'User Name', accessor: 'applicant_name' },
    { Header: 'Course Name', accessor: 'course_name' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'GPA', accessor: 'gpa' },
    { Header: 'Select', Cell: ({ row }) => (
        <Checkbox toggle onChange={()=>checkBoxClickHandler(row.original)} />
      ), },
    {Header:'Actions',Cell: ({ row }) => {
     
      return(
        <div>
          <button className='cancel-button' onClick={()=>onViewUserHandler(row.original)}>view Users</button>
        </div>
      )
    }
      
    }
    ]
    // let appliedUsers = []
    // if(applications && applications.length>0){
    //   for(let i=0;i<applications.length;i++){
    //     if(applications[i].course_id===props.opendCourse._id){
    //       appliedUsers.push(applications[i])
    //       console.log("insidee here")
    //     }
    //   }
    //   // props.opendCourse
    //   // appliedUsers=
    // }
    const onViewUserHandler=(data)=>{
      setViewUserData(data)
        setViewUser(true)
    }
      
  const submitHandler=()=>{
toast.success("selected Suvvess fullly")
props.onClose();
  }
  const closeModalHandler=()=>{
    setViewUser(false) 
  }

  const checkBoxClickHandler=(data)=>{
    dispatch(updateApplication(data,false))
  }
  // console.log("courseAppliedUsersss",appliedUsers) 
  return (
    <Modal open={props.isOpend} className="right-aligned-modal">
        {onViewUser && <UserProfile onClose={closeModalHandler} isOpend={onViewUser} viewedUser={viewedUser}/>}
      <Modal.Header style={{display:'flex'}}>
        <span style={{marginRight:"auto"}}>Applied Users</span>
        <Icon
          className='close-mark'
          name="close" 
          onClick={() => props.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </Modal.Header>
      <Modal.Content style={{padding:30,height:'calc(700px)'}} className='modal-container'>
        <h2>Deadline Passed Jobs</h2>
        <DataTable columns={appliedUsersColumns} data={courseAppliedUsers } />
      </Modal.Content>
      <Modal.Actions style={{display:'flex',padding:"17px 30px"}}>
      
        
            <Button onClick={() => props.onClose()} className='cancel-button'>cancel</Button>
       
            <Button onClick={submitHandler} className='red_button' style={{marginLeft:"auto"}}>Update</Button>
       
      </Modal.Actions>
      
    </Modal>
  );
};

export default AppliedUser;
