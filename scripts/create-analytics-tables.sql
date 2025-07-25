-- Create application tracking table
CREATE TABLE IF NOT EXISTS application_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  cv_id UUID REFERENCES saved_cvs(id) ON DELETE CASCADE,
  job_title VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  job_board VARCHAR(100) NOT NULL,
  application_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'applied' CHECK (status IN ('applied', 'viewed', 'interview', 'rejected', 'offered', 'hired')),
  ats_score_at_application INTEGER DEFAULT 0,
  job_description TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create CV interactions tracking table
CREATE TABLE IF NOT EXISTS cv_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  cv_id UUID REFERENCES saved_cvs(id) ON DELETE CASCADE,
  interaction_type VARCHAR(20) NOT NULL CHECK (interaction_type IN ('view', 'download', 'share')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- Create ATS score history table
CREATE TABLE IF NOT EXISTS ats_score_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  cv_id UUID REFERENCES saved_cvs(id) ON DELETE CASCADE,
  overall_score INTEGER NOT NULL,
  section_scores JSONB NOT NULL,
  suggestions JSONB DEFAULT '[]',
  job_description_used TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job search analytics table
CREATE TABLE IF NOT EXISTS job_search_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  search_query TEXT NOT NULL,
  job_board VARCHAR(100),
  results_count INTEGER DEFAULT 0,
  clicked_jobs INTEGER DEFAULT 0,
  applied_jobs INTEGER DEFAULT 0,
  search_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create industry performance tracking
CREATE TABLE IF NOT EXISTS industry_performance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  industry VARCHAR(100) NOT NULL,
  applications_count INTEGER DEFAULT 0,
  response_rate DECIMAL(5,2) DEFAULT 0,
  interview_rate DECIMAL(5,2) DEFAULT 0,
  success_rate DECIMAL(5,2) DEFAULT 0,
  avg_ats_score DECIMAL(5,2) DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE application_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ats_score_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_search_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE industry_performance ENABLE ROW LEVEL SECURITY;

-- Create policies for application_tracking
CREATE POLICY "Users can view own applications" ON application_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications" ON application_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications" ON application_tracking
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own applications" ON application_tracking
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for cv_interactions
CREATE POLICY "Users can view own interactions" ON cv_interactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interactions" ON cv_interactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for ats_score_history
CREATE POLICY "Users can view own ATS history" ON ats_score_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ATS history" ON ats_score_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for job_search_analytics
CREATE POLICY "Users can view own search analytics" ON job_search_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own search analytics" ON job_search_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for industry_performance
CREATE POLICY "Users can view own industry performance" ON industry_performance
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own industry performance" ON industry_performance
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own industry performance" ON industry_performance
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_application_tracking_user_id ON application_tracking(user_id);
CREATE INDEX idx_application_tracking_cv_id ON application_tracking(cv_id);
CREATE INDEX idx_application_tracking_status ON application_tracking(status);
CREATE INDEX idx_application_tracking_date ON application_tracking(application_date);

CREATE INDEX idx_cv_interactions_user_id ON cv_interactions(user_id);
CREATE INDEX idx_cv_interactions_cv_id ON cv_interactions(cv_id);
CREATE INDEX idx_cv_interactions_type ON cv_interactions(interaction_type);

CREATE INDEX idx_ats_score_history_user_id ON ats_score_history(user_id);
CREATE INDEX idx_ats_score_history_cv_id ON ats_score_history(cv_id);

-- Create triggers for updated_at
CREATE TRIGGER update_application_tracking_updated_at BEFORE UPDATE ON application_tracking
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to automatically update industry performance
CREATE OR REPLACE FUNCTION update_industry_performance()
RETURNS TRIGGER AS $$
BEGIN
  -- This function would calculate and update industry performance metrics
  -- when application status changes
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for industry performance updates
CREATE TRIGGER update_industry_performance_trigger
  AFTER INSERT OR UPDATE ON application_tracking
  FOR EACH ROW EXECUTE FUNCTION update_industry_performance();

-- Create materialized view for dashboard analytics
CREATE MATERIALIZED VIEW user_dashboard_analytics AS
SELECT 
  u.id as user_id,
  COUNT(DISTINCT sc.id) as total_cvs,
  COUNT(DISTINCT at.id) as total_applications,
  COUNT(DISTINCT CASE WHEN at.status IN ('viewed', 'interview', 'offered', 'hired') THEN at.id END) as total_responses,
  ROUND(
    CASE 
      WHEN COUNT(DISTINCT at.id) > 0 
      THEN (COUNT(DISTINCT CASE WHEN at.status IN ('viewed', 'interview', 'offered', 'hired') THEN at.id END)::DECIMAL / COUNT(DISTINCT at.id)) * 100 
      ELSE 0 
    END, 2
  ) as response_rate,
  AVG(at.ats_score_at_application) as avg_ats_score
FROM auth.users u
LEFT JOIN saved_cvs sc ON u.id = sc.user_id
LEFT JOIN application_tracking at ON u.id = at.user_id
GROUP BY u.id;

-- Create index on materialized view
CREATE UNIQUE INDEX idx_user_dashboard_analytics_user_id ON user_dashboard_analytics(user_id);

-- Function to refresh analytics
CREATE OR REPLACE FUNCTION refresh_dashboard_analytics()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY user_dashboard_analytics;
END;
$$ language 'plpgsql';
