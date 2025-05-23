import { useNavigate } from "react-router-dom"

export function Users({allUsers}){
    return <div className="m-4 mt-8 px-4">
        <h1 className="text-[#FFEFC6] font-subtitle text-3xl font-medium mb-7">Users</h1>
        {allUsers.map((user)=>{
            console.log(user)
            return <Friends id={user._id}  name={user.firstName} />
        })}
    </div>
}

function Friends({id , name}){
    const navigate =useNavigate();
    return <div className="flex justify-between items-center mb-7">
        <div className="flex gap-4 items-center text-xl md:text-2xl text-[#FFEFC6] font-subtitle">
            <div className="px-2 rounded-full bg-[#125244] text-2xl md:text-3xl">{name[0]}</div>
            <div className="font-medium">{name}</div>
        </div>
        <div className="font-medium text-xl bg-[#EDB249] py-1 px-3 rounded-3xl cursor-pointer md:text-2xl" onClick={()=>{
            navigate(`/funds-transfer?id=${id}&name=${name}`)
        }}>
            Send Money
        </div>
    </div>
}