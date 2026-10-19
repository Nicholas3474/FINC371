/* ===== UI ===== */
const KEY='finc371-exam2-v1';
const EXAM_AT=new Date(2026,9,22,13,0,0);
const STATUS=[
 {k:'ns',label:'Not started'},{k:'le',label:'Learning'},{k:'np',label:'Needs practice'},{k:'er',label:'Exam-ready'}];
const PLAN=[
 {day:'Mon · Oct 19',sub:'Tonight, about 2.5 hours. Stop by 11 PM.',items:[
  ['m1','Take the 10-question diagnostic','diag'],
  ['m2','Lesson + practice: Lump sums & compounding','lump'],
  ['m3','Lesson + practice: Annuities & sinking funds','annuity'],
  ['m4','Lesson + practice: NPV, IRR & risk','npv'],
  ['m5','TI-84: open the TVM Solver, set P/Y and C/Y, practice npv( and irr(',null]]},
 {day:'Tue · Oct 20',sub:'About 4 hours, with a break every 50 minutes.',items:[
  ['t1','Mortgage payments & amortization','pay'],
  ['t2','Loan balances, interest & principal (bal, ΣPrn, ΣInt)','bal'],
  ['t3','Refinancing','refi'],
  ['t4','Points & effective interest rate','points'],
  ['t5','Two-step mortgages & ARMs','arm'],
  ['t6','Underwriting ratios: MDR, TDR, LTV, DCR','uw'],
  ['t7','10-question set on your weakest topics','weak'],
  ['t8','Flip through the formula flashcards once','formulas']]},
 {day:'Wed · Oct 21',sub:'About 4.5 hours. Practice exam in the evening.',items:[
  ['w1','Appraisal math','apm'],['w2','Appraisal concepts','apc'],
  ['w3','Mortgage law, markets & regulation','fin'],['w4','Contracts & closings','k'],['w5','Brokerage & agency','brk'],
  ['w6','Timed practice exam: 30 questions, 60 minutes','exam'],
  ['w7','Review every missed question and redo similar ones','mistakes'],
  ['w8','Formula flashcards from memory; lights out by 11 PM',null]]},
 {day:'Thu · Oct 22',sub:'Exam at 1:00 PM.',items:[
  ['h1','9:00–10:15 · Practice whatever is not yet exam-ready','weak'],
  ['h2','10:15–10:45 · Write every formula from memory, check against the flashcards','formulas'],
  ['h3','10:45–11:15 · Short warm-up, then stop','weak'],
  ['h4','By 11:30 · Eat, pack the TI-84 (fresh batteries), arrive early',null]]},
];

const def=()=>({v:1,att:{},read:{},plan:{},mistakes:[],exams:[],updated:0});
let S=def();
try{const t=localStorage.getItem(KEY);if(t)S=Object.assign(def(),JSON.parse(t));}catch(e){}
let dbRef=null,saveT=null;
function save(){
  S.updated=Date.now();
  try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}
  if(dbRef){clearTimeout(saveT);saveT=setTimeout(()=>{dbRef.set(JSON.parse(JSON.stringify(S))).then(()=>sync('Progress saved to your account')).catch(()=>sync('Saved on this device only'));},700);}
}
function sync(t){const el=document.getElementById('sync');if(el)el.textContent=t;}
(async()=>{
  try{
    const db=(window.claude&&window.claude.use)?await window.claude.use('db'):null;
    if(!db){sync('Progress saved on this device');return;}
    dbRef=db.doc('progress/main');
    const snap=await dbRef.get();
    if(snap.exists){const d=snap.data()||{};if((d.updated||0)>(S.updated||0)){S=Object.assign(def(),d);try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}renderAll();}}
    else if(S.updated)save();
    sync('Progress saved to your account');
  }catch(e){dbRef=null;sync('Progress saved on this device');}
})();

/* status: exam-ready requires at least 4 of your last 5 answers correct */
function stats(id){const a=S.att[id]||[];const last=a.slice(-5);const c=last.reduce((x,y)=>x+y,0);return {n:a.length,last,c};}
function status(id){const s=stats(id);
  if(s.n===0)return S.read[id]?'le':'ns';
  if(s.last.length>=5&&s.c>=4)return 'er';
  if(s.c/s.last.length>=0.5)return 'np';
  return 'le';}
function statusHint(id){const s=stats(id),st=status(id);
  if(st==='er')return `${s.c} of your last 5 correct`;
  if(s.n===0)return S.read[id]?'Lesson opened. Answer questions to move up.':'Open the lesson, then practice';
  const need=Math.max(0,5-s.last.length);
  return `${s.c} of last ${s.last.length} correct · need 4 of your last 5${need?` (${need} more to answer)`:''}`;}
