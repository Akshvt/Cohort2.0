import React, {useState} from 'react'
import "../style/form.scss"
import {Link} from 'react-router'
import {useAuth} from "../hooks/useAuth"
import { useNavigate } from 'react-router'

const Login = () => {

  const {loading, handleLogin} = useAuth()

  const[username,setUsername] = useState("")
  const[password,setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    await handleLogin(username,password)
    navigate('/')
  }

  if(loading){
    return (<main>
      <main><h1>Loading...</h1></main>
    </main>

    )
  }
 
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input 
          onChange={(e)=>{setUsername(e.target.value)}}
          type="text" 
          name="username" 
          placeholder='Enter Username' />

          <input 
          onInput={(e)=>{setPassword(e.target.value)}}
          type="password" 
          name="password" 
          id="password" 
          placeholder='Enter password' />

          <button className='button primary-button'>Login</button>
          <p>Don't have an Account ? <Link to={'/register'}>Create One.</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Login
