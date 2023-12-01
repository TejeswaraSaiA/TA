import React, { useEffect, useState } from 'react';
import { Form, Checkbox, Input, Button, Modal, Icon, Grid } from 'semantic-ui-react';
import { toast } from 'react-toastify';

const UserProfile = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    mobile: '',
    major: '',
    gpa: '',
    hasExperience: false,
    experiences: [{ courseName: '', professorName: '', dept: '' }],
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      experiences: [
        {
          courseName: "Software Engineering",
          professorName: "Professor X",
          dept: "Computer Science",
        },
      ],
    }));
  }, []);
  

  const handleSubmit = () => {
    // Handle form submission here
    console.log(state);
  };

  const { name, email, mobile, major, gpa, hasExperience, experiences } = state;

  return (
    <Modal open={props.isOpend} className="right-aligned-modal">
      <Modal.Header style={{display:'flex'}}>
        <span style={{marginRight:"auto"}}>View Application</span>
        <Icon
          className='close-mark'
          name="close"
          onClick={() => props.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </Modal.Header>
      <Modal.Content style={{padding:30,height:'calc(700px)'}} className='modal-container'>
        <Form onSubmit={handleSubmit}>
          <Grid columns={3} stackable style={{margin:0}}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Name"
                  name="name"
                  value={name}
                  disabled
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Email"
                  name="email"
                  value={email}
                  disabled
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Mobile Number"
                  name="mobile"
                  value={mobile}
                  disabled
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Major"
                  name="major"
                  value={major}
                  disabled
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="GPA"
                  name="gpa"
                  value={gpa}
                  disabled
                />
              </Grid.Column>
              {/* <Grid.Column>
                <Form.Field
                  control={Input}
                  type="file"
                  label="Upload Resume"
                  onChange={handleFileUpload}
                />
              </Grid.Column> */}
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Form.Field
                  control={Checkbox}
                  label="Previous Experience?"
                  checked={hasExperience}
                  disabled
                />
              </Grid.Column>
            </Grid.Row>

            {hasExperience &&
              experiences.map((exp, index) => (
                <>
                <p style={{margin:0,fontWeight:'bold'}}>Experience {index}</p>
                <Grid.Row key={index}>
                  <Grid.Column>
                    <Form.Field
                      control={Input}
                      label={`Course Name`}
                      name={`courseName-${index}`}
                      value={exp.courseName}
                      disabled
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field
                      control={Input}
                      label={`Professor Name`}
                      name={`professorName-${index}`}
                      value={exp.professorName}
                      disabled
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field
                      control={Input}
                      label={`Department`}
                      name={`dept-${index}`}
                      value={exp.dept}
                      disabled
                    />
                  </Grid.Column>
                </Grid.Row>
                </>
              ))}
          </Grid>
        </Form>
      </Modal.Content>
      {/* <Modal.Actions style={{display:'flex',padding:"17px 30px"}}>
      
        
            <Button onClick={() => props.onClose()} className='cancel-button'>cancel</Button>
       
            <Button onClick={submitHandler} className='red_button' style={{marginLeft:"auto"}}>submit</Button>
       
      </Modal.Actions> */}
      
    </Modal>
  );
};

export default UserProfile;
