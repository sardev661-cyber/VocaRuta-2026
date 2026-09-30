import { clsx } from 'clsx';
import { Check } from 'lucide-react';

export function Stepper({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-between w-full relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200 -z-10" />
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        
        return (
          <div key={index} className="flex flex-col items-center bg-slate-50 px-2">
            <div className={clsx(
              "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
              isCompleted ? "bg-primary-500 border-primary-500 text-white" :
              isCurrent ? "bg-white border-primary-500 text-primary-600" :
              "bg-white border-slate-300 text-slate-400"
            )}>
              {isCompleted ? <Check className="h-4 w-4" /> : <span className="text-xs font-semibold">{index + 1}</span>}
            </div>
            <span className={clsx(
              "mt-2 text-xs font-medium",
              (isCompleted || isCurrent) ? "text-slate-900" : "text-slate-500"
            )}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
