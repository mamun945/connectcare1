"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Pencil,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ManageEventEditPage from "./ManageEventEdit";
import ManageEventDeletePage from "./ManageEventDelete";
import { Event } from "@/app/lib/type";

const ManageEventCardPage = ({ eventData }: { eventData: Event }) => {
  const formattedDate = eventData.eventDate
    ? new Date(eventData.eventDate).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  )
    : "Date unavailable";

  return (
    <Card className="group overflow-hidden border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Event Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={eventData.thumbnail}
          alt={eventData.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <Badge className="absolute left-4 top-4 bg-green-600 text-white hover:bg-green-600">
          {eventData.eventType}
        </Badge>
      </div>

      {/* Card Header */}
      <CardHeader className="space-y-2">
        <CardTitle className="line-clamp-1 text-xl font-bold">
          {eventData.title}
        </CardTitle>
      </CardHeader>

      {/* Event Information */}
      <CardContent className="space-y-4">

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <CalendarDays className="h-5 w-5 text-green-600" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <MapPin className="h-5 w-5 text-green-600" />
          <span className="capitalize">{eventData.location}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <UserRound className="h-5 w-5 text-green-600" />
          <span>{eventData.name}</span>
        </div>

      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="flex gap-3 border-t pt-4">
        <ManageEventEditPage eventData={eventData}></ManageEventEditPage>
        <ManageEventDeletePage eventData={eventData}></ManageEventDeletePage>
      </CardFooter>
    </Card>
  );
};

export default ManageEventCardPage;