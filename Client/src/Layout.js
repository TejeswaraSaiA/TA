import react,{useState} from 'react'
import {Button} from 'semantic-ui-react'
import Login from './Register_User/Login'
import Register from './Register_User/Register'

const Layout=()=>{
    const [isLogin,setIsLogin]=useState(true)
    return (
        <div className='parent-container'>
            <div className='layout-parent-container'>
                <div className='layout-left-container'>
                    <div className='layout-left-section'>
                        <p className='left-layout-heading' style={{color:'white',fontSize:'1.5rem',fontWeight:'600',margin:0}}>Welcome Back!</p>
                        <p style={{color:'white',fontSize:'1rem',margin:0,overflowWrap:'break-word',marginBottom:'5px'}}>To keep connected with us please login with your personal info</p><br/>
                        <Button content={isLogin? "Register" : "Login"} className='cancel-button' onClick={()=>setIsLogin(!isLogin)}/>
                    </div>
                </div>
                <div className='layout-right-container'>
                    <div className='left-top-container'>
                        <div>
                            {isLogin ? <Login/> : <Register/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;