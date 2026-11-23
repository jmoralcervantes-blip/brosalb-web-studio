import { useEffect, useState, type FormEvent } from 'react';
import { MapPin, Search } from 'lucide-react';
import living from '@/assets/renovation-after.jpg';
import building from '@/assets/brosalb-building.jpg';
import { prefillContact, requestValuation } from '@/lib/prefill-contact';

// Tiempo de cada diapositiva cuando avanzan solas.
const SLIDE_MS = 7000;
const HOME = import.meta.env.BASE_URL;

// Fotos de portada: si subes public/hero-reformas.jpg o public/hero-ia.jpg se usan solas.
// Mientras no existan, se muestra la imagen de respaldo (fallback) o, si no hay, el fondo marrón.
const slides: { tab: string; caption: string; image: string; fallback: string | null }[] = [
  { tab: 'Compra y alquiler', caption: 'Te compramos tu vivienda o la gestionamos por ti', image: living, fallback: null },
  { tab: 'Reformas', caption: 'Integrales y parciales, con un solo interlocutor', image: `${HOME}hero-reformas.jpg`, fallback: building },
  { tab: 'IA, redes y webs', caption: 'Agentes de IA, contenido y webs para tu negocio', image: `${HOME}hero-ia.jpg`, fallback: null },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const [typed, setTyped] = useState(false);
  const reduced = useReducedMotion();
  // Se detiene mientras el visitante escribe o navega con el teclado dentro de la portada.
  const running = !reduced && !focused && !typed;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('direccion') as HTMLInputElement | null;
    requestValuation(input?.value ?? '');
  }

  const slideProps = (i: number) => ({
    className: `hero-slide${i === active ? ' is-active' : ''}`,
    'aria-hidden': i !== active,
    inert: i !== active,
  });

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-frame">
        {slides.map((s, i) => (
          <img
            key={s.tab}
            className={`hero-bg${i === active ? ' is-active' : ''}`}
            src={s.image}
            alt=""
            width={1536}
            height={1024}
            fetchPriority={i === 0 ? 'high' : 'low'}
            onError={e => {
              const img = e.currentTarget;
              if (s.fallback && img.src !== new URL(s.fallback, window.location.href).href) img.src = s.fallback;
              else img.style.display = 'none';
            }}
          />
        ))}
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-slides" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
          <div {...slideProps(0)}>
            <h1 id="hero-title" className="hero-title">Tu casa. Tus opciones.</h1>
            <p className="hero-text">
              Escribe la dirección y te decimos cuánto vale tu vivienda.{' '}
              <br />
              Te la compramos, la reformamos o la alquilamos por ti.
            </p>
            <form id="hero-search" className="address-field" onSubmit={submit} role="search">
              <MapPin className="address-pin" size={20} aria-hidden="true" />
              <input name="direccion" placeholder="Escribe la dirección de tu vivienda" aria-label="Dirección de tu vivienda" autoComplete="street-address" onChange={e => setTyped(e.target.value.length > 0)} />
              <button className="btn-square" type="submit" aria-label="Pedir valoración"><Search size={20} /></button>
            </form>
            <p className="hero-micro">Gratis y sin compromiso <span aria-hidden="true">│</span> Tus datos solo se usan para responderte</p>
          </div>
          <div {...slideProps(1)}>
            <p className="hero-title">Reformas que suman valor.</p>
            <p className="hero-text">
              Reformamos viviendas, locales y edificios.{' '}
              <br />
              Un único interlocutor de principio a fin.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => prefillContact('Reforma', 'Me gustaría pedir presupuesto para una reforma.')}>Pide presupuesto</button>
              <a className="btn btn-secondary" href={`${HOME}#inmobiliaria`}>Ver antes y después</a>
            </div>
          </div>
          <div {...slideProps(2)}>
            <p className="hero-title">IA, redes y webs para tu negocio.</p>
            <p className="hero-text">
              Agentes de IA que atienden a tus clientes,{' '}
              <br />
              contenido para redes y webs y tiendas online que venden.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={`${HOME}#digital`}>Ver servicios digitales</a>
              <a className="btn btn-secondary" href={`${HOME}#proyectos`}>Ver proyectos</a>
            </div>
          </div>
        </div>
        <div className="hero-tabs" role="tablist" aria-label="Qué hacemos">
          {slides.map((s, i) => (
            <button key={s.tab} type="button" role="tab" aria-selected={i === active} className="hero-tab" onClick={() => setActive(i)}>
              <strong>{s.tab}</strong>
              <span>{s.caption}</span>
              <i className="hero-tab-bar" aria-hidden="true">
                {i === active && (
                  <b key={active} className={running ? '' : 'is-paused'} style={{ animationDuration: `${SLIDE_MS}ms` }} onAnimationEnd={() => setActive(a => (a + 1) % slides.length)} />
                )}
              </i>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
