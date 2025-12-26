
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../contexts/OrderContext';
import { Package, LogOut, Clock, User, DollarSign, CreditCard, Truck, Phone, MapPin } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('glutivia_admin_auth');
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-serif-display font-bold text-stone-900 dark:text-stone-100">Accepted Orders</h1>
            <p className="text-stone-500 dark:text-stone-400 mt-2">Real-time Glutivia management console</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl font-bold text-sm uppercase transition-colors hover:bg-red-100"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-stone-900 p-20 rounded-[3rem] text-center shadow-sm border border-stone-100 dark:border-stone-800">
            <Package size={80} className="mx-auto text-stone-200 dark:text-stone-800 mb-6" />
            <h2 className="text-2xl font-bold text-stone-400 dark:text-stone-600">No orders accepted yet.</h2>
          </div>
        ) : (
          <div className="grid gap-8">
            {orders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-stone-900 rounded-[2.5rem] shadow-sm border border-stone-100 dark:border-stone-800 overflow-hidden">
                <div className="p-8 border-b border-stone-50 dark:border-stone-800 flex flex-wrap justify-between items-center gap-4 bg-stone-50 dark:bg-stone-900/50">
                  <div className="flex items-center gap-3">
                    <span className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">{order.id}</span>
                    <span className="text-xs text-stone-400 dark:text-stone-500 flex items-center gap-1"><Clock size={14} /> {new Date(order.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold">
                       <DollarSign size={14} /> {order.total} DH
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase ${order.method === 'card' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'bg-orange-50 dark:bg-orange-900/30 text-orange-600'}`}>
                       {order.method === 'card' ? <><CreditCard size={14} /> Card</> : <><Truck size={14} /> COD</>}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="bg-stone-50 dark:bg-stone-800/50 p-6 rounded-[2rem] border border-stone-100 dark:border-stone-700">
                      <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <User size={14} /> Customer Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex flex-col">
                          <span className="text-xs text-stone-500">Full Name</span>
                          <span className="font-bold text-lg">{order.firstName} {order.lastName}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-stone-500">Phone Number</span>
                          <a href={`tel:${order.phone}`} className="font-bold text-lg text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                            <Phone size={16} /> {order.phone}
                          </a>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-stone-500">Localization / Address</span>
                          <span className="font-medium text-stone-700 dark:text-stone-300 flex items-start gap-2 mt-1">
                            <MapPin size={16} className="mt-1 flex-shrink-0 text-red-500" /> {order.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                      <Package size={14} /> Order Items
                    </h4>
                    <div className="grid gap-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-stone-50 dark:bg-stone-800/30 p-4 rounded-2xl border border-stone-100 dark:border-stone-800">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                          <div className="flex-1">
                            <div className="font-bold text-sm text-stone-900 dark:text-stone-100">{item.name}</div>
                            <div className="text-xs text-stone-500">Qty: {item.quantity} • {item.price} DH</div>
                          </div>
                          <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                            {item.price * item.quantity} DH
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
