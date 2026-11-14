import { KeyRound, House, Hammer, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import after from '@/assets/renovation-after.jpg';
import building from '@/assets/brosalb-building.jpg';
import before from '@/assets/renovation-before.jpg';
const items = [
 { title: 'Alquiler', icon: KeyRound, image: after, text: 'Alquilamos inmuebles propios y gestionamos los de propietarios que quieren olvidarse del día a día: búsqueda de inquilinos, contratos, incidencias y seguimiento.' },
 { title: 'Compraventa', icon: House, image: building, text: 'Compramos y vendemos inmuebles. Si quieres vender, te hacemos una valoración realista y sin compromiso.' },
 { title: 'Reformas', icon: Hammer, image: before, text: 'Reformas integrales y parciales de viviendas, locales y edificios. Un único interlocutor de principio a fin.' },
];
export function Inmobiliaria() { return <section id="inmobiliaria" className="section container"><div className="section-heading"><div><p className="eyebrow">01 / INMOBILIARIA</p><h2>Inmobiliaria</h2></div><p>Gestionamos inmuebles propios y de terceros con un objetivo: que rindan más y den menos preocupaciones.</p></div><div className="property-grid">{items.map(({ title, icon: Icon, image, text }) => <article className="property-card" key={title}><div className="property-image"><img src={image} alt={`${title} — imagen de ejemplo`} loading="lazy" width={1536} height={1024}/><span>Imagen de ejemplo</span></div><div className="property-title"><Icon size={23}/><h3>{title}</h3></div><p>{text}</p></article>)}</div><Button asChild variant="outline" className="section-cta"><a href="#contacto">Cuéntanos qué necesitas <ArrowUpRight/></a></Button></section>; }
