import Navbar from '@/components/feature/Navbar';
import HeroSection from '@/pages/home/components/HeroSection';
import InteractiveOfficeSection from '@/pages/home/components/InteractiveOfficeSection';
import FeatureGrid from '@/pages/home/components/FeatureGrid';
import HowItWorksPreview from '@/pages/home/components/HowItWorksPreview';
import BookingGrid from '@/pages/home/components/BookingGrid';
import PrivacyTrustSection from '@/pages/home/components/PrivacyTrustSection';
import EnterprisePreview from '@/pages/home/components/EnterprisePreview';
import CTASection from '@/pages/home/components/CTASection';
import TestimonialsSection from '@/pages/home/components/TestimonialsSection';
import Footer from '@/components/feature/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <HeroSection />
        <InteractiveOfficeSection />
        <FeatureGrid />
        <HowItWorksPreview />
        <BookingGrid />
        <PrivacyTrustSection />
        <EnterprisePreview />
        <CTASection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}