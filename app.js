const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const toast = (message) => { const el=$('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>el.classList.remove('show'),2600); };
const pageNames={overview:'Overview',telemetry:'Live telemetry',analytics:'Analytics',incidents:'Alerts & incidents',map:'Network map',reports:'Reports & audit',settings:'Settings'};
const telemetrySamples=[['Turbidity','1.8','NTU','Normal','blue'],['Water temperature','18.4','°C','Normal','orange'],['Water level','82.6','%','Normal','mint'],['Sensor connection','Online','', 'Connected','violet']];
$('.telemetry-grid').innerHTML=telemetrySamples.map(([name,value,unit,status,tone])=>`<article class="metric-card"><div class="metric-top"><span>${name}</span><span class="metric-icon ${tone}">≈</span></div><div class="metric-value">${value} <small>${unit}</small></div><div class="metric-foot"><span class="status safe"><i></i> ${status}</span><span class="muted">Simulated</span></div></article>`).join('');
function navigate(page){if(page==='audit')page='reports'; if(!pageNames[page])return; $$('.page').forEach(p=>p.classList.toggle('active',p.id===`page-${page}`)); $$('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.page===page)); $('#crumb').textContent=pageNames[page]; $('#sidebar').classList.remove('open'); window.scrollTo({top:0,behavior:'smooth'}); history.replaceState(null,'',`#${page}`);}
$$('.nav-item').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.page)));
$('#locationSelect').addEventListener('change',e=>{ $('#locationCrumb').textContent=e.target.value; toast(`${e.target.value} selected. Readings shown remain simulated.`); });
$$('[data-goto]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.goto)));
$('#menuBtn').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
document.addEventListener('click',e=>{if(window.innerWidth<=850 && $('#sidebar').classList.contains('open') && !$('#sidebar').contains(e.target) && !$('#menuBtn').contains(e.target)) $('#sidebar').classList.remove('open');});
const setTheme=dark=>{document.body.classList.toggle('dark',dark);$('#themeToggle').checked=dark;localStorage.setItem('aquapulse-theme',dark?'dark':'light');};
setTheme(localStorage.getItem('aquapulse-theme')==='dark');$('#themeBtn').addEventListener('click',()=>setTheme(!document.body.classList.contains('dark')));$('#themeToggle').addEventListener('change',e=>setTheme(e.target.checked));
$$('.close-notice').forEach(b=>b.addEventListener('click',()=>b.closest('.notice').remove()));
$('#refreshBtn').addEventListener('click',()=>{const b=$('#refreshBtn');b.classList.add('spinning');setTimeout(()=>b.classList.remove('spinning'),450);toast('Simulated readings refreshed locally.');});
$$('.range').forEach(b=>b.addEventListener('click',()=>{ $$('.range').forEach(x=>x.classList.remove('active'));b.classList.add('active');toast(`${b.textContent} sample view selected.`);}));
$$('.row-action').forEach(b=>b.addEventListener('click',()=>{const row=b.closest('tr');row.querySelector('.status').innerHTML='<i></i> Acknowledged';row.querySelector('.status').className='status safe';b.textContent='Acknowledged';b.disabled=true;b.style.opacity='.55';toast('Incident acknowledged in this sample session.');}));
$('#ackAll').addEventListener('click',()=>{$$('.row-action').filter(b=>!b.disabled).forEach(b=>b.click());toast('All sample incidents acknowledged.');});
const csv='Timestamp,Site,Sensor,Parameter,Reading,Unit,Status,Data source\n2026-10-29 10:42,Sample Location,sensor S-104,Turbidity,4.2,NTU,Warning,Simulated sample\n2026-10-29 10:30,Sample Location,sensor S-104,Turbidity,1.8,NTU,Normal,Simulated sample\n2026-10-29 10:29,Sample Location,sensor S-208,Temperature,18.4,C,Normal,Simulated sample\n2026-10-29 10:28,Sample Location,sensor S-311,Water level,82.6,%,Normal,Simulated sample\n';
function download(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='aquapulse-sample-readings.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('Sample CSV downloaded.');}
$('#downloadCsv').addEventListener('click',download);$('#downloadCsv2').addEventListener('click',download);
$$('.select').forEach(b=>b.addEventListener('click',()=>{if(!b.id)toast('This prototype shows a fixed sample period.');}));
const hash=location.hash.replace('#','');if(pageNames[hash])navigate(hash);
if('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
