'use client'

import { SigMfSelectInputProps } from "../SigMfInterfaces"

export default function SigMfSelectInput({ label, id, changeFunction, placeholder, required, hidden, values }: SigMfSelectInputProps) {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let retVal = null;
        if (e.target.value !== "") {
            retVal = e.target.value;
        }
        changeFunction(retVal);
    }

    return (
        <div className={`grid grid-cols-3 p-1 ${hidden ? "hidden" : ""}`}>
            <label htmlFor={`${id}`} className={`col-span-2 ${required ? "text-orange-400" : ""} capitalize font-semibold ${hidden ? "hidden" : ""}`}>{label}</label>
            <select id={`${id}`} className={`dark:bg-slate-600 text-center ${hidden ? "hidden" : ""}`} onChange={handleChange}>
                <option id={`${label}-empty-opt`} value={""}></option>
                { values.map((val) => <option id={`${label}-${val}-opt`} key={`key-${label}-${val}`} value={val}>{val}</option>) }
            </select>
        </div>
    );
}