/* FocusFlow – analytics page */
R.analytics=()=>{const done=S.tasks.filter(t=>t.done).length,pend=S.tasks.length-done;
 const wk=weekData(),tw=wk.reduce((x,y)=>x+y,0),goal=+S.user.goal||10;let cards,monthly,daily,heat,studied;
 if(S.demo){cards=[['Study hours','26.4h','+12% vs last week',1],['Tasks completed',done+' tasks','+3 vs last week',1],['Avg. focus session','27 min','-2 min vs last week',0]];monthly=[62,70,68,82];daily=[2,3.5,4,2.5,5,4.5,6,3,4,5.5,3.5,4.8,6.2,3.2];heat=[...Array(28)].map((_,i)=>[.15,.45,.7,1,.3,.85,.55][(i*3+i%5)%7]);studied=24}
 else{const i=(new Date().getDay()+6)%7,lw=sumDays(-i-7,-i-1),df=+(tw-lw).toFixed(1),avg=S.history.length?Math.round(S.history.reduce((x,h)=>x+h.min,0)/S.history.length):0;
  cards=[['Study hours',tw.toFixed(1)+'h',(df>=0?'+':'')+df+'h vs last week',df>=0?1:0],['Tasks completed',done+' tasks',pend+' still pending',1],['Avg. focus session',avg+' min',S.history.length+' sessions in total',1]];
  monthly=[3,2,1,0].map(w=>Math.min(100,Math.round(sumDays(-w*7-6,-w*7)/goal*100)));daily=[...Array(14)].map((_,i)=>+hoursOn(iso(i-13)).toFixed(1));
  heat=[...Array(28)].map((_,i)=>{const h=hoursOn(iso(i-27));return h>0?Math.min(1,.3+h/4):.08});studied=heat.filter(o=>o>.1).length}
 $('#p-analytics').innerHTML=`<div class="ph"><h2>Analytics</h2></div>
 <div class="grid g3" style="margin-bottom:18px">${cards.map(c=>`<div class="card cmp"><span class="muted">${c[0]}</span><br><b>${c[1]}</b> <span class="${c[3]?'up':'dn'}"><i class="fa-solid fa-arrow-${c[3]?'up':'down'}"></i> ${c[2]}</span></div>`).join('')}</div>
 <div class="grid g2" style="margin-bottom:18px"><div class="card"><h3>Weekly study hours</h3><div class="cw"><canvas id="aW"></canvas></div></div><div class="card"><h3>Monthly productivity</h3><div class="cw"><canvas id="aM"></canvas></div></div>
 <div class="card"><h3>Subject distribution</h3>${S.subjects.length?'<div class="cw"><canvas id="aS"></canvas></div>':empty('fa-chart-pie','No subjects yet','Add subjects to see your study distribution.')}</div><div class="card"><h3>Completed vs pending tasks</h3>${S.tasks.length?'<div class="cw"><canvas id="aT"></canvas></div>':empty('fa-list-check','No tasks yet','Add tasks to compare completed and pending work.')}</div>
 <div class="card"><h3>Daily activity trend</h3><div class="cw"><canvas id="aD"></canvas></div></div><div class="card"><h3>Study consistency (last 28 days)</h3><div class="heat">${heat.map((o,i)=>`<i title="Day ${i+1}" style="opacity:${o}"></i>`).join('')}</div><p class="muted" style="margin-top:12px">You studied on ${studied} of the last 28 days. Darker cells mean more hours.</p></div></div>`;
 chart('aW',{type:'bar',data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:[{label:'Hours',data:wk,backgroundColor:'#5b5ce6',borderRadius:8}]},options:{plugins:{legend:{display:false}}}});
 chart('aM',{type:'line',data:{labels:['Week 1','Week 2','Week 3','Week 4'],datasets:[{label:'Productivity %',data:monthly,borderColor:'#8b5cf6',backgroundColor:'#8b5cf622',fill:true,tension:.4}]},options:{plugins:{legend:{display:false}},scales:{y:{min:0,max:100}}}});
 chart('aS',{type:'doughnut',data:{labels:S.subjects.map(s=>s.name),datasets:[{data:S.subjects.map(s=>+s.hours),backgroundColor:S.subjects.map(s=>s.color),borderWidth:0}]},options:{plugins:{legend:{position:'bottom'}},cutout:'62%'}});
 chart('aT',{type:'doughnut',data:{labels:['Completed','Pending'],datasets:[{data:[done,pend],backgroundColor:['#10b981','#f59e0b'],borderWidth:0}]},options:{plugins:{legend:{position:'bottom'}},cutout:'62%'}});
 chart('aD',{type:'line',data:{labels:[...Array(14)].map((_,i)=>nice(iso(i-13))),datasets:[{label:'Hours',data:daily,borderColor:'#3b82f6',backgroundColor:'#3b82f622',fill:true,tension:.35,pointRadius:3}]},options:{plugins:{legend:{display:false}},scales:{x:{ticks:{maxTicksLimit:7}}}}})};



initApp('analytics');
