import React, { useState } from 'react';
import { Button, Input, Header, List, Modal, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { setMessages } from '../actions/instructor_actions';
import { toast } from 'react-toastify';
// import './InstructorTask.css'; // Import custom CSS file

const InstructorTask = (props) => {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setTodoInput(e.target.value);
    };

    const handleAddTodo = () => {
        if (todoInput.trim() !== '') {
            setTodos([...todos, todoInput.trim()]);
            setTodoInput('');
        }
    };

    const handleRemoveTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    const handleAssignTasks = () => {
        if (todos.length > 0) { // Check if todos array is not empty
            dispatch(setMessages({ message: message }));
            toast.success('Tasks were assigned successfully');
            console.log(todos)
            props.onClose();
        } else {
            toast.error('Please enter at least one task');
        }
    };
    

    return (
        <Modal open={props.open} className="square-modal"> {/* Add custom class for square appearance */}
            <Header icon='tasks' content='Assign Tasks' />
            <Modal.Content>
                <Input
                    value={todoInput}
                    onChange={handleInputChange}
                    placeholder="Enter a new task..."
                    action={<Button onClick={handleAddTodo} icon="plus" color="blue" />}
                />
                <List divided relaxed style={{ marginTop: '20px' }}>
                    {todos.map((todo, index) => (
                        <List.Item key={index}>
                            <List.Content floated="left">
                                <Button icon="remove" color="red" onClick={() => handleRemoveTodo(index)} size='mini' />
                            </List.Content>
                            <List.Content>{todo}</List.Content>
                        </List.Item>
                    ))}
                </List>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => props.onClose()}>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button color='green' onClick={handleAssignTasks}>
                    <Icon name='checkmark' /> Assign Tasks
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default InstructorTask;
