const base=process.env.CONQUEST_PAGES_URL||'https://ruan-levi.github.io/Entregavel6-Ambientes/';
const marker=/\/Entregavel6-Ambientes\/assets\/[^"' ]+\.js/;
let error='sem resposta';
for(let attempt=1;attempt<=12;attempt++){
 try{
  const url=new URL(base);url.searchParams.set('verify_e6',process.env.GITHUB_SHA||'latest');
  const response=await fetch(url,{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(12000)});
  const html=await response.text();const match=html.match(marker);
  if(response.ok&&match&&html.includes('portal-duel-open')&&html.includes('e6-react-open')&&!html.includes('src="/src/main.js"')){
   const js=await fetch(new URL(match[0],url.origin),{signal:AbortSignal.timeout(12000)});
   const demoUrl=new URL('ambientes/',url);
   const demo=await fetch(demoUrl,{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(12000)});
   const page=await demo.text();
   if(js.ok&&demo.ok&&page.includes('Os seis ambientes da atividade')&&page.includes('id="check-api"')){
    console.log('Entregável 6 independente publicado:',url.href,demoUrl.href);process.exit(0);
   }
   error='Arquivos ou pagina E6 ausentes: JavaScript='+js.status+' E6='+demo.status;
  }else error='HTML do GitHub Pages ainda incorreto: '+response.status;
 }catch(e){error=e.message;}
 if(attempt<12)await new Promise(r=>setTimeout(r,5000));
}
console.error(error);process.exit(1);
