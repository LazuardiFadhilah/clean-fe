"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DesktopHeroSection() {
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [cleanType, setCleanType] = useState("");

  return (
    <div className="relative w-full md:h-[300px] lg:h-[816px] flex flex-col items-center justify-center">
      <img
        src="/illu1.png"
        className="w-full h-auto object-cover -mt-[100px] absolute inset-0 z-[-1]"
        alt="Hero Image"
      />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl lg:text-5xl xl:text-6xl text-center font-bold">
          Your One Stop Cleaning <br /> Center For All Needs
        </h1>

        <div className="flex flex-row gap-0 mt-10 w-full items-center justify-center">
          {/* BEDROOM */}
          <div>
            <Select value={bedroom} onValueChange={setBedroom}>
              <SelectTrigger className="!h-[50px] rounded-l-xl rounded-r-none w-[180px] border-grey-900 hover:border-primary outline-0 border-2">
                <span
                  className={`font-semibold flex items-center gap-2 ${
                    bedroom ? "text-neutral-500" : "text-neutral-500 italic"
                  }`}
                >
                  {bedroom || "Bedroom"}
                </span>
              </SelectTrigger>
              <SelectContent className="border-white">
                <SelectItem
                  value="1"
                  className="text-neutral-500 font-semibold hover:bg-grey-900 hover:text-primary transition-colors"
                >
                  1
                </SelectItem>
                <SelectItem
                  value="2"
                  className="text-neutral-500 font-semibold hover:bg-grey-900 hover:text-primary transition-colors"
                >
                  2
                </SelectItem>
                <SelectItem
                  value="3"
                  className="text-neutral-500 font-semibold hover:bg-grey-900 hover:text-primary transition-colors"
                >
                  3
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* BATHROOM */}
          <div>
            <Select value={bathroom} onValueChange={setBathroom}>
              <SelectTrigger className="!h-[50px] px-2 w-[180px] rounded-none border-grey-900 hover:border-primary hover:border-l-2 outline-0 border-2 border-l-0">
                <span
                  className={`font-semibold flex items-center gap-2 ${
                    bathroom ? "text-neutral-500" : "text-neutral-500 italic"
                  }`}
                >
                  {bathroom || "Bathroom"}
                </span>
              </SelectTrigger>
              <SelectContent className="border-white">
                <SelectItem
                  value="1"
                  className="text-neutral-500 font-semibold hover:bg-grey-900 hover:text-primary transition-colors"
                >
                  1
                </SelectItem>
                <SelectItem
                  value="2"
                  className="text-neutral-500 font-semibold hover:bg-grey-900 hover:text-primary transition-colors"
                >
                  2
                </SelectItem>
                <SelectItem
                  value="3"
                  className="text-neutral-500 font-semibold hover:bg-grey-900 hover:text-primary transition-colors"
                >
                  3
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* CLEAN TYPE */}
          <div>
            <Select value={cleanType} onValueChange={setCleanType}>
              <SelectTrigger className="!h-[50px] w-[180px] rounded-none border-grey-900 hover:border-primary hover:border-l-2 outline-0 border-2 border-l-0">
                <span
                  className={`font-semibold flex items-center gap-2 ${
                    cleanType ? "text-neutral-500" : "text-neutral-500 italic"
                  }`}
                >
                  {cleanType || "Clean Type"}
                </span>
              </SelectTrigger>
              <SelectContent className="border-white">
                <SelectItem
                  value="standard"
                  className="text-neutral-500 font-semibold hover:bg-grey-900 hover:text-primary transition-colors"
                >
                  Standard
                </SelectItem>
                <SelectItem
                  value="deep"
                  className="text-neutral-500 font-semibold hover:bg-grey-900 hover:text-primary transition-colors"
                >
                  Deep
                </SelectItem>
                <SelectItem
                  value="moving"
                  className="text-neutral-500 font-semibold hover:bg-grey-900 hover:text-primary transition-colors"
                >
                  Moving
                </SelectItem>
                <SelectItem
                  value="post-construction"
                  className="text-neutral-500 font-semibold hover:bg-grey-900 hover:text-primary transition-colors"
                >
                  Post-Construction
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="!h-[50px] text-white bg-primary border-2 border-primary hover:border-primary rounded-xl -ml-2">
            Booking from $80
          </Button>
        </div>
      </div>
    </div>
  );
}