function record(q,given){
  const ok=given===q.answer;
  (S.att[q.topic]=S.att[q.topic]||[]).push(ok?1:0);
  if(S.att[q.topic].length>20)S.att[q.topic]=S.att[q.topic].slice(-20);
  if(!ok){S.mistakes.unshift({topic:q.topic,prompt:q.prompt,given:given==null?'(no answer)':q.choices[given],right:q.choices[q.answer],sol:q.sol,t:Date.now()});S.mistakes=S.mistakes.slice(0,40);}
  return ok;}

const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const chip=st=>`<span class="chip chip-${st}">${STATUS.find(x=>x.k===st).label}</span>`;

/* ---------- header ---------- */
function renderHeader(){
  const now=new Date(),ms=EXAM_AT-now;
  let cd;
  if(ms<=0)cd='Exam time. Good luck.';
  else{const h=Math.floor(ms/3.6e6),d=Math.floor(h/24);cd=d>0?`${d} day${d>1?'s':''}, ${h%24} hr until the exam`:`${h} hr ${Math.floor(ms%3.6e6/6e4)} min until the exam`;}
  document.getElementById('countdown').textContent=cd;
  const counts={ns:0,le:0,np:0,er:0};TOPICS.forEach(t=>counts[status(t.id)]++);
  document.getElementById('meter').innerHTML=STATUS.slice().reverse().map(s=>counts[s.k]?`<span class="seg seg-${s.k}" style="flex:${counts[s.k]}" title="${s.label}: ${counts[s.k]}"></span>`:'').join('');
  document.getElementById('meter-legend').innerHTML=STATUS.map(s=>`<span><i class="dot dot-${s.k}"></i>${s.label} <b>${counts[s.k]}</b></span>`).join('');
}
setInterval(renderHeader,30000);

/* ---------- tabs ---------- */
let tab='plan';
try{const h=location.hash.replace('#','');if(h)tab=h;}catch(e){}
function go(t){tab=t;document.querySelectorAll('.tab').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===t));document.querySelectorAll('.panel').forEach(p=>p.hidden=p.id!=='p-'+t);renderPanel(t);window.scrollTo(0,0);}
function renderPanel(t){({plan:renderPlan,topics:renderTopics,practice:renderPractice,exam:renderExam,mistakes:renderMistakes,formulas:renderFormulas}[t]||renderPlan)();}
function renderAll(){renderHeader();renderPanel(tab);}

/* ---------- plan ---------- */
function renderPlan(){
  const el=document.getElementById('p-plan');
  el.innerHTML=`<div class="intro"><p>Plan built on a default of about 2.5 / 4 / 4.5 hours. Tell Claude your real hours and it will reshape this. The exam is <b>all multiple choice</b>, <b>no formula sheet</b>, <b>TI-84 allowed</b>, so every practice question here is multiple choice with TI-84 steps, and the formulas tab drills recall.</p></div>`+
  PLAN.map(d=>{const done=d.items.filter(i=>S.plan[i[0]]).length;return `<section class="day"><header><h3>${d.day}</h3><span class="muted">${d.sub}</span><span class="day-count">${done}/${d.items.length}</span></header><ul class="checks">${d.items.map(([id,txt,link])=>{
    const t=link&&TOPIC[link];
    return `<li><input type="checkbox" id="pl-${id}" data-plan="${id}" ${S.plan[id]?'checked':''}><label for="pl-${id}">${esc(txt)}</label>${t?chip(status(link)):''}${link?`<button class="link" data-go="${link}">${t?'Open':'Start'}</button>`:''}</li>`;}).join('')}</ul></section>`;}).join('')+
  `<section class="notes"><h3>About your materials</h3><ul>
  <li>Source: “FINC 371 - Exam 2” in your Google Drive (a classmate's notes covering Units 6, 8, 9 and Chapters 16–18). Every page was read.</li>
  <li><b>Formulas and figures were images and did not come through.</b> The formulas here are the standard textbook forms, written with your notes' variable names (PV, FV, A, i, n, m). Check them against your slides.</li>
  <li>There is no Unit 7 in the file. Confirm whether it's on the exam.</li>
  <li>Possible errors in the notes are flagged inside each lesson (REIT 90% vs 95%, cost approach $717,500 vs $718,000, the “FVA” label on the loan balance formula).</li></ul></section>`;
}

