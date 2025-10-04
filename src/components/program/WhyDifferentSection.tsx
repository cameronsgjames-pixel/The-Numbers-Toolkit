'use client'

import React from 'react';
import { Target, Folder, TrendingUp, Clock } from 'lucide-react';

export default function WhyDifferentSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            Why This Course Is Different
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Most Excel courses teach you functions in isolation. We teach you how to solve real business problems, using the exact scenarios you face at work every day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Real-world business problems
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Every lesson is built around actual business scenarios - from budget forecasting to sales analysis to operational reporting. Not textbook examples that don't translate to real work.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Folder className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Step-by-step system
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Complete with practice files and templates you can use immediately in your work. No guesswork - just clear, actionable steps that build on each other.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Clear progression path
              </h3>
              <p className="text-slate-600 leading-relaxed">
                From basics to advanced to presentation-ready. Each course builds systematically on the last, ensuring you develop genuine expertise rather than scattered knowledge.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Lifetime access & updates
              </h3>
              <p className="text-slate-600 leading-relaxed">
                As Excel evolves and new features are released, your course content stays current. This is an investment in your long-term career development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
