let curPage='';
/* FocusFlow – Light/dark theme and Chart.js helper */
function applyTheme(t){S.theme=t;document.documentElement.dataset.theme=t;save();applyChartTheme();if(typeof R!=='undefined'&&(curPage==='analytics'||curPage==='dash'))R[curPage]()}
function applyChartTheme(){if(typeof Chart==='undefined')return;const s=getComputedStyle(document.documentElement);Chart.defaults.color=s.getPropertyValue('--mu').trim();Chart.defaults.borderColor=s.getPropertyValue('--bd').trim();Chart.defaults.font.family="'Plus Jakarta Sans',sans-serif"}
const CH={};
function chart(id,cfg){const c=document.getElementById(id);if(!c||typeof Chart==='undefined')return;CH[id]&&CH[id].destroy();cfg.options=Object.assign({responsive:true,maintainAspectRatio:false},cfg.options||{});CH[id]=new Chart(c,cfg)}

document.documentElement.dataset.theme=S.theme;applyChartTheme();
