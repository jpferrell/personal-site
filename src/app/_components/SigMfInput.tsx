export interface SigMfInputProps {
    label: string,
    id: string,
    type: string,
    changeFuction?: Function,
    placeholder?: string,
    required?: boolean,
    hidden?: boolean
};

export default function SigMfInput( {label, id, type, changeFuction, placeholder, required, hidden}: SigMfInputProps) {

    const handleChange = (e) => {
        if (e.target.type === 'checkbox') {
            changeFuction(e.target.checked);
        }
    }

    return (
        <div className="grid grid-cols-3">
            <label htmlFor={`${id}`} className={`col-span-2 ${required ? "text-orange-400" : ""} capitalize font-semibold ${hidden ? "hidden" : ""}`}>{label}</label>
            <input id={id} type={type} placeholder={placeholder} className={`bg-slate-300 dark:bg-slate-600 ${hidden ? "hidden" : ""}`} onChange={handleChange} />
        </div>
    );
}