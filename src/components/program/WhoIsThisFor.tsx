'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, BarChart, DollarSign, Target, UserCheck, Building } from 'lucide-react';

const roles = [
  {
    icon: DollarSign,
    title: 'Finance & Accounting Pros',
    description: 'Build robust financial models, automate month-end reporting, and analyse variance with precision.',
  },
  {
    icon: BarChart,
    title: 'Sales & Marketing Analysts',
    description: 'Track campaign ROI, forecast sales performance, and create dashboards that tell a clear story.',
  },
  {
    icon: Building,
    title: 'Business Owners',
    description: 'Manage budgets, track inventory, analyse cash flow, and make data-driven decisions for growth.',
  },
  {
    icon: Target,
    title: 'Operations & Project Managers',
    description: 'Develop project timelines, manage resources, and track KPIs to keep projects on time and on budget.',
  },
  {
    icon: Briefcase,
    title: 'HR Professionals',
    description: 'Analyse employee data, manage payroll information, and create reports on turnover and recruitment.',
  },
  {
    icon: UserCheck,
    title: 'Ambitious Professionals',
    description: 'Anyone who wants to become more efficient, valuable, and indispensable in their role.',
  },
];

export default function WhoIsThisFor() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Built for Professionals Who Value Their Time
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            If you use spreadsheets in your job, this course will give you an immediate and lasting return on your investment.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <role.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-center text-slate-900 mb-4">
                  {role.title}
                </h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  {role.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
