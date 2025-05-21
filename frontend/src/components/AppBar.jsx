export function AppBar({user}){
    return <div className="flex justify-between items-center p-4 border-b-1 border-[#06201b]">
        <div className="font-black text-4xl md:text-5xl">
            PAY<span className="font-title italic text-[#EDB249] " >GO</span>
        </div>
        <div className="flex items-center gap-2 text-xl md:text-2xl font-subtitle font-medium text-[#FFEFC6]">
            <div>Hello {user}</div>
            <div className=" px-2 rounded-full text-[#FFEFC6] bg-[#125244] text-2xl md:text-3xl">{user[0]}</div>
        </div>
    </div>
}