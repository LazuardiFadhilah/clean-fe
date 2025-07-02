"use client";
import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function Booking() {
  const router = useRouter();
  const [bedrooms, setBedrooms] = useState("Studio");
  const [bathroom, setBathroom] = useState("1");
  const [cleanType, setCleanType] = useState("Standard");
  const options = ["Studio", "1", "2", "3", "4", "5"];
  const optBathroom = ["1", "2", "3", "4", "5"];

  type CleanType =
    | "Standard"
    | "Deep Clean"
    | "Moving In/Out"
    | "Post Construction";

  const optCleanType: CleanType[] = [
    "Standard",
    "Deep Clean",
    "Moving In/Out",
    "Post Construction",
  ];

  const durationClean: Record<CleanType, string> = {
    Standard: "2 hours",
    "Deep Clean": "2.5 hours",
    "Moving In/Out": "4.5–5 hours",
    "Post Construction": "4.5–5 hours",
  };

  const bedroomPrice = (bedrooms === "Studio" ? 1 : Number(bedrooms)) * 20;
  const bathroomPrice = Number(bathroom) * 10;
  let cleanTypePrice = 0;
  if (cleanType === "Standard") {
    cleanTypePrice = 50;
  }
  if (cleanType === "Deep Clean") {
    cleanTypePrice = 70;
  }
  if (cleanType === "Moving In/Out") {
    cleanTypePrice = 90;
  }
  if (cleanType === "Post Construction") {
    cleanTypePrice = 100;
  }
  const subTotal = bedroomPrice + bathroomPrice + cleanTypePrice;
  return (
    <>
      <div className="flex flex-col mx-[25px] mt-10 md:hidden">
        <div className="flex justify-end">
          <FiX
            className="text-neutral-100"
            size={20}
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <span className="text-neutral-100 text-[25px] font-bold text-left mt-[37px]">
          Costumize your Requirements
        </span>
        <div className="flex flex-col mt-[26px]">
          <span className="text-neutral-500 font-semibold text-[12px] text-left">
            NUMBER OF BEDROOMS
          </span>
          <div className="flex flex-row flex-wrap gap-2 mt-[13px]">
            {options.map((item) => (
              <Button
                key={item}
                onClick={() => setBedrooms(item)}
                className={`bg-white border-2 font-semibol text-[16px]
                 ${
                   bedrooms === item
                     ? "border-primary text-primary"
                     : "border-grey-800 text-neutral-300"
                 }`}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-[26px]">
          <span className="text-neutral-500 font-semibold text-[12px] text-left">
            NUMBER OF BATHROOMS
          </span>
          <div className="flex flex-row flex-wrap gap-2 mt-[13px]">
            {optBathroom.map((item) => (
              <Button
                key={item}
                onClick={() => setBathroom(item)}
                className={`bg-white border-2 font-semibol text-[16px]
                 ${
                   bathroom === item
                     ? "border-primary text-primary"
                     : "border-grey-800 text-neutral-300"
                 }`}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-[26px]">
          <span className="text-neutral-500 font-semibold text-[12px] text-left">
            CLEAN TYPE
          </span>
          <div className="flex flex-row flex-wrap gap-2 mt-[13px]">
            {optCleanType.map((item) => (
              <div className="flex flex-col" key={item}>
                <Button
                  onClick={() => setCleanType(item)}
                  className={`bg-white border-2 font-semibol text-[16px]
                 ${
                   cleanType === item
                     ? "border-primary text-primary"
                     : "border-grey-800 text-neutral-300"
                 }`}
                >
                  {item}
                </Button>
                <span className="mt-[8px] text-neutral-500 font-light text-[12px]">
                  {durationClean[item]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 w-full z-10">
        <div className="flex flex-row">
          <div className="flex flex-col w-[60%] bg-neutral-200 py-[8px] px-[20px]">
            <span className="text-grey-700 font-semibold text-[14px]">
              SUB TOTAL
            </span>
            <span className="text-white font-bold text-[25px]">
              $ {subTotal}
            </span>
          </div>
          <div className="bg-primary text-white font-semibold text-[18px] w-full items-center justify-center flex">
            NEXT
          </div>
        </div>
      </footer>
    </>
  );
}
