import "./globals.css";
import DesktopHeroSection from "./desktopSection";
import MobileSection from "./mobileSection";
import Header from "@/components/ui/header";


export default function Home() {
  return (
    <>

     <Header/>
     <div className="hidden md:block">
       <DesktopHeroSection />
     </div>
          <div className="md:hidden">
       <MobileSection />
     </div>
    </>
  );
}
