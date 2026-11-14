import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
const links = ['Inmobiliaria', 'Digital', 'Proyectos', 'Contacto'];
// Raíz de la web ('/' en Lovable y con dominio propio; subcarpeta en la dirección provisional de GitHub Pages).
const HOME = import.meta.env.BASE_URL;
export function Header() {
 const [open, setOpen] = useState(false);
 return <header className="site-header"><div className="container header-inner"><a className="wordmark" href={HOME}>BROSALB<span>.</span></a><nav className="desktop-nav" aria-label="Navegación principal">{links.map(x => <a key={x} href={`${HOME}#${x.toLowerCase()}`}>{x}</a>)}</nav><Button asChild className="header-cta"><a href={`${HOME}#contacto`}>Hablemos <ArrowUpRight /></a></Button><Button className="mobile-toggle" variant="ghost" size="icon" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>{open && <nav className="mobile-nav" aria-label="Navegación móvil">{links.map(x => <a key={x} href={`${HOME}#${x.toLowerCase()}`} onClick={() => setOpen(false)}>{x}<ArrowUpRight size={18} /></a>)}</nav>}</header>;
}
