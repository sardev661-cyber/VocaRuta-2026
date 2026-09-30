import { clsx } from 'clsx';

export function Table({ children, className }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200">
      <table className={clsx("w-full text-left text-sm text-slate-600", className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }) {
  return <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">{children}</thead>;
}

export function TableRow({ children, className }) {
  return <tr className={clsx("border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors", className)}>{children}</tr>;
}

export function TableHead({ children, className }) {
  return <th className={clsx("px-4 py-3 font-medium", className)}>{children}</th>;
}

export function TableCell({ children, className }) {
  return <td className={clsx("px-4 py-3", className)}>{children}</td>;
}
