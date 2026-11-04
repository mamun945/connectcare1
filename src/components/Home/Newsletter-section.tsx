
"use client";

import React from "react";
import {
  Mail,
  Send,
  Bell,
  ShieldCheck,
  Heart,
  Leaf,
  Sprout,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewsLetterSection = () => {

  return (
    <section className="container mx-auto px-4 py-16">
      <Card className="relative overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-100 shadow-sm dark:border-green-900 dark:from-gray-950 dark:via-gray-900 dark:to-green-950">
        <CardContent className="relative grid items-center gap-10 p-6 md:p-10 lg:grid-cols-5 lg:p-12">

          {/* Background Decoration */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-200/30 blur-3xl dark:bg-green-500/10" />
          <div className="absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />

          {/* Left Illustration */}
          <div className="relative flex items-center justify-center lg:col-span-2">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-green-100/70 dark:bg-green-900/30 md:h-80 md:w-80">

              {/* Envelope */}
              <div className="relative flex h-40 w-48 items-center justify-center rounded-2xl border border-green-200 bg-white shadow-xl dark:border-green-800 dark:bg-gray-800 md:h-48 md:w-56">
                <div className="absolute inset-x-0 top-0 h-20 rounded-t-2xl bg-gradient-to-br from-green-400 to-emerald-600 [clip-path:polygon(0_0,100%_0,50%_100%)] md:h-24" />

                <div className="relative z-10 flex h-20 w-24 flex-col items-center justify-center rounded-lg bg-white shadow-md dark:bg-gray-700">
                  <Sprout size={36} className="text-green-600" />
                  <Heart size={17} className="mt-1 fill-rose-500 text-rose-500" />
                </div>

                <div className="absolute -bottom-2 h-20 w-full rounded-b-2xl bg-gradient-to-br from-green-500 to-green-700 [clip-path:polygon(0_0,50%_65%,100%_0,100%_100%,0_100%)]" />
              </div>

              {/* Notification */}
              <div className="absolute right-2 top-8 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-green-500 text-white shadow-lg dark:border-gray-800">
                <Bell size={25} />
              </div>

              {/* Floating Leaves */}
              <Leaf className="absolute left-2 top-12 -rotate-45 text-green-500" size={35} />
              <Leaf className="absolute bottom-8 right-3 rotate-45 text-green-600" size={40} />

              <div className="absolute bottom-3 left-3 rounded-xl border border-green-100 bg-white px-4 py-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <p className="text-xs font-bold text-green-700 dark:text-green-400">
                  Stay Connected!
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative text-center lg:col-span-3 lg:text-left">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
              <Mail size={17} />
              STAY CONNECTED
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
              Subscribe to Our
              <span className="block text-green-600 dark:text-green-400">
                Newsletter
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 md:text-base dark:text-gray-400 lg:mx-0">
              Get the latest events, community updates, donation campaigns,
              and social initiatives directly in your inbox.
            </p>

            {/* Subscribe Form */}
            <form
              className="mt-8 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm sm:flex-row dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="relative flex-1">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="h-12 border-0 pl-12 text-sm shadow-none focus-visible:ring-0"
                />
              </div>

              <Button
                type="submit"
                className="h-12 gap-2 rounded-xl bg-green-600 px-7 font-semibold text-white hover:bg-green-700"
              >
                <Send size={17} />
                Subscribe
              </Button>
            </form>

            {/* Privacy Message */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500 sm:text-sm dark:text-gray-400 lg:justify-start">
              <ShieldCheck size={18} className="shrink-0 text-green-600" />
              We respect your privacy. Unsubscribe at any time.
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default NewsLetterSection;
