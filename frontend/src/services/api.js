const API_BASE = 'https://mern-todo-project-0893.onrender.com';
export async function api(path, method='GET', token=null, body=null){
  const headers = { 'Content-Type': 'application/json' };
  if(token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(API_BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(()=> ({}));
  if(!res.ok) throw data;
  return data;
}
