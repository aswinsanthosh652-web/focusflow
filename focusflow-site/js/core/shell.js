/* FocusFlow – App shell: auth guard, sidebar, topbar, page bootstrap */
const PAGES=[['dash','Dashboard','fa-chart-pie','dashboard.html'],['subjects','Subjects','fa-book-open','subjects.html'],['tasks','Tasks','fa-list-check','tasks.html'],['planner','Study Planner','fa-calendar-days','planner.html'],['timer','Pomodoro Timer','fa-stopwatch','timer.html'],['analytics','Analytics','fa-chart-line','analytics.html'],['profile','Profile & Settings','fa-user-gear','profile.html']];
function userUI(){const u=S.user,a=$('#sAv');if(!a)return;a.innerHTML=avatar(u);$('#sNm').textContent=u.name;$('#sEm').textContent=u.email}
function initApp(id){
 if(!S.auth){location.replace('login.html');return}
 curPage=id;const pg=PAGES.find(x=>x[0]===id);document.title=pg[1]+' · FocusFlow';
 $('#side').innerHTML=`<a class="logo" href="index.html"><i class="fa-solid fa-bullseye"></i>FocusFlow</a><nav>${PAGES.map(p=>`<a class="ni ${p[0]===id?'on':''}" href="${p[3]}" ${p[0]===id?'aria-current="page"':''}><i class="fa-solid ${p[2]}"></i>${p[1]}</a>`).join('')}</nav><div class="uchip"><span class="av" id="sAv"></span><div><b id="sNm"></b><span class="muted" id="sEm" style="font-size:.75rem"></span></div></div>`;
 $('#topbar').innerHTML=`<button class="ib" id="menu" data-act="menu" aria-label="Menu"><i class="fa-solid fa-bars"></i></button><h1>${pg[1]}</h1><button class="ib" data-act="theme" aria-label="Toggle theme"><i class="fa-solid fa-circle-half-stroke"></i></button><a class="ib" style="display:grid;place-items:center" href="index.html" aria-label="Back to website" title="Back to website"><i class="fa-solid fa-house"></i></a>`;
 userUI();R[id]();showFlash();
}
