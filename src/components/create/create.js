import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Create() {
  let history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const sendDataToAPI = () => {
    axios.post(`https://61dfd1c50f3bdb0017934bcc.mockapi.io/Sam`, {
      name,
      description
    }).then(() => {
      history.push('/read')
    })
  }
  return (
    <div className='create'>
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
                <Button type='submit' className='create__btn' onClick={sendDataToAPI} disabled={!name && !description}>Submit</Button>
        </Form>
    </div>
  )
}
