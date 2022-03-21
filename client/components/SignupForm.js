import React from 'react';
import { useState } from 'react';

function SignupForm() {
  const [details, setDetails] = useState({ username: "", password: "" });

  const submitHandler = e => {
    e.preventDefault();
    console.log(details);
    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify(details),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json)
      .then(data => console.log(data))
      .catch(err => console.log('Signup Submit: ERROR: ', err));
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='form'>
        <h2>Signup</h2>
        {/* {error} */}
        <div className='form-group'>
          <label htmlFor='name'>Username:</label>
          <input type='text' name='username' id='username' onChange={e => setDetails({ ...details, username: e.target.value })} required />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type='text' name='password' id='password' onChange={e => setDetails({ ...details, password: e.target.value })} required />
        </div>
        <input type='submit' value='Signup' />
      </div>
    </form>
  )
};


export default SignupForm