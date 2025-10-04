import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, Clock, Play } from 'lucide-react'

interface LessonProgressProps {
  lessonId: string
  userId: string
  initialProgress?: {
    completed: boolean
    progress: number
    time_spent: number
  }
  onProgressUpdate?: (progress: any) => void
}

export default function LessonProgress({ 
  lessonId, 
  userId, 
  initialProgress,
  onProgressUpdate 
}: LessonProgressProps) {
  const [progress, setProgress] = useState(initialProgress || {
    completed: false,
    progress: 0,
    time_spent: 0
  })
  const [isUpdating, setIsUpdating] = useState(false)

  const updateProgress = async (newProgress: any) => {
    setIsUpdating(true)
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lesson_id: lessonId,
          ...newProgress
        })
      })

      if (response.ok) {
        const updatedProgress = await response.json()
        setProgress(updatedProgress)
        onProgressUpdate?.(updatedProgress)
      }
    } catch (error) {
      console.error('Error updating progress:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleComplete = () => {
    updateProgress({
      completed: true,
      progress: 100,
      time_spent: progress.time_spent + 1
    })
  }

  const handleProgressUpdate = (newProgress: number) => {
    updateProgress({
      completed: newProgress === 100,
      progress: newProgress,
      time_spent: progress.time_spent + 1
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {progress.completed ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <Play className="w-5 h-5 text-blue-600" />
          )}
          <span className="text-sm font-medium">
            {progress.completed ? 'Completed' : 'In Progress'}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{Math.floor(progress.time_spent / 60)} min</span>
        </div>
      </div>

      <Progress value={progress.progress} className="h-2" />

      <div className="flex space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleProgressUpdate(25)}
          disabled={isUpdating || progress.completed}
        >
          25%
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleProgressUpdate(50)}
          disabled={isUpdating || progress.completed}
        >
          50%
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleProgressUpdate(75)}
          disabled={isUpdating || progress.completed}
        >
          75%
        </Button>
        <Button
          size="sm"
          onClick={handleComplete}
          disabled={isUpdating || progress.completed}
          className="bg-green-600 hover:bg-green-700"
        >
          Complete
        </Button>
      </div>
    </div>
  )
}
