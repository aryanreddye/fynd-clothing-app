// js/login.js
import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return console.error('loginForm not found');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      console.log('Login success:', data);
      // Mark login in sessionStorage temporarily
      sessionStorage.setItem('loggedIn', 'true');
      
      // Set user data in localStorage for compatibility with existing auth checks
      const userData = {
        email: data.user.email,
        name: data.user.user_metadata?.full_name || data.user.email.split('@')[0],
        id: data.user.id
      };
      localStorage.setItem('fyndUser', JSON.stringify(userData));

      // Redirect to homepage
      window.location.replace('home.html');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed: ' + err.message);
    }
  });

  // Auto-redirect if already logged in
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session || sessionStorage.getItem('loggedIn') === 'true') {
      window.location.replace('home.html');
    }
  });
});
