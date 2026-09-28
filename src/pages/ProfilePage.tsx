import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { 
  User, 
  Package, 
  Heart, 
  Scale, 
  FolderKanban, 
  History, 
  Clock, 
  Edit3, 
  Check, 
  Truck, 
  AlertCircle,
  Eye,
  FileText
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile, 
    orders, 
    favorites, 
    compareList, 
    productsList, 
    recentlyViewed, 
    t, 
    language,
    setActiveTab,
    navigateToProduct
  } = useApp();

  const [activeProfileTab, setActiveProfileTab] = useState<'orders' | 'favorites' | 'compare' | 'projects' | 'calcHistory' | 'recent'>('orders');
  const [isEditing, setIsEditing] = useState(false);

  // Edit fields state
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [workshopName, setWorkshopName] = useState(userProfile.workshopName);
  const [specialty, setSpecialty] = useState(userProfile.specialty);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      phone,
      workshopName,
      specialty
    });
    setIsEditing(false);
  };

  const favoriteProducts = productsList.filter(p => favorites.includes(p.id));
  const comparedProducts = productsList.filter(p => compareList.includes(p.id));
  const recentProducts = productsList.filter(p => recentlyViewed.includes(p.id));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">🟡 Ko'rib chiqilmoqda</span>;
      case 'packing':
        return <span className="px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold font-mono">🔵 Tayyorlanmoqda</span>;
      case 'in_transit':
        return <span className="px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">🚚 Yo'lda</span>;
      case 'delivered':
        return <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">🟢 Yetkazildi</span>;
      default:
        return <span className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 text-xs">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Profile Header Card */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-neutral-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white font-['Chakra_Petch']">
                  {userProfile.name}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase">
                  Usta
                </span>
              </div>
              <div className="text-xs text-neutral-400 mt-1 flex flex-wrap items-center gap-3">
                <span>{userProfile.workshopName}</span>
                <span>·</span>
                <span className="font-mono">{userProfile.phone}</span>
                <span>·</span>
                <span>{userProfile.email}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-950 hover:bg-neutral-850 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEditing ? "Bekor qilish" : "Profilni tahrirlash"}</span>
          </button>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-neutral-400 block mb-1">Ism va familiya</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Telefon</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Elektron pochta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Ustaxona / Sex nomi</label>
              <input
                type="text"
                value={workshopName}
                onChange={(e) => setWorkshopName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Mutaxassislik</label>
              <input
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold"
              >
                O'zgarishlarni saqlash
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-neutral-800 text-xs font-semibold">
        {[
          { id: 'orders', label: t.profile.tabs.orders, count: orders.length, icon: Package },
          { id: 'favorites', label: t.profile.tabs.favorites, count: favorites.length, icon: Heart },
          { id: 'compare', label: t.profile.tabs.compare, count: compareList.length, icon: Scale },
          { id: 'projects', label: t.profile.tabs.projects, count: userProfile.savedProjects.length, icon: FolderKanban },
          { id: 'calcHistory', label: t.profile.tabs.calcHistory, count: userProfile.calculatorHistory.length, icon: History },
          { id: 'recent', label: "Ko'rilgan asboblar", count: recentProducts.length, icon: Eye },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeProfileTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveProfileTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/10'
                  : 'bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 text-[10px] rounded-md font-mono ${
                isActive ? 'bg-neutral-950/20 text-neutral-950' : 'bg-neutral-800 text-neutral-300'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: ORDERS */}
      {activeProfileTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-neutral-900/40 rounded-2xl border border-neutral-800 text-neutral-400 text-xs">
              {t.profile.noOrders}
            </div>
          ) : (
            orders.map(order => (
              <div
                key={order.id}
                className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-bold text-white">#{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <span className="text-[11px] text-neutral-400 mt-1 block">
                      Sana: {order.date} · To'lov turi: {order.paymentMethod.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-neutral-400">Jami summa:</span>
                    <div className="text-base sm:text-lg font-black text-amber-400 font-mono">
                      {order.totalAmount.toLocaleString()} so'm
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1">
                      <span className="text-neutral-200">
                        {it.product.name} <strong className="text-amber-400 font-mono">× {it.quantity}</strong>
                      </span>
                      <span className="font-mono text-neutral-400">
                        {(it.product.price * it.quantity).toLocaleString()} so'm
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400">
                  Yetkazish manzili: {order.shippingAddress.city}, {order.shippingAddress.address}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB CONTENT: FAVORITES */}
      {activeProfileTab === 'favorites' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* TAB CONTENT: COMPARE */}
      {activeProfileTab === 'compare' && (
        <div>
          <button
            onClick={() => setActiveTab('compare')}
            className="mb-6 px-5 py-2 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs"
          >
            Solishtirish jadvalini ochish
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {comparedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: SAVED PROJECTS */}
      {activeProfileTab === 'projects' && (
        <div className="space-y-4">
          {userProfile.savedProjects.length === 0 ? (
            <div className="text-center py-16 bg-neutral-900/40 rounded-2xl border border-neutral-800 text-neutral-400 text-xs">
              Hozircha saqlangan loyihalar yo'q. "USTA KALKULYATORLARI" bo'limida yangi loyiha hisoblab saqlashingiz mumkin.
            </div>
          ) : (
            userProfile.savedProjects.map(proj => (
              <div key={proj.id} className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white font-['Chakra_Petch']">
                      {proj.title}
                    </h3>
                    <span className="text-[11px] text-neutral-400">
                      Sana: {proj.date} · Mo'ljallangan vaqt: ~{proj.estimatedHours} soat
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-neutral-400">Tavsiya etilgan sotish narxi:</span>
                    <div className="text-xl font-black text-amber-400 font-mono">
                      {proj.suggestedPrice.toLocaleString()} so'm
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-500 block">Xomashyo</span>
                    <span className="font-mono font-bold text-white">{proj.materialCost.toLocaleString()} so'm</span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-500 block">Usta ish haqi</span>
                    <span className="font-mono font-bold text-white">{proj.laborCost.toLocaleString()} so'm</span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-500 block">Jami xarajatlar</span>
                    <span className="font-mono font-bold text-white">{proj.totalCost.toLocaleString()} so'm</span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-500 block">Kutilayotgan foyda</span>
                    <span className="font-mono font-bold text-emerald-400">+{(proj.suggestedPrice - proj.totalCost).toLocaleString()} so'm</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB CONTENT: CALC HISTORY */}
      {activeProfileTab === 'calcHistory' && (
        <div className="space-y-3">
          {userProfile.calculatorHistory.map(hist => (
            <div key={hist.id} className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase font-mono">{hist.calcType}</span>
                <h4 className="font-semibold text-white mt-0.5">{hist.title}</h4>
                <p className="text-neutral-400 mt-1">{hist.summary}</p>
              </div>
              <span className="text-[11px] text-neutral-500 font-mono">{hist.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: RECENTLY VIEWED */}
      {activeProfileTab === 'recent' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
