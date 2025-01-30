'use client'

import dynamic from "next/dynamic";

const ResumeGameWithoutSsr = dynamic(() => import('@/app/resume/_PhaserGame'), {ssr: false});

export default function Resume() {
    return (
    <div className="min-h-screen min-w-full justify-items-center text-center p-4 text-2xl">
        <h1>Resume coming soon!</h1>
        <ResumeGameWithoutSsr />
    </div>
    );
}
