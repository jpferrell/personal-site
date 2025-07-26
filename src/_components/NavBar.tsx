import Link from "next/link";
import { AiOutlineFile, AiOutlineHome, AiOutlineUser, AiOutlineLaptop } from "react-icons/ai";

export default function Navbar() {
    return (
        <div className="flex justify-center">
            <div className="flex row-start-3 items-center justify-center gap-6 w-md flex-wrap text-xl rounded-2xl bg-slate-400">
                <div className="flex hover:underline hover:underline-offset-4 items-center gap-1">
                    <AiOutlineHome></AiOutlineHome>
                    <Link
                        href="/"
                    >
                        Home
                    </Link>
                </div>
                <div className="flex hover:underline hover:underline-offset-4 items-center gap-1">
                    <AiOutlineFile></AiOutlineFile>
                    <Link
                        href="/resume"
                    >
                        Resume
                    </Link>
                </div>
                <div className="flex hover:underline hover:underline-offset-4 items-center gap-1">
                    <AiOutlineLaptop></AiOutlineLaptop>
                    <Link
                        href="/projects"
                    >
                        Projects
                    </Link>
                </div>
                {/*
                <div className="flex hover:underline hover:underline-offset-4 items-center gap-1">
                    <AiOutlineUser></AiOutlineUser>
                    <Link
                        href="/AboutMe"
                    >
                        About Me
                    </Link>
                </div>
                */}
            </div>
        </div>
    );
}
