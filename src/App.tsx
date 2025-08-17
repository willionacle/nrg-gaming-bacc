// import './App.css'
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Suspense } from 'react';
import { GameLoading } from './components';
import '@mantine/core/styles.css';
import '@/styles/globals.scss';
function App() {
  return (
    <Suspense fallback={<GameLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
