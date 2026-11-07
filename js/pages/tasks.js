/* FocusFlow – tasks page */
const F={q:'',st:'all',pr:'all'};
R.tasks=()=>{$('#p-tasks').innerHTML=`<div class="ph"><div><h2>Tasks</h2><p class="muted" id="tcount"></p></div><button class="btn pri" data-act="addTask"><i class="fa-solid fa-plus"></i>Add task</button></div>
 <div class="toolbar"><input class="search" id="tq" placeholder="Search tasks..." value="${esc(F.q)}" aria-label="Search tasks"><select class="search" id="ts" aria-label="Status"><option value="all">All statuses</option><option value="pending">Pending</option><option value="done">Completed</option></select><select class="search" id="tp" aria-label="Priority"><option value="all">All priorities</option><option>High</option><option>Medium</option><option>Low</option></select></div><div id="tlist"></div>`;
 $('#ts').value=F.st;$('#tp').value=F.pr;tlist()};
function tlist(){const q=F.q.toLowerCase();const L=S.tasks.filter(t=>(!q||(t.title+t.desc).toLowerCase().includes(q))&&(F.st==='all'||(F.st==='done')===t.done)&&(F.pr==='all'||t.pri===F.pr)).sort((a,b)=>a.done-b.done||a.due.localeCompare(b.due));
 $('#tcount').textContent=`${S.tasks.filter(t=>!t.done).length} pending, ${S.tasks.filter(t=>t.done).length} completed`;
 $('#tlist').innerHTML=L.length?L.map(t=>`<div class="task ${t.done?'done':''}"><button class="chk" data-act="togTask" data-id="${t.id}" aria-label="Mark complete"><i class="fa-solid fa-check"></i></button><div class="tb"><h4>${esc(t.title)}</h4><p>${esc(t.desc)}</p><div class="meta"><span class="tag" style="--c:${sub(t.subj).color}">${esc(sub(t.subj).name)}</span><span class="tag p-${t.pri}">${t.pri}</span><span><i class="fa-regular fa-calendar"></i> ${t.done?'Done · '+nice(t.due):dueLabel(t.due)}</span></div></div><div><button class="ib" data-act="editTask" data-id="${t.id}" aria-label="Edit"><i class="fa-solid fa-pen"></i></button><button class="ib del" data-act="delTask" data-id="${t.id}" aria-label="Delete"><i class="fa-solid fa-trash"></i></button></div></div>`).join(''):empty('fa-magnifying-glass','No tasks found','Try a different search or filter, or add a new task.')}
function taskForm(t={}){return fld('Title','title',t.title,'text','data-req')+fld('Description','desc',t.desc)+slc('Subject','subj',subOpts(),t.subj)+slc('Priority','pri',['High','Medium','Low'],t.pri||'Medium')+fld('Deadline','due',t.due||iso(3),'date','data-req')}

Object.assign(A,{
 addTask:()=>openModal('Add task',taskForm(),d=>{S.tasks.push({id:uid(),title:d.title.trim(),desc:d.desc,subj:d.subj,pri:d.pri,due:d.due,done:false});save();R.tasks();toast('Task added')},'Add task'),
 editTask:id=>{const t=S.tasks.find(x=>x.id===id);openModal('Edit task',taskForm(t),d=>{Object.assign(t,{title:d.title.trim(),desc:d.desc,subj:d.subj,pri:d.pri,due:d.due});save();tlist();toast('Task updated')})},
 delTask:id=>ask('This task will be permanently removed.',()=>{S.tasks=S.tasks.filter(t=>t.id!==id);save();tlist();toast('Task deleted')}),
 togTask:id=>{const t=S.tasks.find(x=>x.id===id);t.done=!t.done;if(t.done){S.acts.unshift(['fa-check',`Completed “${t.title}”`,'Just now']);S.acts=S.acts.slice(0,5)}save();tlist();toast(t.done?'Task marked as completed':'Task reopened')},
});
document.addEventListener('input',e=>{if(e.target.id==='tq'){F.q=e.target.value;tlist()}});
document.addEventListener('change',e=>{if(e.target.id==='ts'){F.st=e.target.value;tlist()}if(e.target.id==='tp'){F.pr=e.target.value;tlist()}});
initApp('tasks');
