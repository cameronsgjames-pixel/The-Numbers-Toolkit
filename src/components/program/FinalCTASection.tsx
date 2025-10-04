'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Transform Excel into Your Career-Defining Strategic Asset
          </h2>
          
          <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
            Stop wasting hours fighting spreadsheets. Start working smarter, faster, and with impact.
          </p>

          <div className="pt-4">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white text-xl px-12 py-6 rounded-xl shadow-2xl"
              onClick={scrollToPricing}
            >
              Get Started Today
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>

          <p className="text-blue-200 text-sm mt-6">
            Instant access • Lifetime updates
          </p>
        </div>
      </div>
    </section>
  );
}
