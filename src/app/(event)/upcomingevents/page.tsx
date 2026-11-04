import { Event } from "@/app/lib/type";
import EventsFilter from "@/components/EventFilter";


const UpcomingEventsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-events`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const events:Event[] = await res.json();

  return (
    <div className="container mx-auto space-y-12 px-4 py-10">

      {/* Events Heading */}
      <section id="events" className="space-y-3 text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl">
          Explore Upcoming Events
        </h2>

        <p className="text-sm text-muted-foreground md:text-base">
          Be part of something meaningful. Discover events and make a difference.
        </p>

        <div className="mx-auto h-1 w-16 rounded-full bg-green-600" />
      </section>

      {/* Filtering + Event Cards */}
      <EventsFilter events={events} />

    </div>
  );
};

export default UpcomingEventsPage;
