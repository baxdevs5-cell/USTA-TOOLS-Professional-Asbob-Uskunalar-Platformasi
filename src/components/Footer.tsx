import React from 'react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/categories';
import { Flame, ShieldCheck, Truck, Headphones, Wrench, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language, setActiveTab, navigateToCategory } = useApp();

  return (
    <footer className="w-full border-t border-neutral-800 bg-neutral-950 text-neutral-300 transition-colors">
      {/* 4 Pillars Banner */}
      <div className="border-b border-neutral-800/80 bg-neutral-900/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide">100% Rasmiy kafolat</h4>
              <p className="text-xs text-neutral-400 mt-1">Har bir uskunaga ishlab chiqaruvchi rasmiy kafolat taloni beriladi.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide">Tezkor yetkazib berish</h4>
              <p className="text-xs text-neutral-400 mt-1">Toshkent bo'yicha 24 soatda, viloyat markazlariga 1-3 kunda yetkazamiz.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide">Servis & Ehtiyot qismlar</h4>
              <p className="text-xs text-neutral-400 mt-1">Barcha turdagi payvandlash va metallga ishlov berish agregatlariga ehtiyot qism bor.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide">Usta muhandislar maslahati</h4>
              <p className="text-xs text-neutral-400 mt-1">Qaysi elektrod yoki kuchlanish to'g'ri kelishini muhandislarimiz bepul tushuntiradi.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950 font-black">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white font-['Chakra_Petch']">
                USTA<span className="text-amber-500">TOOLS</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              O'zbekistonning professional payvandchilar, metall ustalari, chilangarlar va quruvchilar uchun ixtisoslashgan asbob-uskunalar platformasi.
            </p>
            <div className="text-xs space-y-1 text-neutral-400">
              <div>📍 Bosh ofis: Toshkent sh., Sergeli sanoat zonasi, 4-bino</div>
              <div>📞 Telefon: +998 (71) 200-88-44 / +998 (90) 123-45-67</div>
              <div>✉️ Pochta: info@ustatools.uz</div>
            </div>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Mashhur kategoriyalar</h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 6).map(c => (
                <li key={c.id}>
                  <button
                    onClick={() => navigateToCategory(c.slug)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1 text-neutral-400"
                  >
                    <ChevronRight className="w-3 h-3 text-neutral-600" />
                    <span>{c.name[language]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Calculators & Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Usta kalkulyatorlari</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('calculators')} className="hover:text-amber-400 text-neutral-400">
                  Elektrod hisoblagich
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculators')} className="hover:text-amber-400 text-neutral-400">
                  Metall vazni hisoblagich
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculators')} className="hover:text-amber-400 text-neutral-400">
                  Kabel va kuchlanish tushishi
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculators')} className="hover:text-amber-400 text-neutral-400">
                  Generator quvvatini tanlash
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculators')} className="hover:text-amber-400 text-neutral-400">
                  Loyiha tannarxini hisoblash
                </button>
              </li>
            </ul>
          </div>

          {/* Payment & Trust */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Xizmat va to'lov</h4>
            <p className="text-xs text-neutral-400 mb-3">
              Yuridik shaxslar uchun shartnoma va hisob-faktura asosida QQS bilan yetkazib beriladi.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-neutral-300">
              <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">Payme</span>
              <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">Click</span>
              <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">Uzum Bank</span>
              <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">Naqd</span>
              <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">H/R o'tkazma</span>
            </div>
          </div>
        </div>

        {/* Bottom bar with technical disclaimer */}
        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} USTA TOOLS. Barcha huquqlar himoyalangan.
          </div>
          <div className="text-center md:text-right max-w-xl text-[11px]">
            {t.common.workingTimeEstimateNotice}
          </div>
        </div>
      </div>
    </footer>
  );
};
