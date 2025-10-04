'use client'

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { TrendingUp, Users, Clock, ArrowRight, Briefcase } from "lucide-react";

interface HeroSectionProps {
  course?: any;
  user?: any;
}

export default function HeroSection({ course, user }: HeroSectionProps) {
  const createPageUrl = (pageName: string) => '/' + pageName.toLowerCase().replace(/ /g, '-');
  
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-28">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div 
            className="space-y-6 sm:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-3 sm:space-y-4" variants={itemVariants}>
              <motion.div variants={itemVariants}>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  Introductory offer is now live
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                variants={itemVariants}
              >
                Master Excel for
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block">
                  Business Success
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-lg"
                variants={itemVariants}
              >
                Work smarter, not harder—master the spreadsheet skills that drive productivity and results for busy professionals and small businesses.
              </motion.p>
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <span className="whitespace-nowrap">For Business Professionals</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <span className="whitespace-nowrap">For Business Owners</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <span className="whitespace-nowrap">Self-Paced Learning</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <span className="whitespace-nowrap">Immediate Results</span>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              variants={itemVariants}
            >
              {user?.has_course_access ? (
                <Link href={createPageUrl("Course")}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl w-full sm:w-auto">
                      Continue Learning
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl w-full sm:w-auto"
                    onClick={scrollToPricing}
                  >
                    Start Learning Today
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                </motion.div>
              )}
              
              <Link href={createPageUrl("Program")}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors w-full sm:w-auto"
                  >
                    The Course
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Business Growth Visual */}
          <motion.div 
            className="relative lg:flex justify-center mt-8 lg:mt-0"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="relative rounded-2xl shadow-2xl overflow-hidden max-w-sm sm:max-w-md w-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop&q=80"
                alt="Business analytics and growth charts"
                className="w-full h-64 sm:h-80 object-cover"
              />
              
              {/* Overlay with growth metrics */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent">
                <motion.div 
                  className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Excel Mastery Results</h3>
                  <div className="space-y-1 sm:space-y-2">
                    <motion.div 
                      className="flex justify-between items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                    >
                      <span className="text-blue-200 text-sm sm:text-base">Productivity Increase</span>
                      <span className="font-bold text-green-300 text-sm sm:text-base">+312%</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                    >
                      <span className="text-blue-200 text-sm sm:text-base">Time Saved Weekly</span>
                      <span className="font-bold text-green-300 text-sm sm:text-base">8+ hours</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                    >
                      <span className="text-blue-200 text-sm sm:text-base">Career Advancement</span>
                      <span className="font-bold text-green-300 text-sm sm:text-base">Accelerated</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              
              {/* Floating success indicator */}
              <motion.div 
                className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
                whileHover={{ scale: 1.1 }}
              >
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">+42% Growth</span>
                <span className="sm:hidden">+42%</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
