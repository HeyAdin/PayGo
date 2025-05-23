import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Buttons } from "../components/Buttons";
import { BottomWarning } from "../components/BottomWarning";
import { useEffect, useState } from "react";
import axios from "axios";
let timeout;
export function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token) {
        console.log("i am signin")
        navigate('/dashboard');
    }
    },[email])

    return <div className="bg-[#0A2B24] w-110 md:w-130 border flex flex-col items-center p-5 rounded-xl h-132 text-white">
        <Heading heading={"Sign In"} />
        <SubHeading subHeading={"Enter your credentials to access your account"} />

        <InputBox onChange={(e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setEmail(e.target.value);
            }, 600);
        }} inputHeading={"Email"} type={"email"} placeholder={"Email"} required={true} />

        <InputBox onChange={(e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setPassword(e.target.value);
            }, 600);
        }} inputHeading={"Password"} type={"password"} placeholder={"Password"} required={true} />

        <Buttons buttonText={"Sign In"} onClick={async () => {
            const response = await axios.post("https://paygo.onrender.com/api/v1/user/signin", {
                email,
                password
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/dashboard');
        }} />
        <BottomWarning Warning={"Don't have an account? "} link={<span className="text-[#EDB249]" onClick={() => navigate('/signup')}>Sign up</span>} />
    </div>
}