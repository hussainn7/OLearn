-- Create lesson_progress table
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  path_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  score INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own lesson progress" ON lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own lesson progress" ON lesson_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own lesson progress" ON lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at (if the function doesn't exist, create it first)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_lesson_progress_updated_at
  BEFORE UPDATE ON lesson_progress
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column(); 