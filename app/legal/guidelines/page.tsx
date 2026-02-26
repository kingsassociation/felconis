import { Metadata } from "next";
import GuidelinesContent from "./GuidelinesContent";

export const metadata: Metadata = {
  title: "Partner Guidelines | Felconis",
  description: "Institutional code of conduct and strategic alignment protocols for the Felconis Partner Network.",
};

export default function PartnerGuidelinesPage() {
  return <GuidelinesContent />;
}
