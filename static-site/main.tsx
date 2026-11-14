// Punto de entrada de la versión estática (GitHub Pages). Mismas secciones que src/routes/index.tsx.
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Outlet, RouterProvider, createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import '@/styles.css';
import { Header } from '@/components/brosalb/Header';
import { Hero } from '@/components/brosalb/Hero';
import { Inmobiliaria } from '@/components/brosalb/Inmobiliaria';
import { Puente } from '@/components/brosalb/Puente';
import { Digital } from '@/components/brosalb/Digital';
import { Proyectos } from '@/components/brosalb/Proyectos';
import { Contacto } from '@/components/brosalb/Contacto';
import { Footer } from '@/components/brosalb/Footer';
import { LegalPage } from '@/components/brosalb/LegalPage';

const HOME_TITLE = 'Brosalb | Inmobiliaria, reformas y servicios digitales';

function useTitle(title: string) {
  useEffect(() => { document.title = title; }, [title]);
}

function Home() {
  useTitle(HOME_TITLE);
  useEffect(() => {
    // Al llegar con un ancla (p. ej. /#contacto desde otra página), baja a esa sección.
    const id = window.location.hash.slice(1);
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);
  return <><Header /><main><Hero /><Inmobiliaria /><Puente /><Digital /><Proyectos /><Contacto /></main><Footer /></>;
}

function AvisoLegal() { useTitle('Aviso legal | Brosalb'); return <LegalPage />; }
function Privacidad() { useTitle('Política de privacidad | Brosalb'); return <LegalPage privacy />; }

const rootRoute = createRootRoute({ component: () => <Outlet />, notFoundComponent: Home });
const routeTree = rootRoute.addChildren([
  createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home }),
  createRoute({ getParentRoute: () => rootRoute, path: '/aviso-legal', component: AvisoLegal }),
  createRoute({ getParentRoute: () => rootRoute, path: '/politica-de-privacidad', component: Privacidad }),
]);
const router = createRouter({ routeTree, basepath: import.meta.env.BASE_URL, scrollRestoration: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
