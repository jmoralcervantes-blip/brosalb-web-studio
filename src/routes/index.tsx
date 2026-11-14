import { createFileRoute } from "@tanstack/react-router";
import { Header } from '@/components/brosalb/Header';
import { Hero } from '@/components/brosalb/Hero';
import { Inmobiliaria } from '@/components/brosalb/Inmobiliaria';
import { Puente } from '@/components/brosalb/Puente';
import { Digital } from '@/components/brosalb/Digital';
import { Proyectos } from '@/components/brosalb/Proyectos';
import { Contacto } from '@/components/brosalb/Contacto';
import { Footer } from '@/components/brosalb/Footer';

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brosalb | Inmobiliaria, reformas y servicios digitales" },
      { name: "description", content: "En Brosalb unimos alquiler, compraventa y reformas con redes sociales, publicidad, webs e inteligencia artificial para hacer crecer espacios y marcas." },
      { property: "og:title", content: "Brosalb | Inmobiliaria, reformas y servicios digitales" },
      { property: "og:description", content: "Hacemos crecer espacios y marcas. Inmuebles, reformas y estrategia digital para que cada proyecto valga más." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <><Header /><main><Hero /><Inmobiliaria /><Puente /><Digital /><Proyectos /><Contacto /></main><Footer /></>
  );
}
