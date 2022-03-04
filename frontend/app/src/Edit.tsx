import React, {useEffect, useState} from "react"
import axios from "axios"
import { useParams } from "react-router-dom";



const Edit= () => {
  const { id } = useParams()
  const [values2, setValues2] = useState({name2: '', email2: ''})


  const updateUser = async () => {
    const data = {'name': values2.name2, 'email': values2.email2}
    const response = await axios({
      method: 'put',
      url: `http://localhost:3001/api/v1/users/` + id,
      withCredentials: false,
      headers: {'Access-Control-Allow-Origin' : '*'},
      data: data
    })
  }

  const doChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const key = e.target.name
    setValues2({...values2, [key]: newValue})
  }

  const doUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = JSON.stringify(values2)
    let answer = window.confirm("update data?");
    if (answer) {
      updateUser()
      window.location.href = "http://localhost:3000";
    }
  }

  return (
      <>
      <div>
        <form onSubmit={doUpdate}>
            id:
            <input 
              type="number" 
              name="id"
              value={id}
              onChange={doChange2}
              disabled
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
      </>
  )
}


export default Edit