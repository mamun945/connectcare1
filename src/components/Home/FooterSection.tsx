
import Link from "next/link";
import {
  HeartHandshake,
  Globe,
  Camera,
  Briefcase,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Heart,
} from "lucide-react";

const FooterSectionPage = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Upcoming Events", href: "/upcoming-events" },
    { name: "Create Event", href: "/create-event" },
    { name: "About Us", href: "/about" },
  ];

  const eventCategories = [
    "Donation Campaign",
    "Tree Plantation",
    "Health Campaign",
    "Education Support",
    "Community Service",
  ];

  return (
    <footer className="bg-[#102C22] text-white">
      <div className="container mx-auto px-5">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A3E635] text-[#102C22]">
                <HeartHandshake size={27} />
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                Social<span className="text-[#A3E635]">Connect</span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-7 text-gray-300">
              Connecting people through meaningful events. Together, we can
              support communities, protect nature, and build a better future
              for everyone.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {[
                { icon: Globe, href: "https://facebook.com" },
                { icon: Camera, href: "https://instagram.com" },
                { icon: Briefcase, href: "https://linkedin.com" },
              ].map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Social media"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-gray-300 transition hover:border-[#A3E635] hover:bg-[#A3E635] hover:text-[#102C22]"
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Quick Links</h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-gray-300 transition hover:text-[#A3E635]"
                  >
                    <ArrowUpRight
                      size={15}
                      className="text-[#A3E635] opacity-0 transition group-hover:opacity-100"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Our Activities</h3>

            <ul className="space-y-4">
              {eventCategories.map((category) => (
                <li
                  key={category}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635]" />
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Get In Touch</h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin size={19} className="shrink-0 text-[#A3E635]" />
                <p>Bangladesh</p>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Mail size={19} className="shrink-0 text-[#A3E635]" />
                <a
                  href="mailto:info@socialconnect.com"
                  className="transition hover:text-[#A3E635]"
                >
                  info@socialconnect.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Phone size={19} className="shrink-0 text-[#A3E635]" />
                <a
                  href="tel:+8801234567890"
                  className="transition hover:text-[#A3E635]"
                >
                  +880 1234-567890
                </a>
              </div>
            </div>

            <Link
              href="/create-event"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#A3E635] px-5 py-3 text-sm font-bold text-[#102C22] transition hover:bg-[#b8f45b]"
            >
              Start an Event
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} SocialConnect. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-sm text-gray-400">
            Made with
            <Heart size={15} className="fill-rose-500 text-rose-500" />
            for a better community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSectionPage;
