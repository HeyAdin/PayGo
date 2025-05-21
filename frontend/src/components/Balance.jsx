export function Balance({balance}){
    return <div className="m-4 mt-10  md:mt-15 py-8 px-6 md:py-10 md:px-8 rounded-2xl shadow-lg bg-gradient-to-l from-[#0A2B24] to-[#176F5B]">
        <h1 className=" font-subtitle text-[#fcfcfc] text-xl md:text-2xl">Your Balance</h1>
        <h1 className="font-subtitle font-black text-[#f8df9f] text-6xl md:text-7xl mt-3">{balance}</h1>
    </div>
}