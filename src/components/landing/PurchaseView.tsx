'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Crown, ArrowRight, Loader2, BookOpen, Users, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ProductWithLessons } from '@/types';
import CourseOverviewSection from './CourseOverviewSection';

interface PurchaseViewProps {
  user?: any;
  products?: ProductWithLessons[];
}

export default function PurchaseView({ user, products = [] }: PurchaseViewProps) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<string | null>(null);
  const [userPurchases, setUserPurchases] = useState<string[]>([]);
  const [isLoadingPurchases, setIsLoadingPurchases] = useState(false);
  const router = useRouter();

  // Fetch user purchases when session is available
  useEffect(() => {
    const fetchUserPurchases = async () => {
      if (session?.user?.email) {
        setIsLoadingPurchases(true);
        try {
          const response = await fetch('/api/auth/me');
          if (response.ok) {
            const userData = await response.json();
            setUserPurchases(userData.purchased_product_ids || []);
          }
        } catch (error) {
          console.error('Error fetching user purchases:', error);
        } finally {
          setIsLoadingPurchases(false);
        }
      }
    };

    fetchUserPurchases();
  }, [session]);

  // Get the first course (sort_order 1) and complete bundle
  const firstCourse = products.find(p => p.sort_order === 1);
  const completeBundle = products.find(p => p.key?.includes('complete_bundle'));
  const individualCourses = products.filter(p => p.sort_order > 0 && !p.key?.includes('complete_bundle'));

  // Check if user has purchased specific products
  const hasPurchased = (productId: string) => userPurchases.includes(productId);
  const hasPurchasedBundle = hasPurchased(completeBundle?.id || '');
  const hasPurchasedFirstCourse = hasPurchased(firstCourse?.id || '');
  
  // Check if user has any purchases
  const hasAnyPurchases = userPurchases.length > 0;

  const handlePurchase = async (productId: string) => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setLoading(productId);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment-cancel`,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create checkout session');
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process payment. Please try again.';
      alert(`Payment Error: ${errorMessage}`);
    } finally {
      setLoading(null);
    }
  };

  const handleChooseCourse = () => {
    router.push('/choose-course');
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Show loading state while fetching purchases or if no products are loaded
  if ((isLoadingPurchases && session?.user?.email) || products.length === 0) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-slate-600">Loading your courses...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="pricing-section" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            {hasAnyPurchases ? 'Your Learning Journey' : 'Choose Your Learning Path'}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4 sm:px-0">
            {hasAnyPurchases 
              ? 'Continue your Excel mastery journey with additional courses or explore what you\'ve already unlocked.'
              : 'Start with a single course or get the complete bundle. Your journey to Excel mastery begins here.'
            }
          </p>
        </motion.div>

        {/* Three Card Layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          
          {/* Card 1: First Course */}
          {firstCourse && firstCourse.id && (
            <motion.div variants={cardVariants} className="flex">
              <Card className="relative border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl group flex flex-col w-full">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Start Here
                  </Badge>
                </div>
                
                <CardHeader className="pt-8 pb-4 flex-shrink-0">
                  <div className="text-center">
                    <CardTitle className="text-lg font-bold text-slate-900 mb-2">
                      {firstCourse.name}
                    </CardTitle>
                    <p className="text-sm text-slate-600 mb-4">
                      Perfect for beginners
                    </p>
                    
                    <div className="text-center">
                      {firstCourse.display_price && firstCourse.display_price > firstCourse.price ? (
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-slate-400 line-through">
                            ${firstCourse.display_price}
                          </div>
                          <div className="text-3xl font-bold text-green-600">
                            ${firstCourse.price}
                          </div>
                          <div className="text-xs text-green-600 font-semibold">
                            Save ${(firstCourse.display_price - firstCourse.price).toFixed(0)}!
                          </div>
                        </div>
                      ) : (
                        <div className="text-3xl font-bold text-slate-900">${firstCourse.price}</div>
                      )}
                      <div className="text-sm text-slate-500">AUD • One-time payment</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col flex-grow p-6 pt-0">
                  <div className="flex-grow mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3 text-base">What's included:</h4>
                    <ul className="space-y-2">
                      {firstCourse.lessons && Array.isArray(firstCourse.lessons) && firstCourse.lessons.length > 0 ? (
                        <>
                          {firstCourse.lessons.slice(0, 3).map((lesson, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-slate-700">{lesson.title}</span>
                            </li>
                          ))}
                          {firstCourse.lessons.length > 3 && (
                            <li className="text-sm text-slate-500 ml-7">
                              +{firstCourse.lessons.length - 3} more lessons
                            </li>
                          )}
                        </>
                      ) : (
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">Interactive lessons and exercises</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    {hasPurchasedFirstCourse ? (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-base"
                          onClick={() => router.push('/course')}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Access Course
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-base"
                          onClick={() => handlePurchase(firstCourse.id)}
                          disabled={loading === firstCourse.id}
                        >
                          {loading === firstCourse.id ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Star className="w-4 h-4 mr-2" />
                              Get Started - ${firstCourse.price}
                              {firstCourse.display_price && firstCourse.display_price > firstCourse.price && (
                                <span className="text-xs ml-1 line-through text-slate-400">${firstCourse.display_price}</span>
                              )}
                            </>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Card 2: Complete Bundle */}
          {completeBundle && (
            <motion.div 
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="flex"
            >
              <Card className="relative border-2 border-purple-300 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl group flex flex-col w-full">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-semibold">
                    <Crown className="w-4 h-4 mr-2" />
                    Best Value
                  </Badge>
                </div>
                
                <CardHeader className="pt-8 pb-4 flex-shrink-0">
                  <div className="text-center">
                    <CardTitle className="text-lg font-bold text-slate-900 mb-2">
                      {completeBundle.name}
                    </CardTitle>
                    <p className="text-sm text-slate-600 mb-4">
                      Complete mastery package
                    </p>
                    
                    <div className="text-center">
                      {completeBundle.display_price && completeBundle.display_price > completeBundle.price ? (
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-slate-400 line-through">
                            ${completeBundle.display_price}
                          </div>
                          <div className="text-3xl font-bold text-green-600">
                            ${completeBundle.price}
                          </div>
                          <div className="text-xs text-green-600 font-semibold">
                            Save ${(completeBundle.display_price - completeBundle.price).toFixed(0)}!
                          </div>
                        </div>
                      ) : (
                        <div className="text-3xl font-bold text-slate-900">${completeBundle.price}</div>
                      )}
                      <div className="text-sm text-slate-500">AUD • One-time payment</div>
                      {individualCourses.length > 0 && (
                        <div className="text-xs text-green-600 font-semibold mt-1">
                          Save ${individualCourses.reduce((sum, p) => sum + p.price, 0) - completeBundle.price} vs individual courses
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col flex-grow p-6 pt-0">
                  <div className="flex-grow mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3 text-base">Everything included:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">All {individualCourses.length} courses</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">Lifetime access</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">Bonus templates & resources</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">Future updates included</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-auto">
                    {hasPurchasedBundle ? (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-base"
                          onClick={() => router.push('/course')}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Access All Courses
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold text-base"
                          onClick={() => handlePurchase(completeBundle.id)}
                          disabled={loading === completeBundle.id}
                        >
                          {loading === completeBundle.id ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Crown className="w-4 h-4 mr-2" />
                              Get Bundle - ${completeBundle.price}
                                {completeBundle.display_price && completeBundle.display_price > completeBundle.price && (
                                <span className="text-xs ml-1 line-through text-slate-400">${completeBundle.display_price}</span>
                              )}
                            </>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Card 3: Choose Course */}
          <motion.div variants={cardVariants} className="flex">
            <Card className="relative border-2 border-slate-200 hover:border-slate-400 transition-all duration-300 hover:shadow-xl group flex flex-col w-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-slate-600 text-white px-4 py-2 text-sm font-semibold">
                  <Users className="w-4 h-4 mr-2" />
                  Explore
                </Badge>
              </div>
              
              <CardHeader className="pt-8 pb-4 flex-shrink-0">
                <div className="text-center">
                  <CardTitle className="text-lg font-bold text-slate-900 mb-2">
                    Choose Your Course
                  </CardTitle>
                  <p className="text-sm text-slate-600 mb-4">
                    Browse all available courses
                  </p>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">From $15</div>
                    <div className="text-sm text-slate-500">AUD • Per course</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col flex-grow p-6 pt-0">
                <div className="flex-grow mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3 text-base">
                    {hasAnyPurchases ? 'Your courses:' : 'Available courses:'}
                  </h4>
                  <ul className="space-y-3">
                    {individualCourses.slice(0, 3).map((course, index) => {
                      const isPurchased = hasPurchased(course.id);
                      return (
                        <li key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-700">{course.name}</span>
                            {isPurchased && (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <span className={`text-sm font-semibold ${isPurchased ? 'text-green-600' : 'text-slate-900'}`}>
                            {isPurchased ? 'Purchased' : `$${course.price}`}
                          </span>
                        </li>
                      );
                    })}
                    {individualCourses.length > 3 && (
                      <li className="text-sm text-slate-500 text-center">
                        +{individualCourses.length - 3} more courses {hasAnyPurchases ? 'available' : 'available'}
                      </li>
                    )}
                  </ul>
                </div>

                <div className="mt-auto">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-lg font-semibold text-base"
                      onClick={handleChooseCourse}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      {hasAnyPurchases ? 'Browse All Courses' : 'Browse All Courses'}
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-slate-600 mb-4 text-sm sm:text-base px-4 sm:px-0">
            Not sure which option is right for you?
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3"
              onClick={() => router.push('/contact')}
            >
              Contact Us for Help
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
