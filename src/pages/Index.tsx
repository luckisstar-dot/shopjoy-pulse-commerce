
import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategorySection from '@/components/CategorySection';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';
import Newsletter from '@/components/Newsletter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Fallback loading component
const LoadingFallback = () => (
  <div className="h-32 w-full flex items-center justify-center">
    <div className="animate-pulse text-gray-400">Loading...</div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <Suspense fallback={<LoadingFallback />}>
          <FeaturedProducts />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <CategorySection />
        </Suspense>
        <FeatureSection />
        <TestimonialSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
