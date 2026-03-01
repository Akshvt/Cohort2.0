import React from 'react'
import "../style/form.scss"
import {Link} from 'react-router'
import {useAuth} from "../hooks/useAuth"

const Login = () => {

  const {user,loading,handleLogin} = useAuth()

  const handleSubmit = (e)=>{
    e.preventDefault()
  }
 
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder='Enter Username' />
          <input type="password" name="password" id="password" placeholder='Enter password' />
          <button className='button primary-button'>Login</button>
          <p>Don't have an Account ? <Link to={'/register'}>Create One.</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Login
