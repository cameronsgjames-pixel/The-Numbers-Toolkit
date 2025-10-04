'use client'

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
// import { createPageUrl } from "@/lib/utils";
import { 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Clock, 
  Award, 
  Star,
  ArrowRight,
  BookOpen,
  Target
} from "lucide-react";

import HeroSection from "../landing/HeroSection";
import BenefitsSection from "../landing/BenefitsSection";
import PurchaseView from "../landing/PurchaseView";
import TestimonialsCarousel from "../landing/TestimonialsCarousel";
import AnimatedSection from "../ui/AnimatedSection";
export default function LandingPage() {
  const createPageUrl = (pageName: string) => '/' + pageName.toLowerCase().replace(/ /g, '-');
  
  const [products, setProducts] = useState<any[]>([]);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load real products from API with lessons included
      const response = await fetch('/api/products?include_lessons=true');
      if (response.ok) {
        const productsData = await response.json();
        setProducts(productsData);
      }
      
      // Load user data if available
      const userResponse = await fetch('/api/auth/me');
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <HeroSection course={products.find(p => p.key === 'complete_bundle')} user={user} />
      <AnimatedSection><BenefitsSection /></AnimatedSection>
      <AnimatedSection><PurchaseView user={user} products={products} /></AnimatedSection>
      <AnimatedSection><TestimonialsCarousel /></AnimatedSection>
    </div>
  );
}
