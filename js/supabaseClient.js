import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 🔧 Replace with your own project details
const SUPABASE_URL = 'https://aqsitvdwczcaqdgedrra.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxc2l0dmR3Y3pjYXFkZ2VkcnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NDEwNzQsImV4cCI6MjA3NjUxNzA3NH0.RoeqCl4Og_KuyPGVkzLc67Yi6sa50Q3_3SgtmPI3xPw';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
