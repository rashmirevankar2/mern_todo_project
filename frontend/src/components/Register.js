import React, { useState } from 'react';
import { api } from '../services/api';
export default function Register({ onRegister, onSwitch }){
  const [username,setUsername]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api('/api/auth/register','POST',null,{ username, email, password });
      onRegister(res.token);
    } catch (e) {
      setErr(e.message || 'Registration failed');
    }
  };
  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={submit}>
        <div><input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" required /></div>
        <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required /></div>
        <div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required /></div>
        <button type="submit">Register</button>
      </form>
      {err && <p style={{color:'red'}}>{err}</p>}
      <p>Already have an account? <button onClick={onSwitch}>Login</button></p>
    </div>
  );
}
