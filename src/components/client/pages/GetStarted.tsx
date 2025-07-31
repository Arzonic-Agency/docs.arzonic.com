"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPlay, FaXmark } from "react-icons/fa6";

const GetStarted = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl md:text-3xl font-semibold">
        Introduktion til Arzonic Dashboard
      </h1>

      <section id="intro" className="flex flex-col gap-4">
        <h2 className="text-lg md:text-xl font-bold">Kom godt i gang</h2>
        <p className="text-sm md:text-base">
          Her får du et overblik over, hvad Arzonic Dashboard er og hvordan du
          kommer i gang. Du lærer hvordan menuerne er opbygget, hvor du finder
          funktionerne, og hvordan du kan tilpasse din brugerprofil.
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
          <li>Tilgå dashboardet via dit brugernavn og adgangskode</li>
          <li>Skift sprog, tema og profilindstillinger i topmenuen</li>
          <li>Brug venstremenuen til at navigere mellem siderne</li>
        </ul>
      </section>

      <section id="flow" className="flex flex-col gap-4">
        <h2 className="text-lg md:text-xl font-bold">Sådan fungerer det</h2>
        <p className="text-sm md:text-base">
          Få et visuelt overblik over hvordan de vigtigste arbejdsflows hænger
          sammen. Tryk på videoen herunder for at se en kort intro:
        </p>

        {/* Video preview */}
        <div
          className="relative w-full max-w-lg overflow-hidden rounded-lg cursor-pointer group"
          onClick={openModal}
        >
          <Image
            src="/thumbnail.png"
            alt="Video preview"
            width={855}
            height={481}
            className="w-full h-auto block rounded-lg transition-transform group-hover:scale-101"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all">
            <div className="bg-base-100 bg-opacity-90 rounded-2xl p-3 md:p-5 shadow-lg group-hover:bg-opacity-100 transition-all">
              <FaPlay className="text-xl md:text-3xl text-primary ml-1" />
            </div>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="modal modal-open">
            <div className="modal-box p-0 w-[95%] max-w-6xl overflow-auto relative touch-auto bg-transparent">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 btn btn-circle btn-sm md:btn-lg opacity-50"
              >
                <FaXmark size={24} />
              </button>
              <div className="w-full">
                <video
                  controls
                  autoPlay
                  className="w-full h-full rounded-lg"
                  poster="/thumbnail.png"
                >
                  <source src="/videos/intro.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="modal-backdrop" onClick={closeModal}></div>
          </div>
        )}
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-lg md:text-xl font-bold">Hvad gør du herefter?</h2>
        <p className="text-sm md:text-base">
          Når du har set introduktionsvideoen og forstået flowet i dashboardet,
          kan du gå videre med følgende trin for at komme godt i gang:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
          <li>
            Opret din første nyhed eller opslag via menupunktet “Nyhedsopslag”.
          </li>
          <li>Udforsk brugerstyring og tildel roller til dine medarbejdere.</li>
          <li>
            Tilpas branding under “Indstillinger” så det matcher din virksomhed.
          </li>
        </ol>

        <div className="mt-6 p-4 bg-base-100 rounded-lg shadow-md border border-base-300">
          <p className="text-sm">
            Tip: Du kan altid vende tilbage til denne introduktion ved at klikke
            på “Kom godt i gang” i menuen til venstre.
          </p>
        </div>
      </section>
    </div>
  );
};

export default GetStarted;
