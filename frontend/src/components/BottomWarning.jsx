export function BottomWarning({Warning,link}){
    return <div className="pt-4 tracking-wider">
        {Warning}
        <span className="underline decoration-[#EDB249] cursor-pointer">{link}</span>
    </div>
}