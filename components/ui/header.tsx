import { Button } from "@/components/ui/button";
import { FiAlignJustify } from "react-icons/fi";

export default function Header() {
  return (
    <header className="mx-6 lg:mx-32 mt-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src="Logo.png" className="h-10 w-auto object-contain" />
        </div>

        {/* Navigation + Actions */}
        <div className="flex items-center gap-5">
          {/* Menu - hidden on mobile */}
          <div className="hidden sm:flex gap-5 items-center">
            <span className="lg:text-lg text-sm">Residential</span>
            <span className="lg:text-lg text-sm">Office</span>
            <span className="lg:text-lg text-sm">Commercial</span>
            <span className="lg:text-lg text-sm">FAQ's</span>
          </div>

          {/* Login Button */}
          <Button
            variant="outline"
            className="border-2 bg-white text-primary hover:text-primaryLight h-10"
          >
            Login
          </Button>

          {/* Mobile Menu Icon */}
          <FiAlignJustify size={30} className="sm:hidden" />
        </div>
      </div>
    </header>
  );
}