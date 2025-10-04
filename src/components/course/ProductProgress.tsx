import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target } from "lucide-react";

interface ProductProgressProps {
  lessons: any[];
  productId: string;
  productName: string;
  user: any;
}

export default function ProductProgress({ lessons, productId, productName, user }: ProductProgressProps) {
  const totalLessons = lessons.length;
  const completedLessons = user?.progress ? 
    Object.keys(user.progress).filter(key => 
      key.startsWith(`${productId}_lesson_`) && user.progress[key] === 100
    ).length : 0;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <Card className="border-none shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Course Progress</h3>
              <p className="text-sm text-slate-600">{productName}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">
              {completedLessons}/{totalLessons}
            </div>
            <div className="text-xs text-slate-500">Lessons Complete</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600">Progress</span>
            <span className="font-medium text-slate-900">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
        
        {progressPercentage === 100 && (
          <div className="mt-4 flex items-center space-x-2 text-green-600">
            <Trophy className="w-5 h-5" />
            <span className="font-medium">Course Complete! 🎉</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
