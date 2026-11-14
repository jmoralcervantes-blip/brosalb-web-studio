REVOKE ALL ON public.contactos FROM anon, authenticated;
GRANT INSERT ON public.contactos TO anon, authenticated;
GRANT ALL ON public.contactos TO service_role;