import { Link } from "react-router";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";

const LoginPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);

    return <>
        <Navbar count={cartItems.length} />
        
        <div className="border-2 border-gray-300 w-[30vw] h-[60vh] mx-auto mt-[20vh] p-10 flex flex-col justify-between items-start rounded-md">
            <h1 className="text-2xl font-bold mb-4">Please Login</h1>

            <label className="text-lg font-bold" htmlFor="">Email</label>
            <input className="border-2 border-gray-300 w-[25vw] p-2 rounded-md" type="text" name="" id="" placeholder="Email Address"/>
            
            <label className="text-lg font-bold" htmlFor="">Password</label>
            <input className="border-2 border-gray-300 w-[25vw] p-2 rounded-md" type="text" name="" id="" placeholder="Password"/>
            
            <button className="cursor-pointer bg-blue-500 w-[5vw] h-[5vh] text-white font-bold rounded-md mt-4" type="submit">Login</button>
            
            <p>Don't have an account? Please <Link to="/register" className="text-blue-500 font-bold">Register</Link> </p>
            
            <button className="cursor-pointer bg-black w-[25vw] h-[6vh] text-white font-bold rounded-md mt-4 flex justify-center items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M17.6 8.5h-7.5v3h4.4c-.4 2.1-2.3 3.5-4.4 3.4c-2.6-.1-4.6-2.1-4.7-4.7c-.1-2.7 2-5 4.7-5.1c1.1 0 2.2.4 3.1 1.2l2.3-2.2C14.1 2.7 12.1 2 10.2 2c-4.4 0-8 3.6-8 8s3.6 8 8 8c4.6 0 7.7-3.2 7.7-7.8c-.1-.6-.1-1.1-.3-1.7" clip-rule="evenodd"/></svg>
                Sign in with Google
            </button>
        </div>
    </>
}

export default LoginPage;