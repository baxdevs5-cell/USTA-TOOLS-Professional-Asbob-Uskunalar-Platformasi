import { Product } from '../types';

export const products: Product[] = [
  {
    id: "prod-weldpro-300a",
    name: "WELDPRO 300A Invertorli Payvandlash Apparati",
    brand: "WeldPro",
    categorySlug: "payvandlash-apparatlari",
    subCategory: "MMA / Invertor",
    price: 2450000,
    oldPrice: 2800000,
    discountPercent: 12,
    rating: 4.8,
    reviewsCount: 46,
    inStock: true,
    stockCount: 18,
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
    ],
    power: "7.5 kW",
    powerKw: 7.5,
    voltage: "220V (160–250V)",
    current: "20–300A",
    maxCurrentA: 300,
    frequency: "50/60 Hz",
    weight: 8.5,
    dimensions: "410 x 165 x 285 mm",
    dutyCycle: "60% @ 300A, 100% @ 232A",
    dutyCyclePercent: 60,
    workingTemperature: "-10°C ~ +40°C",
    protectionClass: "IP21S",
    warrantyMonths: 12,
    cableLength: "3.5 m (Massa) / 4.0 m (Derjatel)",
    grade: "professional",
    powerSource: "electric",
    workingSpecs: {
      continuousTime: "45 minut (200A da)",
      recommendedRest: "15 minut",
      dailyRecommended: "6-8 soat",
      estimatedServiceLife: "5 yil",
      batteryRunTime: "Tarmoqdan ishlaydi",
      chargingTime: "Mavjud emas"
    },
    description: {
      uz: "WELDPRO 300A — professional metall ustalari va quruvchilar uchun mo'ljallangan quvvatli IGBT invertorli payvandlash uskunasi. Kengaytirilgan kirish kuchlanish diapazoni past kuchlanishda (160V gacha) ham barqaror elektrod yonishini ta'minlaydi. Hot Start, Arc Force va Anti-Stick aqlli funksiyalari bilan jihozlangan.",
      ru: "WELDPRO 300A — мощный сварочный инвертор на базе современных IGBT транзисторов для профессиональных работ. Стабильно варит при просадках напряжения сети до 160В. Оснащен функциями Hot Start (быстрый поджиг), Arc Force (форсаж дуги) и Anti-Stick (антизалипание).",
      en: "WELDPRO 300A is a heavy-duty professional IGBT inverter welder engineered for metal fabrication and high-demand construction. Operates reliably under low network voltages down to 160V. Features Hot Start, Arc Force, and Anti-Stick technology."
    },
    advantages: {
      uz: [
        "Yuqori quvvat: 300A gacha elektrod bilan uzluksiz chok",
        "Kuchsiz elektr tarmog'ida ham (160V) erkin ishlash",
        "IGBT so'nggi avlod tranzistorlari va ikki tomonlama sovutish turbinasi",
        "5 mm gacha bo'lgan barcha turdagi elektrodlarni eritadi"
      ],
      ru: [
        "Высокая реальная сила тока до 300А",
        "Уверенная работа при падении напряжения до 160В",
        "Двойная принудительная турбинная система охлаждения",
        "Свободно варит электродом диаметром до 5.0 мм"
      ],
      en: [
        "True output current up to 300A",
        "Operates smoothly under voltage drops down to 160V",
        "Dual turbine forced cooling ventilation",
        "Easily runs electrodes up to 5.0mm diameter"
      ]
    },
    disadvantages: {
      uz: [
        "Vazni 8.5 kg — mayda ko'chma balandlik ishlari uchun biroz og'ir",
        "Generator bilan ishlatilganda kamida 9 kVA quvvat talab qiladi"
      ],
      ru: [
        "Вес 8.5 кг — тяжеловат для частой работы на весу на высоте",
        "При работе от генератора требуется мощность не менее 9 кВА"
      ],
      en: [
        "Weight of 8.5 kg requires shoulder strap for aerial scaffolding",
        "Requires at least 9 kVA generator when working off-grid"
      ]
    },
    recommendedAccessories: ["prod-esab-ok46", "prod-sentinel-a50", "prod-copper-cable"]
  },
  {
    id: "prod-resanta-sai250",
    name: "RESANTA SAI-250 Invertorli Payvandlash Apparati",
    brand: "Resanta",
    categorySlug: "payvandlash-apparatlari",
    subCategory: "MMA / Invertor",
    price: 1850000,
    oldPrice: 2100000,
    discountPercent: 12,
    rating: 4.7,
    reviewsCount: 82,
    inStock: true,
    stockCount: 24,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
    ],
    power: "6.5 kW",
    powerKw: 6.5,
    voltage: "220V (140–260V)",
    current: "10–250A",
    maxCurrentA: 250,
    frequency: "50 Hz",
    weight: 5.2,
    dimensions: "360 x 140 x 240 mm",
    dutyCycle: "70% @ 250A",
    dutyCyclePercent: 70,
    workingTemperature: "-10°C ~ +40°C",
    protectionClass: "IP21",
    warrantyMonths: 24,
    cableLength: "2.5 m",
    grade: "home",
    powerSource: "electric",
    workingSpecs: {
      continuousTime: "35 minut",
      recommendedRest: "10 minut",
      dailyRecommended: "5-6 soat",
      estimatedServiceLife: "4 yil",
      batteryRunTime: "Tarmoqdan ishlaydi",
      chargingTime: "Mavjud emas"
    },
    description: {
      uz: "O'zbekiston ustaxonalari va xonadonlarida eng mashhur va sinalgan invertor. O'ta yengil (5.2 kg) va ixcham, yelkaga osib olib yurish oson.",
      ru: "Самый популярный инвертор для домашних мастерских и монтажников. Легкий (5.2 кг) и компактный, удобен для работы на плече.",
      en: "The most popular inverter for small workshops and mobile installation crews. Compact and lightweight (5.2 kg)."
    },
    advantages: {
      uz: ["Ixcham va yengil", "2 yil rasmiy kafolat", "140V gacha kuchlanishda ham ishlaydi"],
      ru: ["Компактный и легкий", "2 года официальной гарантии", "Работает от 140В"],
      en: ["Ultra-portable", "24 months warranty", "Handles deep voltage drops down to 140V"]
    },
    disadvantages: {
      uz: ["Komplektdagi kabellari biroz qisqa (2.5m)"],
      ru: ["Кабели из комплекта коротковаты"],
      en: ["Supplied cables are relatively short (2.5m)"]
    },
    recommendedAccessories: ["prod-esab-ok46", "prod-welding-gloves"]
  },
  {
    id: "prod-esab-warrior500",
    name: "ESAB Warrior 500i CC/CV Sanoat Payvandlash Kompleksi",
    brand: "ESAB",
    categorySlug: "payvandlash-apparatlari",
    subCategory: "MIG/MAG / Sanoat",
    price: 34500000,
    oldPrice: 38000000,
    discountPercent: 9,
    rating: 4.9,
    reviewsCount: 14,
    inStock: true,
    stockCount: 3,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
    ],
    power: "19.5 kW",
    powerKw: 19.5,
    voltage: "380V 3-faza",
    current: "16–500A",
    maxCurrentA: 500,
    frequency: "50/60 Hz",
    weight: 52.0,
    dimensions: "712 x 325 x 470 mm",
    dutyCycle: "60% @ 500A, 100% @ 400A",
    dutyCyclePercent: 60,
    workingTemperature: "-20°C ~ +50°C",
    protectionClass: "IP23",
    warrantyMonths: 36,
    cableLength: "5.0 m",
    grade: "professional",
    powerSource: "electric",
    workingSpecs: {
      continuousTime: "Uzluksiz (24/7 sanoat smenasi)",
      recommendedRest: "Sanoat rejimida dam olish shart emas",
      dailyRecommended: "16-24 soat",
      estimatedServiceLife: "10-12 yil",
      batteryRunTime: "Mavjud emas",
      chargingTime: "Mavjud emas"
    },
    description: {
      uz: "Og'ir mashinasozlik, po'lat konstruksiyalar va kemasozlik zavodlari uchun mo'ljallangan ko'p funksiyali (MIG/MAG, MMA, TIG, Gouging) qudratli uskuna.",
      ru: "Тяжелый промышленный многопроцессный сварочный аппарат (MIG/MAG, MMA, TIG, строжка канавок) для заводов металлоконструкций.",
      en: "Heavy-duty multi-process industrial power source engineered for civil engineering, shipyards, and structural steel plants."
    },
    advantages: {
      uz: ["500A real tok kuchi", "Uzluksiz smena ishlash qobiliyati", "IP23 sanoat himoyasi"],
      ru: ["500А реальный сварочный ток", "Непрерывная работа 24/7", "Защита от суровых условий IP23"],
      en: ["500A continuous power", "Built for 24/7 shifts", "True industrial IP23 enclosure"]
    },
    disadvantages: {
      uz: ["380V talab qiladi", "Yuqori narx toifasi"],
      ru: ["Требуется 3-фазная сеть 380В", "Высокая стоимость"],
      en: ["Requires 3-phase 380V power", "Heavy capital investment"]
    },
    recommendedAccessories: ["prod-mig-wire", "prod-sentinel-a50"]
  },
  {
    id: "prod-dewalt-dwe492",
    name: "DeWalt DWE492 Og'ir Burchakli Shlifmashina (230mm, 2200W)",
    brand: "DeWalt",
    categorySlug: "shlifmashinalar",
    subCategory: "Katta bolgarka 230mm",
    price: 1980000,
    oldPrice: 2250000,
    discountPercent: 12,
    rating: 4.8,
    reviewsCount: 39,
    inStock: true,
    stockCount: 15,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80"
    ],
    power: "2200 W",
    powerKw: 2.2,
    voltage: "220V",
    frequency: "50 Hz",
    weight: 5.5,
    dimensions: "490 x 150 x 120 mm",
    dutyCycle: "S1 uzluksiz professional",
    warrantyMonths: 36,
    cableLength: "4.0 m",
    grade: "professional",
    powerSource: "electric",
    workingSpecs: {
      continuousTime: "50 minut",
      recommendedRest: "15 minut",
      dailyRecommended: "6-8 soat",
      estimatedServiceLife: "6 yil",
      batteryRunTime: "Mavjud emas",
      chargingTime: "Mavjud emas"
    },
    description: {
      uz: "Qalin metall listlar, balkalar, shveller va quvurlarni kesish uchun 230 mm diskli DeWalt professional bolgarkasi. Changdan himoyalangan mustahkam motor.",
      ru: "Профессиональная УШМ 230 мм для резки толстого металлопроката, швеллеров и труб. Мощный двигатель с бронированной обмоткой.",
      en: "Heavy-duty 230mm angle grinder engineered for cutting thick steel beams, rebar bundles, and industrial prep."
    },
    advantages: {
      uz: ["2200W o'ta kuchli motor", "Epoksidli changdan himoyalangan chulg'am", "3 yillik kafolat"],
      ru: ["2200 Вт мощность", "Бронированная защита от абразивной пыли", "Гарантия 3 года"],
      en: ["2200W high-torque motor", "Epoxy-coated windings resist metal grit", "36-month warranty"]
    },
    disadvantages: {
      uz: ["Og'irligi sababli 2 qo'l bilan ishlash shart"],
      ru: ["Требует уверенной работы двумя руками"],
      en: ["5.5 kg requires steady two-handed handling"]
    },
    recommendedAccessories: ["prod-welding-gloves", "prod-workwear-jacket"]
  },
  {
    id: "prod-bosch-gws9115",
    name: "Bosch GWS 9-115 Professional Bolgarka (115mm, 900W)",
    brand: "Bosch",
    categorySlug: "shlifmashinalar",
    subCategory: "Kichik bolgarka 115mm",
    price: 890000,
    oldPrice: 1050000,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 65,
    inStock: true,
    stockCount: 30,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    ],
    power: "900 W",
    powerKw: 0.9,
    voltage: "220V",
    weight: 1.9,
    dimensions: "280 x 100 x 73 mm",
    warrantyMonths: 12,
    cableLength: "2.5 m",
    grade: "professional",
    powerSource: "electric",
    workingSpecs: {
      continuousTime: "40 minut",
      recommendedRest: "10 minut",
      dailyRecommended: "6 soat",
      estimatedServiceLife: "5 yil"
    },
    description: {
      uz: "Payvand choklarini tozalash, yupqa metall kesish va qiyin joylarda bir qo'l bilan ishlash uchun ergonomik korpusli professional bolgarka.",
      ru: "Компактная УШМ с тонким корпусом для зачистки швов и комфортной работы одной рукой.",
      en: "Ultra-slim grip 900W angle grinder for seam cleaning and single-handed finishing."
    },
    advantages: {
      uz: ["Juda yengil (1.9 kg)", "Yupqa qulay ushlagich", "900W kuchaytirilgan reduktor"],
      ru: ["Очень легкая (1.9 кг)", "Узкий эргономичный корпус", "Надежный редуктор"],
      en: ["Featherweight 1.9 kg", "Slim-barrel grip", "Heavy duty spiral bevel gears"]
    },
    disadvantages: {
      uz: ["Katta chuqur kesimlar uchun disk diametri (115mm) yetmasligi mumkin"],
      ru: ["Диск 115 мм не подходит для глубокого реза толстого профиля"],
      en: ["115mm disc limits cutting depth on heavy pipe"]
    },
    recommendedAccessories: ["prod-welding-gloves"]
  },
  {
    id: "prod-makita-dga504z",
    name: "Makita DGA504Z 18V LXT Akkumulyatorli Shlifmashina (125mm)",
    brand: "Makita",
    categorySlug: "akkumulyatorli-asboblar",
    subCategory: "Akkumulyatorli bolgarka",
    price: 2150000,
    oldPrice: 2400000,
    discountPercent: 10,
    rating: 4.8,
    reviewsCount: 31,
    inStock: true,
    stockCount: 12,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80"
    ],
    power: "800 W ekvivalent",
    voltage: "18V Li-Ion",
    weight: 2.3,
    batteryCapacity: "5.0 Ah mos",
    chargingTime: "45 minut (DC18RC zaryadlovchida)",
    warrantyMonths: 12,
    grade: "professional",
    powerSource: "battery",
    workingSpecs: {
      continuousTime: "25-35 minut (5.0Ah akkumulyatorda)",
      recommendedRest: "10 minut",
      dailyRecommended: "5 soat",
      estimatedServiceLife: "5 yil",
      batteryRunTime: "30-40 kesim (armatura d16)",
      chargingTime: "45 minut"
    },
    description: {
      uz: "Elektr tarmog'i bo'lmagan obyektlar, tom qismi va balandlikdagi montaj ishlari uchun cho'tkasiz (Brushless) akkumulyatorli bolgarka.",
      ru: "Бесщеточная аккумуляторная УШМ для монтажных работ на крышах, вышках и объектах без электричества.",
      en: "Brushless 18V cordless 125mm angle grinder for scaffolding, roofing, and off-grid fabrication."
    },
    advantages: {
      uz: ["Simsiz erkinlik", "Cho'tkasiz BL motor", "Xavfsizlik elektron tormozi"],
      ru: ["Полная мобильность", "Бесщеточный BL мотор", "Электронный тормоз диска"],
      en: ["Cordless mobility", "Maintenance-free BL motor", "Electronic safety kickback brake"]
    },
    disadvantages: {
      uz: ["Akkumulyator va zaryadlovchi alohida xarid qilinadi (Z-versiya)"],
      ru: ["Поставляется без АКБ и ЗУ (каркас)"],
      en: ["Supplied as bare tool (battery and charger sold separately)"]
    },
    recommendedAccessories: ["prod-dewalt-dcf899"]
  },
  {
    id: "prod-dewalt-dcf899",
    name: "DeWalt DCF899P2 18V XR 950Nm Og'ir Gaykovyort To'plami",
    brand: "DeWalt",
    categorySlug: "akkumulyatorli-asboblar",
    subCategory: "Zarbali gaykovyort",
    price: 4950000,
    oldPrice: 5600000,
    discountPercent: 12,
    rating: 4.9,
    reviewsCount: 52,
    inStock: true,
    stockCount: 9,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80"
    ],
    power: "610 W",
    voltage: "18V XR",
    weight: 3.3,
    batteryCapacity: "2 x 5.0 Ah Li-Ion",
    chargingTime: "60 minut",
    warrantyMonths: 36,
    grade: "professional",
    powerSource: "battery",
    workingSpecs: {
      continuousTime: "120 minut (2 ta akkumulyator bilan)",
      recommendedRest: "15 minut",
      dailyRecommended: "8 soat",
      estimatedServiceLife: "6 yil",
      batteryRunTime: "3.5 soat faol gayka tortish",
      chargingTime: "1.0 soat"
    },
    description: {
      uz: "O'ta kuchli 950 Nm aylanma momentga ega professional zarbali gaykovyort. Po'lat karkaslar, anker boltlar va yuk avtomobillari g'ildiraklarini oson burab beradi. To'plamda 2 ta 5.0 Ah akkumulyator, tezkor zaryadlovchi va TSTAK qutisi mavjud.",
      ru: "Тяжелый ударный гайковерт с моментом 950 Нм (1625 Нм на срыв). Для монтажа металлоконструкций, анкерных групп и грузовой техники. В комплекте 2 АКБ по 5.0 Ач, зарядное устройство и кейс TSTAK.",
      en: "Heavy-duty 18V impact wrench delivering 950 Nm fastening torque (1625 Nm breakaway). Complete kit with 2x 5.0Ah batteries, fast charger, and TSTAK case."
    },
    advantages: {
      uz: ["950 Nm o'ta kuchli moment", "To'liq komplekt: 2 ta 5.0Ah akkumulyator", "3 xil tezlik/kuch rejimi"],
      ru: ["950 Нм колоссальный крутящий момент", "Полный комплект с 2 АКБ 5.0 Ач", "3 скорости работы"],
      en: ["950 Nm tightening torque", "Includes dual 5.0Ah batteries and charger", "3-speed settings"]
    },
    disadvantages: {
      uz: ["Yuqori narx toifasi"],
      ru: ["Высокая стоимость набора"],
      en: ["Premium investment"]
    },
    recommendedAccessories: ["prod-hammer-slag", "prod-welding-gloves"]
  },
  {
    id: "prod-sentinel-a50",
    name: "ESAB Sentinel A50 Avtomatik Payvandlash Niqobi",
    brand: "ESAB",
    categorySlug: "payvandlash-niqoblari",
    subCategory: "Xameleon niqob",
    price: 3850000,
    oldPrice: 4300000,
    discountPercent: 10,
    rating: 5.0,
    reviewsCount: 78,
    inStock: true,
    stockCount: 14,
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
    ],
    power: "Quyosh batareyasi + 2x CR2450",
    voltage: "3V",
    weight: 0.64,
    dimensions: "100 x 60 mm ko'rish oynasi",
    warrantyMonths: 24,
    grade: "professional",
    powerSource: "battery",
    workingSpecs: {
      continuousTime: "Cheklanmagan (kun bo'yi)",
      recommendedRest: "Dam olish talab qilinmaydi",
      dailyRecommended: "8-10 soat",
      estimatedServiceLife: "5 yil",
      batteryRunTime: "2500 soat batareya quvvati",
      chargingTime: "Quyosh paneli doimiy zaryadlaydi"
    },
    description: {
      uz: "Dunyoning eng taniqli premium payvandlash niqoblaridan biri. Halo 5 bosh tasma tizimi og'irlikni boshga teng taqsimlaydi. Katta rangli sensorli ekran, TrueColor tabiiy rang uzatish va Grinding (shliflash) tashqi tugmasi bor.",
      ru: "Легендарная сварочная маска-хамелеон мирового уровня. Оголовье Halo 5 обеспечивает непревзойденный комфорт. Полноцветный сенсорный экран, технология TrueColor и кнопка режима зачистки.",
      en: "World-class aerodynamic auto-darkening welding helmet. Revolutionary Halo 5 headgear, full-color touchscreen interface, and external grind button."
    },
    advantages: {
      uz: ["1/1/1/2 yuqori optik sinf", "Ko'zni aslo charchatmaydi", "Shliflash uchun maxsus tashqi tugma"],
      ru: ["Оптический класс 1/1/1/2", "Настоящие цвета TrueColor без зеленого оттенка", "Внешняя кнопка Grind"],
      en: ["Top-tier optical clarity", "TrueColor spectrum view", "External Grind mode switch"]
    },
    disadvantages: {
      uz: ["Oldingi himoya oynasining nostandart shakli"],
      ru: ["Особая сферическая форма внешнего защитного стекла"],
      en: ["Curved front lenses require original ESAB replacements"]
    },
    recommendedAccessories: ["prod-weldpro-300a", "prod-welding-gloves"]
  },
  {
    id: "prod-esab-ok46",
    name: "ESAB OK 46.00 Rutil Payvandlash Elektrodlari (3.2mm, 5.3kg)",
    brand: "ESAB",
    categorySlug: "elektrodlar",
    subCategory: "Rutil elektrod",
    price: 185000,
    oldPrice: 210000,
    discountPercent: 12,
    rating: 4.9,
    reviewsCount: 110,
    inStock: true,
    stockCount: 150,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
    ],
    power: "80–140A tok talab qiladi",
    voltage: "Minimal 50V ochilish kuchlanishi",
    weight: 5.3,
    warrantyMonths: 36,
    grade: "professional",
    powerSource: "manual",
    workingSpecs: {
      continuousTime: "Bitta elektrod ~1.5 daqiqa yonadi",
      recommendedRest: "Shlakni tozalash oralig'i",
      dailyRecommended: "Cheklanmagan",
      estimatedServiceLife: "Saqlash muddati 3 yil (quruq joyda)"
    },
    description: {
      uz: "O'zbekistondagi eng mashhur premium rutil elektrodlar. Zanglagan va ifloslangan metallarni ham oson ulaydi. Qayta alangalanishi a'lo darajada, shlak o'z-o'zidan ajraladi.",
      ru: "Самые популярные универсальные рутиловые электроды. Отлично варят по ржавчине и оцинковке. Легкий повторный поджиг, шлак отделяется сам.",
      en: "Gold standard all-position rutile electrodes for mild steel fabrication. Easy strike and re-strike, self-releasing slag even on primed metal."
    },
    advantages: {
      uz: ["Shlak o'zi tushadi", "Barcha fazoviy holatlarda chok", "O'ta oson alangalanish"],
      ru: ["Самоотделяющийся шлак", "Легкий первый и повторный поджиг", "Сварка во всех положениях"],
      en: ["Self-peeling slag", "Exceptional re-strike", "Runs in all welding positions"]
    },
    disadvantages: {
      uz: ["Nam joyda saqlansa kuydirish (prokalka) talab qiladi"],
      ru: ["Требует прокалки при намокании упаковки"],
      en: ["Requires re-drying if exposed to humidity"]
    },
    recommendedAccessories: ["prod-hammer-slag", "prod-weldpro-300a"]
  },
  {
    id: "prod-uoni-1355",
    name: "UONI-13/55 Asosiy Qoplamali Sanoat Elektrodlari (4.0mm, 5.0kg)",
    brand: "Monolith",
    categorySlug: "elektrodlar",
    subCategory: "Asosiy qoplamali elektrod",
    price: 195000,
    rating: 4.8,
    reviewsCount: 34,
    inStock: true,
    stockCount: 80,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
    ],
    power: "130–180A tok talab qiladi",
    voltage: "O'zgarmas tok (DC+)",
    weight: 5.0,
    warrantyMonths: 36,
    grade: "professional",
    powerSource: "manual",
    workingSpecs: {
      continuousTime: "Bitta elektrod ~2.0 daqiqa",
      recommendedRest: "Texnologik oraliq",
      dailyRecommended: "Sanoat talabiga binoan",
      estimatedServiceLife: "3 yil"
    },
    description: {
      uz: "Mas'uliyatli yuk ko'taruvchi konstruksiyalar, bosim ostidagi quvurlar va ko'priklar uchun yuqori mustahkamlikdagi asosiy qoplamali elektrod.",
      ru: "Электроды с основным покрытием для ответственных металлоконструкций, несущих балок и трубопроводов под давлением.",
      en: "Basic low-hydrogen electrodes for critical structural welds, pressure vessels, and high tensile loads."
    },
    advantages: {
      uz: ["Yuqori plastiklik va mustahkam chok", "Yoriqlar hosil bo'lmaydi", "Minus haroratlarda chidamli"],
      ru: ["Высокая ударная вязкость шва", "Стойкость к трещинам", "Отличные результаты при низких температурах"],
      en: ["Superior crack resistance", "High impact toughness at sub-zero temps", "X-ray quality welds"]
    },
    disadvantages: {
      uz: ["Metall yuzasi toza bo'lishini talab qiladi"],
      ru: ["Требует тщательной зачистки кромок от ржавчины"],
      en: ["Requires clean joints free of oil and rust"]
    },
    recommendedAccessories: ["prod-weldpro-300a", "prod-hammer-slag"]
  },
  {
    id: "prod-mig-wire",
    name: "Magmaweld ER70S-6 Mis Qoplangan Payvandlash Simi (0.8mm, 15kg)",
    brand: "Magmaweld",
    categorySlug: "elektrodlar",
    subCategory: "Yarim avtomat simi",
    price: 380000,
    oldPrice: 420000,
    discountPercent: 9,
    rating: 4.8,
    reviewsCount: 42,
    inStock: true,
    stockCount: 45,
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
    ],
    power: "Yarim avtomat (MIG/MAG) uchun",
    voltage: "18–26V",
    weight: 15.0,
    warrantyMonths: 24,
    grade: "professional",
    powerSource: "electric",
    workingSpecs: {
      continuousTime: "G'altak tugaguncha uzluksiz",
      recommendedRest: "Gorelkaga bog'liq",
      dailyRecommended: "8-12 soat",
      estimatedServiceLife: "Saqlash muddati 2 yil"
    },
    description: {
      uz: "Avtomobil tuzatish va temir eshik/darvoza ishlab chiqarish uchun 1-toifali toza mis qoplangan qattiq o'ramli sim.",
      ru: "Высококачественная омедненная сварочная проволока для полуавтоматов в среде CO2 и смеси Ar+CO2.",
      en: "Precision copper-coated solid wire for MIG/MAG welding with CO2 and Argon mixes."
    },
    advantages: {
      uz: ["Tekis qatlamli o'ram", "Gorelkada tiqilmaydi", "Sachrash minimal"],
      ru: ["Рядная намотка без перехлестов", "Стабильная подача в рукаве", "Минимальное разбрызгивание"],
      en: ["Precision layer-wound", "Zero feed-jamming", "Low spatter levels"]
    },
    disadvantages: {
      uz: ["Gaz balloni (CO2 yoki aralashma) talab qilinadi"],
      ru: ["Требуется защитный газ"],
      en: ["Requires shielding gas supply"]
    },
    recommendedAccessories: ["prod-gas-regulator", "prod-esab-warrior500"]
  },
  {
    id: "prod-metal-saw-355",
    name: "Crown CT15224 Montaj Kesish Stanogi (355mm, 2400W)",
    brand: "Crown",
    categorySlug: "metall-arralari",
    subCategory: "Diskli montaj arrasi",
    price: 1850000,
    oldPrice: 2050000,
    discountPercent: 10,
    rating: 4.7,
    reviewsCount: 28,
    inStock: true,
    stockCount: 11,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
    ],
    power: "2400 W",
    powerKw: 2.4,
    voltage: "220V",
    weight: 16.5,
    dimensions: "530 x 310 x 420 mm",
    warrantyMonths: 12,
    grade: "professional",
    powerSource: "electric",
    workingSpecs: {
      continuousTime: "40 minut",
      recommendedRest: "15 minut",
      dailyRecommended: "6 soat",
      estimatedServiceLife: "5 yil"
    },
    description: {
      uz: "Profil trubalar, burchakliklar va armaturalarni 45° va 90° burchak ostida toza va tez kesish uchun statsionar metall arrasi.",
      ru: "Монтажная отрезная пила по металлу для точного раскроя профильных труб, швеллера и прутка под углами 45° и 90°.",
      en: "Heavy-duty 355mm chop saw for fast cutting of steel pipe, square tubing, and structural angle iron."
    },
    advantages: {
      uz: ["2400W kuchli dvigatel", "Tez qisuvchi tiski mexanizmi", "Qo'shimcha himoya qopqog'i"],
      ru: ["2400 Вт надежный двигатель", "Быстрозажимные тиски с регулировкой угла", "Надежный кожух искроуловителя"],
      en: ["2400W power", "Quick-release vise clamp with angle preset", "Sparks deflector"]
    },
    disadvantages: {
      uz: ["Abraziv disk sababli uchqun ko'p chiqadi"],
      ru: ["Абразивный диск оставляет заусенцы"],
      en: ["Abrasive cutting leaves minor burrs"]
    },
    recommendedAccessories: ["prod-welding-gloves", "prod-bessey-clamp"]
  },
  {
    id: "prod-magnetic-drill",
    name: "BDS MAB 485 Magnit Asosli Burg'ulash Stanogi",
    brand: "BDS Maschinen",
    categorySlug: "drellar",
    subCategory: "Magnitli stanok",
    price: 18900000,
    oldPrice: 20500000,
    discountPercent: 8,
    rating: 4.9,
    reviewsCount: 19,
    inStock: true,
    stockCount: 4,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80"
    ],
    power: "1150 W",
    powerKw: 1.15,
    voltage: "220V",
    weight: 13.0,
    dimensions: "Katta qalin metall balkalar ustida o'rnatiladi",
    warrantyMonths: 12,
    grade: "professional",
    powerSource: "electric",
    workingSpecs: {
      continuousTime: "60 minut",
      recommendedRest: "15 minut",
      dailyRecommended: "8 soat",
      estimatedServiceLife: "7 yil"
    },
    description: {
      uz: "Nemis sifatidagi magnit asosli stanok. Qalin balkalar va po'lat konstruksiyalarni joyida koronkali parma bilan 40 mm gacha teshish imkonini beradi.",
      ru: "Немецкий магнитный сверлильный станок для сверления корончатыми сверлами до 40 мм прямо на смонтированных балках.",
      en: "German engineered magnetic base core drilling machine for structural beams up to 40mm hole diameter."
    },
    advantages: {
      uz: ["16,000 N ushlab turish kuchi", "Revers (rezba ochish) funksiyasi", "Ichki sovutish tizimi"],
      ru: ["Сила прижима магнита 16 000 Н", "Функция нарезания резьбы (реверс)", "Встроенная подача СОЖ"],
      en: ["16,000 N magnetic holding force", "Tapping reverse function", "Integrated coolant delivery"]
    },
    disadvantages: {
      uz: ["Faqat ferromagnit (po'lat) yuzalarda magnitlanadi"],
      ru: ["Работает только на стальных ферромагнитных поверхностях"],
      en: ["Only mounts on magnetic carbon steels"]
    },
    recommendedAccessories: ["prod-bessey-clamp"]
  },
  {
    id: "prod-bessey-clamp",
    name: "Bessey TGRC Og'ir Butun Po'lat Payvandlash Qisqichi (600mm)",
    brand: "Bessey",
    categorySlug: "qol-asboblari",
    subCategory: "Strubtsina",
    price: 490000,
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    stockCount: 35,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    ],
    power: "Qo'l kuchi (Mexanik)",
    voltage: "Mexanik",
    weight: 2.4,
    warrantyMonths: 60,
    grade: "professional",
    powerSource: "manual",
    workingSpecs: {
      continuousTime: "Cheklanmagan",
      recommendedRest: "Talab qilinmaydi",
      dailyRecommended: "Uzluksiz",
      estimatedServiceLife: "10+ yil"
    },
    description: {
      uz: "Metall detallarni payvandlashdan oldin qattiq siqib turish uchun toblangan po'lat strubtsina. 8,500 N gacha siqish kuchi beradi.",
      ru: "Сверхмощная цельнокованая струбцина для фиксации заготовок под сварку. Усилие зажима до 8 500 Н.",
      en: "Heavy-duty all-steel clamping tool with up to 8,500 N clamping force, resistant to weld spatter."
    },
    advantages: {
      uz: ["Toblangan po'lat", "Uchqun va issiqqa chidamli vint", "5 yillik kafolat"],
      ru: ["Цельнокованная конструкция", "Омедненный винт защищен от брызг металла", "Срок службы более 10 лет"],
      en: ["Forged steel beam", "Spatter-resistant spindle", "Exceptional durability"]
    },
    disadvantages: {
      uz: ["Mexanik qo'l asbobi"],
      ru: ["Ручной инструмент"],
      en: ["Manual tightening"]
    },
    recommendedAccessories: ["prod-hammer-slag"]
  },
  {
    id: "prod-welding-gloves",
    name: "WeldPro Kevlar Ipli Tabiiy Spilok Payvandlash Qo'lqoplari (Kragi)",
    brand: "WeldPro",
    categorySlug: "qolqoplar",
    subCategory: "Payvandchi kragasi",
    price: 85000,
    rating: 4.8,
    reviewsCount: 94,
    inStock: true,
    stockCount: 120,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
    ],
    power: "Issiqlik himoyasi: 350°C gacha",
    voltage: "Statik himoya",
    weight: 0.35,
    warrantyMonths: 6,
    grade: "professional",
    powerSource: "manual",
    workingSpecs: {
      continuousTime: "Issiq metall bilan bevosita aloqa 15 soniya",
      recommendedRest: "Sovutish",
      dailyRecommended: "Smena davomida",
      estimatedServiceLife: "3-6 oy faol payvandlashda"
    },
    description: {
      uz: "1.4 mm qalinlikdagi tabiiy qoramol spilogidan tayyorlangan uzun kragalar. Kevlar iplari bilan tikilganligi sababli olov va uchqunda choklari sochilmaydi.",
      ru: "Удлиненные сварочные краги из высококачественного спилка КРС толщиной 1.4 мм. Прошиты огнестойкой нитью Kevlar.",
      en: "Premium 1.4mm split cowhide welding gauntlets stitched with flame-resistant DuPont Kevlar thread."
    },
    advantages: {
      uz: ["Kevlar ipli chidamli choklar", "Yumshoq paxta ichki astar", "Uzun bilak himoyasi"],
      ru: ["Кевларовые швы", "Мягкая дышащая хлопковая подкладка", "Длинная манжета 35 см"],
      en: ["Kevlar stitching", "Cotton lining for comfort", "Extended 35cm cuff"]
    },
    disadvantages: {
      uz: ["Suvda yuvib bo'lmaydi"],
      ru: ["Нельзя стирать в воде"],
      en: ["Dry brush cleaning only"]
    },
    recommendedAccessories: ["prod-workwear-jacket", "prod-sentinel-a50"]
  },
  {
    id: "prod-laser-level",
    name: "Huepar 3D 360° Yashil Nurli Professional Lazer Nivelir",
    brand: "Huepar",
    categorySlug: "olchov-asboblari",
    subCategory: "Lazer nivelir",
    price: 1650000,
    oldPrice: 1900000,
    discountPercent: 13,
    rating: 4.8,
    reviewsCount: 47,
    inStock: true,
    stockCount: 16,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    ],
    power: "5200 mAh Li-Ion batareya",
    voltage: "3.7V Type-C",
    weight: 0.85,
    warrantyMonths: 24,
    grade: "professional",
    powerSource: "battery",
    workingSpecs: {
      continuousTime: "8 soat barcha nurlar yoqilganda",
      recommendedRest: "Talab qilinmaydi",
      dailyRecommended: "8 soat",
      estimatedServiceLife: "5 yil",
      batteryRunTime: "8-12 soat",
      chargingTime: "3.5 soat"
    },
    description: {
      uz: "Metall konstruksiyalarni montaj qilish, darvoza va to'siqlarni tekis o'rnatish uchun 3x360° yashil Osram diodli lazer niveliri. 40 metrgacha aniq nur.",
      ru: "Профессиональный 3D лазерный уровень с яркими зелеными лучами Osram для монтажа металлоконструкций и нивелирования.",
      en: "Professional 3x360° green beam self-leveling laser level with Osram diodes for steel framing and alignment."
    },
    advantages: {
      uz: ["Yashil yorqin nur", "360 daraja 3 ta tekislik", "Type-C zaryadlash"],
      ru: ["Яркие зеленые лучи Osram", "3 плоскости по 360 градусов", "Зарядка через Type-C"],
      en: ["Ultra-bright German Osram green beam", "Full 3x360° coverage", "USB Type-C power"]
    },
    disadvantages: {
      uz: ["Kuchli quyosh ostida qabul qiluvchi datchik (priyomnik) talab qilinishi mumkin"],
      ru: ["На ярком солнце на улице требуется приемник луча"],
      en: ["Outdoor direct sunlight requires laser receiver"]
    },
    recommendedAccessories: ["prod-dewalt-dcf899"]
  },
  {
    id: "prod-hammer-slag",
    name: "Kraftool Prujinali Shlak Tozalash Bolg'asi (500g)",
    brand: "Kraftool",
    categorySlug: "bolgalar",
    subCategory: "Shlak bolg'asi",
    price: 95000,
    rating: 4.7,
    reviewsCount: 22,
    inStock: true,
    stockCount: 40,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
    ],
    power: "Mexanik",
    voltage: "Mexanik",
    weight: 0.5,
    warrantyMonths: 12,
    grade: "professional",
    powerSource: "manual",
    workingSpecs: {
      continuousTime: "Cheklanmagan",
      recommendedRest: "Talab qilinmaydi",
      dailyRecommended: "Smena davomida",
      estimatedServiceLife: "5+ yil"
    },
    description: {
      uz: "Payvand chokidagi shlakni urib tushirish uchun maxsus prujinali zarba qaytaruvchi ushlagichli toblangan bolg'a.",
      ru: "Специальный шлакоотбойный молоток со спиральной пружинной рукояткой для гашения отдачи при зачистке швов.",
      en: "Chipping slag hammer with shock-absorbing coil spring handle and pointed chisel hardened head."
    },
    advantages: {
      uz: ["Prujinali zarbani yutuvchi dasta", "Ikki tomonlama uchi (pona va igna)", "Qattiq toblangan po'lat"],
      ru: ["Пружинная рукоятка гасит вибрацию", "Двусторонняя заточка (зубило и пика)", "Закаленная сталь"],
      en: ["Vibration absorbing spiral handle", "Dual pointed and chisel ends", "Hardened carbon steel"]
    },
    disadvantages: {
      uz: ["Mexanik qo'l asbobi"],
      ru: ["Ручной инструмент"],
      en: ["Manual tool"]
    },
    recommendedAccessories: ["prod-esab-ok46", "prod-weldpro-300a"]
  },
  {
    id: "prod-copper-cable",
    name: "KOG-1x35mm² Sof Mis Payvandlash Kabeli (10 metr)",
    brand: "Gost-Cable",
    categorySlug: "kabel-va-aksessuarlar",
    subCategory: "Mis kabel",
    price: 650000,
    rating: 4.9,
    reviewsCount: 30,
    inStock: true,
    stockCount: 25,
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
    ],
    power: "350A gacha o'tkazuvchanlik",
    voltage: "660V gacha",
    weight: 4.8,
    warrantyMonths: 24,
    grade: "professional",
    powerSource: "electric",
    workingSpecs: {
      continuousTime: "300A da 100% qizimasdan o'tkazadi",
      recommendedRest: "Talab qilinmaydi",
      dailyRecommended: "Uzluksiz",
      estimatedServiceLife: "8 yil"
    },
    description: {
      uz: "100% kislorodsiz toza mis tolalardan iborat egiluvchan sovuqqa chidamli rezina qoplamali kabel. Tok tushishini oldini oladi va qizib ketmaydi.",
      ru: "Гибкий сварочный кабель КГ 1х35 из 100% бескислородной меди с морозостойкой резиновой изоляцией.",
      en: "Heavy-duty 1x35mm² flexible pure copper welding cable with oil and cold resistant rubber sheath."
    },
    advantages: {
      uz: ["100% toza mis", "-40°C da ham egiluvchan", "Qizib ketmaydi"],
      ru: ["100% медь высшей пробы", "Не дубеет на морозе", "Минимальное падение напряжения"],
      en: ["100% pure copper strands", "Flexible in winter down to -40°C", "Minimal voltage drop"]
    },
    disadvantages: {
      uz: ["Alyuminiy qotishmali arzon kabellarga qaraganda vazni og'irroq"],
      ru: ["Тяжелее алюминиевых аналогов"],
      en: ["Heavier than aluminum alternatives"]
    },
    recommendedAccessories: ["prod-weldpro-300a"]
  },
  {
    id: "prod-gas-regulator",
    name: "Redius Ar/CO2 Ikki Manometrli Gaz Reduktori",
    brand: "Redius",
    categorySlug: "gaz-payvandlash-uskunalari",
    subCategory: "Gaz reduktori",
    price: 360000,
    rating: 4.7,
    reviewsCount: 18,
    inStock: true,
    stockCount: 22,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
    ],
    power: "200 bar kirish bosimi",
    voltage: "Mexanik",
    weight: 1.1,
    warrantyMonths: 12,
    grade: "professional",
    powerSource: "gas",
    workingSpecs: {
      continuousTime: "Uzluksiz gaz berish",
      recommendedRest: "Talab qilinmaydi",
      dailyRecommended: "Smena davomida",
      estimatedServiceLife: "5 yil"
    },
    description: {
      uz: "Argon va karbonat angidrid (CO2) ballonlari uchun latun korpusli universal ikki manometrli bosim rostlagich.",
      ru: "Универсальный регулятор расхода газа (Аргон / Углекислота) с двумя манометрами для полуавтоматической и TIG сварки.",
      en: "Dual-gauge brass body flow meter and regulator for Argon and CO2 cylinder connections."
    },
    advantages: {
      uz: ["Latun pishiq korpus", "Gaz sarfini aniq ko'rsatuvchi rotametr", "Ishonchli xavfsizlik klapani"],
      ru: ["Латунный прочный корпус", "Точная регулировка расхода", "Предохранительный клапан"],
      en: ["Solid brass construction", "Precise flow indicator", "Integrated safety relief valve"]
    },
    disadvantages: {
      uz: ["Yuqori bosimli ballon bilan ehtiyotkorlik talab etiladi"],
      ru: ["Требует аккуратности при подключении к баллону"],
      en: ["Requires safe handling around high pressure cylinders"]
    },
    recommendedAccessories: ["prod-mig-wire"]
  },
  {
    id: "prod-workwear-jacket",
    name: "Usta Pro O'tga Chidamli Spilok va Brezent Payvandchi Kostyumi",
    brand: "Usta Pro",
    categorySlug: "maxsus-ish-kiyimlari",
    subCategory: "Payvandchi kostyumi",
    price: 490000,
    oldPrice: 560000,
    discountPercent: 12,
    rating: 4.8,
    reviewsCount: 35,
    inStock: true,
    stockCount: 20,
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
    ],
    power: "Olovga va erigan metall chayqalishiga chidamli",
    voltage: "Statik himoya",
    weight: 2.8,
    warrantyMonths: 12,
    grade: "professional",
    powerSource: "manual",
    workingSpecs: {
      continuousTime: "Smena davomida 8-10 soat",
      recommendedRest: "Talab qilinmaydi",
      dailyRecommended: "To'liq ish kuni",
      estimatedServiceLife: "1-2 yil faol xizmat"
    },
    description: {
      uz: "Ko'krak va yeng qismlari tabiiy qalin spilok charm bilan kuchaytirilgan o'tga chidamli qalin brezent kostyum (kurtka va shim).",
      ru: "Огнестойкий брезентовый костюм сварщика с кожаными спилковыми накладками на груди, рукавах и коленях.",
      en: "Heavy-duty flame retardant canvas suit with split cowhide reinforcement patches on chest, forearms, and knees."
    },
    advantages: {
      uz: ["Kuchaytirilgan spilok qoplamalar", "Erigan metall chayqalishidan to'liq himoya", "Nafas oluvchi paxta ichki qismi"],
      ru: ["Спилковые усиления в критических зонах", "Надежная защита от окалины и брызг", "Вентиляционные отверстия"],
      en: ["Cowhide reinforced abrasion zones", "Protects against molten slag and radiant heat", "Comfortable cotton breathability"]
    },
    disadvantages: {
      uz: ["Yozning issiq kunlarida og'irlik qilishi mumkin"],
      ru: ["Плотный и теплый для работы в жарких помещениях"],
      en: ["Heavy fabric can be warm in peak summer"]
    },
    recommendedAccessories: ["prod-welding-gloves", "prod-sentinel-a50"]
  }
];
