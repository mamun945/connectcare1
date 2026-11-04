
"use client";

import { useState, type FormEvent } from "react";
import {
  CalendarDays,
  MapPin,
  ImagePlus,
  Leaf,
  HeartHandshake,
  Send,
  Type,
  AlignLeft,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "@/components/ui/toast";
import {useRouter } from "next/navigation";
import { getTokenFromClient } from "@/app/lib/getTokenFromClient";


// Get today's local date
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const AddEventsPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const {data:session} = authClient.useSession()
  const router = useRouter();
  const user = (session as { user?: Record<string, unknown> } | null)?.user;
  const today = getTodayDate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   const token = await getTokenFromClient();
    console.log(token, 'from add event data')
    const form = e.target as HTMLFormElement;
  
    const formData = new FormData(form);
    const datas = Object.fromEntries(formData.entries());
    
    // Future date validation
    if (datas.eventDate <= today) {
      return toast.add({
            type: "error",
            description: "Please select a future date!",
          })
    }

    const userData = {
      ...user,
      ...datas
    }
    console.log(userData, 'add event section');

    try {
      setLoading(true);
      setSuccess(false);

      // Event data ready for API
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-events`,{
          method: 'POST',
          headers:{
            "Content-Type":"application/json",
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify(userData)
      })

      const result = await res.json()
      
      if(!result){
         toast.add({
            type: "error",
            description: "something went wrong!",
          })
        return;
      }

      if(result){
         toast.add({
            type: "error",
            description: "event created successfuly!",
          })
        router.push('/upcomingevents')
      }

      // Connect your backend API here

      setSuccess(true);
      form.reset();
      setImageUrl("");

    } catch (error) {
      console.error("Event creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-3xl">

        {/* Page Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
            <HeartHandshake className="h-8 w-8 text-emerald-600" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create an Event
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Bring people together and make a positive difference in your community.
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-xl shadow-slate-200/60">

          <CardHeader className="border-b border-slate-100 px-6 py-5 sm:px-8">
            <CardTitle className="text-xl font-bold text-slate-800">
              Event Information
            </CardTitle>

            <CardDescription>
              Fill in the details below to publish your upcoming event.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Event Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="font-semibold">
                  Event Title
                </Label>

                <div className="relative">
                  <Type className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter your event title"
                    className="h-11 pl-10"
                    required
                    maxLength={100}
                  />
                </div>
              </div>

              {/* Event Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="font-semibold">
                  Event Description
                </Label>

                <div className="relative">
                  <AlignLeft className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your event, its purpose and activities..."
                    className="min-h-32 resize-none pl-10 pt-3"
                    required
                    maxLength={2000}
                  />
                </div>
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <Label htmlFor="eventType" className="font-semibold">
                  Event Type
                </Label>

                <select
                  id="eventType"
                  name="eventType"
                  required
                  defaultValue=""
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="" disabled>
                    Select event type
                  </option>
                  <option value="Cleanup">Community Cleanup</option>
                  <option value="Plantation">Tree Plantation</option>
                  <option value="Donation">Donation Campaign</option>
                  <option value="Education">Education & Awareness</option>
                  <option value="Health">Health Campaign</option>
                  <option value="Fundraising">Fundraising</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Thumbnail Image URL */}
              <div className="space-y-2">
                <Label htmlFor="thumbnail" className="font-semibold">
                  Thumbnail Image URL
                </Label>

                <div className="relative">
                  <ImagePlus className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="h-11 pl-10"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>

                {/* Image Preview */}
                {imageUrl && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                    <img
                      src={imageUrl}
                      alt="Event thumbnail preview"
                      className="h-48 w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      onLoad={(e) => {
                        e.currentTarget.style.display = "block";
                      }}
                    />
                  </div>
                )}

                <p className="text-xs text-slate-400">
                  Provide a valid image URL for your event thumbnail.
                </p>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="font-semibold">
                  Event Location
                </Label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                  <Input
                    id="location"
                    name="location"
                    placeholder="Enter event location"
                    className="h-11 pl-10"
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
                  <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    min={today}
                    className="h-11 pl-10"
                    required
                  />
                </div>

                <p className="text-xs text-emerald-600">
                  <Leaf className="mr-1 inline h-3.5 w-3.5" />
                  Only future dates are allowed.
                </p>
              </div>

              {/* Success Message */}
              {success && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
                  <CheckCircle2 size={18} />
                  Event information is ready!
                </div>
              )}

              {/* Publish Button */}
            <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full bg-emerald-600 text-base font-bold text-white shadow-md shadow-emerald-100 transition hover:bg-emerald-700"
              >
                {loading ? (
                  "Publishing Event..."
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Publish Event
                  </>
                )}
              </Button>

            </form>

          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-slate-400">
          Together, we can make our community a better place.
        </p>

      </div>
    </div>
  );
};

export default AddEventsPage;
