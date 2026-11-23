import { useState } from 'react';
import { House, KeyRound, Hammer, ChevronsLeftRight } from 'lucide-react';
import before from '@/assets/renovation-before.jpg';
import after from '@/assets/renovation-after.jpg';
import { prefillContact, requestValuation } from '@/lib/prefill-contact';

const services = [
  { icon: House, title: 'Compraventa', text: 'Compramos viviendas para reformarlas y darles una segunda vida. Si quieres vender, te hacemos una valoración realista y sin compromiso.' },
  { icon: KeyRound, title: 'Alquiler y gestión', text: 'Alquilamos inmuebles propios y gestionamos los de propietarios que quieren olvidarse del día a día: inquilinos, contratos e incidencias.' },
  { icon: Hammer, title: 'Reformas', text: 'Reformas integrales y parciales de viviendas, locales y edificios. Un único interlocutor de principio a fin.' },
];

export function Inmobiliaria() {
  const [position, setPosition] = useState(50);
  return (
    <section id="inmobiliaria" className="section container">
      <div className="section-head">
        <div>
          <p className="kicker">Inmobiliaria y reformas</p>
          <h2 className="h2">Compramos, reformamos <span>y ponemos en valor</span></h2>
        </div>
        <p>Nuestra experiencia en inmuebles y en obra nos permite ver el potencial donde otros ven un problema.</p>
      </div>
      <div className="estate-grid">
        <figure className="compare-wrap">
          <div className="compare">
            <img src={after} alt="Después: salón reformado (imagen de ejemplo)" width={1536} height={1024} loading="lazy" />
            <img className="compare-before" src={before} alt="Antes: salón sin reformar (imagen de ejemplo)" width={1536} height={1024} loading="lazy" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} />
            <span className="compare-label is-before">Antes</span>
            <span className="compare-label is-after">Después</span>
            <div className="compare-line" style={{ left: `${position}%` }}><span><ChevronsLeftRight size={20} /></span></div>
            <input type="range" min="0" max="100" value={position} onChange={e => setPosition(Number(e.target.value))} aria-label="Comparar antes y después" />
          </div>
          <figcaption>Comparación ilustrativa · imágenes de ejemplo, no de una obra real</figcaption>
        </figure>
        <div>
          <ul className="services-list">
            {services.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="tile"><Icon size={20} /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={() => requestValuation('')}>Pide tu valoración</button>
            <button type="button" className="btn btn-secondary" onClick={() => prefillContact('Reforma', 'Me gustaría pedir presupuesto para una reforma.')}>Presupuesto de reforma</button>
          </div>
        </div>
      </div>
    </section>
  );
}
