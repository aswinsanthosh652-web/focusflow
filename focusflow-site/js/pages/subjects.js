/* FocusFlow – subjects page */
R.subjects=()=>{$('#p-subjects').innerHTML=`<div class="ph"><div><h2>Subjects</h2><p class="muted">${S.subjects.length} subjects, ${S.subjects.reduce((a,s)=>a+ +s.hours,0)} total study hours</p></div><button class="btn pri" data-act="addSub"><i class="fa-solid fa-plus"></i>Add subject</button></div>
 ${S.subjects.length?`<div class="grid g3">${S.subjects.map(s=>`<div class="card sc" style="--c:${s.color}"><h4>${esc(s.name)}<span><button class="ib" data-act="editSub" data-id="${s.id}" aria-label="Edit"><i class="fa-solid fa-pen"></i></button><button class="ib del" data-act="delSub" data-id="${s.id}" aria-label="Delete"><i class="fa-solid fa-trash"></i></button></span></h4><p class="muted">${esc(s.desc)}</p><div class="bar"><i style="width:${s.progress}%"></i></div><div class="meta"><span><i class="fa-regular fa-clock"></i> ${s.hours} hours</span><b style="color:var(--c)">${s.progress}% complete</b></div><span class="tag" style="--c:${s.color}">${S.tasks.filter(t=>t.subj===s.id&&!t.done).length} open tasks</span></div>`).join('')}</div>`:empty('fa-book-open','No subjects yet','Add a subject to start tracking your study time.')}`};
function subForm(s={}){return fld('Subject name','name',s.name,'text','data-req')+fld('Description','desc',s.desc)+fld('Colour','color',s.color||'#5b5ce6','color')+fld('Study hours','hours',s.hours??0,'number','min="0" step="0.5"')+fld('Completion (%)','progress',s.progress??0,'number','min="0" max="100"')}

Object.assign(A,{
 addSub:()=>openModal('Add subject',subForm(),d=>{S.subjects.push({id:uid(),name:d.name.trim(),desc:d.desc,color:d.color,hours:clamp(d.hours,0,9999),progress:clamp(d.progress,0,100)});save();R.subjects();toast('Subject added')},'Add subject'),
 editSub:id=>{const s=sub(id);openModal('Edit subject',subForm(s),d=>{Object.assign(s,{name:d.name.trim(),desc:d.desc,color:d.color,hours:clamp(d.hours,0,9999),progress:clamp(d.progress,0,100)});save();R.subjects();toast('Subject updated')})},
 delSub:id=>ask(`Delete “${esc(sub(id).name)}”? Its tasks will move to General.`,()=>{S.subjects=S.subjects.filter(s=>s.id!==id);save();R.subjects();toast('Subject deleted')}),
});

initApp('subjects');
