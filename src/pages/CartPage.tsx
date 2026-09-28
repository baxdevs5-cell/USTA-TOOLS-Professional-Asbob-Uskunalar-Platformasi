import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  X,
  CreditCard,
  Banknote,
  Building2
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQty, 
    removeFromCart, 
    clearCart, 
    cartTotalAmount, 
    placeOrder, 
    setActiveTab, 
    navigateToProduct,
    t, 
    language,
    userProfile
  } = useApp();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [city, setCity] = useState("Toshkent shahri");
  const [address, setAddress] = useState("Chilonzor tumani, 9-mavze");
  const [comment, setComment] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>("payme");

  // Free delivery threshold: 1,500,000 UZS
  const deliveryCost = cartTotalAmount >= 1500000 || cartTotalAmount === 0 ? 0 : 50000;
  const grandTotal = cartTotalAmount + deliveryCost;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) return;

    const orderId = placeOrder({
      fullName,
      phone,
      city,
      address,
      comment
    }, paymentMethod);

    setConfirmedOrderId(orderId);
    setIsCheckoutOpen(false);
  };

  if (confirmedOrderId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white font-['Chakra_Petch']">
          {t.cart.orderSuccessTitle}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 mt-2">
          {t.cart.orderSuccessDesc} <strong className="text-amber-400 font-mono text-base">{confirmedOrderId}</strong>
        </p>
        <p className="text-xs text-neutral-400 mt-1">
          Buyurtma tafsilotlari va harakatini profilingizda kuzatib borishingiz mumkin.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => {
              setConfirmedOrderId(null);
              setActiveTab('profile');
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs"
          >
            Profilga o'tish (Buyurtmalar tarixi)
          </button>
          <button
            onClick={() => {
              setConfirmedOrderId(null);
              setActiveTab('catalog');
            }}
            className="px-5 py-2.5 rounded-xl border border-neutral-700 text-neutral-300 hover:text-white text-xs"
          >
            Xaridni davom ettirish
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-600 flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white font-['Chakra_Petch']">
          {t.cart.emptyTitle}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2">
          {t.cart.emptyDesc}
        </p>
        <button
          onClick={() => setActiveTab('catalog')}
          className="mt-6 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs"
        >
          Katalogga o'tish
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Chakra_Petch'] flex items-center gap-3">
            <ShoppingCart className="w-7 h-7 text-amber-500" />
            <span>{t.cart.title}</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Savatchangizda {cart.reduce((a, b) => a + b.quantity, 0)} ta uskuna mavjud
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t.cart.clearCart}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(item => {
            const itemSubtotal = item.product.price * item.quantity;

            return (
              <div
                key={item.product.id}
                className="p-4 sm:p-5 rounded-xl border border-neutral-800 bg-neutral-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div 
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => navigateToProduct(item.product.id)}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover bg-neutral-950 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase">
                      {item.product.brand}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-white hover:text-amber-400 transition-colors line-clamp-1">
                      {item.product.name}
                    </h3>
                    <div className="text-xs font-mono font-bold text-neutral-300 mt-1">
                      {item.product.price.toLocaleString()} so'm
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="flex items-center border border-neutral-800 bg-neutral-950 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateCartQty(item.product.id, -1)}
                      className="p-2 text-neutral-400 hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-mono font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQty(item.product.id, 1)}
                      className="p-2 text-neutral-400 hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-sm sm:text-base font-black text-amber-400 font-mono">
                      {itemSubtotal.toLocaleString()} so'm
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 rounded text-neutral-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider font-['Chakra_Petch']">
              {t.cart.orderSummary}
            </h3>

            <div className="space-y-2 text-xs border-b border-neutral-800 pb-4">
              <div className="flex justify-between text-neutral-400">
                <span>{t.common.subtotal}</span>
                <span className="font-mono font-bold text-white">{cartTotalAmount.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>{t.common.delivery}</span>
                <span className="font-mono text-emerald-400">
                  {deliveryCost === 0 ? "Bepul" : `${deliveryCost.toLocaleString()} so'm`}
                </span>
              </div>
              {deliveryCost === 0 && (
                <span className="text-[10px] text-emerald-400 block">
                  ✓ 1.5 mln so'mdan yuqori bo'lgani uchun yetkazib berish bepul!
                </span>
              )}
            </div>

            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-neutral-300">{t.common.total}:</span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {grandTotal.toLocaleString()} so'm
              </span>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 font-black text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.cart.checkoutBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-lg font-black text-white font-['Chakra_Petch']">
                {t.cart.checkoutModalTitle}
              </h3>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">{t.cart.fullName}</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">{t.cart.phone}</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">{t.cart.city}</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">{t.cart.address}</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">{t.cart.comment}</label>
                <textarea
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Masalan: Darvozaxonaga kiritib berish lozim"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              {/* Payment methods */}
              <div>
                <label className="text-xs text-neutral-400 block mb-2">{t.cart.paymentMethod}</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'payme', label: t.cart.payPayme, icon: CreditCard },
                    { id: 'click', label: t.cart.payClick, icon: CreditCard },
                    { id: 'cash', label: t.cart.payCash, icon: Banknote },
                    { id: 'bank_transfer', label: t.cart.payBank, icon: Building2 },
                  ].map(pm => {
                    const Icon = pm.icon;
                    const isSelected = paymentMethod === pm.id;
                    return (
                      <button
                        type="button"
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`p-3 rounded-xl border text-left flex items-center gap-2.5 ${
                          isSelected 
                            ? 'border-amber-500 bg-amber-500/10 text-white font-bold' 
                            : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-neutral-500'}`} />
                        <span>{pm.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400">Jami to'lov:</span>
                  <div className="text-xl font-black text-amber-400 font-mono">
                    {grandTotal.toLocaleString()} so'm
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider"
                >
                  {t.cart.confirmOrder}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
