import { useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import before from '@/assets/renovation-before.jpg';
import after from '@/assets/renovation-after.jpg';
export function Puente() {
 const [position, setPosition] = useState(50);
 return <section className="bridge"><div className="container bridge-grid"><div className="bridge-copy"><p className="eyebrow">EL VALOR DE VER MÁS ALLÁ</p><h2>Compramos,<br/>reformamos<br/>y <em>ponemos en valor.</em></h2><p>Nuestra experiencia en inmuebles y en reformas nos permite ver el potencial donde otros ven un problema.</p><span className="bridge-note">Una nueva mirada. Un nuevo comienzo.</span></div><div><div className="comparison"><img src={after} alt="Después: salón reformado de ejemplo" width={1536} height={1024} loading="lazy"/><img className="comparison-before" src={before} alt="Antes: salón sin reformar de ejemplo" width={1536} height={1024} loading="lazy" style={{ clipPath: `inset(0 ${100-position}% 0 0)` }}/><span className="compare-label before-label">ANTES</span><span className="compare-label after-label">DESPUÉS</span><div className="compare-line" style={{ left: `${position}%` }}><span><ChevronsLeftRight size={22}/></span></div><input type="range" min="0" max="100" value={position} onChange={e => setPosition(Number(e.target.value))} aria-label="Comparar antes y después" /></div><p className="comparison-caption">Comparación ilustrativa · imágenes de ejemplo, no de una obra real</p></div></div></section>;
}
