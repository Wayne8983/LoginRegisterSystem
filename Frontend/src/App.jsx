import React,{ useState } from 'react';
import Form from './Components/form';
import Home from './Components/Home'
import { ToastContainer } from 'react-toastify';


export const backendUrl = "http://localhost:2000";

const App = () => {
  const [token,setToken]=useState("");
  return (
    <div>
      
      {token===""?(<Form setToken={setToken} />):(<Home setToken={setToken} />)}
      <ToastContainer />
    </div>
  )
}

export default App

