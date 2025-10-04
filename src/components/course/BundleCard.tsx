import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Crown, CheckCircle } from "lucide-react";

interface BundleCardProps {
  user: any;
  onPurchase: (productId: string) => void;
}

export default function BundleCard({ user, onPurchase }: BundleCardProps) {
  const hasBundle = user?.purchased_product_ids?.includes('complete_bundle');
  const weekKeys = ['foundations', 'formulas', 'functions', 'analysis', 'modelling', 'presenting'];
  const ownedWeeks = user?.purchased_product_ids?.filter((id: string) => weekKeys.includes(id)).length || 0;
  const completedWeeks = user?.completed_weeks?.length || 0;
  const upgradePrice = hasBundle ? 0 : Math.max(0, 129 - (user?.total_spent_aud || 0));

  return (
    <Card className="border-2 border-blue-600 shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">
                Full Course Bundle
              </CardTitle>
              <p className="text-sm text-slate-600">All 6 courses + exclusive bonuses</p>
            </div>
          </div>
          
          <Badge className="bg-blue-600 text-white">
            <Star className="w-3 h-3 mr-1" />
            Best Value – Save $45
          </Badge>
        </div>

        {hasBundle && (
          <div className="bg-green-100 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-800 font-medium">Bundle Progress</span>
              <span className="text-green-900 font-bold">{completedWeeks}/6 courses complete</span>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="mb-6">
          <div className="flex items-baseline space-x-2 mb-4">
            <span className="text-4xl font-bold text-slate-900">$129</span>
            <span className="text-lg font-medium text-slate-400 line-through">$174</span>
            <span className="text-slate-500">AUD</span>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          <li className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-slate-700">All 6 Courses of Content</span>
          </li>
          <li className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-slate-700">Lifetime Access & Updates</span>
          </li>
          <li className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-slate-700">Bonus Template Pack</span>
          </li>
          <li className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-slate-700">Course Certificates</span>
          </li>
          <li className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-slate-700">Master Certificate</span>
          </li>
          <li className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-slate-700">Gamification & Badges</span>
          </li>
        </ul>

        {!hasBundle ? (
          <div className="space-y-3">
            {ownedWeeks > 0 && (
              <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 font-medium">
                  You own {ownedWeeks}/6 courses. Get the full bundle to unlock everything!
                </p>
              </div>
            )}
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
              onClick={() => window.location.href = 'https://buy.stripe.com/test_28E5kD8U64yl83Fd3Ye3e03'}
            >
              Get Full Bundle - $129
            </Button>
          </div>
        ) : (
          <div className="text-center p-3 bg-green-100 border border-green-200 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <Crown className="w-5 h-5" />
              <span className="font-medium">Bundle Owner - All Content Unlocked!</span>
            </div>
            {completedWeeks === 6 && (
              <p className="text-sm text-green-600 mt-2">🎉 Congratulations! You've mastered all 6 courses!</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
