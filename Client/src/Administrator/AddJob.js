import React, { useState } from 'react';
import { Form, Checkbox, Input, Button, Modal, Icon, Grid,Dropdown } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import {regersterCourse,getCourse} from '../actions/course_action'
const AddJob = (props) => {
  const [course, setCourse] = useState({
    course_name:"",
    description:"",
    department:"",
    professor_name:""
  });
  const dispatch = useDispatch()


//   const handleSubmit = () => {
//     // Handle form submission here
//     console.log();
//     axios.post("/api/courses/new_course",course)
//     .then(()=>{
//         toast.success("Successfully added new course")
//         props.onClose();
//     })
//     .catch((e)=>{
//         toast.error("Unable to submit form")
//         props.onClose();
//     })
//   };

  const submitHandler = () => {
    
    try{
        dispatch(regersterCourse(course))
        dispatch(getCourse())
        toast.success("Course Added Successfully")
        props.onClose();
    }
    catch(e){
        toast.error("Failed to opertaion")
        props.onClose()
    }
    
  };
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


  return (
    <Modal open={props.isOpend} className="right-aligned-modal">
      <Modal.Header style={{display:'flex'}}>
        <span style={{marginRight:"auto"}}>Add New Position</span>
      </Modal.Header>
      <Modal.Content style={{padding:30,height:'calc(700px)'}} className='modal-container'>
        <Form >
          <Grid columns={2} stackable style={{margin:0}}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Course Name"
                  name="course_name"
                  value={course.course_name}
                  onChange={(e)=>setCourse({...course,course_name: e.target.value})}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Course Description"
                  name="course_description"
                  value={course.description}
                  onChange={(e)=>setCourse({...course,description: e.target.value})}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Professor Name"
                  name="professor_name"
                  value={course.professor_name}
                  onChange={(e)=>setCourse({...course,professor_name: e.target.value})}
                />
              </Grid.Column>
              <Dropdown options={department_values} value={course.department} placeholder={"select department"} selection onChange={(e,data)=>setCourse({...course,department: data.value})}/>
            </Grid.Row>
          </Grid>
        </Form>
      </Modal.Content>
      <Modal.Actions style={{display:'flex',padding:"17px 30px"}}>
      
        
            <Button onClick={() => props.onClose()} className='cancel-button'>cancel</Button>
       
            <Button onClick={submitHandler} className='red_button' style={{marginLeft:"auto"}}>submit</Button>
       
      </Modal.Actions>
      
    </Modal>
  );
};

export default AddJob;
