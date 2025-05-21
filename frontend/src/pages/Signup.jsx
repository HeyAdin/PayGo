import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Buttons } from "../components/Buttons";
import { BottomWarning } from "../components/BottomWarning";
export function Signup(){
    const navigate = useNavigate();
    return <div className="bg-[#0A2B24] w-110 md:w-130 border flex flex-col items-center p-5 rounded-xl h-187 text-white">
        <Heading heading={"Sign Up"}/>
        <SubHeading subHeading={"Enter your information to create an account"}/>
        <InputBox inputHeading={"First Name"} type={"text"} placeholder={"First Name"} required={false}/>
        <InputBox inputHeading={"Last Name"} type={"text"} placeholder={"Last Name"} required={false}/>
        <InputBox inputHeading={"Email"} type={"email"} placeholder={"Email"} required={true}/>
        <InputBox inputHeading={"Password"} type={"password"} placeholder={"Password"} required={true}/>
        <Buttons buttonText={"Sign Up"} onClick={()=>{}}/>
        <BottomWarning Warning={"Already have an account? "} link={<a className="text-[#EDB249]" onClick={()=> navigate('/signin')}>Sign in</a>} />
    </div>
} 