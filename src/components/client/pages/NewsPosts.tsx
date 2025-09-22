import React from "react";
import { BlockMini } from "@/components/elements/BlockMini";
import { DocSection } from "@/lib/client/types";

type Props = {
  sections?: Record<string, DocSection>;
};

const NewsPosts = ({ sections }: Props) => {
  console.log("📰 NewsPosts - Received sections:", sections);

  const sectionsToUse = sections ? Object.values(sections) : [];

  return (
    <div className="space-y-10">
      <h1 className="text-2xl md:text-3xl font-semibold">Nyhedsopslag</h1>

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
            )
        )
      ) : (
        <div className="space-y-6">
          <section id="create">
            <h2 className="text-xl font-bold mb-2">Opret opslag</h2>
            <p>Sådan opretter du en nyhed eller et opslag via dashboardet.</p>
          </section>

          <section id="upload">
            <h2 className="text-xl font-bold mb-2">Upload billeder/video</h2>
            <p>Lær hvordan du uploader billeder eller videoer til opslag.</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default NewsPosts;
