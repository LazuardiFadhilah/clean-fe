"use client";
// Mengimpor icon close (X) dari react-icons
import { FiX } from "react-icons/fi";
// Button UI component yang digunakan untuk pilihan user
import { Button } from "@/components/ui/button";
// State & lifecycle hooks dari React
import { useState, useEffect } from "react";
// Hook navigasi Next.js
import { useRouter } from "next/navigation";
// Redux hooks & slice state
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { calculateSubTotal, setBookingData } from "@/lib/bookingSlice";
// Mengimpor icon yang digunakan untuk menampilkan informasi booking
import { LuBedSingle } from "react-icons/lu";
import { LuShowerHead } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { LiaBroomSolid } from "react-icons/lia";
import { LuMapPin } from "react-icons/lu";

export default function Booking() {
  // Mendapatkan fungsi dispatch untuk mengirim aksi ke Redux store
  const dispatch = useDispatch();
  // Mengambil data booking dari Redux store (bedroom, bathroom, cleanType, subTotal)
  const { bedroom, bathroom, cleanType, subTotal } = useSelector(
    (state: RootState) => state.booking
  );
  // Hook router Next.js untuk navigasi halaman
  const router = useRouter();

  // Opsi jumlah kamar tidur yang dapat dipilih user
  const options = ["Studio", "1", "2", "3", "4", "5"];
  // Opsi jumlah kamar mandi yang dapat dipilih user
  const optBathroom = ["1", "2", "3", "4", "5"];

  // Tipe pembersihan yang tersedia
  type CleanType =
    | "Standard"
    | "Deep Clean"
    | "Moving In/Out"
    | "Post Construction";

  // Array tipe pembersihan untuk mapping dan rendering pilihan
  const optCleanType: CleanType[] = [
    "Standard",
    "Deep Clean",
    "Moving In/Out",
    "Post Construction",
  ];

  // Durasi estimasi untuk tiap tipe pembersihan
  const durationClean: Record<CleanType, string> = {
    Standard: "2 hours",
    "Deep Clean": "2.5 hours",
    "Moving In/Out": "4.5–5 hours",
    "Post Construction": "4.5–5 hours",
  };

  // useEffect untuk mengupdate booking data dan menghitung subtotal setiap kali data berubah
  useEffect(() => {
    // Mengirim data booking terbaru ke Redux store
    dispatch(
      setBookingData({ bedroom, bathroom, cleanType, subTotal: subTotal })
    );
    // Menghitung subtotal berdasarkan data booking yang terbaru
    dispatch(calculateSubTotal());
  }, [bedroom, bathroom, cleanType, subTotal, dispatch]);

  return (
    <>
      {/* Bagian untuk tampilan mobile (hidden pada md ke atas) */}
      <div className="flex flex-col mx-[25px] mt-10 md:hidden">
        {/* Tombol close (X) untuk kembali ke halaman utama */}
        <div className="flex justify-end">
          <FiX
            className="text-neutral-100"
            size={20}
            onClick={() => {
              router.push("/"); // Navigasi ke halaman utama saat diklik
            }}
          />
        </div>
        {/* Judul halaman */}
        <span className="text-neutral-100 text-[25px] font-bold text-left mt-[37px]">
          Costumize your Requirements
        </span>

        {/* Pilihan jumlah kamar tidur */}
        <div className="flex flex-col mt-[26px]">
          <span className="text-neutral-500 font-semibold text-[12px] text-left">
            NUMBER OF BEDROOMS
          </span>
          <div className="flex flex-row flex-wrap gap-2 mt-[13px]">
            {/* Mapping opsi jumlah kamar tidur ke button */}
            {options.map((item) => (
              <Button
                key={item}
                onClick={() =>
                  dispatch(
                    setBookingData({
                      bedroom: item,
                      bathroom,
                      cleanType,
                      subTotal,
                    })
                  )
                }
                className={`bg-white border-2 font-semibold text-[16px]
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

        {/* Pilihan jumlah kamar mandi */}
        <div className="flex flex-col mt-[26px]">
          <span className="text-neutral-500 font-semibold text-[12px] text-left">
            NUMBER OF BATHROOMS
          </span>
          <div className="flex flex-row flex-wrap gap-2 mt-[13px]">
            {/* Mapping opsi jumlah kamar mandi ke button */}
            {optBathroom.map((item) => (
              <Button
                key={item}
                onClick={() =>
                  dispatch(
                    setBookingData({
                      bedroom,
                      bathroom: item,
                      cleanType,
                      subTotal,
                    })
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

        {/* Pilihan tipe pembersihan */}
        <div className="flex flex-col mt-[26px]">
          <span className="text-neutral-500 font-semibold text-[12px] text-left">
            CLEAN TYPE
          </span>
          <div className="flex flex-row flex-wrap gap-2 mt-[13px]">
            {/* Mapping tipe pembersihan ke button dengan durasi di bawahnya */}
            {optCleanType.map((item) => (
              <div className="flex flex-col" key={item}>
                <Button
                  onClick={() =>
                    dispatch(
                      setBookingData({
                        bedroom,
                        bathroom,
                        cleanType: item,
                        subTotal,
                      })
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
                {/* Menampilkan durasi estimasi */}
                <span className="mt-[8px] text-neutral-500 font-light text-[12px]">
                  {durationClean[item]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer fixed untuk mobile yang menampilkan subtotal dan tombol next */}
      <footer className="fixed bottom-0 left-0 w-full z-10 md:hidden">
        <div className="flex flex-row">
          {/* Bagian subtotal */}
          <div className="flex flex-col w-[60%] bg-neutral-200 py-[8px] px-[20px]">
            <span className="text-grey-700 font-semibold text-[14px]">
              SUB TOTAL
            </span>
            <span className="text-white font-bold text-[25px]">
              $ {subTotal}
            </span>
          </div>
          {/* Tombol next untuk lanjut ke step berikutnya */}
          <div onClick={()=>{
            router.push("/booking/step_2"); // Navigasi ke step_2 saat diklik
          }} className="bg-primary text-white font-semibold text-[18px] w-full items-center justify-center flex">
            NEXT
          </div>
        </div>
      </footer>

      {/* Bagian header fixed untuk tampilan desktop (hidden pada mobile) */}
      <div className="hidden md:flex fixed top-0 left-0 w-full h-[70px] bg-white shadow-md z-10 items-center">
        {/* Tombol close (X) untuk kembali ke halaman utama */}
        <div className="w-[60px] h-full flex items-center justify-center border-r-2 border-grey-600">
          <FiX
            className="text-neutral-300 w-6 h-6"
            onClick={() => {
              router.push("/"); // Navigasi ke halaman utama saat diklik
            }}
          />
        </div>

        {/* Informasi booking yang dipilih user */}
        <div className="flex flex-1 justify-between items-center mx-6">
          {/* Informasi kamar tidur */}
          <div className="flex flex-row items-center">
            <LuBedSingle className="text-neutral-500" size={20} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                {bedroom}
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">BEDROOMS</h1>
            </div>
          </div>

          {/* Informasi kamar mandi */}
          <div className="flex flex-row items-center">
            <LuShowerHead className="text-neutral-500" size={25} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                {bathroom}
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">BATHROOMS</h1>
            </div>
          </div>

          {/* Informasi tipe pembersihan */}
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

          {/* Informasi jadwal (placeholder) */}
          <div className="flex flex-row items-center">
            <LuCalendar className="text-neutral-500" size={20} />
            <div className="flex flex-col pl-2">
              <h1 className="text-neutral-100 font-semibold text-md">
                Schedule
              </h1>
              <h1 className="text-grey-600 font-semibold text-xs">DATE</h1>
            </div>
          </div>

          {/* Informasi alamat (placeholder) */}
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

        {/* Bagian subtotal di kanan atas */}
        <div className="h-full min-w-[120px] bg-neutral-200 flex flex-col items-center justify-center px-4">
          <span className="text-white font-bold text-lg">$ {subTotal}</span>
          <span className="text-grey-600 text-xs font-semibold">SUB TOTAL</span>
        </div>
      </div>

      {/* Bagian utama konten untuk desktop (hidden pada mobile) */}
      <div className="hidden flex-col md:flex pt-[100px] w-[calc(100%-50px)] mx-auto bg-white">
        {/* Judul utama */}
        <div className="flex w-full items-center justify-center">
          <h1 className="text-neutral-100 font-bold text-3xl">
            Customize Your Requirements
          </h1>
        </div>

        {/* Label pilihan jumlah kamar tidur */}
        <div className="flex w-full items-center justify-center mt-3">
          <h1 className="text-grey-600 font-semibold text-[14px]">
            NUMBER OF BEDROOMS
          </h1>
        </div>

        {/* Pilihan jumlah kamar tidur */}
        <div className="flex items-center justify-center flex-row flex-wrap gap-2 mt-[13px]">
          {/* Mapping opsi jumlah kamar tidur ke button */}
          {options.map((item) => (
            <Button
              key={item}
              onClick={() =>
                dispatch(
                  setBookingData({
                    bedroom: item,
                    bathroom,
                    cleanType,
                    subTotal,
                  })
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

        {/* Label pilihan jumlah kamar mandi */}
         <div className="flex w-full items-center justify-center mt-10">
          <h1 className="text-grey-600 font-semibold text-[14px]">
            NUMBER OF BATHROOMS
          </h1>
        </div>

        {/* Pilihan jumlah kamar mandi */}
        <div className="flex items-center justify-center flex-row flex-wrap gap-2 mt-[13px]">
          {/* Mapping opsi jumlah kamar mandi ke button */}
          {optBathroom.map((item) => (
            <Button
              key={item}
              onClick={() =>
                dispatch(
                  setBookingData({
                    bedroom,
                    bathroom :item,
                    cleanType,
                    subTotal,
                  })
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

        {/* Label pilihan tipe pembersihan */}
        <div className="flex w-full items-center justify-center mt-10">
          <h1 className="text-grey-600 font-semibold text-[14px]">
            CLEAN TYPE
          </h1>
        </div>

        {/* Pilihan tipe pembersihan dengan durasi */}
         <div className="flex flex-row flex-wrap gap-3 mt-[13px] items-center justify-center">
            {/* Mapping tipe pembersihan ke button dengan durasi */}
            {optCleanType.map((item) => (
              <div className="flex flex-col" key={item}>
                <Button
                  onClick={() =>
                    dispatch(
                      setBookingData({
                        bedroom,
                        bathroom,
                        cleanType: item,
                        subTotal,
                      })
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
                <span className="mt-[8px] text-neutral-500 font-light text-[12px] flex items-center justify-center">
                  {durationClean[item]}
                </span>
              </div>
            ))}
          </div>

          {/* Tombol Next untuk melanjutkan ke step berikutnya */}
          <div className="flex items-center justify-center mt-13">
            <Button className="py-5 px-15 text-white font-semibold text-[18px]"
            onClick={()=>{
                router.push("/booking/step_2") // Navigasi ke step_2 saat tombol Next diklik
            }}>
                Next
            </Button>
          </div>
      </div>
    </>
  );
}
