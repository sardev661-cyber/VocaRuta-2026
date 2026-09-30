import { clsx } from 'clsx';

export function Tabs({ tabs, activeTab, onChange, className }) {
  return (
    <div className={clsx("flex space-x-1 border-b border-slate-200", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-[1px]",
              isActive 
                ? "border-primary-500 text-primary-600" 
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
