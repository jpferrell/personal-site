import Link from "next/link";


export default function Projects() {
    return (
        <div className="min-h-screen min-w-full justify-items-center text-center p-4 text-2xl">
            <h1>Projects</h1>
            <Link
                href="./Projects/SigMFEditor"
            >
                SigMF Editor
            </Link>
        </div>
    );
}