import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaHashtag, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="md:ml-64 bg-base-100 shadow-lg">
      <footer className="flex justify-between items-center px-10 py-5">
        <aside className="flex items-center text-sm space-x-2">
          <FaHashtag className="text-3xl -rotate-12 text-secondary" />
          <p>
            {t("Footer.brandName", "Arzonic Agency")}
            <br />
            {t("Footer.reliableTech", "Providing reliable tech since 2024")}
          </p>
        </aside>
        <nav>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.facebook.com/profile.php?id=61575249251500"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hover:text-secondary md:transition-colors md:duration-300"
            >
              <FaFacebook size={27} />
            </Link>
            <Link
              href="https://www.instagram.com/arzonic.agency/"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hover:text-secondary md:transition-colors md:duration-300"
            >
              <FaInstagram size={30} />
            </Link>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
