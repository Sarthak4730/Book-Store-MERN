import { useNavigate } from "react-router";

const RequestOTP = () => {
    const navigate = useNavigate();

    const verifyOTP = () => {
        navigate("/otp-verify");
    }

    return <>
        <h2>As part of 2-step verification - we generate OTP for you, check your Email Inbox and then click on the button given below</h2>
        
        <button onClick={verifyOTP}>
            Verify OTP
        </button>
    </>
};

export default RequestOTP;