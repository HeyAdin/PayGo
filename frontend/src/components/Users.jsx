const users = ["Asif Hussain","Riaz Mohammad","Arham Masood","Faizi Shakil","Saheb Mahmood"];
export function Users(){
    return <div className="m-4 mt-8 px-4">
        <h1 className="text-[#FFEFC6] font-subtitle text-3xl font-medium mb-7">Users</h1>
        {users.map((user)=>{
            return <Friends logo={user[0]} name={user}/>
        })}
    </div>
}

function Friends({logo , name}){
    return <div className="flex justify-between items-center mb-7">
        <div className="flex gap-4 items-center text-xl md:text-2xl text-[#FFEFC6] font-subtitle">
            <div className="px-2 rounded-full bg-[#125244] text-2xl md:text-3xl">{logo}</div>
            <div className="font-medium">{name}</div>
        </div>
        <div className="font-medium text-xl bg-[#EDB249] py-1 px-3 rounded-3xl cursor-pointer md:text-2xl">
            Send Money
        </div>
    </div>
}