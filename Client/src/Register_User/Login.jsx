import react, { useState } from 'react';
import { Input,Button,Dropdown, Icon } from 'semantic-ui-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Login=()=>{
    const history = useNavigate();
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
    const [userType,setUserType] = useState('TA Applicant')
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const LognHandler=async()=>{
        if(email && password){
            await axios.post("/api/users/signin",{id:email,password:password,userType:userType})
            .then((data)=>{
                console.log("dataaa",data)
                localStorage.setItem('currentUser', JSON.stringify(data.data));
                history(`/dashboard?user=${data.data.userType}`)
            })
            .catch((e)=>{
                console.log(e.message)
                toast("Invalid mail and password")
            })
        }
        else{
            alert("Empty password/username")
        }
    }
    return(
        <div className="backgroundCanvas">
            <header className='header'>
                <h1>Owl Assistants</h1>
                <h3>Login Page</h3>     
            </header>
            <div className='login-page-parent-container'>
                <div className='login_page_container'>
                    <div className='mainSection'>
                        <div className='internalSection'>
                            <Dropdown options={users} value={userType} placeholder={"select user"} selection onChange={(e,data)=>setUserType(data.value)}/><br/>
                            <Input value={email} placeholder='Enter ID/Email' className='input_button_styles' onChange={(e)=>setEmail(e.target.value)}/><br/>
                            <Input type='password' value={password} placeholder='Enter Password' className='input_button_styles' onChange={(e)=>setPassword(e.target.value)}/><br/>
                            <Button type='submit' className='red_button' onClick={LognHandler}>Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;