"use client";

import { useTranslation } from "react-i18next";

const FAQ_COUNT = 8;

export default function FAQAccordion() {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      {Array.from({ length: FAQ_COUNT }, (_, i) => (
        <div
          key={i}
          className="collapse collapse-plus bg-base-100 border border-base-300"
        >
          <input type="radio" name="faq-accordion" defaultChecked={i === 0} />
          <div className="collapse-title font-semibold after:text-secondary">
            {t(`faq.items.${i}.question`)}
          </div>
          <div className="collapse-content text-sm">
            {t(`faq.items.${i}.answer`)}
          </div>
        </div>
      ))}
    </div>
  );
}
