/* FocusFlow – planner page */
const P={view:'day',date:iso(0)};
R.planner=()=>{const b=pd(P.date),ws=new Date(b);ws.setDate(ws.getDate()-(ws.getDay()+6)%7);
 const days=[...Array(7)].map((_,i)=>{const d=new Date(ws);d.setDate(d.getDate()+i);return fmt(d)});
 const on=S.sessions.filter(s=>s.date===P.date).sort((a,b)=>a.start.localeCompare(b.start));
 const upc=S.sessions.filter(s=>s.date>=iso(0)&&!s.done).sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start)).slice(0,5);
 const card=s=>`<div class="sess ${s.done?'done':''}" style="--c:${sub(s.subj).color}"><button class="chk" data-act="togSess" data-id="${s.id}" aria-label="Toggle complete" style="${s.done?'':''}"><i class="fa-solid fa-check"></i></button><div class="t"><b>${esc(s.title)}</b><small>${t12(s.start)} - ${t12(s.end)} · ${esc(sub(s.subj).name)}</small></div><button class="ib del" data-act="delSess" data-id="${s.id}" aria-label="Delete"><i class="fa-solid fa-trash"></i></button></div>`;
 $('#p-planner').innerHTML=`<div class="ph"><div><h2>Study planner</h2><p class="muted">${S.sessions.filter(s=>s.done).length} of ${S.sessions.length} sessions completed</p></div><div style="display:flex;gap:10px;flex-wrap:wrap"><div class="seg"><button class="${P.view==='day'?'on':''}" data-act="pv" data-id="day">Day</button><button class="${P.view==='week'?'on':''}" data-act="pv" data-id="week">Week</button></div><button class="btn pri" data-act="addSess"><i class="fa-solid fa-plus"></i>Add session</button></div></div>
 <div class="strip"><button class="ib" data-act="shift" data-id="-7" aria-label="Previous week"><i class="fa-solid fa-chevron-left"></i></button>${days.map(d=>`<button class="dayb ${d===P.date?'on':''} ${d===iso(0)?'today':''}" data-act="pd" data-id="${d}">${pd(d).toLocaleDateString('en',{weekday:'short'})}<b>${pd(d).getDate()}</b></button>`).join('')}<button class="ib" data-act="shift" data-id="7" aria-label="Next week"><i class="fa-solid fa-chevron-right"></i></button></div>
 <div class="grid g2" style="grid-template-columns:${P.view==='day'?'2fr 1fr':'1fr'}">
 ${P.view==='day'?`<div class="card"><h3>${pd(P.date).toLocaleDateString('en',{weekday:'long',month:'long',day:'numeric'})}</h3>${on.length?on.map(card).join(''):empty('fa-calendar-plus','Nothing planned','Add a study session for this day.')}</div>
 <div class="card"><h3>Upcoming sessions</h3>${upc.length?upc.map(s=>`<div class="li"><span class="dot" style="--c:${sub(s.subj).color}"></span><div class="t"><b>${esc(s.title)}</b><span class="muted">${nice(s.date)}, ${t12(s.start)}</span></div></div>`).join(''):empty('fa-mug-hot','No upcoming sessions','Enjoy the break.')}</div>`
 :`<div class="card"><div class="wk">${days.map(d=>`<div class="col"><h5>${pd(d).toLocaleDateString('en',{weekday:'short',day:'numeric'})}</h5>${S.sessions.filter(s=>s.date===d).sort((a,b)=>a.start.localeCompare(b.start)).map(s=>`<div class="sess ${s.done?'done':''}" style="--c:${sub(s.subj).color}"><b>${esc(s.title)}</b><small>${t12(s.start)}</small></div>`).join('')||'<span class="muted">Free</span>'}</div>`).join('')}</div></div>`}</div>`};

Object.assign(A,{
 pv:id=>{P.view=id;R.planner()},pd:id=>{P.date=id;R.planner()},
 shift:id=>{const d=pd(P.date);d.setDate(d.getDate()+ +id);P.date=fmt(d);R.planner()},
 addSess:()=>openModal('Add study session',fld('Session title','title','','text','data-req')+slc('Subject','subj',subOpts())+fld('Date','date',P.date,'date','data-req')+fld('Start time','start','09:00','time','data-req')+fld('End time','end','10:00','time','data-req'),d=>{if(d.end<=d.start){toast('End time must be after start time');return false}S.sessions.push({id:uid(),title:d.title.trim(),subj:d.subj,date:d.date,start:d.start,end:d.end,done:false});P.date=d.date;save();R.planner();toast('Session added')},'Add session'),
 togSess:id=>{const s=S.sessions.find(x=>x.id===id);s.done=!s.done;save();R.planner()},
 delSess:id=>ask('Remove this study session from your planner?',()=>{S.sessions=S.sessions.filter(s=>s.id!==id);save();R.planner();toast('Session removed')},'Remove'),
});

initApp('planner');
