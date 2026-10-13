const $=i=>document.getElementById(i);
function tabs(id,items,fn){const c=$(id);c.innerHTML='';items.forEach((t,i)=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>{[...c.children].forEach(x=>x.classList.remove('on'));b.classList.add('on');fn(i)};c.appendChild(b)});c.children[0].click()}

/* Caso Tesla */
const CH=[{n:'NMC',e:[['Ni','Níquel'],['Mn','Manganeso'],['Co','Cobalto']],t:'Níquel-Manganeso-Cobalto: la química más reciente, usada en modelos de mayor autonomía.'},
{n:'NCA',e:[['Ni','Níquel'],['Co','Cobalto'],['Al','Aluminio']],t:'Níquel-Cobalto-Aluminio: química empleada por Tesla en sus baterías de alta densidad de energía.'}];
tabs('chem',CH.map(c=>c.n),i=>{$('chips').innerHTML=CH[i].e.map((x,j)=>(j?'<span class="p">+</span>':'')+`<div class="chip" title="${x[1]}">${x[0]}<small>${x[1]}</small></div>`).join('');$('chemtx').textContent=CH[i].t});

/* UNS: mini reto */
const U=[['N02200','Níquel 200 (99.6 % Ni, comercialmente puro)'],['N02201','Níquel 201 (bajo carbono, para uso a alta temperatura)'],['N04400','Monel 400 (aleación Ni-Cu)']];
let cur=0,letter='N';
function drawCode(){const c=U[cur][0];$('code').innerHTML=[...c].map((ch,j)=>{const first=j===0;const bad=first&&letter!=='N';return `<span class="${first?(bad?'bad':'k'):''}">${first?letter:ch}</span>`}).join('');
$('unsfb').innerHTML=letter==='N'?'<b>N</b> = familia del níquel y sus aleaciones. Los cinco dígitos <b>'+c.slice(1)+'</b> identifican la composición.':'<b>'+letter+'</b> no es la familia del níquel. Prueba con otra letra.'}
tabs('letters',['A','C','N','S'],i=>{letter=['A','C','N','S'][i];drawCode()});
$('unsrows').innerHTML=U.map((u,i)=>`<tr data-i="${i}"><td>${u[0]}</td><td>${u[1]}</td></tr>`).join('');
$('unsrows').onclick=e=>{const r=e.target.closest('tr');if(!r)return;cur=+r.dataset.i;[...$('unsrows').children].forEach(x=>x.classList.remove('sel'));r.classList.add('sel');drawCode()};
$('unsrows').children[0].click();
const AS=[['B160','Barra / varilla'],['B161 / B163','Tubo'],['B162','Placa / lámina / tira'],['B564','Forja']];
tabs('astm',AS.map(a=>a[0]),i=>$('astmtx').textContent=AS[i][1]);

/* Propiedades */
const PR=[['Ductilidad','Es alta; presenta deformación permanente y significativa sin necesidad de romperse.'],['Tenacidad','Alta capacidad de absorción de energía en la zona plástica.'],['Dureza','No es alta, dado que puede ser rayado con facilidad.']];
$('props').innerHTML=PR.map(p=>`<details><summary>${p[0]}</summary><p>${p[1]}</p></details>`).join('');
const MAX=600;function meters(){document.querySelectorAll('.track i').forEach(i=>{i.style.left=i.dataset.a/MAX*100+'%';i.style.width=(i.dataset.b-i.dataset.a)/MAX*100+'%'})}

/* Aplicaciones */
const AP=[['Producción de acero inoxidable','El níquel mejora la resistencia a la corrosión del acero inoxidable.'],['Aleaciones en la industria aeroespacial','Aleaciones que soportan condiciones extremas.'],['Electrónica y baterías','Componente clave de las baterías recargables, como las de los vehículos eléctricos.'],['Industrias químicas y petroquímicas','Equipos que resisten ambientes corrosivos.'],['Ingeniería marina','Resiste la corrosión del agua de mar.'],['Generación de energía','Turbinas, calderas y reactores de alta temperatura.'],['Aplicaciones médicas','Biocompatible y resistente a la corrosión.']];
$('appgrid').innerHTML=AP.map(a=>`<button class="app" aria-label="${a[0]}"><div><b>${a[0]}</b><em>${a[1]}</em></div></button>`).join('');
$('appgrid').onclick=e=>{const b=e.target.closest('.app');if(b)b.classList.toggle('flip')};

/* Distribución */
const F=[['Láminas, placas y tiras','Se usan para corte, doblado y soldadura.'],['Barras y varillas','Empleadas para mecanizado y fabricación de componentes.'],['Tubos y tuberías','Utilizados para conducción de fluidos y ambientes corrosivos.'],['Alambre','Disponible en distintos diámetros y generalmente distribuido en rollos.'],['Lingotes y palanquillas','Materia prima para laminado, forjado y extrusión.'],['Polvo, pellets y briquetas','Utilizados en aleaciones, baterías y otros procesos industriales.']];
tabs('forms',F.map(f=>f[0]),i=>$('formtx').innerHTML=`<h3>${F[i][0]}</h3><p>${F[i][1]}</p>`);

/* Brillo que sigue al cursor */
document.addEventListener('pointermove',e=>{const c=e.target.closest('.card');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}});

/* Lightbox */
const lb=$('lb');document.querySelectorAll('.zoom').forEach(im=>im.onclick=()=>{lb.querySelector('img').src=im.src;lb.classList.add('on')});
lb.onclick=()=>lb.classList.remove('on');addEventListener('keydown',e=>e.key==='Escape'&&lb.classList.remove('on'));

/* Aparición al hacer scroll y menú activo */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.id==='mec')meters();document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}}),{threshold:.2});
document.querySelectorAll('.reveal').forEach(s=>io.observe(s));
