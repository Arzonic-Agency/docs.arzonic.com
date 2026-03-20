import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaHashtag,
  FaInstagram,
  FaRegCopyright,
} from "react-icons/fa6";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="md:ml-64 bg-base-100">
      <footer className="flex justify-between items-center p-5 md:px-10 md:py-5">
        <aside className="flex items-start flex-col text-sm gap-2">
          <div className="flex items-center gap-2">
            <FaHashtag className="text-3xl -rotate-12 text-secondary" />
            <p>
              {t("footer.brandName")}
              <br />
              {t("footer.reliableTech")}
            </p>
          </div>
          <span className="ml-2 text-xs text-zinc-500 flex items-center gap-1.25">
            <FaRegCopyright /> {new Date().getFullYear()} Arzonic ApS -{" "}
            {t("footer.allRightsReserved")}
          </span>
        </aside>
        <nav>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.facebook.com/profile.php?id=61575249251500"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hover:text-secondary md:transition-colors md:duration-300"
            >
              <FaFacebook size={28} />
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
