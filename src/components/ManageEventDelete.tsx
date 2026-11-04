
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "./ui/toast";
import { getTokenFromClient } from "@/app/lib/getTokenFromClient";
import { Event } from "@/app/lib/type";

export default function ManageEventDeletePage({ eventData }:{eventData:Event}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    const token = await getTokenFromClient();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upcoming-events/${eventData._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete event!");
      }

      toast.add({
        type: "success",
        description: "Event deleted successfully!",
      });

      router.refresh();

    } catch (error) {
      toast.add({
        type: "error",
        description:"Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger >
        <Button
          variant="destructive"
          className="flex-1 shadow-sm transition-all hover:shadow-md"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md overflow-hidden rounded-2xl border-0 p-0 shadow-2xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 py-6 text-white">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <AlertDialogHeader className="text-left">
            <AlertDialogTitle className="text-xl font-bold text-white">
              Delete This Event?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm leading-relaxed text-red-50">
              Are you sure you want to delete this event? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        {/* Event Information */}
        <div className="space-y-3 p-6">
          <div className="rounded-xl border border-red-100 bg-red-50/70 p-4 dark:border-red-900 dark:bg-red-950/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-500">
              Event to delete
            </p>

            <h3 className="mt-1 font-bold text-slate-800 dark:text-slate-100">
              {eventData.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {eventData.eventType} • {eventData.location}
            </p>
          </div>

          {/* Action Buttons */}
          <AlertDialogFooter className="flex-col-reverse gap-2 sm:flex-row">

            <AlertDialogCancel>
              <Button
                variant="outline"
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={loading}
              onClick={handleDelete}
              className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Yes, Delete
                </>
              )}
            </AlertDialogAction>

          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
