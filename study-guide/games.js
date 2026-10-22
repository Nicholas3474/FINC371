/* ===== Games: Match-up and Lists ===== */
const LISTS=[
{t:'k',title:'Elements of a valid real estate contract',items:['Offer','Acceptance','Consideration','Parties with capacity','Lawful purpose','In writing'],decoys:['Notarization','Recorded at the courthouse','Broker\'s signature','Earnest money deposit']},
{t:'k',title:'Common contingencies in real estate contracts',items:['Financing contingency','Title contingency','Inspection and repair contingency'],decoys:['Due-on-sale contingency','Acceleration contingency','Commission contingency']},
{t:'k',title:'What a traditional sales contract should specify',items:['Property description','Purchase price and how it is paid','Escrow arrangement','Effect of destruction of improvements','Closing date'],decoys:['Broker\'s commission rate','Buyer\'s credit score','Appraiser\'s name']},
{t:'k',title:'Buyer\'s tasks between contract and closing',items:['Obtain financing','Examine title evidence','Survey the property','Obtain property insurance','Inspect the property'],decoys:['Prepare the deed','Remove encumbrances','Pay off the seller\'s loan']},
{t:'k',title:'Seller\'s closing costs',items:['Brokerage commission','Attorney fees for the deed','Documentary stamp taxes','Recording the mortgage satisfaction'],decoys:['Loan origination fee','Discount points','Appraisal fee','Hazard insurance premium']},
{t:'brk',title:'Steps of the real estate sales process',ordered:true,items:['Listing','Marketing the property and qualifying buyers','Presentation and negotiations','Contracts','Settlement or closing']},
{t:'brk',title:'Classes protected by federal fair housing law',items:['Sex','Race','Color','Religion','National origin','Disability','Familial status'],decoys:['Age','Marital status','Income level','Receipt of public assistance']},
{t:'brk',title:'Ways a broker-owner agency relationship ends',items:['A transaction occurs','The term expires','Mutual agreement','One party breaches','Contractual incapacity','Destruction of the property','Eminent domain'],decoys:['The price is reduced','The listing goes on the MLS','Interest rates rise']},
{t:'brk',title:'Fiduciary duties an agent owes the principal',items:['Good faith','Diligence','Confidentiality','Loyalty'],decoys:['Guaranteeing the sale price','Giving legal advice','Charging the lowest commission']},
{t:'brk',title:'Types of listing agreements',items:['Open listing','Exclusive-brokerage (exclusive-agency) listing','Exclusive-right-to-sell listing','Net listing','Limited-service listing'],decoys:['Exclusive-right-to-represent','Option listing','Dual listing']},
{t:'apc',title:'Steps of the appraisal process',ordered:true,items:['Define the problem','Select and collect data','Highest and best use analysis','Apply the three approaches to value','Reconcile into a final estimate','Report the defined value']},
{t:'apc',title:'The four key appraisal principles',items:['Anticipation','Change','Substitution','Contribution'],decoys:['Amortization','Reconciliation','Capitalization']},
{t:'apc',title:'The six elements of comparison',items:['Property rights conveyed','Conditions of sale','Financing terms','Market conditions','Location','Physical characteristics'],decoys:['Original purchase price of the subject','Assessed value','Owner\'s asking price']},
{t:'apc',title:'Tests of highest and best use',items:['Legally permissible','Physically possible','Financially feasible','Maximally productive'],decoys:['Architecturally attractive','Preferred by the owner','Already built']},
{t:'apc',title:'Steps of the cost approach',ordered:true,items:['Estimate the site value as if vacant','Estimate the production cost of the improvements','Subtract accrued depreciation','Add the site value']},
{t:'apc',title:'Types of accrued depreciation',items:['Physical deterioration','Functional obsolescence','Economic (external) obsolescence'],decoys:['Tax depreciation','Amortization','Appreciation']},
{t:'apc',title:'Methods of estimating production cost',items:['Comparative-unit method','Segregated-cost method','Quantity-survey method'],decoys:['Gross income multiplier','Direct capitalization','Age-life method']},
{t:'apc',title:'Appraiser levels, least to most authority',ordered:true,items:['Trainee appraiser','Licensed residential','Certified residential','Certified general']},
{t:'inc',title:'Income approach techniques',items:['Gross income multiplier','Net income (direct) capitalization','Discounted cash flow analysis'],decoys:['Segregated-cost method','Age-life method','Quantity-survey method']},
{t:'inc',title:'From gross income to NOI',ordered:true,items:['Potential gross income','Subtract vacancy and collection loss','Effective gross income','Subtract operating expenses','Net operating income']},
{t:'fin',title:'Types of foreclosure',items:['Judicial foreclosure','Nonjudicial foreclosure','Strict foreclosure'],decoys:['Acceleration foreclosure','Amortized foreclosure','Prepayment foreclosure']},
{t:'fin',title:'Federal laws affecting mortgage lending',items:['Equal Credit Opportunity Act','Truth-in-Lending (Consumer Credit Protection Act)','RESPA','Flood Disaster Protection Act','Fair Credit Reporting Act','Dodd-Frank Act'],decoys:['FIRREA','Fair Housing Act of 1988','Civil Rights Act of 1866']},
{t:'fin',title:'The five major types of mortgage originators',items:['Mortgage bankers','Mortgage brokers','Commercial banks','Savings institutions (thrifts)','Credit unions'],decoys:['Ginnie Mae','Pension funds','REITs']},
{t:'fin',title:'Sources of capital in commercial property markets',items:['Individual investors','Life insurance companies','Pension funds','REITs','Commercial banks','CMBS','Tax increment financing'],decoys:['FHA','VA','Private mortgage insurance']},
{t:'fin',title:'Secondary market timeline, oldest first',ordered:true,items:['Fannie Mae created (1938)','Fannie Mae becomes a GSE; Ginnie Mae created (1968)','Freddie Mac created (1970)','Fannie Mae enters conservatorship (2008)']},
{t:'fin',title:'Types of REITs',items:['Equity REITs','Mortgage REITs','Hybrid REITs'],decoys:['Construction REITs','Municipal REITs','Insured REITs']},
{t:'uw',title:'Categories of underwriting guidelines',items:['Loan-to-value ratios','Down payment sources','Income ratios'],decoys:['Age of the property','Borrower\'s age','Type of broker used']},
{t:'npv',title:'Types of investment risk',items:['Business risk','Financial risk','Purchasing power risk','Liquidity risk'],decoys:['Amortization risk','Appraisal risk','Closing risk']},
{t:'annuity',title:'The six TVM formulas',items:['PV of a lump sum','FV of a lump sum','PV of an annuity','FV of an annuity','Sinking fund payment','Mortgage payment'],decoys:['Net present value','Cap rate','Gross income multiplier']},
{t:'pay',title:'Loan repayment structures',items:['Interest-only','Fully amortizing','Partially amortizing (balloon)'],decoys:['Lien theory','Title theory','Strict amortizing']},
{t:'bal',title:'Building one row of an amortization schedule',ordered:true,items:['Interest = beginning balance × periodic rate','Principal = payment − interest','Ending balance = beginning balance − principal']},
];
const DATES=[
['FIRREA passed','1989'],['Appraisal Foundation formed','1987'],['Freddie Mac created','1970'],['Ginnie Mae created; Fannie Mae becomes a GSE','1968'],['Fannie Mae created','1938'],['First savings institution (thrift)','1831'],
['Civil Rights Act guaranteeing property rights','1866'],['Fair Housing Act','1988'],['Fannie Mae enters conservatorship','2008'],
['Front-end (mortgage debt) ratio limit','28%'],['Back-end (total debt) ratio limit','36%'],['Minimum commercial DCR','1.20'],['Typical commercial LTV','About 70%'],['LTV above which PMI is required','80%'],['VA maximum LTV','100%'],
['ECOA decision deadline','30 days'],['Truth-in-Lending APR disclosure','3 business days'],['Certified general appraiser experience','3,000 hours'],['Certified residential appraiser experience','2,500 hours'],['Licensed residential appraiser experience','2,000 hours'],['Trainee appraiser education','75 hours'],
['First fair housing violation penalty','$52,596'],['FHA seller contributions treated as an inducement above','6%'],['"Reasonable time" for a residential listing','3 months'],['"Reasonable time" for a commercial listing','6 months'],
['NAR membership','Over 1 million'],['Each broker\'s share of a 6% MLS 50-50 split','3%'],['Buyer closing costs (share of the loan)','2–6%'],['Loan origination fee','1–3% of the loan'],['Community bank assets','Under $500 million'],['States requiring written listings','20'],
['Typical contract-to-closing period','60 days'],['Rate cut from one discount point','About 0.125%'],['Comparables generally needed','3 to 6'],['Two-step mortgage fixed period','5–7 years'],
];

