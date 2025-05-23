export function Buttons({ buttonText ,onClick}) {
    return <div className="pt-8">
            <button onClick={onClick} className="bg-[#EDB249] rounded-lg border border-teal-950 w-91 text-2xl font-bold px-3 py-3 md:w-101 cursor-pointer hover:bg-teal-800 hover:transition-transform ">{buttonText}</button>
    </div>
}