import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const { registerUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);
        try {
            await registerUser(data.email, data.password);
            alert("Registration Successful");
            navigate("/login");
        } catch (error) {
            console.log("invalid email and/or password");
            console.log(error);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Google Sign In Successful");
            navigate("/");
        } catch (error) {
            alert("Google Sign In Failed");
            console.log(error);
        }
    }

    return <>        
        <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-gray-300 w-[30vw] h-[70vh] mx-auto mt-[15vh] p-10 flex flex-col justify-between items-start rounded-md">
            <h1 className="text-2xl font-bold mb-4">Please Register</h1>

            <label className="text-lg font-bold" htmlFor="email">Email</label>
            <input {...register("email", { required: true })} className="border-2 border-gray-300 w-[25vw] p-2 rounded-md" type="text" id="email" placeholder="Email Address"/>
            
            <label className="text-lg font-bold" htmlFor="password">Password</label>
            {/* <input {...register("password", { required: true })} className="border-2 border-gray-300 w-[25vw] p-2 rounded-md" type="password" id="password" placeholder="Password"/> */}
            <div className="relative w-[25vw]">
                <input {...register("password", { required: true })} className="border-2 border-gray-300 w-full p-2 rounded-md pr-10" type={showPassword ? "text" : "password"} id="password" placeholder="Password"/>
                <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600">
                    {
                    showPassword
                    ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#000" d="M11.5 18c4 0 7.46-2.22 9.24-5.5C18.96 9.22 15.5 7 11.5 7s-7.46 2.22-9.24 5.5C4.04 15.78 7.5 18 11.5 18m0-12c4.56 0 8.5 2.65 10.36 6.5C20 16.35 16.06 19 11.5 19S3 16.35 1.14 12.5C3 8.65 6.94 6 11.5 6m0 2C14 8 16 10 16 12.5S14 17 11.5 17S7 15 7 12.5S9 8 11.5 8m0 1A3.5 3.5 0 0 0 8 12.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 11.5 9"/></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16"><path fill="#000" d="M8 11c-1.65 0-3-1.35-3-3s1.35-3 3-3s3 1.35 3 3s-1.35 3-3 3m0-5c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"/><path fill="#000" d="M8 13c-3.19 0-5.99-1.94-6.97-4.84a.44.44 0 0 1 0-.32C2.01 4.95 4.82 3 8 3s5.99 1.94 6.97 4.84c.04.1.04.22 0 .32C13.99 11.05 11.18 13 8 13M2.03 8c.89 2.4 3.27 4 5.97 4s5.07-1.6 5.97-4C13.08 5.6 10.7 4 8 4S2.93 5.6 2.03 8"/><path fill="#000" d="M14 14.5a.47.47 0 0 1-.35-.15l-12-12c-.2-.2-.2-.51 0-.71s.51-.2.71 0l11.99 12.01c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z"/></svg>
                    }
                </button>
            </div>
            
            <button className="cursor-pointer bg-blue-500 w-[5vw] h-[5vh] text-white font-bold rounded-md my-4" type="submit">Register</button>
        
            <p>Have an account? Please <Link to="/login" className="text-blue-500 font-bold">Login</Link> </p>
                     
            <button onClick={handleGoogleSignIn} className="cursor-pointer bg-black w-[25vw] h-[6vh] text-white font-bold rounded-md mt-4 flex justify-center items-center gap-3 hover:bg-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M17.6 8.5h-7.5v3h4.4c-.4 2.1-2.3 3.5-4.4 3.4c-2.6-.1-4.6-2.1-4.7-4.7c-.1-2.7 2-5 4.7-5.1c1.1 0 2.2.4 3.1 1.2l2.3-2.2C14.1 2.7 12.1 2 10.2 2c-4.4 0-8 3.6-8 8s3.6 8 8 8c4.6 0 7.7-3.2 7.7-7.8c-.1-.6-.1-1.1-.3-1.7" clipRule="evenodd"/></svg>
                Sign in with Google
            </button>
        </form>
    </>
}

export default RegisterPage;