let GM={view:'menu'};
function recAtt(topic,ok){(S.att[topic]=S.att[topic]||[]).push(ok?1:0);if(S.att[topic].length>20)S.att[topic]=S.att[topic].slice(-20);save();renderHeader();}

function newMatch(src){
  let pairs=[],topic=null,title='';
  if(src==='dates'){title='Dates & numbers';const used=new Set();for(const p of shuffle(DATES)){if(pairs.length===6)break;if(used.has(p[1]))continue;used.add(p[1]);pairs.push({a:p[0],b:p[1]});}}
  else{const ch=+src;topic='kt'+ch;title='Key terms · Ch '+ch;const used=new Set();for(const t of shuffle(TERMS.filter(x=>x.c===ch))){if(pairs.length===6)break;if(t.g>=0&&used.has(t.g))continue;if(t.g>=0)used.add(t.g);pairs.push({a:t.t,b:t.s});}}
  pairs.forEach((p,i)=>p.id=i);
  GM={view:'match',src,topic,title,pairs,left:shuffle(pairs.map(p=>p.id)),right:shuffle(pairs.map(p=>p.id)),sel:null,done:{},miss:0,flash:null,t0:Date.now()};
}
function newList(i){
  const L=LISTS[i];
  GM={view:'list',i,L,opts:L.ordered?shuffle(L.items):shuffle(L.items.concat(L.decoys||[])),picked:[],checked:false};
}
function renderGames(){
  const el=document.getElementById('p-games');
  if(GM.view==='menu'){
    el.innerHTML=`<div class="intro"><p>Two quick games built from your notes. Results count toward each topic's status: a match-up round with one miss or fewer counts as correct, and so does a perfect list.</p></div>
    <section class="day"><header><h3>Match-up</h3><span class="muted">6 pairs per round. Tap a term, then its match.</span></header>
    <div class="topic-grid g-grid">${[6,8,9,16,17,18].map(c=>`<button class="tpick" data-gmatch="${c}"><span>Key terms · Ch ${c}</span>${chip(status('kt'+c))}</button>`).join('')}<button class="tpick" data-gmatch="dates"><span>Dates & numbers</span><span class="muted">All chapters</span></button></div></section>
    <section class="day"><header><h3>Lists</h3><span class="muted">Pick every item that belongs, or put the steps in order.</span></header>
    <div class="btns"><button class="btn" data-glist="rand">Random list</button></div>
    <div class="g-lists">${LISTS.map((L,i)=>`<button class="tpick" data-glist="${i}"><span>${L.title}</span><span class="g-tag">${TOPIC[L.t].unit} · ${L.ordered?'Order':'Pick all'}</span></button>`).join('')}</div></section>`;
    return;}
  if(GM.view==='match'){
    const left=Object.keys(GM.done).length,all=GM.pairs.length,fin=left===all;
    el.innerHTML=`<div class="practice-bar"><b>${GM.title}</b><span>${left}/${all} matched · ${GM.miss} miss${GM.miss===1?'':'es'}</span><button class="link" data-gmenu>Back to games</button></div>
    ${fin?`<div class="result"><h3>${GM.miss<=1?'Nice work':'Round complete'}: ${GM.miss} miss${GM.miss===1?'':'es'} in ${Math.round((Date.now()-GM.t0)/1000)} seconds</h3><div class="btns"><button class="btn" data-gmatch="${GM.src}">New round</button><button class="btn ghost" data-gmenu>Back to games</button></div></div>`:''}
    <div class="g-terms">${GM.left.map(id=>{const p=GM.pairs[id];return `<button class="g-chip ${GM.done[id]?'g-ok':''} ${GM.sel===id?'g-sel':''} ${GM.flash&&GM.flash.a===id?'g-bad':''}" data-gl="${id}" ${GM.done[id]?'disabled':''}>${esc(p.a)}</button>`;}).join('')}</div>
    <div class="g-defs">${GM.right.map(id=>{const p=GM.pairs[id];return `<button class="g-def ${GM.done[id]?'g-ok':''} ${GM.flash&&GM.flash.b===id?'g-bad':''}" data-gr="${id}" ${GM.done[id]||GM.sel==null?'':''} ${GM.done[id]?'disabled':''}>${GM.done[id]?`<b>${esc(p.a)}</b> · `:''}${esc(p.b)}</button>`;}).join('')}</div>
    ${!fin&&GM.sel==null?'<p class="muted">Tap a term above, then the matching item below.</p>':''}`;
    return;}
  if(GM.view==='list'){
    const L=GM.L,ck=GM.checked;let res='';
    if(ck){
      if(L.ordered){const ok=GM.picked.every((x,i)=>x===L.items[i]);res=`<div class="sol ${ok?'sol-ok':'sol-no'}"><div class="sol-h">${ok?'Perfect order':'Not quite'}</div><ol>${L.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>`;}
      else{const want=new Set(L.items),got=new Set(GM.picked);const missed=L.items.filter(x=>!got.has(x)),extra=GM.picked.filter(x=>!want.has(x));const ok=!missed.length&&!extra.length;
        res=`<div class="sol ${ok?'sol-ok':'sol-no'}"><div class="sol-h">${ok?`All ${L.items.length} correct`:`${L.items.length-missed.length} of ${L.items.length} found${extra.length?`, ${extra.length} wrong pick${extra.length>1?'s':''}`:''}`}</div>${missed.length?`<p><b>Missed:</b> ${missed.map(esc).join(' · ')}</p>`:''}${extra.length?`<p><b>Doesn't belong:</b> ${extra.map(esc).join(' · ')}</p>`:''}<p><b>The full list:</b> ${L.items.map(esc).join(' · ')}</p></div>`;}
    }
    el.innerHTML=`<div class="practice-bar"><b>${TOPIC[L.t].unit} · ${L.ordered?'Put in order':'Pick all that belong'}</b><span>${L.ordered?`${GM.picked.length}/${L.items.length} placed`:`${GM.picked.length} picked`}</span><button class="link" data-gmenu>Back to games</button></div>
    <div class="q"><div class="q-prompt">${L.ordered?`Tap these in the correct order: <b>${esc(L.title)}</b>`:`Which items are on this list? <b>${esc(L.title)}</b> <span class="muted">(${L.items.length} belong)</span>`}</div>
    ${L.ordered&&GM.picked.length?`<ol class="g-order">${GM.picked.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`:''}
    <div class="g-terms">${GM.opts.map((x,i)=>{const on=GM.picked.includes(x);let cls=on?'g-sel':'';if(ck&&!L.ordered){const inL=L.items.includes(x);cls=inL&&on?'g-ok':inL?'g-miss':on?'g-bad':'';}
      if(L.ordered&&on)return '';return `<button class="g-chip ${cls}" data-gitem="${i}" ${ck?'disabled':''}>${esc(x)}</button>`;}).join('')}</div>
    ${res}
    <div class="btns" style="margin-top:12px">${ck?`<button class="btn" data-glist="rand">Next list</button><button class="btn ghost" data-glist="${GM.i}">Retry this one</button>`:`<button class="btn" data-gcheck ${L.ordered&&GM.picked.length<L.items.length?'disabled':''}>Check</button>${GM.picked.length?'<button class="btn ghost" data-greset>Clear</button>':''}`}</div></div>`;
  }
}
document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;const d=b.dataset;
  if(d.gmatch){newMatch(d.gmatch);renderGames();window.scrollTo(0,0);}
  else if('gmenu' in d){GM={view:'menu'};renderGames();}
  else if(d.gl!=null){GM.sel=+d.gl;GM.flash=null;renderGames();}
  else if(d.gr!=null){if(GM.sel==null)return;const r=+d.gr;
    if(r===GM.sel){GM.done[r]=1;GM.sel=null;GM.flash=null;if(Object.keys(GM.done).length===GM.pairs.length&&GM.topic)recAtt(GM.topic,GM.miss<=1);}
    else{GM.miss++;GM.flash={a:GM.sel,b:r};GM.sel=null;setTimeout(()=>{if(GM.flash){GM.flash=null;renderGames();}},700);}
    renderGames();}
  else if(d.glist){newList(d.glist==='rand'?Math.floor(Math.random()*LISTS.length):+d.glist);renderGames();window.scrollTo(0,0);}
  else if(d.gitem!=null){const x=GM.opts[+d.gitem];const k=GM.picked.indexOf(x);if(k>=0)GM.picked.splice(k,1);else GM.picked.push(x);renderGames();}
  else if('greset' in d){GM.picked=[];renderGames();}
  else if('gcheck' in d){GM.checked=true;const L=GM.L;
    const ok=L.ordered?GM.picked.every((x,i)=>x===L.items[i]):(GM.picked.length===L.items.length&&GM.picked.every(x=>L.items.includes(x)));
    recAtt(L.t,ok);renderGames();}
});
