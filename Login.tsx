
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect state if it exists
  const redirectMessage = location.state?.message;
  const from = location.state?.from?.pathname || "/";

  const formatEmailAsName = (emailStr: string) => {
    const handle = emailStr.split('@')[0];
    return handle
      .split(/[\._-]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Local authentication simulation
    setTimeout(() => {
      if (!email || !password || (!isLogin && !name)) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      
      const displayName = isLogin ? formatEmailAsName(email) : name;
      login(email, displayName, password);
      setLoading(false);
      // Navigate to intended destination or home
      navigate(from, { replace: true });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-glutivia-cream dark:bg-stone-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-stone-900 rounded-[3rem] shadow-2xl p-10 border border-stone-100 dark:border-stone-800 animate-fade-in-up">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserIcon size={32} />
          </div>
          <h2 className="text-3xl font-serif-display font-bold text-stone-900 dark:text-stone-100">
            {isLogin ? 'Customer Login' : 'Create Account'}
          </h2>
          <p className="text-stone-500 text-sm mt-2">Access your gluten-free paradise</p>
        </div>

        {redirectMessage && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-2xl flex items-center gap-3 text-amber-700 dark:text-amber-400 text-sm font-bold">
            <AlertCircle size={18} className="flex-shrink-0" />
            {redirectMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 pl-12 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="John Doe"
                />
                <UserIcon className="absolute left-4 top-4 text-stone-400" size={20} />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 pl-12 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="email@example.com"
              />
              <Mail className="absolute left-4 top-4 text-stone-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 pl-12 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="••••••••"
              />
              <Lock className="absolute left-4 top-4 text-stone-400" size={20} />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

          <button 
            disabled={loading}
            className="w-full py-4 bg-glutivia-green text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (isLogin ? 'Login' : 'Sign Up')}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-stone-500 text-sm hover:text-emerald-600 transition-colors font-medium"
          >
            {isLogin ? "New here? Create an account" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
