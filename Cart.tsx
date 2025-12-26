
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrderContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Trash2, ShoppingBag, ArrowLeft, Loader2, CreditCard, Truck, CheckCircle, X, ShieldCheck, AlertCircle, User, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

type CheckoutStep = 'cart' | 'customer-info' | 'payment-method' | 'card-details' | 'cod-details' | 'success';

const COUNTRY_CODES = [
  { code: '+212', label: 'MA (+212)' },
  { code: '+33', label: 'FR (+33)' },
  { code: '+971', label: 'AE (+971)' },
  { code: '+1', label: 'US (+1)' },
  { code: '+44', label: 'GB (+44)' },
  { code: '+34', label: 'ES (+34)' },
  { code: '+39', label: 'IT (+39)' },
];

const Cart: React.FC = () => {
  const { items, removeFromCart, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { t } = useLanguage();
  
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    countryCode: '+212',
    phone: '',
    location: ''
  });
  const [cardData, setCardData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/').trim();
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').trim();
    }

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateCustomerInfo = () => {
    const errors: Record<string, string> = {};
    if (!customerInfo.firstName.trim()) errors.firstName = "First name required";
    if (!customerInfo.lastName.trim()) errors.lastName = "Last name required";
    if (!customerInfo.phone.trim()) errors.phone = "Phone number required";
    if (!customerInfo.location.trim()) errors.location = "Delivery location required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCard = () => {
    const errors: Record<string, string> = {};
    if (!cardData.cardName.trim()) errors.cardName = "Name on card required";
    if (cardData.cardNumber.replace(/\s/g, '').length !== 16) errors.cardNumber = "16-digit number required";
    if (!cardData.expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) errors.expiry = "Use MM/YY";
    if (cardData.cvv.length < 3) errors.cvv = "3 digits required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const finalizeOrder = (method: 'card' | 'cod') => {
    addOrder({
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      items: [...items],
      total: total,
      method: method,
      timestamp: new Date().toISOString(),
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
      phone: `${customerInfo.countryCode} ${customerInfo.phone}`,
      location: customerInfo.location
    });
    setStep('success');
    clearCart();
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCard()) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    finalizeOrder('card');
  };

  const handleCODConfirm = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    finalizeOrder('cod');
  };

  if (items.length === 0 && step === 'cart') {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-4 transition-colors duration-300">
        <div className="text-center">
          <div className="w-20 h-20 bg-stone-200 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-400">
            <ShoppingBag size={40} />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">{t('cart_empty')}</h2>
          <p className="text-stone-600 dark:text-stone-400 mb-8">{t('cart_empty_sub')}</p>
          <Link to="/market" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
            <ArrowLeft size={18} className="rtl:rotate-180" /> {t('continue_shopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-12 relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-8">Shopping Cart</h1>

        <div className="bg-white dark:bg-stone-900 rounded-[2rem] shadow-sm border border-stone-100 dark:border-stone-800 overflow-hidden">
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {items.map((item) => (
              <div key={`${item.id}-${item.type}`} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-100 dark:border-stone-700">
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">{item.name}</h3>
                    <div className="text-sm text-stone-500 dark:text-stone-400 capitalize flex items-center gap-2">
                      <span className="bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{item.type}</span>
                      {item.weight && <span>• {item.weight}</span>}
                      <span>• Qty: {item.quantity}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-bold text-stone-900 dark:text-stone-100 text-xl">{(item.price * item.quantity).toFixed(0)} DH</span>
                  <button onClick={() => removeFromCart(item.id)} className="p-3 text-stone-400 hover:text-red-500 rounded-full transition-colors"><Trash2 size={20} /></button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-stone-50 dark:bg-stone-800/50 p-8 border-t border-stone-100 dark:border-stone-800">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-medium text-stone-600 dark:text-stone-400">{t('total')}</span>
              <span className="text-4xl font-bold text-glutivia-green dark:text-stone-100">{total.toFixed(0)} DH</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={clearCart} className="px-8 py-4 border border-stone-300 dark:border-stone-600 rounded-2xl hover:bg-white dark:hover:bg-stone-800 transition-colors font-bold uppercase tracking-widest text-xs">{t('clear_cart')}</button>
              <button onClick={() => setStep('customer-info')} className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-glutivia-brown text-white rounded-2xl hover:bg-glutivia-brown-dark transition-all font-bold uppercase tracking-widest text-xs shadow-xl active:scale-[0.98]">
                <ShoppingBag size={20} /> {t('proceed_checkout')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {step !== 'cart' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-stone-900 w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden border border-stone-100 dark:border-stone-800 animate-float-up">
            
            <div className="p-8 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center bg-stone-50 dark:bg-stone-900">
               <div>
                  <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Checkout</h2>
                  <p className="text-sm text-stone-500">Secure Delivery & Payment</p>
               </div>
               {step !== 'success' && (
                 <button onClick={() => setStep('cart')} className="p-3 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full transition-colors"><X size={24} /></button>
               )}
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Step: Customer Info */}
              {step === 'customer-info' && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-4">Delivery Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">First Name</label>
                      <input type="text" name="firstName" value={customerInfo.firstName} onChange={handleCustomerChange} className={`w-full p-4 bg-stone-50 dark:bg-stone-800 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 ${formErrors.firstName ? 'border-red-500' : 'border-stone-100 dark:border-stone-700'}`} placeholder="Jane" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Last Name</label>
                      <input type="text" name="lastName" value={customerInfo.lastName} onChange={handleCustomerChange} className={`w-full p-4 bg-stone-50 dark:bg-stone-800 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 ${formErrors.lastName ? 'border-red-500' : 'border-stone-100 dark:border-stone-700'}`} placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Phone Number</label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={customerInfo.countryCode}
                        onChange={handleCustomerChange}
                        className="w-32 p-4 bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs font-bold appearance-none cursor-pointer"
                      >
                        {COUNTRY_CODES.map(c => (
                          <option key={c.code} value={c.code}>{c.label}</option>
                        ))}
                      </select>
                      <div className="relative flex-1">
                        <input type="tel" name="phone" value={customerInfo.phone} onChange={handleCustomerChange} className={`w-full p-4 pl-12 bg-stone-50 dark:bg-stone-800 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 ${formErrors.phone ? 'border-red-500' : 'border-stone-100 dark:border-stone-700'}`} placeholder="6XX XXX XXX" />
                        <Phone className="absolute left-4 top-4 text-stone-400" size={20} />
                      </div>
                    </div>
                    {formErrors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Localization / Address</label>
                    <div className="relative">
                      <textarea name="location" value={customerInfo.location} onChange={handleCustomerChange} className={`w-full p-4 pl-12 bg-stone-50 dark:bg-stone-800 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 h-24 resize-none ${formErrors.location ? 'border-red-500' : 'border-stone-100 dark:border-stone-700'}`} placeholder="123 Glutivia St, Casablanca, Morocco"></textarea>
                      <MapPin className="absolute left-4 top-4 text-stone-400" size={20} />
                    </div>
                  </div>
                  <button onClick={() => validateCustomerInfo() && setStep('payment-method')} className="w-full py-5 bg-glutivia-brown text-white rounded-3xl font-bold uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all">Next: Payment Method</button>
                </div>
              )}

              {/* Step: Payment Selection */}
              {step === 'payment-method' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-4">Choose Payment</h3>
                  <button onClick={() => setStep('card-details')} className="w-full p-6 bg-white dark:bg-stone-800 border-2 border-stone-100 dark:border-stone-700 rounded-[2rem] hover:border-glutivia-green transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl flex items-center justify-center"><CreditCard size={24} /></div>
                      <div className="text-left">
                        <div className="font-bold text-stone-900 dark:text-stone-100">Credit / Debit Card</div>
                        <div className="text-xs text-stone-500">Secure instant payment</div>
                      </div>
                    </div>
                  </button>
                  <button onClick={() => setStep('cod-details')} className="w-full p-6 bg-white dark:bg-stone-800 border-2 border-stone-100 dark:border-stone-700 rounded-[2rem] hover:border-glutivia-brown transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-stone-50 dark:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-2xl flex items-center justify-center"><Truck size={24} /></div>
                      <div className="text-left">
                        <div className="font-bold text-stone-900 dark:text-stone-100">Cash on Delivery</div>
                        <div className="text-xs text-stone-500">Pay when your order arrives</div>
                      </div>
                    </div>
                  </button>
                  <button onClick={() => setStep('customer-info')} className="w-full text-stone-500 text-xs font-bold uppercase hover:text-stone-900 dark:hover:text-stone-100 transition-colors">Back to Details</button>
                </div>
              )}

              {/* Step: Card Form */}
              {step === 'card-details' && (
                <form onSubmit={handleCardSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Cardholder Name</label>
                    <input type="text" name="cardName" value={cardData.cardName} onChange={handleCardChange} className={`w-full p-4 bg-stone-50 dark:bg-stone-800 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 ${formErrors.cardName ? 'border-red-500' : 'border-stone-100 dark:border-stone-700'}`} placeholder="Full name on card" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Card Number</label>
                    <div className="relative">
                      <input type="text" name="cardNumber" value={cardData.cardNumber} onChange={handleCardChange} maxLength={19} className={`w-full p-4 pl-12 bg-stone-50 dark:bg-stone-800 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 ${formErrors.cardNumber ? 'border-red-500' : 'border-stone-100 dark:border-stone-700'}`} placeholder="0000 0000 0000 0000" />
                      <CreditCard className="absolute left-4 top-4 text-stone-400" size={20} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">Expiry</label>
                      <input type="text" name="expiry" value={cardData.expiry} onChange={handleCardChange} maxLength={5} className={`w-full p-4 bg-stone-50 dark:bg-stone-800 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 ${formErrors.expiry ? 'border-red-500' : 'border-stone-100 dark:border-stone-700'}`} placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-500 mb-2 uppercase tracking-widest">CVV</label>
                      <input type="password" name="cvv" value={cardData.cvv} onChange={handleCardChange} maxLength={3} className={`w-full p-4 bg-stone-50 dark:bg-stone-800 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 ${formErrors.cvv ? 'border-red-500' : 'border-stone-100 dark:border-stone-700'}`} placeholder="***" />
                    </div>
                  </div>
                  <button disabled={isProcessing} className="w-full py-5 bg-glutivia-green text-white rounded-3xl font-bold uppercase tracking-widest text-sm shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
                    {isProcessing ? <Loader2 className="animate-spin" size={20} /> : `Pay ${total} DH`}
                  </button>
                  <button type="button" onClick={() => setStep('payment-method')} className="w-full text-stone-500 text-xs font-bold uppercase hover:text-stone-900 transition-colors">Back</button>
                </form>
              )}

              {/* Step: COD Confirmation */}
              {step === 'cod-details' && (
                <div className="space-y-6 text-center">
                  <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-3xl flex flex-col items-center gap-4 border border-amber-100 dark:border-amber-800">
                     <AlertCircle className="text-amber-600" size={48} />
                     <h4 className="font-bold text-amber-900 dark:text-amber-100">Order Confirmation</h4>
                     <p className="text-sm text-amber-700 dark:text-amber-200">Payment: <strong>{total} DH</strong> in cash.</p>
                     <p className="text-xs text-stone-400 italic">Delivery to: {customerInfo.firstName} {customerInfo.lastName}, {customerInfo.location}</p>
                     <p className="text-xs text-stone-400">Phone: {customerInfo.countryCode} {customerInfo.phone}</p>
                  </div>
                  <button onClick={handleCODConfirm} disabled={isProcessing} className="w-full py-5 bg-glutivia-brown text-white rounded-3xl font-bold uppercase tracking-widest text-sm shadow-xl active:scale-[0.98] transition-all">
                    {isProcessing ? <Loader2 className="animate-spin" size={20} /> : "Finalize Order"}
                  </button>
                  <button onClick={() => setStep('payment-method')} className="w-full text-stone-500 text-xs font-bold uppercase hover:text-stone-900 transition-colors">Back</button>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center py-10 space-y-6 animate-fade-in">
                  <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"><CheckCircle size={60} /></div>
                  <h2 className="text-4xl font-serif-display font-bold text-stone-900 dark:text-stone-100 leading-tight">Commande Accepted!</h2>
                  <p className="text-stone-500 dark:text-stone-400">Thank you, {customerInfo.firstName}. Your gluten-free goodies are on the way to {customerInfo.location}.</p>
                  <Link to="/market" onClick={() => setStep('cart')} className="inline-flex items-center gap-2 px-10 py-4 bg-glutivia-green text-white rounded-full font-bold uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">Return to Store</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
