import React from 'react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { SparksCanvas } from '../components/SparksCanvas';
import { 
  Flame, 
  Scale, 
  ArrowRight, 
  Calculator, 
  Cpu, 
  ShieldCheck, 
  Truck, 
  CheckCircle, 
  Zap, 
  Star, 
  Sparkles,
  Wrench,
  Hammer
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    t, 
    language, 
    setActiveTab, 
    navigateToCategory, 
    navigateToProduct, 
    productsList 
  } = useApp();

  const featuredProducts = productsList.slice(0, 8);

  const brands = [
    "ESAB", "DeWalt", "Bosch", "WeldPro", "Makita", "Crown", "Resanta", "Bessey", "Magmaweld", "BDS Maschinen", "Stanley"
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION WITH SPARKS CANVAS */}
      <section className="relative overflow-hidden bg-neutral-950 border-b border-neutral-850 py-16 sm:py-24 lg:py-28 min-h-[580px] flex items-center">
        {/* Background glow and subtle industrial grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-600/15 via-neutral-950/80 to-neutral-950 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f10_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Animated Sparks Canvas */}
        <SparksCanvas intensity="vibrant" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Industrial tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 animate-pulse text-amber-500" />
                <span>Professional Asbob-Uskunalar Platformasi</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-['Chakra_Petch'] leading-[1.1]">
                USTA TOOLS — <span className="text-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]">Ustalar uchun</span> barcha kerakli asboblar bir joyda
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 font-black text-sm tracking-wide transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2.5 cursor-pointer"
                >
                  <span>{t.hero.btnBrowse}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('compare')}
                  className="px-6 py-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 active:scale-95 border border-neutral-700 text-neutral-200 hover:text-white font-bold text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>{t.hero.btnCompare}</span>
                </button>

                <button
                  onClick={() => setActiveTab('selector')}
                  className="px-5 py-3.5 rounded-xl bg-neutral-900/40 hover:bg-neutral-800/80 border border-neutral-800 text-neutral-300 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>{t.hero.btnSelector}</span>
                </button>
              </div>

              {/* Live Counters */}
              <div className="pt-6 border-t border-neutral-850/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-black text-amber-400 font-mono">1,200+</div>
                  <div className="text-xs text-neutral-400">Asboblar omborda</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-amber-400 font-mono">5,000+</div>
                  <div className="text-xs text-neutral-400">Doimiy ustalar</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">100%</div>
                  <div className="text-xs text-neutral-400">Rasmiy kafolat</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-sky-400 font-mono">24/7</div>
                  <div className="text-xs text-neutral-400">Tezkor yetkazish</div>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/90 p-5 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-mono font-bold text-neutral-200 uppercase">Haftaning eng talabgir asbobi</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    TOP WELD
                  </span>
                </div>

                <div 
                  className="cursor-pointer group relative overflow-hidden rounded-xl aspect-[16/10] bg-neutral-950 mb-4"
                  onClick={() => navigateToProduct('prod-weldpro-300a')}
                >
                  <img
                    src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
                    alt="WELDPRO 300A"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-400 uppercase">WeldPro</span>
                      <h4 className="text-base font-black text-white">WELDPRO 300A Invertor</h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-white bg-neutral-900/90 px-2.5 py-1 rounded border border-neutral-700">
                      2,450,000 so'm
                    </span>
                  </div>
                </div>

                {/* Micro tech specs comparison table preview */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
                    <div className="text-neutral-500 text-[10px]">Tok kuchi</div>
                    <div className="font-mono font-bold text-amber-400">20–300A</div>
                  </div>
                  <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
                    <div className="text-neutral-500 text-[10px]">Quvvat</div>
                    <div className="font-mono font-bold text-neutral-200">7.5 kW</div>
                  </div>
                  <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
                    <div className="text-neutral-500 text-[10px]">Duty Cycle</div>
                    <div className="font-mono font-bold text-cyan-400">60% @ 300A</div>
                  </div>
                </div>

                <button
                  onClick={() => navigateToProduct('prod-weldpro-300a')}
                  className="w-full mt-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Asbob parametrlarini ko'rish
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BRANDS TICKER */}
      <section className="border-b border-neutral-900 bg-neutral-900/40 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
              Rasmiy hamkor brendlar:
            </span>
            <div className="flex flex-wrap items-center gap-6 sm:gap-10">
              {brands.map((brand, idx) => (
                <span key={idx} className="text-sm font-black tracking-widest text-neutral-400 hover:text-amber-400 transition-colors uppercase font-mono">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES (18 CATEGORIES) */}
      <section className="py-16 bg-neutral-950 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-mono font-semibold text-amber-500 uppercase tracking-widest mb-1">
                Katalog arxitekturasi
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Chakra_Petch']">
                Barcha Asbob-Uskuna Kategoriyalari
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('catalog')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
            >
              <span>To'liq katalogga o'tish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 18 Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigateToCategory(cat.slug)}
                className="group flex flex-col p-4 rounded-xl bg-neutral-900/70 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-500/50 text-left transition-all duration-200 active:scale-95 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-neutral-800 group-hover:border-amber-500/40 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-neutral-100 group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                  {cat.name[language]}
                </h3>
                <span className="text-[11px] text-neutral-500 mt-2">
                  {cat.count} ta mahsulot
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (CARDS) */}
      <section className="py-16 bg-neutral-900/30 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-mono font-semibold text-amber-500 uppercase tracking-widest mb-1">
                Tavsiya etilgan uskunalar
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Chakra_Petch']">
                O'zbekiston Ustalarining Tanlovi
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('catalog')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
            >
              <span>Barcha asboblar ({productsList.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SMART TOOL SELECTOR TEASER */}
      <section className="py-16 bg-neutral-950 border-b border-neutral-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
                <Cpu className="w-3.5 h-3.5" />
                <span>AQLLI ASSISTENT</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white font-['Chakra_Petch']">
                Qaysi asbob sizga kerak?
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Metall turi, ish hajmi, elektr tarmog'i va byudjetingizga asosan eng to'g'ri apparat va himoya vositasini 4 ta savol orqali toping.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('selector')}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Asbob tanlashni boshlash</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. USTA CALCULATORS SHOWCASE */}
      <section className="py-16 bg-neutral-900/40 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-500 uppercase tracking-widest mb-2">
              <Calculator className="w-4 h-4" />
              <span>USTA KALKULYATORLARI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Chakra_Petch']">
              9 Ta Professional Muhandislik Hisoblagichlari
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Elektrod sarfi, metall massasi, generator quvvati, kuchlanish tushishi va loyiha tannarxini hisoblash.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Payvandlash elektrodi hisoblagichi",
                desc: "Metall qalinligi va chok uzunligiga qarab elektrod diametri va vaznini aniqlash.",
                icon: "Zap",
              },
              {
                title: "Metall vazni hisoblagichi (6 xil shakl)",
                desc: "Po'lat, nerjaviy, alyuminiy, mis listlar va trubalar og'irligi hamda formulasi.",
                icon: "Scale",
              },
              {
                title: "Kabel uzunligi va kuchlanish tushishi",
                desc: "Tok kuchi va masofaga qarab qizib ketmasligi uchun zarur mis kabel kesimi (mm²).",
                icon: "Wrench",
              },
              {
                title: "Payvandlash quvvati va generator tanlash",
                desc: "Amper va Duty Cycle ga ko'ra kVA va avtomat sug'urtani hisoblash.",
                icon: "Flame",
              },
              {
                title: "Loyiha hisoblagich (Tannarx va Foyda)",
                desc: "Metall, gaz, elektrod, ish haqi va transportni hisoblab sotish narxini chiqarish.",
                icon: "Calculator",
              },
              {
                title: "Duty Cycle va ish vaqti hisobi",
                desc: "Uskuna qizib ketmasligi uchun chok urish va dam olish vaqtini rejalashtirish.",
                icon: "Sparkles",
              },
            ].map((calc, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTab('calculators')}
                className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 cursor-pointer transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                  <Calculator className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-neutral-100 group-hover:text-amber-400 transition-colors">
                  {calc.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  {calc.desc}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-500">
                  <span>Hisoblash</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setActiveTab('calculators')}
              className="px-6 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Barcha 9 ta kalkulyatorni ochish
            </button>
          </div>
        </div>
      </section>

      {/* 7. CRAFTSMAN REVIEWS & TESTIMONIALS */}
      <section className="py-16 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Chakra_Petch']">
              Ustalar Nima Deydi?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              O'zbekistonning turli viloyatlaridagi tajribali chilangar va payvandchilar fikrlari
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "WELDPRO 300A apparatini sexga oldik. 180V ga tushib ketadigan mahallamizda ham 4 talik elektrodni qarsillatib eritadi. Ayniqsa saytda berilgan generator hisoblagichi juda asqatdi."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                  OM
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Odilbek Mirzayev</div>
                  <div className="text-[11px] text-neutral-500">Temir darvoza sexi bosh ustasi, Samarqand</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "ESAB Sentinel A50 niqobini buyurtma qilgandim, ertasi kuni ertalab Toshkentdan Andijonga yetib keldi. Ko'z aslo charchamaydi, ranglar tabiiy. Solishtirish bo'limi juda qulay qilingan."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                  SA
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Sardor Alimov</div>
                  <div className="text-[11px] text-neutral-500">Konstruksiya montajchisi, Andijon</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "Loyiha hisoblagichi yordamida mijozga temir karkas tannarxi va usta haqini chiqarib berdik. Barcha sarf-xarajatlar shaffof hisoblanar ekan. Platformaga 5 baho!"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                  FH
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Farhod Haydarov</div>
                  <div className="text-[11px] text-neutral-500">Qurilish brigadiri, Toshkent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
