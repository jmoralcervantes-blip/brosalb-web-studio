import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { contactSchema, isSpamContact } from './contact-schema';
import type { Database } from '@/integrations/supabase/types';
export const sendContact = createServerFn({ method: 'POST' })
 .inputValidator((input: unknown) => contactSchema.parse(input))
 .handler(async ({ data }) => {
   if (isSpamContact(data)) return { success: false, message: 'No se ha podido enviar el mensaje.' };
   const url = process.env['SUPABASE_URL'];
   const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
   if (!url || !key) return { success: false, message: 'El formulario no está disponible. Inténtalo de nuevo más tarde.' };
   const client = createClient<Database>(url, key, {
     auth: { persistSession: false, autoRefreshToken: false },
     global: { fetch: (input, init) => {
       const headers = new Headers(init?.headers);
       if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
       headers.set('apikey', key);
       return fetch(input, { ...init, headers });
     } },
   });
   const id = crypto.randomUUID();
   const { website: _honeypot, ...fields } = data;
   const { error } = await client.from('contactos').insert({ id, ...fields });
   if (error) return { success: false, message: 'No hemos podido guardar tu mensaje. Vuelve a intentarlo.' };
   const { prepareContactNotification } = await import('./contact-notification.server');
   prepareContactNotification(data, id); // Sending remains off until a verified domain and recipient are configured.
   return { success: true, message: 'Gracias por escribirnos. Hemos recibido tu mensaje y te respondemos en menos de 24 horas.' };
 });
