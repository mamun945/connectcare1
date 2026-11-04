
"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "./ui/toast";
import { authClient } from "@/app/lib/auth-client";
import { getTokenFromClient } from "@/app/lib/getTokenFromClient";
import { Event } from "@/app/lib/type";

const JoinEventForm = ({ joineventInfo }:{joineventInfo:Event}) => {
  const { data: session, isPending } = authClient.useSession();
  const user = (session as {
    user?: { id: string; name?: string | null; email?: string | null };
  } | null)?.user;

  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  // Event creator check
  const isCreator =
    joineventInfo?.email &&
    user?.email === joineventInfo.email;

  // Check already joined
  useEffect(() => {
    if (!user?.id || !joineventInfo?._id) return;

    const checkJoined = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/joinevent/check/${joineventInfo._id}/${user.id}`
        );

        if (res.ok) {
          const result = await res.json();
          setJoined(result.joined);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkJoined();
  }, [user?.id, joineventInfo?._id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await getTokenFromClient();

    if (!user) {
      return toast.add({
        type: "error",
        description: "Please login to join this event!",
      });
    }

    if (isCreator) return;
    if (joined || loading) return;

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joinevent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId:joineventInfo?._id,
          title:joineventInfo?.title,
          description:joineventInfo?.description,
          eventType:joineventInfo?.eventType,
          location:joineventInfo?.location,
          thumbnail:joineventInfo?.thumbnail,
          eventDate:joineventInfo?.eventDate,
          joinDate:new Date(),
          userName: user?.name,
          userEmail: user?.email,
          userId:user?.id
        }),
      });

      const result = await res.json();

      if (res.status === 409) {
        setJoined(true);

        return toast.add({
          type: "error",
          description: "You have already joined this event!",
        });
      }

      if (!res.ok) {
        throw new Error(result.message || "Failed to join event");
      }

      setJoined(true);

      toast.add({
        type: "success",
        description: "You have joined this event!",
      });

    } catch (error) {
      toast.add({
        type: "error",
        description: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        disabled={isPending || loading || joined || isCreator}
        className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-60"
      >
        {isPending
          ? "Loading..."
          : isCreator
          ? "You Have Created This Event"
          : joined
          ? "Already Joined ✓"
          : loading
          ? "Joining..."
          : "Join Event"}
      </Button>
    </form>
  );
};

export default JoinEventForm;
