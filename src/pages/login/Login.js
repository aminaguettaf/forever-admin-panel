import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmitHandler= async(e)=>{
    try {
      e.preventDefault();
      const response = await axios.post('http://localhost:4000/api/user/admin', {email,password});
      if(response.data.success){
        setToken(response.data.token);
      }
      else{
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className='login'>
      <div className='container'>
        <div className='login-container'>
          <h3>Admin Panel</h3>
          <form onSubmit={onSubmitHandler}>
            <input className='mb-3 p-2' name='email' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email' type='email' required/>
            <input className='mb-3 p-2' name='password' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Password' type='password' required/>
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login