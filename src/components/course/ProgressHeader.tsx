import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, Trophy, Award, Target } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

interface ProgressHeaderProps {
  user: any;
}

export default function ProgressHeader({ user }: ProgressHeaderProps) {
  const { getAccessibleProducts, getCompletedProducts } = useUserStore();
  const accessibleProducts = getAccessibleProducts();
  const completedProducts = getCompletedProducts();
  
  const totalPoints = user?.points || 0;
  const badges = user?.badges || [];
  
  // Only show progress for products the user has access to
  const accessibleCompletedProducts = completedProducts.filter(productId => 
    accessibleProducts.includes(productId)
  );
  
  const accessibleCompletedCount = accessibleCompletedProducts.length;

  // Badge system from base version
  const badgeSystem = {
    starter: { 
      name: "Starter", 
      icon: Star, 
      threshold: 2, 
      description: "Complete 1-2 Courses" 
    },
    analyst: { 
      name: "Analyst", 
      icon: Target, 
      threshold: 4, 
      description: "Complete 3-4 Courses" 
    },
    master: { 
      name: "Productivity Master", 
      icon: Award, 
      threshold: 6, 
      description: "Complete All Courses" 
    }
  };

  const getCurrentBadge = () => {
    if (accessibleCompletedCount >= accessibleProducts.length) return badgeSystem.master;
    if (accessibleCompletedCount >= Math.ceil(accessibleProducts.length * 0.67)) return badgeSystem.analyst;
    if (accessibleCompletedCount >= Math.ceil(accessibleProducts.length * 0.33)) return badgeSystem.starter;
    return null;
  };

  const getNextBadge = () => {
    if (accessibleCompletedCount < Math.ceil(accessibleProducts.length * 0.33)) return badgeSystem.starter;
    if (accessibleCompletedCount < Math.ceil(accessibleProducts.length * 0.67)) return badgeSystem.analyst;
    if (accessibleCompletedCount < accessibleProducts.length) return badgeSystem.master;
    return null;
  };

  const currentBadge = getCurrentBadge();
  const nextBadge = getNextBadge();

  return (
    <Card className="border-none shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Learning Progress</h3>
              <p className="text-slate-600">Track your achievements and unlock new badges</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-slate-900">
              {totalPoints}
            </div>
            <div className="text-sm text-slate-500">Total Points</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Current Badge */}
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              {currentBadge ? (
                <currentBadge.icon className="w-6 h-6 text-yellow-600" />
              ) : (
                <Star className="w-6 h-6 text-slate-400" />
              )}
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">
              {currentBadge ? currentBadge.name : "Getting Started"}
            </h4>
            <p className="text-sm text-slate-600">
              {currentBadge ? currentBadge.description : "Complete your first course"}
            </p>
          </div>

          {/* Progress to Next Badge */}
          {nextBadge && (
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <nextBadge.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">
                Next: {nextBadge.name}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Progress</span>
                  <span className="font-medium text-slate-900">
                    {accessibleCompletedCount}/{accessibleProducts.length}
                  </span>
                </div>
                <Progress 
                  value={accessibleProducts.length > 0 ? (accessibleCompletedCount / accessibleProducts.length) * 100 : 0} 
                  className="h-2" 
                />
              </div>
            </div>
          )}

          {/* Completed Courses */}
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">
              {accessibleCompletedCount}/{accessibleProducts.length} Courses
            </h4>
            <p className="text-sm text-slate-600">
              {accessibleCompletedCount === accessibleProducts.length ? "All accessible courses completed! 🎉" : "Keep going!"}
            </p>
          </div>
        </div>

        {accessibleCompletedCount === accessibleProducts.length && accessibleProducts.length > 0 && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-full">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">Excel Mastery Achieved! 🏆</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
