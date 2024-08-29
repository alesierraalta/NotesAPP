// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hjroqzytzycsfgxubakc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqcm9xenl0enljc2ZneHViYWtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4NjA3ODksImV4cCI6MjA0MDQzNjc4OX0._B-E7K9PhG-CwZBmpP2dRI6FT2v-DBjN6Hmigw8IMOQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
