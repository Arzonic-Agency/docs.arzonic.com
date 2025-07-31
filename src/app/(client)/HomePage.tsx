"use client";

import React, { useState } from "react";
import Sidebar from "@/components/client/layout/SideBar";

const docSections = [
  {
    category: "getting_started",
    items: ["what_is_dashboard", "login_access", "roles_permissions"],
  },
  {
    category: "overview_navigation",
    items: ["frontpage", "menu_sections", "change_language_theme"],
  },
  {
    category: "news_posts",
    items: ["create_post", "upload_media", "edit_delete", "social_publish"],
  },
  {
    category: "course_event",
    items: [
      "create_edit_course",
      "registration_management",
      "calendar_display",
    ],
  },
  {
    category: "user_management",
    items: ["add_edit_user", "assign_roles", "deactivate_user"],
  },
  {
    category: "settings_integrations",
    items: ["configure_social", "webhook_integrations", "upload_branding"],
  },
  {
    category: "faq",
    items: ["cant_login", "cant_see_pages", "change_content"],
  },
  {
    category: "support_contact",
    items: ["get_help", "bug_feedback", "customer_service"],
  },
];

// Util
const formatId = (str: string) => str.replace(/_/g, "-");
const formatTitle = (str: string) =>
  str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const HomePage = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="flex flex-row">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 overflow-y-auto max-h-[calc(100vh-101px)] sticky top-[101px] hidden md:block sidebar-scroll">
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 w-full h-full bg-base-100 overflow-y-auto px-6 py-8 scroll-smooth">
        <h1 className="text-2xl font-bold mb-4">Welcome to Arzonic Docs</h1>
        <p className="text-base-content/70 mb-6">
          Vi tilbyder skræddersyede løsninger til dine behov, uanset om det er
          en simpel hjemmeside eller en kompleks webapplikation. Vores team af
          eksperter er klar til at hjælpe dig med at realisere dine digitale
          drømme.
        </p>

        {/* Video aligned to the left on desktop */}
        <div className="mb-12">
          <div className="w-full md:w-2/3 lg:w-1/2 aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=0&rel=0"
              title="Arzonic Dashboard Intro"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {docSections.map((section) =>
          section.items.map((item) => (
            <section
              key={item}
              id={formatId(item)}
              className="mb-16 border-b border-base-300 pb-8"
            >
              <h2 className="text-xl font-semibold mb-4">
                {formatTitle(item)}
              </h2>
              <p className="text-base-content/80 mb-4">
                Her kommer der indhold omkring{" "}
                <strong>{formatTitle(item)}</strong>. Du kan tilpasse dette med
                relevant tekst, billeder eller video.
              </p>

              <button
                onClick={() => setActiveVideo(item)}
                className="btn btn-sm btn-outline btn-primary"
              >
                📺 Se hvordan
              </button>
            </section>
          ))
        )}
      </main>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/80 z-[999] flex items-center justify-center px-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="bg-base-100 rounded-lg max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()} // prevents modal close on video click
          >
            <button
              className="absolute top-2 right-2 text-sm btn btn-sm btn-circle"
              onClick={() => setActiveVideo(null)}
              aria-label="Luk video"
            >
              ✕
            </button>

            <video
              controls
              autoPlay
              className="w-full rounded-b-lg"
              src={`/videos/${activeVideo}.mp4`}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;