/* ---------- topics ---------- */
let openTopic=null;
function renderTopics(){
  const el=document.getElementById('p-topics');
  el.innerHTML=`<p class="intro">A topic turns <b>Exam-ready</b> only after you get at least 4 of your last 5 questions on it right. Opening a lesson moves it to Learning.</p>`+
  TOPICS.map(t=>{const st=status(t.id),s=stats(t.id),open=openTopic===t.id;
   return `<article class="topic ${open?'open':''}" id="topic-${t.id}"><button class="topic-row" data-topic="${t.id}" aria-expanded="${open}">
   <span class="topic-unit">${t.unit}</span><span class="topic-name">${t.name}</span>${chip(st)}
   <span class="pips" aria-label="last five answers">${[0,1,2,3,4].map(i=>{const v=s.last[i];return `<i class="pip ${v===1?'ok':v===0?'no':''}"></i>`;}).join('')}</span></button>
   ${open?`<div class="lesson"><p class="hint">${statusHint(t.id)}</p>${LESSONS[t.id]}<div class="lesson-actions"><button class="btn" data-practice="${t.id}">Practice this topic</button></div></div>`:''}</article>`;}).join('');
}

/* ---------- practice ---------- */
let P=null; // {title, qs, i, picked, done, score}
function startPractice(kind){
  let qs=[],title='';
  if(kind==='diag'){title='Diagnostic';qs=['lump','annuity','npv','pay','bal','points','uw','apm','k','brk'].map(makeQ);}
  else if(kind==='weak'){title='Weakest topics';const order=TOPICS.map(t=>({id:t.id,w:{ns:4,le:3,np:2,er:0.5}[status(t.id)]}));
    for(let i=0;i<10;i++){const tot=order.reduce((a,b)=>a+b.w,0);let r=Math.random()*tot;const t=order.find(o=>(r-=o.w)<0)||order[0];qs.push(makeQ(t.id));}}
  else {title=TOPIC[kind].name;qs=Array.from({length:8},()=>makeQ(kind));}
  P={title,qs,i:0,picked:null,done:false,score:0,kind};
  go('practice');
}
function qHTML(q,n,name,picked,reveal){
  return `<div class="q"><div class="q-meta">${n?`<span>${n}</span>`:''}<span>${TOPIC[q.topic].unit} · ${TOPIC[q.topic].name}</span></div>
  <div class="q-prompt">${q.prompt}</div><div class="opts" role="radiogroup">${q.choices.map((c,j)=>{
    let cls='';if(reveal){if(j===q.answer)cls='right';else if(j===picked)cls='wrong';}
    return `<label class="opt ${cls} ${picked===j?'sel':''}"><input type="radio" name="${name}" value="${j}" ${picked===j?'checked':''} ${reveal?'disabled':''}><span class="opt-l">${'ABCD'[j]}</span><span>${c}</span></label>`;}).join('')}</div>
  ${reveal?`<div class="sol ${picked===q.answer?'sol-ok':'sol-no'}"><div class="sol-h">${picked===q.answer?'Correct':'Not quite. The answer is '+'ABCD'[q.answer]}</div>${q.sol}</div>`:''}</div>`;
}
function renderPractice(){
  const el=document.getElementById('p-practice');
  if(!P){
    el.innerHTML=`<div class="starts"><button class="start" data-start="diag"><b>Diagnostic</b><span>10 questions, one per major topic. Start here.</span></button>
    <button class="start" data-start="weak"><b>Weakest topics</b><span>10 questions weighted toward topics that aren't exam-ready.</span></button></div>
    <h3 class="h-sub">Or pick one topic (8 questions)</h3><div class="topic-grid">${TOPICS.map(t=>`<button class="tpick" data-start="${t.id}"><span>${t.name}</span>${chip(status(t.id))}</button>`).join('')}</div>`;
    return;}
  if(P.done){
    el.innerHTML=`<div class="result"><h3>${P.title}: ${P.score} / ${P.qs.length}</h3><p>${P.score/P.qs.length>=0.8?'Strong set.':'Every miss is saved in the Mistakes tab with the full solution.'}</p>
    <div class="btns"><button class="btn" data-start="${P.kind}">Another set</button><button class="btn ghost" data-go="topics">See topic status</button><button class="btn ghost" data-reset-practice>Choose a different set</button></div></div>`;return;}
  const q=P.qs[P.i],rev=P.checked;
  el.innerHTML=`<div class="practice-bar"><b>${P.title}</b><span>Question ${P.i+1} of ${P.qs.length} · ${P.score} correct</span><button class="link" data-reset-practice>Quit</button></div>
  ${qHTML(q,'',`pq`,P.picked,rev)}
  <div class="btns">${rev?`<button class="btn" data-next>${P.i+1<P.qs.length?'Next question':'See results'}</button>`:`<button class="btn" data-check ${P.picked==null?'disabled':''}>Check answer</button>`}</div>`;
}

