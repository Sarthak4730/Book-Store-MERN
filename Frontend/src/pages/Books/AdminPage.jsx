import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

import axios from 'axios';

const AdminPage = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // console.log(data);
            const response = await axios.post('http://localhost:3000/api/auth/admin', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const auth = response.data;
            setErrorMessage(false);
            
            if(auth.token){
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                   localStorage.removeItem('token');
                   alert('Token has expired. Please login again');
                   navigate('/admin');
                }, 60*60*1000);
            }

            alert('Logged In Successfully');
            navigate('/dashboard');
        } catch (error) {
            console.log("incorrect password");
            console.log(error);
            setErrorMessage("Incorrect Password");
        }
    }

    return <>
        <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-gray-300 w-[30vw] h-[60vh] mx-auto mt-[20vh] p-10 flex flex-col justify-between items-start rounded-md">
            <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

            <label className="text-lg font-bold" htmlFor="username">Username</label>
            <input {...register("username", { required: true })} className="border-2 border-gray-300 w-[25vw] p-2 rounded-md" type="text" id="username" placeholder="Enter Username"/>
            
            <label className="text-lg font-bold" htmlFor="password">Password</label>
            <input {...register("password", { required: true })} className="border-2 border-gray-300 w-[25vw] p-2 rounded-md" type="password" id="password" placeholder="Enter Password"/>
            
            { errorMessage && <h3 className="text-red-500 mt-4"> {errorMessage} </h3> }

            <button className="cursor-pointer bg-blue-500 w-[5vw] h-[5vh] text-white font-bold rounded-md my-4 hover:scale-110" type="submit">Login</button>
            
            {/* <p>Don't have an account? Please <Link to="/register" className="text-blue-500 font-bold">Register</Link> </p> */}
        </form>
    </>
}

export default AdminPage;