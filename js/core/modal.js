/* FocusFlow – Modal, confirm dialog and form-field builders */
function openModal(title,body,onSubmit,label='Save'){
 const m=$('#modal');m.innerHTML=`<form class="mbox" novalidate><h3>${title}</h3>${body}<div class="mact"><button type="button" class="btn gh" data-act="close">Cancel</button><button class="btn pri">${label}</button></div></form>`;
 m.classList.remove('hide');const f=m.firstChild;const first=f.querySelector('input,select,textarea');first&&first.focus();
 f.onsubmit=e=>{e.preventDefault();$$('.err',f).forEach(x=>x.remove());const d=Object.fromEntries(new FormData(f));let ok=true;
  $$('[data-req]',f).forEach(i=>{if(!String(d[i.name]||'').trim()){ok=false;i.closest('label').insertAdjacentHTML('afterend','<div class="err">This field is required.</div>')}});
  if(ok&&onSubmit(d)!==false)closeModal()}}
function closeModal(){$('#modal').classList.add('hide');$('#modal').innerHTML=''}
function ask(msg,fn,label='Delete'){const m=$('#modal');m.innerHTML=`<div class="mbox"><h3>Are you sure?</h3><p class="muted" style="margin-bottom:20px">${msg}</p><div class="mact"><button class="btn gh" data-act="close">Cancel</button><button class="btn dng" id="yes">${label}</button></div></div>`;m.classList.remove('hide');$('#yes').onclick=()=>{fn();closeModal()}}
const fld=(l,n,v='',t='text',x='')=>`<label class="f"><span>${l}</span><input name="${n}" type="${t}" value="${esc(v)}" ${x}></label>`;
const slc=(l,n,o,v)=>`<label class="f"><span>${l}</span><select name="${n}">${o.map(x=>{const[a,b]=Array.isArray(x)?x:[x,x];return`<option value="${esc(a)}" ${a==v?'selected':''}>${esc(b)}</option>`}).join('')}</select></label>`;
const subOpts=()=>S.subjects.map(s=>[s.id,s.name]);
