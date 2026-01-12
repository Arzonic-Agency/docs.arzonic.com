"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Header from "@/components/client/layout/Header";
import Footer from "@/components/client/layout/Footer";
import { FaAngleUp } from "react-icons/fa6";
import Sidebar from "@/components/client/layout/SideBar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Script
        async
        defer
        src="https://stats.arzonic.com/script.js"
        data-website-id="3226dc67-1feb-4d8c-9f6d-75f7dd0d23d7"
      />
      <div className="pt-[64px] md:pt-[101px] max-w-screen-2xl mx-auto relative">
        <Header />
        <Sidebar />
        <div className="md:ml-64">
          <main>{children}</main>
        </div>
        <Footer />
        {showScroll && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-8 p-2 bg-base-100 ring-2 ring-secondary text-secondary rounded-lg shadow-lg z-50 cursor-pointer block md:hidden"
          >
            <FaAngleUp size={17} />
          </button>
        )}
      </div>
    </>
  );
}
