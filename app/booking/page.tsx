"use client";
import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setBookingData } from "@/lib/bookingSlice";
import { LuBedSingle } from "react-icons/lu";
import { LuShowerHead } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { LiaBroomSolid } from "react-icons/lia";
import { LuMapPin } from "react-icons/lu";

export default function Booking() {
  const dispatch = useDispatch();
  const { bedroom, bathroom, cleanType } = useSelector(
    (state: RootState) => state.booking
  );
  const router = useRouter();
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

  const bedroomPrice = (bedroom === "Studio" ? 1 : Number(bedroom)) * 20;
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
useEffect(()=>{
      dispatch(setBookingData({bedroom, bathroom, cleanType, subTotal:subTotal}));
},[bedroom, bathroom, cleanType, subTotal, dispatch])

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
                onClick={() =>
                  dispatch(
                    setBookingData({ bedroom: item, bathroom, cleanType, subTotal })
                  )
                }
                className={`bg-white border-2 font-semibol text-[16px]
                 ${
                   bedroom === item
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
                onClick={() =>
                  dispatch(
                    setBookingData({ bedroom, bathroom: item, cleanType, subTotal })
                  )
                }
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
                  onClick={() =>
                    dispatch(
                      setBookingData({ bedroom, bathroom, cleanType: item, subTotal })
                    )
                  }
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
      <footer className="fixed bottom-0 left-0 w-full z-10 md:hidden">
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

      <div className="hidden md:flex fixed top-0 left-0 w-full h-[70px] bg-white shadow-md z-10 items-center">
        <div className="w-[60px] h-full flex items-center justify-center border-r-2 border-grey-600">
          <FiX className="text-neutral-300 w-6 h-6" onClick={()=>{
            router.push("/");
          }}/>
        </div>
        <div className="flex flex-1 justify-between items-center mx-6">
          <div className="flex flex-row items-center">
            <LuBedSingle className="text-neutral-500" size={20} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                {bedroom}
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">
                BEDROOMS
              </h1>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <LuShowerHead className="text-neutral-500" size={25} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                {bathroom}
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">
                BATHROOMS
              </h1>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <LiaBroomSolid className="text-neutral-500" size={25} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                {cleanType}
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">
                CLEAN TYPE
              </h1>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <LuCalendar className="text-neutral-500" size={20} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                Schedule
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">
                DATE
              </h1>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <LuMapPin className="text-neutral-500" size={20} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                Address
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">
                LOCATION
              </h1>
            </div>
          </div>
        </div>
        <div className="h-full min-w-[120px] bg-neutral-200 flex flex-col items-center justify-center px-4">
            <span className="text-white font-bold text-lg">
              $ {subTotal}
            </span>
            <span className="text-grey-600 text-xs font-semibold">
              SUB TOTAL
            </span>
          </div>
      </div>
    </>
  );
}
