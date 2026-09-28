import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Cpu, 
  Check, 
  RotateCcw, 
  AlertTriangle, 
  Flame, 
  Scissors, 
  Disc, 
  Drill, 
  Ruler, 
  HardHat, 
  Wrench,
  ArrowRight
} from 'lucide-react';

export const ToolSelectorPage: React.FC = () => {
  const { t, language, productsList, setActiveTab } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedWork, setSelectedWork] = useState<string>('welding');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('steel');
  const [selectedIntensity, setSelectedIntensity] = useState<string>('daily');
  const [selectedBudget, setSelectedBudget] = useState<string>('medium');

  // Recommendation engine logic
  const recommendedProducts = productsList.filter(p => {
    // 1. Work type matching
    if (selectedWork === 'welding') {
      if (!['payvandlash-apparatlari', 'elektrodlar', 'payvandlash-niqoblari', 'gaz-payvandlash-uskunalari'].includes(p.categorySlug)) {
        return false;
      }
    } else if (selectedWork === 'cutting') {
      if (!['metall-kesish-uskunalari', 'metall-arralari', 'shlifmashinalar'].includes(p.categorySlug)) {
        return false;
      }
    } else if (selectedWork === 'grinding') {
      if (p.categorySlug !== 'shlifmashinalar') return false;
    } else if (selectedWork === 'drilling') {
      if (!['drellar', 'akkumulyatorli-asboblar'].includes(p.categorySlug)) return false;
    } else if (selectedWork === 'measuring') {
      if (p.categorySlug !== 'olchov-asboblari') return false;
    }

    // 2. Intensity matching
    if (selectedIntensity === 'industrial' && p.grade !== 'professional') {
      return false;
    }

    // 3. Budget matching
    if (selectedBudget === 'low' && p.price > 2000000) {
      return false;
    } else if (selectedBudget === 'high' && p.price < 2000000) {
      return false;
    }

    return true;
  });

  const finalRecommendations = recommendedProducts.length > 0 ? recommendedProducts : productsList.slice(0, 4);

  const resetWizard = () => {
    setStep(1);
    setSelectedWork('welding');
    setSelectedMaterial('steel');
    setSelectedIntensity('daily');
    setSelectedBudget('medium');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Wizard Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold mb-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>AQLLI ASSISTENT</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white font-['Chakra_Petch']">
          {t.smartSelector.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2">
          {t.smartSelector.subtitle}
        </p>

        {/* Step progress pills */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === s 
                  ? 'w-10 bg-amber-500' 
                  : step > s 
                  ? 'w-6 bg-emerald-500' 
                  : 'w-6 bg-neutral-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* QUESTION 1: Work Type */}
      {step === 1 && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 animate-in fade-in">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-6">
            {t.smartSelector.step1}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: 'welding', label: t.smartSelector.workTypes.welding, icon: Flame },
              { id: 'cutting', label: t.smartSelector.workTypes.cutting, icon: Scissors },
              { id: 'grinding', label: t.smartSelector.workTypes.grinding, icon: Disc },
              { id: 'drilling', label: t.smartSelector.workTypes.drilling, icon: Drill },
              { id: 'measuring', label: t.smartSelector.workTypes.measuring, icon: Ruler },
              { id: 'construction', label: t.smartSelector.workTypes.construction, icon: HardHat },
              { id: 'repair', label: t.smartSelector.workTypes.repair, icon: Wrench },
            ].map(item => {
              const Icon = item.icon;
              const isSelected = selectedWork === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedWork(item.id)}
                  className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    isSelected 
                      ? 'border-amber-500 bg-amber-500/10 text-white shadow-md' 
                      : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-neutral-500'}`} />
                  <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2"
            >
              <span>Keyingi savol</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 2: Material */}
      {step === 2 && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 animate-in fade-in">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-6">
            {t.smartSelector.step2}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'steel', label: t.smartSelector.materials.steel },
              { id: 'stainless', label: t.smartSelector.materials.stainless },
              { id: 'aluminum', label: t.smartSelector.materials.aluminum },
              { id: 'castiron', label: t.smartSelector.materials.castiron },
              { id: 'mixed', label: t.smartSelector.materials.mixed },
            ].map(item => {
              const isSelected = selectedMaterial === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedMaterial(item.id)}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected 
                      ? 'border-amber-500 bg-amber-500/10 text-white shadow-md' 
                      : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold"
            >
              Ortga
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2"
            >
              <span>Keyingi savol</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 3: Intensity */}
      {step === 3 && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 animate-in fade-in">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-6">
            {t.smartSelector.step3}
          </h2>

          <div className="space-y-3">
            {[
              { id: 'occasional', label: t.smartSelector.intensity.occasional },
              { id: 'daily', label: t.smartSelector.intensity.daily },
              { id: 'industrial', label: t.smartSelector.intensity.industrial },
            ].map(item => {
              const isSelected = selectedIntensity === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIntensity(item.id)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected 
                      ? 'border-amber-500 bg-amber-500/10 text-white shadow-md' 
                      : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold"
            >
              Ortga
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2"
            >
              <span>Keyingi savol</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 4: Budget */}
      {step === 4 && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 animate-in fade-in">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-6">
            {t.smartSelector.step4}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'low', label: t.smartSelector.budget.low },
              { id: 'medium', label: t.smartSelector.budget.medium },
              { id: 'high', label: t.smartSelector.budget.high },
            ].map(item => {
              const isSelected = selectedBudget === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedBudget(item.id)}
                  className={`p-5 rounded-xl border text-center flex flex-col justify-center items-center gap-2 transition-all ${
                    isSelected 
                      ? 'border-amber-500 bg-amber-500/10 text-white shadow-md' 
                      : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold">{item.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white text-xs font-semibold"
            >
              Ortga
            </button>
            <button
              onClick={() => setStep(5)}
              className="px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>Natijalarni ko'rish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: RESULTS & RECOMMENDATIONS */}
      {step === 5 && (
        <div className="space-y-8 animate-in fade-in">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Assistent Tahlili Yakunlandi
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Chakra_Petch'] mt-1">
                {t.smartSelector.resultsTitle} ({finalRecommendations.length})
              </h2>
            </div>
            <button
              onClick={resetWizard}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-950 text-xs font-semibold text-neutral-300 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.smartSelector.restart}</span>
            </button>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {finalRecommendations.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Assistant Disclaimer (Prompt requirement) */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-3 text-xs text-neutral-400">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>{t.smartSelector.disclaimer}</span>
          </div>
        </div>
      )}
    </div>
  );
};
