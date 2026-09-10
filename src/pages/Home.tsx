import React from "react";
import { Hero } from "../components/Hero";
import { TrustBar } from "../components/TrustBar";
import { Services } from "../components/Services";
import { Tours } from "../components/Tours";
import { Destinations } from "../components/Destinations";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Fleet } from "../components/Fleet";
import { Reviews } from "../components/Reviews";
import { About } from "../components/About";
import { MahabaleshwarExperience } from "../components/MahabaleshwarExperience";
import { Gallery } from "../components/Gallery";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";
import { MapSection } from "../components/MapSection";
import { FinalCTA } from "../components/FinalCTA";

interface HomeProps {
  onOpenBookingModal?: (destinationName?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenBookingModal }) => {
  return (
    <div className="flex flex-col">
      <Hero />
      <TrustBar />
      <Services />
      <Tours />
      <Destinations />
      <WhyChooseUs />
      <Fleet />
      <Reviews />
      <About />
      <MahabaleshwarExperience />
      <Gallery onOpenBookingModal={onOpenBookingModal} />
      <FAQ />
      <Contact />
      <MapSection />
      <FinalCTA />
    </div>
  );
};
