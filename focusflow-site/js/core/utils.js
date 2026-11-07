/* FocusFlow – Helpers: DOM, escaping, dates, toast */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const iso=n=>{const d=new Date();d.setDate(d.getDate()+n);return fmt(d)};
const pd=s=>new Date(s+'T00:00');
const nice=s=>pd(s).toLocaleDateString('en',{month:'short',day:'numeric'});
const uid=()=>'x'+Math.random().toString(36).slice(2,9);
const t12=t=>{const[h,m]=t.split(':').map(Number);return((h+11)%12+1)+':'+String(m).padStart(2,'0')+(h<12?' AM':' PM')};
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2600)}

function flash(m){try{sessionStorage.setItem('ff_flash',m)}catch(e){}}
function showFlash(){try{const m=sessionStorage.getItem('ff_flash');if(m){sessionStorage.removeItem('ff_flash');toast(m)}}catch(e){}}
const clamp=(v,a,b)=>Math.min(b,Math.max(a,+v||0));
const mailOk=v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const initials=n=>n.split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase()||'U';
const avatar=u=>u.avatar?`<img src="${u.avatar}" alt="">`:esc(initials(u.name));
