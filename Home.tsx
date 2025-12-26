
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChevronDown, Utensils, BookOpen, ShoppingBag, Truck, Check, Star, ChevronLeft, ChevronRight, Quote, X, CreditCard, Mail, User, Loader2, ShieldCheck, Lock, AlertCircle, MessageSquare, Send, Clock, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useCommunity } from '../contexts/CommunityContext';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Fatima Z.",
    location: "Casablanca, Morocco",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    quote: "Glutivia changed my life. Finally, a place where I can find everything gluten-free without worry. The recipes are authentic Moroccan dishes adapted perfectly!",
    rating: 4.9
  },
  {
    id: 2,
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    quote: "The ready-made meals are a lifesaver for my busy weeks. Fresh, delicious, and I can trust the ingredients 100%. The AI kitchen is also brilliant!",
    rating: 5.0
  },
  {
    id: 3,
    name: "Ahmed K.",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    quote: "I never thought I could eat Msemen again after my diagnosis. Glutivia made it possible. Highly recommend their flour blends and delivery service.",
    rating: 4.8
  }
];

type SubscriptionStep = 'form' | 'processing' | 'success';

const Home: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { messages, addMessage, deleteMessage } = useCommunity();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [animateTestimonial, setAnimateTestimonial] = useState(true);

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);
  const [subStep, setSubStep] = useState<SubscriptionStep>('form');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;
    
    setIsPosting(true);
    setTimeout(() => {
      addMessage(commentText.trim(), user.name);
      setCommentText('');
      setIsPosting(false);
    }, 800);
  };

  const nextTestimonial = () => {
    setAnimateTestimonial(false);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
      setAnimateTestimonial(true);
    }, 150);
  };

  const prevTestimonial = () => {
    setAnimateTestimonial(false);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      setAnimateTestimonial(true);
    }, 150);
  };

  const handleOpenPlan = (name: string, price: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setSelectedPlan({ name, price });
    setIsPlanModalOpen(true);
    setSubStep('form');
    setFormData({
      fullName: user?.name || '',
      email: user?.email || '',
      cardNumber: '',
      expiry: '',
      cvv: ''
    });
    setErrors({});
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = [];
    for (let i = 0, len = v.length; i < len; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubStep('processing');
    await new Promise(resolve => setTimeout(resolve, 2500));
    setSubStep('success');
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const diff = Date.now() - date.getTime();
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-glutivia-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Gluten Free Bread Spread" 
            className="w-full h-full object-cover opacity-60 animate-pulse"
            style={{ animationDuration: '10s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-glutivia-dark/30 to-glutivia-dark/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center mt-20">
          <h1 className="flex flex-col items-center animate-fade-in-up">
            <span className="text-white font-bold tracking-tight text-5xl md:text-7xl mb-2 drop-shadow-lg uppercase">
              {t('hero_title_1')}
            </span>
            <span className={`font-serif-display italic text-glutivia-gold text-6xl md:text-8xl lg:text-9xl drop-shadow-lg leading-tight ${isRTL ? 'font-sans' : ''}`}>
              {t('hero_title_2')}
            </span>
          </h1>
          
          <p className="mt-8 text-lg md:text-xl text-stone-200 max-w-2xl font-light tracking-wide leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {t('hero_sub')}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 items-center w-full justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <Link to="/kitchen" className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-glutivia-green text-white text-sm font-bold tracking-widest uppercase rounded-full hover:bg-glutivia-dark transition-all duration-300 shadow-lg border border-glutivia-green">
              {!isAuthenticated ? <Lock size={16} /> : <Utensils size={18} />}
              {t('explore_recipes')}
            </Link>
            <Link to="/market" className="group inline-flex items-center justify-center px-8 py-4 bg-transparent backdrop-blur-sm border border-glutivia-gold text-glutivia-gold hover:text-white text-sm font-bold tracking-widest uppercase rounded-full transition-all duration-300">
              {t('shop_products')}
            </Link>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
             <ChevronDown className="text-white/50 w-10 h-10" />
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 bg-glutivia-cream dark:bg-stone-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
             <div className="md:w-1/2 reveal-on-scroll text-start">
                <span className="text-glutivia-green font-bold tracking-widest uppercase text-sm mb-4 block">{t('why_glutivia')}</span>
                <p className="text-glutivia-dark dark:text-stone-300 leading-loose text-lg font-light">
                   {t('about_text')}
                </p>
             </div>
             <div className="md:w-1/2 grid grid-cols-2 gap-6 w-full">
                <div className="relative overflow-hidden rounded-2xl aspect-square group shadow-md reveal-on-scroll stagger-1">
                   <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-glutivia-dark/60 flex flex-col items-center justify-center text-white p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                      <div className="text-4xl font-serif-display font-bold mb-1 text-glutivia-gold">5000+</div>
                      <div className="text-xs uppercase tracking-wider font-bold">{t('stat_recipes')}</div>
                   </div>
                </div>
                <div className="relative overflow-hidden rounded-2xl aspect-square group shadow-md mt-8 reveal-on-scroll stagger-2">
                   <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-glutivia-dark/60 flex flex-col items-center justify-center text-white p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                      <div className="text-4xl font-serif-display font-bold mb-1 text-glutivia-gold">300+</div>
                      <div className="text-xs uppercase tracking-wider font-bold">{t('stat_products')}</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white dark:bg-stone-950 transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 reveal-on-scroll">
               <span className="text-glutivia-green font-bold tracking-widest uppercase text-sm">{t('services_eyebrow')}</span>
               <h2 className="text-4xl md:text-5xl font-serif-display text-glutivia-dark dark:text-[#D4C4B0] font-bold mt-4 leading-tight">
                  {t('services_title')} <br />
                  <span className="italic font-normal text-glutivia-accent">{t('services_title_2')}</span>
               </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { icon: BookOpen, title: 'serv_1_title', desc: 'serv_1_desc', img: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=800&q=80' },
                 { icon: ShoppingBag, title: 'serv_2_title', desc: 'serv_2_desc', img: 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&w=800&q=80' },
                 { icon: Truck, title: 'serv_3_title', desc: 'serv_3_desc', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' }
               ].map((serv, i) => (
                 <div key={i} className={`reveal-on-scroll stagger-${i+1} bg-glutivia-cream dark:bg-stone-900 rounded-[2rem] hover:-translate-y-3 transition-transform duration-500 border border-stone-100 dark:border-stone-800 overflow-hidden group shadow-sm hover:shadow-xl`}>
                    <div className="h-48 overflow-hidden relative">
                       <img src={serv.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-t from-glutivia-dark/60 to-transparent"></div>
                       <div className="absolute bottom-4 left-4 rtl:right-4 rtl:left-auto text-glutivia-gold"><serv.icon size={24} /></div>
                    </div>
                    <div className="p-8">
                       <h3 className="text-2xl font-bold text-glutivia-dark dark:text-stone-100 mb-4 group-hover:text-glutivia-green transition-colors">{t(serv.title as any)}</h3>
                       <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{t(serv.desc as any)}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Unified Community Hub Section */}
      <section id="community" className="py-24 bg-glutivia-cream dark:bg-stone-950 transition-colors duration-300 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-800 text-xs font-bold uppercase tracking-widest mb-4">
                 <MessageSquare size={14} /> The Community Hub
              </div>
              <h2 className="text-4xl md:text-5xl font-serif-display text-glutivia-dark dark:text-stone-100 font-bold mb-4">Voices of Glutivia</h2>
              <p className="text-stone-500 dark:text-stone-400 max-w-xl mx-auto italic">Join the discussion about a healthier, gluten-free lifestyle. Everyone can read, members can lead.</p>
           </div>

           <div className="grid lg:grid-cols-3 gap-12">
              {/* Contributor Card */}
              <div className="lg:col-span-1 reveal-on-scroll">
                 <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-800 p-8 sticky top-28 hover:shadow-emerald-500/5 transition-shadow">
                    <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-3">
                       <Send size={20} className="text-glutivia-green" /> Post Update
                    </h3>
                    
                    {isAuthenticated ? (
                       <form onSubmit={handlePostMessage} className="space-y-4">
                          <textarea 
                             value={commentText}
                             onChange={(e) => setCommentText(e.target.value)}
                             placeholder={`What's on your mind, ${user?.name.split(' ')[0]}?`}
                             className="w-full p-5 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all h-32 resize-none text-stone-700 dark:text-stone-200 text-sm font-medium"
                          />
                          <button 
                             type="submit"
                             disabled={!commentText.trim() || isPosting}
                             className="w-full py-4 bg-glutivia-green text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg hover:bg-glutivia-dark active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                             {isPosting ? <Loader2 className="animate-spin" size={16} /> : <><Send size={16} /> Share Now</>}
                          </button>
                       </form>
                    ) : (
                       <div className="text-center py-10 px-6 bg-stone-50 dark:bg-stone-800/50 rounded-3xl border border-dashed border-stone-200 dark:border-stone-700 animate-pulse">
                          <Lock size={32} className="mx-auto text-stone-300 mb-4" />
                          <p className="text-xs font-bold text-stone-500 uppercase tracking-widest leading-relaxed mb-6">Log in to participate in the discussion</p>
                          <Link to="/login" className="inline-block px-8 py-3 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-md">Sign In</Link>
                       </div>
                    )}

                    <div className="mt-8 pt-8 border-t border-stone-50 dark:border-stone-800 flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm"><ShieldCheck size={16} /></div>
                       <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Safe & Verified Platform</span>
                    </div>
                 </div>
              </div>

              {/* Feed List */}
              <div className="lg:col-span-2 space-y-6 reveal-on-scroll delay-100">
                 <div className="max-h-[800px] overflow-y-auto pr-4 custom-scrollbar space-y-6 pb-10">
                    {messages.map((msg, idx) => (
                       <div 
                          key={msg.id} 
                          className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 shadow-md border border-stone-100 dark:border-stone-800 flex gap-6 hover:shadow-2xl hover:scale-[1.01] transition-all group animate-fade-in-up"
                          style={{ animationDelay: `${idx * 50}ms` }}
                       >
                          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 flex-shrink-0 text-sm shadow-inner group-hover:rotate-12 transition-transform">
                             {msg.initials}
                          </div>
                          <div className="flex-1">
                             <div className="flex justify-between items-start mb-3">
                                <div>
                                   <h4 className="font-bold text-stone-900 dark:text-stone-100">{msg.author}</h4>
                                   <div className="flex items-center gap-3 text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">
                                      <span className="flex items-center gap-1"><Clock size={10} /> {formatTime(msg.timestamp)}</span>
                                      <span className="text-emerald-500">• Verified Member</span>
                                   </div>
                                </div>
                                {user?.name === msg.author && (
                                   <button onClick={() => deleteMessage(msg.id)} className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                      <Trash2 size={16} />
                                   </button>
                                )}
                             </div>
                             <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                                {msg.text}
                             </p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title Centered and Animated */}
            <div className="text-center mb-16 reveal-on-scroll">
               <h2 className="text-4xl md:text-5xl font-serif-display text-glutivia-dark dark:text-[#D4C4B0] font-normal italic mb-6">
                 ({t('community_title')})
               </h2>
               <div className="w-24 h-1 bg-glutivia-gold mx-auto mb-6 rounded-full opacity-30"></div>
               <p className="text-stone-500 dark:text-stone-400 max-w-xl mx-auto text-lg leading-relaxed">{t('community_sub')}</p>
            </div>

            <div className="max-w-4xl mx-auto reveal-on-scroll stagger-1">
               <div className={`bg-white dark:bg-stone-800 p-8 md:p-12 rounded-[3rem] shadow-xl border border-stone-100 dark:border-stone-700 relative transition-all duration-500 hover:shadow-2xl ${animateTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="absolute top-8 left-8 text-glutivia-green/10 dark:text-glutivia-green/5 animate-pulse"><Quote size={80} /></div>
                  <div className="relative z-10 flex flex-col h-full">
                     <div className="inline-flex items-center gap-1.5 bg-[#8B5E34] text-white px-4 py-2 rounded-full text-xs font-bold w-fit mb-8 shadow-md">
                        <Star size={14} fill="currentColor" /> {TESTIMONIALS[currentTestimonial].rating}
                     </div>
                     <p className="text-2xl md:text-3xl font-serif-display text-glutivia-dark dark:text-stone-100 leading-relaxed italic mb-10 min-h-[140px] flex items-center">
                        "{TESTIMONIALS[currentTestimonial].quote}"
                     </p>
                     <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-4 text-start group">
                           <div className="relative">
                              <img src={TESTIMONIALS[currentTestimonial].image} className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-stone-700 shadow-md transition-transform group-hover:scale-105" />
                              <div className="absolute -bottom-1 -right-1 bg-glutivia-green text-white p-1 rounded-full shadow-lg scale-75"><Check size={12} strokeWidth={4} /></div>
                           </div>
                           <div>
                              <div className="font-bold text-stone-900 dark:text-stone-100 text-lg">{TESTIMONIALS[currentTestimonial].name}</div>
                              <div className="text-stone-500 dark:text-stone-400 text-xs font-bold uppercase tracking-wider">{TESTIMONIALS[currentTestimonial].location}</div>
                           </div>
                        </div>
                        <div className="flex gap-3">
                           <button onClick={prevTestimonial} className="p-4 bg-white dark:bg-stone-700 border border-stone-100 dark:border-stone-600 rounded-2xl hover:bg-glutivia-cream transition-all shadow-sm active:scale-90"><ChevronLeft size={24} className="rtl:rotate-180" /></button>
                           <button onClick={nextTestimonial} className="p-4 bg-[#8B5E34] text-white rounded-2xl hover:bg-[#6D4A29] transition-all shadow-lg active:scale-90"><ChevronRight size={24} className="rtl:rotate-180" /></button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white dark:bg-stone-950 transition-colors duration-300 border-t border-stone-100 dark:border-stone-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-16 reveal-on-scroll">
               <h2 className="text-4xl md:text-6xl font-bold text-[#14532D] dark:text-stone-100 mb-6">{t('pricing_title')}</h2>
               <p className="text-stone-600 dark:text-stone-400 text-xl font-light">{t('pricing_sub')}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-center">
               <div className="reveal-on-scroll bg-[#F9F9F9] dark:bg-stone-800 rounded-[3rem] p-12 border border-stone-100 dark:border-stone-700 flex flex-col min-h-[500px] hover:shadow-xl transition-shadow">
                  <h3 className="text-3xl font-bold mb-4">{t('plan_free')}</h3>
                  <div className="flex items-baseline gap-2 mb-10 justify-center"><span className="text-5xl font-bold text-[#15803D]">0 DH</span><span className="text-lg text-stone-500">/ month</span></div>
                  <ul className="space-y-6 mb-12 flex-grow text-start">
                     <li className="flex items-center gap-4 text-stone-700 dark:text-stone-300"><Check size={24} className="text-[#15803D]" /> {t('feature_check')}</li>
                     <li className="flex items-center gap-4 text-stone-700 dark:text-stone-300"><Check size={24} className="text-[#15803D]" /> {t('feature_ai')}</li>
                  </ul>
                  <button className="w-full py-5 rounded-2xl border-2 border-[#15803D] text-[#15803D] font-bold text-xl cursor-default">{t('current_plan')}</button>
               </div>

               <div className="reveal-on-scroll bg-[#14532D] rounded-[3.5rem] p-12 shadow-2xl flex flex-col min-h-[550px] relative transform lg:scale-105 hover:shadow-emerald-500/10 transition-shadow">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#EAB308] text-[#14532D] text-sm font-bold px-8 py-2 rounded-2xl uppercase tracking-widest animate-bounce" style={{ animationDuration: '3s' }}>MOST POPULAR</div>
                  <h3 className="text-3xl font-bold text-white mb-4">{t('plan_pro')}</h3>
                  <div className="flex items-baseline gap-2 mb-10 justify-center"><span className="text-5xl font-bold text-[#EAB308]">99 DH</span><span className="text-lg text-white/70">/ month</span></div>
                  <ul className="space-y-6 mb-12 flex-grow text-start">
                     <li className="flex items-center gap-4 text-white"><Check size={24} className="text-[#EAB308]" /> {t('feature_check')}</li>
                     <li className="flex items-center gap-4 text-white"><Check size={24} className="text-[#EAB308]" /> {t('feature_ai')} (Unlimited)</li>
                     <li className="flex items-center gap-4 text-white"><Check size={24} className="text-[#EAB308]" /> {t('feature_discount')}</li>
                  </ul>
                  <button onClick={() => handleOpenPlan(t('plan_pro'), '99 DH')} className={`w-full py-5 rounded-2xl ${isAuthenticated ? 'bg-[#EAB308] text-[#14532D] hover:bg-white' : 'bg-stone-500/50 text-white cursor-not-allowed'} font-bold text-xl transition-all flex items-center justify-center gap-3`}>
                     {!isAuthenticated && <Lock size={20} />}
                     {isAuthenticated ? t('select_plan') : "Login to Select"}
                  </button>
               </div>

               <div className="reveal-on-scroll bg-[#F9F9F9] dark:bg-stone-800 rounded-[3rem] p-12 border border-stone-100 dark:border-stone-700 flex flex-col min-h-[500px] hover:shadow-xl transition-shadow">
                  <h3 className="text-3xl font-bold mb-4">{t('plan_family')}</h3>
                  <div className="flex items-baseline gap-2 mb-10 justify-center"><span className="text-5xl font-bold text-[#15803D]">199 DH</span><span className="text-lg text-stone-500">/ month</span></div>
                  <ul className="space-y-6 mb-12 flex-grow text-start">
                     <li className="flex items-center gap-4 text-stone-700 dark:text-stone-300"><Check size={24} className="text-[#15803D]" /> {t('feature_check')} (5 Users)</li>
                     <li className="flex items-center gap-4 text-stone-700 dark:text-stone-300"><Check size={24} className="text-[#15803D]" /> {t('feature_delivery')}</li>
                     <li className="flex items-center gap-4 text-stone-700 dark:text-stone-300"><Check size={24} className="text-[#15803D]" /> {t('feature_discount')} (15%)</li>
                  </ul>
                  <button onClick={() => handleOpenPlan(t('plan_family'), '199 DH')} className={`w-full py-5 rounded-2xl border-2 ${isAuthenticated ? 'border-[#15803D] text-[#15803D] hover:bg-[#15803D] hover:text-white' : 'border-stone-400 text-stone-400 cursor-not-allowed'} font-bold text-xl transition-all flex items-center justify-center gap-3`}>
                     {!isAuthenticated && <Lock size={20} />}
                     {isAuthenticated ? t('select_plan') : "Login to Select"}
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* Plan Modal */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-stone-900 w-full max-w-xl rounded-[3rem] shadow-3xl overflow-hidden animate-float-up flex flex-col">
            <div className="p-8 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center bg-[#FDFBF7] dark:bg-stone-900">
               <h2 className="text-2xl font-bold text-[#14532D] dark:text-stone-100">Activate {selectedPlan?.name}</h2>
               <button onClick={() => setIsPlanModalOpen(false)} className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full"><X size={24} /></button>
            </div>
            <div className="p-10">
              {subStep === 'form' ? (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" value={formData.fullName} readOnly className="w-full p-4 bg-stone-100 dark:bg-stone-800 border rounded-2xl outline-none opacity-70" required />
                    <input type="email" placeholder="Email" value={formData.email} readOnly className="w-full p-4 bg-stone-100 dark:bg-stone-800 border rounded-2xl outline-none opacity-70" required />
                  </div>
                  <input type="text" placeholder="Card Number" value={formData.cardNumber} onChange={(e) => setFormData({...formData, cardNumber: formatCardNumber(e.target.value)})} className="w-full p-4 bg-stone-50 dark:bg-stone-800 border rounded-2xl outline-none" required maxLength={19} />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" value={formData.expiry} onChange={(e) => setFormData({...formData, expiry: formatExpiry(e.target.value)})} className="w-full p-4 bg-stone-50 dark:bg-stone-800 border rounded-2xl outline-none" required maxLength={5} />
                    <input type="password" placeholder="CVV" value={formData.cvv} onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '')})} className="w-full p-4 bg-stone-50 dark:bg-stone-800 border rounded-2xl outline-none" required maxLength={3} />
                  </div>
                  <button type="submit" className="w-full py-5 bg-[#EAB308] text-[#14532D] rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all">
                    Pay {selectedPlan?.price}
                  </button>
                </form>
              ) : subStep === 'processing' ? (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                  <Loader2 size={64} className="animate-spin text-[#15803D]" />
                  <h3 className="text-2xl font-bold text-[#14532D]">Processing Activation...</h3>
                </div>
              ) : (
                <div className="py-10 text-center space-y-8 animate-fade-in">
                  <div className="w-24 h-24 bg-emerald-100 text-[#15803D] rounded-full flex items-center justify-center mx-auto shadow-xl"><Check size={60} /></div>
                  <h3 className="text-3xl font-bold text-[#14532D]">Account Verified!</h3>
                  <button onClick={() => setIsPlanModalOpen(false)} className="px-12 py-4 bg-[#14532D] text-white rounded-full font-bold uppercase tracking-widest text-sm">Close</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="bg-glutivia-dark dark:bg-black py-24 relative overflow-hidden transition-colors duration-300 text-center">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-glutivia-gold/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 reveal-on-scroll">
          <h2 className="text-4xl md:text-5xl font-serif-display italic text-white mb-12">{t('join_community')}</h2>
          <Link to="/market" className="inline-flex items-center gap-2 px-12 py-5 bg-glutivia-gold text-glutivia-dark font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
            {t('start_shopping')} <ArrowRight size={20} className="rtl:rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
