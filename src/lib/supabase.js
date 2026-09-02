import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vbhtsoqhaymguhetxnmo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiaHRzb3FoYXltZ3VoZXR4bm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MTAzNDQsImV4cCI6MjEwMzQ4NjM0NH0.XHOhrL6AEErHJlWeIxkJUSSBUA9-1zyf2ekc2fbs3hA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
