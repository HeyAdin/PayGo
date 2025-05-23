import { useState } from 'react'
import { Buttons } from '../components/Buttons'
import { Heading } from '../components/Heading'
import { InputBox } from '../components/InputBox'
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
let timeout;
export function FundsTransfer() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name')
    const [amount, setAmount] = useState(0);
    return <div className='bg-[#0A2B24] w-110 md:w-130 shadow flex flex-col items-center p-5 rounded-xl h-100 text-white'>
        <Heading heading={"Send Money"} />
        <div className="flex gap-4 w-102 mt-5 items-center text-xl md:text-2xl lg:text-3xl text-[#FFEFC6] font-subtitle pb-2">
            <div className="px-2  rounded-full bg-[#125244] text-2xl md:text-3xl lg:text-4xl">{name[0]}</div>
            <div className="font-medium ">{name}</div>
        </div>
        <InputBox inputHeading={"Amount (in Rs)"} type={"text"} placeholder={"Enter amount"} required={true} onChange={(e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setAmount(e.target.value);
            }, 500);
        }} />
        <Buttons buttonText={"Transfer Funds"} onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/accounts/transfer", {
                to: id,
                amount

            }, {
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert(response.data.msg)
            navigate('/dashboard')
        }} />
    </div>
}