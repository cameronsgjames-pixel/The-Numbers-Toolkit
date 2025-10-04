import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, CheckCircle, Star, Award, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    sort_order: number;
    lessons?: Array<{
      id: string;
      title: string;
      description: string | null;
      content: string | null;
      sort_order: number;
      is_active: boolean;
      created_at: Date;
      updated_at: Date;
      video_url: string | null;
      practice_sheet_url: string | null;
      duration: number | null;
      product_id: string;
    }>;
  };
  user: any;
  onPurchase: (productId: string) => void;
}

export default function ProductCard({ product, user, onPurchase }: ProductCardProps) {
  const { hasAccessToProduct, getCompletedProducts } = useUserStore();
  
  const isOwned = hasAccessToProduct(product.id);
  const completedProducts = getCompletedProducts();
  const isCompleted = completedProducts.includes(product.id);
  const productProgress = user?.progress?.[product.id] || 0;

  return (
    <Card className={`border-2 transition-all duration-300 hover:shadow-xl ${
      isOwned ? 'border-green-200 bg-green-50' : 'border-slate-200'
    } ${isCompleted ? 'bg-gradient-to-br from-green-50 to-blue-50' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
              isCompleted ? 'bg-green-600' : isOwned ? 'bg-blue-600' : 'bg-slate-400'
            }`}>
              {isCompleted ? <CheckCircle className="w-5 h-5" /> : product.sort_order}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-slate-900">
                {product.name}
              </CardTitle>
              <p className="text-sm text-slate-600">{product.description || 'No description available'}</p>
            </div>
          </div>

          <Badge variant="outline" className="text-slate-700">
            ${product.price} AUD
          </Badge>
        </div>

        {isOwned && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Progress</span>
              <span className="font-medium text-slate-900">{productProgress}%</span>
            </div>
            <Progress value={productProgress} className="h-2" />
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {product.lessons && product.lessons.length > 0 && (
          <ul className="space-y-2 mb-6">
            {product.lessons.map((lesson, index) => (
              <li key={lesson.id} className="flex items-start space-x-2 text-sm">
                {isOwned ? (
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                )}
                <span className={isOwned ? 'text-slate-700' : 'text-slate-500'}>{lesson.title}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="space-y-3">
          {!isOwned ? (
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => onPurchase(product.id)}
            >
              Buy Course - ${product.price} AUD
            </Button>
          ) : isCompleted ? (
             <>
              <div className="flex items-center justify-center space-x-2 text-green-700 bg-green-100 rounded-lg p-3 text-sm font-medium">
                <CheckCircle className="w-5 h-5" />
                <span>Course Completed!</span>
              </div>

              <Link href={`/product?product=${product.id}`} className="w-full">
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                      Review Course Content
                      <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
              </Link>
            </>
          ) : (
            <Link href={`/product?product=${product.id}`} className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                    Start Course
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
