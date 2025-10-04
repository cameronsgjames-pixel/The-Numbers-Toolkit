'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const courseModules = [
  { number: 1, title: 'Foundations for Productivity', description: 'Navigating Excel like a pro, formatting for clarity, and cleaning data.' },
  { number: 2, title: 'Everyday Formulas for Business', description: 'Mastering core formulas, calculating growth rates, and using references.' },
  { number: 3, title: 'Functions That Save Hours', description: 'Leveraging logic (IF), lookups (VLOOKUP, XLOOKUP), and text/date functions.' },
  { number: 4, title: 'Analysing Data with Confidence', description: 'Building PivotTables, adding interactive charts, and performing drill-down analysis.' },
  { number: 5, title: 'Business Modelling & Forecasting', description: 'Performing what-if analysis, using Data Tables, and applying forecasting techniques.' },
  { number: 6, title: 'Presenting & Communicating with Impact', description: 'Creating charts that tell a story, and building executive dashboards.' }
];

export default function CourseOverview() {                                                    
  return (
    <section id="course-overview" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            A 6-Course Program to Master Excel
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Each course is designed to build upon the last, transforming you into a highly proficient Excel user.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseModules.map((module) => (
            <Card key={module.number} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-xl">
                    {module.number.toString()}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      Course {module.number}: {module.title}
                    </h3>
                    <p className="text-slate-600">
                      {module.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Purchase CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to Start Your Excel Journey?
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Choose from our flexible learning options and begin mastering Excel today.
          </p>
          <Link href="/purchase">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              View Purchase Options
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
