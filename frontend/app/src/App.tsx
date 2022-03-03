import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"


const App = () => {
  const [users, setUsers] = useState([])
  const [values, setValues] = useState({name: '', email: ''})
  const [values2, setValues2] = useState({id: '', name2: '', email2: ''})



  const fetchUsers = async () => {
    const response = await axios({
      method: 'get',
      url: `http://localhost:3001/api/v1/users`,
      withCredentials: false,
      headers: {'Access-Control-Allow-Origin' : '*'}
    })
    setUsers(response.data.data)
  }

  const createUser = async () => {
    const response = await axios({
      method: 'post',
      url: `http://localhost:3001/api/v1/users`,
      withCredentials: false,
      headers: {'Access-Control-Allow-Origin' : '*'},
      data: values
    })
    fetchUsers()
  }
  const updateUser = async () => {
    const data = {'name': values2.name2, 'email': values2.email2}
    const response = await axios({
      method: 'put',
      url: `http://localhost:3001/api/v1/users/` + values2.id.toString(),
      withCredentials: false,
      headers: {'Access-Control-Allow-Origin' : '*'},
      data: data
    })
    fetchUsers()
  }

  const doChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const key = e.target.name
    setValues({...values, [key]: newValue})
  }

  const doChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const key = e.target.name
    setValues2({...values2, [key]: newValue})
  }
  const doCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = JSON.stringify(values)
    window.alert(data)
    createUser()
  }

  const doUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = JSON.stringify(values2)
    window.alert(data)
    updateUser()
  }

  useEffect (() => {
    fetchUsers()
  }, [])

  const renderList = users.map((user) => {
    const { id, name, email, created_at, updated_at } = user

    return(
      <tr key={id}>
        <td data-label="id">{id}</td>
        <td data-label="name">{name}</td>
        <td data-label="email">{email}</td>
        <td data-label="created_at">{created_at}</td>
        <td data-label="updated_at">{updated_at}</td>
      </tr>
    )
    })
    return(
      <>
        <div>
          <form onSubmit={doCreate}>
            name:
            <input 
              type="text" 
              name="name"
              value={values.name}
              onChange={doChange}
            />
            email:
            <input 
              type="text"
              name="email" 
              value={values.email}
              onChange={doChange}
            />
            <input type="submit" value="Create" />
          </form>
        </div>
        <div>
          <form onSubmit={doUpdate}>
             id:
              <input 
                type="number" 
                name="id"
                value={values2.id}
                onChange={doChange2}
              />
              name2:
              <input 
                type="text" 
                name="name2"
                value={values2.name2}
                onChange={doChange2}
              />
              email2:
              <input 
                type="text"
                name="email2" 
                value={values2.email2}
                onChange={doChange2}
              />
              <input type="submit" value="Update" />
            </form>
        </div>
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
      </>
    )
}

export default App;
