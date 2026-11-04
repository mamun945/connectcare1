
import Link from "next/link";
import {
  ArrowUpRight,
  HeartHandshake,
  Heart,
  TreePine,
  HeartPulse,
  BookOpen,
  Users,
} from "lucide-react";

const HeroSectionPage = () => {
  const categories = [
    { name: "Donation", icon: Heart },
    { name: "Tree Plantation", icon: TreePine },
    { name: "Health Campaign", icon: HeartPulse },
    { name: "Education", icon: BookOpen },
  ];

  return (
    <section className="container mx-auto relative overflow-hidden rounded-2xl bg-[#102C22] px-6 py-16 text-white md:px-12 md:py-20 lg:px-16">
      {/* Background Decoration */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative grid items-center gap-12 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm font-medium text-green-300">
            <HeartHandshake size={18} />
            Building a Better Community
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Together We Can
            <span className="mt-2 block text-[#A3E635]">
              Change Lives.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-300 md:text-lg">
            Make a difference through meaningful community events. Join hands
            to support those in need, plant trees, promote health awareness,
            and create educational opportunities for everyone.
          </p>

          {/* Action Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/upcoming-events"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#A3E635] px-7 py-4 font-semibold text-[#102C22] transition hover:bg-[#b8f45b]"
            >
              Explore Upcoming Events
              <ArrowUpRight size={20} />
            </Link>

            <Link
              href="/create-event"
              className="inline-flex items-center justify-center gap-3 rounded-lg border border-white/30 px-7 py-4 font-semibold text-white transition hover:border-[#A3E635] hover:bg-white/10"
            >
              <Users size={19} />
              Create Event
            </Link>
          </div>

          {/* Community Info */}
          <div className="mt-10 flex items-center gap-3 border-t border-white/15 pt-6">
            <div className="flex -space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#102C22] bg-green-500">
                <Heart size={16} />
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#102C22] bg-emerald-600">
                <TreePine size={16} />
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#102C22] bg-lime-600">
                <Users size={16} />
              </div>
            </div>

            <p className="text-sm text-gray-300">
              Be part of a community that cares.
            </p>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#244D37] to-[#183829] p-6 shadow-2xl md:p-9">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10" />

            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A3E635]">
                Make an Impact
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-snug md:text-4xl">
                Every Action
                <span className="block text-[#A3E635]">
                  Matters.
                </span>
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-7 text-gray-300">
                Discover ways to contribute to a healthier, greener and more
                educated society.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {categories.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="flex min-h-28 flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-[#A3E635]/50 hover:bg-white/10"
                  >
                    <Icon className="text-[#A3E635]" size={27} />
                    <span className="mt-4 text-sm font-semibold text-white">
                      {name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl bg-[#A3E635] px-5 py-4 text-[#102C22]">
                <div>
                  <p className="text-lg font-bold">Be the Change!</p>
                  <p className="text-xs font-medium opacity-80">
                    Join. Participate. Inspire.
                  </p>
                </div>
                <HeartHandshake size={34} />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-3 -z-0 h-full w-full rounded-2xl border border-green-400/20" />
        </div>
      </div>
    </section>
  );
};

export default HeroSectionPage;
