/*
import { Game } from "phaser";
import { Boot } from "./_scenes/Boot";
import { Preloader } from "./_scenes/Preloader";
import { MainMenu } from "./_scenes/MainMenu";
import dynamic from "next/dynamic";
*/

//const AppWithoutSSR = dynamic(() => import("@/app/resume/_PhaserApp"), { ssr: false });

export default function Resume() {
    return (
    <div className="min-h-screen min-w-full justify-items-center text-center p-4 text-2xl">
        <h1>Resume coming soon!</h1>
        {/*<AppWithoutSSR />*/}
    </div>
    );
}
