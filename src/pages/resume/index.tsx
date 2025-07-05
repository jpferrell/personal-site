import dynamic from "next/dynamic"

const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false })

export default function Resume() {
    return (
    <div className="min-h-screen min-w-full justify-items-center text-center p-4 text-2xl">
        <AppWithoutSSR />
    </div>
    )
}