import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/categories';
import { Language } from '../types';
import { 
  Flame, 
  Search, 
  Heart, 
  Scale, 
  ShoppingCart, 
  User, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Grid, 
  Calculator, 
  HelpCircle, 
  ChevronDown,
  ShieldCheck,
  Wrench
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    theme, 
    toggleTheme, 
    t, 
    activeTab, 
    setActiveTab, 
    cartItemsCount, 
    cartTotalAmount, 
    favorites, 
    compareList, 
    setIsSearchOpen,
    navigateToCategory
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const navItems = [
    { key: 'home', label: t.nav.home },
    { key: 'catalog', label: t.nav.catalog },
    { key: 'compare', label: t.nav.compare, count: compareList.length },
    { key: 'selector', label: t.nav.selector },
    { key: 'calculators', label: t.nav.calculators },
    { key: 'admin', label: t.nav.admin },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/95 dark:bg-neutral-950/95 light:bg-white/95 backdrop-blur-md transition-colors duration-200">
      {/* Top micro bar for master assurance */}
      <div className="hidden lg:block border-b border-neutral-900 bg-neutral-900/60 text-xs text-neutral-400 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-500 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              {t.tagline}
            </span>
            <span className="hidden xl:inline text-neutral-500">·</span>
            <span className="hidden xl:inline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Rasmiy zavod kafolati va servis
            </span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Toshkent: +998 (71) 200-88-44</span>
            <span>·</span>
            <span>Ish vaqti: 08:30 – 19:00</span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Category trigger */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-neutral-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
                <Flame className="w-6 h-6 text-neutral-950" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white dark:text-white light:text-neutral-900 font-['Chakra_Petch']">
                  USTA<span className="text-amber-500">TOOLS</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono text-neutral-400 -mt-1">
                  Professional Gear
                </span>
              </div>
            </button>

            {/* Catalog Categories Dropdown Button */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition-all shadow-md active:scale-95"
              >
                <Grid className="w-4 h-4" />
                <span>{t.common.allCategories}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Categories Mega Dropdown Menu */}
              {isCategoriesDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setIsCategoriesDropdownOpen(false)} 
                  />
                  <div className="absolute left-0 top-full mt-2 w-[540px] max-h-[75vh] overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl p-4 z-40 grid grid-cols-2 gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          navigateToCategory(cat.slug);
                          setIsCategoriesDropdownOpen(false);
                        }}
                        className="flex items-start gap-3 p-2.5 rounded-lg text-left hover:bg-neutral-800 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-md bg-neutral-800 group-hover:bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-sm font-semibold text-neutral-200 group-hover:text-amber-400 truncate">
                            {cat.name[language]}
                          </div>
                          <div className="text-[11px] text-neutral-500 truncate">
                            {cat.count} ta mahsulot
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-sm text-neutral-400 transition-all group"
            >
              <span className="flex items-center gap-2.5 truncate">
                <Search className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="truncate">{t.common.searchPlaceholder}</span>
              </span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Action buttons (Lang, Theme, Favorites, Compare, Cart, Profile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Selector */}
            <div className="relative group">
              <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg p-1 text-xs font-semibold text-neutral-300">
                {(['uz', 'ru', 'en'] as Language[]).map((lng) => (
                  <button
                    key={lng}
                    onClick={() => handleLanguageChange(lng)}
                    className={`px-2 py-1 rounded transition-all uppercase ${
                      language === lng
                        ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                        : 'hover:text-white text-neutral-400'
                    }`}
                  >
                    {lng}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-400 transition-colors"
              title={theme === 'dark' ? "Kunduzgi rejim" : "Tungi rejim"}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
            </button>

            {/* Compare Button */}
            <button
              onClick={() => setActiveTab('compare')}
              className={`relative p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors ${
                activeTab === 'compare' ? 'text-amber-400 border-amber-500/50' : 'text-neutral-300'
              }`}
              title={t.nav.compare}
            >
              <Scale className="w-4 h-4" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-neutral-950 font-bold text-[10px] flex items-center justify-center animate-bounce">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Favorites Button */}
            <button
              onClick={() => setActiveTab('favorites')}
              className={`relative p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors ${
                activeTab === 'favorites' ? 'text-rose-500 border-rose-500/50' : 'text-neutral-300'
              }`}
              title={t.nav.favorites}
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Cart Button with Total Amount Preview */}
            <button
              onClick={() => setActiveTab('cart')}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border transition-all ${
                activeTab === 'cart' ? 'border-amber-500 text-amber-400' : 'border-neutral-800 text-neutral-200'
              }`}
            >
              <ShoppingCart className="w-4 h-4 text-amber-500" />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-neutral-400 leading-none">Savatcha</span>
                <span className="text-xs font-bold text-amber-400 leading-tight">
                  {cartTotalAmount > 0 ? `${cartTotalAmount.toLocaleString()} ${t.common.currency}` : "0"}
                </span>
              </div>
              {cartItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 font-extrabold text-[11px] flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Profile Button */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border transition-colors ${
                activeTab === 'profile' ? 'border-amber-500 text-amber-400' : 'border-neutral-800 text-neutral-300'
              }`}
              title={t.nav.profile}
            >
              <User className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 pb-3 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`relative px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === item.key
                  ? 'text-amber-400 bg-neutral-900 font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
              }`}
            >
              <span>{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {item.count}
                </span>
              )}
              {activeTab === item.key && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-neutral-950 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left font-medium ${
                activeTab === item.key
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              <span>{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="px-2 py-0.5 rounded text-xs bg-neutral-950/20">
                  {item.count}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-800">
            <div className="text-xs text-neutral-400 mb-2 font-semibold">Tezkor kategoriyalar:</div>
            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
              {categories.slice(0, 8).map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    navigateToCategory(c.slug);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-xs p-2 rounded bg-neutral-900 text-neutral-300 hover:text-amber-400 truncate"
                >
                  {c.name[language]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
