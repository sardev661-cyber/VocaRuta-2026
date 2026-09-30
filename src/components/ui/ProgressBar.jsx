import { clsx } from 'clsx';

export function ProgressBar({ value, max = 100, className }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className={clsx("w-full h-2 bg-slate-100 rounded-full overflow-hidden", className)}>
      <div 
        className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
