import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-200 animate-in slide-in-from-bottom-3 ${
              isSuccess 
                ? 'bg-neutral-900/95 border-emerald-500/40 text-emerald-300'
                : isWarning
                ? 'bg-neutral-900/95 border-amber-500/40 text-amber-300'
                : 'bg-neutral-900/95 border-neutral-700 text-neutral-200'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {isWarning && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
            {!isSuccess && !isWarning && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
            <span className="text-xs sm:text-sm font-medium leading-snug">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
