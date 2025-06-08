import "./globals.css";
import DesktopHeroSection from "./desktopSection";
import MobileSection from "./mobileSection";

export default function Home() {
  return (
    <>
     <div className="hidden md:block">
       <DesktopHeroSection />
     </div>
          <div className="md:hidden">
       <MobileSection />
     </div>
    </>
  );
}
