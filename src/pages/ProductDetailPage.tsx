import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  Heart, 
  Scale, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Zap, 
  Gauge, 
  CheckCircle2, 
  AlertTriangle, 
  Share2, 
  ArrowLeft,
  ChevronRight,
  Plus,
  MessageSquare
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    productsList, 
    t, 
    language, 
    setActiveTab, 
    toggleFavorite, 
    isFavorite, 
    toggleCompare, 
    isComparing, 
    addToCart,
    navigateToProduct,
    showToast
  } = useApp();

  const product = productsList.find(p => p.id === selectedProductId) || productsList[0];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [userReviewText, setUserReviewText] = useState<string>('');
  const [userReviewRating, setUserReviewRating] = useState<number>(5);
  const [userReviewAuthor, setUserReviewAuthor] = useState<string>('');
  const [reviewsList, setReviewsList] = useState([
    {
      id: "rev-1",
      author: "Rustam Qodirov",
      rating: 5,
      date: "2026-03-20",
      comment: "Uskuna kutilganidan ham a'lo chiqdi. 220V tok tushib ketganida ham yopishmaydi. Ishlash sikli qalin metall konstruksiyalarga bemalol yetadi."
    },
    {
      id: "rev-2",
      author: "Mirabbos Temirov",
      rating: 5,
      date: "2026-03-22",
      comment: "Komplektatsiyasi sifatli. Zavod kafolati qog'ozi bilan birga keldi. Yetkazib berish juda tez."
    }
  ]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReviewAuthor.trim() || !userReviewText.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: userReviewAuthor.trim(),
      rating: userReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: userReviewText.trim()
    };
    setReviewsList([newRev, ...reviewsList]);
    setUserReviewAuthor('');
    setUserReviewText('');
    showToast(language === 'uz' ? "Sharhingiz qabul qilindi, rahmat!" : "Спасибо за ваш отзыв!", 'success');
  };

  const fav = isFavorite(product.id);
  const comp = isComparing(product.id);

  // Recommended accessories matching
  const recommendedItems = productsList.filter(p => 
    product.recommendedAccessories?.includes(p.id) || 
    (p.categorySlug === 'elektrodlar' && p.id !== product.id) ||
    (p.categorySlug === 'qolqoplar' && p.id !== product.id)
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back button */}
      <button
        onClick={() => setActiveTab('catalog')}
        className="mb-6 flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-amber-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.common.backToCatalog}</span>
      </button>

      {/* Main product overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl">
            <img
              src={product.gallery[activeImageIndex] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPercent && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-black bg-rose-600 text-white rounded-lg shadow-lg">
                -{product.discountPercent}% CHEGIRMA
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-neutral-950 ${
                  activeImageIndex === idx ? 'border-amber-500 scale-105' : 'border-neutral-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Pricing, Actions & Purchase */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 text-xs font-black uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-amber-400 rounded-md">
                {product.brand}
              </span>
              <span className="text-xs text-neutral-500">·</span>
              <span className="text-xs text-neutral-400 font-medium capitalize">{product.grade} toifa</span>
              <span className="text-xs text-neutral-500">·</span>
              <span className="text-xs text-neutral-400">{product.powerSource}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white font-['Chakra_Petch'] leading-tight">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-3 mt-3 text-xs text-neutral-400">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span>·</span>
              <span>{product.reviewsCount} ta baholash</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Omborda {product.stockCount} dona mavjud
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
            <div>
              {product.oldPrice && (
                <div className="text-xs text-neutral-500 line-through">
                  {product.oldPrice.toLocaleString()} {t.common.currency}
                </div>
              )}
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {product.price.toLocaleString()} <span className="text-sm font-normal text-neutral-400">{t.common.currency}</span>
              </div>
            </div>

            <div className="text-right text-xs text-neutral-400">
              <div>Yetkazib berish: <strong className="text-white">Bepul</strong></div>
              <div className="text-[11px] text-neutral-500">Kafolat: {product.warrantyMonths} oy rasmiy</div>
            </div>
          </div>

          {/* Quantity selector & Add to cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-neutral-800 bg-neutral-950 rounded-xl overflow-hidden">
              <button
                onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                className="px-3.5 py-3 text-neutral-400 hover:text-white transition-colors"
              >
                -
              </button>
              <span className="px-4 py-3 text-sm font-mono font-bold text-white">
                {selectedQty}
              </span>
              <button
                onClick={() => setSelectedQty(selectedQty + 1)}
                className="px-3.5 py-3 text-neutral-400 hover:text-white transition-colors"
              >
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(product, selectedQty)}
              className="flex-1 py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 font-black text-sm tracking-wide transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>SAVATCHAGA QO'SHISH</span>
            </button>
          </div>

          {/* Quick toggle actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                fav 
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400' 
                  : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${fav ? 'fill-rose-500' : ''}`} />
              <span>{fav ? "Sevimlilarda" : t.common.favorite}</span>
            </button>

            <button
              onClick={() => toggleCompare(product.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                comp 
                  ? 'border-amber-500 bg-amber-500/10 text-amber-400' 
                  : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{comp ? "Solishtirishda" : t.common.compare}</span>
            </button>
          </div>

          {/* Delivery & Warranty bullet highlights */}
          <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-2.5 text-xs text-neutral-300">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{t.productDetail.deliveryInfo}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{t.productDetail.warrantyInfo} ({product.warrantyMonths} oy)</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 8: TOOL LIFETIME & OPERATIONAL GUIDELINES */}
      <div className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8">
        <div className="flex items-start justify-between flex-wrap gap-4 border-b border-neutral-800 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>{t.workingSpecs.title}</span>
            </div>
            <h3 className="text-xl font-black text-white font-['Chakra_Petch'] mt-1">
              Uskunaning Ishlash Vaqti va Dam Olish Rejimi
            </h3>
          </div>
          <span className="text-[11px] font-mono px-3 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-400">
            Laboratoriya sinovlari asosida
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-xs text-neutral-400 block mb-1">{t.workingSpecs.continuousTime}</span>
            <div className="text-base font-bold text-amber-400 font-mono">
              {product.workingSpecs.continuousTime}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-xs text-neutral-400 block mb-1">{t.workingSpecs.recommendedRest}</span>
            <div className="text-base font-bold text-sky-400 font-mono">
              {product.workingSpecs.recommendedRest}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-xs text-neutral-400 block mb-1">{t.workingSpecs.dailyRecommended}</span>
            <div className="text-base font-bold text-emerald-400 font-mono">
              {product.workingSpecs.dailyRecommended}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-xs text-neutral-400 block mb-1">{t.workingSpecs.estimatedServiceLife}</span>
            <div className="text-base font-bold text-neutral-100 font-mono">
              {product.workingSpecs.estimatedServiceLife}
            </div>
          </div>

          {product.workingSpecs.batteryRunTime && (
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-xs text-neutral-400 block mb-1">{t.workingSpecs.batteryRunTime}</span>
              <div className="text-base font-bold text-amber-300 font-mono">
                {product.workingSpecs.batteryRunTime}
              </div>
            </div>
          )}

          {product.workingSpecs.chargingTime && (
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-xs text-neutral-400 block mb-1">{t.workingSpecs.chargingTime}</span>
              <div className="text-base font-bold text-cyan-300 font-mono">
                {product.workingSpecs.chargingTime}
              </div>
            </div>
          )}
        </div>

        {/* Explicit Disclaimer Notice */}
        <div className="mt-4 p-3 rounded-lg bg-neutral-950/70 border border-neutral-800 text-[11px] text-neutral-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{t.common.workingTimeEstimateNotice}</span>
        </div>
      </div>

      {/* SECTION 7: TECHNICAL SPECIFICATIONS FULL TABLE */}
      <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
        <h3 className="text-xl font-black text-white font-['Chakra_Petch'] mb-6">
          {t.productDetail.techSpecs}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-xs">
          <div className="flex items-center justify-between py-2 border-b border-neutral-800">
            <span className="text-neutral-400">{t.common.power}</span>
            <span className="font-mono font-bold text-white">{product.power}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-neutral-800">
            <span className="text-neutral-400">{t.common.voltage}</span>
            <span className="font-mono font-bold text-white">{product.voltage}</span>
          </div>

          {product.current && (
            <div className="flex items-center justify-between py-2 border-b border-neutral-800">
              <span className="text-neutral-400">{t.common.current}</span>
              <span className="font-mono font-bold text-amber-400">{product.current}</span>
            </div>
          )}

          {product.dutyCycle && (
            <div className="flex items-center justify-between py-2 border-b border-neutral-800">
              <span className="text-neutral-400">Yuklama koeffitsiyenti (Duty Cycle)</span>
              <span className="font-mono font-bold text-cyan-400">{product.dutyCycle}</span>
            </div>
          )}

          <div className="flex items-center justify-between py-2 border-b border-neutral-800">
            <span className="text-neutral-400">{t.common.weight}</span>
            <span className="font-mono font-bold text-white">{product.weight} kg</span>
          </div>

          {product.frequency && (
            <div className="flex items-center justify-between py-2 border-b border-neutral-800">
              <span className="text-neutral-400">{t.productDetail.frequency}</span>
              <span className="font-mono font-bold text-white">{product.frequency}</span>
            </div>
          )}

          {product.dimensions && (
            <div className="flex items-center justify-between py-2 border-b border-neutral-800">
              <span className="text-neutral-400">{t.productDetail.dimensions}</span>
              <span className="font-mono font-bold text-white">{product.dimensions}</span>
            </div>
          )}

          {product.protectionClass && (
            <div className="flex items-center justify-between py-2 border-b border-neutral-800">
              <span className="text-neutral-400">{t.productDetail.protectionClass}</span>
              <span className="font-mono font-bold text-white">{product.protectionClass}</span>
            </div>
          )}

          {product.cableLength && (
            <div className="flex items-center justify-between py-2 border-b border-neutral-800">
              <span className="text-neutral-400">{t.productDetail.cableLength}</span>
              <span className="font-mono font-bold text-white">{product.cableLength}</span>
            </div>
          )}

          <div className="flex items-center justify-between py-2 border-b border-neutral-800">
            <span className="text-neutral-400">{t.common.warranty}</span>
            <span className="font-mono font-bold text-emerald-400">{product.warrantyMonths} oy</span>
          </div>
        </div>
      </div>

      {/* Description, Advantages & Disadvantages */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Description */}
        <div className="lg:col-span-1 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-3">
          <h3 className="text-lg font-black text-white font-['Chakra_Petch']">
            {t.productDetail.description}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {product.description[language]}
          </p>
        </div>

        {/* Advantages */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-3">
          <h3 className="text-lg font-black text-emerald-400 font-['Chakra_Petch'] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{t.productDetail.advantages}</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
            {product.advantages[language].map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disadvantages */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-3">
          <h3 className="text-lg font-black text-amber-400 font-['Chakra_Petch'] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>{t.productDetail.disadvantages}</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
            {product.disadvantages[language].map((dis, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">!</span>
                <span>{dis}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RECOMMENDED ACCESSORIES */}
      {recommendedItems.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-white font-['Chakra_Petch']">
              {t.productDetail.recommendedAccessories}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendedItems.map(item => (
              <div 
                key={item.id}
                onClick={() => navigateToProduct(item.id)}
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-amber-500/50 cursor-pointer transition-all flex items-center gap-4 group"
              >
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-neutral-950 shrink-0" />
                <div className="overflow-hidden flex-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">{item.brand}</span>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                    {item.name}
                  </h4>
                  <div className="text-xs font-mono font-bold text-amber-400 mt-1">
                    {item.price.toLocaleString()} so'm
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REVIEWS & COMMENT SUBMISSION */}
      <div className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 mb-6">
          <div>
            <h3 className="text-xl font-black text-white font-['Chakra_Petch']">
              {t.productDetail.customerReviews} ({reviewsList.length})
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span>4.9 / 5.0 umumiy baho</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Reviews list */}
          <div className="lg:col-span-7 space-y-4">
            {reviewsList.map(r => (
              <div key={r.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-white">{r.author}</div>
                  <div className="text-[11px] text-neutral-500 font-mono">{r.date}</div>
                </div>
                <div className="flex items-center text-amber-400">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {r.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <div className="lg:col-span-5 p-5 rounded-xl bg-neutral-950 border border-neutral-800">
            <h4 className="text-sm font-bold text-white mb-3">Sharh qoldirish</h4>
            <form onSubmit={handleAddReview} className="space-y-3">
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Ismingiz</label>
                <input
                  type="text"
                  required
                  value={userReviewAuthor}
                  onChange={(e) => setUserReviewAuthor(e.target.value)}
                  placeholder="Jasur Usta"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Baholang</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setUserReviewRating(star)}
                      className="p-1"
                    >
                      <Star className={`w-5 h-5 ${star <= userReviewRating ? 'fill-amber-400 text-amber-400' : 'text-neutral-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Fikringiz va tajribangiz</label>
                <textarea
                  rows={3}
                  required
                  value={userReviewText}
                  onChange={(e) => setUserReviewText(e.target.value)}
                  placeholder="Asbobning ishlashi, tok kuchi va qulayligi haqida..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs"
              >
                Sharhni yuborish
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
