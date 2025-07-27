"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Language from "./Language";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="navbar fixed top-0 inset-x-0 z-50 max-w-[1536px] mx-auto px-4 md:px-5 md:py-5 py-4 bg-base-100 shadow">
      <div className="flex-1">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label={t("aria.navigation.linkToHome")}
        >
          <Image
            src="/icon-192x192.png"
            alt={t("Header.logoAlt")}
            width={60}
            height={60}
            className="h-10 w-10 md:h-14 md:w-14 rounded-full"
            priority
          />
          <span className="font-bold text-2xl md:text-3xl tracking-wider">
            {t("Header.brandName")}
          </span>
        </Link>
      </div>
      <Language />
    </div>
  );
};

export default Header;




// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useTranslation } from "react-i18next";
// import Language from "./Language";

// const Header = () => {
//   const { t } = useTranslation();

//   return (
//     <div className="navbar absolute top-0 inset-x-0 z-50 max-w-[1536px] mx-auto md:px-5 md:py-5 py-7 bg-base-100 md:bg-transparent">
//       <div className="flex-1">
//         <Link
//           href="/"
//           className="pl-4 flex items-center gap-2"
//           aria-label={t("aria.navigation.linkToHome")}
//         >
//           <Image
//             src="/icon-192x192.png"
//             alt={t("Header.logoAlt")}
//             width={60}
//             height={60}
//             className="h-10 w-10 md:h-14 md:w-14 rounded-full"
//             priority
//           />
//           <span className="font-bold text-2xl md:text-3xl tracking-wider">
//             {t("Header.brandName")}
//           </span>
//         </Link>
//       </div>
//             <Language />
//     </div>
//   );
// };

// export default Header;
