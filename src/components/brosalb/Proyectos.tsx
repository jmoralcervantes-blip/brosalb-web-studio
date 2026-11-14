import clock from '@/assets/chronowall.jpg';
import building from '@/assets/brosalb-building.jpg';
import after from '@/assets/renovation-after.jpg';
import before from '@/assets/renovation-before.jpg';
const projects = [
 { name: 'ChronoWall', text: 'Landing para una marca de relojes de pared de lujo.', image: clock, type: 'DISEÑO WEB', provisional: false },
 { name: 'Proyecto 2', text: 'Texto provisional · Ejemplo de reforma de vivienda.', image: after, type: 'REFORMAS', provisional: true },
 { name: 'Proyecto 3', text: 'Texto provisional · Ejemplo de gestión inmobiliaria.', image: building, type: 'INMOBILIARIA', provisional: true },
 { name: 'Proyecto 4', text: 'Texto provisional · Ejemplo de transformación de un espacio.', image: before, type: 'PROYECTO POR DEFINIR', provisional: true },
];
export function Proyectos() { return <section id="proyectos" className="projects-band"><div className="section container"><div className="section-heading"><div><p className="eyebrow">DEL POTENCIAL A LA REALIDAD</p><h2>Algunos proyectos</h2></div><p>Espacios que se transforman.<br/>Marcas que encuentran su lugar.</p></div><div className="projects-grid">{projects.map(project => <article className="project-card" key={project.name}><div className="project-image"><img src={project.image} alt={`${project.name} — imagen ilustrativa`} width={1024} height={1024} loading="lazy"/><span>{project.provisional ? 'PROVISIONAL' : 'IMAGEN ILUSTRATIVA'}</span></div><p className="eyebrow">{project.type}</p><h3>{project.name}</h3><p>{project.text}</p></article>)}</div></div></section>; }
