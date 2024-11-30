import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Dashboard",
  description: "Discover with Bangladesh's Best Green Architecture Firm IQ ARCHITECTS LTD for innovative architecture and stunning landscape design. Explore our expertise in planning, decoration, interior, exterior and building design for your dream space.",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <AdminDashboard />
      </DefaultLayout>
    </>
  );
}
