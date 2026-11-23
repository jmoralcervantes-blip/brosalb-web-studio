import { Link } from '@tanstack/react-router';
// Si Brosalb abre perfiles en redes, añade aquí los enlaces.
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <a href={import.meta.env.BASE_URL} className="wordmark">Brosalb</a>
          <p>Inmobiliaria, reformas y servicios digitales · Madrid</p>
        </div>
        <div className="footer-links">
          <span>© 2026 BROSALB, S.L.</span>
          <Link to="/aviso-legal">Aviso legal</Link>
          <Link to="/politica-de-privacidad">Política de privacidad</Link>
        </div>
      </div>
    </footer>
  );
}
