
"use client";

import { useState, type FormEvent } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pencil,
  Send,
  CalendarDays,
  MapPin,
  ImagePlus,
  Type,
  AlignLeft,
  Leaf,
} from "lucide-react";
import { toast } from "./ui/toast";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/app/lib/getTokenFromClient";
import { Event } from "@/app/lib/type";


const ManageEventEditPage = ({ eventData }:{eventData:Event}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(eventData.thumbnail || "");
  const [eventType, setEventType] = useState(eventData.eventType);
  const router = useRouter();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setMinutes(
    tomorrow.getMinutes() - tomorrow.getTimezoneOffset()
  );

  const minDate = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await getTokenFromClient();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const updateData = {
      ...Object.fromEntries(formData.entries()),
      eventType,
      thumbnail: imageUrl,
    };


    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upcoming-events/${eventData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      const data = await res.json();


      if (!res.ok) {
        throw new Error(data.message || "Event update failed!");
      }
      if(res.ok){
        toast.add({
            type: "success",
            description: "Event updated successfully!",
          })
        router.refresh();
      }
      form.reset();
    } catch (error) {
        toast.add({
            type: "error",
           description: error.message || "Something went wrong!",
          })
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:border-emerald-900 dark:text-emerald-400 dark:hover:bg-emerald-950">
        <Pencil className="mr-2 h-4 w-4" />
        Edit
      </AlertDialogTrigger>

      <AlertDialogContent className="max-h-[90vh] w-full overflow-y-auto border-0 bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/60 p-0 shadow-2xl dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-900 sm:max-w-xl">

        {/* Colorful Header */}
        <div className="rounded-t-lg bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 px-6 py-6 text-white">
          <AlertDialogHeader>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 shadow-inner backdrop-blur-sm">
              <Leaf className="h-7 w-7" />
            </div>

            <AlertDialogTitle className="text-2xl font-bold text-white">
              Edit Your Event
            </AlertDialogTitle>

            <p className="mt-1 text-sm text-emerald-50">
              Make changes to your community event information.
            </p>
          </AlertDialogHeader>
        </div>

        <Card className="w-full border-0 bg-transparent shadow-none">
          <CardHeader className="px-6 pb-2 pt-5">
            <CardTitle className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
              Event Information
            </CardTitle>

            <CardDescription>
              Update your details and keep your community informed.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Event Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="font-semibold">
                  Event Title
                </Label>

                <div className="relative">
                  <Type className="absolute left-3 top-3 h-4 w-4 text-emerald-600" />

                  <Input
                    id="title"
                    name="title"
                    defaultValue={eventData.title}
                    placeholder="Enter event title"
                    className="h-11 border-emerald-200 bg-white pl-10 transition-all focus-visible:ring-emerald-500 dark:bg-slate-900"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="font-semibold">
                  Event Description
                </Label>

                <div className="relative">
                  <AlignLeft className="absolute left-3 top-3 h-4 w-4 text-emerald-600" />

                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={eventData.description}
                    placeholder="Describe your event..."
                    className="min-h-32 resize-none border-emerald-200 bg-white pl-10 pt-3 focus-visible:ring-emerald-500 dark:bg-slate-900"
                    required
                  />
                </div>
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <Label className="font-semibold">
                  Event Type
                </Label>

                <Select
                  value={eventType}
                  onValueChange={setEventType}
                >
                  <SelectTrigger className="h-11 w-full border-emerald-200 bg-white focus:ring-emerald-500 dark:bg-slate-900">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Cleanup">🧹 Cleanup</SelectItem>
                    <SelectItem value="Plantation">🌱 Plantation</SelectItem>
                    <SelectItem value="Donation">💝 Donation</SelectItem>
                    <SelectItem value="Education">📚 Education</SelectItem>
                    <SelectItem value="Health">❤️ Health</SelectItem>
                    <SelectItem value="Fundraising">💰 Fundraising</SelectItem>
                    <SelectItem value="Other">✨ Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Thumbnail */}
              <div className="space-y-2">
                <Label htmlFor="thumbnail" className="font-semibold">
                  Thumbnail Image URL
                </Label>

                <div className="relative">
                  <ImagePlus className="absolute left-3 top-3 h-4 w-4 text-emerald-600" />

                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="h-11 border-emerald-200 bg-white pl-10 focus-visible:ring-emerald-500 dark:bg-slate-900"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="font-semibold">
                  Event Location
                </Label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-emerald-600" />

                  <Input
                    id="location"
                    name="location"
                    defaultValue={eventData.location}
                    placeholder="Enter event location"
                    className="h-11 border-emerald-200 bg-white pl-10 focus-visible:ring-emerald-500 dark:bg-slate-900"
                    required
                  />
                </div>
              </div>

              {/* Event Date */}
              <div className="space-y-2">
                <Label htmlFor="eventDate" className="font-semibold">
                  Event Date
                </Label>

                <div className="relative">
                  <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-emerald-600" />

                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    defaultValue={eventData.eventDate}
                    min={minDate}
                    className="h-11 border-emerald-200 bg-white pl-10 focus-visible:ring-emerald-500 dark:bg-slate-900"
                    required
                  />
                </div>

                <p className="flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400">
                  <Leaf className="h-3.5 w-3.5" />
                  Only future dates are allowed.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-emerald-100 pt-5 sm:flex-row dark:border-emerald-900">
                <AlertDialogCancel
                  className="flex-1 border-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </AlertDialogCancel>

                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 font-semibold text-white shadow-md transition-all hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg"
                >
                  {loading ? (
                    "Updating..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Update Event
                    </>
                  )}
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ManageEventEditPage;
