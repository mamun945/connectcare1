import { auth } from "@/app/lib/auth";
import ManageEventCardPage from "@/components/ManageEventCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { headers } from "next/headers";
import Link from "next/link";

import {
  CalendarDays,
  CalendarPlus,
  Plus,
  FolderOpen,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { getTokenFromServer } from "@/app/lib/getTokenFromServer";
import type { ComponentProps } from "react";

type ManageEvent = ComponentProps<typeof ManageEventCardPage>["eventData"];

const ManageEventPage = async () => {

  const token = await getTokenFromServer();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/upcoming-events/email/${user?.email}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );


  const datas: ManageEvent[] = res.ok ? await res.json() : [];

  return (
    <div className="container mx-auto space-y-8 px-4 py-10">

      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-green-50 via-emerald-50 to-lime-50 p-6 dark:from-green-950 dark:via-emerald-950 dark:to-gray-900 md:p-10">

        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div className="space-y-3">
            <div className="flex w-fit items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 dark:bg-green-900/50 dark:text-green-300">
              <Sparkles size={16} />
              Event Dashboard
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              Manage My{" "}
              <span className="text-green-600 dark:text-green-400">
                Events
              </span>
            </h1>

            <p className="max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-300 md:text-base">
              Manage all your community events in one place.
              You can create new events, update event information,
              and keep your community activities organized.
            </p>

            <p className="flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400">
              <CalendarDays size={17} />
              Your events, your impact, your community.
            </p>
          </div>

          <Button
            className="w-full bg-green-600 text-white hover:bg-green-700 md:w-auto"
          >
            <Link href="/add-events" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Create New Event
            </Link>
          </Button>

        </div>

        {/* Decoration */}
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-green-300/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-lime-300/20 blur-3xl" />

      </div>

      {/* Events Section Heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Created Events
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage your community activities.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-lg border bg-card px-4 py-2">
          <FolderOpen className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium">
            Total Events:
          </span>
          <span className="font-bold text-green-600">
            {datas.length}
          </span>
        </div>

      </div>

      {/* Events / Empty State */}
      {datas.length === 0 ? (

        <Card className="border-dashed shadow-sm">
          <CardContent className="flex min-h-[350px] flex-col items-center justify-center px-6 py-12 text-center">

            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CalendarPlus className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>

            <h3 className="text-2xl font-bold">
              No Events Created Yet!
            </h3>

            <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
              You haven't created any events yet. Start making
              a positive difference in your community by organizing
              your first plantation, donation, cleanup, health,
              or education event.
            </p>

            <Button
              className="mt-6 bg-green-600 text-white hover:bg-green-700"
            >
              <Link href="/add-events">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Event
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

          </CardContent>
        </Card>

      ) : (

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {datas.map((data, index) => (
            <ManageEventCardPage
              key={index}
              eventData={data}
            />
          ))}
        </div>

      )}

    </div>
  );
};

export default ManageEventPage;