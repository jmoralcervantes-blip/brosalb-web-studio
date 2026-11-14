import building from '@/assets/brosalb-building.jpg';
import after from '@/assets/renovation-after.jpg';

// Para cambiar un proyecto, edita esta lista. provisional: true muestra la etiqueta "IMAGEN PROVISIONAL".
const projects = [
 { name: 'ChronoWall', type: 'TIENDA ONLINE', text: 'Tienda online de relojes de pared de diseño con acabados premium.', url: 'https://chronowall.es', image: 'https://chronowall.es/cdn/shop/files/reloj_salon_difuminado.png?v=1781259748&width=1200', provisional: false },
 { name: 'Plenaria', type: 'PLATAFORMA WEB', text: 'Plataforma para gestionar congresos: inscripciones, programa, acreditación con QR, facturación y diplomas.', url: 'https://plenaria.es', image: 'https://plenaria.es/og.png', provisional: false },
 { name: 'Apartamentos Turísticos Albacete', type: 'ALQUILER', text: 'Apartamentos turísticos en el centro de Albacete con reserva directa.', url: 'https://apartamentosturisticosalbacete.com', image: 'https://images.squarespace-cdn.com/content/v1/676d8cb3b5df674bf5981fc1/b096bbae-a7f9-4c02-bd17-8b6cc9e874f5/IMG_1174.jpeg?format=1000w', provisional: false },
 { name: 'Altaya Homes', type: 'REDES SOCIALES', text: 'Contenido y gestión de redes para una empresa de reformas integrales.', url: 'https://altayahomes.es', image: after, provisional: true },
 { name: 'Clínica del Pie Elena Carrascosa', type: 'WEB CORPORATIVA', text: 'Web para una clínica de podología en Albacete.', url: '', image: building, provisional: true },
];

export function Proyectos() {
 return <section id="proyectos" className="projects-band"><div className="section container"><div className="section-heading"><div><p className="eyebrow">DEL POTENCIAL A LA REALIDAD</p><h2>Algunos proyectos</h2></div><p>Espacios que se transforman.<br/>Marcas que encuentran su lugar.</p></div><div className="projects-grid">{projects.map(project => {
   const content = <><div className="project-image"><img src={project.image} alt={project.provisional ? `${project.name} — imagen provisional` : project.name} width={1024} height={1024} loading="lazy"/>{project.provisional && <span>IMAGEN PROVISIONAL</span>}</div><p className="eyebrow">{project.type}</p><h3>{project.name}</h3><p>{project.text}</p></>;
   return project.url
     ? <a className="project-card project-link" key={project.name} href={project.url} target="_blank" rel="noopener noreferrer">{content}</a>
     : <article className="project-card" key={project.name}>{content}</article>;
 })}</div></div></section>;
}
