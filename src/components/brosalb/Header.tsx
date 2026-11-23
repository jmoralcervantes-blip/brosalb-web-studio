import { useEffect, useState, type FormEvent } from 'react';
import { Menu, X, ArrowRight, MapPin, Search } from 'lucide-react';
import { requestValuation } from '@/lib/prefill-contact';

// Raíz de la web ('/' en Lovable y con dominio propio; subcarpeta en la dirección provisional de GitHub Pages).
const HOME = import.meta.env.BASE_URL;
const links = [
  { label: 'Vender', id: 'vender' },
  { label: 'Inmobiliaria y reformas', id: 'inmobiliaria' },
  { label: 'Digital', id: 'digital' },
  { label: 'Proyectos', id: 'proyectos' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [promo, setPromo] = useState(true);
  const [compact, setCompact] = useState(false);

  // Cuando el buscador de la portada sale de la pantalla, aparece uno compacto en la cabecera.
  useEffect(() => {
    const target = document.getElementById('hero-search');
    if (!target || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCompact(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { rootMargin: '-72px 0px 0px 0px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    requestValuation(String(new FormData(e.currentTarget).get('direccion') ?? ''));
    e.currentTarget.reset();
  }

  return (
    <>
      {promo && (
        <div className="promo-bar" role="region" aria-label="Aviso">
          <p>¿Quieres vender tu vivienda? Te hacemos una valoración gratuita y sin compromiso.</p>
          <a className="promo-go" href={`${HOME}#vender`} aria-label="Ver cómo funciona">
            <ArrowRight size={14} strokeWidth={2.4} />
          </a>
          <button type="button" className="promo-close" aria-label="Cerrar aviso" onClick={() => setPromo(false)}>
            <X size={16} />
          </button>
        </div>
      )}
      <header className={`site-header${compact ? ' is-compact' : ''}`}>
        <div className="container header-inner">
          <a className="wordmark" href={HOME}>Brosalb</a>
          <form className={`header-search${compact ? ' is-visible' : ''}`} onSubmit={submit} role="search" inert={!compact} style={{ minWidth: 0 }}>
            <MapPin size={16} aria-hidden="true" />
            <input name="direccion" placeholder="Dirección de tu vivienda" aria-label="Dirección de tu vivienda" autoComplete="street-address" />
            <button type="submit" aria-label="Pedir valoración"><Search size={16} /></button>
          </form>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {links.map(l => <a key={l.id} href={`${HOME}#${l.id}`}>{l.label}</a>)}
          </nav>
          <a className="btn btn-secondary header-cta" href={`${HOME}#contacto`}>Contacto</a>
          <button type="button" className="mobile-toggle" style={{ flexShrink: 0 }} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <nav className="mobile-nav" aria-label="Navegación móvil">
            {[...links, { label: 'Contacto', id: 'contacto' }].map(l => (
              <a key={l.id} href={`${HOME}#${l.id}`} onClick={() => setOpen(false)}>{l.label}<ArrowRight size={18} /></a>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
