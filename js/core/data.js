/* FocusFlow – Sample data and localStorage persistence */
function seed(){return{auth:true,demo:true,joined:'September 2025',theme:matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light',
 user:{name:'Alex Morgan',email:'demo@focusflow.app',bio:'Computer science student preparing for finals.',goal:'20',avatar:''},
 set:{email:true,push:true,weekly:false,sound:true},
 subjects:[
  {id:'s1',name:'Mathematics',desc:'Calculus II and linear algebra',color:'#5b5ce6',hours:42,progress:78},
  {id:'s2',name:'Physics',desc:'Mechanics and thermodynamics',color:'#3b82f6',hours:31,progress:64},
  {id:'s3',name:'Computer Science',desc:'Algorithms and data structures',color:'#8b5cf6',hours:38,progress:85},
  {id:'s4',name:'Literature',desc:'20th century novels and essays',color:'#ec4899',hours:18,progress:45},
  {id:'s5',name:'Chemistry',desc:'Organic chemistry basics',color:'#14b8a6',hours:24,progress:58}],
 tasks:[
  {id:'t1',title:'Finish calculus problem set 6',desc:'Chapters 7 and 8, integration by parts',subj:'s1',pri:'High',due:iso(1),done:false},
  {id:'t2',title:'Lab report: pendulum motion',desc:'Include error analysis and graphs',subj:'s2',pri:'High',due:iso(2),done:false},
  {id:'t3',title:'Implement binary search tree',desc:'Insert, delete and traversal in Python',subj:'s3',pri:'Medium',due:iso(4),done:false},
  {id:'t4',title:'Read chapters 5-7 of Mrs Dalloway',desc:'Take notes on narrative style',subj:'s4',pri:'Low',due:iso(6),done:false},
  {id:'t5',title:'Revise reaction mechanisms',desc:'SN1, SN2 and elimination flashcards',subj:'s5',pri:'Medium',due:iso(3),done:false},
  {id:'t6',title:'Submit linear algebra quiz',desc:'Eigenvalues and eigenvectors',subj:'s1',pri:'Medium',due:iso(-1),done:true},
  {id:'t7',title:'Summarise thermodynamics laws',desc:'One page cheat sheet',subj:'s2',pri:'Low',due:iso(-2),done:true},
  {id:'t8',title:'Complete graph algorithms quiz',desc:'BFS, DFS and Dijkstra',subj:'s3',pri:'High',due:iso(-3),done:true}],
 sessions:[
  {id:'e1',title:'Integration practice',subj:'s1',date:iso(0),start:'09:00',end:'10:30',done:true},
  {id:'e2',title:'Pendulum lab write-up',subj:'s2',date:iso(0),start:'13:00',end:'14:30',done:false},
  {id:'e3',title:'BST implementation',subj:'s3',date:iso(0),start:'17:00',end:'18:30',done:false},
  {id:'e4',title:'Reaction mechanisms',subj:'s5',date:iso(1),start:'10:00',end:'11:30',done:false},
  {id:'e5',title:'Reading: Mrs Dalloway',subj:'s4',date:iso(1),start:'16:00',end:'17:00',done:false},
  {id:'e6',title:'Linear algebra review',subj:'s1',date:iso(2),start:'09:30',end:'11:00',done:false},
  {id:'e7',title:'Thermo problem set',subj:'s2',date:iso(3),start:'14:00',end:'15:30',done:false},
  {id:'e8',title:'Graph algorithms',subj:'s3',date:iso(-1),start:'11:00',end:'12:30',done:true}],
 history:[{min:25,subj:'Mathematics',at:iso(0)+' 09:05'},{min:25,subj:'Mathematics',at:iso(0)+' 09:35'},{min:25,subj:'Computer Science',at:iso(-1)+' 16:10'}],
 acts:[['fa-check','Completed “Submit linear algebra quiz”','2h ago'],['fa-clock','Finished a 25 min focus session','3h ago'],['fa-book','Added Chemistry to subjects','Yesterday'],['fa-fire','Reached a 12-day streak','Yesterday']]}}
/* ---- Accounts: every user gets their own record in localStorage (demo only, NOT secure) ---- */
const KEY_SESSION='focusflow_session',THEME_KEY='focusflow_theme',DEMO_EMAIL='demo@focusflow.app';
const UKEY=e=>'focusflow_u_'+String(e).trim().toLowerCase();
const hash=s=>{let h=5381;for(const c of String(s))h=((h<<5)+h+c.charCodeAt(0))|0;return String(h)};
function loadUser(e){try{return JSON.parse(localStorage.getItem(UKEY(e)))}catch(x){return null}}
function blank(name,email){return{auth:true,demo:false,joined:new Date().toLocaleDateString('en',{month:'long',year:'numeric'}),theme:'light',user:{name,email,bio:'',goal:'10',avatar:''},set:{email:true,push:true,weekly:false,sound:true},subjects:[],tasks:[],sessions:[],history:[],acts:[]}}
function ensureDemo(){if(!loadUser(DEMO_EMAIL)){const d=seed();d.pw=hash('demo123');try{localStorage.setItem(UKEY(DEMO_EMAIL),JSON.stringify(d))}catch(e){}}}
function startSession(e){try{localStorage.setItem(KEY_SESSION,String(e).trim().toLowerCase())}catch(x){}}
function endSession(){try{localStorage.removeItem(KEY_SESSION);localStorage.removeItem('focusflow_timer_'+S.user.email.toLowerCase())}catch(x){}}
function changeEmail(n){const o=S.user.email;if(n.toLowerCase()===o.toLowerCase())return true;if(loadUser(n)){toast('That email is already registered.');return false}try{localStorage.removeItem(UKEY(o));localStorage.setItem(KEY_SESSION,n.toLowerCase())}catch(x){}return true}
let S=null;
try{const e=localStorage.getItem(KEY_SESSION);if(e)S=loadUser(e)}catch(x){}
if(S&&S.subjects){S.auth=true}else{S=blank('','');S.auth=false}
try{S.theme=localStorage.getItem(THEME_KEY)||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch(x){}
const save=()=>{try{localStorage.setItem(THEME_KEY,S.theme);if(S.auth&&S.user.email)localStorage.setItem(UKEY(S.user.email),JSON.stringify(S))}catch(e){}};
const sub=id=>S.subjects.find(s=>s.id===id)||{name:'General',color:'#8b5cf6'};
const WEEK=[3.5,4.2,2.8,5.1,4.6,6.0,3.2];

/* ---- Stats derived from the user's own focus history (demo account keeps its sample numbers) ---- */
const hoursOn=d=>S.history.filter(h=>h.at.startsWith(d)).reduce((a,h)=>a+h.min/60,0);
const sumDays=(from,to)=>{let s=0;for(let k=from;k<=to;k++)s+=hoursOn(iso(k));return s};
const weekHours=()=>{const i=(new Date().getDay()+6)%7;return [...Array(7)].map((_,k)=>+hoursOn(iso(k-i)).toFixed(1))};
function streak(){let d=hoursOn(iso(0))>0?0:1,n=0;while(hoursOn(iso(-d-n))>0)n++;return n}
const weekData=()=>S.demo?WEEK:weekHours();
const streakDays=()=>S.demo?12:streak();
