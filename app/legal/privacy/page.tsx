import { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Protocol | Felconis",
  description: "Institutional data sovereignty and technical transparency protocols for the Felconis global ecosystem.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyContent />;
}
