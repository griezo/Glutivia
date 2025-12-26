
import React, { useState } from 'react';
import { generateGlutenFreeRecipe, generateRecipeImage } from '../services/geminiService';
import { GeneratedRecipe } from '../types';
import { Sparkles, ChefHat, Clock, Gauge, Loader2, Camera, BarChart, UtensilsCrossed, X, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface StaticRecipe {
  id: string;
  titleKey: string;
  image: string;
  time: number;
  difficultyKey: string;
  price: number;
  badgeKey?: string;
  badgeColor?: string; // Tailwind color class prefix (e.g. 'emerald', 'orange')
  ingredients: string[];
}

const STATIC_RECIPES: StaticRecipe[] = [
  {
    id: 'r1',
    titleKey: 'rec_msemen',
    image: 'picture/Gemini_Generated_Image_opid43opid43opid (1).png',
    time: 25,
    difficultyKey: 'diff_easy',
    price: 45,
    badgeKey: 'badge_easy',
    badgeColor: 'emerald',
    ingredients: ['Glutivia Gluten-Free Flour', 'Water', 'Salt', 'Vegetable Oil', 'Butter', 'Semolina (GF)']
  },
  {
    id: 'r2',
    titleKey: 'rec_tabbouleh',
    image: 'picture/Gemini_Generated_Image_4eizt14eizt14eiz.png',
    time: 15,
    difficultyKey: 'diff_easy',
    price: 35,
    badgeKey: 'badge_15min',
    badgeColor: 'orange',
    ingredients: ['Quinoa', 'Fresh Parsley', 'Fresh Mint', 'Tomatoes', 'Lemon Juice', 'Olive Oil', 'Cucumber']
  },
  {
    id: 'r3',
    titleKey: 'rec_pancakes',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80',
    time: 20,
    difficultyKey: 'diff_easy',
    price: 38,
    badgeKey: 'badge_popular',
    badgeColor: 'amber',
    ingredients: ['Almond Flour', 'Eggs', 'Almond Milk', 'Vanilla Extract', 'Baking Powder', 'Maple Syrup']
  },
  {
    id: 'r4',
    titleKey: 'rec_tagine',
    image: 'picture/Gemini_Generated_Image_xsl8ynxsl8ynxsl8.png',
    time: 45,
    difficultyKey: 'diff_medium',
    price: 52,
    badgeKey: 'badge_chef',
    badgeColor: 'orange',
    ingredients: ['Chickpeas', 'Tomatoes', 'Onions', 'Garlic', 'Cumin', 'Paprika', 'Carrots', 'Zucchini']
  },
  {
    id: 'r5',
    titleKey: 'rec_cookies',
    image: 'picture/Gemini_Generated_Image_l2oinwl2oinwl2oi.png',
    time: 30,
    difficultyKey: 'diff_easy',
    price: 28,
    badgeKey: 'badge_sweet',
    badgeColor: 'pink',
    ingredients: ['Coconut Flour', 'Butter', 'Sugar or Honey', 'Eggs', 'Chocolate Chips (GF)', 'Vanilla']
  },
  {
    id: 'r6',
    titleKey: 'rec_pasta',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
    time: 18,
    difficultyKey: 'diff_easy',
    price: 42,
    badgeKey: 'badge_lowcarb',
    badgeColor: 'emerald',
    ingredients: ['Zucchini', 'Cherry Tomatoes', 'Garlic', 'Olive Oil', 'Basil', 'Parmesan Cheese']
  },
  {
    id: 'r7',
    titleKey: 'rec_harira',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    time: 60,
    difficultyKey: 'diff_medium',
    price: 48,
    badgeKey: 'badge_classic',
    badgeColor: 'orange',
    ingredients: ['GF Lentils', 'Chickpeas', 'Tomato Paste', 'Glutivia GF Flour (for thickening)', 'Celery', 'Cilantro', 'Ginger', 'Turmeric']
  },
  {
    id: 'r8',
    titleKey: 'rec_peppers',
    image: 'picture/Gemini_Generated_Image_qg7fcfqg7fcfqg7f.png',
    time: 40,
    difficultyKey: 'diff_easy',
    price: 38,
    badgeKey: 'badge_healthy',
    badgeColor: 'emerald',
    ingredients: ['Bell Peppers', 'Cooked Quinoa', 'Black Beans', 'Corn', 'Feta Cheese', 'Lime Juice', 'Cumin']
  },
  {
    id: 'r9',
    titleKey: 'rec_roast_chicken',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80',
    time: 75,
    difficultyKey: 'diff_easy',
    price: 85,
    badgeKey: 'badge_family',
    badgeColor: 'amber',
    ingredients: ['Whole Chicken', 'Lemon', 'Rosemary', 'Garlic', 'Potatoes', 'Olive Oil', 'Sea Salt']
  },
  {
    id: 'r10',
    titleKey: 'rec_bastilla',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80',
    time: 55,
    difficultyKey: 'diff_hard',
    price: 120,
    badgeKey: 'badge_chef',
    badgeColor: 'orange',
    ingredients: ['GF Filo Sheets (Rice based)', 'Shrimp', 'Calamari', 'White Fish', 'GF Vermicelli', 'Ginger', 'Saffron', 'Butter']
  },
  {
    id: 'r11',
    titleKey: 'rec_brownies',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    time: 35,
    difficultyKey: 'diff_easy',
    price: 55,
    badgeKey: 'badge_sweet',
    badgeColor: 'pink',
    ingredients: ['Mashed Sweet Potato', 'Almond Butter', 'Maple Syrup', 'Cocoa Powder', 'GF Dark Chocolate Chips', 'Sea Salt']
  },
  {
    id: 'r12',
    titleKey: 'rec_pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    time: 40,
    difficultyKey: 'diff_medium',
    price: 65,
    badgeKey: 'badge_lowcarb',
    badgeColor: 'emerald',
    ingredients: ['Cauliflower Rice', 'Mozzarella', 'Eggs', 'Glutivia GF Oregano', 'Tomato Puree', 'Basil', 'Bell Peppers']
  }
];

const AIKitchen: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [mealType, setMealType] = useState('Dinner');
  const [recipe, setRecipe] = useState<GeneratedRecipe | null>(null);
  const [recipeImage, setRecipeImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<StaticRecipe | null>(null);
  const [staticGeneratedImage, setStaticGeneratedImage] = useState<string | null>(null);
  const [staticImageLoading, setStaticImageLoading] = useState(false);
  
  const { t, language } = useLanguage();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    setLoading(true);
    setError('');
    setRecipe(null);
    setRecipeImage(null);

    const resultsElement = document.getElementById('ai-results');
    if(resultsElement) resultsElement.scrollIntoView({ behavior: 'smooth' });

    try {
      const result = await generateGlutenFreeRecipe(ingredients, mealType, language);
      setRecipe(result);
      setLoading(false);

      setImageLoading(true);
      const image = await generateRecipeImage(result.title);
      setRecipeImage(image);
    } catch (err) {
      console.error(err);
      setError(t('ai_error'));
      setLoading(false); 
    } finally {
      setImageLoading(false);
    }
  };

  const handleRegenerateAIImage = async () => {
    if (!recipe) return;
    setImageLoading(true);
    try {
      const image = await generateRecipeImage(recipe.title);
      setRecipeImage(image);
    } catch (err) {
      console.error(err);
    } finally {
      setImageLoading(false);
    }
  };

  const handleGenerateStaticImage = async () => {
    if (!selectedRecipe) return;
    setStaticImageLoading(true);
    try {
      const title = t(selectedRecipe.titleKey as any);
      const image = await generateRecipeImage(title);
      setStaticGeneratedImage(image);
    } catch (err) {
      console.error(err);
    } finally {
      setStaticImageLoading(false);
    }
  };

  const closeStaticModal = () => {
    setSelectedRecipe(null);
    setStaticGeneratedImage(null);
    setStaticImageLoading(false);
  };

  const getBadgeColorClasses = (color?: string) => {
    switch(color) {
      case 'emerald': return 'bg-emerald-500';
      case 'orange': return 'bg-orange-500';
      case 'amber': return 'bg-[#8B7355]';
      case 'pink': return 'bg-pink-500';
      default: return 'bg-emerald-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-stone-950 transition-colors duration-300">
      
      {/* ------------------- SECTION 1: STATIC RECIPES ------------------- */}
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-sm mb-4">
              {t('collection_badge')}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif-display text-[#5A4A3A] dark:text-[#D4C4B0] font-bold mb-4">
              {t('recipes_header')}
            </h1>
            <p className="text-[#8B7355] dark:text-[#A89885] text-lg max-w-2xl mx-auto leading-relaxed">
              {t('recipes_subheader')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {STATIC_RECIPES.map((item) => (
              <div key={item.id} className="bg-white dark:bg-stone-900 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-[#EBE8E1] dark:border-stone-800 flex flex-col hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden p-4 pb-0">
                  <img 
                    src={item.image} 
                    alt={t(item.titleKey as any)} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 rounded-[2rem]"
                  />
                  {item.badgeKey && (
                     <span className={`absolute top-8 left-8 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg ${getBadgeColorClasses(item.badgeColor)} rtl:left-auto rtl:right-8`}>
                        {t(item.badgeKey as any)}
                     </span>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-glutivia-green dark:text-stone-100 mb-6 font-sans line-clamp-2 leading-tight">
                    {t(item.titleKey as any)}
                  </h3>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center text-sm text-stone-500 dark:text-stone-400 mb-8 border-t border-stone-50 dark:border-stone-800 pt-6">
                      <div className="flex items-center gap-1 font-bold">
                        <Clock size={16} /> {item.time} min
                      </div>
                      <div className="flex items-center gap-1 font-bold uppercase tracking-widest text-[10px]">
                        <BarChart size={16} /> {t(item.difficultyKey as any)}
                      </div>
                      <div className="font-bold text-glutivia-brown dark:text-[#c4a985] text-lg">
                         {item.price} DH
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedRecipe(item)}
                      className="w-full py-4 bg-glutivia-brown hover:bg-glutivia-brown-dark text-white rounded-2xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl active:scale-[0.98]"
                    >
                      {t('view_recipe')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------- AI KITCHEN ------------------- */}
      <div id="ai-kitchen" className="py-20 bg-white dark:bg-stone-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-emerald-100/50 dark:bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-orange-100/50 dark:bg-orange-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-5 bg-emerald-50 dark:bg-emerald-900/30 rounded-[2rem] text-emerald-600 dark:text-emerald-400 mb-6 shadow-xl border border-emerald-100 dark:border-emerald-800">
              <Sparkles size={28} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100">{t('ai_title')}</h1>
            <p className="mt-4 text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
              {t('ai_sub')}
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 rounded-[3rem] shadow-2xl p-8 md:p-12 mb-10 border border-stone-100 dark:border-stone-800 ring-1 ring-stone-900/5">
            <form onSubmit={handleGenerate} className="space-y-8">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-3 uppercase tracking-widest">
                  {t('input_label')}
                </label>
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder={t('input_placeholder')}
                  className="w-full p-6 border border-stone-100 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-[2rem] focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all h-40 resize-none placeholder-stone-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-3 uppercase tracking-widest">
                      {t('meal_type')}
                    </label>
                    <select 
                      value={mealType}
                      onChange={(e) => setMealType(e.target.value)}
                      className="w-full p-4 border border-stone-100 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 outline-none appearance-none"
                    >
                      <option value="Breakfast">{t('breakfast')}</option>
                      <option value="Lunch">{t('lunch')}</option>
                      <option value="Dinner">{t('dinner')}</option>
                      <option value="Snack">{t('snacks')}</option>
                      <option value="Dessert">{t('dessert')}</option>
                    </select>
                 </div>
                 <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={loading || !ingredients.trim()}
                      className="w-full flex items-center justify-center gap-3 py-5 bg-glutivia-brown text-white rounded-2xl hover:bg-glutivia-brown-dark disabled:bg-stone-300 dark:disabled:bg-stone-700 disabled:cursor-not-allowed transition-all font-bold uppercase tracking-widest text-sm shadow-xl active:scale-[0.98]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} /> {t('thinking')}
                        </>
                      ) : (
                        <>
                          <ChefHat size={20} /> {t('generate_btn')}
                        </>
                      )}
                    </button>
                 </div>
              </div>
            </form>
            {error && (
               <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-center text-sm font-bold">
                  {error}
               </div>
            )}
          </div>

          <div id="ai-results">
            {recipe && (
              <div className="bg-white dark:bg-stone-900 rounded-[3rem] shadow-2xl overflow-hidden border border-stone-100 dark:border-stone-800 animate-fade-in mb-20">
                {(recipeImage || imageLoading) && (
                  <div className="w-full h-80 md:h-[450px] bg-stone-100 dark:bg-stone-800 relative overflow-hidden group">
                    {imageLoading ? (
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800">
                         <Loader2 className="animate-spin mb-4 text-emerald-600 dark:text-emerald-400" size={48} />
                         <p className="font-bold uppercase tracking-widest text-sm animate-pulse">
                           {t('developing')}
                         </p>
                       </div>
                    ) : (
                       <>
                         <img src={recipeImage!} alt={recipe.title} className="w-full h-full object-cover animate-fade-in transition-transform duration-1000 group-hover:scale-105" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
                         <button 
                            onClick={handleRegenerateAIImage}
                            disabled={imageLoading}
                            className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 border border-white/30 text-white p-3 px-5 rounded-full backdrop-blur-md transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest disabled:opacity-50 z-20 shadow-xl"
                         >
                            <Camera size={18} /> Regenerate Image
                         </button>
                       </>
                    )}
                  </div>
                )}

                <div className={`p-10 md:p-12 ${recipeImage ? '-mt-24 relative z-10' : ''}`}>
                  <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white dark:border-stone-700">
                    <h2 className="text-4xl md:text-5xl font-serif-display text-glutivia-green mb-4 leading-tight">{recipe.title}</h2>
                    <p className="text-stone-500 dark:text-stone-400 font-medium text-lg leading-relaxed mb-8">{recipe.description}</p>
                    
                    <div className="flex flex-wrap gap-4 mb-10">
                      <div className="flex items-center gap-2 bg-stone-50 dark:bg-stone-800 px-6 py-3 rounded-2xl border border-stone-100 dark:border-stone-700">
                        <Clock size={20} className="text-glutivia-brown" />
                        <span className="font-bold text-stone-800 dark:text-stone-200 uppercase tracking-widest text-xs">{recipe.prepTime}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-stone-50 dark:bg-stone-800 px-6 py-3 rounded-2xl border border-stone-100 dark:border-stone-700">
                        <Gauge size={20} className="text-glutivia-brown" />
                        <span className="font-bold text-stone-800 dark:text-stone-200 uppercase tracking-widest text-xs">{recipe.difficulty}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      <div>
                        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-8 flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
                          <span className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">1</span>
                          {t('ingredients')}
                        </h3>
                        <ul className="space-y-4">
                          {recipe.ingredients.map((ing, idx) => (
                            <li key={idx} className="flex items-center gap-4 text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800 p-4 rounded-2xl border border-stone-100 dark:border-stone-700 hover:border-emerald-200 transition-all group">
                              <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0 group-hover:scale-125 transition-transform" />
                              <span className="font-medium">{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-8 flex items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
                          <span className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">2</span>
                          {t('instructions')}
                        </h3>
                        <div className="space-y-10">
                          {recipe.instructions.map((step, idx) => (
                            <div key={idx} className="relative pl-10 border-l-2 border-emerald-100 dark:border-emerald-900 group">
                              <span className="absolute -left-[11px] top-0 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white dark:border-stone-900 shadow-md transition-transform group-hover:scale-125" />
                              <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-lg font-medium">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-[3rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-stone-100 dark:border-stone-800">
            <button 
              onClick={closeStaticModal}
              className="absolute top-6 right-6 p-3 bg-white/90 dark:bg-stone-800/90 backdrop-blur-md rounded-full text-stone-600 dark:text-stone-300 hover:text-red-500 transition-all z-40 shadow-xl border border-stone-100"
            >
              <X size={24} />
            </button>
            
            <div className="relative h-72 sm:h-96 group">
               <img 
                 src={staticGeneratedImage || selectedRecipe.image} 
                 alt={t(selectedRecipe.titleKey as any)} 
                 className="w-full h-full object-cover transition-opacity duration-300" 
               />
               <button 
                  onClick={handleGenerateStaticImage}
                  disabled={staticImageLoading}
                  className="absolute top-6 right-20 bg-white/30 hover:bg-white/50 border border-white/40 text-white px-5 py-2 rounded-full backdrop-blur-md transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest shadow-xl z-30"
               >
                  {staticImageLoading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Camera size={16} />
                  )}
                  <span>{staticImageLoading ? t('developing') : 'Generate AI Photo'}</span>
               </button>

               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-10 pt-24">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">{t(selectedRecipe.titleKey as any)}</h2>
                  <div className="flex gap-6 text-white/90 text-xs font-bold uppercase tracking-widest">
                     <span className="flex items-center gap-2"><Clock size={18} className="text-glutivia-gold" /> {selectedRecipe.time} min</span>
                     <span className="flex items-center gap-2"><Gauge size={18} className="text-glutivia-gold" /> {t(selectedRecipe.difficultyKey as any)}</span>
                  </div>
               </div>
            </div>

            <div className="p-10">
               <h3 className="text-2xl font-bold text-glutivia-green mb-6 flex items-center gap-3">
                  <UtensilsCrossed className="text-glutivia-brown" size={24} />
                  {t('ingredients')}
               </h3>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {selectedRecipe.ingredients.map((ing, i) => (
                     <div key={i} className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-800 transition-all hover:bg-white hover:shadow-lg hover:-translate-y-1">
                        <CheckCircle2 size={20} className="text-glutivia-green flex-shrink-0" />
                        <span className="text-stone-700 dark:text-stone-300 font-bold text-sm">{ing}</span>
                     </div>
                  ))}
               </div>

               <div className="p-8 bg-glutivia-green/5 dark:bg-emerald-900/10 rounded-[2rem] border-2 border-dashed border-glutivia-green/20 text-center">
                  <p className="text-glutivia-green dark:text-emerald-400 font-serif-display text-xl italic leading-relaxed">
                     "Gluten-free shouldn't mean flavor-free. Certified delicious, strictly safe."
                  </p>
               </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AIKitchen;
