'use client'

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { BookOpen, ArrowRight, Lock, Download, Award, User as UserIcon, Trophy, LogIn, CheckCircle, Star, Target, ChevronDown, ChevronUp } from "lucide-react";
import { useSession, signIn } from 'next-auth/react';
import { UserWithProgress, ProductWithLessons } from "@/types";
import { useUser } from '@/hooks/useUser';
import { useUserStore } from '@/store/useUserStore';

import CoursePurchaseCard from "../course/CoursePurchaseCard";
import CompleteBundleCard from "../course/CompleteBundleCard";
import BundleCard from "../course/BundleCard";
import ProductCard from "../course/ProductCard";

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Login Required Component
const LoginRequired = ({ onLogin }: { onLogin: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
    <Card className="max-w-lg border-none shadow-2xl">
      <CardContent className="p-8 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <UserIcon className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Member Portal Access
        </h2>
        <p className="text-lg text-slate-600 mb-6">
          Sign in to access your personalized learning dashboard, course progress, and exclusive member resources.
        </p>
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
            <BookOpen className="w-4 h-4" />
            <span>Track your course progress</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
            <Download className="w-4 h-4" />
            <span>Access practice files & resources</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
            <Award className="w-4 h-4" />
            <span>Earn certificates & badges</span>
          </div>
        </div>
        <Button
          onClick={onLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
        >
          <LogIn className="w-5 h-5 mr-2" />
          Sign In to Member Portal
        </Button>
        <p className="text-sm text-slate-500 mt-4">
          New to Excel Mastery? <Link href="/" className="text-blue-600 hover:underline">Learn more about the program</Link>
        </p>
      </CardContent>
    </Card>
  </div>
);

// Success Message Component
const SuccessMessage = () => (
  <div className="mb-6">
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-green-900">Payment Successful!</h3>
        <p className="text-green-700 text-sm">Your access has been unlocked. Welcome to the program!</p>
      </div>
    </div>
  </div>
);

// Dashboard Header Component
const DashboardHeader = ({ user, hasAccess }: { user: any; hasAccess: boolean }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name?.split(' ')[0] || 'Member'}
        </h1>
        <p className="text-gray-600 mt-2">
          {hasAccess 
            ? `You have access to ${user.purchased_product_ids?.length || 0} course${(user.purchased_product_ids?.length || 0) > 1 ? 's' : ''}`
            : 'Choose your courses to get started'
          }
        </p>
      </div>
      {hasAccess && (
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-700">Active Member</span>
        </div>
      )}
    </div>
  </div>
);

// Progress Stats Component
const ProgressStats = ({ user }: { user: any }) => (
  <div className="grid md:grid-cols-3 gap-6 mb-8">
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-900">
              {user.progress ? Object.keys(user.progress).length : 0}
            </p>
            <p className="text-blue-700 font-medium">Lessons Completed</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-900">
              {user.badges?.length || 0}
            </p>
            <p className="text-green-700 font-medium">Achievements</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-900">
              {user.purchased_product_ids?.length || 0}
            </p>
            <p className="text-purple-700 font-medium">Courses Owned</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// My Courses Section Component
const MyCoursesSection = ({ user, products }: { user: any; products: ProductWithLessons[] }) => {
  const ownedProducts = user.purchased_product_ids?.map((productId: string) => 
    products.find(p => p.id === productId)
  ).filter((product: ProductWithLessons | undefined): product is ProductWithLessons => product !== undefined) || [];

  if (ownedProducts.length === 0) return null;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-xl">
          <BookOpen className="w-6 h-6" />
          <span>My Courses</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ownedProducts.map((product: ProductWithLessons) => (
            <div key={product.id} className="p-4 bg-green-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{product.sort_order}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {product.name}
                  </h4>
                  <p className="text-xs text-green-600">Access granted</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Available Courses Section Component
const AvailableCoursesSection = ({ user, products, onPurchase }: { 
  user: any; 
  products: ProductWithLessons[]; 
  onPurchase: (productId: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const availableProducts = products.filter(product => 
    !user.purchased_product_ids?.includes(product.id)
  );

  if (availableProducts.length === 0) return null;

  const individualCourses = availableProducts.filter(product => 
    !product.key?.includes('complete_bundle')
  );
  const bundleProduct = availableProducts.find(product => 
    product.key?.includes('complete_bundle')
  );

  return (
    <Card>
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="flex items-center justify-between text-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <span>Expand Your Learning</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {availableProducts.length} available
            </span>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </div>
          </div>
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Add more courses to your collection and unlock new skills
        </p>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          {individualCourses.length > 0 && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
              {individualCourses.map((product) => (
                <CoursePurchaseCard
                  key={product.id}
                  product={product}
                  user={user}
                  onPurchase={onPurchase}
                />
              ))}
            </div>
          )}
          
          {bundleProduct && (
            <div className="mt-6">
              <CompleteBundleCard
                key={bundleProduct.id}
                product={bundleProduct}
                user={user}
                onPurchase={onPurchase}
                allProducts={products}
              />
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

// Quick Actions Component
const QuickActions = () => (
  <div className="grid md:grid-cols-2 gap-6 mt-8">
    <Link href="/profile" className="block">
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
            <UserIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">My Profile</h3>
          <p className="text-gray-600 text-sm">View progress and manage account</p>
        </CardContent>
      </Card>
    </Link>

    <Link href="/achievements" className="block">
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
            <Award className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Achievements</h3>
          <p className="text-gray-600 text-sm">Track learning milestones</p>
        </CardContent>
      </Card>
    </Link>
  </div>
);

// Main CoursePage Component
export default function CoursePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const { setUser } = useUserStore();
  const [products, setProducts] = useState<ProductWithLessons[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setShowSuccessMessage(true);
      // Clear the URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    loadData();
  }, [session]);

  const loadData = async () => {
    await loadProducts();
  };

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products?include_lessons=true');
      if (response.ok) {
        const productsData = await response.json();
        setProducts(productsData);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await signIn('google');
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handlePurchase = (productId: string) => {
    router.push(`/checkout?product=${productId}`);
  };

  // Loading state
  if (loading || userLoading) {
    return <LoadingSpinner />;
  }

  // Login required
  if (!user) {
    return <LoginRequired onLogin={handleLogin} />;
  }

  const hasAnyAccess = user?.purchased_product_ids && user.purchased_product_ids.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Success Message */}
        {showSuccessMessage && <SuccessMessage />}

        {/* Dashboard Header */}
        <DashboardHeader user={user} hasAccess={hasAnyAccess} />

        {/* Main Content */}
        {hasAnyAccess ? (
          <div className="space-y-8">
            {/* Progress Stats */}
            <ProgressStats user={user} />

            {/* My Courses Section */}
            <Card className="mb-8 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
              </div>
                  <CardTitle className="text-3xl font-bold text-green-900">
                    My Courses
                  </CardTitle>
              </div>
                <p className="text-green-700 text-lg">
                  Continue your learning journey with these courses
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {products
                    .filter(product => user.purchased_product_ids?.includes(product.id))
                    .map((product) => (
                      <Card key={product.id} className="border-2 border-green-200 bg-white hover:shadow-lg transition-all duration-300 group">
                        <CardContent className="p-4 sm:p-6">
                          {/* Mobile Layout */}
                          <div className="flex flex-col sm:hidden space-y-3">
                            {/* Course Header */}
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-700 transition-colors">
                                <span className="text-white font-bold text-lg">{product.sort_order}</span>
              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-800 transition-colors">
                                  {product.name}
                                </h3>
                                <div className="flex items-center space-x-3 text-sm mt-1">
                                  <div className="flex items-center space-x-1 text-green-600">
                                    <BookOpen className="w-3 h-3" />
                                    <span>{product.lessons?.length || 0} lessons</span>
            </div>
                                  <div className="flex items-center space-x-1 text-blue-600">
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Access granted</span>
                    </div>
                  </div>
                    </div>
                  </div>
                            
                            {/* Course Description */}
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {product.description || 'No description available'}
                            </p>
                            
                            {/* Action Button - Full Width on Mobile */}
                            <Link href={`/product?product=${product.id}`} className="w-full">
                              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold group-hover:scale-105 transition-all duration-300">
                                <span>Start Course</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                    </div>
                          
                          {/* Desktop Layout */}
                          <div className="hidden sm:flex items-center space-x-4">
                            {/* Course Icon */}
                            <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-700 transition-colors">
                              <span className="text-white font-bold text-xl">{product.sort_order}</span>
            </div>

                            {/* Course Info */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-gray-600 mb-3 line-clamp-2">
                                {product.description || 'No description available'}
                              </p>
                              
                              {/* Course Stats */}
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-1 text-green-600">
                                  <BookOpen className="w-4 h-4" />
                                  <span>{product.lessons?.length || 0} lessons</span>
                          </div>
                                <div className="flex items-center space-x-1 text-blue-600">
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Access granted</span>
                          </div>
                        </div>
                      </div>
                            
                            {/* Action Button */}
                            <div className="flex-shrink-0">
                              <Link href={`/product?product=${product.id}`}>
                                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold group-hover:scale-105 transition-all duration-300">
                                  <span>Start Course</span>
                                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                              </Link>
                            </div>
                </div>
              </CardContent>
            </Card>
                          ))}
                      </div>
                      
                {/* Empty State */}
                {products.filter(product => user.purchased_product_ids?.includes(product.id)).length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-900 mb-2">No Courses Yet</h3>
                    <p className="text-green-700 mb-4">Start your learning journey by purchasing a course below</p>
                    <div className="inline-flex items-center space-x-2 text-green-600">
                      <ArrowRight className="w-4 h-4" />
                      <span className="text-sm font-medium">Browse available courses</span>
                    </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

            {/* Available Courses */}
            <AvailableCoursesSection 
              user={user} 
              products={products} 
              onPurchase={handlePurchase} 
            />

            {/* Quick Actions */}
            <QuickActions />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Available Courses</h2>
              <p className="text-gray-600 text-lg">Choose from individual courses or get the complete bundle</p>
            </div>
            
            {/* Individual Courses */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {products
                .filter(product => !product.key?.includes('complete_bundle'))
                .map((product) => (
                  <CoursePurchaseCard
                    key={product.id}
                    product={product}
                    user={user}
                    onPurchase={handlePurchase}
                  />
                ))}
            </div>

            {/* Complete Bundle */}
            {products.find(product => product.key?.includes('complete_bundle')) && (
              <div>
                <CompleteBundleCard
                  key={products.find(product => product.key?.includes('complete_bundle'))!.id}
                  product={products.find(product => product.key?.includes('complete_bundle'))!}
                  user={user}
                  onPurchase={handlePurchase}
                  allProducts={products}
                />
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}