import PlayerDisplay from "@/app/_components/FplComponents/PlayerDisplay";

const base_url: string = 'https://fantasy.premierleague.com/api/';

interface PlayerElement {
    can_transact: boolean,
    can_select: boolean,
    chance_of_playing_next_round: number,
    chance_of_playing_this_round: number,
    code: number,
    cost_change_event: number,
    cost_change_event_fall: number,
    cost_change_start: number,
    cost_change_start_fall: number,
    dreamteam_count: number,
    element_type: number,
    ep_next: string,
    ep_this: string,
    event_points: number,
    first_name: string,
    form: string,
    id: number,
    in_dreamteam: boolean,
    news: string,
    news_added: string,
    now_cost: number,
    photo: string,
    points_per_game: string,
    removed: boolean,
    second_name: string,
    selected_by_percent: string,
    special: boolean,
    squad_number: number,
    status: string,
    team: number,
    team_code: number,
    total_points: number,
    transfers_in: number,
    transfers_in_event: number,
    transfers_out: number,
    transfers_out_event: number, 
};

export default function Fpl() {

    async function getBootstrapData(): Promise<any> {
        const bootstrap_url: string = base_url + 'bootstrap-static/';
        try {
            const rsp: Promise<Response> = await fetch(bootstrap_url);
            if (!(await rsp).ok) {
                throw new Error(`Response status: ${(await rsp).status}`);
            } else {
                const data: Promise<any> = (await rsp).json();
                return data;
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(`Error message: ${e.message}`);
            }
        }
    }
/*
    const dataProm: Promise<any> = getBootstrapData().then(data => {

    })
*/

    return (
        <div className="text-center p-4 mx-auto">
            <h1 className="text-4xl"><strong>Fantasy Premier League</strong></h1>
            <PlayerDisplay name='Test Name' team='Team name'></PlayerDisplay>
        </div>
    )
}
