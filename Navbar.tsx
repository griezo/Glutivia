
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Sun, Moon, Globe, User, LogOut, Settings } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Logo } from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/#about', label: t('nav_about'), isHash: true },
    { path: '/market', label: t('nav_market'), isHash: false },
    { path: '/meals', label: t('nav_meals'), isHash: false },
    { path: '/kitchen', label: t('nav_kitchen'), isHash: false },
    { path: '/#pricing', label: t('nav_pricing'), isHash: true },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: { path: string, isHash: boolean }) => {
    if (link.isHash) {
      e.preventDefault();
      const hash = link.path.split('#')[1];
      if (location.pathname !== '/') {
        navigate(`/#${hash}`);
      } else {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const toggleLanguage = () => {
    if (language === 'en') setLanguage('fr');
    else if (language === 'fr') setLanguage('ar');
    else setLanguage('en');
  };

  const getLanguageLabel = () => {
    if (language === 'en') return 'EN';
    if (language === 'fr') return 'FR';
    return 'AR';
  };

  const getNavbarClasses = () => {
    const baseClasses = 'top-0 z-50 w-full transition-all duration-500 ease-in-out';
    if (isHome) {
      if (isScrolled) {
        return `${baseClasses} fixed bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 shadow-sm`;
      }
      return `${baseClasses} fixed bg-transparent text-white border-transparent`;
    }
    return `${baseClasses} sticky bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 shadow-sm`;
  };

  const getIconClasses = () => {
      if (isHome && !isScrolled) {
          return 'text-white hover:text-emerald-200 transition-colors duration-300';
      }
      return 'text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300';
  }

  const logoContainerClasses = `transition-all duration-500 ease-in-out flex items-center justify-center ${
    isHome && !isScrolled 
      ? 'bg-[#FFF8E7] px-4 py-2 rounded-sm shadow-lg transform scale-100' 
      : 'bg-transparent px-0 py-0 shadow-none transform scale-95'
  }`;

  const formatDisplayName = (name: string | undefined) => {
    if (!name) return 'Guest';
    return name.split(' ').map(n => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()).join(' ');
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return 'GU';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  };

  return (
    <nav className={getNavbarClasses()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center relative">
          
          <Link to="/" className="flex items-center group z-10">
             <div className={logoContainerClasses}>
                <Logo className="h-10" />
             </div>
          </Link>

          <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 z-0">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium text-sm transition-colors duration-300 ${isHome && !isScrolled ? 'text-white/90 hover:text-white' : 'text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400'}`}
                  onClick={(e) => handleLinkClick(e, link)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 z-10">
             {isAuthenticated ? (
               <div className="flex items-center gap-3 pr-2 border-r border-stone-200 dark:border-stone-700 relative">
                 <div className="hidden lg:flex flex-col items-end cursor-pointer" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.15em] opacity-60 ${isHome && !isScrolled ? 'text-white' : 'text-stone-500'}`}>
                       Member
                    </span>
                    <span className={`text-xs font-bold tracking-wide ${isHome && !isScrolled ? 'text-white' : 'text-stone-900 dark:text-stone-100'}`}>
                       {formatDisplayName(user?.name)}
                    </span>
                 </div>
                 <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all hover:scale-105 active:scale-95 ${isHome && !isScrolled ? 'bg-white/10 border-white/20 text-white' : 'bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400'}`}
                 >
                    {getInitials(user?.name)}
                 </button>

                 {isProfileMenuOpen && (
                   <div className="absolute top-full right-0 mt-3 w-48 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-100 dark:border-stone-800 overflow-hidden animate-fade-in z-50">
                      <div className="p-4 border-b border-stone-50 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/50">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Signed in as</p>
                        <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">{user?.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center gap-3 p-4 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                        <Settings size={16} /> My Account
                      </Link>
                      <button onClick={() => { logout(); setIsProfileMenuOpen(false); }} className="w-full flex items-center gap-3 p-4 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left font-bold">
                        <LogOut size={16} /> Logout
                      </button>
                   </div>
                 )}
               </div>
             ) : (
               <Link to="/login" className={`p-2 ${getIconClasses()}`} title="Customer Login">
                 <User size={22} />
               </Link>
             )}

             <button onClick={toggleLanguage} className={`p-2 flex items-center gap-1 font-bold text-xs rounded-full border border-current ${getIconClasses()}`}>
                <Globe size={16} />
                <span>{getLanguageLabel()}</span>
             </button>

             <button onClick={toggleTheme} className={`p-2 ${getIconClasses()}`}>
               {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>

            <Link to="/cart" className={`relative p-2 ${getIconClasses()}`}>
              <ShoppingBag size={24} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-500 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <button className={`md:hidden p-2 ${getIconClasses()}`} onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute w-full left-0 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={(e) => handleLinkClick(e, link)} className="block px-3 py-4 rounded-md text-base font-medium text-stone-600 dark:text-stone-300">
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
               <div className="border-t border-stone-100 dark:border-stone-800">
                 <Link to="/profile" onClick={() => setIsOpen(false)} className="px-3 py-4 flex items-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center font-bold">
                       {getInitials(user?.name)}
                    </div>
                    <div>
                       <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{formatDisplayName(user?.name)}</p>
                       <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">View Profile</p>
                    </div>
                 </Link>
                 <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left px-3 py-4 text-red-500 font-bold flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/10">
                   <LogOut size={18} /> Logout
                 </button>
               </div>
            ) : (
               <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-emerald-600 font-bold border-t border-stone-100 dark:border-stone-800">
                 Login / Register
               </Link>
            )}
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
