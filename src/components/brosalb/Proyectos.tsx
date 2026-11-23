import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import building from '@/assets/brosalb-building.jpg';
import after from '@/assets/renovation-after.jpg';

// Para cambiar un proyecto, edita esta lista. provisional: true muestra la etiqueta "Imagen provisional".
const projects = [
  { name: 'ChronoWall', type: 'Tienda online', text: 'Tienda online de relojes de pared de diseño con acabados premium.', url: 'https://chronowall.es', image: 'https://chronowall.es/cdn/shop/files/reloj_salon_difuminado.png?v=1781259748&width=1200', provisional: false },
  { name: 'Plenaria', type: 'Plataforma web', text: 'Plataforma para gestionar congresos: inscripciones, programa, acreditación con QR, facturación y diplomas.', url: 'https://plenaria.es', image: 'https://plenaria.es/og.png', provisional: false },
  { name: 'Apartamentos Turísticos Albacete', type: 'Alquiler', text: 'Apartamentos turísticos en el centro de Albacete con reserva directa.', url: 'https://apartamentosturisticosalbacete.com', image: 'https://images.squarespace-cdn.com/content/v1/676d8cb3b5df674bf5981fc1/b096bbae-a7f9-4c02-bd17-8b6cc9e874f5/IMG_1174.jpeg?format=1000w', provisional: false },
  { name: 'Altaya Homes', type: 'Redes sociales', text: 'Contenido y gestión de redes para una empresa de reformas integrales.', url: 'https://altayahomes.es', image: after, provisional: true },
  { name: 'Clínica del Pie Elena Carrascosa', type: 'Web corporativa', text: 'Web para una clínica de podología en Albacete.', url: '', image: building, provisional: true },
];

export function Proyectos() {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  function move(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.project-card:nth-child(2)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 340) + 20), behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <section id="proyectos" className="section container">
      <div className="section-head">
        <div>
          <p className="kicker">Proyectos</p>
          <h2 className="h2">Trabajos reales <span>que ya están funcionando</span></h2>
        </div>
        <div className="arrows">
          <button type="button" className="arrow-btn" aria-label="Proyectos anteriores" disabled={edges.start} onClick={() => move(-1)}><ArrowLeft size={18} /></button>
          <button type="button" className="arrow-btn" aria-label="Más proyectos" disabled={edges.end} onClick={() => move(1)}><ArrowRight size={18} /></button>
        </div>
      </div>
      <div className="carousel" ref={track}>
        {projects.map(p => {
          const content = (
            <>
              <div className="project-media">
                <img src={p.image} alt={p.provisional ? `${p.name} (imagen provisional)` : p.name} width={1024} height={1024} loading="lazy" />
                <span className="glass">{p.type}</span>
                {p.provisional && <span className="glass glass-bottom">Imagen provisional</span>}
              </div>
              <p className="project-text">{p.text}</p>
              <p className="project-name">{p.name}</p>
              <p className="project-type">{p.url ? <>Ver web <ArrowUpRight size={14} /></> : p.type}</p>
            </>
          );
          return p.url
            ? <a className="project-card" key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">{content}</a>
            : <article className="project-card" key={p.name}>{content}</article>;
        })}
      </div>
    </section>
  );
}
