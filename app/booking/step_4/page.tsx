// ================== Import Libraries & Components ==================
"use client";
import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setBookingData } from "@/lib/bookingSlice";
import { LuBedSingle } from "react-icons/lu";
import { LuShowerHead } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { LiaBroomSolid } from "react-icons/lia";
import { LuMapPin } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { booking, updateBooking } from "@/lib/api/booking";

import {
  MdKitchen,
  MdOutlineMicrowave,
  MdOutlineDoorSliding,
} from "react-icons/md";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// ================== Komponen Utama ==================
export default function Booking() {
  // ================== Setup State & Dispatch ==================
  const dispatch = useDispatch();
  const {
    bedroom,
    bathroom,
    cleanType,
    subTotal,
    date,
    frequency,
    address,
    entry_method,
    adds_ons,
    has_pets,
    pet_type,
    notes,
  } = useSelector((state: RootState) => state.booking);
  const router = useRouter();
  const optFrequencies = ["one-time", "weekly", "bi-weekly", "monthly"];
  const optEntryMethods = ["someone_home", "doorman", "hidden_key", "other"];
  const optAddOns = [
    { key: "inside_fridge", icon: <MdKitchen size={20} /> },
    { key: "inside_oven", icon: <MdOutlineMicrowave size={20} /> },
    { key: "inside_cabinets", icon: <MdOutlineDoorSliding size={20} /> },
  ];
  const optHasPets = [
    { key: "Yes", value: true },
    { key: "No", value: false },
  ];

  // ================== Handler Functions ==================
  const toggleAddOn = (addOn: string) => {
    const currentAddOns = Array.isArray(adds_ons)
      ? adds_ons
      : typeof adds_ons === "string"
      ? [adds_ons]
      : [];
    const updatedAddOns = currentAddOns.includes(addOn)
      ? currentAddOns.filter((item) => item !== addOn)
      : [...currentAddOns, addOn];

    dispatch(setBookingData({ adds_ons: updatedAddOns }));
  };

  const onSubmit = async () => {
    // Ambil data dari Redux store
    const bedroomValue = bedroom === "Studio" ? "1" : bedroom;
    // Pastikan add_ons sesuai model backend dan array string
    const bookingData = {
      bedroom: bedroomValue,
      bathroom,
      clean_type: cleanType,
      date,
      time: "09:00", // Jika belum ada di Redux, bisa pakai default atau ambil dari state time picker
      is_flexible: true, // Kalau belum ada input di UI, set default
      frequency,
      address,
      entry_method,
      add_ons: Array.isArray(adds_ons) ? adds_ons : [], // key dan format sesuai backend
      has_pets,
      pet_type,
      notes,
    };

    if (localStorage.getItem("BookingID") !== null) {
      try {
        console.log("Booking Data:", bookingData);
        // Kirim ke API booking
        const res = await updateBooking(bookingData);
        console.log("Booking successful:", res);
        router.push("/booking/step_5");
      } catch (error) {
        console.error("Booking failed:", error);
      }
    } else {
      try {
        console.log("Booking Data:", bookingData);
        // Kirim ke API booking
        const res = await booking(bookingData);
        console.log("Booking successful:", res);
        router.push("/booking/step_5");
      } catch (error) {
        console.error("Booking failed:", error);
      }
    }
  };

  return (
    <>
      {/* ================== Mobile View ================== */}
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
          Select Frequency
        </span>
        <div className="flex flex-col my-[10px]">
          <span className="text-neutral-500 font-light text-[15px] text-left">
            Book for Shield&apos;s recurring plan and save 20% annually.
          </span>
        </div>

        {/* Komponen Calendar untuk memilih jam booking */}
        <div className="flex flex-col mt-[10px]">
          <h1 className="text-neutral-500 font-semibold text-[14px] mb-[10px]">
            RECURRING
          </h1>
          <div className="flex flex-row flex-wrap gap-2">
            {optFrequencies.map((Frq) => {
              const isSelected = frequency === Frq;
              return (
                <div
                  onClick={() => {
                    dispatch(setBookingData({ frequency: Frq }));
                  }}
                  key={Frq}
                  className={cn(
                    " py-[11px] px-[25px] border-[2px]  rounded-lg h-[50px] flex items-center justify-center cursor-pointer",
                    isSelected ? "border-primary" : "border-grey-800"
                  )}
                >
                  <h1
                    className={cn(
                      "font-semibold text-[14px]",
                      isSelected ? "text-primary" : "text-neutral-500"
                    )}
                  >
                    {Frq}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
        <span className="text-neutral-100 text-[25px] font-bold text-left mt-[37px]">
          Add Your Address & Details
        </span>
        <div className="flex flex-col my-[10px]">
          <span className="text-neutral-500 font-light text-[15px] text-left">
            Be specific of any additional details we might need from you.
          </span>
        </div>

        {/* Komponen Calendar untuk memilih jam booking */}
        <div className="flex flex-col mt-[10px]">
          <Label className="text-neutral-500 font-semibold text-[14px] mb-2">
            ADDRESS
          </Label>
          <Input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => {
              dispatch(setBookingData({ address: e.target.value }));
            }}
            className="placeholder:font-semibold placeholder:text-[14px] w-full h-fit mb-4 border-2 border-grey-800 py-[9px]"
          />
          <Label className="text-neutral-500 font-semibold text-[14px] mb-2">
            HOW DO WE GET IN?
          </Label>
          <div className="flex flex-row flex-wrap gap-2">
            {optEntryMethods.map((enter) => {
              const isSelected = entry_method === enter;
              return (
                <div
                  onClick={() => {
                    dispatch(setBookingData({ entry_method: enter }));
                  }}
                  key={enter}
                  className={cn(
                    " py-[11px] px-[25px] border-[2px]  rounded-lg h-[50px] flex items-center justify-center cursor-pointer",
                    isSelected ? "border-primary" : "border-grey-800"
                  )}
                >
                  <h1
                    className={cn(
                      "font-semibold text-[14px]",
                      isSelected ? "text-primary" : "text-neutral-500"
                    )}
                  >
                    {enter}
                  </h1>
                </div>
              );
            })}
          </div>
          <Label className="text-neutral-500 font-semibold text-[14px] mb-2 mt-4">
            ADD-ONS
          </Label>
          <div className="flex flex-row flex-wrap gap-2">
            {optAddOns.map((add) => {
              const isSelected =
                Array.isArray(adds_ons) && adds_ons.includes(add.key);
              return (
                <div
                  key={add.key}
                  onClick={() => toggleAddOn(add.key)}
                  className={cn(
                    "flex flex-row gap-2 items-center py-[11px] px-[20px] border-[2px] rounded-lg h-[50px] cursor-pointer",
                    isSelected
                      ? "border-primary text-primary"
                      : "border-grey-800 text-neutral-500"
                  )}
                >
                  {add.icon}
                  <span className="font-semibold text-[14px]">{add.key}</span>
                </div>
              );
            })}
          </div>
          <Label className="text-neutral-500 font-semibold text-[14px] mb-2 mt-4">
            ANY PETS?
          </Label>
          <div className="flex flex-row flex-wrap gap-2">
            {optHasPets.map((pets) => {
              const isSelected = has_pets === pets.value;
              return (
                <div
                  key={pets.key}
                  onClick={() => {
                    dispatch(setBookingData({ has_pets: pets.value }));
                  }}
                  className={cn(
                    "flex flex-row gap-2 items-center py-[11px] px-[20px] border-[2px] rounded-lg h-[50px] cursor-pointer",
                    isSelected
                      ? "border-primary text-primary"
                      : "border-grey-800 text-neutral-500"
                  )}
                >
                  <span className="font-semibold text-[14px]">{pets.key}</span>
                </div>
              );
            })}
            <textarea
              placeholder="What types of pets? Some of our cleaners have pet allergies."
              value={pet_type}
              onChange={(e) => {
                dispatch(setBookingData({ pet_type: e.target.value }));
              }}
              className="placeholder:font-light placeholder:text-[14px] flex items-center justify-center w-full min-h-[81px] border-2 border-grey-800 p-[20px] resize-none text-neutral-100 rounded-lg focus:border-primary focus:outline-none"
            />
            <Label className="text-neutral-500 font-semibold text-[14px] mb-2 mt-2">
              ADDITIONAL NOTES
            </Label>
            <textarea
              placeholder="I would like Sophie to be my cleaner.  Please change my sheets (fresh bedding is on the bed) and empty the dishwasher."
              value={notes}
              onChange={(e) => {
                dispatch(setBookingData({ notes: e.target.value }));
              }}
              className="placeholder:font-light placeholder:text-[14px] flex items-center justify-center w-full min-h-[81px] mb-4 border-2 border-grey-800 p-[20px] resize-none text-neutral-100 rounded-lg focus:border-primary focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-30" />
      </div>

      {/* ================== */}
      {/* Footer untuk menampilkan subtotal dan tombol NEXT di mobile */}
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
          <div
            onClick={() => {
              onSubmit();
             
            }}
            className="bg-primary text-white font-semibold text-[18px] w-full items-center justify-center flex"
          >
            NEXT
          </div>
        </div>
      </footer>

      {/* ================== Desktop Header ================== */}
      <div className="hidden md:flex fixed top-0 left-0 w-full h-[70px] bg-white shadow-md z-10 items-center">
        <div className="w-[60px] h-full flex items-center justify-center border-r-2 border-grey-600">
          <FiX
            className="text-neutral-300 w-6 h-6"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <div className="flex flex-1 justify-between items-center mx-6">
          <div className="flex flex-row items-center">
            <LuBedSingle className="text-neutral-500" size={20} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                {bedroom}
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">BEDROOMS</h1>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <LuShowerHead className="text-neutral-500" size={25} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                {bathroom}
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">BATHROOMS</h1>
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
                {date
                  ? new Date(date).toLocaleString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })
                  : "Select Date"}
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">DATE</h1>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <LuMapPin className="text-neutral-500" size={20} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                Address
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">LOCATION</h1>
            </div>
          </div>
        </div>
        <div className="h-full min-w-[120px] bg-neutral-200 flex flex-col items-center justify-center px-4">
          <span className="text-white font-bold text-lg">$ {subTotal}</span>
          <span className="text-grey-600 text-xs font-semibold">SUB TOTAL</span>
        </div>
      </div>

      {/* ================== Desktop View ================== */}
      <div className="hidden flex-col md:items-center md:justify-center md:flex pt-[100px] w-[calc(100%-50px)] mx-auto bg-white">
        <div className="flex w-full items-center justify-center">
          <h1 className="text-neutral-100 font-bold text-3xl">
            Select Frequency
          </h1>
        </div>
        <span className="flex items-center justify-center text-neutral-500 font-light text-[18px] mt-2 mb-[30px]">
          Book for Shield’s recurring plan and save 20% annually.
        </span>
        <div className="flex flex-col items-center justify-center mt-[10px]">
          <h1 className="text-neutral-500 font-semibold text-[14px] mb-[10px]">
            RECURRING
          </h1>
          <div className="flex flex-row flex-wrap gap-2">
            {optFrequencies.map((Frq) => {
              const isSelected = frequency === Frq;
              return (
                <div
                  onClick={() => {
                    dispatch(setBookingData({ frequency: Frq }));
                  }}
                  key={Frq}
                  className={cn(
                    " py-[11px] px-[25px] border-[2px]  rounded-lg h-[50px] flex items-center justify-center cursor-pointer",
                    isSelected ? "border-primary" : "border-grey-800"
                  )}
                >
                  <h1
                    className={cn(
                      "font-semibold text-[14px]",
                      isSelected ? "text-primary" : "text-neutral-500"
                    )}
                  >
                    {Frq}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
        <span className="text-neutral-100 text-[25px] font-bold text-left mt-[37px]">
          Add Your Address & Details
        </span>
        <div className="flex flex-col my-[10px]">
          <span className="text-neutral-500 font-light text-[15px] text-left">
            Be specific of any additional details we might need from you.
          </span>
        </div>

        {/* Komponen Calendar untuk memilih jam booking */}
        <div className="flex items-center justify-center flex-col mt-[10px]">
          <Label className="text-neutral-500 font-semibold text-[14px] mb-2">
            ADDRESS
          </Label>
          <Input
            type="text"
            placeholder="Enter a Location"
            value={address}
            onChange={(e) => {
              dispatch(setBookingData({ address: e.target.value }));
            }}
            className=" placeholder:font-semibold placeholder:text-[14px] w-full h-fit mb-4 border-2 border-grey-800 py-[9px]"
          />
          <Label className="text-neutral-500 font-semibold text-[14px] mb-2">
            HOW DO WE GET IN?
          </Label>
          <div className="flex flex-row flex-wrap gap-2">
            {optEntryMethods.map((enter) => {
              const isSelected = entry_method === enter;
              return (
                <div
                  onClick={() => {
                    dispatch(setBookingData({ entry_method: enter }));
                  }}
                  key={enter}
                  className={cn(
                    " py-[11px] px-[25px] border-[2px]  rounded-lg h-[50px] flex items-center justify-center cursor-pointer",
                    isSelected ? "border-primary" : "border-grey-800"
                  )}
                >
                  <h1
                    className={cn(
                      "font-semibold text-[14px]",
                      isSelected ? "text-primary" : "text-neutral-500"
                    )}
                  >
                    {enter}
                  </h1>
                </div>
              );
            })}
          </div>
          <Label className="text-neutral-500 font-semibold text-[14px] mb-2 mt-4">
            ADD-ONS
          </Label>
          <div className="flex flex-row flex-wrap gap-2">
            {optAddOns.map((add) => {
              const isSelected =
                Array.isArray(adds_ons) && adds_ons.includes(add.key);
              return (
                <div
                  key={add.key}
                  onClick={() => toggleAddOn(add.key)}
                  className={cn(
                    "flex flex-row gap-2 items-center py-[11px] px-[20px] border-[2px] rounded-lg h-[50px] cursor-pointer",
                    isSelected
                      ? "border-primary text-primary"
                      : "border-grey-800 text-neutral-500"
                  )}
                >
                  {add.icon}
                  <span className="font-semibold text-[14px]">{add.key}</span>
                </div>
              );
            })}
          </div>
          <Label className="text-neutral-500 font-semibold text-[14px] mb-2 mt-4">
            ANY PETS?
          </Label>
          <div className="flex flex-row items-center justify-center flex-wrap gap-2">
            {optHasPets.map((pets) => {
              const isSelected = has_pets === pets.value;
              return (
                <div
                  key={pets.key}
                  onClick={() => {
                    dispatch(setBookingData({ has_pets: pets.value }));
                  }}
                  className={cn(
                    "flex flex-row gap-2 items-center py-[11px] px-[20px] border-[2px] rounded-lg h-[50px] cursor-pointer",
                    isSelected
                      ? "border-primary text-primary"
                      : "border-grey-800 text-neutral-500"
                  )}
                >
                  <span className="font-semibold text-[14px]">{pets.key}</span>
                </div>
              );
            })}
            <textarea
              placeholder="What types of pets? Some of our cleaners have pet allergies."
              value={pet_type}
              onChange={(e) => {
                dispatch(setBookingData({ pet_type: e.target.value }));
              }}
              className="placeholder:font-light placeholder:text-[14px] flex items-center justify-center w-full min-h-[81px] border-2 border-grey-800 p-[20px] resize-none text-neutral-100 rounded-lg focus:border-primary focus:outline-none"
            />
            <Label className="text-neutral-500 font-semibold text-[14px] mb-2 mt-2">
              ADDITIONAL NOTES
            </Label>
            <textarea
              placeholder="I would like Sophie to be my cleaner.  Please change my sheets (fresh bedding is on the bed) and empty the dishwasher."
              value={notes}
              onChange={(e) => {
                dispatch(setBookingData({ notes: e.target.value }));
              }}
              className="placeholder:font-light placeholder:text-[14px] flex items-center justify-center w-full min-h-[81px] mb-4 border-2 border-grey-800 p-[20px] resize-none text-neutral-100 rounded-lg focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Tombol NEXT di desktop */}
        <div className="flex items-center justify-center my-13">
          <Button
            className="py-5 px-15 text-white font-semibold text-[18px]"
            onClick={() => {
              onSubmit();
          
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
