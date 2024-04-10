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
    console.log("Applicant ID",applicant_id);
    console.log("All Applications",applications)
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
            <header className='header'>
                <h1>Owl Assistants</h1>   
                <h3>TA Applicant</h3>  
            </header>
            {isOpenModal && <NewApplication onClose={closeModalHandler} isOpend={openModal} applicant_id={applicant_id} course_details={course_details}/>}
            <nav className='navigation'>
                <div className='nav-left'>
                <button className='nav-left-button' onClick={()=>setOpenMyJobs(false)}>Welcome User</button>
                <button className='nav-left-button'onClick={()=>setOpenMyJobs(true)}>My Jobs</button>
                <button className='nav-left-button'>Inbox</button>
                </div>

                <div className='nav-right'>
                <button className='nav-right-button'>Notifications</button>
                <button className='nav-right-button'>Profile</button>
                <button className='nav-right-button'onClick={()=>{history("/")}}>Log Out</button>
                </div>
            </nav>
            {!openMyJobs ?
                <div style={{fontSize:'20px',textAlign: 'left', paddingLeft: '30px', paddingTop: '20px', fontWeight: 'bold'}}>Available Applications</div> :
                <div style={{fontSize:'20px',textAlign: 'left', paddingLeft: '30px', paddingTop: '20px', fontWeight: 'bold'}}>Applied Applications</div>
            }
            {!openMyJobs ? <div style={{padding:"30px 30px 30px 0px"}}>
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