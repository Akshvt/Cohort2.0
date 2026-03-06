import {React, useState} from 'react'
import "../style/form.scss"
import {Link, useNavigate} from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const {loading, handleRegister } = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    await handleRegister(username,email,password)
    navigate('/')
  }

  if(loading){
    return (
    <main>
      <h1>Loading...</h1>
      </main>
  )
  }
 
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input 
          onChange={(e)=>{setUsername(e.target.value)}}
          type="text" 
          name="username" 
          id='username' 
          placeholder='Enter Username' />

          <input 
          onChange={(e)=>{setEmail(e.target.value)}}
          type="email" 
          name="email" 
          id='email' 
          placeholder='Enter Email address' />

          <input onChange={(e)=>{setPassword(e.target.value)}}
          type="password" 
          name="password" 
          id="password" 
          placeholder='Enter password' />

          <button className='button primary-button'>Register</button>
          <p>Already have an Account ? <Link to={'/login'}>Sign in.</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Register
