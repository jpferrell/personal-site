import dynamic from "next/dynamic"
import Head from "next/head"
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false })

export default function Resume() {
    return (
    <>
        <Head>
            <title>Jack Ferrell's Resume</title>
            <meta name="description" content="Jack Ferrell's interactive 2-D resume game" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.png" /> 
        </Head>
        <main className={`${styles.main} ${inter.className}`}>
            <div className="min-h-screen min-w-full justify-items-center text-center p-4 text-2xl">
                <AppWithoutSSR />
            </div>
        </main>
    </>
    )
}