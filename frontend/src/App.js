import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Todo from './components/Todo';
function App(){
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState(token ? 'todo' : 'login');
  useEffect(()=> {
    if(token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);
  return (
    <div style={{maxWidth:600, margin:'40px auto', fontFamily:'Arial'}}>
      <h2>MERN To-Do</h2>
      {!token && view==='login' && <Login onLogin={(t)=>{setToken(t); setView('todo')}} onSwitch={()=>setView('register')} />}
      {!token && view==='register' && <Register onRegister={(t)=>{setToken(t); setView('todo')}} onSwitch={()=>setView('login')} />}
      {token && <Todo token={token} onLogout={()=>{setToken(null); setView('login')}} />}
    </div>
  );
}
export default App;
