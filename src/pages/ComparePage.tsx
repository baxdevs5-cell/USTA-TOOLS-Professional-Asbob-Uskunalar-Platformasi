import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Scale, X, ShoppingCart, Check, Star, AlertCircle, ArrowLeft } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { 
    compareList, 
    removeFromCompare, 
    clearCompare, 
    productsList, 
    addToCart, 
    setActiveTab, 
    navigateToProduct,
    t, 
    language 
  } = useApp();

  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Products in comparison list
  const comparedProducts = productsList.filter(p => compareList.includes(p.id));

  if (comparedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 text-amber-500 flex items-center justify-center mx-auto mb-4">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white font-['Chakra_Petch']">
          {t.comparePage.emptyTitle}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-md mx-auto">
          {t.comparePage.emptyDesc}
        </p>
        <button
          onClick={() => setActiveTab('catalog')}
          className="mt-6 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wide transition-all shadow-md"
        >
          Katalogga o'tish
        </button>
      </div>
    );
  }

  // Helper function to check if values differ across compared products
  const hasDiff = (accessor: (p: typeof comparedProducts[0]) => any) => {
    if (comparedProducts.length <= 1) return false;
    const firstVal = accessor(comparedProducts[0]);
    return comparedProducts.some(p => accessor(p) !== firstVal);
  };

  const rows = [
    { label: t.common.price, key: 'price', render: (p: any) => `${p.price.toLocaleString()} so'm`, diff: hasDiff(p => p.price) },
    { label: t.filters.brand, key: 'brand', render: (p: any) => p.brand, diff: hasDiff(p => p.brand) },
    { label: t.common.power, key: 'power', render: (p: any) => p.power, diff: hasDiff(p => p.power) },
    { label: t.common.voltage, key: 'voltage', render: (p: any) => p.voltage, diff: hasDiff(p => p.voltage) },
    { label: t.common.current, key: 'current', render: (p: any) => p.current || "—", diff: hasDiff(p => p.current) },
    { label: "Duty Cycle (Ishlash sikli)", key: 'dutyCycle', render: (p: any) => p.dutyCycle || "—", diff: hasDiff(p => p.dutyCycle) },
    { label: t.workingSpecs.continuousTime, key: 'continuousTime', render: (p: any) => p.workingSpecs.continuousTime, diff: hasDiff(p => p.workingSpecs.continuousTime) },
    { label: t.workingSpecs.recommendedRest, key: 'recommendedRest', render: (p: any) => p.workingSpecs.recommendedRest, diff: hasDiff(p => p.workingSpecs.recommendedRest) },
    { label: t.workingSpecs.estimatedServiceLife, key: 'serviceLife', render: (p: any) => p.workingSpecs.estimatedServiceLife, diff: hasDiff(p => p.workingSpecs.estimatedServiceLife) },
    { label: t.common.weight, key: 'weight', render: (p: any) => `${p.weight} kg`, diff: hasDiff(p => p.weight) },
    { label: t.common.warranty, key: 'warranty', render: (p: any) => `${p.warrantyMonths} oy`, diff: hasDiff(p => p.warrantyMonths) },
    { label: t.common.rating, key: 'rating', render: (p: any) => `${p.rating} / 5 (${p.reviewsCount})`, diff: hasDiff(p => p.rating) },
    { label: t.filters.grade, key: 'grade', render: (p: any) => p.grade.toUpperCase(), diff: hasDiff(p => p.grade) },
  ];

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
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Chakra_Petch']">
            {t.comparePage.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            {t.comparePage.subtitle} ({comparedProducts.length}/4)
          </p>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs text-neutral-300 font-semibold cursor-pointer">
            <input
              type="checkbox"
              checked={highlightDifferences}
              onChange={(e) => setHighlightDifferences(e.target.checked)}
              className="rounded border-neutral-700 text-amber-500 focus:ring-amber-500 bg-neutral-950"
            />
            <span>{t.comparePage.highlightDiffs}</span>
          </label>

          <button
            onClick={clearCompare}
            className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
          >
            {t.comparePage.clearAll}
          </button>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 bg-neutral-950 border-b border-r border-neutral-800 w-48 text-xs font-bold uppercase tracking-wider text-neutral-400">
                Parametr
              </th>
              {comparedProducts.map(p => (
                <th key={p.id} className="p-4 bg-neutral-950 border-b border-r border-neutral-800 min-w-[220px] max-w-[280px]">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded">
                      {p.brand}
                    </span>
                    <button
                      onClick={() => removeFromCompare(p.id)}
                      className="p-1 rounded text-neutral-500 hover:text-rose-400 transition-colors"
                      title="Solishtirishdan o'chirish"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full aspect-[4/3] rounded-lg object-cover bg-neutral-900 mb-3 cursor-pointer"
                    onClick={() => navigateToProduct(p.id)}
                  />

                  <h4 
                    onClick={() => navigateToProduct(p.id)}
                    className="text-xs font-bold text-white hover:text-amber-400 cursor-pointer line-clamp-2"
                  >
                    {p.name}
                  </h4>

                  <div className="mt-2 text-base font-black text-amber-400 font-mono">
                    {p.price.toLocaleString()} so'm
                  </div>

                  <button
                    onClick={() => addToCart(p, 1)}
                    className="mt-3 w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Savatchaga</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800 text-xs">
            {rows.map((row, idx) => {
              const shouldHighlight = highlightDifferences && row.diff;

              return (
                <tr key={idx} className={shouldHighlight ? "bg-amber-500/5 font-semibold" : "hover:bg-neutral-900/30"}>
                  <td className="p-3.5 border-r border-neutral-800 font-semibold text-neutral-400 bg-neutral-950/40">
                    <div className="flex items-center gap-1.5">
                      {shouldHighlight && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
                      <span>{row.label}</span>
                    </div>
                  </td>
                  {comparedProducts.map(p => (
                    <td 
                      key={p.id} 
                      className={`p-3.5 border-r border-neutral-800 ${
                        shouldHighlight ? "text-amber-300 font-mono font-bold" : "text-neutral-200"
                      }`}
                    >
                      {row.render(p)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
