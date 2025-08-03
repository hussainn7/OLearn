import React, { createContext, useContext } from 'react'
import { useAuth } from './AuthContext'
import { database, UserProgress, LearningPath, LessonProgress } from '@/lib/database'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getLessonsForPath, getLessonById } from '@/lib/lessons'

interface ProgressContextType {
  userProgress: UserProgress[]
  learningPaths: LearningPath[]
  lessonProgress: LessonProgress[]
  isLoading: boolean
  completeLesson: (pathId: string) => Promise<void>
  completeLessonWithScore: (lessonId: string, pathId: string, score: number) => Promise<void>
  getProgressForPath: (pathId: string) => UserProgress | null
  getPathStatus: (pathId: string) => 'not_started' | 'in_progress' | 'completed' | 'locked'
  getLessonProgress: (lessonId: string) => LessonProgress | null
  getLessonsForPath: (pathId: string) => any[]
  getLessonById: (lessonId: string) => any
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  console.log('📊 ProgressContext: User state:', user)
  console.log('📊 ProgressContext: User ID:', user?.id)

  // Fetch learning paths
  const { data: learningPaths = [], isLoading: pathsLoading, error: pathsError } = useQuery({
    queryKey: ['learningPaths'],
    queryFn: async () => {
      console.log('📊 ProgressContext: Fetching learning paths...')
      try {
        const result = await database.getLearningPaths()
        console.log('📊 ProgressContext: Learning paths result:', result)
        return result
      } catch (error) {
        console.error('📊 ProgressContext: Learning paths error:', error)
        throw error
      }
    },
    enabled: !!user,
  })

  // Fetch user progress
  const { data: userProgress = [], isLoading: progressLoading, error: progressError } = useQuery({
    queryKey: ['userProgress', user?.id],
    queryFn: async () => {
      console.log('📊 ProgressContext: Fetching user progress for user:', user?.id)
      try {
        const result = await database.getUserProgress(user!.id)
        console.log('📊 ProgressContext: User progress result:', result)
        return result
      } catch (error) {
        console.error('📊 ProgressContext: User progress error:', error)
        throw error
      }
    },
    enabled: !!user,
  })

  // Fetch lesson progress - simplified to fetch all at once
  const { data: lessonProgress = [], isLoading: lessonProgressLoading, error: lessonProgressError } = useQuery({
    queryKey: ['lessonProgress', user?.id],
    queryFn: async () => {
      console.log('📊 ProgressContext: Fetching lesson progress for user:', user?.id)
      if (!user) return []
      // Get all lesson progress for the user from all paths
      const allProgress: LessonProgress[] = []
      
      // Get progress for each path the user has started
      for (const progress of userProgress) {
        try {
          console.log('📊 ProgressContext: Fetching progress for path:', progress.path_id)
          const pathProgress = await database.getLessonProgressForPath(user.id, progress.path_id)
          console.log('📊 ProgressContext: Path progress result:', pathProgress)
          allProgress.push(...pathProgress)
        } catch (error) {
          console.error(`📊 ProgressContext: Error fetching progress for path ${progress.path_id}:`, error)
        }
      }
      
      console.log('📊 ProgressContext: All lesson progress:', allProgress)
      return allProgress
    },
    enabled: !!user && userProgress.length > 0,
  })

  console.log('📊 ProgressContext: Query states:', {
    pathsLoading,
    progressLoading,
    lessonProgressLoading,
    pathsError,
    progressError,
    lessonProgressError
  })

  // Complete lesson mutation
  const completeLessonMutation = useMutation({
    mutationFn: async (pathId: string) => {
      console.log('📊 ProgressContext: Completing lesson for path:', pathId)
      const result = await database.completeLesson(user!.id, pathId)
      console.log('📊 ProgressContext: Complete lesson result:', result)
      return result
    },
    onSuccess: () => {
      console.log('📊 ProgressContext: Lesson completed successfully, invalidating queries')
      queryClient.invalidateQueries({ queryKey: ['userProgress'] })
      queryClient.invalidateQueries({ queryKey: ['lessonProgress'] })
    },
    onError: (error) => {
      console.error('📊 ProgressContext: Complete lesson error:', error)
    }
  })

  // Complete lesson with score mutation
  const completeLessonWithScoreMutation = useMutation({
    mutationFn: async ({ lessonId, pathId, score }: { lessonId: string; pathId: string; score: number }) => {
      console.log('📊 ProgressContext: Completing lesson with score:', { lessonId, pathId, score })
      const result = await database.completeLessonWithScore(user!.id, lessonId, pathId, score)
      console.log('📊 ProgressContext: Complete lesson with score result:', result)
      return result
    },
    onSuccess: () => {
      console.log('📊 ProgressContext: Lesson with score completed successfully, invalidating queries')
      queryClient.invalidateQueries({ queryKey: ['userProgress'] })
      queryClient.invalidateQueries({ queryKey: ['lessonProgress'] })
    },
    onError: (error) => {
      console.error('📊 ProgressContext: Complete lesson with score error:', error)
    }
  })

  const completeLesson = async (pathId: string) => {
    if (!user) {
      console.log('📊 ProgressContext: No user, cannot complete lesson')
      return
    }
    console.log('📊 ProgressContext: Calling completeLesson for path:', pathId)
    await completeLessonMutation.mutateAsync(pathId)
  }

  const completeLessonWithScore = async (lessonId: string, pathId: string, score: number) => {
    if (!user) {
      console.log('📊 ProgressContext: No user, cannot complete lesson with score')
      return
    }
    console.log('📊 ProgressContext: Calling completeLessonWithScore:', { lessonId, pathId, score })
    await completeLessonWithScoreMutation.mutateAsync({ lessonId, pathId, score })
  }

  const getProgressForPath = (pathId: string): UserProgress | null => {
    const progress = userProgress.find(progress => progress.path_id === pathId) || null
    console.log('📊 ProgressContext: Getting progress for path:', pathId, 'Result:', progress)
    return progress
  }

  const getPathStatus = (pathId: string): 'not_started' | 'in_progress' | 'completed' | 'locked' => {
    const progress = getProgressForPath(pathId)
    const status = !progress ? 'not_started' : progress.status
    console.log('📊 ProgressContext: Getting status for path:', pathId, 'Status:', status)
    return status
  }

  const getLessonProgress = (lessonId: string): LessonProgress | null => {
    const progress = lessonProgress.find(progress => progress.lesson_id === lessonId) || null
    console.log('📊 ProgressContext: Getting lesson progress for lesson:', lessonId, 'Result:', progress)
    return progress
  }

  const value = {
    userProgress,
    learningPaths,
    lessonProgress,
    isLoading: pathsLoading || progressLoading || lessonProgressLoading,
    completeLesson,
    completeLessonWithScore,
    getProgressForPath,
    getPathStatus,
    getLessonProgress,
    getLessonsForPath,
    getLessonById,
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
} 