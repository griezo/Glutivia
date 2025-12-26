import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, User, Lock, Loader2 } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (username === 'admin' && password === 'rootadmin') {
        sessionStorage.setItem('glutivia_admin_auth', 'true');
        navigate('/admin-dashboard');
      } else {
        setError('Invalid username or password');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-stone-900 rounded-[3rem] shadow-2xl p-10 border border-stone-100 dark:border-stone-800">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={40} />
          </div>
          <h2 className="text-3xl font-serif-display font-bold text-stone-900 dark:text-stone-100">Admin Login</h2>
          <p className="text-stone-500 text-sm mt-2">Glutivia Private Management Zone</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Username</label>
            <div className="relative">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 pl-12 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="admin"
              />
              <User className="absolute left-4 top-4 text-stone-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 pl-12 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="••••••••"
              />
              <Lock className="absolute left-4 top-4 text-stone-400" size={20} />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

          <button 
            disabled={loading}
            className="w-full py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Unlock Access"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;