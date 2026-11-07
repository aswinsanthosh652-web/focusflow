/* FocusFlow – Shared actions (data-act delegation), mobile menu, Escape/backdrop handling */
const A={
 theme:()=>applyTheme(S.theme==='dark'?'light':'dark'),
 settheme:id=>applyTheme(id),
 menu:()=>{$('#side').classList.add('open');$('#scrim').classList.remove('hide')},
 demo:()=>{ensureDemo();startSession(DEMO_EMAIL);flash('Signed in with the demo account');enter()},
 soc:()=>toast('Social links are placeholders in this demo'),
 eye:(_,b)=>{const i=b.parentElement.querySelector('input'),s=i.type==='password';i.type=s?'text':'password';b.innerHTML='<i class="fa-regular fa-eye'+(s?'-slash':'')+'"></i>'},
 close:()=>closeModal()
};
function enter(){location.href='dashboard.html'}
function closeMenu(){const s=$('#side'),c=$('#scrim');if(s)s.classList.remove('open');if(c)c.classList.add('hide')}
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const f=A[b.dataset.act];if(f){if(b.tagName==='A')e.preventDefault();f(b.dataset.id,b)}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeMenu()}});
$('#modal').addEventListener('mousedown',e=>{if(e.target.id==='modal')closeModal()});
if($('#scrim'))$('#scrim').onclick=closeMenu;
