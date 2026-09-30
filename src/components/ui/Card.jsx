import { clsx } from 'clsx';

export function Card({ children, className, ...props }) {
  return (
    <div className={clsx("bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}