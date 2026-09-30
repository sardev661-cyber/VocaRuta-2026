import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = forwardRef(({ className, label, error, children, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
      <div className="relative">
        <select
          ref={ref}
          className={clsx(
            "flex h-[44px] w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-shadow",
            error && "border-error-500 focus:ring-error-500",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
    </div>
  );
});
Select.displayName = 'Select';
