import { contactEmailSubject, type ContactInput } from './contact-schema';
// Set CONTACT_NOTIFICATION_TO in Cloud secrets when the owner supplies an address.
// A verified owned domain is required before scaffolding and connecting managed email sending.
export function prepareContactNotification(contact: ContactInput, id: string) {
  return {
    to: process.env['CONTACT_NOTIFICATION_TO'] ?? null,
    subject: contactEmailSubject(contact.servicio),
    templateData: { nombre: contact.nombre, email: contact.email, telefono: contact.telefono, servicio: contact.servicio, mensaje: contact.mensaje },
    idempotencyKey: `contacto-${id}`,
  };
}
