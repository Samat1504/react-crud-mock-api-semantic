import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';
export default function Update() {
    let history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ID, setID] = useState(null);
    const sendDataToAPI = () => {
        axios.put(`https://61dfd1c50f3bdb0017934bcc.mockapi.io/Sam/${ID}`, {
            name,
            description
        }).then(() => {
            history.push('/read')
        })
    }

    useEffect(() => {
        setName(localStorage.getItem('name'));
        setDescription(localStorage.getItem('description'));
        setID(localStorage.getItem('ID'))
    }, [])

    return (
        <div>
            <Form>
                <Form.Field>
                    <label>Name</label>
                    <input name="fname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name' />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <input
                        name="lname"
                        value={description}
                        placeholder='Description'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' onClick={sendDataToAPI}>Update</Button>
                <Button type='button' onClick={() => history.goBack()}>Back</Button>
            </Form>
        </div>
    )
}
