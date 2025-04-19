import { useNavigate } from "react-router";
import { useState } from "react";

const VerifyOTP = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");

    const checkOTP = () => {
        navigate("/");
    }

    return <>
        <h2>Let's verify your OTP</h2>

        <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={checkOTP}>
            Check OTP
        </button>
    </>
};

export default VerifyOTP;