import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Swal from 'sweetalert2';

const VerifyOTP = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth(null);
    const email = currentUser?.email;
    const [otp, setOtp] = useState("");

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    const checkOTP = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/otp/verify-otp", {
            // const response = await axios.post("https://ccp-by-sk.vercel.app/api/otp/verify-otp", {
                email,
                code: otp,
            });
            console.log(response.data.message);
            navigate("/");
            Toast.fire({
                icon: "success",
                title: `${currentUser.providerData[0].email} Logged In Successfully`
            });
        } catch (err) {
            Toast.fire({
                icon: "error",
                title: "Invalid or expired OTP"
            });
            console.error(err.response?.data || err.message);
        }
    };

    return <div className="w-[50vw] h-[50vh] mx-auto mt-[25vh] flex flex-col justify-evenly items-center">
        <h2 className="text-5xl font-semibold">Let's verify your OTP</h2>

        <input className="h-[6vh] pl-3 w-[20vw] border-2 rounded-2xl text-xl" type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />

        <button onClick={checkOTP} className="w-[8vw] h-[6vh] bg-yellow-400 text-xl font-semibold flex justify-center items-center rounded-md py-1 hover:scale-115 cursor-pointer"> Check OTP </button>
    </div>
};

export default VerifyOTP;