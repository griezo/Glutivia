import React from 'react';
import { Meal } from '../types';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ShoppingBag, Flame, Leaf, Clock, Award, Star } from 'lucide-react';

const Meals: React.FC = () => {
  const { addToCart } = useCart();
  const { t, language } = useLanguage();

   const getTrans = (en: string, fr: string, ar: string) => {
    if (language === 'fr') return fr;
    if (language === 'ar') return ar;
    return en;
  };

  const MEALS: Meal[] = [
    { 
      id: 'm1', 
      name: getTrans('Glutivia Herb-Crusted Salmon', 'Saumon en Croûte d\'Herbes Glutivia', 'سلمون غلوتيفيا بالأعشاب'), 
      calories: 450, 
      price: 189, 
      image: 'picture/Gemini_Generated_Image_dsms9pdsms9pdsms.png',
      ingredients: ['Wild Salmon', 'Organic Quinoa', 'Asparagus', 'Dill Sauce'],
      tags: ['High Protein', 'Keto Friendly', '100% GF'],
      macros: { protein: 35, carbs: 12, fat: 28 }
    },
    { 
      id: 'm2', 
      name: getTrans('Glutivia Truffle Risotto', 'Risotto à la Truffe Glutivia', 'ريزوتو الكمأة غلوتيفيا'), 
      calories: 520, 
      price: 165, 
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Arborio Rice', 'Wild Mushrooms', 'Truffle Oil', 'Parmesan'],
      tags: ['Vegetarian', 'Comfort Food', '100% GF'],
      macros: { protein: 14, carbs: 65, fat: 22 }
    },
    { 
      id: 'm3', 
      name: getTrans('Glutivia Zucchini Pad Thai', 'Pad Thaï de Courgettes Glutivia', 'باد تاي الكوسا غلوتيفيا'), 
      calories: 380, 
      price: 145, 
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Spiralized Zucchini', 'Non-GMO Tofu', 'Peanuts', 'Tamarind Sauce'],
      tags: ['Vegan', 'Low Carb', '100% GF'],
      macros: { protein: 18, carbs: 15, fat: 16 }
    },
    { 
      id: 'm4', 
      name: getTrans('Glutivia Steak & Sweet Potato', 'Steak et Patate Douce Glutivia', 'ستيك وبطاطا حلوة غلوتيفيا'), 
      calories: 600, 
      price: 210, 
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Grass-fed Beef', 'Sweet Potato Mash', 'Broccolini', 'House Spices'],
      tags: ['Paleo', 'High Protein', '100% GF'],
      macros: { protein: 45, carbs: 40, fat: 25 }
    },
    { 
      id: 'm5', 
      name: getTrans('Glutivia Beef Lasagna', 'Lasagne au Bœuf Glutivia', 'لازانيا اللحم غلوتيفيا'), 
      calories: 580, 
      price: 175, 
      image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80',
      ingredients: ['GF Pasta Sheets', 'Ground Beef', 'Béchamel Sauce (GF)', 'Mozzarella'],
      tags: ['Family Favorite', 'Italian', '100% GF'],
      macros: { protein: 32, carbs: 45, fat: 28 }
    },
    { 
      id: 'm6', 
      name: getTrans('Roast Herb Chicken', 'Poulet Rôti aux Herbes', 'دجاج مشوي بالأعشاب'), 
      calories: 420, 
      price: 155, 
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Half Chicken', 'Root Vegetables', 'Rosemary', 'Garlic'],
      tags: ['Traditional', 'High Protein', '100% GF'],
      macros: { protein: 38, carbs: 15, fat: 22 }
    },
    { 
      id: 'm7', 
      name: getTrans('Quinoa Power Bowl', 'Bol d\'Énergie au Quinoa', 'وعاء الكينوا الصحي'), 
      calories: 350, 
      price: 135, 
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Tri-color Quinoa', 'Kale', 'Sweet Potatoes', 'Tahini Dressing'],
      tags: ['Vegan', 'Nutrient Dense', '100% GF'],
      macros: { protein: 12, carbs: 48, fat: 14 }
    },
    { 
      id: 'm8', 
      name: getTrans('Atlas Lamb Tagine', 'Tajine d\'Agneau de l\'Atlas', 'طاجن لحم الأطلس'), 
      calories: 620, 
      price: 225, 
      image: 'picture/Gemini_Generated_Image_6ojp4p6ojp4p6ojp.png',
      ingredients: ['Lamb Shank', 'Dried Apricots', 'Prunes', 'Glutivia Saffron'],
      tags: ['Exotic', 'Slow Cooked', '100% GF'],
      macros: { protein: 42, carbs: 25, fat: 38 }
    },
    { 
      id: 'm9', 
      name: getTrans('Veggie Shepherd\'s Pie', 'Hachis Parmentier Végé', 'فطيرة الراعي النباتية'), 
      calories: 410, 
      price: 145, 
      image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Lentils', 'Mashed Potatoes', 'Peas', 'Carrots', 'House Gravy (GF)'],
      tags: ['Vegetarian', 'Hearty', '100% GF'],
      macros: { protein: 15, carbs: 55, fat: 12 }
    },
    { 
      id: 'm10', 
      name: getTrans('Chicken Alfredo (GF)', 'Poulet Alfredo (GF)', 'دجاج ألفريدو خالي من الغلوتين'), 
      calories: 550, 
      price: 168, 
      image: 'picture/Gemini_Generated_Image_svrnjtsvrnjtsvrn.png',
      ingredients: ['GF Fettuccine', 'Chicken Breast', 'Creamy Sauce', 'Parsley'],
      tags: ['Creamy', 'Italian', '100% GF'],
      macros: { protein: 34, carbs: 42, fat: 26 }
    },
    { 
      id: 'm11', 
      name: getTrans('Mediterranean Falafel Bowl', 'Bol Falafel Méditerranéen', 'وعاء الفلافل المتوسطي'), 
      calories: 440, 
      price: 139, 
      image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=800&q=80',
      ingredients: ['GF Falafel', 'Hummus', 'Cucumber Salad', 'Rice'],
      tags: ['Vegan', 'Classic', '100% GF'],
      macros: { protein: 14, carbs: 52, fat: 18 }
    },
    { 
      id: 'm12', 
      name: getTrans('Honey Glazed Duck', 'Canard Glacé au Miel', 'بط مشوي بالعسل'), 
      calories: 680, 
      price: 260, 
      image: 'picture/Gemini_Generated_Image_ykzshxykzshxykzs (1).png',
      ingredients: ['Duck Breast', 'Glutivia Honey', 'Balsamic Glaze', 'Wilted Spinach'],
      tags: ['Gourmet', 'Chef Spec', '100% GF'],
      macros: { protein: 38, carbs: 12, fat: 45 }
    },
    { 
      id: 'm13', 
      name: getTrans('GF Beef Stroganoff', 'Bœuf Stroganoff SG', 'بيف ستروغانوف خالي من الغلوتين'), 
      calories: 540, 
      price: 185, 
      image: 'picture/Gemini_Generated_Image_bgzf3zbgzf3zbgzf.png',
      ingredients: ['Tender Beef Strips', 'GF Fusilli', 'Mushroom Cream Sauce', 'Sour Cream', 'Onions'],
      tags: ['Comfort Food', 'Classic', '100% GF'],
      macros: { protein: 30, carbs: 48, fat: 26 }
    },
    { 
      id: 'm14', 
      name: getTrans('Teriyaki Chicken Bowl', 'Bol de Poulet Teriyaki', 'وعاء دجاج تيرياكي'), 
      calories: 460, 
      price: 155, 
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Grilled Chicken', 'GF Tamari Sauce', 'Steamed Broccoli', 'Brown Rice', 'Sesame Seeds'],
      tags: ['Healthy', 'Low Fat', '100% GF'],
      macros: { protein: 35, carbs: 55, fat: 12 }
    },
    { 
      id: 'm15', 
      name: getTrans('Creamy Pumpkin Soup', 'Velouté de Potiron Crémeux', 'شوربة اليقطين الكريمية'), 
      calories: 280, 
      price: 85, 
      image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Roasted Pumpkin', 'Coconut Milk', 'Ginger', 'Pepitas', 'House Blend Spices'],
      tags: ['Vegan', 'Low Calorie', '100% GF'],
      macros: { protein: 6, carbs: 32, fat: 14 }
    },
    { 
      id: 'm16', 
      name: getTrans('Vegan Lentil Curry', 'Curry de Lentilles Végan', 'كاري العدس النباتي'), 
      calories: 420, 
      price: 125, 
      image: 'picture/Gemini_Generated_Image_5fhi1u5fhi1u5fhi.png',
      ingredients: ['Red Lentils', 'Spinach', 'Coconut Cream', 'Turmeric', 'Basmati Rice (GF)'],
      tags: ['Vegan', 'Hearty', '100% GF'],
      macros: { protein: 22, carbs: 62, fat: 8 }
    },
    { 
      id: 'm17', 
      name: getTrans('GF Seafood Paella', 'Paella aux Fruits de Mer SG', 'باييلا فواكه البحر خالية من الغلوتين'), 
      calories: 520, 
      price: 195, 
      image: 'picture/Gemini_Generated_Image_tswja8tswja8tswj.png',
      ingredients: ['Spanish Rice', 'Shrimp', 'Mussels', 'Squid', 'Saffron', 'Bell Peppers', 'Peas'],
      tags: ['Premium', 'Spanish', '100% GF'],
      macros: { protein: 28, carbs: 58, fat: 18 }
    },
    { 
      id: 'm18', 
      name: getTrans('GF Veggie Moussaka', 'Moussaka Végétarienne SG', 'مسقعة نباتية خالية من الغلوتين'), 
      calories: 390, 
      price: 145, 
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Eggplant', 'Potatoes', 'Lentil Ragu', 'GF Béchamel', 'Nutmeg', 'Greek Herbs'],
      tags: ['Vegetarian', 'Hearty', '100% GF'],
      macros: { protein: 18, carbs: 42, fat: 16 }
    },
    { 
      id: 'm19', 
      name: getTrans('GF Turkey Meatballs & Zoodles', 'Boulettes de Dinde et Zoodles SG', 'كرات ديك رومي مع زoodles'), 
      calories: 320, 
      price: 155, 
      image: 'picture/Gemini_Generated_Image_a0uuwla0uuwla0uu.png',
      ingredients: ['Ground Turkey', 'GF Breadcrumbs', 'Zucchini Spirals', 'Tomato Basil Marinara', 'Garlic'],
      tags: ['Low Carb', 'High Protein', '100% GF'],
      macros: { protein: 32, carbs: 12, fat: 14 }
    },
    { 
      id: 'm20', 
      name: getTrans('Mediterranean Stuffed Eggplant', 'Aubergine Farcie Méditerranéenne', 'باذنجان محشو متوسطي'), 
      calories: 340, 
      price: 135, 
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
      ingredients: ['Roasted Eggplant', 'Chickpeas', 'Tahini Glaze', 'Pomegranate Seeds', 'Fresh Parsley', 'Quinoa'],
      tags: ['Vegan', 'Clean Eating', '100% GF'],
      macros: { protein: 12, carbs: 45, fat: 15 }
    }
  ];

  return (
    <div className="min-h-screen bg-glutivia-cream dark:bg-stone-950 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 mb-4">
             <Star size={16} fill="#EAB308" className="text-glutivia-gold" />
             <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">{t('nav_meals')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif-display text-glutivia-dark dark:text-[#D4C4B0] font-bold mt-2 leading-tight">
            {t('meals_title')}
          </h1>
          <p className="mt-6 text-xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            {t('meals_sub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {MEALS.map((meal, index) => (
            <div key={meal.id} className={`reveal-on-scroll bg-white dark:bg-stone-800 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-50 dark:border-stone-700 flex flex-col lg:flex-row group h-full hover:-translate-y-2 ${index % 2 === 0 ? '' : 'delay-100'}`}>
              
              <div className="lg:w-2/5 relative h-72 lg:h-auto overflow-hidden p-6 lg:pb-6 lg:pr-0">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-stone-100 relative">
                  <img src={meal.image} alt={meal.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-4 end-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-bold text-glutivia-green shadow-xl border border-white/20 rtl:right-auto rtl:left-4">
                    <Award size={14} className="inline-block mr-1 text-glutivia-gold" /> {t('kitchen_title')}
                  </div>
                </div>
              </div>

              <div className="lg:w-3/5 p-8 lg:pl-10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-glutivia-green dark:text-stone-100 leading-tight group-hover:text-glutivia-brown transition-colors">{meal.name}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {meal.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-stone-50 dark:bg-stone-900 text-stone-500 dark:text-stone-400 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-stone-100 dark:border-stone-700">{tag}</span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-8 bg-stone-50 dark:bg-stone-900/50 p-4 rounded-3xl border border-stone-100 dark:border-stone-800">
                    <div className="text-center">
                      <div className="text-[10px] text-stone-400 dark:text-stone-500 uppercase font-bold tracking-widest mb-1">{t('nut_protein')}</div>
                      <div className="font-bold text-glutivia-green dark:text-stone-100 text-lg">{meal.macros.protein}g</div>
                    </div>
                    <div className="text-center border-x border-stone-200 dark:border-stone-700 px-2">
                      <div className="text-[10px] text-stone-400 dark:text-stone-500 uppercase font-bold tracking-widest mb-1">{t('nut_carbs')}</div>
                      <div className="font-bold text-glutivia-green dark:text-stone-100 text-lg">{meal.macros.carbs}g</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-stone-400 dark:text-stone-500 uppercase font-bold tracking-widest mb-1">{t('nut_fat')}</div>
                      <div className="font-bold text-glutivia-green dark:text-stone-100 text-lg">{meal.macros.fat}g</div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center gap-4 text-stone-400 dark:text-stone-500 text-xs font-bold uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-1.5"><Flame size={16} className="text-orange-500" /> {meal.calories} kcal</span>
                      <span className="flex items-center gap-1.5"><Clock size={16} className="text-blue-500" /> 5 MINS HEAT</span>
                    </div>
                    <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed line-clamp-2 italic">
                      {meal.ingredients.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-stone-50 dark:border-stone-700">
                  <span className="text-3xl font-bold text-glutivia-brown dark:text-glutivia-gold">{meal.price} <span className="text-xs uppercase tracking-widest text-stone-400">DH</span></span>
                  <button onClick={() => addToCart({ ...meal, quantity: 1, type: 'meal', image: meal.image })} className="flex items-center justify-center gap-3 px-8 py-4 bg-glutivia-brown hover:bg-glutivia-brown-dark text-white rounded-2xl transition-all font-bold text-sm uppercase tracking-widest shadow-xl active:scale-95 transform">
                    <ShoppingBag size={18} /> {t('add_to_cart')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meals;