import HeroSection from '@/src/components/HeroSection';
import SocialProofBar from '@/src/components/SocialProofBar';
import HowItWorks from '@/src/components/HowItWorks';
import FeaturesGrid from '@/src/components/FeaturesGrid';
import TemplatesShowcase from '@/src/components/TemplatesShowcase';
import Testimonials from '@/src/components/Testimonials';
import PricingTable from '@/src/components/PricingTable';
import CTASection from '@/src/components/CTASection';
import FAQAccordion from '@/src/components/FAQAccordion';

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
