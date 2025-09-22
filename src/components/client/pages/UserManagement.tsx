import React from "react";
import { BlockMini } from "@/components/elements/BlockMini";
import { DocSection } from "@/lib/client/types";

type Props = {
  sections?: Record<string, DocSection>;
};

const UserManagement = ({ sections }: Props) => {
  console.log("👥 UserManagement - Received sections:", sections);

  const sectionsToUse = sections ? Object.values(sections) : [];

  return (
    <div className="space-y-10">
      <h1 className="text-2xl md:text-3xl font-semibold">Brugerhåndtering</h1>

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
          <section id="manage">
            <h2 className="text-xl font-bold mb-2">Brugeradministration</h2>
            <p>Tilføj, rediger eller fjern brugere i dit system.</p>
          </section>

          <section id="roles">
            <h2 className="text-xl font-bold mb-2">Roller og tilladelser</h2>
            <p>
              Definér hvilke rettigheder og funktioner forskellige brugertyper
              har.
            </p>
          </section>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
