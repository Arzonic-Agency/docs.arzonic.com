import React from "react";
import { BlockMini } from "@/components/elements/BlockMini";
import { DocSection } from "@/lib/client/types";

type Props = {
  intro?: DocSection;
  flow?: DocSection;
  next?: DocSection;
  sections?: Record<string, DocSection>;
};

const GetStarted = ({ intro, flow, next, sections }: Props) => {
  // Hvis sections prop er sat, brug den. Ellers brug de gamle props
  const sectionsToUse = sections
    ? Object.values(sections)
    : [intro, flow, next].filter(Boolean);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl md:text-3xl font-semibold">
        Kom i gang med Arzonic
      </h1>

      {sectionsToUse.map(
        (section, index) =>
          section && (
            <section
              key={section.id || index}
              id={section.slug ?? `section-${index}`}
              className="flex flex-col gap-4"
            >
              <h2 className="text-lg md:text-xl font-bold">{section.title}</h2>
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
      )}
    </div>
  );
};

export default GetStarted;
