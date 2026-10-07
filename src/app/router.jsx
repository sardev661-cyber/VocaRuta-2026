import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import PublicLayout from '../layouts/PublicLayout';
import StudentLayout from '../layouts/StudentLayout';
import SchoolLayout from '../layouts/SchoolLayout';

import LandingPage from '../features/landing/LandingPage';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import DashboardPage from '../features/dashboard/DashboardPage';
import AssessmentPage from '../features/assessment/AssessmentPage';
import ExplorePage from '../features/explore/ExplorePage';
import SimulationsPage from '../features/simulations/SimulationsPage';
import SimulationDetailPage from '../features/simulations/SimulationDetailPage';
import ComparePage from '../features/compare/ComparePage';
import ReportPage from '../features/report/ReportPage';
import SchoolPanelPage from '../features/school-panel/SchoolPanelPage';
import AboutPage from '../features/info/AboutPage';
import FamiliesPage from '../features/info/FamiliesPage';
import NotFoundPage from '../features/info/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.FAMILIES, element: <FamiliesPage /> },
    ],
  },
  {
    path: '/app',
    element: <StudentLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: ROUTES.ASSESSMENT, element: <AssessmentPage /> },
      { path: ROUTES.EXPLORE, element: <ExplorePage /> },
      { path: ROUTES.SIMULATIONS, element: <SimulationsPage /> },
      { path: ROUTES.SIMULATION_DETAIL, element: <SimulationDetailPage /> },
      { path: ROUTES.COMPARE, element: <ComparePage /> },
      { path: ROUTES.REPORT, element: <ReportPage /> },
    ],
  },
  {
    path: ROUTES.SCHOOL,
    element: <SchoolLayout />,
    children: [
      { index: true, element: <SchoolPanelPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> }
]);
