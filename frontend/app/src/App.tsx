import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"



const App = () => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const response = await axios({
      method: 'get',
      url: `http://localhost:3001/api/v1/users`,
      withCredentials: false,
      headers: {'Access-Control-Allow-Origin' : '*'}
    })
    setUsers(response.data.data)
  }

  useEffect (() => {
    fetchUsers()
  }, [])
  console.log(users)
  const renderList = users.map((user) => {
    const { id, name, email, created_at, updated_at } = user

    return(
      <tr key={id}>
        <td data-label="id">{id}</td>
        <td data-label="name">{name}</td>
        <td data-label="email">$ {email}</td>
        <td data-label="created_at">{created_at}</td>
        <td data-label="updated_at">{updated_at}</td>
      </tr>
    )
    })
    return(
        <div>
          <table className='ui celled table'>
            <thead>
              <tr>
                <th data-label="id">id</th>
                <th data-label="name">name</th>
                <th data-label="email">email</th> 
                <th data-label="created_at">created_at</th>
                <th data-label="updated_at">updated_at</th>
              </tr>
            </thead>
          <tbody>
            <>{renderList}</>
          </tbody>
        </table>
      </div>
    )
}

export default App;
