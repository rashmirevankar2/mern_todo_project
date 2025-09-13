import React, { useState } from 'react';
import { api } from '../services/api';
export default function Login({ onLogin, onSwitch }){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api('/api/auth/login','POST',null,{ email, password });
      onLogin(res.token);
    } catch (e) {
      setErr(e.message || 'Login failed');
    }
  };
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required /></div>
        <div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required /></div>
        <button type="submit">Login</button>
      </form>
      {err && <p style={{color:'red'}}>{err}</p>}
      <p>Don't have an account? <button onClick={onSwitch}>Register</button></p>
    </div>
  );
}
