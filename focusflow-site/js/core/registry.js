/* FocusFlow – Page renderer registry and helpers shared by app pages */
const R={};
const lerp=(a,b)=>a;
const empty=(i,t,s)=>`<div class="empty"><i class="fa-solid ${i}"></i><b style="color:var(--tx)">${t}</b><p>${s}</p></div>`;
function dueLabel(d){const n=Math.round((pd(d)-pd(iso(0)))/864e5);return n<0?`Overdue by ${-n}d (${nice(d)})`:n===0?'Due today':n===1?'Due tomorrow':`Due ${nice(d)} (${n}d)`}
