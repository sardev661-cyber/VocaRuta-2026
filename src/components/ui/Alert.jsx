import { clsx } from 'clsx';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export function Alert({ variant = 'info', title, children, className }) {
  const variants = {
    info: {
      wrapper: "bg-primary-50 border-primary-200",
      icon: <Info className="h-5 w-5 text-primary-500" />,
      title: "text-primary-800",
      content: "text-primary-700"
    },
    success: {
      wrapper: "bg-success-50 border-success-200",
      icon: <CheckCircle2 className="h-5 w-5 text-success-500" />,
      title: "text-success-800",
      content: "text-success-700"
    },
    warning: {
      wrapper: "bg-warning-50 border-warning-200",
      icon: <AlertTriangle className="h-5 w-5 text-warning-600" />,
      title: "text-warning-800",
      content: "text-warning-700"
    },
    error: {
      wrapper: "bg-error-50 border-error-200",
      icon: <AlertCircle className="h-5 w-5 text-error-500" />,
      title: "text-error-800",
      content: "text-error-700"
    }
  };

  const style = variants[variant];

  return (
    <div className={clsx("rounded-lg border p-4 flex items-start gap-3", style.wrapper, className)}>
      <div className="shrink-0 mt-0.5">{style.icon}</div>
      <div>
        {title && <h3 className={clsx("text-sm font-semibold mb-1", style.title)}>{title}</h3>}
        <div className={clsx("text-sm", style.content)}>
          {children}
        </div>
      </div>
    </div>
  );
}
