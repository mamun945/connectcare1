
import React from "react";
import Image from "next/image";
import { MapPin, ArrowUpRight, Images } from "lucide-react";

const GalarySectionPage = () => {
  const galleryData = [
    {
      title: "Winter Clothes Donation",
      category: "DONATION",
      location: "Dhaka, Bangladesh",
      image:
        "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=900",
    },
    {
      title: "Plant a Tree, Save Earth",
      category: "TREE PLANTATION",
      location: "Rajshahi, Bangladesh",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900",
    },
    {
      title: "Free Health Checkup",
      category: "HEALTH CAMPAIGN",
      location: "Chattogram, Bangladesh",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900",
    },
    {
      title: "Education for Everyone",
      category: "EDUCATION",
      location: "Mymensingh, Bangladesh",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900",
    },
    {
      title: "Community Food Distribution",
      category: "SOCIAL SERVICE",
      location: "Sylhet, Bangladesh",
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900",
    },
    {
      title: "Clean Environment Campaign",
      category: "COMMUNITY CLEANUP",
      location: "Khulna, Bangladesh",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 md:py-20">
      {/* Heading */}
      <div className="mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold tracking-wider text-green-700 dark:bg-green-950 dark:text-green-400">
          <Images size={15} />
          OUR STORIES
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl dark:text-white">
          Community in Action
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
          Explore the moments that bring people together. Every volunteer,
          every event, and every small action creates a meaningful impact.
        </p>
      </div>

      {/* Gallery Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {galleryData.map((item) => (
          <div
            key={item.title}
            className="group relative h-64 overflow-hidden rounded-xl bg-gray-200 shadow-sm"
          >
            {/* Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <span className="inline-block rounded-sm bg-green-600 px-2.5 py-1 text-[9px] font-bold tracking-wider">
                {item.category}
              </span>

              <div className="mt-2 flex items-end justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-1 flex items-center gap-1 text-xs text-gray-300">
                    <MapPin size={13} />
                    {item.location}
                  </p>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 transition group-hover:border-green-600 group-hover:bg-green-600">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GalarySectionPage;
