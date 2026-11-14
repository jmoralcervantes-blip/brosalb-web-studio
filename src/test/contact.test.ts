import { describe, expect, it } from 'vitest';
import { contactSchema, services, contactEmailSubject, isSpamContact } from '@/lib/contact-schema';
const contact = { nombre: 'Prueba', email: 'test@example.com', telefono: '', servicio: 'Alquiler', mensaje: 'Una consulta', website: '' };
describe('Contact validation', () => {
 it('blocks a filled honeypot and permits an empty one', () => { expect(isSpamContact({ website: 'spam' })).toBe(true); expect(isSpamContact({ website: '' })).toBe(false); });
 it('accepts the seven requested services', () => { expect(services).toEqual(['Alquiler','Compraventa','Reforma','Redes sociales y publicidad','Web o aplicación','IA y automatización','Otro']); for (const servicio of services) expect(contactSchema.safeParse({ ...contact, servicio }).success).toBe(true); });
 it('rejects an unlisted service', () => expect(contactSchema.safeParse({ ...contact, servicio: 'Administración' }).success).toBe(false));
 it('requires a valid email', () => expect(contactSchema.safeParse({ ...contact, email: 'invalid' }).success).toBe(false));
 it('requires name and message', () => { expect(contactSchema.safeParse({ ...contact, nombre: ' ' }).success).toBe(false); expect(contactSchema.safeParse({ ...contact, mensaje: ' ' }).success).toBe(false); });
 it('allows an optional phone but rejects invalid characters', () => { expect(contactSchema.safeParse(contact).success).toBe(true); expect(contactSchema.safeParse({ ...contact, telefono: '<script>' }).success).toBe(false); });
 it('puts the selected service in the notification subject', () => expect(contactEmailSubject('IA y automatización')).toBe('BROSALB · Nuevo contacto: IA y automatización'));
});
