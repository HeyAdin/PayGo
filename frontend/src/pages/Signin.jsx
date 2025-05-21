import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Buttons } from "../components/Buttons";
import { BottomWarning } from "../components/BottomWarning";
export function Signin(){
    const navigate = useNavigate();
    return <div className="bg-[#0A2B24] w-110 md:w-130 border flex flex-col items-center p-5 rounded-xl h-132 text-white">
        <Heading heading={"Sign In"}/>
        <SubHeading subHeading={"Enter your credentials to access your account"}/>
        <InputBox inputHeading={"Email"} type={"email"} placeholder={"Email"} required={true}/>
        <InputBox inputHeading={"Password"} type={"password"} placeholder={"Password"} required={true}/>
        <Buttons buttonText={"Sign In"} onClick={()=>{}}/>
        <BottomWarning Warning={"Don't have an account? "} link={<span className="text-[#EDB249]" onClick={()=> navigate('/signup')}>Sign up</span>} />
    </div>
}