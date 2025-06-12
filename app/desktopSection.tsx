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
import ArticleCard from "@/components/articleCard";

export default function DesktopHeroSection() {
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [cleanType, setCleanType] = useState("");

  return (
    <>
      <div className="relative w-full md:h-[300px] lg:h-[816px] flex flex-col items-center justify-center">
        <img
          src="/illu1.png"
          className="w-full h-auto object-cover -mt-[150px] absolute inset-0 z-[-1]"
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
      <div className="flex flex-row items-center justify-center md:gap-10 lg:gap-25 lg:px-30 w-full px-6 mt-10 lg:mt-30">
        <h1 className="text-4xl xl:text-5xl text-start font-bold text-neutral-100">
          Why Choose <br /> Shield ?
        </h1>
        <p className="text-left font-light text-xl text-neutral-100 w-full lg:max-w-2xl">
          We understand your home is important to you. That&apos;s why we focus
          on the quality of the clean. Our cleaners aren&apos;t contract workers
          - they are full-time employees. They care as much as we do.
        </p>
      </div>
      <div className="flex w-full px-6 lg:px-30 mt-40 items-center justify-center">
        <img src="./content4.png" alt="" />
      </div>
      <div className="flex flex-col items-center justify-center w-full mt-30 py-25 bg-neutral-100 bg-[url('/bg1.png')] bg-cover">
        <h1 className="text-4xl xl:text-5xl text-white font-semibold">
          The Shield Report
        </h1>

        <div className="flex flex-col xl:flex-row items-stretch justify-center mt-10 w-full px-6 lg:px-30 gap-6">
          {/* CARD 1 */}
          <div className="flex-1 basis-1/3 flex">
            <div className="w-full h-full flex flex-col">
              <ArticleCard
                image="/img1.png"
                title="How to Efficiently Clean & Organize Living Areas :"
                description="November is here, and with it comes a fresh opportunity to tackle the clutter and dust that may have account for with a little sploo..."
                authorImage="./pp1.jpg"
                authorName="Budiono"
                date="June 9, 2025"
              />
            </div>
          </div>

          {/* CARD 2 */}
          <div className="flex-1 basis-1/3 flex">
            <div className="w-full h-full flex flex-col">
              <ArticleCard
                image="/img2.png"
                title="How to Create a Self-Cleaning Home From Scratch."
                description="Creating a home that practically cleans itself may sound like a dream, but with a little know-how and some for with a little sploo..."
                authorImage="./pp2.jpg"
                authorName="Freya"
                date="June 9, 2025"
              />
            </div>
          </div>

          {/* CARD 3 */}
          <div className="flex-1 basis-1/3 flex">
            <div className="w-full h-full flex flex-col">
              <ArticleCard
                image="/img3.png"
                title="10 Easy Ways to Turn Homekeeping, Happy!"
                description="Homekeeping can sometimes feel like a never-ending to-do list that zaps the joy right out of your day. But when the tides turn be..."
                authorImage="./pp3.jpg"
                authorName="Ella"
                date="June 9, 2025"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between w-full mt-30 p-25">
        <div className="flex flex-row justify-between w-full ">
          <div className="flex flex-row gap-[30px]">
            <img src="./medsos1.png" className="w-[8px] h-[18px]" alt="" />
            <img src="./medsos2.png" className="w-[18px] h-[15px]" alt="" />
            <img src="./medsos3.png" className="w-[17px] h-[17px]" alt="" />
            <img src="./medsos4.png" className="w-[18px] h-[17px]" alt="" />
          </div>
          <div className="flex flex-row gap-[30px] lg:gap-[100px]">
            <div className="flex flex-col gap-[10px]">
            <h1 className="mb-[15px] text-sm text-start font-bold text-neutral-100">
              COMPANY
            </h1>
            <p className="text-sm text-start font-light text-neutral-400">
              About Us
            </p>
            <p className="text-sm text-start font-light text-neutral-400">
              Career
            </p>
            <p className="text-sm text-start font-light text-neutral-400">
              Press
            </p>
            <p className="text-sm text-start font-light text-neutral-400">
              Blog
            </p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <h1 className="mb-[15px] text-sm text-start font-bold text-neutral-100">
              SERVICES
            </h1>
            <p className="text-sm text-start font-light text-neutral-400">
              Residential
            </p>
            <p className="text-sm text-start font-light text-neutral-400">
              Office Cleaning
            </p>
            <p className="text-sm text-start font-light text-neutral-400">
              Commercial Cleaning
            </p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <h1 className="mb-[15px] text-sm text-start font-bold text-neutral-100">
              SUPPORT
            </h1>
            <p className="text-sm text-start font-light text-neutral-400">
              Contact Us
            </p>
            <p className="text-sm text-start font-light text-neutral-400">
              FA&Q&apos;s
            </p>
          </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mt-10 gap-[20px]">
          <img src="./Logo2.png" className="w-fit h-[40px]" alt="" />
          <p className="text-sm text-neutral-200 font-light text-center mt-4">
            © Clean Co. All Rights Reserved . Terms of Service . Privacy Policy
          </p>
        </div>
      </div>
    </>
  );
}
