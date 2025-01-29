import Link from "next/link";

interface Project {
    name: string,
    path: string,
    description: string,
    img?: string
};

const projectArr: Project[] = [
    {name: "SigMFEditor", path: "./Projects/SigMFEditor", description: "SigMF Editor"},
    {name: "FPL", path: "./Projects/FPL", description: "FPL analysis"}
];

export default function Projects() {
    return (
        <div className="min-h-screen min-w-full justify-items-center text-center p-4 text-2xl">
            <h1>Projects</h1>
            <div className="grid md:grid-cols-3 sm:grid-cols-1 p-4 mx-auto gap-4">
                {projectArr.map((project) => (
                    <div key={`div-project-${project.name}`} className="rounded dark:bg-slate-700 p-4">
                        <h2 className="pb-2">{project.name}</h2>
                        <Link key={`link-project-${project.name}`} href={project.path} className="rounded p-2 mx-8 dark:hover:bg-slate-600">Read More!</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}