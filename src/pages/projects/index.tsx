import Head from "next/head";
import Link from "next/link";

const projectDict = [
    {
        name: "SigMF Editor",
        imageLink: "",
        desc: "Client-side React web application for viewing and editing SigMF metadata files",
        pageLink: "https://www.sigmfeditor.com",
        linkText: "Visit"
    },
    //{}
];

export default function Projects() {
    return (
        <div>
            <Head>
                <title>Jack Ferrell's Projects</title>
                <meta name="description" content="Jack Ferrell's Project landing page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" /> 
            </Head>
            <div className={`grid ${projectDict.length === 1 ? "grid-cols-1" : projectDict.length % 3 === 0 ? "grid-cols-3" : "grid-cols-2"} min-w-full justify-items-center text-center p-4`}>
                {projectDict.map((project) => (
                    <div key={`div-project-${project.name}`} className="rounded dark:bg-slate-700 bg-slate-200 p-4">
                        <div className="text-2xl">
                            {project.name}
                        </div>
                        <div className="">
                            {project.desc}
                        </div>
                        <div className="mt-4">
                            <Link href={project.pageLink} className="hover:dark:bg-slate-400 dark:bg-slate-500 p-1 rounded-sm font-bold" target="_blank">
                            {project.linkText}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}