/* FocusFlow – timer page */
const D={focus:25,short:5,long:15},T={mode:'focus',left:1500,run:false,id:null,end:0,subj:''};
const CIRC=2*Math.PI*90;
R.timer=()=>{const fs=S.history.filter(h=>h.at.startsWith(iso(0))).length%4;
 $('#p-timer').innerHTML=`<div class="ph"><h2>Pomodoro timer</h2></div><div class="grid g2"><div class="card tm"><div class="seg">${[['focus','Focus'],['short','Short break'],['long','Long break']].map(m=>`<button data-act="tmode" data-id="${m[0]}" class="${T.mode===m[0]?'on':''}">${m[1]}</button>`).join('')}</div>
 <div class="ring"><svg viewBox="0 0 200 200"><defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b5ce6"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs><circle class="bg" cx="100" cy="100" r="90"/><circle class="fg" id="rfg" cx="100" cy="100" r="90" stroke-dasharray="${CIRC}"/></svg><div class="tx"><b id="tt">25:00</b><span class="muted" id="tl2"></span></div></div>
 <div class="dots" title="Focus sessions in this cycle">${[0,1,2,3].map(i=>`<i class="${i<fs?'on':''}"></i>`).join('')}</div>
 <label class="f" style="max-width:300px;margin:0 auto 16px;text-align:left"><span>Subject for this session</span><select id="tsub"><option value="">General</option>${S.subjects.map(s=>`<option value="${s.id}" ${T.subj===s.id?'selected':''}>${esc(s.name)}</option>`).join('')}</select></label>
 <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button class="btn pri" id="tgo" data-act="tstart"><i class="fa-solid fa-play"></i>Start</button><button class="btn gh" data-act="tpause"><i class="fa-solid fa-pause"></i>Pause</button><button class="btn gh" data-act="treset"><i class="fa-solid fa-rotate-left"></i>Reset</button></div></div>
 <div class="card"><h3>Focus session history</h3>${S.history.length?S.history.slice().reverse().slice(0,8).map(h=>`<div class="li"><span class="ic av" style="width:34px;height:34px"><i class="fa-solid fa-check" style="font-size:.8rem"></i></span><div class="t"><b>${h.min} min focus</b><span class="muted">${esc(h.subj)} · ${esc(h.at)}</span></div></div>`).join(''):empty('fa-stopwatch','No sessions yet','Complete a focus session to see it here.')}<button class="btn gh sm" style="margin-top:14px" data-act="clrHist">Clear history</button></div></div>`;updTimer()};
function updTimer(){const tt=$('#tt');const m=String(Math.floor(T.left/60)).padStart(2,'0')+':'+String(T.left%60).padStart(2,'0');document.title=T.run?`${m} · FocusFlow`:'FocusFlow – Smart Study Planner and Productivity Tracking Platform';if(!tt)return;tt.textContent=m;$('#rfg').style.strokeDashoffset=CIRC*(1-T.left/(D[T.mode]*60));$('#tl2').textContent=T.run?'Running':'Ready'}
const TK='focusflow_timer_'+S.user.email.toLowerCase();
function saveT(){try{localStorage.setItem(TK,JSON.stringify({mode:T.mode,left:T.left,run:T.run,end:T.end,subj:T.subj}))}catch(e){}}
function secsLeft(){return Math.max(0,Math.ceil((T.end-Date.now())/1000))}
function setMode(m){clearInterval(T.id);T.run=false;T.mode=m;T.left=D[m]*60;saveT();R.timer()}
function beep(){if(!S.set.sound)return;try{const c=new(window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.frequency.value=660;g.gain.setValueAtTime(.2,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.8);o.start();o.stop(c.currentTime+.8)}catch(e){}}
function loop(){clearInterval(T.id);T.id=setInterval(tick,1000)}
function tick(){T.left=secsLeft();if(T.left>0)return updTimer();finish()}
function finish(){
 clearInterval(T.id);const was=T.mode;beep();
 if(was==='focus'){const s=S.subjects.find(x=>x.id===T.subj);S.history.push({min:D.focus,subj:s?s.name:'General',at:iso(0)+' '+new Date().toTimeString().slice(0,5)});if(s)s.hours=+(s.hours+D.focus/60).toFixed(1);S.acts.unshift(['fa-clock','Finished a 25 min focus session','Just now']);S.acts=S.acts.slice(0,5);save();
  const n=S.history.filter(h=>h.at.startsWith(iso(0))).length;toast('Focus session complete! Time for a '+(n%4===0?'long':'short')+' break.');setMode(n%4===0?'long':'short')}
 else{toast('Break over. Ready to focus?');setMode('focus')}}
function loadTimer(){try{const o=JSON.parse(localStorage.getItem(TK));if(o)Object.assign(T,o,{id:null})}catch(e){}
 if(T.run){T.left=secsLeft();if(T.left>0)loop();else finish()}}
Object.assign(A,{
 tmode:id=>setMode(id),
 tstart:()=>{if(T.run)return;T.run=true;T.end=Date.now()+T.left*1000;loop();saveT();updTimer()},
 tpause:()=>{if(!T.run)return;clearInterval(T.id);T.left=secsLeft();T.run=false;saveT();updTimer()},
 treset:()=>setMode(T.mode),
 clrHist:()=>ask('Clear all focus session history?',()=>{S.history=[];save();R.timer()},'Clear')
});
document.addEventListener('change',e=>{if(e.target.id==='tsub'){T.subj=e.target.value;saveT()}});
loadTimer();
initApp('timer');
