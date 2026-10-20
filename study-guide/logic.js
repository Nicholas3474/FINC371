/* ===== Pure logic: math, topics, question generators (no DOM) ===== */
const rnd=(a,b)=>a+Math.random()*(b-a);
const ri=(a,b)=>Math.floor(rnd(a,b+1));
const rs=(a,b,s)=>{const k=Math.round((b-a)/s);return +(a+ri(0,k)*s).toFixed(6);};
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const com=(x,d=2)=>Number(x).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
const $m=x=>(x<0?'−$':'$')+com(Math.abs(x),2);
const $0=x=>(x<0?'−$':'$')+com(Math.abs(x),0);
const pc=x=>(+(+x).toFixed(4)).toString()+'%';
const dec=x=>(+(x/100).toFixed(6)).toString();
const f6=x=>x.toFixed(6);

const PMT=(P,r,n)=>r===0?P/n:P*r/(1-Math.pow(1+r,-n));
const PVA=(A,r,n)=>r===0?A*n:A*(1-Math.pow(1+r,-n))/r;
const FVA=(A,r,n)=>A*(Math.pow(1+r,n)-1)/r;
const BAL=(P,r,n,k)=>PVA(PMT(P,r,n),r,n-k);
const NPER=(B,r,A)=>-Math.log(1-B*r/A)/Math.log(1+r);
function solveRate(f,lo=1e-7,hi=1){for(let i=0;i<200;i++){const m=(lo+hi)/2;if(f(m)>0)lo=m;else hi=m;}return (lo+hi)/2;}
const npvAt=(r,c0,cfs)=>c0+cfs.reduce((s,c,t)=>s+c/Math.pow(1+r,t+1),0);

/* TI-84 keystroke helpers */
function tvm(o){
  const v=x=>x===null?'<b>0 (solve)</b>':(typeof x==='number'?(+x.toFixed(4)).toLocaleString('en-US',{maximumFractionDigits:4}):x);
  const order=['N','I%','PV','PMT','FV'];
  const cells=order.map(k=>`${k}=${o.solve===k?'<b>?</b>':v(o[k])}`).join(' · ');
  return `<div class="keys"><span class="keys-h">TI-84</span>APPS → 1:Finance → 1:TVM Solver<br>${cells} · P/Y=${o.PY} · C/Y=${o.PY} · PMT:END<br>Move the cursor to <b>${o.solve}</b>, press <kbd>ALPHA</kbd> <kbd>ENTER</kbd> (SOLVE).${o.after?'<br>'+o.after:''}</div>`;
}
const tiLine=(s)=>`<div class="keys"><span class="keys-h">TI-84</span>${s}</div>`;

const TOPICS=[
 {id:'k',unit:'Ch 6',name:'Contracts & closings',quant:false},
 {id:'kt6',unit:'Ch 6',name:'Key terms: contracts & closings',quant:false,kt:6},
 {id:'brk',unit:'Ch 8',name:'Brokerage & agency',quant:false},
 {id:'kt8',unit:'Ch 8',name:'Key terms: brokerage',quant:false,kt:8},
 {id:'apc',unit:'Ch 9',name:'Appraisal concepts',quant:false},
 {id:'apm',unit:'Ch 9',name:'Appraisal math',quant:true},
 {id:'kt9',unit:'Ch 9',name:'Key terms: appraisal',quant:false,kt:9},
 {id:'fin',unit:'Ch 16',name:'Mortgage law, markets & regulation',quant:false},
 {id:'uw',unit:'Ch 16',name:'Underwriting ratios: MDR, TDR, LTV, DCR',quant:true},
 {id:'kt16',unit:'Ch 16',name:'Key terms: financing',quant:false,kt:16},
 {id:'lump',unit:'Ch 17',name:'Lump sums & compounding',quant:true},
 {id:'annuity',unit:'Ch 17',name:'Annuities & sinking funds',quant:true},
 {id:'npv',unit:'Ch 17',name:'NPV, IRR & risk',quant:true},
 {id:'kt17',unit:'Ch 17',name:'Key terms: risk, return & TVM',quant:false,kt:17},
 {id:'pay',unit:'Ch 18',name:'Mortgage payments & amortization',quant:true},
 {id:'bal',unit:'Ch 18',name:'Loan balances, interest & principal',quant:true},
 {id:'refi',unit:'Ch 18',name:'Refinancing',quant:true},
 {id:'points',unit:'Ch 18',name:'Points & effective interest rate',quant:true},
 {id:'arm',unit:'Ch 18',name:'Two-step mortgages & ARMs',quant:true},
 {id:'kt18',unit:'Ch 18',name:'Key terms: mortgage mechanics',quant:false,kt:18},
];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const TOPIC=Object.fromEntries(TOPICS.map(t=>[t.id,t]));

/* Build a multiple-choice question from a numeric answer plus mistake-based distractors */
function fmtU(v,u){if(u==='$')return $m(v);if(u==='%')return v.toFixed(2)+'%';if(u==='mo')return v.toFixed(1)+' months';if(u==='x')return v.toFixed(2)+'×';return String(v);}
function numQ(topic,prompt,ans,unit,sol,wrong=[],allowNeg=false){
  const gap=unit==='%'?0.15:unit==='mo'?3:unit==='x'?0.04:Math.max(Math.abs(ans)*0.02,2);
  const out=[ans];
  const ok=v=>isFinite(v)&&(allowNeg||v>0)&&out.every(o=>Math.abs(o-v)>gap)&&fmtU(v,unit)!==fmtU(ans,unit);
  for(const w of wrong){if(out.length<4&&ok(w))out.push(w);}
  let g=0;
  while(out.length<4&&g++<200){
    let v;
    if(unit==='%')v=ans+pick([-1,1])*rs(0.25,Math.max(1.75,Math.abs(ans)*0.08),0.125);
    else if(unit==='x')v=ans+pick([-1,1])*rs(0.05,0.3,0.01);
    else if(allowNeg&&Math.abs(ans)<5000)v=ans+pick([-1,1])*rs(500,6000,250);
    else v=ans*(1+pick([-1,1])*rs(0.04,0.2,0.01));
    if(ok(v))out.push(v);
  }
  const opts=shuffle(out.map((v,i)=>({t:fmtU(v,unit),c:i===0})));
  return {topic,prompt,choices:opts.map(o=>o.t),answer:opts.findIndex(o=>o.c),sol};
}
function mcQ(topic,item){
  const [q,choices,why]=item;
  const opts=shuffle(choices.map((t,i)=>({t,c:i===0})));
  return {topic,prompt:q,choices:opts.map(o=>o.t),answer:opts.findIndex(o=>o.c),sol:why};
}

