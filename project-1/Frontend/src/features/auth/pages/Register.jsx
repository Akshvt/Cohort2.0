import React from 'react'
import "../style/form.scss"
import {Link} from 'react-router'

const Register = () => {

  const handleSubmit = (e)=>{
    e.preventDefault()
  }
 
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" id='username' placeholder='Enter Username' />
          <input type="email" name="email" id='email' placeholder='Enter Email address' />
          <input type="password" name="password" id="password" placeholder='Enter password' />
          <button className='button primary-button'>Register</button>
          <p>Already have an Account ? <Link to={'/login'}>Sign in.</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Register
