import { clsx } from 'clsx';

export function SectionHeader({ title, description, action, className }) {
  return (
    <div className={clsx("flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", className)}>
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        {description && <p className="text-slate-500 mt-1">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
