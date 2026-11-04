

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Event } from "@/app/lib/type";



const EventsCardPage = ({ event }: { event: Event }) => {
  const formattedDate = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date unavailable";

  return (
    <Card className="group overflow-hidden border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Thumbnail */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <Badge className="absolute left-4 top-4 bg-green-600 text-white hover:bg-green-600">
          {event.eventType}
        </Badge>
      </div>

      {/* Card Header */}
      <CardHeader className="space-y-2">
        <CardTitle className="line-clamp-2 text-xl font-bold group-hover:text-green-600">
          {event.title}
        </CardTitle>

        <CardDescription className="line-clamp-2 leading-6">
          {event.description}
        </CardDescription>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="space-y-3">

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 text-green-600" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-green-600" />
          <span className="capitalize">{event.location}</span>
        </div>

      </CardContent>

      {/* Card Footer */}
      <CardFooter>
        <Button
          className="w-full bg-green-600 text-white hover:bg-green-700"
        >
          <Link href={`/upcomingevents/${event._id}`} className="flex items-center">
           <p> View Event</p>
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>

    </Card>
  );
};

export default EventsCardPage;