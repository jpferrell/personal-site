'use client'

import { SigMfInputProps } from "../SigMfInterfaces"

export default function SigMfNumberInput({ label, id, changeFunction, placeholder, required, hidden }: SigMfInputProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const inVal = e.target.value;
        const regex: RegExp = /^[0-9]+$/;
        let retVal: number|string = "";
        if (regex.test(inVal)) {
            retVal = parseFloat(inVal);
        }

        changeFunction(retVal);
    }

    return (
        <div className={`grid grid-cols-3 p-1 ${hidden ? "hidden" : ""}`}>
            <label htmlFor={`${id}`} className={`col-span-2 ${required ? "text-orange-500" : ""} capitalize font-semibold ${hidden ? "hidden" : ""}`}>{label}</label>
            <input id={id} type="number" placeholder={placeholder} className={`bg-slate-300 dark:bg-slate-600 ${hidden ? "hidden" : ""} rounded`} onChange={handleChange} />
        </div>
    );
}