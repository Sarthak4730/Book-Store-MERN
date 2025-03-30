import { Link } from "react-router";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const LoginPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    
    // const handleGoogleSignIn = () => {}
    
    const onSubmit = async (data) => {
        console.log(data);
        try {
            await loginUser(data.email, data.password);
            alert("Login Successful");
            navigate("/");
        } catch (error) {
            console.log("invalid email and/or password");
            console.log(error);
            setErrorMessage("Invalid Email and/or Password");
        }
    }

    return <>
        <Navbar count={cartItems.length} />
        
        <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-gray-300 w-[30vw] h-[70vh] mx-auto mt-[20vh] p-10 flex flex-col justify-between items-start rounded-md">
            <h1 className="text-2xl font-bold mb-4">Please Login</h1>

            <label className="text-lg font-bold" htmlFor="email">Email</label>
            <input {...register("email", { required: true })} className="border-2 border-gray-300 w-[25vw] p-2 rounded-md" type="text" id="email" placeholder="Email Address"/>
            
            <label className="text-lg font-bold" htmlFor="password">Password</label>
            <input {...register("password", { required: true })} className="border-2 border-gray-300 w-[25vw] p-2 rounded-md" type="password" id="password" placeholder="Password"/>
            
            { errorMessage && <h3 className="text-red-500 mt-4"> {errorMessage} </h3> }

            <button className="cursor-pointer bg-blue-500 w-[5vw] h-[5vh] text-white font-bold rounded-md my-4" type="submit">Login</button>
            
            <p>Don't have an account? Please <Link to="/register" className="text-blue-500 font-bold">Register</Link> </p>
            
            {/* <button onClick={handleGoogleSignIn} */}
            <button className="cursor-pointer bg-black w-[25vw] h-[6vh] text-white font-bold rounded-md mt-4 flex justify-center items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M17.6 8.5h-7.5v3h4.4c-.4 2.1-2.3 3.5-4.4 3.4c-2.6-.1-4.6-2.1-4.7-4.7c-.1-2.7 2-5 4.7-5.1c1.1 0 2.2.4 3.1 1.2l2.3-2.2C14.1 2.7 12.1 2 10.2 2c-4.4 0-8 3.6-8 8s3.6 8 8 8c4.6 0 7.7-3.2 7.7-7.8c-.1-.6-.1-1.1-.3-1.7" clipRule="evenodd"/></svg>
                Sign in with Google
            </button>
        </form>
    </>
}

export default LoginPage;