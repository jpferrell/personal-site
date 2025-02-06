'use client'

import { SigMfInputProps } from "../SigMfInterfaces"

export default function SigMfTextInput({ label, id, changeFunction, placeholder, required, hidden }: SigMfInputProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let retVal = null;
        if (e.target.value !== "") {
            retVal = e.target.value;
        }
        changeFunction(retVal);
    }

    return (
        <div className={`grid grid-cols-3 p-1 ${hidden ? "hidden" : ""}`}>
            <label htmlFor={`${id}`} className={`col-span-2 ${required ? "text-orange-400" : ""} capitalize font-semibold ${hidden ? "hidden" : ""}`}>{label}</label>
            <input id={id} type="text" placeholder={placeholder} className={`bg-slate-300 dark:bg-slate-600 ${hidden ? "hidden" : ""}`} onChange={handleChange} />
        </div>
    );
}