import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  Theme, 
  Product, 
  CartItem, 
  Order, 
  UserProfile, 
  SavedProject, 
  CalculatorHistoryItem 
} from '../types';
import { translations } from '../data/translations';
import { products as initialProducts } from '../data/products';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: typeof translations.uz;
  
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (slug: string | null) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  navigateToProduct: (id: string) => void;
  navigateToCategory: (slug: string) => void;

  // Products
  productsList: Product[];
  setProductsList: React.Dispatch<React.SetStateAction<Product[]>>;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotalAmount: number;
  cartItemsCount: number;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Compare (max 4)
  compareList: string[];
  toggleCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isComparing: (productId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (shipping: Order['shippingAddress'], payment: Order['paymentMethod']) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  saveProjectToProfile: (proj: Omit<SavedProject, 'id' | 'date'>) => void;
  addCalculatorHistory: (item: Omit<CalculatorHistoryItem, 'id' | 'date'>) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Recently Viewed
  recentlyViewed: string[];

  // Toast
  toasts: Toast[];
  showToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_PROFILE: UserProfile = {
  name: "Jasur Usta",
  email: "jasur.welder@craftmail.uz",
  phone: "+998 (90) 123-45-67",
  workshopName: "USTA TEMIR KRAFT",
  specialty: "welder",
  savedProjects: [
    {
      id: "proj-1",
      date: "2026-03-24",
      title: "Katta Kovaniy Darvoza (4x2.8m)",
      materialCost: 5200000,
      electrodesCost: 350000,
      electricityCost: 180000,
      gasCost: 220000,
      toolWearCost: 150000,
      laborCost: 2500000,
      transportCost: 300000,
      otherCost: 250000,
      totalCost: 9150000,
      profitMarginPercent: 30,
      suggestedPrice: 11895000,
      estimatedHours: 36
    }
  ],
  calculatorHistory: [
    {
      id: "hist-1",
      date: "2026-03-26",
      calcType: "Elektrod hisoblagich",
      title: "Qalinlik: 6mm, Chok: 25m",
      summary: "Tavsiya: 4.0mm elektrod, ~5.2 kg talab qilinadi"
    },
    {
      id: "hist-2",
      date: "2026-03-27",
      calcType: "Metall vazni",
      title: "Profil truba 60x40x2.5 (18m)",
      summary: "Og'irligi: 67.4 kg po'lat"
    }
  ]
};

const INITIAL_ORDERS: Order[] = [
  {
    id: "USTA-84920",
    date: "2026-03-25",
    items: [
      {
        product: initialProducts[0],
        quantity: 1
      },
      {
        product: initialProducts[8],
        quantity: 2
      }
    ],
    totalAmount: 2820000,
    shippingAddress: {
      fullName: "Jasur Usta",
      phone: "+998 (90) 123-45-67",
      city: "Toshkent shahri",
      address: "Chilonzor tumani, 9-mavze, 12-ustaxona",
      comment: "Kelishdan 30 daqiqa oldin qo'ng'iroq qiling"
    },
    paymentMethod: "payme",
    status: "in_transit"
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('usta_lang');
    return (saved === 'ru' || saved === 'en' || saved === 'uz') ? saved : 'uz';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('usta_lang', lang);
  };

  const t = translations[language];

  // 2. Theme
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('usta_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('usta_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 3. Navigation & Views
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const navigateToProduct = (id: string) => {
    setSelectedProductId(id);
    setActiveTab('product-detail');
    // Add to recently viewed
    setRecentlyViewed(prev => [id, ...prev.filter(item => item !== id)].slice(0, 8));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (slug: string) => {
    setSelectedCategorySlug(slug);
    setActiveTab('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. Products list (allows adding/editing in Admin mode)
  const [productsList, setProductsList] = useState<Product[]>(() => {
    const saved = localStorage.getItem('usta_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('usta_products', JSON.stringify(productsList));
  }, [productsList]);

  // 5. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('usta_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('usta_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    showToast(`${product.name.slice(0, 28)}... ${t.common.inCart}`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalAmount = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // 6. Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('usta_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [initialProducts[0].id, initialProducts[7].id];
  });

  useEffect(() => {
    localStorage.setItem('usta_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        showToast(language === 'uz' ? "Sevimlilardan o'chirildi" : "Удалено из избранного", 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(language === 'uz' ? "Sevimlilarga qo'shildi" : "Добавлено в избранное", 'success');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  // 7. Compare (up to 4 items)
  const [compareList, setCompareList] = useState<string[]>(() => {
    const saved = localStorage.getItem('usta_compare');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [initialProducts[0].id, initialProducts[1].id];
  });

  useEffect(() => {
    localStorage.setItem('usta_compare', JSON.stringify(compareList));
  }, [compareList]);

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        showToast(language === 'uz' ? "Solishtirishdan olib tashlandi" : "Удалено из сравнения", 'info');
        return prev.filter(id => id !== productId);
      } else {
        if (prev.length >= 4) {
          showToast(
            language === 'uz' 
              ? "Maksimal 4 ta asbobni solishtirish mumkin!" 
              : "Можно сравнивать максимум 4 инструмента!", 
            'warning'
          );
          return prev;
        }
        showToast(language === 'uz' ? "Solishtirish ro'yxatiga qo'shildi" : "Добавлено в сравнение", 'success');
        return [...prev, productId];
      }
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(id => id !== productId));
  };

  const clearCompare = () => setCompareList([]);
  const isComparing = (productId: string) => compareList.includes(productId);

  // 8. Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('usta_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('usta_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (
    shippingAddress: Order['shippingAddress'], 
    paymentMethod: Order['paymentMethod']
  ): string => {
    const newOrderId = `USTA-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      totalAmount: cartTotalAmount,
      shippingAddress,
      paymentMethod,
      status: 'processing'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrderId;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Buyurtma #${orderId} holati yangilandi`, 'success');
  };

  // 9. User profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('usta_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('usta_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const updateUserProfile = (partial: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...partial }));
    showToast(language === 'uz' ? "Profil ma'lumotlari saqlandi" : "Данные профиля сохранены", 'success');
  };

  const saveProjectToProfile = (proj: Omit<SavedProject, 'id' | 'date'>) => {
    const newProject: SavedProject = {
      ...proj,
      id: `proj-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setUserProfile(prev => ({
      ...prev,
      savedProjects: [newProject, ...prev.savedProjects]
    }));
    showToast(language === 'uz' ? "Loyiha profilga muvaffaqiyatli saqlandi!" : "Проект успешно сохранен в профиль!", 'success');
  };

  const addCalculatorHistory = (item: Omit<CalculatorHistoryItem, 'id' | 'date'>) => {
    const newHist: CalculatorHistoryItem = {
      ...item,
      id: `calc-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setUserProfile(prev => ({
      ...prev,
      calculatorHistory: [newHist, ...prev.calculatorHistory].slice(0, 15)
    }));
  };

  // 10. Search & Recently Viewed
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('usta_recently_viewed');
    return saved ? JSON.parse(saved) : [initialProducts[0].id, initialProducts[2].id];
  });

  useEffect(() => {
    localStorage.setItem('usta_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // 11. Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        t,
        activeTab,
        setActiveTab,
        selectedCategorySlug,
        setSelectedCategorySlug,
        selectedProductId,
        setSelectedProductId,
        navigateToProduct,
        navigateToCategory,
        productsList,
        setProductsList,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartTotalAmount,
        cartItemsCount,
        favorites,
        toggleFavorite,
        isFavorite,
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        isComparing,
        orders,
        placeOrder,
        updateOrderStatus,
        userProfile,
        updateUserProfile,
        saveProjectToProfile,
        addCalculatorHistory,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        recentlyViewed,
        toasts,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
