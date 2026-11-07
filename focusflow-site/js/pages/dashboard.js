/* FocusFlow – dashboard page */
R.dash=()=>{
 const done=S.tasks.filter(t=>t.done).length,pend=S.tasks.length-done,hrs=S.subjects.reduce((a,s)=>a+ +s.hours,0);
 const score=S.demo?Math.min(99,Math.round(40+done/(S.tasks.length||1)*30+Math.min(hrs,60)/60*29)):Math.min(99,Math.round(done/(S.tasks.length||1)*60+Math.min(hrs,20)/20*39));
 const hr=new Date().getHours(),gr=hr<12?'Good morning':hr<18?'Good afternoon':'Good evening';
 const st=[['fa-clock','Study hours',hrs+'h','#5b5ce6'],['fa-circle-check','Completed tasks',done,'#10b981'],['fa-hourglass-half','Pending tasks',pend,'#f59e0b'],['fa-fire','Study streak',streakDays()+(streakDays()===1?' day':' days'),'#ef4444'],['fa-bolt','Productivity score',score+'%','#8b5cf6']];
 const today=S.sessions.filter(s=>s.date===iso(0)).sort((a,b)=>a.start.localeCompare(b.start));
 const up=S.tasks.filter(t=>!t.done).sort((a,b)=>a.due.localeCompare(b.due)).slice(0,4);
 $('#p-dash').innerHTML=`<div class="ph"><div><h2>${gr}, ${esc(S.user.name.split(' ')[0])} 👋</h2><p class="muted">You have ${pend} pending tasks and ${today.filter(s=>!s.done).length} sessions left today.</p></div><a class="btn pri" href="timer.html"><i class="fa-solid fa-play"></i>Start focus session</a></div>
 ${S.subjects.length||S.tasks.length?'':'<div class="card" style="margin-bottom:18px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;justify-content:space-between"><div><h3 style="margin-bottom:4px">Welcome to FocusFlow</h3><p class="muted">Your workspace is empty. Add a subject first, then plan tasks and study sessions.</p></div><a class="btn pri" href="subjects.html"><i class="fa-solid fa-plus"></i>Add your first subject</a></div>'}
 <div class="grid g4" style="grid-template-columns:repeat(auto-fit,minmax(190px,1fr));margin-bottom:18px">${st.map(s=>`<div class="card stat"><span class="ic" style="background:${s[3]}22;color:${s[3]}"><i class="fa-solid ${s[0]}"></i></span><div><b>${s[2]}</b><span class="muted">${s[1]}</span></div></div>`).join('')}</div>
 <div class="grid g2" style="grid-template-columns:2fr 1fr;margin-bottom:18px" id="dg1"><div class="card"><h3>Weekly study activity</h3><div class="cw"><canvas id="cWeek"></canvas></div></div>
 <div class="card"><h3>Today's schedule</h3>${today.length?today.map(s=>`<div class="li"><span class="dot" style="--c:${sub(s.subj).color}"></span><div class="t"><b>${esc(s.title)}</b><span class="muted">${t12(s.start)} - ${t12(s.end)}</span></div>${s.done?'<i class="fa-solid fa-circle-check" style="color:var(--ok)"></i>':''}</div>`).join(''):empty('fa-calendar','No sessions today','Add one in the planner.')}</div></div>
 <div class="grid g3" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))"><div class="card"><h3>Subject progress</h3>${S.subjects.map(s=>`<div style="margin-bottom:12px"><div class="meta" style="justify-content:space-between;margin-bottom:5px"><b style="color:var(--tx)">${esc(s.name)}</b><span>${s.progress}%</span></div><div class="bar" style="--c:${s.color}"><i style="width:${s.progress}%"></i></div></div>`).join('')||empty('fa-book','No subjects yet','Create your first subject.')}</div>
 <div class="card"><h3>Upcoming deadlines</h3>${up.length?up.map(t=>`<div class="li"><span class="dot" style="--c:${sub(t.subj).color}"></span><div class="t"><b>${esc(t.title)}</b><span class="muted">${dueLabel(t.due)}</span></div><span class="tag p-${t.pri}">${t.pri}</span></div>`).join(''):empty('fa-party-horn','All caught up','No pending deadlines.')}</div>
 <div class="card"><h3>Recent activity</h3>${S.acts.length?S.acts.map(a=>`<div class="li"><span class="ic av" style="width:34px;height:34px"><i class="fa-solid ${a[0]}" style="font-size:.8rem"></i></span><div class="t"><b style="font-weight:600;font-size:.88rem">${esc(a[1])}</b><span class="muted">${a[2]}</span></div></div>`).join(''):empty('fa-clock-rotate-left','No activity yet','Your actions will show up here.')}</div></div>`;
 if(innerWidth<1020)$('#dg1').style.gridTemplateColumns='1fr';
 chart('cWeek',{type:'bar',data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:[{label:'Hours',data:weekData(),backgroundColor:'#7c6cf0',borderRadius:8}]},options:{plugins:{legend:{display:false}}}});
};


let rz;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>R.dash(),250)});
initApp('dash');
