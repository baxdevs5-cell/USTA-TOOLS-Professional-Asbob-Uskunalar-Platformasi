import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calculator, 
  Zap, 
  Flame, 
  Scale, 
  Layers, 
  Clock, 
  DollarSign, 
  Save, 
  Check, 
  Info,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const CalculatorsPage: React.FC = () => {
  const { 
    t, 
    language, 
    saveProjectToProfile, 
    addCalculatorHistory, 
    showToast 
  } = useApp();

  const [activeCalc, setActiveCalc] = useState<number>(1);

  // 1. Welding Electrode Calculator State
  const [c1Thickness, setC1Thickness] = useState<number>(4);
  const [c1JointType, setC1JointType] = useState<string>('butt');
  const [c1Length, setC1Length] = useState<number>(10);

  // Electrode calculations
  const c1RecommendedDiameter = c1Thickness <= 2 ? 2.0 : c1Thickness <= 3 ? 2.5 : c1Thickness <= 5 ? 3.2 : c1Thickness <= 8 ? 4.0 : 5.0;
  // Consumption factor kg per meter of weld based on thickness & joint type
  const jointCoeff = c1JointType === 'butt' ? 0.08 : c1JointType === 'corner' ? 0.12 : 0.15;
  const c1TotalWeightKg = Math.max(0.2, (c1Thickness * jointCoeff * c1Length)).toFixed(2);
  const c1StickCount = Math.round(Number(c1TotalWeightKg) * (c1RecommendedDiameter === 2.5 ? 45 : c1RecommendedDiameter === 3.2 ? 32 : 18));

  // 2. Generator & Welding Power Calculator State
  const [c2Amps, setC2Amps] = useState<number>(200);
  const [c2DutyCycle, setC2DutyCycle] = useState<number>(60);
  // P (kW) = (U_arc * I) / 1000 / efficiency(0.85). U_arc approx = 20 + 0.04 * I
  const uArc = 20 + 0.04 * c2Amps;
  const c2ActiveKw = ((uArc * c2Amps) / 1000 / 0.85).toFixed(1);
  // Generator kVA requires 1.5x reserve for inverters, 2x for transformer welders
  const c2GeneratorKva = (Number(c2ActiveKw) * 1.45).toFixed(1);
  const c2BreakerFuse = Math.round((Number(c2ActiveKw) * 1000) / 220);

  // 3. Cable Length & Voltage Drop Calculator State
  const [c3Current, setC3Current] = useState<number>(250);
  const [c3Length, setC3Length] = useState<number>(10);
  // Copper conductivity gamma = 56 m/(Ohm*mm²). Permissible drop ~ 2V
  // S = (2 * L * I) / (gamma * deltaU)
  const c3SectionMm = Math.max(16, Math.ceil((2 * c3Length * c3Current) / (56 * 2.0)));
  const c3VoltageDrop = ((2 * c3Length * c3Current) / (56 * c3SectionMm)).toFixed(2);

  // 4. Electrical Power Calculator (1-phase / 3-phase)
  const [c4Phase, setC4Phase] = useState<'1' | '3'>('1');
  const [c4Current, setC4Current] = useState<number>(32);
  const [c4CosPhi, setC4CosPhi] = useState<number>(0.85);
  const c4Volts = c4Phase === '1' ? 220 : 380;
  const c4ActiveKw = c4Phase === '1'
    ? ((c4Volts * c4Current * c4CosPhi) / 1000).toFixed(2)
    : ((Math.sqrt(3) * c4Volts * c4Current * c4CosPhi) / 1000).toFixed(2);
  const c4ApparentKva = (Number(c4ActiveKw) / c4CosPhi).toFixed(2);

  // 5. Metal Weight Calculator State
  const [c5Material, setC5Material] = useState<string>('steel');
  const [c5Shape, setC5Shape] = useState<string>('pipe');
  const [c5Length, setC5Length] = useState<number>(6); // meters
  const [c5Diam, setC5Diam] = useState<number>(60); // mm
  const [c5Wall, setC5Wall] = useState<number>(3.0); // mm
  const [c5Width, setC5Width] = useState<number>(1000); // mm
  const [c5Thick, setC5Thick] = useState<number>(4); // mm
  const [c5SideA, setC5SideA] = useState<number>(50); // mm
  const [c5SideB, setC5SideB] = useState<number>(50); // mm

  const densities: Record<string, number> = {
    steel: 7.85,
    stainless: 7.93,
    aluminum: 2.70,
    copper: 8.96,
    castiron: 7.20
  };

  const currentDensity = densities[c5Material] || 7.85;

  let c5CalculatedWeight = 0;
  let c5FormulaExplanation = "";

  if (c5Shape === 'sheet') {
    // Weight = Length(m) * Width(m) * Thickness(mm) * Density
    c5CalculatedWeight = c5Length * (c5Width / 1000) * c5Thick * currentDensity;
    c5FormulaExplanation = `M = L × W × T × ρ = ${c5Length}m × ${(c5Width/1000).toFixed(2)}m × ${c5Thick}mm × ${currentDensity} g/cm³`;
  } else if (c5Shape === 'pipe') {
    // Pipe: M = pi * (D - S) * S * L * rho / 1000
    c5CalculatedWeight = (Math.PI * (c5Diam - c5Wall) * c5Wall * c5Length * currentDensity) / 1000;
    c5FormulaExplanation = `M = π × (D - s) × s × L × ρ / 1000 = 3.1416 × (${c5Diam} - ${c5Wall}) × ${c5Wall} × ${c5Length}m × ${currentDensity}`;
  } else if (c5Shape === 'roundBar') {
    // M = pi * (D/2)^2 * L * rho / 1000
    const r = c5Diam / 20; // cm
    c5CalculatedWeight = (Math.PI * r * r * (c5Length * 100) * currentDensity) / 1000;
    c5FormulaExplanation = `M = π × (D/2)² × L × ρ = 3.1416 × ${(c5Diam/2).toFixed(1)}² × ${c5Length}m`;
  } else if (c5Shape === 'squareTube') {
    // M = 2 * (A + B - 2*s) * s * L * rho / 1000
    c5CalculatedWeight = (2 * (c5SideA + c5SideB - 2 * c5Wall) * c5Wall * c5Length * currentDensity) / 1000;
    c5FormulaExplanation = `M = 2 × (A + B - 2s) × s × L × ρ / 1000`;
  } else if (c5Shape === 'squareBar') {
    const aCm = c5SideA / 10;
    c5CalculatedWeight = (aCm * aCm * (c5Length * 100) * currentDensity) / 1000;
    c5FormulaExplanation = `M = a² × L × ρ`;
  } else if (c5Shape === 'angle') {
    c5CalculatedWeight = ((c5SideA + c5SideB - c5Wall) * c5Wall * c5Length * currentDensity) / 1000;
    c5FormulaExplanation = `M = (A + B - s) × s × L × ρ / 1000`;
  }

  // 6. Sheet Metal Area & Count Calculator State
  const [c6LenMm, setC6LenMm] = useState<number>(2500);
  const [c6WidMm, setC6WidMm] = useState<number>(1250);
  const [c6ThickMm, setC6ThickMm] = useState<number>(3);
  const [c6Count, setC6Count] = useState<number>(5);

  const c6SingleAreaM2 = (c6LenMm / 1000) * (c6WidMm / 1000);
  const c6SingleWeightKg = c6SingleAreaM2 * c6ThickMm * 7.85;
  const c6TotalAreaM2 = (c6SingleAreaM2 * c6Count).toFixed(2);
  const c6TotalWeightKg = (c6SingleWeightKg * c6Count).toFixed(1);

  // 7. Material Cost Calculator
  const [c7WeightKg, setC7WeightKg] = useState<number>(250);
  const [c7PricePerKg, setC7PricePerKg] = useState<number>(14500);
  const c7TotalCost = c7WeightKg * c7PricePerKg;

  // 8. Working Time / Duty Cycle Calculator
  const [c8DutyCycle, setC8DutyCycle] = useState<number>(60);
  const [c8PlannedMinutes, setC8PlannedMinutes] = useState<number>(30);
  // If duty cycle is 60%, in a 10 min window: 6 min arc, 4 min rest.
  const c8ArcRatio = c8DutyCycle / 100;
  const c8CoolingNeededMinutes = Math.round(c8PlannedMinutes * ((1 - c8ArcRatio) / c8ArcRatio));
  const c8TotalPeriodMinutes = c8PlannedMinutes + c8CoolingNeededMinutes;

  // 9. PROJECT COST CALCULATOR ("LOYIHA HISOBLAGICH")
  const [projTitle, setProjTitle] = useState<string>("Temir darvoza va panjara (3x2.5m)");
  const [pMaterial, setPMaterial] = useState<number>(4500000);
  const [pElectrodes, setPElectrodes] = useState<number>(280000);
  const [pElectricity, setPElectricity] = useState<number>(120000);
  const [pGas, setPGas] = useState<number>(180000);
  const [pToolWear, setPToolWear] = useState<number>(150000);
  const [pLabor, setPLabor] = useState<number>(2200000);
  const [pTransport, setPTransport] = useState<number>(250000);
  const [pOther, setPOther] = useState<number>(200000);
  const [pMarginPercent, setPMarginPercent] = useState<number>(25);
  const [pUnits, setPUnits] = useState<number>(1);
  const [pHours, setPHours] = useState<number>(28);

  const pTotalCost = pMaterial + pElectrodes + pElectricity + pGas + pToolWear + pLabor + pTransport + pOther;
  const pProfitAmount = Math.round(pTotalCost * (pMarginPercent / 100));
  const pSellingPrice = pTotalCost + pProfitAmount;
  const pCostPerUnit = Math.round(pTotalCost / Math.max(1, pUnits));

  const handleSaveProject = () => {
    saveProjectToProfile({
      title: projTitle,
      materialCost: pMaterial,
      electrodesCost: pElectrodes,
      electricityCost: pElectricity,
      gasCost: pGas,
      toolWearCost: pToolWear,
      laborCost: pLabor,
      transportCost: pTransport,
      otherCost: pOther,
      totalCost: pTotalCost,
      profitMarginPercent: pMarginPercent,
      suggestedPrice: pSellingPrice,
      estimatedHours: pHours
    });
  };

  const calculatorButtons = [
    { id: 1, title: t.calculators.calc1.name, icon: Zap },
    { id: 5, title: t.calculators.calc5.name, icon: Scale },
    { id: 9, title: t.calculators.calc9.name, icon: DollarSign, highlight: true },
    { id: 2, title: t.calculators.calc2.name, icon: Flame },
    { id: 3, title: t.calculators.calc3.name, icon: Cpu },
    { id: 4, title: t.calculators.calc4.name, icon: Zap },
    { id: 6, title: t.calculators.calc6.name, icon: Layers },
    { id: 7, title: t.calculators.calc7.name, icon: DollarSign },
    { id: 8, title: t.calculators.calc8.name, icon: Clock },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-500 uppercase tracking-widest mb-2">
          <Calculator className="w-4 h-4" />
          <span>{t.calculators.mainTitle}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-['Chakra_Petch']">
          Ustalar va Muhandislar Uchun Interaktiv Hisob-Kitoblar
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2">
          {t.calculators.mainSubtitle}
        </p>
      </div>

      {/* Calculator selector tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-10">
        {calculatorButtons.map(btn => {
          const Icon = btn.icon;
          const isActive = activeCalc === btn.id;

          return (
            <button
              key={btn.id}
              onClick={() => setActiveCalc(btn.id)}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                isActive
                  ? 'border-amber-500 bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/20'
                  : btn.highlight
                  ? 'border-amber-500/40 bg-neutral-900 text-amber-400 hover:border-amber-500'
                  : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:bg-neutral-850'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <Icon className={`w-4 h-4 ${isActive ? 'text-neutral-950' : 'text-amber-500'}`} />
                <span className="text-[10px] font-mono">#0{btn.id}</span>
              </div>
              <span className="text-xs line-clamp-2 leading-tight">
                {btn.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* CALCULATOR 1: WELDING ELECTRODES */}
      {activeCalc === 1 && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white font-['Chakra_Petch']">
              {t.calculators.calc1.name}
            </h2>
            <p className="text-xs text-neutral-400 mt-1">{t.calculators.calc1.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">
                  {t.calculators.calc1.thickness}: <strong className="text-amber-400">{c1Thickness} mm</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={c1Thickness}
                  onChange={(e) => setC1Thickness(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">
                  {t.calculators.calc1.jointType}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'butt', label: t.calculators.calc1.jointButt },
                    { id: 'corner', label: t.calculators.calc1.jointCorner },
                    { id: 'tee', label: t.calculators.calc1.jointTee },
                  ].map(j => (
                    <button
                      key={j.id}
                      onClick={() => setC1JointType(j.id)}
                      className={`p-2 rounded border text-xs text-center font-medium ${
                        c1JointType === j.id ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                      }`}
                    >
                      {j.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">
                  {t.calculators.calc1.weldLength}
                </label>
                <input
                  type="number"
                  value={c1Length}
                  onChange={(e) => setC1Length(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            {/* Results Output */}
            <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-amber-500 uppercase tracking-widest font-bold">Hisob natijasi</span>
                <div className="space-y-4 mt-3">
                  <div>
                    <span className="text-xs text-neutral-400">{t.calculators.calc1.resultDiameter}:</span>
                    <div className="text-2xl font-black text-amber-400 font-mono">
                      Ø {c1RecommendedDiameter} mm
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-400">{t.calculators.calc1.resultKg}:</span>
                    <div className="text-xl font-bold text-white font-mono">
                      {c1TotalWeightKg} kg
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-400">{t.calculators.calc1.resultCount}:</span>
                    <div className="text-xl font-bold text-emerald-400 font-mono">
                      ~ {c1StickCount} dona
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded bg-neutral-900/60 border border-neutral-800/80 text-[11px] text-neutral-400">
                💡 Tavsiya: {c1Thickness} mm po'lat uchun tok kuchi taxminan {(c1RecommendedDiameter * 35).toFixed(0)}–{(c1RecommendedDiameter * 45).toFixed(0)}A oralig'ida bo'lishi lozim.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 2: GENERATOR & POWER SIZING */}
      {activeCalc === 2 && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white font-['Chakra_Petch']">
              {t.calculators.calc2.name}
            </h2>
            <p className="text-xs text-neutral-400 mt-1">{t.calculators.calc2.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">
                  {t.calculators.calc2.weldingAmps}: <strong className="text-amber-400">{c2Amps} A</strong>
                </label>
                <input
                  type="range"
                  min="80"
                  max="400"
                  step="10"
                  value={c2Amps}
                  onChange={(e) => setC2Amps(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">
                  {t.calculators.calc2.dutyCycle}: <strong className="text-cyan-400">{c2DutyCycle} %</strong>
                </label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  step="5"
                  value={c2DutyCycle}
                  onChange={(e) => setC2DutyCycle(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div>
                <span className="text-xs text-neutral-400">{t.calculators.calc2.resultKva}:</span>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {c2GeneratorKva} kVA
                </div>
                <span className="text-[11px] text-neutral-500">Invertorning boshlang'ich impulsini hisobga olgan holda</span>
              </div>

              <div>
                <span className="text-xs text-neutral-400">{t.calculators.calc2.resultKw}:</span>
                <div className="text-xl font-bold text-white font-mono">
                  {c2ActiveKw} kW
                </div>
              </div>

              <div>
                <span className="text-xs text-neutral-400">{t.calculators.calc2.fuseAmps}:</span>
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  {c2BreakerFuse} A (C-tip avtomat)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 3: CABLE LENGTH & VOLTAGE DROP */}
      {activeCalc === 3 && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white font-['Chakra_Petch']">
              {t.calculators.calc3.name}
            </h2>
            <p className="text-xs text-neutral-400 mt-1">{t.calculators.calc3.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">
                  {t.calculators.calc3.current}: <strong className="text-amber-400">{c3Current} A</strong>
                </label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={c3Current}
                  onChange={(e) => setC3Current(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">
                  {t.calculators.calc3.cableLength}: <strong className="text-white">{c3Length} metr</strong>
                </label>
                <input
                  type="range"
                  min="2"
                  max="50"
                  step="1"
                  value={c3Length}
                  onChange={(e) => setC3Length(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div>
                <span className="text-xs text-neutral-400">{t.calculators.calc3.resultSection}:</span>
                <div className="text-3xl font-black text-amber-400 font-mono">
                  {c3SectionMm} mm²
                </div>
                <span className="text-[11px] text-neutral-400">Standart kabel markasi: KOG-1x{c3SectionMm}</span>
              </div>

              <div>
                <span className="text-xs text-neutral-400">{t.calculators.calc3.resultDrop}:</span>
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  {c3VoltageDrop} V (Ruxsat etilgan me'yorda)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 4: ELECTRICAL POWER (1-PHASE / 3-PHASE) */}
      {activeCalc === 4 && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white font-['Chakra_Petch']">
              {t.calculators.calc4.name}
            </h2>
            <p className="text-xs text-neutral-400 mt-1">{t.calculators.calc4.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">
                  {t.calculators.calc4.phaseType}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setC4Phase('1')}
                    className={`p-2.5 rounded border text-xs font-bold ${
                      c4Phase === '1' ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                    }`}
                  >
                    {t.calculators.calc4.singlePhase}
                  </button>
                  <button
                    onClick={() => setC4Phase('3')}
                    className={`p-2.5 rounded border text-xs font-bold ${
                      c4Phase === '3' ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                    }`}
                  >
                    {t.calculators.calc4.threePhase}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">
                  {t.calculators.calc4.currentA}
                </label>
                <input
                  type="number"
                  value={c4Current}
                  onChange={(e) => setC4Current(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">
                  {t.calculators.calc4.cosPhi}
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="0.5"
                  max="1.0"
                  value={c4CosPhi}
                  onChange={(e) => setC4CosPhi(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div>
                <span className="text-xs text-neutral-400">{t.calculators.calc4.resultKw}:</span>
                <div className="text-3xl font-black text-amber-400 font-mono">
                  {c4ActiveKw} kW
                </div>
              </div>

              <div>
                <span className="text-xs text-neutral-400">{t.calculators.calc4.resultKva}:</span>
                <div className="text-2xl font-bold text-sky-400 font-mono">
                  {c4ApparentKva} kVA
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 5: COMPREHENSIVE METAL WEIGHT CALCULATOR */}
      {activeCalc === 5 && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white font-['Chakra_Petch']">
              {t.calculators.calc5.name}
            </h2>
            <p className="text-xs text-neutral-400 mt-1">{t.calculators.calc5.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {/* Material selector */}
              <div>
                <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">
                  {t.calculators.calc5.material}
                </label>
                <select
                  value={c5Material}
                  onChange={(e) => setC5Material(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white font-medium"
                >
                  <option value="steel">{t.calculators.calc5.materials.steel}</option>
                  <option value="stainless">{t.calculators.calc5.materials.stainless}</option>
                  <option value="aluminum">{t.calculators.calc5.materials.aluminum}</option>
                  <option value="copper">{t.calculators.calc5.materials.copper}</option>
                  <option value="castiron">{t.calculators.calc5.materials.castiron}</option>
                </select>
              </div>

              {/* Shape selector */}
              <div>
                <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">
                  {t.calculators.calc5.shape}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'sheet', label: t.calculators.calc5.shapes.sheet },
                    { id: 'pipe', label: t.calculators.calc5.shapes.pipe },
                    { id: 'roundBar', label: t.calculators.calc5.shapes.roundBar },
                    { id: 'squareTube', label: t.calculators.calc5.shapes.squareTube },
                    { id: 'squareBar', label: t.calculators.calc5.shapes.squareBar },
                    { id: 'angle', label: t.calculators.calc5.shapes.angle },
                  ].map(s => (
                    <button
                      key={s.id}
                      onClick={() => setC5Shape(s.id)}
                      className={`p-2 rounded border text-xs text-center font-medium ${
                        c5Shape === s.id ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic dimension fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">{t.calculators.calc5.length}</label>
                  <input
                    type="number"
                    value={c5Length}
                    onChange={(e) => setC5Length(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white font-mono"
                  />
                </div>

                {c5Shape === 'pipe' && (
                  <>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">{t.calculators.calc5.diameter}</label>
                      <input
                        type="number"
                        value={c5Diam}
                        onChange={(e) => setC5Diam(Number(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">{t.calculators.calc5.wallThickness}</label>
                      <input
                        type="number"
                        step="0.5"
                        value={c5Wall}
                        onChange={(e) => setC5Wall(Number(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                  </>
                )}

                {c5Shape === 'sheet' && (
                  <>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">{t.calculators.calc5.width}</label>
                      <input
                        type="number"
                        value={c5Width}
                        onChange={(e) => setC5Width(Number(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">{t.calculators.calc5.thickness}</label>
                      <input
                        type="number"
                        step="0.5"
                        value={c5Thick}
                        onChange={(e) => setC5Thick(Number(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                  </>
                )}

                {(c5Shape === 'squareTube' || c5Shape === 'angle') && (
                  <>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">{t.calculators.calc5.sideA}</label>
                      <input
                        type="number"
                        value={c5SideA}
                        onChange={(e) => setC5SideA(Number(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">{t.calculators.calc5.sideB}</label>
                      <input
                        type="number"
                        value={c5SideB}
                        onChange={(e) => setC5SideB(Number(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">{t.calculators.calc5.wallThickness}</label>
                      <input
                        type="number"
                        step="0.5"
                        value={c5Wall}
                        onChange={(e) => setC5Wall(Number(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Result Box with formula displayed */}
            <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-neutral-400">{t.calculators.calc5.resultWeight}:</span>
                <div className="text-4xl font-black text-amber-400 font-mono mt-1">
                  {c5CalculatedWeight.toFixed(2)} kg
                </div>
                <div className="text-sm font-mono text-neutral-400 mt-1">
                  {(c5CalculatedWeight / 1000).toFixed(4)} tonna
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800/80">
                <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase block mb-1">
                  {t.calculators.calc5.formulaUsed}:
                </span>
                <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 text-xs font-mono text-amber-300">
                  {c5FormulaExplanation}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 6: SHEET METAL BATCH */}
      {activeCalc === 6 && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white font-['Chakra_Petch']">{t.calculators.calc6.name}</h2>
            <p className="text-xs text-neutral-400 mt-1">{t.calculators.calc6.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">{t.calculators.calc6.sheetLength}</label>
                <input
                  type="number"
                  value={c6LenMm}
                  onChange={(e) => setC6LenMm(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">{t.calculators.calc6.sheetWidth}</label>
                <input
                  type="number"
                  value={c6WidMm}
                  onChange={(e) => setC6WidMm(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">{t.calculators.calc6.sheetThickness}</label>
                <input
                  type="number"
                  value={c6ThickMm}
                  onChange={(e) => setC6ThickMm(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">{t.calculators.calc6.sheetCount}</label>
                <input
                  type="number"
                  value={c6Count}
                  onChange={(e) => setC6Count(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div>
                <span className="text-xs text-neutral-400">{t.calculators.calc6.totalArea}:</span>
                <div className="text-2xl font-bold text-white font-mono">{c6TotalAreaM2} m²</div>
              </div>
              <div>
                <span className="text-xs text-neutral-400">{t.calculators.calc6.totalWeight}:</span>
                <div className="text-3xl font-black text-amber-400 font-mono">{c6TotalWeightKg} kg</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 7: MATERIAL PROCUREMENT COST */}
      {activeCalc === 7 && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white font-['Chakra_Petch']">{t.calculators.calc7.name}</h2>
            <p className="text-xs text-neutral-400 mt-1">{t.calculators.calc7.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">{t.calculators.calc7.weightKg}</label>
                <input
                  type="number"
                  value={c7WeightKg}
                  onChange={(e) => setC7WeightKg(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">{t.calculators.calc7.pricePerKg}</label>
                <input
                  type="number"
                  value={c7PricePerKg}
                  onChange={(e) => setC7PricePerKg(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-center">
              <span className="text-xs text-neutral-400">{t.calculators.calc7.totalCost}:</span>
              <div className="text-3xl font-black text-amber-400 font-mono mt-1">
                {c7TotalCost.toLocaleString()} so'm
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 8: WORKING TIME & DUTY CYCLE */}
      {activeCalc === 8 && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white font-['Chakra_Petch']">{t.calculators.calc8.name}</h2>
            <p className="text-xs text-neutral-400 mt-1">{t.calculators.calc8.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">
                  {t.calculators.calc8.cyclePercent}: <strong className="text-amber-400">{c8DutyCycle}%</strong>
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={c8DutyCycle}
                  onChange={(e) => setC8DutyCycle(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-400 block mb-1">
                  {t.calculators.calc8.targetArcTime}
                </label>
                <input
                  type="number"
                  value={c8PlannedMinutes}
                  onChange={(e) => setC8PlannedMinutes(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div>
                <span className="text-xs text-neutral-400">{t.calculators.calc8.coolingNeeded}:</span>
                <div className="text-3xl font-black text-sky-400 font-mono">{c8CoolingNeededMinutes} daqiqa</div>
              </div>
              <div>
                <span className="text-xs text-neutral-400">{t.calculators.calc8.totalWorkingPeriod}:</span>
                <div className="text-xl font-bold text-white font-mono">{c8TotalPeriodMinutes} daqiqa</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 9: PROJECT COST & ESTIMATOR ("LOYIHA HISOBLAGICH") */}
      {activeCalc === 9 && (
        <div className="rounded-2xl border-2 border-amber-500/50 bg-neutral-900/90 p-6 sm:p-8 space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">
                ASOSIY BIZNES KALKULYATOR
              </span>
              <h2 className="text-2xl font-black text-white font-['Chakra_Petch'] mt-1">
                {t.calculators.calc9.name}
              </h2>
              <p className="text-xs text-neutral-400 mt-1">{t.calculators.calc9.desc}</p>
            </div>

            <button
              onClick={handleSaveProject}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{t.calculators.calc9.saveProjectBtn}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input expense rows */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-400 block mb-1">
                  {t.calculators.calc9.projectTitle}
                </label>
                <input
                  type="text"
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1">{t.calculators.calc9.materialCost}</label>
                  <input
                    type="number"
                    value={pMaterial}
                    onChange={(e) => setPMaterial(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">{t.calculators.calc9.electrodesCost}</label>
                  <input
                    type="number"
                    value={pElectrodes}
                    onChange={(e) => setPElectrodes(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">{t.calculators.calc9.electricityCost}</label>
                  <input
                    type="number"
                    value={pElectricity}
                    onChange={(e) => setPElectricity(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">{t.calculators.calc9.gasCost}</label>
                  <input
                    type="number"
                    value={pGas}
                    onChange={(e) => setPGas(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">{t.calculators.calc9.toolWearCost}</label>
                  <input
                    type="number"
                    value={pToolWear}
                    onChange={(e) => setPToolWear(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">{t.calculators.calc9.laborCost}</label>
                  <input
                    type="number"
                    value={pLabor}
                    onChange={(e) => setPLabor(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">{t.calculators.calc9.transportCost}</label>
                  <input
                    type="number"
                    value={pTransport}
                    onChange={(e) => setPTransport(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">{t.calculators.calc9.otherCost}</label>
                  <input
                    type="number"
                    value={pOther}
                    onChange={(e) => setPOther(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-neutral-800">
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">{t.calculators.calc9.profitMargin}</label>
                  <input
                    type="number"
                    value={pMarginPercent}
                    onChange={(e) => setPMarginPercent(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-amber-400 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">{t.calculators.calc9.unitCount}</label>
                  <input
                    type="number"
                    value={pUnits}
                    onChange={(e) => setPUnits(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Mehnat vaqti (soat)</label>
                  <input
                    type="number"
                    value={pHours}
                    onChange={(e) => setPHours(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Calculations Result Summary */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-neutral-400">{t.calculators.calc9.totalCost}:</span>
                  <div className="text-2xl font-black text-white font-mono">
                    {pTotalCost.toLocaleString()} so'm
                  </div>
                </div>

                <div>
                  <span className="text-xs text-neutral-400">{t.calculators.calc9.estimatedProfit} ({pMarginPercent}%):</span>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    +{pProfitAmount.toLocaleString()} so'm
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider font-bold">
                    {t.calculators.calc9.suggestedPrice}:
                  </span>
                  <div className="text-3xl font-black text-amber-400 font-mono">
                    {pSellingPrice.toLocaleString()} so'm
                  </div>
                  {pUnits > 1 && (
                    <span className="text-xs text-neutral-400 mt-1 block">
                      1 dona narxi: <strong className="text-white">{(pSellingPrice / pUnits).toLocaleString()} so'm</strong>
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
                Loyiha muddati: <strong className="text-white font-mono">~{pHours} soat</strong>. Saqlash tugmasini bossangiz, loyiha shaxsiy profilingizga saqlanadi.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
