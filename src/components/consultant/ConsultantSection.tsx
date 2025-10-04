'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Hand, Sparkles, Clock, Shield, Users, Star, Send, CheckCircle, MessageCircle } from 'lucide-react';
import QuoteRequestForm from './QuoteRequestForm';

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

const steps = [
  {
    number: 1,
    text: "Submit your query using the form below.",
    icon: Send,
    color: "from-blue-500 to-indigo-600"
  },
  {
    number: 2,
    text: "I'll personally review it and send you a fixed quote.",
    icon: CheckCircle,
    color: "from-emerald-500 to-teal-600"
  },
  {
    number: 3,
    text: "Once you approve, we'll schedule a session or I'll complete the work for you.",
    icon: MessageCircle,
    color: "from-purple-500 to-pink-600"
  }
];

const benefits = [
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Get your quote within 24 hours"
  },
  {
    icon: Shield,
    title: "No Obligation",
    description: "Free quote with no commitment required"
  },
  {
    icon: Users,
    title: "Personal Touch",
    description: "Direct access to the course creator"
  },
  {
    icon: Star,
    title: "Expert Solution",
    description: "Tailored to your specific Excel challenge"
  }
];

interface ConsultantSectionProps {
  autoShowForm?: boolean;
}

export default function ConsultantSection({ autoShowForm = false }: ConsultantSectionProps) {
  const [showForm, setShowForm] = useState(autoShowForm);
  const [isVisible, setIsVisible] = useState(false);
  const visibleElements = useScrollAnimation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (autoShowForm) {
      setShowForm(true);
      // Scroll to the form after a short delay to ensure it's rendered
      setTimeout(() => {
        const formElement = document.getElementById('consultant-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [autoShowForm]);

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 sm:py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          id="consultant-header"
          data-animate
          className={`text-center mb-16 transition-all duration-1000 ${
            visibleElements.has('consultant-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative inline-block">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-6 shadow-2xl transform hover:scale-110 transition-all duration-300">
              <Hand className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-4 h-4 text-yellow-800" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent tracking-tight mb-6">
            1-on-1 Consults
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Need personalised Excel help beyond the course? Get direct access to the course creator for 
            <span className="font-semibold text-blue-600"> tailored solutions</span> to your specific challenges.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              id={`benefit-${index}`}
              data-animate
              className={`group transition-all duration-700 ${
                visibleElements.has(`benefit-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-600">{benefit.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div 
          id="how-it-works"
          data-animate
          className={`transition-all duration-1000 ${
            visibleElements.has('how-it-works') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Card className="mb-8 shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">How it works</h3>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 bg-gradient-to-br ${step.color} text-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-700 text-base leading-relaxed group-hover:text-slate-900 transition-colors duration-300">
                        {step.text}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden sm:block w-8 h-0.5 bg-gradient-to-r from-slate-300 to-transparent ml-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Button */}
        <div 
          id="consultant-cta"
          data-animate
          className={`text-center mb-12 transition-all duration-1000 ${
            visibleElements.has('consultant-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button
            onClick={() => setShowForm(true)}
            size="lg"
            className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <span>Request a Consult</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
          </Button>
        </div>

        {/* Quote Form */}
        {showForm && (
          <div id="consultant-form" className="animate-in slide-in-from-bottom-8 duration-700 ease-out">
            <QuoteRequestForm onClose={() => setShowForm(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