/* ---------- exam ---------- */
let E=null; // {qs, picks, end, submitted}
function startExam(n,mins){
  const base=['lump','annuity','npv','pay','bal','refi','points','arm','uw','fin','apm','apc','k','brk'];
  const extra=['pay','bal','points','uw','apm','npv','annuity','fin','k','brk','apc','fin','k','brk','uw','apc'];
  const ids=base.concat(extra).slice(0,n);
  E={qs:shuffle(ids.map(makeQ)),picks:{},end:Date.now()+mins*60000,mins,submitted:false};
  go('exam');
}
let examTimer=null;
function renderExam(){
  const el=document.getElementById('p-exam');
  clearInterval(examTimer);
  if(!E){
    const past=S.exams.slice(0,5);
    el.innerHTML=`<div class="intro"><p>Simulates the real thing: multiple choice, no formulas, TI-84 only, no feedback until you submit. Have paper and your calculator ready.</p></div>
    <div class="starts"><button class="start" data-exam="30,60"><b>Full practice exam</b><span>30 questions · 60 minutes</span></button><button class="start" data-exam="15,30"><b>Half exam</b><span>15 questions · 30 minutes</span></button></div>
    ${past.length?`<h3 class="h-sub">Past attempts</h3><table class="tbl"><tr><th>When</th><th>Score</th><th>Time used</th></tr>${past.map(x=>`<tr><td>${new Date(x.t).toLocaleString([], {weekday:'short',hour:'numeric',minute:'2-digit'})}</td><td>${x.score}/${x.n} (${Math.round(x.score/x.n*100)}%)</td><td>${x.used} min</td></tr>`).join('')}</table>`:''}`;
    return;}
  const answered=Object.keys(E.picks).length;
  if(!E.submitted){
    el.innerHTML=`<div class="exam-bar"><span id="clock" class="clock"></span><span>${answered}/${E.qs.length} answered</span><button class="btn" data-submit>Submit exam</button></div>`+
    E.qs.map((q,i)=>qHTML(q,`Q${i+1}`,`ex${i}`,E.picks[i]??null,false)).join('')+`<div class="btns"><button class="btn" data-submit>Submit exam</button></div>`;
    const tick=()=>{const ms=E.end-Date.now();const c=document.getElementById('clock');if(!c)return;
      if(ms<=0){submitExam();return;}
      const m=Math.floor(ms/6e4),s=Math.floor(ms%6e4/1000);c.textContent=`${m}:${String(s).padStart(2,'0')} left`;c.classList.toggle('low',ms<5*6e4);};
    tick();examTimer=setInterval(tick,1000);return;}
  const by={};E.qs.forEach((q,i)=>{const b=by[q.topic]=by[q.topic]||{n:0,c:0};b.n++;if(E.picks[i]===q.answer)b.c++;});
  el.innerHTML=`<div class="result"><h3>Score: ${E.score} / ${E.qs.length} (${Math.round(E.score/E.qs.length*100)}%)</h3><p>Time used: ${E.used} of ${E.mins} minutes. Misses are saved in the Mistakes tab.</p>
  <table class="tbl"><tr><th>Topic</th><th>Correct</th><th>Status now</th></tr>${Object.entries(by).map(([k,v])=>`<tr><td>${TOPIC[k].name}</td><td>${v.c}/${v.n}</td><td>${chip(status(k))}</td></tr>`).join('')}</table>
  <div class="btns"><button class="btn" data-go="mistakes">Review mistakes</button><button class="btn ghost" data-exam-new>Back to exam menu</button></div></div>`+
  E.qs.map((q,i)=>qHTML(q,`Q${i+1}`,`ex${i}`,E.picks[i]??null,true)).join('');
}
function submitExam(){
  if(!E||E.submitted)return;clearInterval(examTimer);
  E.submitted=true;E.used=Math.min(E.mins,Math.ceil((Date.now()-(E.end-E.mins*60000))/6e4));
  E.score=E.qs.reduce((s,q,i)=>s+(record(q,E.picks[i]??null)?1:0),0);
  S.exams.unshift({t:Date.now(),score:E.score,n:E.qs.length,used:E.used});S.exams=S.exams.slice(0,10);
  save();renderHeader();renderExam();window.scrollTo(0,0);
}

