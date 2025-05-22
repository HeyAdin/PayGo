import { Buttons } from '../components/Buttons'
import {Heading} from '../components/Heading'
import { InputBox } from '../components/InputBox'
export function FundsTransfer() {
    return <div className='bg-[#0A2B24] w-110 md:w-130 border flex flex-col items-center p-5 rounded-xl h-100 text-white'>
    <Heading heading={"Send Money"} />
     <div className="flex gap-4 w-102 mt-5 items-center text-xl md:text-2xl lg:text-3xl text-[#FFEFC6] font-subtitle pb-2">
            <div className="px-2  rounded-full bg-[#125244] text-2xl md:text-3xl lg:text-4xl">{"A"}</div>
            <div className="font-medium ">{"Friends Name"}</div>
        </div>
    <InputBox inputHeading={"Amount (in Rs)"} type={"text"} placeholder={"Enter amount"} required={true}/>
    <Buttons buttonText={"Transfer Funds"}/>
    </div>
}