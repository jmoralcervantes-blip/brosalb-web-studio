import { Header } from './Header';
import { Footer } from './Footer';

const EMAIL = 'brosalgroup@gmail.com';
const UPDATED = '14 de noviembre de 2026';

function Privacy() {
  return <>
    <h2>Responsable</h2>
    <p>BROSALB, S.L., CIF B83435107, Av. Séptima 56, 28022 Madrid. Contacto: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
    <h2>Qué datos tratamos y para qué</h2>
    <p>Los que nos envías desde el formulario de contacto (nombre, email, teléfono si lo indicas, el servicio que te interesa y tu mensaje), solo para responder a tu consulta y, si nos lo pides, preparar una propuesta. No los usamos para enviarte publicidad sin tu permiso.</p>
    <h2>Base legal</h2>
    <p>Tu consentimiento al enviarnos la consulta y, si después contratas, la ejecución de ese contrato.</p>
    <h2>Cuánto tiempo los guardamos</h2>
    <p>Mientras dure la conversación comercial y, como máximo, un año después del último contacto si no contratas.</p>
    <h2>A quién se comunican</h2>
    <p>A nadie, salvo obligación legal. Para que la web funcione usamos estos proveedores, que tratan los datos por cuenta nuestra:</p>
    <ul>
      <li><strong>GitHub</strong> (GitHub Pages), que aloja esta web y recibe la dirección IP de tu navegador al visitarla.</li>
      <li><strong>Web3Forms</strong>, que recibe tu consulta, nos la reenvía por correo y guarda una copia.</li>
      <li><strong>Google</strong>, que gestiona nuestro correo y desde donde se carga la tipografía (Google Fonts), que recibe la dirección IP de tu navegador.</li>
      <li>Las imágenes de la sección de proyectos se cargan desde las webs de esos proyectos, que también reciben la dirección IP de tu navegador.</li>
      <li>Si alguno de estos proveedores trata datos fuera de la Unión Europea, la transferencia se ampara en las garantías que ofrece el proveedor.</li>
    </ul>
    <h2>Cookies</h2>
    <p>Esta web no usa cookies.</p>
    <h2>Tus derechos</h2>
    <p>Puedes pedir acceso, rectificación, supresión, oposición, limitación o portabilidad de tus datos escribiendo a <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Si crees que no los hemos tratado bien, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">aepd.es</a>).</p>
  </>;
}

function Legal() {
  return <>
    <h2>Quién es el titular de esta web</h2>
    <p>En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI), estos son los datos del titular:</p>
    <ul>
      <li>Titular: BROSALB, S.L.</li>
      <li>CIF: B83435107</li>
      <li>Domicilio: Av. Séptima 56, 28022 Madrid</li>
      <li>Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
      <li>Inscripción: Registro Mercantil de Madrid, hoja M-313078</li>
    </ul>
    <h2>Para qué sirve esta web</h2>
    <p>Presentar los servicios de BROSALB (alquiler y compraventa de inmuebles, reformas, redes sociales, publicidad, webs, tiendas online e inteligencia artificial) y atender las consultas que nos llegan.</p>
    <h2>Propiedad intelectual</h2>
    <p>Los textos, el diseño y el logotipo de esta web pertenecen a BROSALB. Las marcas e imágenes de los proyectos mostrados pertenecen a sus titulares y se muestran como ejemplos de trabajos realizados.</p>
    <h2>Responsabilidad</h2>
    <p>La información de esta web es orientativa. Los precios y condiciones definitivos son los que figuren en la propuesta o el contrato firmado con cada cliente.</p>
    <h2>Legislación aplicable</h2>
    <p>Esta web se rige por la legislación española.</p>
  </>;
}

export function LegalPage({ privacy = false }: { privacy?: boolean }) {
  return <><Header/><main className="container legal-page"><p className="eyebrow">BROSALB · INFORMACIÓN LEGAL</p><h1>{privacy ? 'Política de privacidad' : 'Aviso legal'}</h1><p>Última actualización: {UPDATED}</p>{privacy ? <Privacy/> : <Legal/>}</main><Footer/></>;
}
