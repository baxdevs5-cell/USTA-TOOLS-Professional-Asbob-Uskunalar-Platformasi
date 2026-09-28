import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Flame, ArrowRight, Zap, Shield, ArrowUpRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    productsList, 
    navigateToProduct, 
    navigateToCategory, 
    t, 
    language 
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setInputVal('');
    }
  }, [isSearchOpen]);

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  // Search logic
  const query = inputVal.trim().toLowerCase();

  // Smart suggestions dictionary based on user query
  const defaultSuggestions = [
    { label: "Payvandlash apparatlari", categorySlug: "payvandlash-apparatlari" },
    { label: "Payvandlash niqoblari (Xameleon)", categorySlug: "payvandlash-niqoblari" },
    { label: "Elektrodlar (OK 46, UONI)", categorySlug: "elektrodlar" },
    { label: "Payvandlash kabellari (KOG mis)", categorySlug: "kabel-va-aksessuarlar" },
    { label: "Payvandlash qo‘lqoplari (Kevlar)", categorySlug: "qolqoplar" },
    { label: "Shlifmashinalar (230mm / 125mm)", categorySlug: "shlifmashinalar" }
  ];

  const matchedSuggestions = defaultSuggestions.filter(s => 
    s.label.toLowerCase().includes(query) || (query.length >= 2 && "payvand".includes(query))
  );

  const matchedProducts = query ? productsList.filter(p => {
    const nameMatch = p.name.toLowerCase().includes(query);
    const brandMatch = p.brand.toLowerCase().includes(query);
    const powerMatch = p.power.toLowerCase().includes(query);
    const voltMatch = p.voltage.toLowerCase().includes(query);
    const currentMatch = p.current ? p.current.toLowerCase().includes(query) : false;
    const catMatch = p.categorySlug.toLowerCase().includes(query);
    const subCatMatch = p.subCategory ? p.subCategory.toLowerCase().includes(query) : false;
    return nameMatch || brandMatch || powerMatch || voltMatch || currentMatch || catMatch || subCatMatch;
  }) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-neutral-950/80 backdrop-blur-md">
      <div 
        className="fixed inset-0 -z-10" 
        onClick={() => setIsSearchOpen(false)} 
      />

      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-neutral-800 bg-neutral-950">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Asbob, brend, model, 300A, 220V yoki elektrod..."
            className="flex-1 bg-transparent text-neutral-100 placeholder-neutral-500 text-base focus:outline-none"
          />
          {inputVal && (
            <button 
              onClick={() => setInputVal('')}
              className="p-1 rounded text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
          >
            ESC
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto p-4 space-y-6">
          {/* Smart suggestions */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
              Tavsiya etilgan qidiruvlar (Takliflar)
            </div>
            <div className="flex flex-wrap gap-2">
              {(matchedSuggestions.length > 0 ? matchedSuggestions : defaultSuggestions).map((sugg, i) => (
                <button
                  key={i}
                  onClick={() => {
                    navigateToCategory(sugg.categorySlug);
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-amber-500 hover:text-neutral-950 text-xs font-medium text-neutral-300 transition-colors"
                >
                  <span>{sugg.label}</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                </button>
              ))}
            </div>
          </div>

          {/* Results list */}
          {query && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center justify-between">
                <span>Topilgan asboblar ({matchedProducts.length})</span>
                {matchedProducts.length > 0 && <span className="text-[11px] text-amber-500">To'g'ridan-to'g'ri o'tish</span>}
              </div>

              {matchedProducts.length === 0 ? (
                <div className="text-center py-8 text-neutral-400 text-sm">
                  "{inputVal}" bo'yicha hech qanday asbob topilmadi. Boshqa so'z bilan izlab ko'ring.
                </div>
              ) : (
                <div className="space-y-2">
                  {matchedProducts.map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        navigateToProduct(p.id);
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 hover:bg-neutral-800 border border-neutral-800/80 hover:border-amber-500/40 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-12 h-12 rounded-lg object-cover bg-neutral-900 shrink-0" 
                        />
                        <div>
                          <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                            {p.brand}
                          </div>
                          <div className="text-sm font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors">
                            {p.name}
                          </div>
                          <div className="text-xs text-neutral-400 flex items-center gap-2 mt-0.5">
                            <span>{p.power}</span>
                            <span>·</span>
                            <span>{p.voltage}</span>
                            {p.current && (
                              <>
                                <span>·</span>
                                <span className="text-cyan-400">{p.current}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <div className="font-mono font-bold text-sm text-neutral-100">
                            {p.price.toLocaleString()} so'm
                          </div>
                          <div className="text-[11px] text-emerald-400 font-medium">
                            {p.inStock ? "Mavjud" : "Buyurtmaga"}
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
