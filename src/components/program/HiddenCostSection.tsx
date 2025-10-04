'use client'

import React from 'react';
import { Clock, AlertTriangle, TrendingDown } from 'lucide-react';

export default function HiddenCostSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                The Hidden Cost of Weak Excel Skills
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Most professionals don't realise how much time and opportunity they're losing every day. Poor Excel skills create a cascade of inefficiency that compounds over weeks, months, and years.
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Wasted Hours</h3>
                  <p className="text-slate-600">4–6 hours/week lost on manual work that could be automated.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Costly Errors</h3>
                  <p className="text-slate-600">One wrong formula can lead to bad decisions that impact business results.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Career Stall</h3>
                  <p className="text-slate-600">"Good enough" skills keep you stuck while others advance with superior data mastery.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=700&fit=crop&q=80"
              alt="Frustrated professional looking at a spreadsheet"
              className="rounded-2xl shadow-xl object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
