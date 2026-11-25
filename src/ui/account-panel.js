// Painel React da Entregável 6: Auth, PostgreSQL e ranking no Nhost compartilhado.
const React = window.React;
const { createRoot } = window.ReactDOM;
const { useState, useEffect } = React;
const h = React.createElement;
function Field({label,value,onChange,type='text',...rest}) {
  return h('label',{className:'e6-field'},h('span',null,label),h('input',{type,value,onChange:e=>onChange(e.target.value),...rest}));
}
export function mountAccountPanel(cloudService){
  const el=document.getElementById('entregavel6-react-root');
  if(!el)return;
  function App(){
    const [open,setOpen]=useState(false);
    const [mode,setMode]=useState('login');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [user,setUser]=useState(cloudService.getUser());
    const [scores,setScores]=useState([]);
    const [ranking,setRanking]=useState([]);
    const [message,setMessage]=useState('');
    const [busy,setBusy]=useState(false);
    useEffect(()=>{
      const button=document.getElementById('e6-react-open');
      const handler=()=>{setOpen(true);setUser(cloudService.getUser());};
      button?.addEventListener('click',handler);
      document.documentElement.dataset.conquestReactReady = 'true';
      return ()=>{ button?.removeEventListener('click',handler); delete document.documentElement.dataset.conquestReactReady; };
    },[]);
    useEffect(()=>{
      window.dispatchEvent(new CustomEvent('conquest:react-account',{detail:{open}}));
      return ()=>window.dispatchEvent(new CustomEvent('conquest:react-account',{detail:{open:false}}));
    },[open]);
    useEffect(()=>{
      if(!open)return;
      let valid=true;
      cloudService.initialize().then(()=>{if(valid)setUser(cloudService.getUser());}).catch(e=>{if(valid)setMessage(e.message);});
      return ()=>{valid=false;};
    },[open]);
    async function refresh(){
      setBusy(true);
      try{
        const current=cloudService.getUser();
        setUser(current);
        const [own,leaders]=await Promise.all([
          current ? cloudService.getOwnScores():Promise.resolve([]),
          cloudService.getGlobalLeaderboard()
        ]);
        setScores(own);setRanking(leaders);setMessage('Dados consultados no Nhost.');
      }catch(e){setMessage('Falha ao consultar Nhost: '+e.message);}
      finally{setBusy(false);}
    }
    async function submit(event){
      event.preventDefault();setBusy(true);setMessage('');
      try{
        const msg=mode==='register' ? await cloudService.register(email,password):await cloudService.login(email,password);
        setMessage(msg);setPassword('');setUser(cloudService.getUser());
        window.dispatchEvent(new Event('conquest:nhost-session-change'));
        if(cloudService.getUser())await refresh();
      }catch(e){setMessage(e.message||'Falha na autenticação Nhost.');}
      finally{setBusy(false);}
    }
    async function logout(){
      setBusy(true);
      try{await cloudService.logout();setUser(null);setScores([]);setMessage('Sessão encerrada.');window.dispatchEvent(new Event('conquest:nhost-session-change'));}
      catch(e){setMessage(e.message);}
      finally{setBusy(false);}
    }
    if(!open)return null;
    return h('div',{className:'e6-backdrop',role:'dialog','aria-modal':'true','aria-label':'Progresso Nhost Entregável 6'},
      h('div',{className:'e6-modal'},
        h('button',{className:'e6-close',type:'button',onClick:()=>setOpen(false),'aria-label':'Fechar'},'×'),
        h('small',{className:'e6-eyebrow'},'ENTREGÁVEL 6 · GITHUB PAGES + NHOST'),
        h('h2',null,'CONQUEST · Progresso em nuvem'),
        h('p',null,'Painel React com Auth, PostgreSQL e GraphQL do Nhost. As contas são compartilhadas com o CONQUEST Nuvem.'),
        message && h('p',{className:'e6-message',role:'status'},message),
        !user ? h('form',{className:'e6-form',onSubmit:submit},
          h('div',{className:'e6-tabs'},
            h('button',{type:'button',className:mode==='login'?'current':'',onClick:()=>setMode('login')},'Entrar'),
            h('button',{type:'button',className:mode==='register'?'current':'',onClick:()=>setMode('register')},'Criar conta')),
          h(Field,{label:'E-mail',type:'email',value:email,onChange:setEmail,autoComplete:'email',required:true}),
          h(Field,{label:'Senha (mínimo 8 caracteres)',type:'password',value:password,onChange:setPassword,minLength:8,required:true,autoComplete:mode==='register'?'new-password':'current-password'}),
          h('button',{className:'e6-primary',type:'submit',disabled:busy},mode==='register'?'Cadastrar no Nhost':'Entrar com Nhost'))
        : h('section',{className:'e6-account'},
          h('p',null,'Autenticado: ',h('strong',null,user.email||user.id)),
          h('button',{type:'button',className:'e6-secondary',onClick:logout,disabled:busy},'Sair da conta')),
        h('button',{type:'button',className:'e6-secondary',onClick:refresh,disabled:busy},'Atualizar histórico e ranking'),
        h('div',{className:'e6-columns'},
          h('section',null,h('h3',null,'Minhas partidas (PostgreSQL)'),
            !user?h('p',null,'Entre para consultar seu histórico.'):
            scores.length?h('ol',null,...scores.map((x,i)=>h('li',{key:x.id||i},String(x.score)+' pontos · '+String(x.correct_answers)+' acertos'))):
            h('p',null,'Nenhuma partida registrada.')),
          h('section',null,h('h3',null,'Ranking global dos duelos'),
            ranking.length?h('ol',null,...ranking.map((x,i)=>h('li',{key:i},(x.nickname||'Jogador')+' · '+x.bestScore+' pontos · '+x.wins+' vitórias'))):
            h('p',null,'Sem resultados ou ranking indisponível.')))
      ));
  }
  createRoot(el).render(h(App));
}
