
import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  MapPin,
  ArrowLeft,
  CalendarCheck,
  HeartHandshake,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import JoinEventForm from "@/components/JoinEventFrom";
import { getTokenFromServer } from "@/app/lib/getTokenFromServer";
import { Event } from "@/app/lib/type";



const UpcomingEventPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  
  const token = await getTokenFromServer();
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/upcoming-events/${id}`,
     {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
    
  );

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">
          Event not found!
        </h2>
      </div>
    );
  }

  const data: Event = await res.json();

  const formattedDate = new Date(
    `${data.eventDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">

      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <Link
          href="/upcomingevents"
          className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-green-600"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        <Card className="overflow-hidden border-none shadow-xl rounded-2xl">

          {/* Event Image */}
          <div className="relative w-full h-[280px] md:h-[450px]">
            <Image
              src={data.thumbnail}
              alt={data.title}
              fill
              unoptimized
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-6 left-6 md:left-10">
              <Badge className="bg-green-600 hover:bg-green-700 text-white mb-3">
                {data.eventType}
              </Badge>

              <h1 className="text-3xl md:text-5xl font-bold text-white">
                {data.title}
              </h1>
            </div>
          </div>

          <CardContent className="p-6 md:p-10">

            {/* Event Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div className="flex items-center gap-4 p-5 rounded-xl bg-green-50 dark:bg-green-950/30">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <CalendarDays className="text-green-600" size={25} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Event Date
                  </p>

                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {formattedDate}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <MapPin className="text-blue-600" size={25} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Event Location
                  </p>

                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {data.location}
                  </h3>
                </div>
              </div>

            </div>

            <Separator className="my-8" />

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                About This Event
              </h2>

              <p className="text-gray-600 dark:text-gray-400 leading-8 text-base md:text-lg whitespace-pre-line">
                {data.description}
              </p>
            </div>

            <Separator className="my-8" />

            {/* Join Event Section */}
            <div className="rounded-2xl border border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20 p-6 md:p-8">

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                  <HeartHandshake
                    className="text-green-600"
                    size={28}
                  />
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Join This Event
                  </h2>

                  <p className="text-sm text-gray-500">
                    Be a part of something meaningful.
                  </p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your participation can make a positive difference.
                Join this event and contribute to your community.
              </p>

              <JoinEventForm joineventInfo={data}/>

            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default UpcomingEventPage;
