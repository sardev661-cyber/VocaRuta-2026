import { clsx } from 'clsx';

export function EmptyState({ icon, title, description, action, className }) {
  return (
    <div className={clsx("flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-xl border border-slate-200 border-dashed", className)}>
      {icon && <div className="mb-4 text-slate-400 shrink-0">{icon}</div>}
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
