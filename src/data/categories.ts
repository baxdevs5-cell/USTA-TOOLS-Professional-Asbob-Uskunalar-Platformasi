import { Category } from '../types';

export const categories: Category[] = [
  {
    id: "cat-1",
    slug: "payvandlash-apparatlari",
    name: {
      uz: "Payvandlash apparatlari",
      ru: "Сварочные аппараты",
      en: "Welding Machines"
    },
    icon: "Flame",
    description: {
      uz: "Invertorli, yarim avtomat (MIG/MAG), TIG va plazma kesish apparatlari",
      ru: "Инверторные, полуавтоматы (MIG/MAG), TIG и аппараты плазменной резки",
      en: "Inverters, MIG/MAG semi-automatics, TIG, and plasma cutting units"
    },
    count: 28
  },
  {
    id: "cat-2",
    slug: "elektrodlar",
    name: {
      uz: "Elektrodlar",
      ru: "Электроды",
      en: "Electrodes & Filler Rods"
    },
    icon: "Zap",
    description: {
      uz: "Qora metall, nerjaviy va cho'yan uchun elektrodlar, payvandlash simlari",
      ru: "Электроды для углеродистой, нержавеющей стали и чугуна, сварочная проволока",
      en: "Electrodes for carbon steel, stainless steel, cast iron, and welding wire"
    },
    count: 36
  },
  {
    id: "cat-3",
    slug: "gaz-payvandlash-uskunalari",
    name: {
      uz: "Gaz payvandlash uskunalari",
      ru: "Газосварочное оборудование",
      en: "Gas Welding Equipment"
    },
    icon: "FlameKindling",
    description: {
      uz: "Gaz reduktorlari, gorelkalar, shlanglar va gaz ballon aksessuarlari",
      ru: "Газовые редукторы, горелки, шланги и баллонная арматура",
      en: "Gas regulators, torches, high-pressure hoses, and cylinder fittings"
    },
    count: 19
  },
  {
    id: "cat-4",
    slug: "bolgalar",
    name: {
      uz: "Bolg‘alar",
      ru: "Молотки и кувалды",
      en: "Hammers & Sledges"
    },
    icon: "Hammer",
    description: {
      uz: "Shlak tozalash bolg'alari, chilangar bolg'alari va og'ir kuvaldalar",
      ru: "Шлакоотбойные молотки, слесарные молотки и тяжелые кувалды",
      en: "Slag chipping hammers, machinist hammers, and heavy sledgehammers"
    },
    count: 22
  },
  {
    id: "cat-5",
    slug: "shlifmashinalar",
    name: {
      uz: "Shlifmashinalar (Bolgarka)",
      ru: "Шлифмашины (УШМ / Болгарки)",
      en: "Angle Grinders & Sanders"
    },
    icon: "Disc",
    description: {
      uz: "115mm dan 230mm gacha bo'lgan burchakli shlifmashinalar va tozalash asboblari",
      ru: "Угловые шлифмашины от 115 мм до 230 мм и зачистные станки",
      en: "Angle grinders from 115mm to 230mm, die grinders and flap sanders"
    },
    count: 32
  },
  {
    id: "cat-6",
    slug: "drellar",
    name: {
      uz: "Drellar va perforatorlar",
      ru: "Дрели и перфораторы",
      en: "Drills & Rotary Hammers"
    },
    icon: "Drill",
    description: {
      uz: "Magnit asosli stanoklar, zarbali drellar va og'ir perforatorlar",
      ru: "Магнитные сверлильные станки, ударные дрели и перфораторы",
      en: "Magnetic base drills, heavy rotary hammers, and core drills"
    },
    count: 25
  },
  {
    id: "cat-7",
    slug: "metall-kesish-uskunalari",
    name: {
      uz: "Metall kesish uskunalari",
      ru: "Оборудование для резки металла",
      en: "Metal Cutting Machines"
    },
    icon: "Scissors",
    description: {
      uz: "Plazmorezlar, gilotinlar va statsionar montaj kesish stanoklari",
      ru: "Плазморезы, гильотины и монтажные отрезные пилы",
      en: "Plasma cutters, heavy shears, guillotine cutters, and chop saws"
    },
    count: 17
  },
  {
    id: "cat-8",
    slug: "metall-arralari",
    name: {
      uz: "Metall arralari",
      ru: "Пилы по металлу",
      en: "Metal Bandsaws & Saws"
    },
    icon: "Saw",
    description: {
      uz: "Lentali metall arralar, diskli montaj arralari va polotnolar",
      ru: "Ленточнопильные станки, монтажные дисковые пилы и полотна",
      en: "Horizontal metal bandsaws, cold cut saws, and bi-metal blades"
    },
    count: 15
  },
  {
    id: "cat-9",
    slug: "qol-asboblari",
    name: {
      uz: "Qo‘l asboblari",
      ru: "Ручной инструмент",
      en: "Hand Tools & Clamps"
    },
    icon: "Wrench",
    description: {
      uz: "Payvandlash qisqichlari (strubtsinalar), kalitlar, omburlar va tirsaklar",
      ru: "Сварочные струбцины, зажимы, ключи, клещи и тиски",
      en: "Welding clamps, locking pliers, heavy vices, and wrenches"
    },
    count: 45
  },
  {
    id: "cat-10",
    slug: "himoya-vositalari",
    name: {
      uz: "Himoya vositalari",
      ru: "Средства индивидуальной защиты",
      en: "Personal Protective Equipment"
    },
    icon: "ShieldAlert",
    description: {
      uz: "Respiratorlar, quloqchinlar, himoya ko'zoynaklari va xavfsizlik kaskalari",
      ru: "Респираторы, наушники, защитные очки и строительные каски",
      en: "Respirators, hearing protection, safety goggles, and hard hats"
    },
    count: 24
  },
  {
    id: "cat-11",
    slug: "payvandlash-niqoblari",
    name: {
      uz: "Payvandlash niqoblari",
      ru: "Сварочные маски (Хамелеон)",
      en: "Welding Helmets"
    },
    icon: "Glasses",
    description: {
      uz: "Avtomatik qorayuvchi xameleon niqoblar, optik sinfi 1/1/1/1",
      ru: "Автоматические маски хамелеон с оптическим классом 1/1/1/1",
      en: "Auto-darkening chameleon helmets with TrueColor 1/1/1/1 optics"
    },
    count: 18
  },
  {
    id: "cat-12",
    slug: "qolqoplar",
    name: {
      uz: "Qo‘lqoplar (Kragi)",
      ru: "Сварочные краги и перчатки",
      en: "Welding Gloves & Gauntlets"
    },
    icon: "HandMetal",
    description: {
      uz: "Kevlar ipli tabiiy charm va spilok payvandlash kragalari",
      ru: "Кожаные и спилковые сварочные краги с кевларовой прошивкой",
      en: "Split cowhide and goatskin TIG/MIG gauntlets with Kevlar stitching"
    },
    count: 20
  },
  {
    id: "cat-13",
    slug: "maxsus-ish-kiyimlari",
    name: {
      uz: "Maxsus ish kiyimlari",
      ru: "Спецодежда и спецобувь",
      en: "Workwear & Safety Boots"
    },
    icon: "Shirt",
    description: {
      uz: "O'tga chidamli bradli kostyumlar va po'lat burunli xavfsizlik botinkalari",
      ru: "Огнестойкие брезентовые костюмы и ботинки с металлоподноском",
      en: "Flame-retardant welding suits, leather aprons, and steel-toe boots"
    },
    count: 16
  },
  {
    id: "cat-14",
    slug: "kabel-va-aksessuarlar",
    name: {
      uz: "Kabel va aksessuarlar",
      ru: "Кабели и аксессуары",
      en: "Cables & Accessories"
    },
    icon: "Cable",
    description: {
      uz: "KOG mis kabellari, bayonet raz'yomlar, massa qisqichlari va derjatellar",
      ru: "Медные кабели КГ, байонетные разъемы, зажимы массы и держатели",
      en: "Pure copper cables, Dinse connectors, ground clamps, and electrode holders"
    },
    count: 30
  },
  {
    id: "cat-15",
    slug: "akkumulyatorli-asboblar",
    name: {
      uz: "Akkumulyatorli asboblar",
      ru: "Аккумуляторный инструмент",
      en: "Cordless Tools"
    },
    icon: "BatteryCharging",
    description: {
      uz: "Brushless 20V/40V gaykovyortlar, akkumulyatorli bolgarka va arralar",
      ru: "Бесщеточные 20В/40В гайковерты, аккумуляторные УШМ и сабельные пилы",
      en: "Brushless 20V/40V impact wrenches, cordless angle grinders, and reciprocal saws"
    },
    count: 26
  },
  {
    id: "cat-16",
    slug: "qurilish-asboblari",
    name: {
      uz: "Qurilish asboblari",
      ru: "Строительное оборудование",
      en: "Construction Machinery"
    },
    icon: "HardHat",
    description: {
      uz: "Beton aralashtirgichlar, armatura bukuvchilar va vibratorlar",
      ru: "Бетономешалки, станки для гибки арматуры и виброплиты",
      en: "Concrete mixers, rebar benders, plate compactors, and concrete vibrators"
    },
    count: 21
  },
  {
    id: "cat-17",
    slug: "olchov-asboblari",
    name: {
      uz: "O‘lchov asboblari",
      ru: "Измерительный инструмент",
      en: "Measuring & Leveling Tools"
    },
    icon: "Ruler",
    description: {
      uz: "Shtangensirkullar, lazerli nivelirlar, chok o'lchov shablonlari",
      ru: "Штангенциркули, лазерные уровни, шаблоны сварщика (УШС-3)",
      en: "Digital calipers, 360° laser levels, and welding seam gauges (WG1)"
    },
    count: 19
  },
  {
    id: "cat-18",
    slug: "ish-chiroqlari",
    name: {
      uz: "Ish chiroqlari",
      ru: "Рабочее освещение",
      en: "Industrial Work Lights"
    },
    icon: "Lightbulb",
    description: {
      uz: "Zarbalarga chidamli LED projektorlar, magnitli ustaxona chiroqlari",
      ru: "Ударопрочные светодиодные прожекторы и магнитные фонари",
      en: "High-lumen impact-resistant LED floodlights and magnetic task lights"
    },
    count: 14
  }
];
