import React from 'react';
import { useState } from 'react';

function LoginForm() {
const [details, setDetails] = useState({username: "", password: ""});

const submitHandler = e => {
  e.preventDefault();
  console.log(details);
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify(details),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => response.json)
  .then(data => console.log(data))
  .catch(err => console.log('Login Submit: ERROR: ', err));
};

  return (
    <form onSubmit={submitHandler}>
      <div className='form'>
        <h2>Login</h2>
        {/* {error} */}
        <div className='form-group'>
          <label htmlFor='name'>Username:</label>
          <input type='text' name='username' id='username' onChange={e => setDetails({...details, username: e.target.value})} required/>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type='text' name='password' id='password' onChange={e => setDetails({...details, password: e.target.value})} required/>
        </div>
        <input type='submit' value='Login'/>
      </div>
    </form>
  )
}

export default LoginForm