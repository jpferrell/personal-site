import Link from "next/link";
//import Image from "next/image";

interface Project {
    name: string,
    path: string,
    description: string,
    img?: string
};

const projectArr: Project[] = [
    {name: "SigMF Editor", path: "./Projects/SigMFEditor", description: "Client-side based application to create and edit SigMF files.", img: "logo-color.svg"},
    {name: "FPL", path: "./Projects/Fpl", description: "Fantasy Premier League anaylitics"},
    //{name: "Strava Analytics", path: "./Projects/Strava", description: "Analytics of my own personal Strava workouts"}
];

export default function Projects() {
    return (
        <div className="min-h-screen min-w-full justify-items-center text-center p-4">
            <h1 className="text-4xl">Projects</h1>
            <div className={`grid ${projectArr.length === 1 ? "grid-cols-1" : projectArr.length % 3 ? "grid-cols-2" : "grid-cols-3"} p-4 mx-auto gap-4`}>
                {projectArr.map((project) => (
                    <div key={`div-project-${project.name}`} className="rounded dark:bg-slate-700 bg-slate-200 p-4">
                        <h2 className="text-2xl p-2"><strong>{project.name}</strong></h2>
                        {/*<Image src={"/public/logo-color.svg"} alt="SigMF logo" width={200} height={200} />*/}
                        <p className="pb-2">{project.description}</p>
                        <Link key={`link-project-${project.name}`} href={project.path} className="rounded p-2 mx-8 hover:bg-slate-400 hover:underline dark:hover:bg-slate-600">Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}