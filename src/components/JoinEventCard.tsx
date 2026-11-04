
import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  Clock,
  MapPin,
  Eye,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { JoinedEvent } from "@/app/lib/type";

const JoinEventCardPage = ({ joinData }:{joinData:JoinedEvent}) => {
  const {
    eventId,
    title,
    description,
    eventType,
    location,
    thumbnail,
    eventDate,
    joinDate,
  } = joinData;

  const formatDate = (date: string | undefined) => {
    if (!date) return "Date unavailable";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatJoinDate = (date: string | undefined) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card className="group overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300">

      {/* Thumbnail */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-4 left-4">
          <Badge className="bg-green-600 hover:bg-green-700 text-white">
            {eventType}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5">

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-7 line-clamp-3">
          {description}
        </p>

        <Separator className="my-5" />

        {/* Event Information */}
        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950">
              <MapPin size={20} className="text-green-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-medium text-sm dark:text-white">
                {location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950">
              <CalendarDays size={20} className="text-blue-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500">Event make Date</p>
              <p className="font-medium text-sm dark:text-white">
                {formatDate(eventDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950">
              <Clock size={20} className="text-purple-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500">Joined On</p>
              <p className="font-medium text-sm dark:text-white">
                {formatJoinDate(joinDate)}
              </p>
            </div>
          </div>

        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-5 pb-5 pt-0">
          <Link
            href={`/upcomingevents/${eventId}`}
            className="inline-flex h-10 w-full items-center justify-center gap-1 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            <Eye size={18} className="mr-2" />
            <div>View Event</div>
          </Link>
      </CardFooter>

    </Card>
  );
};

export default JoinEventCardPage;
