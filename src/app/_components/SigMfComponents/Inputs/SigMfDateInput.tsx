'use client'

import { SigMfInputProps } from "../SigMfInterfaces"

export default function SigMfDateInput({ label, id, changeFunction, required, hidden }: SigMfInputProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    return (
        <div className="grid grid-cols-3 p-1">
            <label htmlFor={`${id}`} className={`col-span-2 ${required ? "text-orange-400" : ""} capitalize font-semibold ${hidden ? "hidden" : ""}`}>{label}</label>
            <input id={id} type="date" className={`bg-slate-300 dark:bg-slate-600 ${hidden ? "hidden" : ""}`} onChange={handleChange} />
        </div>
    );
}