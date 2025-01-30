'use client'

import { SigMfInputProps } from "../SigMfInterfaces"

export default function SigMfNumberInput({ label, id, changeFunction, placeholder, required, hidden }: SigMfInputProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        
    }

    return (
        <div className="grid grid-cols-3">
            <label htmlFor={`${id}`} className={`col-span-2 ${required ? "text-orange-400" : ""} capitalize font-semibold ${hidden ? "hidden" : ""}`}>{label}</label>
            <input id={id} type="number" placeholder={placeholder} className={`bg-slate-300 dark:bg-slate-600 ${hidden ? "hidden" : ""}`} onChange={handleChange} />
        </div>
    );
}