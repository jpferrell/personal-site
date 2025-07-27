import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import catimage from "/public/assets/catlogoipsum.png"
import { FaGithub, FaLinkedin, FaStrava } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";



const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>Jack Ferrell's Personal Site</title>
                <meta name="description" content="The personal site of Jack Ferrell, showcasing his projects and interests" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" /> 
            </Head>
            <main className={`${styles.main} ${inter.className} w-screen border border-blue-300`}>
                <div className="h-screen w-screen border border-amber-800 flex place-content-center items-center" >
                    <div className="grid grid-cols-2 border w-fit h-fit border-slate-300 rounded-2xl justify-items-center items-center">
                        <Image src="/assets/weddingPicHeadshot.JPEG" alt="Wedding headshot" width={150} height={150} className="border-slate-400 border rounded-full" />
                        <div className="grid grid-rows-3 p-2 justify-items-center">
                            {/*<h1>Jack Ferrell</h1>*/}
                            <div className="text-4xl">
                                Jack Ferrell
                            </div>
                            <div className="text-xl">
                                Electrical Engineer, Triathlete
                            </div>
                            <div className="grid grid-cols-3 gap-x-8">
                                <Link href="https://github.com/jpferrell" target="_blank"><FaGithub /></Link>
                                <Link href="https://www.linkedin.com/in/jack-ferrell-9b8b0783" target="_blank"><FaLinkedin /></Link>
                                {/* Need to figure out how to pop an email */}
                                <IoMdMail />
                                {/*<Link href="https://www.strava.com/athletes/37378919" target="_blank"><FaStrava /></Link>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-screen w-screen border border-yellow-400">

                </div>
            </main>
        </>
    );
}
