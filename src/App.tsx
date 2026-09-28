import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ComparePage } from './pages/ComparePage';
import { ToolSelectorPage } from './pages/ToolSelectorPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 font-['Plus_Jakarta_Sans',sans-serif]">
      <Header />
      <SearchModal />
      <ToastContainer />

      <main className="flex-1 flex flex-col">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'catalog' && <CatalogPage />}
        {activeTab === 'product-detail' && <ProductDetailPage />}
        {activeTab === 'compare' && <ComparePage />}
        {activeTab === 'selector' && <ToolSelectorPage />}
        {activeTab === 'calculators' && <CalculatorsPage />}
        {activeTab === 'favorites' && <FavoritesPage />}
        {activeTab === 'cart' && <CartPage />}
        {activeTab === 'profile' && <ProfilePage />}
        {activeTab === 'admin' && <AdminPage />}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
