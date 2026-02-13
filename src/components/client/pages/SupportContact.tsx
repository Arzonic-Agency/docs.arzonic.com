import { BlockMini } from "@/components/elements/BlockMini";
import { DocSection } from "@/lib/client/types";
import FeedbackWidget from "@/components/elements/FeedbackWidget";

type Props = {
  sections?: Record<string, DocSection>;
};

const SupportContact = ({ sections }: Props) => {
  const sectionsToUse = sections ? Object.values(sections) : [];

  return (
    <div className="space-y-10">
      <h1 className="text-2xl md:text-3xl font-semibold">Support og kontakt</h1>

      {sectionsToUse.length > 0 ? (
        sectionsToUse.map(
          (section, index) =>
            section && (
              <section
                key={section.id || index}
                id={section.slug ?? `section-${index}`}
                className="flex flex-col gap-4"
              >
                <h2 className="text-lg md:text-xl font-bold">
                  {section.title}
                </h2>
                {section.blocks?.length ? (
                  section.blocks.map((block) => (
                    <BlockMini key={block.id} block={block} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Ingen indhold endnu.
                  </p>
                )}
              </section>
            ),
        )
      ) : (
        <div className="space-y-6">
          <section id="contact">
            <h2 className="text-xl font-bold mb-2">Kontakt os</h2>
            <p>Har du brug for hjælp? Kontakt supportteamet direkte.</p>
          </section>

          <section id="faq">
            <h2 className="text-xl font-bold mb-2">FAQ / Hjælp</h2>
            <p>Find svar på de mest almindelige spørgsmål og problemer.</p>
          </section>
        </div>
      )}
      <FeedbackWidget />
    </div>
  );
};

export default SupportContact;
