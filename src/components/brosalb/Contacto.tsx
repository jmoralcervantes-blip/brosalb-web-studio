import { useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowUpRight, Phone, Mail, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { contactSchema, services } from '@/lib/contact-schema';
import { sendContact } from '@/lib/contact.functions';
// Etiqueta visible distinta del valor guardado, para no tener que cambiar la base de datos.
const serviceLabels: Partial<Record<string, string>> = { 'Web o aplicación': 'Web, tienda online o aplicación' };
export function Contacto() {
 const send = useServerFn(sendContact);
 const [pending, setPending] = useState(false);
 const [success, setSuccess] = useState(false);
 const [error, setError] = useState('');
 async function submit(e: FormEvent<HTMLFormElement>) {
   e.preventDefault(); if (pending) return;
   const form = e.currentTarget;
   const data = contactSchema.safeParse(Object.fromEntries(new FormData(form)));
   if (!data.success) { setError(data.error.issues[0]?.message ?? 'Revisa los campos.'); return; }
   setPending(true); setError('');
   try { const result = await send({ data: data.data }); if (result.success) { setSuccess(true); form.reset(); } else setError(result.message); }
   catch { setError('No se ha podido enviar. Inténtalo de nuevo.'); }
   finally { setPending(false); }
 }
 return <section id="contacto" className="section container contact-grid"><div className="contact-copy"><p className="eyebrow">EL PRÓXIMO PROYECTO EMPIEZA AQUÍ</p><h2>Hablemos<em>.</em></h2><p>Cuéntanos qué tienes en mente y te respondemos en menos de 24 horas.</p><div className="contact-details"><span className="provisional-label">DATOS DE CONTACTO PROVISIONALES</span><a href="tel:+34000000000"><Phone size={18}/> +34 000 000 000</a><a href="mailto:contacto@brosalb.example"><Mail size={18}/> contacto@brosalb.example</a><Button asChild variant="outline"><a href={`https://wa.me/34000000000?text=${encodeURIComponent('Hola, me gustaría hablar sobre un proyecto.')}`} target="_blank" rel="noopener noreferrer"><MessageCircle/> Escríbenos por WhatsApp <ArrowUpRight/></a></Button><small>Teléfono, email y WhatsApp de ejemplo: no operativos.</small></div></div><div className="contact-form-wrap">{success ? <div className="contact-success" role="status"><CheckCircle2 size={38}/><h3>Gracias por escribirnos.</h3><p>Hemos recibido tu mensaje y te respondemos en menos de 24 horas.</p><Button variant="outline" onClick={() => setSuccess(false)}>Enviar otro mensaje <ArrowUpRight/></Button></div> : <form onSubmit={submit} className="contact-form"><div className="form-row"><label>Nombre <span>*</span><input name="nombre" autoComplete="name" placeholder="Tu nombre" required maxLength={100}/></label><label>Email <span>*</span><input name="email" type="email" autoComplete="email" placeholder="tu@email.com" required maxLength={255}/></label></div><div className="form-row"><label>Teléfono<input name="telefono" type="tel" autoComplete="tel" placeholder="Tu teléfono (opcional)" maxLength={30}/></label><label>¿Qué necesitas? <span>*</span><select name="servicio" required defaultValue=""><option value="" disabled>Selecciona un servicio</option>{services.map(s => <option key={s} value={s}>{serviceLabels[s] ?? s}</option>)}</select></label></div><label>Mensaje <span>*</span><textarea name="mensaje" required maxLength={3000} placeholder="Cuéntanos un poco sobre tu proyecto…" rows={5}/></label><div className="honeypot" aria-hidden="true"><label>Deja este campo vacío<input name="website" tabIndex={-1} autoComplete="off"/></label></div><p className="privacy-note">Al enviar, aceptas que tratemos tus datos para responder a tu consulta. Consulta la <Link to="/politica-de-privacidad">Política de privacidad</Link>.</p>{error && <p role="alert" className="form-error">{error}</p>}<Button type="submit" disabled={pending} className="send-button">{pending ? 'Enviando…' : 'Enviar mensaje'}<ArrowUpRight/></Button></form>}</div></section>;
}
