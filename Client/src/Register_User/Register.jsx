import {useState} from 'react'
import { Input,Button,Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-dropdown/style.css';
const Register=()=>{
    let users=[
        {
            key:'TA Applicant',
            text:'TA Applicant',
            value:'TA Applicant'
        },
        {
            key:'Administrator',
            text:'Administrator',
            value:'Administrator'
        },
        {
            key:'TA Committee',
            text:'TA Committee',
            value:'TA Committee'
        },
        {
            key:'Instructor',
            text:'Instructor',
            value:'Instructor'
        }
    ]
    let department_values=[
        {
            key:'Computer Science',
            text:'Computer Science',
            value:'Computer Science'
        },
        {
            key:'Bussiness Administration',
            text:'Bussiness Administration',
            value:'Bussiness Administration'
        },
        {
            key:'Data Science',
            text:'Data Science',
            value:'Data Science'
        },
        {
            key:'Others',
            text:'Others',
            value:'Others'
        }
    ]
    const [userType,setUserType] = useState('TA Applicant')
    const [name,setName]=useState("");
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [department,setDepartment]=useState("")
    const registerUserHandler=()=>{
        let data={
            userType:userType,
            name:name,
            password:password,
            email:email,
            department:department,
            selected:{
            }
        }
        axios.post("/api/users/register",data)
        .then((res)=>{
            console.log("Applicant Registered Successfully")
            toast.success("Submitted Successfully")
            setDepartment("")
            setEmail("")
            setPassword("")
            setName("")
            setUserType("")
        })
        .catch((e)=>{
            console.log("error",e.message)
        })
        //toast.success("Submitted Successfully")
    }
    return(
            <div className='login-page-parent-container'>
                <div className='login_page_container'> 
                    <div className='mainSection'>
                        <div className='internalSection'>
                            <h2 style={{color:'white'}}> Register User </h2>
                            <Dropdown style={{paddingTop:'10px'}} options={users} value={userType} placeholder={"select user"} selection onChange={(e,data)=>setUserType(data.value)} disabled/><br/>
                            <Input style={{paddingTop:'10px'}} placeholder='Enter Name' value={name} className='input_button_styles' onChange={(e)=>setName(e.target.value)}/><br/>
                            <Input style={{paddingTop:'10px'}} placeholder='Enter ID/Email' value={email} className='input_button_styles' onChange={(e)=>setEmail(e.target.value)}/><br/>
                            <Input style={{paddingTop:'10px', paddingBottom:'10px'}} placeholder='Enter Password' value={password} className='input_button_styles' onChange={(e)=>setPassword(e.target.value)}/><br/>
                            <Dropdown options={department_values} value={department} placeholder={"select department"} selection onChange={(e,data)=>setDepartment(data.value)}/><br/>
                            <Button style={{marginTop:'10px'}} type='submit' className='red_button' onClick={registerUserHandler}>Register</Button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Register;