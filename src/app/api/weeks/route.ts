import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const weekNumber = searchParams.get('week');
    
    if (weekNumber) {
      // Get specific product by week number (mapped from old week structure)
      const product = await prisma.product.findFirst({
        where: {
          key: getProductKeyByWeek(parseInt(weekNumber)),
          is_active: true
        },
        include: {
          lessons: {
            where: {
              is_active: true
            },
            orderBy: {
              sort_order: 'asc'
            }
          }
        }
      });
      
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      
      // Transform product to match expected week structure
      const weekData = {
        id: product.id,
        week_number: parseInt(weekNumber),
        title: product.name,
        description: product.description,
        content_data: product.content_data,
        lessons: product.lessons
      };
      
      return NextResponse.json(weekData);
    } else {
      // Get all products that represent weeks (individual courses)
      const products = await prisma.product.findMany({
        where: {
          course_type: 'individual',
          is_active: true
        },
        include: {
          lessons: {
            where: {
              is_active: true
            },
            orderBy: {
              sort_order: 'asc'
            }
          }
        },
        orderBy: {
          sort_order: 'asc'
        }
      });
      
      // Transform products to match expected week structure
      const weeks = products.map((product, index) => ({
        id: product.id,
        week_number: index + 1,
        title: product.name,
        description: product.description,
        content_data: product.content_data,
        lessons: product.lessons
      }));
      
      return NextResponse.json(weeks);
    }
  } catch (error) {
    console.error('Error fetching weeks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to map week numbers to product keys
function getProductKeyByWeek(weekNumber: number): string {
  const weekToProductMap: Record<number, string> = {
    1: 'foundations',
    2: 'formulas', 
    3: 'functions',
    4: 'analysis',
    5: 'modelling',
    6: 'presenting'
  };
  
  return weekToProductMap[weekNumber] || '';
}
