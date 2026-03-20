// public/js/signup.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';


const SUPABASE_URL = 'https://jesipopurevclgyulbow.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Implc2lwb3B1cmV2Y2xneXVsYm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3OTA5MTIsImV4cCI6MjA4OTM2NjkxMn0.gAROOMgFTdKUVuQ4KzV9pSwldPOHfMBDQs_OAAH51yQ';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


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
