'use client'

import { SigMfInputProps } from "../SigMfInterfaces";

export default function SigMfCheckboxInput({ label, id, changeFunction, required, hidden }: SigMfInputProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeFunction(e.target.checked);
    }

    return (
        <div className="grid grid-cols-3 p-1">
            <label htmlFor={`${id}`} className={`col-span-2 ${required ? "text-orange-400" : ""} capitalize font-semibold ${hidden ? "hidden" : ""}`}>{label}</label>
            <input id={id} type="checkbox" className={`bg-slate-300 dark:bg-slate-600 ${hidden ? "hidden" : ""}`} onChange={handleChange} />
        </div>
    );
}