
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Market from './pages/Market';
import Meals from './pages/Meals';
import AIKitchen from './pages/AIKitchen';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import UserProtectedRoute from './components/UserProtectedRoute';
import ScrollToTopButton from './components/ScrollToTop';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { OrderProvider } from './contexts/OrderContext';
import { AuthProvider } from './contexts/AuthContext';
import { CommunityProvider } from './contexts/CommunityContext';
import { useScrollReveal } from './hooks/useScrollReveal';

const AppContent: React.FC = () => {
  useScrollReveal();

  return (
    <div className="flex flex-col min-h-screen bg-glutivia-cream dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route 
            path="/meals" 
            element={
              <UserProtectedRoute>
                <Meals />
              </UserProtectedRoute>
            } 
          />
          <Route path="/kitchen" element={<AIKitchen />} />
          <Route 
            path="/cart" 
            element={
              <UserProtectedRoute>
                <Cart />
              </UserProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/profile" 
            element={
              <UserProtectedRoute>
                <Profile />
              </UserProtectedRoute>
            } 
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CommunityProvider>
            <OrderProvider>
              <CartProvider>
                <HashRouter>
                  <AppContent />
                </HashRouter>
              </CartProvider>
            </OrderProvider>
          </CommunityProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
