"use client";
import { Button } from "@/components/ui/button";
import { FiAlignJustify } from "react-icons/fi";
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const Router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      setIsLoggedIn(false);
      window.location.reload();
    }
  };

  return (
    <>
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
              <span className="lg:text-lg text-sm">FAQ&apos;s</span>
            </div>

            {/* Login Button */}
            {isLoggedIn ? (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-2 bg-white text-primary hover:text-primaryLight h-10"
              >
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-2 bg-white text-primary hover:text-primaryLight h-10"
                >
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Icon */}
            <FiAlignJustify
              size={30}
              className="sm:hidden"
              onClick={() => setIsOpen(true)}
            />
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-6">
            <img src="Logo.png" className="h-10 w-auto object-contain" />
            <button
              onClick={() => setIsOpen(false)}
              className="text-3xl hover:text-red-500 transition"
            >
              <FiX />
            </button>
          </div>

          {/* Middle Nav Items */}
          <div className="flex-1 flex flex-col justify-center items-center gap-6 text-xl font-medium text-gray-700">
            <span className="hover:text-primary cursor-pointer">
              Residential
            </span>
            <span className="hover:text-primary cursor-pointer">Office</span>
            <span className="hover:text-primary cursor-pointer">
              Commercial
            </span>
            <span className="hover:text-primary cursor-pointer">FAQ&apos;s</span>
          </div>

          {/* Bottom Login Button */}
          <div className="p-6">
            {isLoggedIn ? (
              <Button
              onClick={handleLogout}
              variant="secondary"
              className="w-full bg-primary text-white hover:text-primaryLight h-10"
            >
              Logout
            </Button>
            ) : (
              <Button
              onClick={() => {
                Router.push("/login");
              }}
              variant="secondary"
              className="w-full bg-primary text-white hover:text-primaryLight h-10"
            >
              Login
            </Button>
            )}
           
          </div>
        </div>
      )}
    </>
  );
}
