import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
const sub=process.env.NHOST_SUBDOMAIN?.trim();
const region=process.env.NHOST_REGION?.trim();
if(!/^[a-z0-9-]+$/.test(sub||'')||!/^[a-z0-9-]+$/.test(region||'')){
 console.error('Configure NHOST_SUBDOMAIN e NHOST_REGION');process.exit(1);
}
const html=readFileSync('dist/index.html','utf8');
if(!html.includes('portal-duel-open')||!html.includes('e6-react-open')||!html.includes('entregavel6-react-root')||html.includes('Progresso AWS')){
 console.error('Build errado: portal original + React Nhost ausente ou versão AWS presente');process.exit(1);
}
const assets=readdirSync(join('dist','assets')).filter(f=>f.endsWith('.js'));
if(!assets.length){console.error('Sem bundle Vite');process.exit(1);}
const code=assets.map(f=>readFileSync(join('dist','assets',f),'utf8')).join('\n');
if(!code.includes(sub)||!code.includes(region)){console.error('Configuração Nhost não encontrada no build');process.exit(1);}
console.log('Portal 3D + React integrado ao Nhost no build.');
