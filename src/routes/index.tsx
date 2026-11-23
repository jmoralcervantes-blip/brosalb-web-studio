import { createFileRoute } from "@tanstack/react-router";
import { Header } from '@/components/brosalb/Header';
import { Hero } from '@/components/brosalb/Hero';
import { Inmobiliaria } from '@/components/brosalb/Inmobiliaria';
import { Vender } from '@/components/brosalb/Vender';
import { Digital } from '@/components/brosalb/Digital';
import { Proyectos } from '@/components/brosalb/Proyectos';
import { Contacto } from '@/components/brosalb/Contacto';
import { Footer } from '@/components/brosalb/Footer';

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brosalb | Inmobiliaria, reformas y servicios digitales" },
      { name: "description", content: "Te compramos tu vivienda, la reformamos o la alquilamos por ti. Y además: inteligencia artificial, redes sociales y webs para tu negocio." },
      { property: "og:title", content: "Brosalb | Inmobiliaria, reformas y servicios digitales" },
      { property: "og:description", content: "Tu casa. Tus opciones. Valoración gratuita, compra, reforma y alquiler de viviendas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <><Header /><main><Hero /><Vender /><Inmobiliaria /><Digital /><Proyectos /><Contacto /></main><Footer /></>
  );
}
