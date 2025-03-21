

export default function PlayerDisplay({ name, team }: {name: string, team: string }) {
    return (
        <div className="border-4 border-rose-200 flex justify-center mx-auto w-20">
            Team name: {team} player name: {name}
        </div>
    )
}