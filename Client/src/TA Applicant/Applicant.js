import React,{useState,useEffect} from 'react'
import { Card, Grid,Button } from 'semantic-ui-react'
import NewApplication from './NewApplication'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {getCourse} from '../actions/course_action'
import { useNavigate } from 'react-router-dom';
import {createApplication,updateApplication,getApplications} from '../actions/application_actions'
import Dashboard from './Dashboard';
const Applicant = (props) => {
    const history=useNavigate()
    const dispatch = useDispatch();
    const [applicant_id,setApplicantId]=useState("")
    const [openMyJobs,setOpenMyJobs]=useState(false)
    let currentUser;
    useEffect(()=>{
        currentUser=JSON.parse(localStorage.currentUser)
        setApplicantId(currentUser._id)
        dispatch(getCourse())
        dispatch(getApplications())

    },[])
    const {courses}=useSelector((state)=>state.getAllCourseReducer)
    const {applications}=useSelector((state)=>state.getAllApplicationReducer)
    console.log("MyCourse",courses)
    console.log("applicant id",applicant_id);
    console.log("All Applications",applications)
    //let courses = [{ title: "Software Engineering", professor: "Hanqi Zuang", dept: 'Computer Science', description: 'Software engineering course is an intro of well organised set of software descriptions..' }, { title: "Analysis of Algorithms", professor: "Tony Stark", dept: 'Computer Science', description: 'AOA is a well designed onlince course of modern computing problom and with a set of algorithms and standard solutions..' }, { title: "Data Science", professor: "Steve Rogers", dept: 'Computer Science', description: 'Data Science course is an intro of well organised set of software descriptions..' }, { title: "Theory and Inplementation", professor: "Thor", dept: 'Computer Science', description: 'Theory and Implementation course is an intro of well organised set of software descriptions..' }]
    const [isOpenModal,openModal]=useState(false)
    const [course_details,setCourseDetails]=useState({})
    const closeModalHandler=()=>{
        dispatch(getApplications())
        openModal(false)
        setCourseDetails({})
        dispatch(getApplications())
    }
    const openApplicationModalHandler=(course_details)=>{
        setCourseDetails(course_details)
        openModal(true)
    }
    return (
        <div>
            {isOpenModal && <NewApplication onClose={closeModalHandler} isOpend={openModal} applicant_id={applicant_id} course_details={course_details}/>}
            <div className='top-header'>
                <div className='bottom-header'>
                    <p className='link-styles' style={{ fontWeight: 'bolder', marginRight: 'auto' }} onClick={()=>setOpenMyJobs(false)}>Welcome User</p>
                    <p className='link-styles' onClick={()=>setOpenMyJobs(true)}>My jobs</p>
                    <p className='link-styles'>Notifications</p>
                    <p className='link-styles' onClick={()=>{history("/")}}>Logout</p>
                </div>
            </div>
            {!openMyJobs ? <div style={{padding:"30px 30px 30px 0px",marginTop:60}}>
                <Grid style={{margin:0}}>
                    <Grid.Row columns={3} style={{padding:0}}>
                  
                        {courses.map((val, idx) => {
                            if(!val.ta_selected){
                                return <Grid.Column style={{padding:0,paddingLeft:30,marginBottom:30}} key={idx}>
                                <Card style={{width:'100%'}}>
                                    <Card.Content header={val.course_name} />
                                    <Card.Content  >
                                        <p>
                                            <span style={{fontWeight:'600'}}>Professor: </span>
                                            <span style={{fontStyle:'italic'}}>{val.professor_name}</span>
                                        </p>
                                        <p>
                                            <span style={{fontWeight:'600'}}>Department: </span>
                                            <span style={{fontStyle:'italic'}}>{val.department}</span>
                                        </p>
                                        <p>
                                            <span style={{fontWeight:'600'}}>Description: </span>
                                            <span style={{fontStyle:'italic'}}>{val.description}</span>
                                        </p>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button onClick={()=>openApplicationModalHandler(val)}>Apply Here...</Button>
                                    </Card.Content>
                                </Card>
                                
                            </Grid.Column>
                            }
                            
                        })}
                    </Grid.Row>
                </Grid>

            </div>:
            <Dashboard applicant_id={applicant_id} course={courses}/>}
            
        </div>
    )
}
export default Applicant;