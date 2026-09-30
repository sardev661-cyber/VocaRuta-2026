import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { JourneyProvider } from '../context/JourneyContext';

export default function App() {
  return (
    <JourneyProvider>
      <RouterProvider router={router} />
    </JourneyProvider>
  );
}