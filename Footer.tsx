
import React from 'react';
import { Heart, Instagram, Twitter, Facebook, Lock, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="mb-6">
              <Logo className="h-10" />
            </div>
            <p className="text-stone-500 dark:text-stone-400 max-w-sm leading-relaxed">
              {t('footer_desc')}
            </p>
            <div className="mt-8 flex items-center gap-4">
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all">
                  <Instagram size={20} />
               </a>
               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                  <Twitter size={20} />
               </a>
               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                  <Facebook size={20} />
               </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-6 uppercase tracking-widest text-xs">{t('shop')}</h4>
            <ul className="space-y-4 text-stone-600 dark:text-stone-400 text-sm font-medium">
              <li>
                <Link to="/market?category=pantry" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {t('pantry_essentials')}
                </Link>
              </li>
              <li>
                <Link to="/meals" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {t('fresh_meals')}
                </Link>
              </li>
              <li>
                <Link to="/market?category=snack" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {t('snacks')}
                </Link>
              </li>
              <li>
                <Link to="/market?category=bakery" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {t('bakery_footer')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-6 uppercase tracking-widest text-xs">{t('company')}</h4>
            <ul className="space-y-4 text-stone-600 dark:text-stone-400 text-sm font-medium">
              <li>
                <Link to="/admin-login" className="flex items-center gap-2 hover:text-stone-900 dark:hover:text-white transition-colors group">
                  <Lock size={14} className="text-stone-400 group-hover:text-amber-500 transition-colors" /> 
                  Admin Access
                </Link>
              </li>
              <li>
                <a href="mailto:contact@glutivia.com" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {t('contact')}
                </a>
              </li>
              <li>
                <Link to="/#about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {t('sustainability')}
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {t('blog')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-100 dark:border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-stone-400 text-xs tracking-wide">
            © {new Date().getFullYear()} Glutivia Inc. {t('rights_reserved')}
          </p>
          <div className="flex items-center gap-2 text-stone-400 text-xs">
            Made with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> for a healthier world.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
