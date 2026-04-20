import Nav from "@/components/nav";
import Hero from "@/components/sections/hero";
import Gap from "@/components/sections/gap";
import Workflow from "@/components/sections/workflow";
import WhyNow from "@/components/sections/why-now";
import Outcomes from "@/components/sections/outcomes";
import CmcValue from "@/components/sections/cmc-value";
import CommunityValue from "@/components/sections/community-value";
import Technology from "@/components/sections/technology";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Gap />
        <Workflow />
        <WhyNow />
        <Outcomes />
        <CmcValue />
        <CommunityValue />
        <Technology />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
