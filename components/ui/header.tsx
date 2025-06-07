import { Button } from "@/components/ui/button";
import { FiAlignJustify } from "react-icons/fi";

export default function Header() {
  return (
    <header className="container px-6 mt-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <img src="Logo.png" className="w-[80px]" />
        </div>
        <div className="flex items-center gap-5">
          <Button
            variant="outline"
            className="border-2 bg-white text-primary hover:text-primaryLight"
          >
            Login
          </Button>
            <FiAlignJustify size={30} />
        </div>
      </div>
    </header>
  );
}
