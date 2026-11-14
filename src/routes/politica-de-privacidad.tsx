import { createFileRoute } from '@tanstack/react-router';
import { LegalPage } from '@/components/brosalb/LegalPage';
export const Route = createFileRoute('/politica-de-privacidad')({ head: () => ({ meta: [{ title: 'Política de privacidad | Brosalb' }, { name: 'description', content: 'Información sobre los datos del formulario de contacto de Brosalb. Texto provisional.' }, { property: 'og:title', content: 'Política de privacidad | Brosalb' }, { property: 'og:description', content: 'Tratamiento de los datos de contacto en Brosalb.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }), component: Privacy });
function Privacy() { return <LegalPage privacy/>; }
