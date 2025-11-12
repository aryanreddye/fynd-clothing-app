// public/js/signup.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://aqsitvdwczcaqdgedrra.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxc2l0dmR3Y3pjYXFkZ2VkcnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NDEwNzQsImV4cCI6MjA3NjUxNzA3NH0.RoeqCl4Og_KuyPGVkzLc67Yi6sa50Q3_3SgtmPI3xPw';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // ✅ Include redirect URL so Supabase auto-logs in after verification
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/html/home.html`
      },
    });

    if (error) {
      alert('Signup failed: ' + error.message);
      return;
    }

    alert('Signup successful! Please check your email to confirm your account.');

    // ✅ Store minimal info temporarily
    const userData = {
      email,
      name,
    };
    localStorage.setItem('pendingSignup', JSON.stringify(userData));

    // ✅ Instead of sending them to login page manually
    // we can just show message or stay on same page
    // since Supabase will handle redirect after verification.
  });
});
