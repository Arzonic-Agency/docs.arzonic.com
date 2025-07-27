import Sidebar from "@/components/client/layout/SideBar";
import React from "react";

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
    items: ["create_edit_course", "registration_management", "calendar_display"],
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

const formatId = (str: string) => str.replace(/_/g, "-");

const formatTitle = (str: string) => {
  return str
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const HomePage = () => {
  return (
    <div className="flex flex-row">
      {/* Sidebar stays in layout, scrollable if needed */}
      <aside className="w-72 shrink-0 overflow-y-auto max-h-[calc(100vh-101px)] sticky top-[101px] hidden md:block sidebar-scroll">
        <Sidebar />
      </aside>

      <main className="flex-1 w-full h-full bg-base-100 overflow-y-auto px-6 py-8 scroll-smooth">
        <h1 className="text-2xl font-bold mb-6">Welcome to Arzonic Docs</h1>
        <p className="text-base-content/70 mb-10">
          Vi tilbyder skræddersyede løsninger til dine behov, uanset om det er en simpel
          hjemmeside eller en kompleks webapplikation. Vores team af eksperter er klar til
          at hjælpe dig med at realisere dine digitale drømme.
        </p>

        {docSections.map((section) =>
          section.items.map((item) => (
            <section
              key={item}
              id={formatId(item)}
              className="mb-16 border-b border-base-300 pb-8"
            >
              <h2 className="text-xl font-semibold mb-4">{formatTitle(item)}</h2>
              <p className="text-base-content/80">
                Her kommer der indhold omkring <strong>{formatTitle(item)}</strong>. Du
                kan tilpasse dette med relevant tekst, billeder eller video.
              </p>
            </section>
          ))
        )}
      </main>
    </div>
  );
};

export default HomePage;






// import Sidebar from "@/components/client/layout/SideBar";
// import React from "react";

// const docSections = [
//   {
//     category: "getting_started",
//     items: ["what_is_dashboard", "login_access", "roles_permissions"],
//   },
//   {
//     category: "overview_navigation",
//     items: ["frontpage", "menu_sections", "change_language_theme"],
//   },
//   {
//     category: "news_posts",
//     items: ["create_post", "upload_media", "edit_delete", "social_publish"],
//   },
//   {
//     category: "course_event",
//     items: ["create_edit_course", "registration_management", "calendar_display"],
//   },
//   {
//     category: "user_management",
//     items: ["add_edit_user", "assign_roles", "deactivate_user"],
//   },
//   {
//     category: "settings_integrations",
//     items: ["configure_social", "webhook_integrations", "upload_branding"],
//   },
//   {
//     category: "faq",
//     items: ["cant_login", "cant_see_pages", "change_content"],
//   },
//   {
//     category: "support_contact",
//     items: ["get_help", "bug_feedback", "customer_service"],
//   },
// ];

// const formatId = (str: string) => str.replace(/_/g, "-");

// const formatTitle = (str: string) => {
//   return str
//     .replace(/_/g, " ")
//     .replace(/\b\w/g, (char) => char.toUpperCase());
// };

// const HomePage = () => {
//   return (
//     <div className="flex">
//       {/* Fixed Sidebar */}
//       <aside className="w-72 fixed top-0 left-0 h-screen overflow-y-auto border-r border-base-300 bg-base-200 z-10">
//         <Sidebar />
//       </aside>

//       {/* Main content offset by sidebar */}
//       <main className="ml-72 flex-1 bg-base-100 px-6 py-8 scroll-smooth">
//         <h1 className="text-2xl font-bold mb-6">Welcome to Arzonic Docs</h1>
//         <p className="text-base-content/70 mb-10">
//           Vi tilbyder skræddersyede løsninger til dine behov, uanset om det er en simpel
//           hjemmeside eller en kompleks webapplikation. Vores team af eksperter er klar til
//           at hjælpe dig med at realisere dine digitale drømme.
//         </p>

//         {/* Dynamically render all sections */}
//         {docSections.map((section) =>
//           section.items.map((item) => (
//             <section
//               key={item}
//               id={formatId(item)}
//               className="mb-16 border-b border-base-300 pb-8"
//             >
//               <h2 className="text-xl font-semibold mb-4">{formatTitle(item)}</h2>
//               <p className="text-base-content/80">
//                 Her kommer der indhold omkring <strong>{formatTitle(item)}</strong>. Du
//                 kan tilpasse dette med relevant tekst, billeder eller video.
//               </p>
//             </section>
//           ))
//         )}
//       </main>
//     </div>
//   );
// };

// export default HomePage;






// import Sidebar from "@/components/client/layout/SideBar";
// import React from "react";

// const docSections = [
//   {
//     category: "getting_started",
//     items: ["what_is_dashboard", "login_access", "roles_permissions"],
//   },
//   {
//     category: "overview_navigation",
//     items: ["frontpage", "menu_sections", "change_language_theme"],
//   },
//   {
//     category: "news_posts",
//     items: ["create_post", "upload_media", "edit_delete", "social_publish"],
//   },
//   {
//     category: "course_event",
//     items: ["create_edit_course", "registration_management", "calendar_display"],
//   },
//   {
//     category: "user_management",
//     items: ["add_edit_user", "assign_roles", "deactivate_user"],
//   },
//   {
//     category: "settings_integrations",
//     items: ["configure_social", "webhook_integrations", "upload_branding"],
//   },
//   {
//     category: "faq",
//     items: ["cant_login", "cant_see_pages", "change_content"],
//   },
//   {
//     category: "support_contact",
//     items: ["get_help", "bug_feedback", "customer_service"],
//   },
// ];

// const formatId = (str: string) => str.replace(/_/g, "-");

// const formatTitle = (str: string) => {
//   return str
//     .replace(/_/g, " ")
//     .replace(/\b\w/g, (char) => char.toUpperCase());
// };

// const HomePage = () => {
//   return (
//     <div className="flex flex-row">
//       <aside className="w-72 shrink-0">
//         <Sidebar />
//       </aside>

//       <main className="flex-1 w-full h-full bg-base-100 overflow-y-auto px-6 py-8 scroll-smooth">
//         <h1 className="text-2xl font-bold mb-6">Welcome to Arzonic Docs</h1>
//         <p className="text-base-content/70 mb-10">
//           Vi tilbyder skræddersyede løsninger til dine behov, uanset om det er en simpel
//           hjemmeside eller en kompleks webapplikation. Vores team af eksperter er klar til
//           at hjælpe dig med at realisere dine digitale drømme.
//         </p>

//         {/* Dynamically render all sections */}
//         {docSections.map((section) =>
//           section.items.map((item) => (
//             <section
//               key={item}
//               id={formatId(item)}
//               className="mb-16 border-b border-base-300 pb-8"
//             >
//               <h2 className="text-xl font-semibold mb-4">{formatTitle(item)}</h2>
//               <p className="text-base-content/80">
//                 Her kommer der indhold omkring <strong>{formatTitle(item)}</strong>. Du
//                 kan tilpasse dette med relevant tekst, billeder eller video.
//               </p>
//             </section>
//           ))
//         )}
//       </main>
//     </div>
//   );
// };

// export default HomePage;