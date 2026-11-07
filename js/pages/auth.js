/* FocusFlow – Login and register forms (demo only, nothing is sent anywhere) */
function validate(f,rules){let ok=true;$$('.err',f).forEach(e=>{e.classList.add('hide')});
 rules.forEach(([n,test,msg])=>{const i=f.elements[n],e=i.closest('label').nextElementSibling;if(!test(i.value.trim(),f)){ok=false;e.textContent=msg;e.classList.remove('hide')}});return ok}

function setErr(f,n,m){const e=f.elements[n].closest('label').nextElementSibling;e.textContent=m;e.classList.remove('hide')}
if($('#fl'))$('#fl').onsubmit=e=>{e.preventDefault();const f=e.target;if(!validate(f,[['email',mailOk,'Enter a valid email address.'],['password',v=>v.length>=6,'Password must be at least 6 characters.']]))return;
 const em=f.email.value.trim(),u=loadUser(em);
 if(!u)return setErr(f,'email','No account found for this email. Register first, or use the demo account.');
 if(u.pw!==hash(f.password.value))return setErr(f,'password','Incorrect password.');
 startSession(em);flash('Welcome back, '+u.user.name.split(' ')[0]+'!');enter()};
if($('#fr'))$('#fr').onsubmit=e=>{e.preventDefault();const f=e.target;if(!validate(f,[['name',v=>v.length>=2,'Enter your full name.'],['email',mailOk,'Enter a valid email address.'],['password',v=>v.length>=6,'Password must be at least 6 characters.'],['confirm',(v,f)=>v===f.password.value,'Passwords do not match.']]))return;
 const em=f.email.value.trim();
 if(loadUser(em))return setErr(f,'email','An account with this email already exists. Log in instead.');
 const u=blank(f.name.value.trim(),em);u.pw=hash(f.password.value);
 try{localStorage.setItem(UKEY(em),JSON.stringify(u))}catch(x){}
 startSession(em);flash('Account created. Welcome to FocusFlow!');enter()};
ensureDemo();showFlash();
