import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
export default function Todo({ token, onLogout }){
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(null);
  const fetchTasks = async ()=> {
    try {
      const data = await api('/api/tasks','GET',token);
      setTasks(data);
    } catch (e){
      console.error(e);
      if(e.message && e.message.toLowerCase().includes('token')) onLogout();
    }
  };
  useEffect(()=> { fetchTasks(); }, []);
  const add = async e => {
    e.preventDefault();
    if(!text) return;
    const t = await api('/api/tasks','POST',token,{ content: text });
    setTasks([t,...tasks]);
    setText('');
  };
  const toggle = async (task) => {
    const updated = await api('/api/tasks/'+task._id,'PUT',token,{ completed: !task.completed });
    setTasks(tasks.map(t=> t._id===updated._id ? updated : t));
  };
  const remove = async id => {
    await api('/api/tasks/'+id,'DELETE',token);
    setTasks(tasks.filter(t=>t._id!==id));
  };
  const saveEdit = async (id, content) => {
    const updated = await api('/api/tasks/'+id,'PUT',token,{ content });
    setTasks(tasks.map(t=> t._id===updated._id ? updated : t));
    setEditing(null);
  };
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><h3>Your Tasks</h3><button onClick={onLogout}>Logout</button></div>
      <form onSubmit={add}><input value={text} onChange={e=>setText(e.target.value)} placeholder="New task" /> <button type="submit">Add</button></form>
      <ul style={{listStyle:'none', padding:0}}>
        {tasks.map(task => (
          <li key={task._id} style={{padding:8, borderBottom:'1px solid #eee', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div>
              <input type="checkbox" checked={task.completed} onChange={()=>toggle(task)} />
              {editing===task._id ? (
                <>
                  <input defaultValue={task.content} id={'edit-'+task._id} />
                  <button onClick={()=> saveEdit(task._id, document.getElementById('edit-'+task._id).value)}>Save</button>
                  <button onClick={()=>setEditing(null)}>Cancel</button>
                </>
              ) : (
                <span style={{marginLeft:8, textDecoration: task.completed ? 'line-through' : 'none'}}>{task.content}</span>
              )}
            </div>
            <div>
              <button onClick={()=>setEditing(task._id)}>Edit</button>
              <button onClick={()=>remove(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
