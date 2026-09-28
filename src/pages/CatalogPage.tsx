import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { 
  Filter, 
  RotateCcw, 
  Search, 
  SlidersHorizontal, 
  Check, 
  Grid3X3, 
  List, 
  X,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const { 
    t, 
    language, 
    productsList, 
    selectedCategorySlug, 
    setSelectedCategorySlug 
  } = useApp();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(selectedCategorySlug || 'all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(40000000);
  const [selectedVoltage, setSelectedVoltage] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedPowerSource, setSelectedPowerSource] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyDiscount, setOnlyDiscount] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Synchronize category slug from global context if changed
  React.useEffect(() => {
    if (selectedCategorySlug) {
      setSelectedCategory(selectedCategorySlug);
    }
  }, [selectedCategorySlug]);

  // Extract all unique brands from products
  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    productsList.forEach(p => set.add(p.brand));
    return Array.from(set).sort();
  }, [productsList]);

  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCategorySlug(null);
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(40000000);
    setSelectedVoltage('all');
    setSelectedGrade('all');
    setSelectedPowerSource('all');
    setOnlyInStock(false);
    setOnlyDiscount(false);
    setMinRating(0);
    setSortBy('popular');
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let result = productsList.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }
      // Price filter
      if (p.price < minPrice || p.price > maxPrice) {
        return false;
      }
      // Voltage
      if (selectedVoltage !== 'all' && !p.voltage.toLowerCase().includes(selectedVoltage.toLowerCase())) {
        return false;
      }
      // Grade
      if (selectedGrade !== 'all' && p.grade !== selectedGrade) {
        return false;
      }
      // Power source
      if (selectedPowerSource !== 'all' && p.powerSource !== selectedPowerSource) {
        return false;
      }
      // In stock
      if (onlyInStock && !p.inStock) {
        return false;
      }
      // Discount only
      if (onlyDiscount && !p.discountPercent) {
        return false;
      }
      // Min rating
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [
    productsList,
    selectedCategory,
    selectedBrands,
    minPrice,
    maxPrice,
    selectedVoltage,
    selectedGrade,
    selectedPowerSource,
    onlyInStock,
    onlyDiscount,
    minRating,
    sortBy
  ]);

  const activeCategoryObj = categories.find(c => c.slug === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Category header / banner if specific category selected */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="text-xs font-mono font-semibold text-amber-500 uppercase tracking-wider">
              {activeCategoryObj ? "Tanlangan Kategoriya" : "Umumiy Katalog"}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-['Chakra_Petch'] mt-1">
              {activeCategoryObj ? activeCategoryObj.name[language] : "Barcha Professional Asbob-Uskunalar"}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              {activeCategoryObj 
                ? activeCategoryObj.description[language] 
                : "Payvandlash, kesish, shliflash va metallga ishlov berish agregatlari. Filtrlardan foydalanib kerakli quvvat va narx oralig'ini tanlang."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'}`}
                title="Katak ko'rinishi"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'}`}
                title="Ro'yxat ko'rinishi"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs font-bold"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>{t.common.filter}</span>
            </button>
          </div>
        </div>

        {/* Filter bar summary & sorting */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 text-xs">
          <div className="text-neutral-400">
            Jami: <strong className="text-amber-400 font-mono text-sm">{filteredProducts.length}</strong> ta asbob topildi
          </div>

          <div className="flex items-center gap-3">
            <span className="text-neutral-400 font-medium">Saralash:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-amber-500"
            >
              <option value="popular">{t.filters.sortPopular}</option>
              <option value="price-asc">{t.filters.sortPriceAsc}</option>
              <option value="price-desc">{t.filters.sortPriceDesc}</option>
              <option value="rating">{t.filters.sortRating}</option>
              <option value="reviews">Eng ko'p sharhlangan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Product Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* DESKTOP SIDEBAR FILTER */}
        <aside className="hidden lg:block space-y-6">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-5 space-y-6 sticky top-28 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                <span>{t.common.filter}</span>
              </span>
              <button
                onClick={resetFilters}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.filters.resetFilters}</span>
              </button>
            </div>

            {/* Categories */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                {t.filters.category}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedCategorySlug(e.target.value === 'all' ? null : e.target.value);
                }}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                <option value="all">Barcha kategoriyalar (18 ta)</option>
                {categories.map(c => (
                  <option key={c.id} value={c.slug}>
                    {c.name[language]} ({c.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                {t.filters.priceRange}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-neutral-500 block mb-1">Min (so'm)</span>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    step="100000"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-200 font-mono"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block mb-1">Maks (so'm)</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    step="500000"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-200 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Brands */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                {t.filters.brand}
              </label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {availableBrands.map(b => (
                  <label key={b} className="flex items-center gap-2 text-xs text-neutral-300 hover:text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(b)}
                      onChange={() => toggleBrand(b)}
                      className="rounded border-neutral-700 text-amber-500 focus:ring-amber-500 bg-neutral-950"
                    />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Voltage */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                {t.filters.voltage}
              </label>
              <select
                value={selectedVoltage}
                onChange={(e) => setSelectedVoltage(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                <option value="all">Barcha kuchlanishlar</option>
                <option value="220V">220V (1-faza / Tarmoq)</option>
                <option value="380V">380V (3-faza / Sanoat)</option>
                <option value="18V">18V / 20V (Akkumulyatorli)</option>
              </select>
            </div>

            {/* Tool Grade */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                {t.filters.grade}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedGrade(selectedGrade === 'professional' ? 'all' : 'professional')}
                  className={`p-2 rounded border text-center transition-all ${
                    selectedGrade === 'professional'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                  }`}
                >
                  Professional
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGrade(selectedGrade === 'home' ? 'all' : 'home')}
                  className={`p-2 rounded border text-center transition-all ${
                    selectedGrade === 'home'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                  }`}
                >
                  Maishiy
                </button>
              </div>
            </div>

            {/* Power Source */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                {t.filters.powerSource}
              </label>
              <select
                value={selectedPowerSource}
                onChange={(e) => setSelectedPowerSource(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                <option value="all">Barchasi</option>
                <option value="electric">{t.filters.electric}</option>
                <option value="battery">{t.filters.battery}</option>
                <option value="gas">{t.filters.gas}</option>
                <option value="manual">{t.filters.manual}</option>
              </select>
            </div>

            {/* Checkboxes: in stock, discount, rating */}
            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <label className="flex items-center gap-2 text-xs text-neutral-300 hover:text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-neutral-700 text-amber-500 focus:ring-amber-500 bg-neutral-950"
                />
                <span>{t.filters.onlyInStock}</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-300 hover:text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyDiscount}
                  onChange={(e) => setOnlyDiscount(e.target.checked)}
                  className="rounded border-neutral-700 text-amber-500 focus:ring-amber-500 bg-neutral-950"
                />
                <span>{t.filters.onlyDiscount}</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-300 hover:text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={minRating === 4.8}
                  onChange={(e) => setMinRating(e.target.checked ? 4.8 : 0)}
                  className="rounded border-neutral-700 text-amber-500 focus:ring-amber-500 bg-neutral-950"
                />
                <span>Faqat yuqori baholangan (4.8+)</span>
              </label>
            </div>
          </div>
        </aside>

        {/* PRODUCTS LISTING */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-2xl border border-neutral-800 bg-neutral-900/40">
              <SlidersHorizontal className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white">Mos keluvchi asboblar topilmadi</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                Tanlangan filtrlar bo'yicha hech qanday mahsulot mavjud emas. Filtrlarni tozalab ko'ring.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 px-5 py-2 rounded-lg bg-amber-500 text-neutral-950 font-bold text-xs"
              >
                {t.filters.resetFilters}
              </button>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER MODAL */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-neutral-950/80 backdrop-blur-sm lg:hidden">
          <div className="w-full max-h-[85vh] bg-neutral-900 border-t border-neutral-800 rounded-t-2xl p-5 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="font-bold text-sm text-white">Filtrlar</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile category */}
            <div>
              <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">Kategoriya</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-neutral-200"
              >
                <option value="all">Barcha kategoriyalar</option>
                {categories.map(c => (
                  <option key={c.id} value={c.slug}>{c.name[language]}</option>
                ))}
              </select>
            </div>

            {/* Mobile price */}
            <div>
              <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">Narx (so'm)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  placeholder="Min"
                  className="bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-neutral-200"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  placeholder="Maks"
                  className="bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-neutral-200"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  resetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="flex-1 py-2.5 rounded-lg border border-neutral-700 text-neutral-300 font-bold text-xs"
              >
                Tozalash
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-lg bg-amber-500 text-neutral-950 font-bold text-xs"
              >
                Ko'rsatish ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
