import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, BookOpen, ArrowRight, Lock, ChevronDown, ChevronUp, Download, FileText, Target } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    content?: string;
    video_url?: string;
    practice_sheet_url?: string;
    duration?: number;
    sort_order: number;
    is_active: boolean;
    product_id: string;
  };
  index: number;
  productId: string;
  user: any;
  onLessonComplete: (productId: string, lessonId: string) => void;
}

export default function LessonCard({ lesson, index, productId, user, onLessonComplete }: LessonCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const lessonKey = `${productId}_lesson_${lesson.id}`;
  const isCompleted = user?.progress?.[lessonKey] === 100;
  const hasAccess = user?.purchased_product_ids?.includes(productId);

  const handleCompleteLesson = async () => {
    await onLessonComplete(productId, lesson.id);
  };

  return (
    <Card
      className="border-none shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between space-x-6">
          <div className="flex items-start space-x-6 flex-grow">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
              isCompleted ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
            }`}>
              {isCompleted ? <CheckCircle className="w-6 h-6" /> : index + 1}
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className={`font-semibold text-lg ${isCompleted ? 'text-green-900' : 'text-slate-900'}`}>
                  {lesson.title}
                </h3>
                {isCompleted && (
                  <Badge className="bg-green-100 text-green-800 text-xs">Complete</Badge>
                )}
                {!hasAccess && (
                  <Badge variant="outline" className="text-slate-500 border-slate-300">
                    <Lock className="w-3 h-3 mr-1" />
                    Locked
                  </Badge>
                )}
              </div>
              <p className="text-slate-600 text-sm">{lesson.description}</p>
              {lesson.duration && (
                <div className="flex items-center text-slate-500 text-sm mt-2">
                  <Clock className="w-4 h-4 mr-1" />
                  {lesson.duration} min
                </div>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 flex-shrink-0">
            {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-slate-200" onClick={(e) => e.stopPropagation()}>
            
            {lesson.content && (
              <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                  Lesson Content
                </h4>
                <div className="space-y-6">
                  {(() => {
                    let lessonContent = null;
                    try {
                      if (lesson.content) {
                        lessonContent = typeof lesson.content === 'string' ? JSON.parse(lesson.content) : lesson.content;
                      }
                    } catch (error) {
                      console.error('Error parsing lesson content:', error);
                      return (
                        <div className="text-center py-8 text-slate-500">
                          <p>Error loading lesson content.</p>
                        </div>
                      );
                    }
                    
                    return lessonContent ? (
                      <>
                        {/* Overview */}
                        {lessonContent.overview && (
                          <div>
                            <h5 className="font-semibold text-slate-900 mb-3">Overview</h5>
                            <p className="text-slate-700 leading-relaxed">{lessonContent.overview}</p>
                          </div>
                        )}

                        {/* Why This Matters */}
                        {lessonContent.why_matters && (
                          <div>
                            <h5 className="font-semibold text-slate-900 mb-3">Why This Matters</h5>
                            <p className="text-slate-700 leading-relaxed">{lessonContent.why_matters}</p>
                          </div>
                        )}

                        {/* Core Practices */}
                        {lessonContent.core_practices && lessonContent.core_practices.length > 0 && (
                          <div>
                            <h5 className="font-semibold text-slate-900 mb-3">Core Practices</h5>
                            <div className="space-y-3">
                              {lessonContent.core_practices.map((practice: any, idx: number) => (
                                <div key={idx} className="bg-white rounded-lg p-4 border border-slate-200">
                                  <h6 className="font-medium text-slate-900 mb-2">{practice.title}</h6>
                                  <p className="text-slate-700 text-sm leading-relaxed">{practice.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Common Mistakes */}
                        {lessonContent.common_mistakes && lessonContent.common_mistakes.length > 0 && (
                          <div>
                            <h5 className="font-semibold text-slate-900 mb-3">Common Mistakes to Avoid</h5>
                            <ul className="space-y-2">
                              {lessonContent.common_mistakes.map((mistake: string, idx: number) => (
                                <li key={idx} className="flex items-start space-x-2 text-slate-700">
                                  <span className="text-red-500 mt-1">•</span>
                                  <span>{mistake}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Key Takeaway */}
                        {lessonContent.key_takeaway && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h5 className="font-semibold text-blue-900 mb-2">Key Takeaway</h5>
                            <p className="text-blue-800 leading-relaxed">{lessonContent.key_takeaway}</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <p>No detailed content available for this lesson.</p>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {lesson.practice_sheet_url && (
              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                      <Download className="w-5 h-5 mr-2 text-green-600" />
                      Practice Sheet Available
                    </h4>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                      Download the hands-on practice file to apply what you've learned in this lesson. Work through real examples and exercises.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild className="bg-green-600 hover:bg-green-700 flex-shrink-0">
                        <a href={lesson.practice_sheet_url} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          Download Practice Sheet
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <FileText className="w-8 h-8 text-green-600" />
                    </div>
                    <span className="text-xs text-slate-500 font-medium">Excel File</span>
                  </div>
                </div>
              </div>
            )}

            {lesson.video_url && (
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                      Video Lesson Available
                    </h4>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                      Watch the video lesson to see concepts in action and follow along with the instructor.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 flex-shrink-0">
                        <a href={lesson.video_url} target="_blank" rel="noopener noreferrer">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Watch Video
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <span className="text-xs text-slate-500 font-medium">Video</span>
                  </div>
                </div>
              </div>
            )}

            {/* Lesson Completion Section */}
            <div className={`p-6 rounded-xl border-2 ${
              isCompleted 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex-grow">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                    {isCompleted ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                        Lesson Complete
                      </>
                    ) : (
                      <>
                        <Target className="w-5 h-5 mr-2 text-blue-600" />
                        Mark as Complete
                      </>
                    )}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {isCompleted 
                      ? "Great job! You've completed this lesson and earned progress toward your course completion."
                      : "Once you've worked through the lesson content and practice sheet, mark this lesson as complete to track your progress."
                    }
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {isCompleted ? (
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  ) : (
                    <Button 
                      onClick={handleCompleteLesson}
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={!hasAccess}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Lesson
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}