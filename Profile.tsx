
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, ShieldCheck, Lock, CheckCircle, AlertCircle, Loader2, ArrowLeft, Star, Settings } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, isAuthenticated, updatePassword } = useAuth();
  const navigate = useNavigate();

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Simulation delay
    setTimeout(() => {
      // Validation
      if (currentPass !== user?.password) {
        setError('The current password you entered is incorrect.');
        setLoading(false);
        return;
      }

      if (newPass.length < 6) {
        setError('New password must be at least 6 characters long.');
        setLoading(false);
        return;
      }

      if (newPass !== confirmPass) {
        setError('New passwords do not match.');
        setLoading(false);
        return;
      }

      updatePassword(newPass);
      setSuccess('Your password has been updated successfully.');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setLoading(false);
    }, 1200);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-glutivia-cream dark:bg-stone-950 py-20 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-stone-500 hover:text-glutivia-green mb-8 transition-colors font-bold text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar / Info Card */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-800 p-8 text-center sticky top-28">
              <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100 dark:border-emerald-800 font-bold text-2xl shadow-inner">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <h2 className="text-2xl font-serif-display font-bold text-stone-900 dark:text-stone-100 mb-1">{user.name}</h2>
              <p className="text-stone-400 text-sm mb-6">{user.email}</p>
              
              <div className="pt-6 border-t border-stone-50 dark:border-stone-800 space-y-4">
                <div className="bg-glutivia-green/5 dark:bg-emerald-900/20 p-4 rounded-2xl border border-glutivia-green/10">
                   <div className="flex items-center justify-center gap-2 text-glutivia-green dark:text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">
                      <Star size={14} fill="currentColor" /> Active Plan
                   </div>
                   <div className="text-stone-900 dark:text-stone-100 font-bold text-lg">{user.plan || 'Explorer'}</div>
                </div>
                <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">Member since {new Date().getFullYear()}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Account Details */}
            <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-800 overflow-hidden">
               <div className="p-8 bg-stone-50 dark:bg-stone-900/50 border-b border-stone-100 dark:border-stone-800 flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-stone-800 rounded-lg text-emerald-600 shadow-sm"><Settings size={20} /></div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">Account Information</h3>
               </div>
               <div className="p-8 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Display Name</label>
                        <div className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700">
                           <User size={18} className="text-stone-400" />
                           <span className="font-bold text-stone-700 dark:text-stone-200">{user.name}</span>
                        </div>
                     </div>
                     <div>
                        <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Email Address</label>
                        <div className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700">
                           <Mail size={18} className="text-stone-400" />
                           <span className="font-bold text-stone-700 dark:text-stone-200">{user.email}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100/50">
                     <ShieldCheck className="text-emerald-500" size={20} />
                     <p className="text-xs text-stone-600 dark:text-stone-400">Your profile is strictly safe and certified 100% gluten-free compliant.</p>
                  </div>
               </div>
            </div>

            {/* Password Management */}
            <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-800 overflow-hidden">
               <div className="p-8 bg-stone-50 dark:bg-stone-900/50 border-b border-stone-100 dark:border-stone-800 flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-stone-800 rounded-lg text-amber-600 shadow-sm"><Lock size={20} /></div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">Security & Password</h3>
               </div>
               
               <form onSubmit={handlePasswordChange} className="p-8 space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">Current Password</label>
                    <input 
                      type="password" 
                      required
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      className="w-full p-4 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" 
                      placeholder="••••••••" 
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">New Password</label>
                      <input 
                        type="password" 
                        required
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        className="w-full p-4 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" 
                        placeholder="Min. 6 chars" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 mb-2 uppercase tracking-widest">Confirm New Password</label>
                      <input 
                        type="password" 
                        required
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        className="w-full p-4 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" 
                        placeholder="Re-type new password" 
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm animate-fade-in font-medium">
                      <AlertCircle size={20} className="flex-shrink-0" /> {error}
                    </div>
                  )}

                  {success && (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-sm animate-fade-in font-medium">
                      <CheckCircle size={20} className="flex-shrink-0" /> {success}
                    </div>
                  )}

                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full py-5 bg-glutivia-green text-white rounded-3xl font-bold uppercase tracking-widest text-xs shadow-xl hover:bg-glutivia-dark active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "Update Password"}
                  </button>
               </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
