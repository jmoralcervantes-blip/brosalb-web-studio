import { z } from 'zod';
export const services = ['Alquiler', 'Compraventa', 'Reforma', 'Redes sociales y publicidad', 'Web o aplicación', 'IA y automatización', 'Otro'] as const;
export const contactSchema = z.object({
 nombre: z.string().trim().min(1, 'Escribe tu nombre.').max(100),
 email: z.string().trim().email('Introduce un email válido.').max(255),
 telefono: z.string().trim().max(30).regex(/^[0-9+() .-]*$/, 'Revisa el teléfono.'),
 servicio: z.enum(services, { errorMap: () => ({ message: 'Selecciona un servicio.' }) }),
 mensaje: z.string().trim().min(1, 'Cuéntanos qué necesitas.').max(3000),
 website: z.string().max(200).default(''),
});
export const contactEmailSubject = (service: string) => `BROSALB · Nuevo contacto: ${service}`;
export const isSpamContact = (contact: { website: string }) => contact.website.length > 0;
export type ContactInput = z.infer<typeof contactSchema>;
