
"use client";

import { useState, type FormEvent } from "react";
import EventsCardPage from "@/components/EventsCard";
import { Search } from "lucide-react";
import { Event } from "@/app/lib/type";

const categories = [
  "All Categories",
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Health",
  "Fundrasing",
  "Other",
];

const EventsFilter = ({ events }:{events:Event[]}) => {
  const [category, setCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter((event:Event) => {
    const matchCategory =
      category === "All Categories" ||
      event.eventType === category;

    const matchSearch = event.eventType
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(search.trim());
  };

  return (
    <div className="space-y-8">

      {/* Filter Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-green-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white md:w-64"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <form
          onSubmit={handleSearch}
          className="flex w-full gap-2 md:w-96"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by event type..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-green-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />

          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-green-600 px-5 text-white transition hover:bg-green-700"
          >
            <Search size={18} />
            Search
          </button>
        </form>
      </div>

      {/* Result Count */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing {filteredEvents.length} of {events.length} events
      </p>

      {/* Event Cards */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventsCardPage key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-12 text-center dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            No Events Found!
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Try another category or search keyword.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventsFilter;
