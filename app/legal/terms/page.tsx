import { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms of Use | Felconis",
  description: "Institutional operating procedures and technical standards for the Felconis ecosystem.",
};

export default function TermsOfUsePage() {
  return <TermsContent />;
}