/* ===== Numeric generators ===== */
const GEN={
lump:[
()=>{const PV=ri(5,90)*1000,i=rs(3,12,0.5),n=ri(3,15),F=Math.pow(1+i/100,n),FV=PV*F;
 return numQ('lump',`You buy land for ${$0(PV)}. It appreciates ${i}% per year, compounded annually. What is it worth in ${n} years?`,FV,'$',
 `<p>Single amount growing forward, so use FV of a lump sum.</p><p class="eq">FV = PV(1 + i)<sup>n</sup> = ${$0(PV)} × (1 + ${dec(i)})<sup>${n}</sup> = ${$0(PV)} × ${f6(F)} = <b>${$m(FV)}</b></p>`+tvm({N:n,'I%':i,PV:-PV,PMT:0,FV:null,PY:1,solve:'FV'}),
 [PV*(1+i/100*n),PV/F,PV*Math.pow(1+i/100,n-1)]);},
()=>{const FV=ri(20,300)*1000,i=rs(4,14,0.5),n=ri(3,15),F=Math.pow(1+i/100,n),PV=FV/F;
 return numQ('lump',`An investment will pay ${$0(FV)} in ${n} years. If you require a ${i}% annual return, what is the most you should pay today?`,PV,'$',
 `<p>Bringing one future amount back to today is discounting: PV of a lump sum.</p><p class="eq">PV = FV / (1 + i)<sup>n</sup> = ${$0(FV)} / ${f6(F)} = <b>${$m(PV)}</b></p>`+tvm({N:n,'I%':i,PV:null,PMT:0,FV:FV,PY:1,solve:'PV'})+`<p class="muted">The TI-84 shows PV as negative (cash you pay out). The size is what matters.</p>`,
 [FV/(1+i/100*n),FV*Math.pow(1-i/100,n)*1.0001,FV/Math.pow(1+i/100,n+1)]);},
()=>{const PV=ri(2,50)*1000,i=rs(3,9,0.25),y=ri(2,10),F=Math.pow(1+i/1200,12*y),FV=PV*F;
 return numQ('lump',`You deposit ${$0(PV)} in an account paying ${i}% per year, <b>compounded monthly</b>. What is the balance after ${y} years?`,FV,'$',
 `<p>Monthly compounding: divide the annual rate by m = 12 and multiply years by 12.</p><p class="eq">FV = PV(1 + i/m)<sup>n·m</sup> = ${$0(PV)} × (1 + ${dec(i)}/12)<sup>${12*y}</sup> = ${$0(PV)} × ${f6(F)} = <b>${$m(FV)}</b></p>`+tvm({N:12*y,'I%':i,PV:-PV,PMT:0,FV:null,PY:12,solve:'FV'}),
 [PV*Math.pow(1+i/100,y),PV*Math.pow(1+i/1200,y),PV*(1+i/100*y)]);},
()=>{const c=[ri(2,20)*250,ri(2,20)*250,ri(2,20)*250],i=rs(5,14,0.5),pv=c.map((x,t)=>x/Math.pow(1+i/100,t+1)),T=pv.reduce((a,b)=>a+b,0);
 return numQ('lump',`An investment pays ${$0(c[0])} at the end of year 1, ${$0(c[1])} at the end of year 2 and ${$0(c[2])} at the end of year 3. At a ${i}% discount rate, what is the present value of this stream?`,T,'$',
 `<p>Unequal cash flows are not an annuity. Discount each one separately and add.</p><p class="eq">${c.map((x,t)=>`${$0(x)}/(1+${dec(i)})<sup>${t+1}</sup> = ${$m(pv[t])}`).join('<br>')}<br>Total = <b>${$m(T)}</b></p>`+tiLine(`APPS → Finance → <b>npv(</b>${i}, 0, {${c.join(', ')}}) ENTER`),
 [c[0]+c[1]+c[2],(c[0]+c[1]+c[2])/Math.pow(1+i/100,3),T*(1+i/100)]);},
()=>{const PV=ri(50,300)*1000,n=ri(3,12),g=rs(2,9,0.5),FV=Math.round(PV*Math.pow(1+g/100,n)/100)*100,ans=(Math.pow(FV/PV,1/n)-1)*100;
 return numQ('lump',`You bought a lot for ${$0(PV)} and sold it ${n} years later for ${$0(FV)}. What annual compound rate of return did you earn?`,ans,'%',
 `<p>Solve the FV equation for i.</p><p class="eq">i = (FV/PV)<sup>1/n</sup> − 1 = (${$0(FV)}/${$0(PV)})<sup>1/${n}</sup> − 1 = <b>${ans.toFixed(2)}%</b></p>`+tvm({N:n,'I%':null,PV:-PV,PMT:0,FV:FV,PY:1,solve:'I%'}),
 [((FV/PV-1)/n)*100,(Math.pow(FV/PV,1/(n+1))-1)*100,((FV-PV)/FV)*100/n]);},
],
annuity:[
()=>{const A=ri(2,30)*500,i=rs(4,12,0.5),n=ri(5,25),F=(1-Math.pow(1+i/100,-n))/(i/100),V=A*F;
 return numQ('annuity',`A property will produce ${$0(A)} of cash flow at the end of each year for ${n} years. If you require ${i}%, what is that income stream worth today?`,V,'$',
 `<p>Equal payments at the end of each period = ordinary annuity. You want today's value, so PVA.</p><p class="eq">PVA = A × [1 − 1/(1+i)<sup>n</sup>] / i = ${$0(A)} × ${f6(F)} = <b>${$m(V)}</b></p>`+tvm({N:n,'I%':i,PV:null,PMT:A,FV:0,PY:1,solve:'PV'}),
 [A*n,FVA(A,i/100,n),V*(1+i/100)]);},
()=>{const A=ri(2,30)*500,i=rs(3,10,0.5),n=ri(5,25),F=(Math.pow(1+i/100,n)-1)/(i/100),V=A*F;
 return numQ('annuity',`You deposit ${$0(A)} at the end of every year for ${n} years into an account earning ${i}%. What is the balance right after the last deposit?`,V,'$',
 `<p>A series of equal deposits accumulated forward = FV of an annuity.</p><p class="eq">FVA = A × [(1+i)<sup>n</sup> − 1] / i = ${$0(A)} × ${f6(F)} = <b>${$m(V)}</b></p>`+tvm({N:n,'I%':i,PV:0,PMT:-A,FV:null,PY:1,solve:'FV'}),
 [A*n,PVA(A,i/100,n),V*(1+i/100)]);},
()=>{const FV=ri(20,500)*1000,i=rs(3,9,0.5),n=ri(5,20),F=(i/100)/(Math.pow(1+i/100,n)-1),A=FV*F;
 return numQ('annuity',`You need ${$0(FV)} in ${n} years to replace a roof. Your reserve account earns ${i}%. What equal end-of-year deposit gets you there?`,A,'$',
 `<p>Known future target, solve for the equal deposit = sinking fund payment.</p><p class="eq">A = FVA × i / [(1+i)<sup>n</sup> − 1] = ${$0(FV)} × ${f6(F)} = <b>${$m(A)}</b></p>`+tvm({N:n,'I%':i,PV:0,PMT:null,FV:FV,PY:1,solve:'PMT'}),
 [FV/n,PMT(FV,i/100,n),A*(1+i/100)]);},
()=>{const A=ri(8,40)*100,y=ri(3,10),i=rs(5,12,0.5),V=PVA(A,i/1200,12*y);
 return numQ('annuity',`A tenant will pay ${$0(A)} rent at the end of each month for ${y} years. At a ${i}% annual discount rate (monthly compounding), what is the lease worth today?`,V,'$',
 `<p>Monthly annuity: use i/12 per month and n×12 payments.</p><p class="eq">PVA = ${$0(A)} × [1 − 1/(1 + ${dec(i)}/12)<sup>${12*y}</sup>] / (${dec(i)}/12) = <b>${$m(V)}</b></p>`+tvm({N:12*y,'I%':i,PV:null,PMT:A,FV:0,PY:12,solve:'PV'}),
 [A*12*y,PVA(A*12,i/100,y),PVA(A,i/100,12*y)]);},
],
npv:[
()=>{const d=npvDeal(),N=npvAt(d.r/100,-d.P,d.cf);
 return numQ('npv',`A retail property costs ${$0(d.P)}. Your required return is ${d.r}%. Expected cash flows (years 1–5, year 5 includes the sale): ${d.cf.map($0).join(', ')}. What is the NPV?`,N,'$',
 `<p class="eq">NPV = −${$0(d.P)} + ${d.cf.map((c,t)=>`${$0(c)}/(1 + ${dec(d.r)})<sup>${t+1}</sup>`).join(' + ')}<br>= <b>${$m(N)}</b></p><p>${N>0?'NPV &gt; 0, so <b>buy</b>: it earns more than your required return.':'NPV &lt; 0, so <b>reject</b>: it earns less than your required return.'}</p>`+tiLine(`APPS → Finance → <b>npv(</b>${d.r}, −${d.P}, {${d.cf.join(', ')}}) ENTER`),
 [N+d.P,d.cf.reduce((a,b)=>a+b,0)-d.P,N*(1+d.r/100)],true);},
()=>{const d=npvDeal(),I=solveRate(r=>npvAt(r,-d.P,d.cf))*100;
 return numQ('npv',`A property costs ${$0(d.P)} and is expected to produce ${d.cf.map($0).join(', ')} in years 1–5 (year 5 includes the sale). What is the IRR?`,I,'%',
 `<p>The IRR is the discount rate that makes NPV = 0. Solve it on the calculator.</p>`+tiLine(`APPS → Finance → <b>irr(</b>−${d.P}, {${d.cf.join(', ')}}) ENTER → <b>${I.toFixed(2)}%</b>`)+`<p>Compare it with your required return: accept if IRR ≥ required rate.</p>`,
 []);},
],
pay:[
()=>{const L=ri(20,120)*5000,i=rs(3,9,0.125),y=pick([15,20,25,30]),A=PMT(L,i/1200,12*y);
 return numQ('pay',`What is the monthly payment on a ${$0(L)}, ${y}-year fixed-rate mortgage at ${i}%?`,A,'$',
 `<p class="eq">A = PV × (i/12) / [1 − 1/(1 + i/12)<sup>n·12</sup>] = ${$0(L)} × (${dec(i)}/12) / [1 − 1/(1 + ${dec(i)}/12)<sup>${12*y}</sup>] = <b>${$m(A)}</b></p>`+tvm({N:12*y,'I%':i,PV:L,PMT:null,FV:0,PY:12,solve:'PMT'}),
 [PMT(L,i/100,y)/12,L*i/1200,L/(12*y)+L*i/1200]);},
()=>{const L=ri(5,100)*1000,i=rs(5,12,0.5),n=ri(5,20),A=PMT(L,i/100,n);
 return numQ('pay',`A ${$0(L)} loan at ${i}% is repaid with equal <b>annual</b> payments over ${n} years. What is the annual payment?`,A,'$',
 `<p class="eq">A = PV × i / [1 − 1/(1+i)<sup>n</sup>] = ${$0(L)} × ${dec(i)} / [1 − 1/(1+${dec(i)})<sup>${n}</sup>] = <b>${$m(A)}</b></p>`+tvm({N:n,'I%':i,PV:L,PMT:null,FV:0,PY:1,solve:'PMT'}),
 [PMT(L,i/1200,12*n)*12,L*i/100,L/n]);},
()=>{const L=ri(5,100)*1000,i=rs(5,12,0.5),n=ri(5,15),A=PMT(L,i/100,n),i1=L*i/100,p1=A-i1,b1=L-p1,i2=b1*i/100,p2=A-i2;
 return numQ('pay',`A ${$0(L)} loan at ${i}% has equal annual payments over ${n} years. How much of the <b>second</b> payment is principal?`,p2,'$',
 `<p>Build the schedule one row at a time: interest = balance × i, principal = payment − interest.</p><p class="eq">Payment A = ${$m(A)}<br>Year 1: interest = ${$0(L)} × ${dec(i)} = ${$m(i1)}; principal = ${$m(p1)}; balance = ${$m(b1)}<br>Year 2: interest = ${$m(b1)} × ${dec(i)} = ${$m(i2)}; principal = <b>${$m(p2)}</b></p>`+tvm({N:n,'I%':i,PV:L,PMT:null,FV:0,PY:1,solve:'PMT',after:`Then APPS → Finance → <b>ΣPrn(</b>2,2) ENTER`}),
 [p1,i2,A-i1]);},
()=>{const A=ri(10,60)*50,i=rs(4,10,0.25),y=pick([25,30]),L=PVA(A,i/1200,12*y);
 return numQ('pay',`A buyer can afford a monthly payment of ${$0(A)}. The best rate available is ${i}% for ${y} years. What is the largest loan they can take?`,L,'$',
 `<p>The loan amount is the present value of the payments they can afford.</p><p class="eq">PV = A × [1 − 1/(1 + i/12)<sup>${12*y}</sup>] / (i/12) = <b>${$m(L)}</b></p>`+tvm({N:12*y,'I%':i,PV:null,PMT:-A,FV:0,PY:12,solve:'PV'}),
 [A*12*y,PVA(A*12,i/100,y),PVA(A,i/100,12*y)*12]);},
()=>{const L=ri(20,80)*5000,i=rs(4,9,0.25),y=pick([15,30]),A=PMT(L,i/1200,12*y),T=A*12*y-L;
 return numQ('pay',`On a ${$0(L)}, ${y}-year mortgage at ${i}% with monthly payments, how much total interest is paid if the loan is held to maturity?`,T,'$',
 `<p class="eq">Payment = ${$m(A)}<br>Total paid = ${$m(A)} × ${12*y} = ${$m(A*12*y)}<br>Total interest = total paid − principal = <b>${$m(T)}</b></p>`+tvm({N:12*y,'I%':i,PV:L,PMT:null,FV:0,PY:12,solve:'PMT',after:`Or APPS → Finance → <b>ΣInt(</b>1,${12*y}) ENTER`}),
 [A*12*y,L*i/100*y,T/2]);},
],
bal:[
()=>{const L=ri(20,100)*5000,i=rs(4,9,0.125),k=12*ri(2,12),A=PMT(L,i/1200,360),B=PVA(A,i/1200,360-k);
 return numQ('bal',`A ${$0(L)}, 30-year mortgage at ${i}% has a monthly payment of ${$m(A)}. What is the loan balance after ${k} payments?`,B,'$',
 `<p>The balance is the present value of the payments still to come.</p><p class="eq">Remaining payments = 360 − ${k} = ${360-k}<br>Balance = ${$m(A)} × [1 − 1/(1 + ${dec(i)}/12)<sup>${360-k}</sup>] / (${dec(i)}/12) = <b>${$m(B)}</b></p>`+tvm({N:360-k,'I%':i,PV:null,PMT:-A,FV:0,PY:12,solve:'PV'})+tiLine(`Or fill the TVM Solver with the original loan (N=360, PV=${L}), solve PMT, then APPS → Finance → <b>bal(</b>${k}) ENTER`),
 [L-k*A,L*(1-k/360),PVA(A,i/1200,k)]);},
()=>{const L=ri(20,100)*5000,i=rs(4,9,0.125),k=12*ri(2,12),A=PMT(L,i/1200,360),B=PVA(A,i/1200,360-k),I=B*i/1200;
 return numQ('bal',`A ${$0(L)}, 30-year mortgage at ${i}% (payment ${$m(A)}). How much <b>interest</b> is in payment number ${k+1}?`,I,'$',
 `<p class="eq">Balance after ${k} payments = ${$m(B)}<br>Interest in payment ${k+1} = ${$m(B)} × ${dec(i)}/12 = <b>${$m(I)}</b><br>Principal in payment ${k+1} = ${$m(A)} − ${$m(I)} = ${$m(A-I)}</p>`+tiLine(`TVM Solver with N=360, I%=${i}, PV=${L}, solve PMT. Then <b>ΣInt(</b>${k+1},${k+1}) ENTER`),
 [A-I,L*i/1200,B*i/100]);},
()=>{const L=ri(20,100)*5000,i=rs(4,9,0.125),y=ri(2,10),A=PMT(L,i/1200,360),B0=PVA(A,i/1200,360-12*(y-1)),B1=PVA(A,i/1200,360-12*y),P=B0-B1;
 return numQ('bal',`On a ${$0(L)}, 30-year mortgage at ${i}% (payment ${$m(A)}), how much <b>principal</b> is repaid during year ${y} (payments ${12*(y-1)+1}–${12*y})?`,P,'$',
 `<p>Principal repaid in a year = balance at the start of the year − balance at the end.</p><p class="eq">Balance after ${12*(y-1)} payments = ${$m(B0)}<br>Balance after ${12*y} payments = ${$m(B1)}<br>Principal in year ${y} = <b>${$m(P)}</b><br>Interest in year ${y} = 12 × ${$m(A)} − ${$m(P)} = ${$m(12*A-P)}</p>`+tiLine(`TVM Solver: N=360, I%=${i}, PV=${L}, solve PMT. Then <b>ΣPrn(</b>${12*(y-1)+1},${12*y}) ENTER`),
 [12*A-P,12*A,(L-B1)/y]);},
()=>{const L=ri(20,100)*5000,i=rs(4,9,0.125),y=ri(2,10),A=PMT(L,i/1200,360),B0=PVA(A,i/1200,360-12*(y-1)),B1=PVA(A,i/1200,360-12*y),P=B0-B1,I=12*A-P;
 return numQ('bal',`On a ${$0(L)}, 30-year mortgage at ${i}% (payment ${$m(A)}), how much <b>interest</b> is paid during year ${y}?`,I,'$',
 `<p class="eq">Principal in year ${y} = ${$m(B0)} − ${$m(B1)} = ${$m(P)}<br>Interest = total paid − principal = 12 × ${$m(A)} − ${$m(P)} = <b>${$m(I)}</b></p>`+tiLine(`TVM Solver: N=360, I%=${i}, PV=${L}, solve PMT. Then <b>ΣInt(</b>${12*(y-1)+1},${12*y}) ENTER`),
 [P,12*A,B0*i/100]);},
],
refi:[
()=>{const d=refiDeal();
 return numQ('refi',`You took a ${$0(d.L)}, 30-year mortgage at ${d.r1}% ${d.y} years ago (payment ${$m(d.A)}). Rates are now ${d.r2}%. If you refinance the current balance for the <b>remaining</b> ${30-d.y} years, what is the new monthly payment?`,d.A2,'$',
 `<p class="eq">Step 1. Current balance (PV of remaining ${d.n} payments at ${d.r1}%) = ${$m(d.B)}<br>Step 2. New payment = PMT on ${$m(d.B)} at ${d.r2}% for ${d.n} months = <b>${$m(d.A2)}</b><br>Monthly savings = ${$m(d.A-d.A2)}</p>`+tvm({N:d.n,'I%':d.r2,PV:+d.B.toFixed(2),PMT:null,FV:0,PY:12,solve:'PMT'}),
 [PMT(d.L,d.r2/1200,d.n),PMT(d.B,d.r2/1200,360),PMT(d.L,d.r2/1200,360)]);},
()=>{const d=refiDeal(),S=d.A-d.A2;
 return numQ('refi',`A ${$0(d.L)}, 30-year loan at ${d.r1}% is ${d.y} years old (payment ${$m(d.A)}). Refinancing the balance at ${d.r2}% over the remaining ${30-d.y} years would save how much per month? (Ignore closing costs.)`,S,'$',
 `<p class="eq">Balance now = ${$m(d.B)}<br>New payment = ${$m(d.A2)}<br>Savings = ${$m(d.A)} − ${$m(d.A2)} = <b>${$m(S)}</b> per month, or ${$m(S*d.n)} over ${d.n} months</p>`+tvm({N:d.n,'I%':d.r2,PV:+d.B.toFixed(2),PMT:null,FV:0,PY:12,solve:'PMT'}),
 [d.A-PMT(d.L,d.r2/1200,360),S*12,d.A-PMT(d.L,d.r2/1200,d.n)]);},
()=>{const d=refiDeal(),N=NPER(d.B,d.r2/1200,d.A);
 return numQ('refi',`A ${$0(d.L)}, 30-year loan at ${d.r1}% is ${d.y} years old (balance ${$m(d.B)}, payment ${$m(d.A)}). You refinance at ${d.r2}% but keep paying ${$m(d.A)} a month. How many payments until the new loan is paid off?`,N,'mo',
 `<p>Same payment, lower rate: solve for N.</p>`+tvm({N:null,'I%':d.r2,PV:+d.B.toFixed(2),PMT:-d.A,FV:0,PY:12,solve:'N'})+`<p class="eq">N = <b>${N.toFixed(2)}</b> months (round up to ${Math.ceil(N)} payments). You cut ${d.n-Math.ceil(N)} months off the remaining ${d.n}.</p>`,
 [d.n,NPER(d.L,d.r2/1200,d.A),N*0.9>d.n?N*0.8:d.n-N]);},
],
points:[
()=>{const L=ri(10,60)*10000,i=rs(5,8,0.125),pts=pick([1,1.5,2,2.5,3]),A=PMT(L,i/1200,360),net=L*(1-pts/100),r=solveRate(x=>PVA(A,x,360)-net)*1200;
 return numQ('points',`A ${$0(L)}, 30-year mortgage at ${i}% charges ${pts} discount points. If the borrower keeps the loan for the full term, what is the effective interest rate?`,r,'%',
 `<p>Points are paid up front, so the borrower really receives less cash but makes payments on the full loan.</p><p class="eq">Net proceeds = ${$0(L)} × (1 − ${pts/100}) = ${$m(net)}<br>Payment (on full loan) = ${$m(A)}<br>Find the rate where PV of 360 payments = ${$m(net)} → <b>${r.toFixed(2)}%</b></p>`+tvm({N:360,'I%':null,PV:+net.toFixed(2),PMT:-A,FV:0,PY:12,solve:'I%'}),
 [i,i+pts*0.125,i+pts]);},
()=>{const L=ri(10,60)*10000,i=rs(5,8,0.125),pts=pick([1.5,2,2.5,3]),y=ri(3,8),k=12*y,A=PMT(L,i/1200,360),B=PVA(A,i/1200,360-k),net=L*(1-pts/100),r=solveRate(x=>PVA(A,x,k)+B/Math.pow(1+x,k)-net)*1200,rFull=solveRate(x=>PVA(A,x,360)-net)*1200;
 return numQ('points',`A ${$0(L)}, 30-year mortgage at ${i}% charges ${pts} points. The borrower <b>prepays</b> the loan at the end of year ${y}. What is the effective interest rate?`,r,'%',
 `<p>Cash flows: receive net proceeds, pay ${k} payments, then pay off the balance.</p><p class="eq">Net proceeds = ${$m(net)}<br>Payment = ${$m(A)}<br>Balance after ${k} payments = ${$m(B)}<br>Solve for the rate → <b>${r.toFixed(2)}%</b></p>`+tvm({N:k,'I%':null,PV:+net.toFixed(2),PMT:-A,FV:-(+B.toFixed(2)),PY:12,solve:'I%'})+`<p>Held to maturity it would be ${rFull.toFixed(2)}%. Prepaying early spreads the points over fewer years, so the effective rate goes <b>up</b>.</p>`,
 [rFull,i,i+pts]);},
],
arm:[
()=>{const L=ri(20,80)*5000,i0=rs(4.5,6.5,0.25),fx=pick([5,7]),T=rs(4,8,0.25),m=rs(1.5,3,0.25),cap=pick([4,5]),inew=Math.min(T+m,i0+cap),A0=PMT(L,i0/1200,360),B=PVA(A0,i0/1200,360-12*fx),A1=PMT(B,inew/1200,360-12*fx);
 return numQ('arm',`A 30-year two-step mortgage for ${$0(L)} starts at ${i0}%. At the end of year ${fx} the rate resets to the 10-year Treasury yield + ${m}%, capped at ${cap} points above the initial rate. The Treasury yield at reset is ${T}%. What is the new monthly payment?`,A1,'$',
 `<p class="eq">Initial payment = ${$m(A0)}<br>Balance after ${12*fx} payments = ${$m(B)}<br>New rate = ${T}% + ${m}% = ${(T+m).toFixed(2)}%; cap = ${i0}% + ${cap}% = ${(i0+cap).toFixed(2)}% → use <b>${inew.toFixed(2)}%</b><br>New payment = PMT on ${$m(B)} at ${inew.toFixed(2)}% for ${360-12*fx} months = <b>${$m(A1)}</b></p>`+tvm({N:360-12*fx,'I%':+inew.toFixed(3),PV:+B.toFixed(2),PMT:null,FV:0,PY:12,solve:'PMT'}),
 [PMT(L,inew/1200,360-12*fx),PMT(B,(T+m)/1200,360-12*fx),PMT(L,inew/1200,360)]);},
()=>{const x=armDeal();
 return numQ('arm',`An ARM is indexed to the 1-year T-bill (currently ${x.i0}%) with a ${x.m}% margin and a ${x.t}% first-year teaser. Annual cap 2 points, lifetime cap 5 points over the initial rate. At the first adjustment the T-bill is ${x.i1}%. What is the year-2 contract rate?`,x.r2,'%',
 `<p class="eq">Year 1 rate = index + margin − teaser = ${x.i0} + ${x.m} − ${x.t} = ${x.r1.toFixed(2)}%<br>Uncapped year 2 rate = ${x.i1} + ${x.m} = ${(x.i1+x.m).toFixed(2)}%<br>Annual cap allows ${(x.r1-2).toFixed(2)}% to ${(x.r1+2).toFixed(2)}%; lifetime cap allows up to ${(x.r1+5).toFixed(2)}%<br>Year 2 rate = <b>${x.r2.toFixed(2)}%</b></p>`,
 [x.i1+x.m,x.i1+x.m-x.t,x.r1]);},
()=>{const x=armDeal(),L=ri(20,80)*5000,A1=PMT(L,x.r1/1200,360),B=PVA(A1,x.r1/1200,348),A2=PMT(B,x.r2/1200,348);
 return numQ('arm',`A 30-year ${$0(L)} ARM has a year-1 rate of ${x.r1.toFixed(2)}% and adjusts to ${x.r2.toFixed(2)}% for year 2. What is the year-2 monthly payment?`,A2,'$',
 `<p class="eq">Year 1 payment = ${$m(A1)}<br>Balance after 12 payments (at ${x.r1.toFixed(2)}%) = ${$m(B)}<br>Year 2 payment = PMT on ${$m(B)} at ${x.r2.toFixed(2)}% for 348 months = <b>${$m(A2)}</b></p>`+tvm({N:348,'I%':+x.r2.toFixed(3),PV:+B.toFixed(2),PMT:null,FV:0,PY:12,solve:'PMT'}),
 [PMT(L,x.r2/1200,360),PMT(L,x.r2/1200,348),A1]);},
],
uw:[
()=>{const u=uwDeal();
 return numQ('uw',`A borrower earns ${$0(u.inc)} a year. The proposed loan's principal and interest payment is ${$0(u.pi)} a month; property taxes and insurance total ${$0(u.ti)} a year. Other debt payments are ${$0(u.oth)} a month. What is the mortgage debt ratio (front-end)?`,u.mdr,'%',
 `<p class="eq">Gross monthly income = ${$0(u.inc)}/12 = ${$m(u.inc/12)}<br>Housing payment = ${$0(u.pi)} + ${$0(u.ti)}/12 = ${$m(u.h)}<br>MDR = ${$m(u.h)} / ${$m(u.inc/12)} = <b>${u.mdr.toFixed(2)}%</b> (limit 28%)<br>TDR = (${$m(u.h)} + ${$0(u.oth)}) / ${$m(u.inc/12)} = ${u.tdr.toFixed(2)}% (limit 36%)<br>${u.verdict}</p>`,
 [u.pi/(u.inc/12)*100,u.tdr,(u.pi+u.ti)/(u.inc/12)*100]);},
()=>{const u=uwDeal();
 return numQ('uw',`A borrower earns ${$0(u.inc)} a year. Principal and interest would be ${$0(u.pi)} a month; taxes and insurance ${$0(u.ti)} a year; car and card payments ${$0(u.oth)} a month. What is the total debt ratio (back-end)?`,u.tdr,'%',
 `<p class="eq">Monthly income = ${$m(u.inc/12)}<br>All monthly obligations = ${$0(u.pi)} + ${$m(u.ti/12)} + ${$0(u.oth)} = ${$m(u.h+u.oth)}<br>TDR = <b>${u.tdr.toFixed(2)}%</b> (limit 36%)<br>MDR = ${u.mdr.toFixed(2)}% (limit 28%)<br>${u.verdict}</p>`,
 [u.mdr,(u.pi+u.oth)/(u.inc/12)*100,u.tdr*0.88]);},
()=>{const NOI=ri(8,60)*10000,r=rs(5,8,0.25),t=pick([20,25,30]),L=Math.round(NOI/rs(0.085,0.11,0.005)*rs(0.65,0.8,0.05)/10000)*10000,A=PMT(L,r/1200,12*t),DS=12*A,D=NOI/DS;
 return numQ('uw',`A commercial property has NOI of ${$0(NOI)}. The requested loan is ${$0(L)} at ${r}% for ${t} years with monthly payments. What is the debt coverage ratio?`,D,'x',
 `<p class="eq">Monthly payment = ${$m(A)}; annual debt service = 12 × ${$m(A)} = ${$m(DS)}<br>DCR = NOI / DS = ${$0(NOI)} / ${$m(DS)} = <b>${D.toFixed(2)}</b><br>${D>=1.2?'At or above the typical 1.20 minimum, so it passes.':'Below the typical 1.20 minimum, so a lender would likely reduce the loan or decline.'}</p>`+tvm({N:12*t,'I%':r,PV:L,PMT:null,FV:0,PY:12,solve:'PMT'}),
 [NOI/A,DS/NOI,NOI/(L*r/100)]);},
()=>{const NOI=ri(8,60)*10000,r=rs(5,8,0.25),t=pick([20,25,30]),DSmax=NOI/1.2,L=PVA(DSmax/12,r/1200,12*t);
 return numQ('uw',`A lender requires a DCR of at least 1.20. The property's NOI is ${$0(NOI)}. Loans are ${r}% for ${t} years, monthly payments. What is the largest loan the property supports?`,L,'$',
 `<p class="eq">Max annual debt service = NOI / 1.20 = ${$m(DSmax)}<br>Max monthly payment = ${$m(DSmax/12)}<br>Max loan = PV of that payment = <b>${$m(L)}</b></p>`+tvm({N:12*t,'I%':r,PV:null,PMT:-(+(DSmax/12).toFixed(2)),FV:0,PY:12,solve:'PV'}),
 [PVA(NOI/12,r/1200,12*t),PVA(NOI*1.2/12,r/1200,12*t),NOI/1.2/(r/100)]);},
()=>{const P=ri(15,90)*10000,dp=pick([3.5,5,10,15,25]),L=P*(1-dp/100),ltv=L/P*100;
 return numQ('uw',`A buyer pays ${$0(P)} for a home (appraised at the same amount) with ${$0(P*dp/100)} down. What is the loan-to-value ratio?`,ltv,'%',
 `<p class="eq">Loan = ${$0(P)} − ${$0(P*dp/100)} = ${$0(L)}<br>LTV = ${$0(L)} / ${$0(P)} = <b>${ltv.toFixed(2)}%</b></p><p>${ltv>80?'Above 80%, so a conventional loan needs PMI (or the loan must be FHA/VA).':'At or below 80%, so no PMI is needed on a conventional loan.'}</p>`,
 [dp,ltv-5,100-dp/2]);},
],
apm:[
()=>{const land=ri(5,40)*5000,sf=ri(15,60)*100,cps=rs(90,180,5),C=sf*cps,ph=ri(5,30)*1000,fu=ri(1,10)*1000,ec=ri(0,15)*1000,D=ph+fu+ec,V=land+C-D;
 return numQ('apm',`Cost approach: the site is worth ${$0(land)}. The ${com(sf,0)} sq ft building would cost ${$m(cps)} per sq ft to replace. Accrued depreciation: physical ${$0(ph)}, functional ${$0(fu)}, economic ${$0(ec)}. What is the indicated value?`,V,'$',
 `<p class="eq">Replacement cost = ${com(sf,0)} × ${$m(cps)} = ${$0(C)}<br>Total depreciation = ${$0(D)}<br>Value = site + (cost − depreciation) = ${$0(land)} + (${$0(C)} − ${$0(D)}) = <b>${$m(V)}</b></p>`,
 [C-D,land+C,land+C+D]);},
()=>{const age=ri(5,25),life=pick([50,60,75]),C=ri(150,600)*1000,D=age/life*C;
 return numQ('apm',`A building has an effective age of ${age} years and a total economic life of ${life} years. Its replacement cost is ${$0(C)}. Using the age-life method, how much physical deterioration should be deducted?`,D,'$',
 `<p class="eq">Depreciation % = effective age / economic life = ${age}/${life} = ${(age/life*100).toFixed(2)}%<br>Depreciation = ${(age/life).toFixed(4)} × ${$0(C)} = <b>${$m(D)}</b></p>`,
 [C-D,(life-age)/life*C,age/(life+age)*C]);},
()=>{const g=rs(6,12,0.25),gi=ri(5,40)*10000,price=Math.round(gi*g/1000)*1000,G=price/gi,sg=ri(5,40)*10000,V=G*sg;
 return numQ('apm',`A comparable apartment building sold for ${$0(price)} and has gross income of ${$0(gi)}. The subject property's gross income is ${$0(sg)}. Using a gross income multiplier, estimate the subject's value.`,V,'$',
 `<p class="eq">GIM = price / gross income = ${$0(price)} / ${$0(gi)} = ${G.toFixed(2)}<br>Value = GIM × subject gross income = ${G.toFixed(2)} × ${$0(sg)} = <b>${$m(V)}</b></p><p class="muted">GIM works best when properties have similar expense ratios.</p>`,
 [sg/G,price*sg/gi*0.9,sg/(1/G)/10]);},
()=>{const pgi=ri(10,80)*10000,vac=pick([5,7,10]),ox=Math.round(pgi*rs(0.3,0.45,0.01)/1000)*1000,R=rs(6,10,0.25),egi=pgi*(1-vac/100),NOI=egi-ox,V=NOI/(R/100);
 return numQ('apm',`An office building has potential gross income of ${$0(pgi)}, ${vac}% vacancy and collection loss, and operating expenses of ${$0(ox)}. The market cap rate is ${R}%. Estimate its value with direct capitalization.`,V,'$',
 `<p class="eq">EGI = ${$0(pgi)} × (1 − ${vac/100}) = ${$0(egi)}<br>NOI = EGI − operating expenses = ${$0(NOI)}<br>Value = NOI / R = ${$0(NOI)} / ${dec(R)} = <b>${$m(V)}</b></p><p class="muted">Debt service is never subtracted to get NOI.</p>`,
 [(pgi-ox)/(R/100),egi/(R/100),NOI*R/10]);},
()=>{const sw=pick([80,90,100]),sd=120,cw=pick([75,85,95]),cd=pick([110,120,130]),cpsf=rs(2.5,4.5,0.05),cp=Math.round(cw*cd*cpsf/100)*100,ppsf=cp/(cw*cd),mk=rs(0.1,0.3,0.02),loc=rs(-0.6,0.4,0.1),adj=ppsf+mk+loc,V=adj*sw*sd;
 return numQ('apm',`Sales comparison: a comparable ${cw}×${cd} ft lot sold for ${$0(cp)} a year ago. Adjust it +${$m(mk)}/sq ft for market conditions and ${loc>=0?'+':'−'}${$m(Math.abs(loc))}/sq ft for location. What is the indicated value of the ${sw}×${sd} ft subject lot?`,V,'$',
 `<p class="eq">Comp price per sq ft = ${$0(cp)} / ${com(cw*cd,0)} = ${$m(ppsf)}<br>Adjusted = ${$m(ppsf)} + ${$m(mk)} ${loc>=0?'+':'−'} ${$m(Math.abs(loc))} = ${$m(adj)}<br>Subject = ${$m(adj)} × ${com(sw*sd,0)} sq ft = <b>${$m(V)}</b></p><p class="muted">Always adjust the comparable toward the subject, never the other way around.</p>`,
 [ppsf*sw*sd,(ppsf+mk-loc)*sw*sd,cp]);},
],
brk:[
()=>{const P=ri(20,90)*5000,c=pick([5,6,7]),split=pick([50,50,60]),as=pick([50,60,70]),tot=P*c/100,sell=tot*(100-split)/100,ag=sell*as/100;
 return numQ('brk',`A house sells for ${$0(P)} with a ${c}% commission. The listing broker keeps ${split}% and the selling (cooperating) brokerage gets the rest. The selling sales associate earns ${as}% of their firm's share. How much does the selling associate earn?`,ag,'$',
 `<p class="eq">Total commission = ${$0(P)} × ${c}% = ${$m(tot)}<br>Selling brokerage share = ${100-split}% = ${$m(sell)}<br>Associate's share = ${as}% × ${$m(sell)} = <b>${$m(ag)}</b></p>`,
 [sell,tot*as/100,tot-ag]);},
],
};

