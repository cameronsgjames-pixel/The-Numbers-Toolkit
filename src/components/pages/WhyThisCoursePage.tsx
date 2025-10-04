'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Lightbulb, Zap, Target, Heart, MessageCircle } from 'lucide-react';
import TestimonialsSlider from '../ui/TestimonialsSlider';
import ConsultantSection from '../consultant/ConsultantSection';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => {
              const newSet = new Set(prev);
              newSet.add(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements with data-animate attribute
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return visibleElements;
};

const faqItems = [
  { question: "Do I need prior Excel experience?", answer: "No. Week 1 starts with foundations, and each lesson builds step by step." },
  { question: "How is the course delivered?", answer: "100% online, self-paced. You’ll get access to the right tools to make you learn" },
  { question: "How long will I have access?", answer: "Lifetime access. Once you buy, you can revisit anytime." },
  { question: "What if I only want to try Week 1?", answer: "Week 1 is available as a discounted intro offer. If you upgrade later, your payment goes towards the full course." },
];

const corePrinciples = [
    { 
      icon: Zap, 
      title: "Save Time, Reduce Errors", 
      description: "This course exists to give you the shortcuts, formulas, and strategies that turn hours of manual work into minutes of automated flow. It's about working smarter, not harder.",
      color: "from-emerald-500 to-teal-600"
    },
    { 
      icon: Target, 
      title: "Practical, Business-Focused Skills", 
      description: "Forget abstract theories. Every lesson is built around real-world business problems so you can apply what you learn to your job the very next day. No jargon, no filler.",
      color: "from-blue-500 to-indigo-600"
    },
    { 
      icon: Heart, 
      title: "Built for the Everyday Professional", 
      description: "This program was created after seeing countless talented people held back by spreadsheets. This course is for business owners and professionals who know Excel is important but were never shown how to use it properly.",
      color: "from-purple-500 to-pink-600"
    },
]

const allTestimonials = [
  { 
    id: "1",
    quote: "Saved me ~4 hours a week—now I'm the Excel go-to at work.", 
    name: "Jasmine K.", 
    role: "Marketing Analyst",
    company: "TechCorp",
    content: "Saved me ~4 hours a week—now I'm the Excel go-to at work.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  { 
    id: "2",
    quote: "Finally understand PivotTables. Built my first weekly sales dashboard in an hour.", 
    name: "Tim R.", 
    role: "Retail Ops Lead",
    company: "Retail Corp",
    content: "Finally understand PivotTables. Built my first weekly sales dashboard in an hour.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  { 
    id: "3",
    quote: "Shortcuts + clean formatting = instant productivity boost.", 
    name: "Priya M.", 
    role: "Graduate Accountant",
    company: "Finance Co",
    content: "Shortcuts + clean formatting = instant productivity boost.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  { 
    id: "4",
    quote: "The case studies feel like real work, not theory.", 
    name: "Sam H.", 
    role: "Project Coordinator",
    company: "Project Inc",
    content: "The case studies feel like real work, not theory.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  { 
    id: "5",
    quote: "I automated a painful monthly report and got kudos from the GM.", 
    name: "Lauren B.", 
    role: "Business Analyst",
    company: "Business Corp",
    content: "I automated a painful monthly report and got kudos from the GM.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  { 
    id: "6",
    quote: "Clear, practical, and zero fluff. Wish I did this years ago.", 
    name: "Marcus P.", 
    role: "Operations Manager",
    company: "Operations Ltd",
    content: "Clear, practical, and zero fluff. Wish I did this years ago.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  { 
    id: "7",
    quote: "I stopped Googling formulas—now I actually understand them.", 
    name: "Nina D.", 
    role: "Graduate Consultant",
    company: "Consulting Group",
    content: "I stopped Googling formulas—now I actually understand them.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  { 
    id: "8",
    quote: "Built a KPI tracker that my whole team uses.", 
    name: "Ethan L.", 
    role: "Customer Success",
    company: "Success Corp",
    content: "Built a KPI tracker that my whole team uses.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  }
];

export default function WhyThisCoursePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [showConsultantForm, setShowConsultantForm] = useState(false);
  const visibleElements = useScrollAnimation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultantClick = () => {
    setShowConsultantForm(true);
    // Scroll to consultant section after a brief delay
    setTimeout(() => {
      const consultantSection = document.getElementById('consultant-section');
      if (consultantSection) {
        consultantSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        </div>
        
        <div className={`relative py-12 sm:py-16 lg:py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent tracking-tight mb-4">
              Built for One Reason: Your Success
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              This isn't just another Excel course. It was created to solve a real problem: talented professionals wasting time on tasks that should be simple.
            </p>
          </div>
        </div>
      </div>
      
      {/* Core Principles */}
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="principles-title"
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleElements.has('principles-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
              Why This Course Works
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Three core principles that make this course different from everything else out there
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {corePrinciples.map((principle, index) => (
              <div 
                key={index}
                id={`principle-${index}`}
                data-animate
                className={`group transition-all duration-700 ${
                  visibleElements.has(`principle-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${principle.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <principle.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-semibold text-slate-900">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <p className="text-slate-600 leading-relaxed">{principle.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12 sm:py-16 lg:py-20 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="faq-title"
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleElements.has('faq-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
              Your Questions, Answered
            </h2>
            <p className="text-slate-600">Everything you need to know before getting started</p>
          </div>
          
          <Card 
            id="faq-card"
            data-animate
            className={`border-0 shadow-xl bg-white/80 backdrop-blur-sm transition-all duration-1000 ${
              visibleElements.has('faq-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <CardContent className="p-2">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className={`border-b border-slate-100 last:border-b-0 transition-all duration-300 hover:bg-slate-50/50`}
                  >
                    <AccordionTrigger className="text-base sm:text-lg font-medium text-left px-4 sm:px-6 py-4 hover:bg-slate-50/50 transition-colors duration-200">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-slate-600 px-4 sm:px-6 pb-4 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="testimonials-title"
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleElements.has('testimonials-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
              What Professionals Are Saying
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Real results from real professionals who've transformed their productivity
            </p>
          </div>
          <div 
            id="testimonials-slider"
            data-animate
            className={`transition-all duration-1000 ${
              visibleElements.has('testimonials-slider') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <TestimonialsSlider testimonials={allTestimonials} />
          </div>
        </div>
      </div>

      {/* 1-on-1 Consultant Section */}
      <div id="consultant-section">
        <ConsultantSection autoShowForm={showConsultantForm} />
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-20 w-60 h-60 bg-blue-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 -left-20 w-60 h-60 bg-indigo-500/20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            id="cta-content"
            data-animate
            className={`transition-all duration-1000 ${
              visibleElements.has('cta-content') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-6">
              Ready to Work Smarter?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Stop letting spreadsheets slow you down. Invest in the skills that will pay dividends for the rest of your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/program" onClick={scrollToTop}>
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-8 py-4 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                  View the Full Program
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button 
                onClick={handleConsultantClick}
                variant="outline" 
                size="lg"
                className="border-white/50 text-white bg-white/10 hover:bg-white/20 text-lg px-8 py-4 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Personal Help
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
