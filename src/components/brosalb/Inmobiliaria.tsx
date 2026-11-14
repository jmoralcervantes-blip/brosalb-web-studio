import { KeyRound, House, Hammer, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import building from '@/assets/brosalb-building.jpg';
import before from '@/assets/renovation-before.jpg';
const alquilerFoto = 'https://images.squarespace-cdn.com/content/v1/676d8cb3b5df674bf5981fc1/689fc3a2-af3e-4262-aed6-244dd4df3de0/IMG_8515.jpeg?format=1500w';
const items = [
 { title: 'Alquiler', icon: KeyRound, image: alquilerFoto, ejemplo: false, alt: 'Dormitorio de uno de nuestros apartamentos en Albacete', text: 'Alquilamos inmuebles propios y gestionamos los de propietarios que quieren olvidarse del día a día: búsqueda de inquilinos, contratos, incidencias y seguimiento.' },
 { title: 'Compraventa', icon: House, image: building, ejemplo: true, alt: 'Compraventa — imagen de ejemplo', text: 'Compramos y vendemos inmuebles. Si quieres vender, te hacemos una valoración realista y sin compromiso.' },
 { title: 'Reformas', icon: Hammer, image: before, ejemplo: true, alt: 'Reformas — imagen de ejemplo', text: 'Reformas integrales y parciales de viviendas, locales y edificios. Un único interlocutor de principio a fin.' },
];
export function Inmobiliaria() { return <section id="inmobiliaria" className="section container"><div className="section-heading"><div><p className="eyebrow">01 / INMOBILIARIA</p><h2>Inmobiliaria</h2></div><p>Gestionamos inmuebles propios y de terceros con un objetivo: que rindan más y den menos preocupaciones.</p></div><div className="property-grid">{items.map(({ title, icon: Icon, image, ejemplo, alt, text }) => <article className="property-card" key={title}><div className="property-image"><img src={image} alt={alt} loading="lazy" width={1536} height={1024}/>{ejemplo && <span>Imagen de ejemplo</span>}</div><div className="property-title"><Icon size={23}/><h3>{title}</h3></div><p>{text}</p></article>)}</div><Button asChild variant="outline" className="section-cta"><a href="#contacto">Cuéntanos qué necesitas <ArrowUpRight/></a></Button></section>; }
