import React, { useState } from 'react'


function ProductCreator() {
  const [details, setDetails] = useState({ part_number: "", description: "" });

  const submitHandler = e => {
    e.preventDefault();
    console.log(details);
    fetch('/dashboard/create', {
      method: 'POST',
      body: JSON.stringify(details),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json)
      .then(data => console.log(data))
      .catch(err => console.log('Product Create Submit: ERROR: ', err));
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='form'>
        <h2>Create New Product</h2>
        {/* {error} */}
        <div className='form-group'>
          <label htmlFor='partNumber'>Part Number:</label>
          <input type='text' name='partNumber' id='partNumber' onChange={e => setDetails({ ...details, part_number: e.target.value })} required />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description:</label>
          <input type='text' name='description' id='description' onChange={e => setDetails({ ...details, description: e.target.value })} required />
        </div>
        <input type='submit' value='Create' />
      </div>
    </form>
  )
}

export default ProductCreator