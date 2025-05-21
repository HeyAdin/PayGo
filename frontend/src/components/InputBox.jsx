export function InputBox({inputHeading , type ,placeholder ,required}){
    return <div className="pt-2">
        <div className="font-subtitle py-3">{inputHeading}</div>
        <input required={required} type={type} placeholder={placeholder} className="rounded-lg border w-91 text-xl px-3 py-3 md:w-101" />
    </div>
}