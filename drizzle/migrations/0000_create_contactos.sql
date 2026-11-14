CREATE TABLE public.contactos (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 nombre text NOT NULL CHECK (char_length(trim(nombre)) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) <= 255 AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 telefono text NOT NULL DEFAULT '' CHECK (char_length(telefono) <= 30 AND telefono ~ '^[0-9+() .-]*$'),
 servicio text NOT NULL CHECK (servicio IN ('Alquiler','Compraventa','Reforma','Redes sociales y publicidad','Web o aplicación','IA y automatización','Otro')),
 mensaje text NOT NULL CHECK (char_length(trim(mensaje)) BETWEEN 1 AND 3000),
 fecha timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contactos TO anon, authenticated;
GRANT ALL ON public.contactos TO service_role;
ALTER TABLE public.contactos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitantes pueden enviar contactos" ON public.contactos FOR INSERT TO anon, authenticated WITH CHECK (true);