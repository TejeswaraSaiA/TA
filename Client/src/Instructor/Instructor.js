import React,{useState} from 'react'
import { Card, Grid,Button } from 'semantic-ui-react'
import InstructorMessage from './InstructorMessage'
const Instructor=(props)=>{
    let courses = [{ course_name: "Software Engineering", professor_name: "Hanqi Zuang", department: 'Computer Science', applicant_name: 'Hari' }]
    const [isOpenModal,openModal]=useState(false)
    const clickHandler=()=>{
        openModal(true)
    }
return(
    <div style={{padding:"30px 30px 30px 0px",marginTop:60}}>
        {isOpenModal && <InstructorMessage open={isOpenModal} onClose={()=>openModal(false)}/>}
                <Grid style={{margin:0}}>
                    <Grid.Row columns={3} style={{padding:0}}>
                  
                        {courses.map((val, idx) => {
                            return <Grid.Column style={{padding:0,paddingLeft:30,marginBottom:30}}>
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
                                            <span style={{fontStyle:'italic'}}>{val.applicant_name}</span>
                                        </p>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button onClick={clickHandler}>Provide Feedback</Button>
                                    </Card.Content>
                                </Card>
                                
                            </Grid.Column>
                        })}
                    </Grid.Row>
                </Grid>

            </div>
)
}

export default Instructor;