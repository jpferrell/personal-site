export interface SigMfInputProps {
    label: string,
    id: string,
    type: string,
    placeholder?: string,
    required?: boolean
};

export default function SigMfInput( {label, id, type, placeholder, required}: SigMfInputProps) {
    return (
        <div className="grid grid-cols-3">
            <label className={`col-span-2 ${required ? "text-red-400" : ""} capitalize font-semibold`}><em>{label}</em></label>
            <input id={id} type={type} placeholder={placeholder} className="bg-slate-300 dark:bg-slate-600"/>
        </div>
    );
}