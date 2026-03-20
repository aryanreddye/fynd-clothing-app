import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://jesipopurevclgyulbow.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Implc2lwb3B1cmV2Y2xneXVsYm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3OTA5MTIsImV4cCI6MjA4OTM2NjkxMn0.gAROOMgFTdKUVuQ4KzV9pSwldPOHfMBDQs_OAAH51yQ';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
