import React,{ useState } from 'react'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';

const Form = ({setToken}) => {
    const [currentForm,setCurrentForm]=useState('Login');

    const [name,setName] =useState("");
    const [email,setemail] =useState("");
    const [password,setpassword] =useState("");

    //handle form submission
    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            if(currentForm==="SignUp") {
                const response = await axios.post(backendUrl + '/api/users/register',{name,email,password});
                if (response.data.success) {
                    setToken(response.data.token)
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.status.error)
                }
            }
            const response = await axios.post(backendUrl + '/api/users/login' ,{email,password});
            if(response.data.success){
                setToken(response.data.accessToken);
                toast.success(response.data.message)
            }
            toast.error(response.data.error);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-200' >
        <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-10'>
            <div className='text-center'>
                <h3 className='uppercase font-bold text-shadow-lg text-gray-800' >{currentForm}</h3>
            </div>
            <div className='flex flex-col space-y-5' >
                {currentForm ==="Login"? null:(
                    <input value={name} onChange={(e)=>setName(e.target.value)} className='focus:outline-purple-600 h-8 w-full ' type='text' placeholder='name' required />
                )}
                <input value={email} onChange={(e)=>setemail(e.target.value)} className='focus:outline-purple-600 h-8 w-full' type='text' placeholder='email' required />
                <input value={password} onChange={(e)=>setpassword(e.target.value)} className='focus:outline-purple-600 h-8 w-full' type='password' placeholder='Password' required />                
            </div>


            <div className=''>
                {currentForm==="Login"?(
                    <div className='flex flex-row space-x-50'>
                        <p>Forgot Password?</p>
                        <p onClick={()=>setCurrentForm("Signup")} >Sign up</p>
                    </div>
                ):
                (
                    <div className='flex flex-row space-x-50' >
                        <p>Forgot Password?</p>
                        <p onClick={()=>setCurrentForm("Login")} >Login</p>
                    </div>
                )
                }
            </div>
            <div>
                <button type='Submit' className='bg-gray-400 h-7 rounded-2xl w-full hover:cursor-pointer hover:bg-gray-500 ' >
                    {currentForm==="Login"? "Login":"Signup"}
                </button>
            </div>


            


        </form>
    </div>
  )
}

export default Form
