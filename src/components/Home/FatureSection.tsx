
import {
  CalendarPlus,
  Users,
  HeartHandshake,
  TreePine,
  HeartPulse,
  BookOpen,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const FatureSectionPage = () => {
  const features = [
    {
      title: "Create Community Events",
      description:
        "Create and organize meaningful events to bring people together and make a positive difference in society.",
      icon: CalendarPlus,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Join Upcoming Events",
      description:
        "Discover interesting community events and participate with others who share your passion for social change.",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Donation Campaigns",
      description:
        "Support people in need by participating in donation campaigns and helping underprivileged communities.",
      icon: HeartHandshake,
      color: "bg-rose-100 text-rose-600",
    },
    {
      title: "Tree Plantation",
      description:
        "Take part in tree plantation programs and contribute to building a greener and healthier environment.",
      icon: TreePine,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Health Awareness",
      description:
        "Join health campaigns, spread awareness, and help communities build healthier lifestyles.",
      icon: HeartPulse,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Education Support",
      description:
        "Help spread knowledge and create educational opportunities for children and people in need.",
      icon: BookOpen,
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
            <Sparkles size={16} />
            What We Offer
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Everything You Need to
            <span className="text-green-600 dark:text-green-400">
              {" "}Make an Impact
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-400">
            Discover simple ways to get involved, connect with your community,
            and contribute to meaningful social development initiatives.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl hover:shadow-green-900/5 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-green-800"
              >
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-4 ${feature.color}`}>
                    <Icon size={28} strokeWidth={1.8} />
                  </div>

                  <span className="text-sm font-bold text-gray-300 dark:text-gray-700">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold text-gray-900 transition-colors group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
                  Make a Difference
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FatureSectionPage;
