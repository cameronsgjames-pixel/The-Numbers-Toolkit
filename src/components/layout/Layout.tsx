'use client'

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from 'next-auth/react';
import { BookOpen, Home, User, Info, Lightbulb, LogOut, ChevronDown, Award, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavLink from "@/components/ui/nav-link";
import SupportWidget from "../pricing/SupportWidget";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const createPageUrl = (pageName: string) => '/' + pageName.toLowerCase().replace(/ /g, '-');
  
  const navigationItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "The Course",
      url: createPageUrl("Program"),
      icon: Info,
    },
    {
      title: "Why This Course",
      url: createPageUrl("WhyThisCourse"),
      icon: Lightbulb,
    }
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      setShowUserDropdown(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/20 shadow-lg"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 50,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
          WebkitBackdropFilter: 'blur(16px)'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
                <motion.div 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src="/images/app-logo.png"
                    alt="The Numbers Toolkit Logo"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="hidden sm:block">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">The Numbers Toolkit</h1>
                  <p className="text-xs sm:text-sm text-slate-500">Excel Mastery Course</p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold text-slate-900">Numbers Toolkit</h1>
                </div>
              </Link>
            </div>
            
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.title}
                  href={item.url}
                  exact={item.url === '/'}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
              
              {/* Member Portal Link - Always visible */}
              <NavLink href={createPageUrl("Course")}>
                <BookOpen className="w-4 h-4" />
                <span>Member Portal</span>
              </NavLink>
            </div>

            {/* Tablet/Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {showMobileMenu ? (
                  <X className="w-6 h-6 text-slate-600" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-600" />
                )}
              </button>
            </div>

            {/* User Authentication Section - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-4">
              {status === 'loading' ? (
                <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse"></div>
              ) : session?.user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center space-x-3 bg-white border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {session.user.name ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-slate-900">
                        {session.user.name?.split(' ')[0] || 'User'}
                      </p>
                      <p className="text-xs text-slate-500">Member</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b border-slate-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <span className="text-lg font-bold text-white">
                              {session.user.name ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{session.user.name}</p>
                            <p className="text-sm text-slate-500">{session.user.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <Link 
                          href="/profile" 
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link 
                          href={createPageUrl("Course")} 
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>My Courses</span>
                        </Link>
                        <Link 
                          href="/achievements" 
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <Award className="w-4 h-4" />
                          <span>Achievements</span>
                        </Link>
                        <Link 
                          href="/downloads" 
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Downloads</span>
                        </Link>
                      </div>
                      
                      <div className="border-t border-slate-100 py-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>

        {/* Tablet/Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div 
              className="lg:hidden border-t border-slate-200 bg-white"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
                {/* Tablet/Mobile Navigation Links */}
                <div className="space-y-2 sm:space-y-3">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className="flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-slate-50 transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                      <span className="text-slate-900 font-medium text-sm sm:text-base">{item.title}</span>
                    </Link>
                  ))}

                  {/* Member Portal Link */}
                  <Link
                    href={createPageUrl("Course")}
                    className="flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-slate-50 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                    <span className="text-slate-900 font-medium text-sm sm:text-base">Member Portal</span>
                  </Link>
                </div>

                {/* Tablet/Mobile User Section */}
                {status === 'loading' ? (
                  <div className="w-full h-12 sm:h-14 rounded-lg bg-slate-200 animate-pulse"></div>
                ) : session?.user ? (
                  <div className="border-t border-slate-200 pt-4 sm:pt-6">
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <span className="text-lg sm:text-xl font-bold text-white">
                          {session.user.name ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm sm:text-base">{session.user.name}</p>
                        <p className="text-xs sm:text-sm text-slate-500">{session.user.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <Link 
                        href="/profile" 
                        className="flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-slate-50 transition-colors"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                        <span className="text-slate-900 text-sm sm:text-base">My Profile</span>
                      </Link>
                      <Link 
                        href={createPageUrl("Course")} 
                        className="flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-slate-50 transition-colors"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                        <span className="text-slate-900 text-sm sm:text-base">My Courses</span>
                      </Link>
                      <Link 
                        href="/achievements" 
                        className="flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-slate-50 transition-colors"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                        <span className="text-slate-900 text-sm sm:text-base">Achievements</span>
                      </Link>
                      <Link 
                        href="/downloads" 
                        className="flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-slate-50 transition-colors"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                        <span className="text-slate-900 text-sm sm:text-base">Downloads</span>
                      </Link>
                      <button 
                        onClick={() => {
                          handleLogout();
                          setShowMobileMenu(false);
                        }}
                        className="flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                        <span className="text-red-600 text-sm sm:text-base">Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-slate-200 pt-4 sm:pt-6">
                    <Link
                      href="/auth/signin"
                      className="block w-full text-center bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen pt-14 sm:pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                  <img 
                    src="/images/app-logo.png"
                    alt="The Numbers Toolkit Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">The Numbers Toolkit</h3>
              </div>
              <p className="text-sm">Master Excel for business success with practical, real-world training.</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <NavLink 
                    href="/" 
                    className="hover:text-white transition-colors"
                    activeClassName="text-white font-medium"
                    inactiveClassName="text-slate-300 hover:text-white"
                    exact
                    onClick={scrollToTop}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    href={createPageUrl("Program")} 
                    className="hover:text-white transition-colors"
                    activeClassName="text-white font-medium"
                    inactiveClassName="text-slate-300 hover:text-white"
                    onClick={scrollToTop}
                  >
                    The Course
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    href={createPageUrl("WhyThisCourse")} 
                    className="hover:text-white transition-colors"
                    activeClassName="text-white font-medium"
                    inactiveClassName="text-slate-300 hover:text-white"
                    onClick={scrollToTop}
                  >
                    Why This Course
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    href={createPageUrl("Course")} 
                    className="hover:text-white transition-colors"
                    activeClassName="text-white font-medium"
                    inactiveClassName="text-slate-300 hover:text-white"
                    onClick={scrollToTop}
                  >
                    Member Portal
                  </NavLink>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
              <p className="text-sm mb-3">Questions? Contact us for help with your Excel journey.</p>
              <Link href={createPageUrl("Contact")}>
                  <Button variant="outline" className="bg-transparent border-slate-600 text-white hover:bg-slate-800 hover:text-white">
                      Contact Support
                  </Button>
              </Link>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-xs">&copy; 2025 The Numbers Toolkit. Transforming business productivity through Excel mastery.</p>
          </div>
        </div>
      </footer>

      {/* ChatBot - Available on all pages */}
      <SupportWidget />
    </div>
  );
}
