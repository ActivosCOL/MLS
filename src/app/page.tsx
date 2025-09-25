import MainBanner from "@/components/Banner/MainBanner";
import { CompanyCarousel } from "@/components/CompanyCarousel";
import { Benefits } from "@/components/Benefits";
/* import ColombiaMap from "@/components/ColombiaMap/ColombiaMap"; */

import PrincipalLayout from "@/components/layout/PrincipalLayout";
import JoinNetworkSection from "@/components/know/JoinNetworkSection";
import ExpertSection from "@/components/know/ExpertSection";



export default function Home() {
  return (
    <main>
      <PrincipalLayout>
        <MainBanner />
        <Benefits />
  {/*       <ColombiaMap /> */}
        <ExpertSection />
        <JoinNetworkSection />
        <CompanyCarousel />
      </PrincipalLayout>
    </main>
  );
}
