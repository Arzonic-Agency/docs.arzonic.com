import { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "Arzonic Docs",
  description:
    "Vi tilbyder skræddersyede løsninger til dine behov, uanset om det er en simpel hjemmeside eller en kompleks webapplikation. Vores team af eksperter er klar til at hjælpe dig med at realisere dine digitale drømme.",
};

export default function Page() {
  return <HomePage />;
}