import React, { useState } from "react";
import { createSection } from "@/lib/server/actions";
import { useTranslation } from "react-i18next";

const CreateSection = ({ onSectionCreated }: { onSectionCreated: () => void }) => {
  const { t } = useTranslation();
  const [company, setCompany] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");

  const [errors, setErrors] = useState({
    company: "",
    desc: "",
    city: "",
    country: "",
    image: "",
    contact: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCreateSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!company || !desc || !city || !country || !contact) {
      setErrors({
        company: !company ? t("company_name_required") : "",
        desc: !desc ? t("desc_required") : "",
        city: !city ? t("city_required") : "",
        country: !country ? t("country_required") : "",
        image: "",
        contact: !contact ? t("contact_person_required") : "",
        website: "",
      });
      setLoading(false);
      return;
    }

    try {
      await createSection({
        company,
        desc,
        city,
        country,
        contact,
        website,
      });

      // Reset form
      setCompany("");
      setDesc("");
      setCity("");
      setCountry("");
      setContact("");
      setImage(null);
      setWebsite("");
      onSectionCreated();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: error.message,
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 500) {
      setDesc(e.target.value);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full p-3">
      <span className="text-lg font-bold">{t("section_creation")}</span>
      <form
        onSubmit={handleCreateSection}
        className="flex flex-col items-start gap-5 w-full"
      >
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-14 w-full">
          <div className="flex flex-col gap-5 items-center">
            <fieldset className="flex flex-col gap-2 relative w-full fieldset">
              <legend className="fieldset-legend">{t("company_name")}</legend>
              <input
                name="company"
                type="text"
                className="input input-bordered input-md"
                placeholder={t("write_company_name")}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                aria-label={t("aria.createSection.companyName")}
              />
              {errors.company && (
                <span className="absolute -bottom-4 text-xs text-red-500">
                  {errors.company}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2 relative w-full fieldset">
              <legend className="fieldset-legend">{t("contact_person")}</legend>
              <input
                name="contact"
                type="text"
                className="input input-bordered input-md"
                placeholder={t("write_contact_person")}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                aria-label={t("aria.createSection.contactPerson")}
              />
              {errors.contact && (
                <span className="absolute -bottom-4 text-xs text-red-500">
                  {errors.contact}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2 relative w-full fieldset">
              <legend className="fieldset-legend">{t("desc")}</legend>
              <textarea
                name="desc"
                className="textarea textarea-bordered textarea-md text"
                value={desc}
                onChange={handleDescChange}
                required
                placeholder={t("write_desc")}
                style={{ resize: "none" }}
                cols={30}
                rows={8}
                aria-label={t("aria.createSection.description")}
              ></textarea>
              <div className="text-right text-xs font-medium text-zinc-500">
                {desc.length} / 500
              </div>
              {errors.desc && (
                <span className="absolute -bottom-4 text-xs text-red-500">
                  {errors.desc}
                </span>
              )}
            </fieldset>
          </div>
          <div className="flex flex-col gap-3 relative">
            <fieldset className="flex flex-col gap-2 relative w-full fieldset">
              <legend className="fieldset-legend">{t("city")}</legend>
              <input
                name="city"
                type="text"
                className="input input-bordered input-md"
                placeholder={t("write_city")}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                aria-label={t("aria.createSection.city")}
              />
              {errors.city && (
                <span className="absolute -bottom-4 text-xs text-red-500">
                  {errors.city}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2 relative w-full fieldset">
              <legend className="fieldset-legend">{t("country")}</legend>
              <input
                name="country"
                type="text"
                className="input input-bordered input-md"
                placeholder={t("write_country")}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                aria-label={t("aria.createSection.country")}
              />
              {errors.country && (
                <span className="absolute -bottom-4 text-xs text-red-500">
                  {errors.country}
                </span>
              )}
            </fieldset>
            <fieldset className="flex flex-col gap-2 relative w-full fieldset">
              <legend className="fieldset-legend">{t("website_url")}</legend>
              <input
                name="website"
                type="url"
                className="input input-bordered input-md"
                placeholder={t("write_website_url")}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                aria-label={t("aria.createSection.websiteUrl")}
              />
              {errors.website && (
                <span className="absolute -bottom-4 text-xs text-red-500">
                  {errors.website}
                </span>
              )}
            </fieldset>
            <fieldset className="flex flex-col gap-2 relative w-full fieldset">
              <legend className="fieldset-legend">{t("choose_images")}</legend>
              <input
                name="image"
                type="file"
                className="file-input file-input-bordered file-input-md w-full"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                required
                aria-label={t("aria.createSection.chooseImage")}
              />
              {errors.image && (
                <span className="absolute -bottom-4 text-xs text-red-500">
                  {errors.image}
                </span>
              )}
            </fieldset>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={loading}
          aria-label={
            loading
              ? t("aria.createSection.creating")
              : t("aria.createSection.create")
          }
        >
          {loading ? t("creating") : t("create")}
        </button>
      </form>
    </div>
  );
};

export default CreateSection;
