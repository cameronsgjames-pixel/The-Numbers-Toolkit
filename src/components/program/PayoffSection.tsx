'use client'

import React from 'react';
import { Star, Zap, BarChart, FileText, PieChart } from 'lucide-react';

export default function PayoffSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            The Payoff: From User to Expert
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Transform from someone who "gets by" with Excel to someone who leverages it as a strategic business tool. When you master Excel properly, you don't just work faster—you become the person others turn to for insights and solutions.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=700&fit=crop&q=80"
              alt="Professional presenting a clean data dashboard"
              className="rounded-2xl shadow-xl object-cover w-full h-full"
            />
          </div>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Become the "go-to" Excel expert</h3>
                <p className="text-slate-600 leading-relaxed">Be the person everyone turns to for complex spreadsheet solutions.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Automate tasks and save hours</h3>
                <p className="text-slate-600 leading-relaxed">Transform repetitive work into automated, reliable processes.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Deliver executive-ready reports</h3>
                <p className="text-slate-600 leading-relaxed">Create professional presentations that influence key decisions.</p>
              </div>
            </div>
             <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <PieChart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Build dashboards from scratch</h3>
                <p className="text-slate-600 leading-relaxed">Design dynamic visualizations that tell compelling data stories.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
