import Image from "next/image";

const leadershipTeam = [
  {name: "Jack", role: "Nerd", imageUrl: "vercel.svg"},
  {name: "Dakota", role: "Cool One", imageUrl: "vercel.svg"},
  {name: "Lucky", role: "Kooky One", imageUrl: "vercel.svg"},
  {name: "Sassy", role: "See Name", imageUrl: "vercel.svg"}
];

export default function Home() {
  return (
    <div className="pt-4 text-center  bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto grid xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold text-pretty">Meet the leadership team</h2>
          <p className="text-lg text-slate-300">They are so dynamic it is absolutely bananas</p>
        </div>
      </div>
      <ul role="list" className="grid sm:grid-cols-2">
        {leadershipTeam.map((person) => (
          <li key={person.name}>
            <div className="flex items-center gap-x-6">
              {/* TODO: Figure out images here, try out some real ones */}
              <Image alt="" src={person.imageUrl} width={10} height={10} placeholder="empty" className="size-16 rounded-full" />
              <div>
                <h3 className="text-base/7 font-semibold tracking-tight text-gray-900 dark:text-gray-300">{person.name}</h3>
                <p className="text-sm/6 font-semibold text-indigo-600 dark:text-indigo-300">{person.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
