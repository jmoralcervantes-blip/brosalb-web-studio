// Rellena el formulario de contacto (servicio + mensaje) y baja hasta él.
// Si la página actual no tiene formulario (p. ej. el aviso legal), lleva a la portada con los datos en la URL.
export function prefillContact(servicio: string, mensaje: string) {
  const section = document.getElementById('contacto');
  if (!section) {
    const params = new URLSearchParams({ servicio, mensaje });
    window.location.href = `${import.meta.env.BASE_URL}?${params.toString()}#contacto`;
    return;
  }
  const form = section.querySelector('form');
  if (form) {
    const select = form.elements.namedItem('servicio');
    if (select instanceof HTMLSelectElement) select.value = servicio;
    const message = form.elements.namedItem('mensaje');
    if (message instanceof HTMLTextAreaElement) message.value = mensaje;
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  section.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  const name = form?.elements.namedItem('nombre');
  if (name instanceof HTMLInputElement) window.setTimeout(() => name.focus({ preventScroll: true }), reduce ? 0 : 600);
}

export function requestValuation(address: string) {
  const clean = address.trim();
  prefillContact(
    'Compraventa',
    clean
      ? `Quiero vender mi vivienda y me gustaría una valoración. Dirección: ${clean}`
      : 'Quiero vender mi vivienda y me gustaría una valoración.',
  );
}
