import { Bot, Megaphone, Monitor, ArrowRight } from 'lucide-react';
import { prefillContact } from '@/lib/prefill-contact';

const groups = [
  {
    icon: Bot,
    title: 'Inteligencia artificial',
    text: 'Agentes que atienden a tus clientes a cualquier hora y automatizaciones que se encargan del trabajo repetitivo de tu equipo.',
    tags: ['Agentes de atención', 'Automatizaciones', 'Asistentes internos'],
    servicio: 'IA y automatización',
  },
  {
    icon: Megaphone,
    title: 'Redes sociales y publicidad',
    text: 'Estrategia, contenido y gestión de tus perfiles, y campañas en redes y buscadores pensadas para conseguir contactos reales.',
    tags: ['Reels y contenido', 'Gestión de perfiles', 'Campañas'],
    servicio: 'Redes sociales y publicidad',
  },
  {
    icon: Monitor,
    title: 'Webs y tiendas online',
    text: 'Landing pages, webs corporativas, tiendas online y aplicaciones a medida, rápidas y fáciles de usar.',
    tags: ['Landing pages', 'Webs corporativas', 'Tiendas online', 'Aplicaciones'],
    servicio: 'Web o aplicación',
  },
];

export function Digital() {
  return (
    <section id="digital" className="band">
      <div className="section container">
        <div className="section-head">
          <div>
            <p className="kicker">Digital</p>
            <h2 className="h2">IA, redes y webs <span>para que tu negocio crezca</span></h2>
          </div>
          <p>Ayudamos a empresas, profesionales e instituciones a comunicar mejor y a trabajar con menos esfuerzo.</p>
        </div>
        <div className="digital-grid">
          {groups.map(({ icon: Icon, title, text, tags, servicio }) => (
            <article className="digital-card" key={title}>
              <span className="tile"><Icon size={22} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul className="tags">{tags.map(t => <li key={t}>{t}</li>)}</ul>
              <button type="button" className="text-link" onClick={() => prefillContact(servicio, `Me interesa: ${title.toLowerCase()}.`)}>
                Pide una propuesta <ArrowRight size={16} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
