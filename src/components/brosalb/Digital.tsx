import { MessagesSquare, Megaphone, Monitor, Workflow, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
const items = [
 { title: 'Redes sociales', icon: MessagesSquare, text: 'Estrategia, contenido y gestión de tus perfiles: reels, publicaciones y campañas que conectan con tu público.' },
 { title: 'Publicidad', icon: Megaphone, text: 'Campañas creativas y anuncios en redes y buscadores, pensados para generar contactos reales.' },
 { title: 'Webs y aplicaciones', icon: Monitor, text: 'Landing pages, webs corporativas y herramientas a medida, rápidas y fáciles de usar.' },
 { title: 'IA y automatización', icon: Workflow, text: 'Agentes de inteligencia artificial y automatizaciones que atienden, ordenan y ahorran horas de trabajo a tu equipo.' },
];
export function Digital() { return <section id="digital" className="section container"><div className="section-heading"><div><p className="eyebrow">02 / DIGITAL</p><h2>Digital</h2></div><p>Ayudamos a empresas, profesionales e instituciones a comunicar mejor y a trabajar con menos esfuerzo.</p></div><div className="digital-grid">{items.map(({ title, icon: Icon, text }, i) => <article className="digital-card" key={title}><div className="digital-card-top"><Icon size={29}/><span>0{i+1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div><Button asChild variant="outline" className="section-cta"><a href="#contacto">Pide una propuesta <ArrowUpRight/></a></Button></section>; }
