import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Phone, Mail, MessageCircle, CheckCircle2, MapPin } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { contactSchema, contactEmailSubject, isSpamContact, services } from '@/lib/contact-schema';
import { prefillContact } from '@/lib/prefill-contact';
// Datos de contacto: cámbialos aquí.
const CONTACT = { phoneDisplay: '637 94 61 34', phoneTel: '+34637946134', whatsapp: '34637946134', email: 'brosalgroup@gmail.com', city: 'Madrid' };
// Clave pública de Web3Forms (la misma que plenaria.es). Es segura en el navegador: solo sirve para enviar al email asociado.
const WEB3FORMS_ACCESS_KEY = 'bd91d6ef-0b84-48be-aeee-0c988262a58d';
// Etiqueta visible distinta del valor interno.
const serviceLabels: Partial<Record<string, string>> = { 'Web o aplicación': 'Web, tienda online o aplicación', Compraventa: 'Vender o comprar una vivienda' };

export function Contacto() {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Si se llega desde otra página con ?servicio=…&mensaje=…, rellena el formulario.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const servicio = params.get('servicio');
    const mensaje = params.get('mensaje');
    if (!servicio || !(services as readonly string[]).includes(servicio)) return;
    requestAnimationFrame(() => prefillContact(servicio, mensaje ?? ''));
    window.history.replaceState(null, '', `${window.location.pathname}#contacto`);
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (pending) return;
    const form = e.currentTarget;
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? 'Revisa los campos.'); return; }
    const data = parsed.data;
    if (isSpamContact(data)) { setSuccess(true); form.reset(); return; }
    setPending(true); setError('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: contactEmailSubject(serviceLabels[data.servicio] ?? data.servicio),
          from_name: 'Web Brosalb',
          replyto: data.email,
          Nombre: data.nombre,
          Email: data.email,
          'Teléfono': data.telefono || '—',
          Servicio: serviceLabels[data.servicio] ?? data.servicio,
          Mensaje: data.mensaje,
        }),
      });
      const result = await res.json().catch(() => null);
      if (res.ok && result?.success) { setSuccess(true); form.reset(); }
      else setError('No se ha podido enviar el mensaje. Escríbenos por WhatsApp o al email.');
    }
    catch { setError('No se ha podido enviar. Inténtalo de nuevo.'); }
    finally { setPending(false); }
  }

  return (
    <section id="contacto" className="section container contact-grid">
      <div className="contact-copy">
        <p className="kicker">Contacto</p>
        <h2 className="h2">Hablemos <span>de tu próximo proyecto</span></h2>
        <p className="contact-lead">Cuéntanos qué tienes en mente y te respondemos en menos de 24 horas.</p>
        <ul className="contact-details">
          <li><a href={`tel:${CONTACT.phoneTel}`}><span className="tile"><Phone size={18} /></span>{CONTACT.phoneDisplay}</a></li>
          <li><a href={`mailto:${CONTACT.email}`}><span className="tile"><Mail size={18} /></span>{CONTACT.email}</a></li>
          <li><span className="contact-city"><span className="tile"><MapPin size={18} /></span>{CONTACT.city}</span></li>
        </ul>
        <a className="btn btn-secondary" href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hola, me gustaría hablar sobre un proyecto.')}`} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} /> Escríbenos por WhatsApp
        </a>
      </div>
      <div className="contact-card">
        {success ? (
          <div className="contact-success" role="status">
            <CheckCircle2 size={40} />
            <h3>Gracias por escribirnos.</h3>
            <p>Hemos recibido tu mensaje y te respondemos en menos de 24 horas.</p>
            <button type="button" className="btn btn-secondary" onClick={() => setSuccess(false)}>Enviar otro mensaje</button>
          </div>
        ) : (
          <form onSubmit={submit} className="contact-form">
            <div className="form-row">
              <label><span className="field-label">Nombre <b aria-hidden="true">*</b></span><input name="nombre" autoComplete="name" placeholder="Tu nombre" required maxLength={100} /></label>
              <label><span className="field-label">Email <b aria-hidden="true">*</b></span><input name="email" type="email" autoComplete="email" placeholder="tu@email.com" required maxLength={255} /></label>
            </div>
            <div className="form-row">
              <label><span className="field-label">Teléfono</span><input name="telefono" type="tel" autoComplete="tel" placeholder="Opcional" maxLength={30} /></label>
              <label><span className="field-label">¿Qué necesitas? <b aria-hidden="true">*</b></span>
                <select name="servicio" required defaultValue="">
                  <option value="" disabled>Selecciona un servicio</option>
                  {services.map(s => <option key={s} value={s}>{serviceLabels[s] ?? s}</option>)}
                </select>
              </label>
            </div>
            <label><span className="field-label">Mensaje <b aria-hidden="true">*</b></span><textarea name="mensaje" required maxLength={3000} placeholder="Cuéntanos un poco sobre tu vivienda o tu proyecto…" rows={5} /></label>
            <div className="honeypot" aria-hidden="true"><label>Deja este campo vacío<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <p className="privacy-note">Al enviar, aceptas que tratemos tus datos para responder a tu consulta. Consulta la <Link to="/politica-de-privacidad">Política de privacidad</Link>.</p>
            {error && <p role="alert" className="form-error">{error}</p>}
            <button type="submit" disabled={pending} className="btn btn-primary send-button">{pending ? 'Enviando…' : 'Enviar mensaje'}<ArrowUpRight size={18} /></button>
          </form>
        )}
      </div>
    </section>
  );
}