function npvDeal(){const P=ri(40,120)*10000,r=rs(9,15,0.5),y=rs(0.06,0.1,0.005),cf=[];
 for(let t=0;t<5;t++)cf.push(Math.round(P*y*(1+rnd(-0.15,0.15))/1000)*1000);
 cf[4]+=Math.round(P*rs(0.95,1.35,0.05)/10000)*10000;return {P,r,cf};}
function refiDeal(){const L=ri(20,100)*5000,r1=rs(6.5,9,0.25),r2=+(r1-rs(1,2.5,0.25)).toFixed(3),y=ri(3,8),n=360-12*y,A=PMT(L,r1/1200,360),B=PVA(A,r1/1200,n),A2=PMT(B,r2/1200,n);return {L,r1,r2,y,n,A,B,A2};}
function armDeal(){const i0=rs(3,6,0.25),m=rs(2,3,0.25),t=rs(1,2,0.25),r1=i0+m-t,i1=+(i0+rs(-1,3,0.25)).toFixed(3);let r2=Math.min(Math.max(i1+m,r1-2),r1+2);r2=Math.min(r2,r1+5);return {i0,m,t,r1,i1,r2};}
function uwDeal(){const inc=ri(36,150)*1000,pi=Math.round(inc/12*rs(0.18,0.29,0.01)),ti=ri(12,60)*100,oth=ri(0,14)*50,h=pi+ti/12,mdr=h/(inc/12)*100,tdr=(h+oth)/(inc/12)*100;
 const okM=mdr<=28,okT=tdr<=36;const verdict=okM&&okT?'Both ratios are within 28/36, so they qualify for a conventional loan.':`They do <b>not</b> qualify conventionally: ${!okM?'MDR is over 28%':''}${!okM&&!okT?' and ':''}${!okT?'TDR is over 36%':''}. FHA/VA allow higher ratios.`;
 return {inc,pi,ti,oth,h,mdr,tdr,verdict};}

