'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Play, BarChart3, TrendingUp, Target, Zap, Award } from 'lucide-react';
import { ProductWithLessons } from '@/types';

interface CourseOverviewSectionProps {
  products?: ProductWithLessons[];
}

export default function CourseOverviewSection({ products: propProducts }: CourseOverviewSectionProps) {
  const [products, setProducts] = useState<ProductWithLessons[]>([]);

  useEffect(() => {
    if (propProducts) {
      setProducts(propProducts);
    } else {
      loadProducts();
    }
  }, [propProducts]);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products?include_lessons=true');
      if (response.ok) {
        const productsData = await response.json();
        setProducts(productsData);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  if (products.length === 0) return null;

  // Filter out the complete bundle for individual course display
  const individualCourses = products.filter(product => product.key !== 'complete_bundle');

  // Get appropriate icon for each course
  const getCourseIcon = (index: number) => {
    const icons = [Play, BarChart3, TrendingUp, Target, Zap, Award];
    return icons[index] || Award;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            A 6-Course Program to Master Excel
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Each course is designed to build upon the last, transforming you into a highly proficient Excel user.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {individualCourses.map((product, index) => {
            const isFirstCourse = index === 0;
            const CourseIcon = getCourseIcon(index);
            const hasIntroPrice = isFirstCourse && product.display_price && product.display_price > product.price;

            return (
              <motion.div
                key={product.id}
                variants={cardVariants}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className={`h-full flex flex-col border-2 transition-all duration-300 hover:shadow-xl ${
                  isFirstCourse ? 'border-orange-200 bg-orange-50/30' : 'border-slate-200 bg-white'
                }`}>
                <CardHeader className="p-6 flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isFirstCourse ? 'bg-orange-500' : 'bg-slate-600'
                      }`}>
                        <CourseIcon className="w-5 h-5 text-white" />
                      </div>
                      <Badge className={`${
                        isFirstCourse 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        Course {index + 1}
                      </Badge>
                    </div>
                    {isFirstCourse && (
                      <Badge className="bg-orange-600 text-white">
                        Start Here
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                    {product.name}
                  </CardTitle>
                  
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Intro Pricing Display for First Course */}
                  {hasIntroPrice && (
                    <div className="mt-4 p-3 bg-orange-100 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-orange-800">Intro Price - Save ${product.display_price! - product.price}</p>
                          <p className="text-xs text-orange-700">Course 1 – Starter Pack</p>
                          <p className="text-xs text-orange-600">Get started with the fundamentals.</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-900">${product.price}</div>
                          <div className="text-sm text-orange-700 line-through">${product.display_price}</div>
                          <div className="text-xs text-orange-600">AUD</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="p-6 pt-0 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    {/* Key Topics */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-3 text-sm">
                        What You'll Learn:
                      </h4>
                      <ul className="space-y-2">
                        {product.lessons && product.lessons.length > 0 ? (
                          <>
                            {product.lessons.slice(0, 4).map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="flex items-start space-x-3">
                                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-700 text-sm line-clamp-2">{lesson.title}</span>
                              </li>
                            ))}
                            {product.lessons.length > 4 && (
                              <li className="text-slate-500 text-sm ml-7">
                                +{product.lessons.length - 4} more lessons
                              </li>
                            )}
                          </>
                        ) : (
                          <li className="flex items-start space-x-3">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700 text-sm">Interactive lessons and exercises</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
