import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const RequestOTP = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth(null);
    const email = currentUser.providerData[0].email;

    const sendOTP = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/otp/send-otp", {email} );
            console.log(response.data.message);
        } catch (err) {
            console.error("Error sending OTP:", err.response?.data || err.message);
        }
    };

    const verifyOTP = () => {
        navigate("/otp-verify");
    }

    useEffect(() => {
        sendOTP();
    }, []);

    return <div className="w-[50vw] h-[50vh] mx-auto mt-[25vh] flex flex-col justify-evenly items-center">
        <h1 className="text-5xl text-blue-500 font-bold">2-Step Verification</h1>
        <h2 className="text-3xl font-semibold text-center">Check your Email Inbox for the OTP we sent and then click on the button given below</h2>
        
        <button onClick={verifyOTP} className="w-[8vw] h-[6vh] bg-yellow-400 text-xl font-semibold flex justify-center items-center rounded-md py-1 hover:scale-115 cursor-pointer">
            Verify OTP
        </button>
    </div>
};

export default RequestOTP;