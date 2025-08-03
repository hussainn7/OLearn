import { supabase } from './supabase'

export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface LearningPath {
  id: string
  title: string
  description: string
  total_lessons: number
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  estimated_hours?: number
  created_at: string
  updated_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  path_id: string
  path_title: string
  completed_lessons: number
  total_lessons: number
  progress_percentage: number
  status: 'not_started' | 'in_progress' | 'completed'
  started_at?: string
  updated_at: string
}

export interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string
  path_id: string
  completed: boolean
  score?: number
  completed_at?: string
  created_at: string
  updated_at: string
}

export interface Lesson {
  id: string
  path_id: string
  title: string
  content: string
  order_index: number
  created_at: string
}

export const database = {
  // Profile functions
  async getProfile(userId: string): Promise<Profile | null> {
    console.log('🗄️ Database: Getting profile for user:', userId)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    console.log('🗄️ Database: Profile result:', { data, error })
    if (error) throw error
    return data
  },

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
    console.log('🗄️ Database: Updating profile for user:', userId, 'Updates:', updates)
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    console.log('🗄️ Database: Update profile result:', { data, error })
    if (error) throw error
    return data
  },

  // Learning paths functions
  async getLearningPaths(): Promise<LearningPath[]> {
    console.log('🗄️ Database: Getting learning paths...')
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .order('created_at', { ascending: true })
    
    console.log('🗄️ Database: Learning paths result:', { data, error })
    if (error) throw error
    return data || []
  },

  async getLearningPath(id: string): Promise<LearningPath | null> {
    console.log('🗄️ Database: Getting learning path:', id)
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('id', id)
      .single()
    
    console.log('🗄️ Database: Learning path result:', { data, error })
    if (error) throw error
    return data
  },

  // User progress functions
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    console.log('🗄️ Database: Getting user progress for user:', userId)
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
    
    console.log('🗄️ Database: User progress result:', { data, error })
    if (error) throw error
    return data || []
  },

  async getUserProgressForPath(userId: string, pathId: string): Promise<UserProgress | null> {
    console.log('🗄️ Database: Getting user progress for path:', { userId, pathId })
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('path_id', pathId)
      .single()
    
    console.log('🗄️ Database: User progress for path result:', { data, error })
    if (error && error.code !== 'PGRST116') throw error // PGRST116 is "not found"
    return data
  },

  async initializeUserProgress(userId: string, pathId: string, pathTitle: string, totalLessons: number): Promise<UserProgress> {
    console.log('🗄️ Database: Initializing user progress:', { userId, pathId, pathTitle, totalLessons })
    const { data, error } = await supabase
      .from('user_progress')
      .insert({
        user_id: userId,
        path_id: pathId,
        path_title: pathTitle,
        completed_lessons: 0,
        total_lessons: totalLessons,
        progress_percentage: 0,
        status: 'not_started',
        started_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()
    
    console.log('🗄️ Database: Initialize user progress result:', { data, error })
    if (error) throw error
    return data
  },

  async updateUserProgress(
    userId: string,
    pathId: string,
    completedLessons: number
  ): Promise<UserProgress> {
    console.log('🗄️ Database: Updating user progress:', { userId, pathId, completedLessons })
    // First get the path to calculate total lessons
    const path = await this.getLearningPath(pathId)
    if (!path) throw new Error('Learning path not found')

    const progressPercentage = Math.round((completedLessons / path.total_lessons) * 100)
    const status = completedLessons === 0 ? 'not_started' : 
                   completedLessons === path.total_lessons ? 'completed' : 'in_progress'

    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        path_id: pathId,
        path_title: path.title,
        completed_lessons: completedLessons,
        total_lessons: path.total_lessons,
        progress_percentage: progressPercentage,
        status: status,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()
    
    console.log('🗄️ Database: Update user progress result:', { data, error })
    if (error) throw error
    return data
  },

  async completeLesson(userId: string, pathId: string): Promise<UserProgress> {
    console.log('🗄️ Database: Completing lesson:', { userId, pathId })
    // Get current progress
    const currentProgress = await this.getUserProgressForPath(userId, pathId)
    const newCompletedLessons = (currentProgress?.completed_lessons || 0) + 1
    
    console.log('🗄️ Database: Lesson completion calculation:', { currentProgress, newCompletedLessons })
    return this.updateUserProgress(userId, pathId, newCompletedLessons)
  },

  // Lesson progress functions
  async getLessonProgress(userId: string, lessonId: string): Promise<LessonProgress | null> {
    console.log('🗄️ Database: Getting lesson progress:', { userId, lessonId })
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .single()
    
    console.log('🗄️ Database: Lesson progress result:', { data, error })
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async completeLessonWithScore(userId: string, lessonId: string, pathId: string, score: number): Promise<LessonProgress> {
    console.log('🗄️ Database: Completing lesson with score:', { userId, lessonId, pathId, score })
    const { data, error } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        path_id: pathId,
        completed: true,
        score: score,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()
    
    console.log('🗄️ Database: Complete lesson with score result:', { data, error })
    if (error) throw error
    return data
  },

  async getLessonProgressForPath(userId: string, pathId: string): Promise<LessonProgress[]> {
    console.log('🗄️ Database: Getting lesson progress for path:', { userId, pathId })
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('path_id', pathId)
      .order('created_at', { ascending: true })
    
    console.log('🗄️ Database: Lesson progress for path result:', { data, error })
    if (error) throw error
    return data || []
  },

  // Lesson functions
  async getLessonsForPath(pathId: string): Promise<Lesson[]> {
    console.log('🗄️ Database: Getting lessons for path:', pathId)
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('path_id', pathId)
      .order('order_index', { ascending: true })
    
    console.log('🗄️ Database: Lessons for path result:', { data, error })
    if (error) throw error
    return data || []
  },

  async getLesson(lessonId: string): Promise<Lesson | null> {
    console.log('🗄️ Database: Getting lesson:', lessonId)
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .single()
    
    console.log('🗄️ Database: Lesson result:', { data, error })
    if (error) throw error
    return data
  },
} 