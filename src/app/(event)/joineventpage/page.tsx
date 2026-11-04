
import JoinEventCardPage from "@/components/JoinEventCard";
import { HeartHandshake, Leaf, Sparkles } from "lucide-react";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { getTokenFromServer } from "@/app/lib/getTokenFromServer";
import { JoinedEvent } from "@/app/lib/type";

const JoinEventPage = async () => {
    const token = await getTokenFromServer();
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
const user = session?.user;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joinevent/${user?.email}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const joinDatas:JoinedEvent[] = await res.json();
  const sortedJoinDatas = joinDatas.sort(
    (a, b) =>
      new Date(a.eventDate ?? "").getTime() -
      new Date(b.eventDate ?? "").getTime()
  );

  return (
    <div className="container mx-auto px-4 py-10">

      {/* Heading Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 px-6 py-12 md:px-12 md:py-16 mb-10">

        {/* Decorative Icons */}
        <div className="absolute right-10 top-8 opacity-20">
          <Leaf size={130} className="text-white" />
        </div>

        <div className="relative z-10 max-w-2xl">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white mb-5">
            <HeartHandshake size={18} />
            My Joined Events
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Together We Can Make
            <span className="block text-green-100">
              A Better World!
            </span>
          </h1>

          <p className="mt-5 text-green-50 text-sm md:text-base leading-7 max-w-xl">
            Every small action creates a big impact. Explore the events
            you have joined, stay connected with your community, and
            continue making a positive difference through your
            participation.
          </p>

          <div className="flex items-center gap-2 mt-6 text-white font-medium">
            <Sparkles size={19} />
            <span>Be the change you want to see.</span>
          </div>

        </div>
      </div>

      {/* Events Section */}
      <div className="mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Events You Joined
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Keep track of your participation and upcoming activities.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-semibold w-fit">
          <HeartHandshake size={17} />
          {joinDatas.length} Joined Events
        </div>

      </div>

      {/* Event Cards */}
      {joinDatas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedJoinDatas.map((joinData) => (
            <JoinEventCardPage
              key={joinData._id}
              joinData={joinData}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-2xl">
          <HeartHandshake
            size={45}
            className="mx-auto text-gray-400 mb-4"
          />

          <h3 className="text-xl font-bold">
            No Joined Events Yet!
          </h3>

          <p className="text-gray-500 mt-2">
            Start exploring events and join something meaningful.
          </p>
        </div>
      )}

    </div>
  );
};

export default JoinEventPage;
