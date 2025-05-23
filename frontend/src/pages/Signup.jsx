import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Buttons } from "../components/Buttons";
import { BottomWarning } from "../components/BottomWarning";
import { useEffect, useState } from "react";
import axios from "axios";
let timeout;
export function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

   useEffect(()=>{
     const token = localStorage.getItem('token');
    if (!token == null) {
        console.log("i am signup")
        navigate('/dashboard');
    }
   },[firstName]);
    return <div className="bg-[#0A2B24] w-110 md:w-130 border flex flex-col items-center p-5 rounded-xl h-187 text-white">
        <Heading heading={"Sign Up"} />
        <SubHeading subHeading={"Enter your information to create an account"} />
        <InputBox onChange={(e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setFirstName(e.target.value);
            }, 600);
        }} inputHeading={"First Name"} type={"text"} placeholder={"First Name"} required={false} />

        <InputBox onChange={(e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setLastName(e.target.value);
            }, 600);
        }} inputHeading={"Last Name"} type={"text"} placeholder={"Last Name"} required={false} />

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

        <Buttons buttonText={"Sign Up"} onClick={async () => {
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                firstName,
                lastName,
                email,
                password
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/dashboard');

        }} />
        <BottomWarning Warning={"Already have an account? "} link={<a className="text-[#EDB249]" onClick={() => navigate('/signin')}>Sign in</a>} />
    </div>
} 