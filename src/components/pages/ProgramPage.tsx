'use client'

import React, { useState, useEffect } from "react";

import ProgramHeroSection from "../program/ProgramHeroSection";
import HiddenCostSection from "../program/HiddenCostSection";
import PayoffSection from "../program/PayoffSection";
import WhoIsThisFor from "../program/WhoIsThisFor";
import WhyDifferentSection from "../program/WhyDifferentSection";
import CourseOverview from "../landing/CourseOverview";
import PricingSection from "../landing/PricingSection";
import FinalCTASection from "../program/FinalCTASection";
import AnimatedSection from "../ui/AnimatedSection";
import SupportWidget from "../pricing/SupportWidget";

export default function ProgramPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Mock user data - replace with actual user check
      setUser(null);
    } catch (error) {
      console.error("Error loading course data:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ProgramHeroSection />
      <AnimatedSection><HiddenCostSection /></AnimatedSection>
      <AnimatedSection><PayoffSection /></AnimatedSection>
      <AnimatedSection><WhoIsThisFor /></AnimatedSection>
      <AnimatedSection><WhyDifferentSection /></AnimatedSection>
      <AnimatedSection><CourseOverview /></AnimatedSection>
      <PricingSection user={user} />
      <AnimatedSection><FinalCTASection /></AnimatedSection>
      <SupportWidget />
    </div>
  );
}
