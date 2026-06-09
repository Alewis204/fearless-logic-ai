import HeroSection from '../components/HeroSection';
import SocialProofBar from '../components/SocialProofBar';
import HowItWorks from '../components/HowItWorks';
import FeaturesGrid from '../components/FeaturesGrid';
import TemplatesShowcase from '../components/TemplatesShowcase';
import Testimonials from '../components/Testimonials';
import PricingTable from '../components/PricingTable';
import CTASection from '../components/CTASection';
import FAQAccordion from '../components/FAQAccordion';

export default function Home() {
  return (
    <>
      <HeroSection />
      <SocialProofBar />
      <HowItWorks />
      <FeaturesGrid />
      <TemplatesShowcase />
      <Testimonials />
      <PricingTable />
      <CTASection />
      <FAQAccordion />
    </>
  );
}
