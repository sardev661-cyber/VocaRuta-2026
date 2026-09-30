import { clsx } from 'clsx';

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-success-50 text-success-700 border border-success-200",
    warning: "bg-warning-50 text-warning-700 border border-warning-200",
    primary: "bg-primary-50 text-primary-700 border border-primary-200"
  };
  return (
    <span className={clsx("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", variants[variant], className)}>
      {children}
    </span>
  );
}