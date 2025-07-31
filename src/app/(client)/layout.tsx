"use client";
import { HiMenu, HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import Script from "next/script";
import Header from "@/components/client/layout/Header";
import Footer from "@/components/client/layout/Footer";
import Sidebar from "@/components/client/layout/SideBar";
import { FaAngleUp } from "react-icons/fa6";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showScroll, setShowScroll] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

        {/* Mobile drawer */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            drawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setDrawerOpen(false)}
        />

        <aside
          className={`fixed top-0 left-0 w-64 h-full bg-base-100 shadow-lg z-50 p-4 overflow-y-auto transition-transform duration-300 transform ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >

          <Sidebar closeDrawer={() => setDrawerOpen(false)} />
        </aside>

        {/* Mobile drawer */}
        <main>{children}</main>
        <Footer />

        {/* Scroll to top button */}
        {showScroll && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-8 p-2 bg-base-100 ring-2 ring-secondary text-secondary rounded-lg shadow-lg z-50 cursor-pointer block md:hidden"
          >
            <FaAngleUp size={17} />
          </button>
        )}

        {/* Mobile bottom menu */}
        <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-base-100 border-t border-base-300">
          <div className="flex justify-center items-center h-14">
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="text-2xl p-2 bg-base-200 rounded-full shadow ring-1 ring-base-300 hover:bg-base-300 transition-all duration-200"
              aria-label={drawerOpen ? "Luk menu" : "Åbn menu"}
            >
              <span
                className={`transition-transform duration-300 ${
                  drawerOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                {drawerOpen ? <HiX /> : <HiMenu />}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
