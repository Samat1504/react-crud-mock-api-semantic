import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import {Card, Input } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

export default function Read() {
    let history = useHistory();
    const [apiData, setApiData] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    useEffect(() => {
        axios.get(`https://61dfd1c50f3bdb0017934bcc.mockapi.io/Sam`)
            .then((getData) => {
                console.log(getData)
                setApiData(getData.data);
            })
    }, [])


    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = apiData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(apiData)
        }
        console.log(apiData)
    }

    const setData = (id, name, description, avatar) => {
        localStorage.setItem('ID', id)
        localStorage.setItem('avatar', avatar)
        localStorage.setItem('name', name)
        localStorage.setItem('description', description)
    }

    const getData = () => {
        axios.get(`https://61dfd1c50f3bdb0017934bcc.mockapi.io/Sam`)
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`https://61dfd1c50f3bdb0017934bcc.mockapi.io/Sam/${id}`)
        .then(() => {
            getData();
        })
    }

    return (
        <div>
            <Input icon='search'
                placeholder='Search...'
                className = 'search__input'
                onChange={(e) => searchItems(e.target.value)}
            />
            <Button type='button' className='back__btn' onClick={() => history.goBack()}>Back</Button>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Avatar</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {searchInput.length > 1 ? (
                        filteredResults.map((data) => {
                            return (
                                <Card>
                                    <Card.Content>
                                        <Card.Header>{data.name}</Card.Header>
                                        <Card.Description>{data.description}</Card.Description>
                                    </Card.Content>
                                </Card>
                            )
                        })
                    ) : (apiData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.id}</Table.Cell>
                                <img width='150' height='100' src={data.avatar} />
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell>{data.description}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/update'>
                                        <Button
                                            color="green"
                                            onClick={() => setData(data.id, data.name, data.description)}>
                                            Update
                                        </Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color="red" onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })
                    
                )}

                </Table.Body>
            </Table>
        </div>
    )
}

