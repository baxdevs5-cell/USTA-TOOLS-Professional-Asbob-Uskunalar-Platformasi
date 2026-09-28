import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Order } from '../types';
import { categories } from '../data/categories';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  AlertTriangle, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X,
  Search,
  ArrowUpRight
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { 
    productsList, 
    setProductsList, 
    orders, 
    updateOrderStatus, 
    showToast,
    t,
    language 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'products' | 'orders'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // New product form
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('WeldPro');
  const [newCatSlug, setNewCatSlug] = useState('payvandlash-apparatlari');
  const [newPrice, setNewPrice] = useState(1500000);
  const [newStock, setNewStock] = useState(10);
  const [newPower, setNewPower] = useState('5.5 kW');
  const [newVoltage, setNewVoltage] = useState('220V');
  const [newWarranty, setNewWarranty] = useState(12);

  // Stats
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const lowStockCount = productsList.filter(p => p.stockCount <= 5).length;

  const filteredProducts = productsList.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newName.trim(),
      brand: newBrand,
      categorySlug: newCatSlug,
      price: newPrice,
      rating: 4.8,
      reviewsCount: 1,
      inStock: newStock > 0,
      stockCount: newStock,
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"],
      power: newPower,
      voltage: newVoltage,
      weight: 6.0,
      warrantyMonths: newWarranty,
      grade: "professional",
      powerSource: "electric",
      workingSpecs: {
        continuousTime: "45 minut",
        recommendedRest: "15 minut",
        dailyRecommended: "6-8 soat",
        estimatedServiceLife: "5 yil"
      },
      description: {
        uz: `${newName} professional sifatli uskuna.`,
        ru: `${newName} профессиональное надежное оборудование.`,
        en: `${newName} heavy-duty industrial equipment.`
      },
      advantages: {
        uz: ["Mustahkam korpus", "Rasmiy kafolat"],
        ru: ["Надежный корпус", "Официальная гарантия"],
        en: ["Heavy-duty casing", "Manufacturer warranty"]
      },
      disadvantages: {
        uz: ["Doimiy tarmoq talab qilinadi"],
        ru: ["Требует стабильного питания"],
        en: ["Requires standard power line"]
      }
    };

    setProductsList(prev => [newProd, ...prev]);
    setIsAddModalOpen(false);
    setNewName('');
    showToast("Yangi asbob katalogga qo'shildi!", 'success');
  };

  const handleUpdatePrice = (id: string, newPrice: number) => {
    setProductsList(prev => prev.map(p => p.id === id ? { ...p, price: newPrice } : p));
    showToast("Narx yangilandi", 'success');
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    setProductsList(prev => prev.map(p => p.id === id ? { ...p, stockCount: newStock, inStock: newStock > 0 } : p));
    showToast("Qoldiq yangilandi", 'success');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Haqiqatan ham ushbu asbobni katalogdan o'chirmoqchimisiz?")) {
      setProductsList(prev => prev.filter(p => p.id !== id));
      showToast("Mahsulot o'chirildi", 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header & KPI Summary */}
      <div className="border-b border-neutral-800 pb-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">
              MA'MURIYAT BO'LIMI
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-['Chakra_Petch'] mt-1">
              {t.admin.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {t.admin.subtitle}
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t.admin.addProduct}</span>
          </button>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <span className="text-xs text-neutral-400">{t.admin.statsRevenue}</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1">
              {totalRevenue.toLocaleString()} so'm
            </div>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <span className="text-xs text-neutral-400">{t.admin.statsOrders}</span>
            <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
              {orders.length} ta
            </div>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <span className="text-xs text-neutral-400">{t.admin.statsProducts}</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1">
              {productsList.length} xil
            </div>
          </div>

          <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <span className="text-xs text-neutral-400">{t.admin.statsLowStock}</span>
            <div className="text-xl sm:text-2xl font-black text-rose-400 font-mono mt-1">
              {lowStockCount} ta asbob
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Products vs Orders */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setActiveAdminTab('products')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeAdminTab === 'products'
              ? 'bg-amber-500 text-neutral-950 font-bold'
              : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          {t.admin.tabProducts} ({productsList.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('orders')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeAdminTab === 'orders'
              ? 'bg-amber-500 text-neutral-950 font-bold'
              : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          {t.admin.tabOrders} ({orders.length})
        </button>
      </div>

      {/* PRODUCTS MANAGEMENT TABLE */}
      {activeAdminTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl p-3 max-w-md">
            <Search className="w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              placeholder="Asbob yoki brend bo'yicha qidiruv..."
              className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
            />
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-950 text-neutral-400 font-bold uppercase">
                  <th className="p-4">{t.admin.productName}</th>
                  <th className="p-4">{t.admin.category}</th>
                  <th className="p-4">{t.admin.price}</th>
                  <th className="p-4">{t.admin.stock}</th>
                  <th className="p-4 text-right">{t.admin.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredProducts.map(p => (
                  <tr key={p.id} className="hover:bg-neutral-900/50">
                    <td className="p-4 flex items-center gap-3">
                      <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-neutral-950 shrink-0" />
                      <div>
                        <div className="text-[10px] font-bold text-amber-400 uppercase">{p.brand}</div>
                        <div className="font-bold text-white line-clamp-1">{p.name}</div>
                        <div className="text-[11px] text-neutral-400">{p.power} · {p.voltage}</div>
                      </div>
                    </td>

                    <td className="p-4 text-neutral-300">
                      {categories.find(c => c.slug === p.categorySlug)?.name[language] || p.categorySlug}
                    </td>

                    <td className="p-4">
                      <input
                        type="number"
                        defaultValue={p.price}
                        onBlur={(e) => handleUpdatePrice(p.id, Number(e.target.value))}
                        className="bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs font-mono font-bold text-amber-400 w-32"
                      />
                    </td>

                    <td className="p-4">
                      <input
                        type="number"
                        defaultValue={p.stockCount}
                        onBlur={(e) => handleUpdateStock(p.id, Number(e.target.value))}
                        className="bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs font-mono font-bold text-white w-20"
                      />
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 rounded text-neutral-500 hover:text-rose-400 hover:bg-neutral-900"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDERS MANAGEMENT TABLE */}
      {activeAdminTab === 'orders' && (
        <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950 text-neutral-400 font-bold uppercase">
                <th className="p-4">ID & Sana</th>
                <th className="p-4">Mijoz va manzil</th>
                <th className="p-4">Tarkib</th>
                <th className="p-4">Summasi</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">{t.admin.changeStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-neutral-900/50">
                  <td className="p-4 font-mono">
                    <div className="font-bold text-white">#{o.id}</div>
                    <div className="text-[11px] text-neutral-500">{o.date}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-white">{o.shippingAddress.fullName}</div>
                    <div className="text-neutral-400 font-mono text-[11px]">{o.shippingAddress.phone}</div>
                    <div className="text-neutral-500 text-[11px] line-clamp-1">{o.shippingAddress.city}, {o.shippingAddress.address}</div>
                  </td>

                  <td className="p-4 text-neutral-300">
                    {o.items.map((it, idx) => (
                      <div key={idx} className="line-clamp-1">
                        • {it.product.name} (x{it.quantity})
                      </div>
                    ))}
                  </td>

                  <td className="p-4 font-mono font-bold text-amber-400">
                    {o.totalAmount.toLocaleString()} so'm
                  </td>

                  <td className="p-4">
                    <span className="capitalize">{o.status}</span>
                  </td>

                  <td className="p-4 text-right">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                      className="bg-neutral-950 border border-neutral-800 rounded p-1.5 text-xs text-neutral-200"
                    >
                      <option value="processing">🟡 Ko'rib chiqilmoqda</option>
                      <option value="packing">🔵 Tayyorlanmoqda</option>
                      <option value="in_transit">🚚 Yo'lda</option>
                      <option value="delivered">🟢 Yetkazildi</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD NEW PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-lg font-bold text-white">{t.admin.addProduct}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewProduct} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Asbob modeli va to'liq nomi</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Masalan: WELDPRO IGBT 350 PRO"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Brend</label>
                  <input
                    type="text"
                    required
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Kategoriya</label>
                  <select
                    value={newCatSlug}
                    onChange={(e) => setNewCatSlug(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>{c.name[language]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Narxi (so'm)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Ombordagi soni</label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Kafolat (oy)</label>
                  <input
                    type="number"
                    value={newWarranty}
                    onChange={(e) => setNewWarranty(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Quvvati</label>
                  <input
                    type="text"
                    value={newPower}
                    onChange={(e) => setNewPower(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Kuchlanish</label>
                  <input
                    type="text"
                    value={newVoltage}
                    onChange={(e) => setNewVoltage(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded border border-neutral-700 text-neutral-300"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold"
                >
                  Katalogga qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
