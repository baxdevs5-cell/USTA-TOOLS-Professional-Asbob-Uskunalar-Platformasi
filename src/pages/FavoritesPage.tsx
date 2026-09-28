import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { favorites, productsList, setActiveTab, t } = useApp();

  const favoriteProducts = productsList.filter(p => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6 mb-8">
        <div>
          <button
            onClick={() => setActiveTab('catalog')}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-400 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Katalogga qaytish</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Chakra_Petch'] flex items-center gap-3">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            <span>{t.nav.favorites}</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Siz saqlab qo'ygan asbob-uskunalar ro'yxati ({favoriteProducts.length} ta)
          </p>
        </div>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900/40 rounded-2xl border border-neutral-800">
          <Heart className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white">Sevimlilar ro'yxati bo'sh</h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
            Katalogdan yoqqan asboblarni yurakcha belgisini bosish orqali saqlab qo'yishingiz mumkin.
          </p>
          <button
            onClick={() => setActiveTab('catalog')}
            className="mt-6 px-6 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs"
          >
            Asboblarni ko'rish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
