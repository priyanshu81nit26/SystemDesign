'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api/auth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      let res, data;
      if (isLogin) {
        res = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        
        login(data.token);
        router.push('/');
        
      } else {
        res = await fetch(`${API_BASE}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Registration failed');
        
        setIsLogin(true);
        setSuccessMessage('Registration successful! Please sign in.');
        setFormData({ email: '', password: '', confirmPassword: '', name: '' });
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch(`${API_BASE}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send reset email');

      setSuccessMessage('Password reset email sent! Check your inbox.');
      setFormData({ email: '', password: '', confirmPassword: '', name: '' });
      setShowForgotPassword(false);
      setIsLogin(true);

    } catch (err) {
      setError(err.message || 'Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232b4a] via-[#0a0a23] to-[#232b4a]">
      {/* Auth Header */}
    

      {/* Auth Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-[#10182a80] backdrop-blur-lg p-8 rounded-xl border-2 border-blue-400 shadow-2xl">
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-blue-300">
              {showForgotPassword ? 'Forgot Password' : (isLogin ? 'Welcome Back!' : 'Create Account')}
            </h2>
            {!showForgotPassword && (
              <p className="mt-2 text-center text-sm text-blue-200">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => { setIsLogin(!isLogin); setError(''); setSuccessMessage(''); setFormData({ email: '', password: '', confirmPassword: '', name: '' }); }}
                  className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            )}
          </div>

          {(error || successMessage) && (
            <div className={`px-4 py-3 rounded-lg relative border-2 ${successMessage ? 'bg-green-900/50 border-green-400 text-green-200' : 'bg-red-900/50 border-red-400 text-red-200'}`} role="alert">
              {error || successMessage}
            </div>
          )}

          {showForgotPassword ? (
            <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
              <div className="rounded-md space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-1">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 bg-[#232b4a80] border-2 border-blue-400 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border-2 border-blue-400 text-sm font-medium rounded-lg text-blue-300 hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#10182a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg className="animate-spin h-5 w-5 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  ) : null}
                  Send Reset Link
                </button>
              </div>
              <div className="text-center">
                <button
                  onClick={() => { setShowForgotPassword(false); setError(''); setSuccessMessage(''); setFormData({ email: '', password: '', confirmPassword: '', name: '' }); }}
                  className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors mt-4"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md space-y-4">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-1">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required={!isLogin}
                      className="appearance-none relative block w-full px-3 py-2 bg-[#232b4a80] border-2 border-blue-400 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-1">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 bg-[#232b4a80] border-2 border-blue-400 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-1">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 bg-[#232b4a80] border-2 border-blue-400 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-200 mb-1">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required={!isLogin}
                      className="appearance-none relative block w-full px-3 py-2 bg-[#232b4a80] border-2 border-blue-400 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-blue-400 rounded bg-[#232b4a80]"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-200">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <button
                      onClick={() => { setShowForgotPassword(true); setError(''); setSuccessMessage(''); setFormData({ email: '', password: '', confirmPassword: '', name: '' }); }}
                      type="button"
                      className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border-2 border-blue-400 text-sm font-medium rounded-lg text-blue-300 hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#10182a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg className="animate-spin h-5 w-5 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  ) : null}
                  {isLogin ? 'Sign in' : 'Create Account'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 