/* ===== Concept question banks: [question, [correct, wrong, wrong, wrong], explanation] ===== */
const BANK={
lump:[
['All else equal, what happens to the present value of a future amount when the discount rate rises?',['It falls','It rises','It stays the same','It doubles'],'PV = FV/(1+i)<sup>n</sup>. A bigger denominator means a smaller PV.'],
['At the same 8% annual rate, which grows to more in 10 years?',['Monthly compounding','Annual compounding','They are equal','It depends on the amount'],'More frequent compounding earns interest on interest sooner, so FV is higher.'],
['Which statement best describes the time value of money principle?',['A dollar today is worth more than a dollar received in the future','A dollar in the future is worth more because of inflation','Money has the same value regardless of timing','Only risky cash flows need to be discounted'],'Money today can be invested to earn a return, so it is worth more than the same amount later.'],
['Discounting is the process of…',['Converting a future cash flow to its present value','Growing a present amount into a future value','Calculating loan payments','Reducing a list price in negotiations'],'Discounting moves money back in time; compounding moves it forward.'],
],
annuity:[
['An annuity due differs from an ordinary annuity because its payments occur…',['At the beginning of each period','At the end of each period','Only once','At irregular intervals'],'Annuity due = beginning of period (e.g., rent paid on the 1st). On the TI-84 switch PMT:BEGIN.'],
['You want to know how much to deposit each year to reach $200,000 in 10 years. Which calculation is this?',['Sinking fund payment','Present value of an annuity','Future value of a lump sum','Mortgage payment'],'A known future target with equal deposits is a sinking fund.'],
['Which TVM formula values a 10-year stream of equal annual rent checks as of today?',['Present value of an annuity','Future value of an annuity','Present value of a lump sum','Sinking fund payment'],'Equal periodic payments valued today = PVA.'],
['Cash flows of $500, $1,000 and $1,500 over three years should be valued by…',['Discounting each flow separately and adding','Using the PVA formula with the average payment','Using FVA','Multiplying the total by the discount rate'],'Unequal flows are not an annuity.'],
],
npv:[
['An investment has NPV = −$4,200 at the investor\'s required return. The investor should…',['Reject it','Accept it','Accept it only if IRR is positive','Raise the discount rate until NPV is positive'],'Negative NPV means it earns less than required.'],
['The internal rate of return is the discount rate that…',['Makes NPV equal zero','Equals the risk-free rate','Maximizes NPV','Equals the mortgage rate'],'IRR is the break-even discount rate.'],
['A deal\'s IRR is 11% and your required return is 12%. You should…',['Reject it','Accept it','Be indifferent','Accept only if NPV is negative'],'Accept only if IRR ≥ required return.'],
['Why is NPV usually preferred over IRR when comparing investments?',['IRR can produce multiple rates when cash flows are uneven','NPV ignores the time value of money','IRR is always lower than NPV','NPV does not need a discount rate'],'Uneven cash flows can produce more than one IRR; NPV gives one dollar answer.'],
['The required rate of return equals…',['The risk-free rate plus a risk premium','The mortgage rate plus inflation','The IRR of the investment','The cap rate minus growth'],'Investors are risk-averse, so riskier deals need a bigger premium.'],
['The risk that inflation erodes the real value of future cash flows is…',['Purchasing power risk','Liquidity risk','Business risk','Financial risk'],'Also called inflation risk.'],
['The risk that a property cannot be sold quickly at market value is…',['Liquidity risk','Business risk','Financial risk','Purchasing power risk'],'Real estate is less liquid than stocks and has higher transaction costs.'],
['Financial risk comes from…',['Using borrowed money (leverage)','Changes in the local economy','Inflation','Difficulty selling the asset'],'More debt means a higher chance of default.'],
['A downturn that reduces a shopping center\'s rents is an example of…',['Business risk','Financial risk','Liquidity risk','Purchasing power risk'],'Business risk is uncertainty in the property\'s income-generating ability.'],
['Most investors are risk-averse. This means that…',['Higher risk requires a higher expected return','They never take risk','Return falls as risk rises','Risk and return are unrelated'],'This creates the positive risk-return relationship.'],
],
pay:[
['On an interest-only loan, what is due at maturity?',['The entire original principal (balloon)','Nothing','Only the last month\'s interest','Half the principal'],'No principal is paid along the way, so it all comes due at the end.'],
['Over the life of a fully amortizing fixed-rate mortgage, the interest portion of each payment…',['Decreases while the principal portion increases','Increases while principal decreases','Stays constant','Equals the principal portion'],'Interest is charged on a shrinking balance.'],
['A partially amortizing loan is one where…',['The term is shorter than the amortization period, so a balloon is due','Only interest is paid','The rate adjusts every year','Payments rise each year'],'For example, 30-year amortization with a 7-year term.'],
['Monthly payment × 12 is less than the equivalent annual payment because…',['Monthly payments reduce principal sooner, so less interest accrues','Monthly loans have lower rates','The annual payment includes fees','It is a rounding difference'],'Paying earlier in the year lowers the average balance.'],
['Compared with a fully amortizing loan, the same-size interest-only loan has…',['Lower payments but more total interest','Higher payments and more total interest','Lower payments and less total interest','The same total interest'],'Principal is never reduced, so interest stays high.'],
],
bal:[
['The outstanding balance on a fixed-rate mortgage at any payment date equals…',['The present value of the remaining payments at the contract rate','The original loan minus all payments made','Payments made × interest rate','The future value of payments made'],'This is the key rule for prepayment and refinancing.'],
['To find the interest in payment 61, you multiply…',['The balance after payment 60 by the monthly rate','The original loan by the monthly rate','The payment by the annual rate','The balance after payment 61 by the annual rate'],'Interest is always charged on the balance at the start of the period.'],
['Principal repaid during year 6 equals…',['Balance after month 60 − balance after month 72','12 × monthly payment','Balance after month 72 × rate','Interest in year 6 − payments'],'Then interest in year 6 = 12 × payment − principal.'],
],
refi:[
['When refinancing to lower the payment, the new loan amount should be…',['The current outstanding balance','The original loan amount','The total of all remaining payments','The home\'s market value'],'You only owe the balance, not the original amount.'],
['If you refinance at a lower rate but keep making the same payment, you…',['Pay the loan off sooner','Pay the loan off later','Extend the term to 30 years','Increase total interest'],'More of each payment goes to principal.'],
['What do the textbook refinancing examples leave out that a real decision must include?',['Refinancing costs (fees, points)','The new interest rate','The current balance','The remaining term'],'Savings must exceed the cost of refinancing.'],
],
points:[
['One discount point equals…',['1% of the loan amount','1% of the purchase price','0.125% of the interest rate','$1,000'],'Each point typically lowers the rate about 0.125%, but the cost is 1% of the loan.'],
['A borrower pays 3 points and expects to sell in 3 years. Compared with holding 30 years, the effective rate is…',['Higher','Lower','The same','Equal to the contract rate'],'Up-front costs are spread over fewer payments.'],
['A loan with no points and no fees has an effective rate that…',['Equals the contract rate','Is higher than the contract rate','Is lower than the contract rate','Cannot be calculated'],'With no up-front charges, net proceeds equal the loan.'],
['The effective interest rate on a loan with points is calculated as…',['An IRR using net proceeds and the payments','The contract rate plus points','The APR minus fees','The average of rate and points'],'Solve for I% with PV = net proceeds.'],
['Origination fees affect the loan by…',['Raising the effective rate without lowering the contract rate','Lowering the contract rate','Lowering the monthly payment','Shortening the term'],'They reduce net proceeds but buy no rate reduction.'],
['Paying discount points makes the most sense for a borrower who…',['Plans to keep the loan a long time','Plans to sell in two years','Expects rates to fall soon','Has a balloon loan'],'A longer hold spreads the up-front cost more thinly.'],
],
arm:[
['The contract rate on an ARM is usually…',['Index + margin','Index − margin','Margin only','Prime + points'],'The teaser can lower the first-year rate below this.'],
['An ARM\'s lifetime cap limits…',['Total rate change from the initial rate over the loan\'s life','The change at each adjustment','The number of adjustments','The loan amount'],'The annual cap limits each adjustment.'],
['In exchange for a lower initial rate, an ARM borrower…',['Bears some interest rate risk','Pays no interest for a year','Gets a guaranteed fixed payment','Avoids all closing costs'],'Payments can rise when the index rises.'],
['A two-step mortgage is most attractive to a borrower who…',['Expects to sell or refinance before the rate adjusts','Plans to hold 30 years','Wants a payment that never changes','Has no down payment'],'They get the low initial rate and leave before the step.'],
['When an ARM rate adjusts, the new payment is based on…',['The current balance, new rate and remaining term','The original loan, new rate and 30 years','The original payment plus the rate change','The index only'],'Recalculate as if originating a new loan at the adjustment date.'],
],
uw:[
['The conventional guideline for the mortgage debt (front-end) ratio is about…',['28% of gross monthly income','36% of gross monthly income','28% of net income','41% of gross income'],'Housing (PITI) ÷ gross monthly income.'],
['The total debt (back-end) ratio guideline for conventional loans is about…',['36%','28%','45%','20%'],'All monthly debt payments ÷ gross monthly income.'],
['A conventional loan with an LTV above 80% generally requires…',['Private mortgage insurance','A VA guarantee','A balloon payment','A co-signer'],'Or FHA/VA backing.'],
['Which program allows up to 100% LTV?',['VA-guaranteed loans','Conventional loans','Commercial loans','FHA loans with 0% down'],'VA loans need no down payment.'],
['A commercial loan has DCR = 0.95. This means…',['NOI is not enough to cover debt service','NOI exceeds debt service by 95%','The LTV is 95%','The loan is low risk'],'Below 1.0 the property cannot pay its mortgage from operations.'],
['Typical commercial loan LTV ratios are around…',['70%','95%','100%','50%'],'Lower than residential because there is no PMI for commercial loans.'],
['Commercial underwriting focuses mainly on…',['The property\'s income (DCR) and LTV','The borrower\'s salary','The borrower\'s credit score only','The age of the building'],'The property must carry the debt.'],
['For conventional loans over 80% LTV, how much of the price must typically come from the borrower\'s own funds?',['At least 5%','At least 20%','None','At least 10%'],'Shows a personal stake in the property.'],
['For FHA loans, third-party (seller) contributions above 6% of value are treated as…',['An inducement to purchase that reduces the loan amount','Part of the down payment','A gift','A closing cost the buyer must pay'],'They reduce the loan dollar for dollar.'],
['A relative gives a buyer down payment money. The lender will usually require…',['A gift letter stating it is not a loan','A second mortgage','PMI on the gift','Nothing'],'The money must not create another debt.'],
],
fin:[
['In a title-theory state, who holds title to the property until the loan is repaid?',['The lender','The borrower','The trustee in every case','The county'],'In lien-theory states, the borrower keeps title and the lender has a lien.'],
['Which document makes the borrower personally liable for the debt?',['The promissory note','The mortgage','The deed','The appraisal'],'The mortgage (security instrument) pledges the property.'],
['Which clause lets the lender demand the full balance if the borrower defaults?',['Acceleration clause','Due-on-sale clause','Prepayment clause','Escalation clause'],'Due-on-sale is triggered by a sale or transfer, not default.'],
['A clause requiring payoff if the property is sold is the…',['Due-on-sale clause','Acceleration clause','Prepayment clause','Defeasance clause'],'It prevents a buyer from simply taking over the loan.'],
['Foreclosure through a court order is…',['Judicial foreclosure','Nonjudicial foreclosure','Strict foreclosure','Deed in lieu'],'Common in lien-theory states.'],
['Nonjudicial foreclosure is possible when the security instrument contains…',['A power of sale clause','An acceleration clause','A prepayment clause','A due-on-sale clause'],'It skips the courts and is faster.'],
['Foreclosure in which the lender takes title directly without a sale is…',['Strict foreclosure','Judicial foreclosure','Nonjudicial foreclosure','A short sale'],'Not widely practiced.'],
['A deficiency judgment makes the borrower liable for…',['The shortfall when the foreclosure sale does not cover the debt','Late fees only','The lender\'s legal fees only','Future property taxes'],'Some states limit or forbid them.'],
['A deed of trust involves three parties: borrower, lender and…',['A trustee','An escrow agent','A broker','The FHA'],'The trustee holds title and can sell on default.'],
['A borrower who voluntarily gives the property back to the lender to avoid foreclosure uses…',['A deed in lieu of foreclosure','A deficiency judgment','A land contract','A due-on-sale clause'],'The lender may accept or reject it.'],
['Which entity guarantees mortgage-backed securities made of FHA and VA loans and is part of HUD?',['Ginnie Mae','Fannie Mae','Freddie Mac','The CFPB'],'Its securities carry full federal backing.'],
['Freddie Mac was created in 1970 mainly to provide a secondary market for…',['Conventional loans','FHA loans only','VA loans only','Commercial loans'],'Fannie Mae was originally created to buy FHA loans.'],
['Fannie Mae became a privately owned government-sponsored enterprise in…',['1968','1938','1970','2008'],'In 2008 it was placed in federal conservatorship.'],
['The market where loans are originated between borrowers and lenders is the…',['Primary mortgage market','Secondary mortgage market','Capital market','Money market'],'The secondary market buys existing loans.'],
['How does a mortgage broker differ from a mortgage banker?',['A broker arranges loans but does not lend its own money','A broker always services the loans','A broker must be a commercial bank','There is no difference'],'Mortgage bankers originate with borrowed funds, sell loans and often keep servicing.'],
['FHA loans are ___, while VA loans are ___.',['insured; guaranteed','guaranteed; insured','private; public','commercial; residential'],'FHA charges up-front and annual insurance premiums.'],
['Which law requires disclosure of the APR within three business days of application?',['Truth-in-Lending (Consumer Credit Protection Act)','RESPA','ECOA','FCRA'],'RESPA covers settlement cost estimates and bans kickbacks.'],
['Which law prohibits kickbacks and referral fees in the settlement process?',['RESPA','ECOA','Truth-in-Lending','Dodd-Frank'],'Real Estate Settlement Procedures Act.'],
['Under ECOA, how long does a lender have to approve or deny a completed application?',['30 days','3 business days','60 days','10 days'],'Denials must state the reasons.'],
['Which is NOT a factor protected under the Equal Credit Opportunity Act?',['Credit history','Age','Marital status','Receipt of public assistance'],'Lenders may consider credit history.'],
['Which law created the Consumer Financial Protection Bureau?',['Dodd-Frank Act','RESPA','FIRREA','Fair Credit Reporting Act'],'Passed after the 2008 crisis.'],
['Which law requires flood insurance for properties in designated flood hazard areas?',['Flood Disaster Protection Act','RESPA','FIRREA','Dodd-Frank'],'Coverage is usually through FEMA\'s NFIP.'],
['Why do commercial banks favor short-term commercial real estate loans?',['Their deposits are short-term','They are prohibited from long-term lending','Short-term loans have higher LTVs','Regulators require it for all loans'],'They match loan maturities to their liabilities.'],
['Which REIT type is the most common?',['Equity REITs','Mortgage REITs','Hybrid REITs','Construction REITs'],'Equity REITs own properties and earn rent.'],
['Tax increment financing (TIF) repays redevelopment costs with…',['The increase in property taxes the project generates','A new sales tax','Federal grants','Developer fees'],'After repayment the extra tax revenue goes to the municipality.'],
['Why are life insurance companies and pension funds major commercial real estate investors?',['They have long investment horizons that match durable property','They need very liquid assets','They are required by law to own buildings','They only make construction loans'],'Long-lived assets match long-term obligations.'],
['CMBS are…',['Pools of commercial mortgages sold as securities','Government guarantees on commercial loans','Commercial bank deposits','Equity shares in REITs'],'They free up lender capital and pass cash flows to investors.'],
],
apc:[
['FIRREA (1989) requires that appraisals for federally related transactions be performed by…',['State-licensed or certified appraisers','Any real estate broker','The lender\'s loan officer','HUD employees'],'Passed after the savings and loan crisis.'],
['Which board sets USPAP?',['Appraisal Standards Board (ASB)','Appraisal Qualifications Board (AQB)','HUD','The CFPB'],'The AQB sets education and experience requirements.'],
['Which appraiser category may appraise any type of property?',['Certified general','Certified residential','Licensed residential','Trainee'],'Requires 3,000 hours of experience, at least 1,500 non-residential.'],
['How many hours of experience does a certified residential appraiser need?',['2,500','2,000','3,000','None'],'Licensed residential: 2,000. Certified general: 3,000.'],
['Market value is best described as…',['The most probable price in a competitive, open market','The price a specific investor would pay','The cost to build','The value used for property taxes'],'Investment value is for a specific investor.'],
['Insurable value differs from market value mainly because it…',['Excludes land value','Includes the land','Uses assessed value','Ignores construction cost'],'Land can\'t be destroyed, so it isn\'t insured.'],
['A buyer won\'t pay more for a house than the cost of an equally desirable alternative. Which principle?',['Substitution','Anticipation','Contribution','Change'],'Substitution underlies all three approaches to value.'],
['A $40,000 home theater adds only $8,000 to market value. Which principle explains this?',['Contribution','Substitution','Anticipation','Change'],'Value of a component = what it adds, not what it cost.'],
['Value today depends on expected future benefits. Which principle?',['Anticipation','Change','Contribution','Substitution'],'This principle is the basis of the income approach.'],
['Appraised values must be tied to a specific date because of the principle of…',['Change','Contribution','Substitution','Anticipation'],'Markets are dynamic.'],
['The four tests of highest and best use are legally permissible, physically possible, financially feasible and…',['Maximally productive','Architecturally pleasing','Owner preferred','Already built'],'Analyze it before applying the approaches.'],
['What is the first step of the appraisal process?',['Define the problem','Collect data','Apply the three approaches','Reconcile'],'Then data, highest and best use, approaches, reconciliation and report.'],
['Reconciliation produces the final value by…',['Weighting each approach by its reliability for this property','Taking a simple average','Using the highest value','Using the cost approach only'],'For example, a church leans on the cost approach.'],
['Which is NOT one of the six elements of comparison?',['Original purchase price of the subject','Property rights conveyed','Financing terms','Conditions of sale'],'The six: rights, conditions of sale, financing, market conditions, location, physical characteristics.'],
['A comparable was sold between family members. The appraiser should…',['Adjust it or exclude it because it was not arm\'s length','Use it with no change','Weight it most heavily','Add 10%'],'Comps should be arm\'s-length transactions.'],
['A comparable sold with below-market seller financing. Its price should be adjusted…',['Downward','Upward','Not at all','To the assessed value'],'Cheap financing inflates the price.'],
['How many comparables are generally adequate?',['Three to six','One','At least ten','Twenty'],'As recent as possible, ideally within six months.'],
['The cost to build an equally useful building with modern materials is…',['Replacement cost','Reproduction cost','Historical cost','Assessed cost'],'Reproduction cost is an exact replica.'],
['The most detailed and accurate cost-estimating method is…',['Quantity-survey method','Comparative-unit method','Segregated-cost method','Gross income multiplier'],'It counts every material and hour of labor.'],
['A house has only one bathroom for four bedrooms. This is…',['Functional obsolescence','Physical deterioration','Economic obsolescence','Contribution'],'Outdated design or layout.'],
['A new highway bypass cuts traffic to a well-kept motel. This is…',['Economic (external) obsolescence','Functional obsolescence','Physical deterioration','Curable depreciation'],'Caused by factors outside the property; usually incurable.'],
['Peeling exterior paint that costs less to fix than the value it adds is…',['Curable physical deterioration','Incurable physical deterioration','Economic obsolescence','Functional obsolescence'],'Curable means the fix costs less than the value added.'],
['The sales comparison approach is most reliable for…',['Single-family homes in active markets','Churches and schools','Unique historic properties','New special-purpose buildings'],'It needs plenty of recent comparable sales.'],
['A gross income multiplier is most appropriate when…',['Comparable properties have similar operating expenses','Expenses vary widely','There is no income','The property is owner-occupied'],'GIM ignores expenses.'],
['A lot is worth $45,000 vacant. With its old house it is worth $35,000. Demolition costs $5,000. The highest and best use is…',['Demolish and use as a vacant commercial site','Keep the house','Rent the house','Leave it vacant without demolishing'],'Site value = $45,000 − $5,000 = $40,000 &gt; $35,000, so the structure has negative value.'],
['Which value is set by a government assessor for property taxes?',['Assessed value','Market value','Investment value','Insurable value'],'It often differs from market value.'],
['When does price equal market value?',['When the sale meets all market value conditions (typical motivation, informed parties, reasonable exposure, cash-equivalent terms)','Always','Never','Only for new construction'],'Price is a historical fact; market value is an estimate.'],
],
k:[
['Which is NOT a required element of a valid contract?',['Notarization','Offer and acceptance','Consideration','Lawful purpose'],'Real estate adds one more requirement: it must be in writing.'],
['The seller accepts the buyer\'s offer but changes the closing date. Legally this is…',['A counteroffer','An acceptance','A breach','An option'],'Acceptance must mirror the offer exactly, and the roles switch.'],
['A grandmother deeds her house to a grandson "for love and affection." Is there consideration?',['Yes, consideration need not be money','No, consideration must be money','Only if the deed is recorded','Only if he pays taxes'],'Consideration is anything of legal value given up.'],
['A 17-year-old signs a purchase contract. The contract is…',['Voidable by the minor','Void from the start','Fully binding on both','Illegal'],'Minors may rescind within a reasonable time after reaching majority, returning consideration.'],
['Which law requires real estate contracts to be in writing to be enforceable?',['Statute of Frauds','The UCC','RESPA','Fair Housing Act'],'The UCC (Uniform Commercial Code) governs personal property.'],
['A court may enforce an oral real estate agreement if…',['There has been partial performance showing the parties\' intent','Both parties agree verbally','It is under $10,000','A broker witnessed it'],'Partial performance is the exception to the writing rule.'],
['Mark and Charlie shook hands on a land sale. Charlie later refuses to sign the written contract. Mark can…',['Do nothing; the oral agreement is unenforceable','Sue for specific performance','Keep the land','Force Charlie to sign'],'Statute of Frauds: no signed writing, no enforceable contract.'],
['Mark and Charlie wrote the terms on an envelope and both signed it, with an adequate property description. Charlie backs out. Mark can likely…',['Enforce it; it is a signed writing','Do nothing because it isn\'t a formal contract','Only get his deposit back','Sue the attorney'],'It needn\'t be formal; it must be written, signed and adequately describe the property.'],
['Nell signed a contract with no financing contingency and then couldn\'t get a loan. She is…',['Still obligated and may be in breach','Automatically released','Entitled to her deposit back','Protected by RESPA'],'Without a financing contingency, inability to borrow is not an excuse.'],
['Specific performance is most available to…',['A buyer, because each property is unique','A seller, because buyers are unique','Brokers seeking commission','Lenders'],'Sellers usually keep the earnest money and may seek damages.'],
['Which contingency lets a buyer cancel if the seller\'s title has unresolved defects?',['Title contingency','Financing contingency','Inspection contingency','Appraisal contingency'],'The seller gets a chance to cure first.'],
['Under an option-to-buy contract…',['The optionee may buy but is not obligated; the optionor must sell if exercised','Both parties must complete the sale','The option fee is refundable','The seller may cancel anytime'],'The option money is nonrefundable.'],
['Under a contract for deed, who holds legal title until the final payment?',['The seller','The buyer','A trustee','The lender'],'The buyer is the equitable owner and pays taxes and maintenance.'],
['Which closing cost is normally paid by the seller?',['Real estate brokerage commission','Loan origination fee','Discount points','Lender\'s appraisal fee'],'Seller costs are deducted from the sale proceeds.'],
['Which closing cost is normally paid by the buyer?',['Loan origination fee','Brokerage commission','Documentary stamp tax on the deed','Recording the satisfaction of the seller\'s mortgage'],'Loan-related costs are usually a percentage of the loan.'],
['Buyer closing costs typically run about…',['2%–6% of the loan amount','10%–15% of the price','0.5% of the price','A flat $500'],'They are paid in cash at closing.'],
['A key advantage of an escrow closing is that…',['Buyer and seller need not be present','It avoids all closing costs','No deed is needed','The broker holds title'],'The escrow agent releases the deed and funds when conditions are met.'],
['Before closing, which is the seller\'s responsibility?',['Removing encumbrances such as tax liens','Obtaining hazard insurance','Getting the survey','Getting financing'],'The seller also prepares the deed and pays off or arranges assumption of their loan.'],
['Lenders require the buyer to show property insurance at closing with…',['An insurance binder','A title policy','A survey','A gift letter'],'Coverage at least equal to the loan amount.'],
['"Time is of the essence" in a sales contract means…',['Deadlines must be strictly met','Closing must happen within 24 hours','The contract has no deadlines','Extensions are automatic'],'Missing a date can be a breach.'],
['A contract with a shockingly unfair (unconscionable) condition is most likely…',['Invalid','Fully enforceable','Enforceable only by the seller','Automatically renegotiated'],'Courts won\'t enforce unconscionable terms.'],
['Who keeps the buyer\'s deposit until closing in a typical sales contract?',['An escrow agent','The seller','The buyer\'s lender','The listing broker\'s personal account'],'Funds must be kept separate from the broker\'s own money.'],
],
brk:[
['Under an exclusive-right-to-sell listing, the owner finds the buyer without help. The broker…',['Still earns the commission','Earns nothing','Earns half','Earns only expenses'],'This is the broker\'s favorite listing type.'],
['Under an exclusive-agency (exclusive-brokerage) listing, the owner finds the buyer. The broker…',['Earns no commission','Earns the full commission','Earns half','Can sue for specific performance'],'Only one broker, but the owner keeps the right to sell commission-free.'],
['A seller lists with three brokers at once and pays only the one who finds the buyer. This is…',['An open listing','An exclusive-right-to-sell listing','A net listing','A limited-service listing'],'Brokers have little incentive to work hard.'],
['Why are net listings illegal in many states?',['The broker has an incentive to misstate market value','They pay too little','They require MLS membership','They last too long'],'The broker keeps everything above the seller\'s set amount.'],
['A listing where the broker mainly places the property on the MLS with minimal service is…',['A limited-service listing','An open listing','A net listing','An exclusive-agency listing'],'The commission is typically lower.'],
['Which is NOT one of the fiduciary duties an agent owes a principal?',['Guaranteeing the sale price','Loyalty','Confidentiality','Diligence'],'The duty of confidentiality continues after the relationship ends.'],
['Fraud differs from misrepresentation because fraud…',['Is intentional','Never causes harm','Only involves sellers','Is legal'],'Misrepresentation can happen without intent.'],
['A broker shows minority buyers homes only in certain neighborhoods. This is…',['Steering','Blockbusting','Redlining','Dual agency'],'Illegal under fair housing laws.'],
['A broker scares owners into selling cheaply by saying minorities are moving in. This is…',['Blockbusting','Steering','Puffing','Net listing'],'Illegal under fair housing laws.'],
['Which is NOT a protected class under federal fair housing law?',['Age','Familial status','Disability','Religion'],'Protected: sex, race, color, religion, national origin, disability, familial status. (ECOA, a lending law, does cover age.)'],
['Which agency enforces the Fair Housing Act?',['HUD','The CFPB','FEMA','The state real estate commission only'],'Complaints can be filed with HUD.'],
['A broker represents both buyer and seller in the same deal. This is…',['Dual agency','Transaction brokerage','Subagency','Steering'],'Illegal in some states; requires disclosure and consent where allowed.'],
['A broker who helps both parties close without advocating for either is a…',['Transaction broker','Dual agent','Buyer\'s agent','Subagent'],'Limited representation with no full fiduciary duty.'],
['A sales associate working for the listing broker is the seller\'s…',['Subagent','Principal','Dual agent','Transaction broker'],'The associate is the broker\'s agent.'],
['If a listing has no end date, what is a reasonable time for residential property?',['About three months','About six months','One year','Forever'],'About six months for commercial property.'],
['A listed property is taken by eminent domain. The broker…',['Is not entitled to a commission','Earns the full commission','Earns half','Can sue the government'],'The agency relationship ends.'],
['Two brokers agree to charge 6% across town. This is…',['An antitrust violation','Standard practice','Required by NAR','Legal if written'],'Commission rates must be negotiated individually.'],
['A listing broker who shows a floodplain property must…',['Disclose the flooding history to buyers','Say nothing because they represent the seller','Disclose only if asked in writing','Lower the price'],'Agents owe buyers honesty about material facts.'],
['A seller refuses a full-price written offer from a qualified buyer. The broker…',['Has likely earned the commission (ready, willing and able buyer)','Earns nothing','Must find another buyer','Can force the sale'],'The broker did what the listing required.'],
['Which document creates a relationship in which the broker works for the buyer?',['Buyer representation agreement','Listing agreement','Sales contract','Option contract'],'Can be exclusive-right-to-represent or open.'],
['Under an exclusive-right-to-represent agreement, the buyer\'s broker is paid…',['If the buyer buys any qualifying property, even one the buyer found','Only for properties the broker found','Only by the seller','Never'],'An open buyer agreement pays only for properties the broker identified.'],
['A desk-fee office lets licensees…',['Keep close to 100% of commissions for a monthly fee','Split commissions 50/50','Work without a broker','Avoid licensing'],'Better for experienced agents.'],
['Which is the correct order of the sales process?',['Listing, marketing and qualifying, negotiation, contract, closing','Marketing, listing, contract, negotiation, closing','Contract, listing, marketing, closing, negotiation','Negotiation, listing, closing, marketing, contract'],'Five steps.'],
['Many states require brokers to be bonded or pay into a recovery fund to…',['Cover uncollectible judgments against licensees','Pay commissions','Fund MLS','Buy foreclosed homes'],'A portion of license fees goes into the fund.'],
],
};

function makeQ(topic,mode){
  const g=GEN[topic]||[],b=BANK[topic]||[],T=TOPIC[topic];
  let useNum;
  if(T.kt)useNum=true;
  else if(mode==='theory')useNum=!b.length;
  else if(mode==='math')useNum=g.length>0;
  else useNum=g.length&&(b.length===0||Math.random()<(T.quant?0.5:0.15));
  return useNum?pick(g)():mcQ(topic,pick(b));
}

if(typeof module!=='undefined')module.exports={GEN,BANK,TOPICS,makeQ,PMT,PVA,BAL,NPER,solveRate,npvAt};
