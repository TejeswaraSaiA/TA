import React,{useState,useEffect} from 'react'
import { Card, Grid,Button } from 'semantic-ui-react'
const Dashboard=(props)=>{
    //let courses = [{ title: "Software Engineering", professor: "Hanqi Zuang", dept: 'Computer Science', description: 'Software engineering course is an intro of well organised set of software descriptions..' }, { title: "Analysis of Algorithms", professor: "Tony Stark", dept: 'Computer Science', description: 'AOA is a well designed onlince course of modern computing problom and with a set of algorithms and standard solutions..' }, { title: "Data Science", professor: "Steve Rogers", dept: 'Computer Science', description: 'Data Science course is an intro of well organised set of software descriptions..' }, { title: "Theory and Inplementation", professor: "Thor", dept: 'Computer Science', description: 'Theory and Implementation course is an intro of well organised set of software descriptions..' }]
    const [course,setCourses]=useState([]);
        let myCourse=[]
       
        if(props.course){
            props.course.map((val,id)=>{
                console.log("my name",typeof val.ta_name,val.ta_name,props.applicant_id)
                if(val.ta_name==props.applicant_id){
                    myCourse.push(val)
                }
            })
        }
      

return(
    <div style={{padding:"30px 30px 30px 0px",marginTop:60}}>
                <Grid style={{margin:0}}>
                    <Grid.Row columns={3} style={{padding:0}}>
                  
                        {myCourse.map((val, idx) => {
                    
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
                                        Please fallow your instrctor instrctions
                                    </Card.Content>
                                </Card>
                                
                            </Grid.Column>
                            
                        })}
                    </Grid.Row>
                </Grid>

            </div>
)
}

export default Dashboard;