import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');

const dirs = [
  'app',
  'layouts',
  'components/ui',
  'features/landing',
  'features/auth',
  'features/dashboard',
  'features/assessment',
  'features/explore',
  'features/simulations',
  'features/compare',
  'features/report',
  'features/pricing',
  'features/school-panel',
  'data',
  'services',
  'context',
  'hooks',
  'utils',
  'constants'
];

dirs.forEach(d => {
  const p = path.join(srcDir, d);
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
});

const files = {
  'app/routes.js': `export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/registro',
  PRICING: '/planes',
  SCHOOL: '/colegio',
  DASHBOARD: '/app',
  ASSESSMENT: '/app/conocete',
  EXPLORE: '/app/explora',
  SIMULATIONS: '/app/prueba',
  SIMULATION_DETAIL: '/app/prueba/:id',
  COMPARE: '/app/compara',
  REPORT: '/app/decide',
};`,
  'app/router.jsx': `import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import PublicLayout from '../layouts/PublicLayout';
import StudentLayout from '../layouts/StudentLayout';
import SchoolLayout from '../layouts/SchoolLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <div>Landing Page Placeholder</div> },
      { path: ROUTES.LOGIN, element: <div>Login Placeholder</div> },
      { path: ROUTES.REGISTER, element: <div>Register Placeholder</div> },
      { path: ROUTES.PRICING, element: <div>Pricing Placeholder</div> },
    ],
  },
  {
    path: '/app',
    element: <StudentLayout />,
    children: [
      { index: true, element: <div>Dashboard Placeholder</div> },
      { path: ROUTES.ASSESSMENT, element: <div>Assessment Placeholder</div> },
      { path: ROUTES.EXPLORE, element: <div>Explore Placeholder</div> },
      { path: ROUTES.SIMULATIONS, element: <div>Simulations Placeholder</div> },
      { path: ROUTES.COMPARE, element: <div>Compare Placeholder</div> },
      { path: ROUTES.REPORT, element: <div>Report Placeholder</div> },
    ],
  },
  {
    path: ROUTES.SCHOOL,
    element: <SchoolLayout />,
    children: [
      { index: true, element: <div>School Panel Placeholder</div> },
    ],
  }
]);`,
  'app/App.jsx': `import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export default function App() {
  return <RouterProvider router={router} />;
}`,
  'layouts/PublicLayout.jsx': `import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white p-4">Public Navbar</header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white p-4 text-center text-sm text-slate-500">Footer</footer>
    </div>
  );
}`,
  'layouts/StudentLayout.jsx': `import { Outlet } from 'react-router-dom';

export default function StudentLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white p-4">Student Navbar & Stepper</header>
      <main className="flex-grow p-4 md:p-8 max-w-5xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}`,
  'layouts/SchoolLayout.jsx': `import { Outlet } from 'react-router-dom';

export default function SchoolLayout() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 border-r border-slate-200 bg-white p-4">School Sidebar</aside>
      <main className="flex-grow p-8">
        <Outlet />
      </main>
    </div>
  );
}`,
  'components/ui/Button.jsx': `import { clsx } from 'clsx';

export function Button({ children, variant = 'primary', className, ...props }) {
  const base = "inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-h-[44px]";
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline: "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700"
  };
  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}`,
  'components/ui/Card.jsx': `import { clsx } from 'clsx';

export function Card({ children, className, ...props }) {
  return (
    <div className={clsx("bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}`,
  'components/ui/Badge.jsx': `import { clsx } from 'clsx';

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
}`
};

Object.entries(files).forEach(([file, content]) => {
  fs.writeFileSync(path.join(srcDir, file), content);
});

// Update main.jsx
const mainJsxPath = path.join(srcDir, 'main.jsx');
const mainJsxContent = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`;
fs.writeFileSync(mainJsxPath, mainJsxContent);

console.log('Setup complete.');
