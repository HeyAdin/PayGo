export function Buttons({ buttonText }) {
    return <div className="pt-8">
            <button className="bg-teal-900 rounded-lg border w-91 text-2xl font-bold px-3 py-3 md:w-101 cursor-pointer hover:bg-teal-800 hover:transition-transform ">{buttonText}</button>
    </div>
}