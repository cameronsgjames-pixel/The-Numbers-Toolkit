'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ProductWithLessons } from '@/types';
import CourseOverviewSection from './CourseOverviewSection';

interface PricingSectionProps {
  user?: any;
}


export default function PricingSection({ user }: PricingSectionProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductWithLessons[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

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

  const handlePurchase = async (productId: string) => {
    if (status === 'loading') {
      return; // Still loading session
    }

    if (!session) {
      // Redirect to sign in if not authenticated
      router.push('/auth/signin');
      return;
    }

    setLoading(productId);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment-cancel`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  if (products.length === 0) return null;

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <CourseOverviewSection products={products} />
      <section id="pricing-section" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Professional Learning Platform
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
            Choose Your Path to 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block sm:inline"> Excel Mastery</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Select individual courses to focus on specific skills, or get the complete bundle for maximum value. 
            All prices include lifetime access with no recurring fees.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products
            .filter(product => product.key !== 'complete_bundle')
            .map((product, index) => {
              const isFirstCourse = index === 0
              const hasIntroPrice = isFirstCourse && product.display_price && product.display_price > product.price
              
              return (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="h-full"
                >
                  <Card className={`h-full flex flex-col border-2 transition-all duration-300 hover:shadow-xl ${
                    isFirstCourse 
                      ? 'border-orange-300 bg-gradient-to-br from-orange-50 to-red-50 shadow-md' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}>
                  <CardHeader className="p-6 pb-4">
                    {isFirstCourse && (
                      <Badge className="w-fit mb-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-3 py-1.5 text-sm shadow-md">
                        <Star className="w-4 h-4 mr-2" />
                        Recommended Start
                      </Badge>
                    )}
                    <CardTitle className="text-xl font-bold text-slate-900 mb-3 leading-tight">{product.name}</CardTitle>
                    <p className="text-sm text-slate-600 leading-relaxed">{product.description || 'Master essential Excel skills with hands-on practice and real-world applications.'}</p>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 flex-grow">
                    {/* Enhanced Pricing Display with Benefits */}
                    {hasIntroPrice ? (
                      <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200 shadow-sm">
                        <div className="text-center">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1.5 animate-pulse"></span>
                            Limited Time Offer
                          </div>
                          <p className="text-sm font-bold text-orange-900 mb-3">
                              Save ${product.display_price! - product.price} - That's {Math.round(((product.display_price! - product.price) / product.display_price!) * 100)}% OFF!
                          </p>
                          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-orange-900">${product.price}</div>
                              <div className="text-xs text-orange-700 font-medium">One-time payment</div>
                            </div>
                            <div className="text-center relative">
                              <div className="text-lg font-bold text-orange-600 line-through relative">
                                ${product.display_price}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-full h-0.5 bg-orange-600"></div>
                                </div>
                              </div>
                              <div className="text-xs text-orange-600">Regular Price</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : product.display_price && product.display_price > product.price ? (
                      <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-center">
                          <p className="text-xs font-medium text-blue-800 mb-2">Special Price - Save ${product.display_price! - product.price}</p>
                          <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-3">
                            <span className="text-2xl font-bold text-blue-900">${product.price}</span>
                            <div className="text-center">
                              <div className="text-sm text-blue-700 line-through">${product.display_price}</div>
                              <div className="text-xs text-blue-600">One-time payment</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2 mb-6">
                        <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                        <span className="text-sm text-slate-500">One-time payment</span>
                      </div>
                    )}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 mb-3 text-sm flex items-center">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                          <Check className="w-4 h-4 text-blue-600" />
                        </div>
                        What's Included:
                      </h4>
                      <ul className="space-y-2">
                        {product.lessons?.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-700 font-medium">{lesson.title}</span>
                          </li>
                        )) || (
                          <li className="text-slate-500 text-xs flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-slate-300 rounded-full animate-pulse"></div>
                            <span>Loading lessons...</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex justify-center"
                    >
                      <Button 
                        size="lg" 
                        className={`w-full text-sm font-semibold py-3 rounded-lg shadow-md transition-all duration-300 ${
                          isFirstCourse 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white' 
                            : 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white'
                        }`}
                        onClick={() => handlePurchase(product.id)}
                        disabled={loading === product.id}
                      >
                        {loading === product.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Star className="w-4 h-4 mr-2" />
                            Get Course - ${product.price}
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
                </motion.div>
              )
            })}
        </motion.div>

        {/* Bundle Section - Full Width at Bottom */}
        {products.find(p => p.key === 'complete_bundle') && (
          <motion.div 
            className="mt-12 sm:mt-16 lg:mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm sm:text-lg font-semibold mb-4 sm:mb-6 shadow-lg">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                Complete Learning Solution
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
                Get <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block sm:inline">Complete Access</span>
              </h3>
              <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                Save $45 and get lifetime access to all courses with bonus materials and future updates included
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ 
                y: -8,
                scale: 1.01,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Card className="border-2 border-blue-300 shadow-2xl max-w-5xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
              <CardHeader className="p-8 text-center">
                <Badge className="w-fit mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base px-4 py-2 shadow-md">
                  <Star className="w-5 h-5 mr-2" />
                  Best Value - Complete Bundle
                </Badge>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                  Complete Excel Mastery Bundle
                </CardTitle>
                <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Get access to all 6 courses: Foundations, Formulas, Functions, Data Analysis, Business Modelling, and Presenting with Impact. 
                  <span className="font-semibold text-blue-600">Save $45 compared to buying individually!</span>
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200 shadow-sm">
                  <div className="text-center">
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-bold mb-3">
                      <Star className="w-4 h-4 mr-2" />
                      Save $45 - That's 26% OFF!
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-900">${products.find(p => p.key === 'complete_bundle')?.price}</div>
                        <div className="text-sm text-blue-700 font-medium">One-time payment</div>
                        <div className="text-xs text-blue-600 mt-1">Bundle Price</div>
                      </div>
                      <div className="text-center relative">
                        <div className="text-xl font-bold text-slate-500 line-through relative">
                          $174
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-slate-500"></div>
                          </div>
                        </div>
                        <div className="text-sm text-slate-500 mt-1">Individual Purchase</div>
                        <div className="text-xs text-slate-400">(6 courses × $29 each)</div>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-white/80 rounded border border-blue-200">
                      <p className="text-xs text-blue-800 font-semibold">
                        🎯 Complete learning journey • 💰 Best value • 🔒 Lifetime access
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-white/50 rounded-lg border border-blue-100">
                    <h4 className="font-bold text-slate-900 mb-3 text-sm flex items-center">
                      <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <Check className="w-4 h-4 text-green-600" />
                      </span>
                      What's Included:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-slate-700 font-medium">All 6 Individual Courses</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-slate-700 font-medium">24+ Professional Lessons</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-slate-700 font-medium">Practice Workbooks & Templates</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-bold text-slate-900 mb-3 text-sm flex items-center">
                      <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-green-600 font-bold text-sm">💰</span>
                      </span>
                      Your Benefits:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">$</span>
                        </div>
                        <span className="text-xs text-slate-700 font-medium">Save $45 vs Individual Purchase</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">∞</span>
                        </div>
                        <span className="text-xs text-slate-700 font-medium">Lifetime Access</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">🎯</span>
                        </div>
                        <span className="text-xs text-slate-700 font-medium">Complete Learning Path</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-blue-200">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex justify-center"
                >
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm py-4 rounded-lg shadow-md font-semibold transition-all duration-300"
                    onClick={() => handlePurchase(products.find(p => p.key === 'complete_bundle')!.id)}
                    disabled={loading === products.find(p => p.key === 'complete_bundle')?.id}
                  >
                    {loading === products.find(p => p.key === 'complete_bundle')?.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Star className="w-4 h-4 mr-2" />
                        Get Complete Bundle - ${products.find(p => p.key === 'complete_bundle')?.price}
                      </>
                    )}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
            </motion.div>
          </motion.div>
        )}
        
        {/* Professional Footer */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-200 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-8">
              <div className="flex items-center space-x-2 text-slate-600">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-sm sm:text-base font-medium">One-time payment, no recurring fees</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-sm sm:text-base font-medium">Lifetime access included</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-sm sm:text-base font-medium">30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </section>
    </>
  );
}
