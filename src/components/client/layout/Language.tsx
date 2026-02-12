import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Language = () => {
  const LANGUAGE_CHANGE_EVENT = "language:change";
  const { i18n, t } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(i18n.language === "en");

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsEnglish(customEvent.detail.isEnglish);
    };

    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
    return () => {
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    i18n.changeLanguage(isEnglish ? "en" : "da");
  }, [isEnglish, i18n]);

  const toggleLanguage = () => {
    const newIsEnglish = !isEnglish;
    setIsEnglish(newIsEnglish);

    // Notify other instances of the language change
    window.dispatchEvent(
      new CustomEvent(LANGUAGE_CHANGE_EVENT, {
        detail: { isEnglish: newIsEnglish },
      }),
    );
  };

  return (
    <label className="swap swap-rotate cursor-pointer justify-start">
      <input type="checkbox" checked={isEnglish} onChange={toggleLanguage} />
      <div
        className="swap-on flex items-center gap-2 relative"
        aria-label={t(
          "aria.language.changeToDanish",
          "Change language to Danish",
        )}
      >
        <Image
          src="/DK.png"
          alt="Danish"
          width={32}
          height={32}
          className="w-6 h-auto md:w-8 md:h-auto"
        />
      </div>
      <div
        className="swap-off flex items-center gap-2 relative"
        aria-label={t(
          "aria.language.changeToEnglish",
          "Change language to English",
        )}
      >
        <Image
          src="/UK.png"
          alt="English"
          width={32}
          height={32}
          className="w-6 h-auto md:w-8 md:h-auto"
        />
      </div>
    </label>
  );
};

export default Language;
