'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  { quote: "Saved me ~4 hours a week—now I'm the Excel go-to at work.", name: "Jasmine K.", role: "Marketing Analyst" },
  { quote: "Finally understand PivotTables. Built my first weekly sales dashboard in an hour.", name: "Tim R.", role: "Retail Ops Lead" },
  { quote: "Shortcuts + clean formatting = instant productivity boost.", name: "Priya M.", role: "Graduate Accountant" },
  { quote: "The case studies feel like real work, not theory.", name: "Sam H.", role: "Project Coordinator" },
  { quote: "I automated a painful monthly report and got kudos from the GM.", name: "Lauren B.", role: "Business Analyst" },
  { quote: "Clear, practical, and zero fluff. Wish I did this years ago.", name: "Marcus P.", role: "Operations Manager" },
  { quote: "I stopped Googling formulas—now I actually understand them.", name: "Nina D.", role: "Graduate Consultant" },
  { quote: "Built a KPI tracker that my whole team uses.", name: "Ethan L.", role: "Customer Success" }
];

const TestimonialCard = ({ quote, name, role }: { quote: string; name: string; role: string }) => (
  <motion.div 
    className="flex-shrink-0 w-[85%] sm:w-[90%] md:w-[400px] bg-white rounded-2xl shadow-lg p-6 sm:p-8 mx-2 sm:mx-4 border border-slate-100"
    whileHover={{ 
      y: -5,
      transition: { duration: 0.2 }
    }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200 mb-3 sm:mb-4" />
    </motion.div>
    <p className="text-base sm:text-lg text-slate-800 leading-relaxed mb-4 sm:mb-6">"{quote}"</p>
    <div className="text-right">
      <h4 className="font-bold text-slate-900 text-sm sm:text-base">{name}</h4>
      <p className="text-xs sm:text-sm text-slate-500">{role}</p>
    </div>
  </motion.div>
);

export default function TestimonialsCarousel() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            Trusted by Professionals Across Industries
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-12 sm:mb-16 px-4 sm:px-0">
            See how this program has boosted productivity and delivered real results.
          </p>
        </motion.div>
      </div>
      <div 
        className="w-full overflow-hidden relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <motion.div
          className="flex"
          animate={{
            x: ['0%', '-50%'],
            transition: {
              ease: 'linear',
              duration: 40,
              repeat: Infinity,
            }
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
