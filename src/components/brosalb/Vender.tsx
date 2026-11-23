import { useEffect, useRef, useState } from 'react';
import { MapPin, CalendarCheck, FileText, PenLine, LoaderCircle, Check, type LucideIcon } from 'lucide-react';
import building from '@/assets/brosalb-building.jpg';
import before from '@/assets/renovation-before.jpg';
import after from '@/assets/renovation-after.jpg';
import { requestValuation } from '@/lib/prefill-contact';

// Duración de cada paso cuando avanzan solos.
const STEP_MS = 6500;

type Step = { icon: LucideIcon; title: string; text: string; image: string; label: string; value: string; status: string[] };

const steps: Step[] = [
  {
    icon: MapPin,
    title: 'Pide tu valoración',
    text: 'Escribe la dirección y unos datos básicos de la vivienda. Es gratis y sin compromiso.',
    image: building,
    label: 'Dirección de tu vivienda',
    value: 'Calle de Alcalá, 123',
    status: ['Localizando la dirección', 'Revisando viviendas similares de la zona', 'Consultando precios del mercado', 'Preparando tu valoración'],
  },
  {
    icon: CalendarCheck,
    title: 'Visitamos la vivienda',
    text: 'Vamos a verla contigo, el día que mejor te venga, para conocer su estado real y su potencial.',
    image: before,
    label: 'Visita',
    value: 'El día y la hora que elijas',
    status: ['Revisamos el estado de la vivienda', 'Tomamos fotos y medidas', 'Vemos si conviene reformar'],
  },
  {
    icon: FileText,
    title: 'Recibe tu propuesta',
    text: 'Te ofrecemos comprarla, reformarla para que valga más o alquilarla y gestionarla por ti. Tú eliges.',
    image: after,
    label: 'Tu propuesta',
    value: 'Compra · Reforma · Alquiler',
    status: ['Oferta de compra', 'Presupuesto de reforma', 'Plan de alquiler y gestión'],
  },
  {
    icon: PenLine,
    title: 'Firma cuando te venga bien',
    text: 'Si aceptas nuestra oferta, firmamos ante notario en la fecha que elijas.',
    image: building,
    label: 'Firma',
    value: 'Ante notario, en tu fecha',
    status: ['Revisamos la documentación', 'Fijamos la fecha de firma', 'Firmas y te mudas cuando quieras'],
  },
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

// Pequeña demostración sobre la foto: escribe el texto y va mostrando los estados.
function Demo({ step, animate }: { step: Step; animate: boolean }) {
  const total = step.status.length;
  const [chars, setChars] = useState(animate ? 0 : step.value.length);
  const [phase, setPhase] = useState(animate ? 0 : total);
  const typed = chars >= step.value.length;

  useEffect(() => {
    if (!animate || typed) return;
    const t = window.setTimeout(() => setChars(c => c + 1), 45);
    return () => window.clearTimeout(t);
  }, [animate, chars, typed]);

  useEffect(() => {
    if (!animate || !typed || phase >= total) return;
    const t = window.setTimeout(() => setPhase(p => p + 1), 1150);
    return () => window.clearTimeout(t);
  }, [animate, typed, phase, total]);

  const done = phase >= total;
  return (
    <div className="sell-demo" aria-hidden="true">
      <span className="sell-demo-label">{step.label}</span>
      <span className="sell-demo-value">{step.value.slice(0, chars)}{!typed && <i className="caret" />}</span>
      {typed && (
        <span className="sell-demo-status">
          {done ? <Check className="ok" size={16} strokeWidth={2.5} /> : <LoaderCircle className="spin" size={16} />}
          {step.status[Math.min(phase, total - 1)]}
        </span>
      )}
    </div>
  );
}

export function Vender() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const running = visible && !reduced && !hovering;
  const next = () => setActive(a => (a + 1) % steps.length);

  return (
    <section id="vender" ref={ref} className="section container sell">
      <div className="sell-grid">
        <div className="sell-media">
          {steps.map((s, i) => (
            <img key={s.title} src={s.image} alt="" className={i === active ? 'is-active' : ''} width={1536} height={1024} loading="lazy" />
          ))}
          <Demo key={`${active}-${visible}`} step={steps[active]} animate={visible && !reduced} />
        </div>
        <div className="sell-copy">
          <p className="kicker">Vender con Brosalb</p>
          <h2 className="h2">Vende tu casa <span>sin complicaciones</span></h2>
          <ol className="steps" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            {steps.map((s, i) => {
              const Icon = s.icon;
              const open = i === active;
              return (
                <li key={s.title}>
                  <button type="button" className="step-btn" aria-expanded={open} aria-controls={`paso-${i}`} onClick={() => setActive(i)}>
                    <span className="step-icon"><Icon size={17} /></span>
                    {s.title}
                  </button>
                  {open && (
                    <div className="step-panel" id={`paso-${i}`}>
                      <p>{s.text}</p>
                      <div className={`step-progress${running ? '' : ' is-paused'}`} aria-hidden="true">
                        <span key={active} style={{ animationDuration: `${STEP_MS}ms` }} onAnimationEnd={next} />
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          <button type="button" className="btn btn-primary sell-cta" onClick={() => requestValuation('')}>Pide tu valoración gratuita</button>
        </div>
      </div>
    </section>
  );
}
