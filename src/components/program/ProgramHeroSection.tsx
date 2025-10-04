'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-snug">
                From Spreadsheet Stress to
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block">
                  Strategic Asset
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                This isn't just another Excel course about memorising formulas. It's a business productivity system designed to change the way you work.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 rounded-xl"
                onClick={scrollToPricing}
              >
                Unlock Excel Mastery
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Compact Powerful Dashboard Preview */}
          <div className="relative lg:flex justify-center">
            <div className="relative bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl shadow-2xl max-w-xs w-full border border-slate-100 transform hover:scale-105 transition-transform duration-300">
              <div className="space-y-4">
                {/* Compact Header */}
                <div className="flex items-center space-x-2 pb-3 border-b border-slate-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-600 font-medium">Live Excel Dashboard</span>
                </div>
                
                {/* Main Metric - Eye-catching */}
                <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <div className="text-xs text-slate-600 font-medium mb-1">Productivity Boost</div>
                  <div className="font-bold text-green-600 text-3xl">312%</div>
                  <div className="flex items-center justify-center text-green-600 text-xs font-medium mt-1">
                    <span className="text-green-500 text-lg">↗</span>
                    <span className="ml-1">ROI Increase</span>
                  </div>
                </div>
                
                {/* Compact Metrics Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
                    <div className="text-xs text-slate-600 mb-1">Time Saved</div>
                    <div className="font-bold text-blue-600 text-lg">6hrs/wk</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 text-center">
                    <div className="text-xs text-slate-600 mb-1">Accuracy</div>
                    <div className="font-bold text-purple-600 text-lg">99.8%</div>
                  </div>
                </div>

                {/* Mini Trend Line */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-xs font-medium text-slate-700 mb-2">Weekly Progress</div>
                  <div className="flex items-end justify-between h-8 space-x-1">
                    {[30, 45, 60, 80, 95, 100].map((height, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm flex-1"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
                Automated
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