/* ---------- mistakes ---------- */
function renderMistakes(){
  const el=document.getElementById('p-mistakes');
  if(!S.mistakes.length){el.innerHTML=`<div class="empty"><h3>No mistakes saved yet</h3><p>Every question you miss in practice or on a practice exam lands here with its full solution, so you can learn from it and retry a fresh version.</p><button class="btn" data-go="practice">Start practicing</button></div>`;return;}
  el.innerHTML=`<p class="intro">${S.mistakes.length} saved. Read the solution, then try a fresh question on the same topic until you get it right.</p>`+
  S.mistakes.map((m,i)=>`<article class="mistake"><div class="q-meta"><span>${TOPIC[m.topic].unit} · ${TOPIC[m.topic].name}</span>${chip(status(m.topic))}</div><div class="q-prompt">${m.prompt}</div>
  <p class="mis-ans"><span class="bad">You chose: ${m.given}</span><span class="good">Answer: ${m.right}</span></p>
  <details><summary>Show solution</summary><div class="sol">${m.sol}</div></details>
  <div class="btns"><button class="btn" data-start="${m.topic}">Try a similar question</button><button class="link" data-dismiss="${i}">Got it, remove</button></div></article>`).join('');
}

/* ---------- formulas ---------- */
let flipped={},showAll=false;
function renderFormulas(){
  const el=document.getElementById('p-formulas');
  el.innerHTML=`<div class="intro"><p>No formula sheet on the exam, so these have to come from memory. Read the prompt, say or write the formula, then tap to check.</p>
  <div class="btns"><button class="btn ghost" data-shuffle>Shuffle cards</button><button class="btn ghost" data-showall>${showAll?'Hide all answers':'Show all answers'}</button></div></div>
  <div class="cards">${FORMULAS.map((f,i)=>{const open=showAll||flipped[i];return `<button class="card ${open?'flip':''}" data-card="${i}"><span class="card-name">${f[0]}</span><span class="card-when">${f[1]}</span><span class="card-eq">${open?f[2]:'Tap to reveal'}</span></button>`;}).join('')}</div>`;
}

/* ---------- events ---------- */
document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  const d=b.dataset;
  if(d.tab){location.hash=d.tab;go(d.tab);}
  else if(d.go){if(TOPIC[d.go]){openTopic=d.go;if(!S.read[d.go]){S.read[d.go]=1;save();renderHeader();}go('topics');setTimeout(()=>{const t=document.getElementById('topic-'+d.go);t&&t.scrollIntoView({block:'start'});},0);}
    else if(d.go==='diag'||d.go==='weak')startPractice(d.go);else if(d.go==='exam'){E=null;go('exam');}else go(d.go);}
  else if(d.topic){openTopic=openTopic===d.topic?null:d.topic;if(openTopic&&!S.read[openTopic]){S.read[openTopic]=1;save();renderHeader();}renderTopics();if(openTopic){const t=document.getElementById('topic-'+openTopic);t&&t.scrollIntoView({block:'start'});}}
  else if(d.practice||d.start)startPractice(d.practice||d.start);
  else if('check' in d){const q=P.qs[P.i];P.checked=true;if(record(q,P.picked))P.score++;save();renderHeader();renderPractice();}
  else if('next' in d){P.i++;P.picked=null;P.checked=false;if(P.i>=P.qs.length)P.done=true;renderPractice();window.scrollTo(0,0);}
  else if('resetPractice' in d){P=null;renderPractice();}
  else if(d.exam){const [n,m]=d.exam.split(',').map(Number);startExam(n,m);}
  else if('submit' in d)submitExam();
  else if('examNew' in d){E=null;renderExam();}
  else if(d.dismiss!=null&&d.dismiss!==''){S.mistakes.splice(+d.dismiss,1);save();renderMistakes();}
  else if(d.card!=null){flipped[d.card]=!flipped[d.card];renderFormulas();}
  else if('shuffle' in d){const s=shuffle(FORMULAS);FORMULAS.splice(0,FORMULAS.length,...s);flipped={};renderFormulas();}
  else if('showall' in d){showAll=!showAll;renderFormulas();}
});
document.addEventListener('change',e=>{
  const t=e.target;
  if(t.dataset.plan){S.plan[t.dataset.plan]=t.checked;save();renderPlan();}
  else if(t.name==='pq'&&P&&!P.checked){P.picked=+t.value;renderPractice();}
  else if(t.name&&t.name.startsWith('ex')&&E&&!E.submitted){E.picks[+t.name.slice(2)]=+t.value;const bar=document.querySelector('.exam-bar span:nth-child(2)');if(bar)bar.textContent=`${Object.keys(E.picks).length}/${E.qs.length} answered`;
    t.closest('.opts').querySelectorAll('.opt').forEach(o=>o.classList.toggle('sel',o.querySelector('input').checked));}
});
renderAll();go(['plan','topics','practice','exam','mistakes','formulas'].includes(tab)?tab:'plan');
