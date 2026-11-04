import FatureSectionPage from "@/components/Home/FatureSection";
import FooterSectionPage from "@/components/Home/FooterSection";
import GalarySectionPage from "@/components/Home/GalarySection";
import HeroSectionPage from "@/components/Home/Hero";
import NewsLetterSection from "@/components/Home/Newsletter-section";
import RecentUpcomingEventPage from "@/components/Home/RecentUpcomingEventPage";
import Image from "next/image";

export default function Home() {
  return (
   <div>
     <HeroSectionPage></HeroSectionPage>
     <FatureSectionPage></FatureSectionPage>
     <RecentUpcomingEventPage></RecentUpcomingEventPage>
     <GalarySectionPage></GalarySectionPage>
     <NewsLetterSection></NewsLetterSection>
     <FooterSectionPage></FooterSectionPage>
   </div>
  );
}
