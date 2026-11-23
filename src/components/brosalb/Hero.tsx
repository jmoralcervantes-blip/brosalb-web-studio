import type { FormEvent } from 'react';
import { MapPin, Search } from 'lucide-react';
import living from '@/assets/renovation-after.jpg';
import { requestValuation } from '@/lib/prefill-contact';

// Datos reales de Brosalb (no cifras inventadas). Cámbialos aquí.
const stats = [
  { value: 'Compra y alquiler', label: 'Te compramos tu vivienda o la gestionamos por ti' },
  { value: 'Reformas', label: 'Integrales y parciales, con un solo interlocutor' },
  { value: '< 24 h', label: 'Para responder a tu consulta' },
];

export function Hero() {
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('direccion') as HTMLInputElement | null;
    requestValuation(input?.value ?? '');
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-frame">
        <img src={living} alt="" width={1536} height={1024} fetchPriority="high" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-copy">
          <h1 id="hero-title">Tu casa. Tus opciones.</h1>
          <p>
            Escribe la dirección y te decimos cuánto vale tu vivienda.
            <br />
            Te la compramos, la reformamos o la alquilamos por ti.
          </p>
          <form id="hero-search" className="address-field" onSubmit={submit} role="search">
            <MapPin className="address-pin" size={20} aria-hidden="true" />
            <input name="direccion" placeholder="Escribe la dirección de tu vivienda" aria-label="Dirección de tu vivienda" autoComplete="street-address" />
            <button className="btn-square" type="submit" aria-label="Pedir valoración"><Search size={20} /></button>
          </form>
          <p className="hero-micro">Gratis y sin compromiso <span aria-hidden="true">│</span> Tus datos solo se usan para responderte</p>
        </div>
        <dl className="hero-stats">
          {stats.map(s => (
            <div key={s.value}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
