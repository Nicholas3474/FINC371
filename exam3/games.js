/* ===== Games: Match-up and Lists ===== */
const LISTS=[
{t:'lease',title:'The four leasehold estates (by duration)',items:['Tenancy for a stated period','Tenancy from period to period','Tenancy at will','Tenancy at sufferance'],decoys:['Tenancy in common','Joint tenancy','Tenancy by the entirety']},
{t:'lease',title:'Basic elements of a lease',items:['Names of lessor and lessee','Identification of premises','Conveyance of premises','Term of the lease','Rent amount and payment terms','Duties of both parties','Signatures of both parties'],decoys:['Tenant\'s credit score','Appraised value','Broker\'s commission']},
{t:'lease',title:'Leases classified by how rent is paid or adjusted',items:['Gross lease','Net lease','Fixed-rent lease','Graduated-rent lease','Reappraisal lease','Percentage lease','Index lease'],decoys:['Ground lease','Tenancy at will','Option lease']},
{t:'lease',title:'What the OWNER pays, most to least (slide table)',ordered:true,items:['Gross: taxes, utilities and insurance','Net: taxes and insurance','Net-net: taxes only','Net-net-net: nothing']},
{t:'lease',title:'Landlord obligations',items:['Maintain habitable conditions and meet safety codes','Protect tenants from negligence-related harm','Make no unauthorized alterations'],decoys:['Pay the tenant\'s utilities','Guarantee the tenant\'s sales','Renew every lease']},
{t:'pm',title:'The three functions of property management',items:['Administrative management','Marketing','Physical management'],decoys:['Acquisition','Disposition','Appraisal']},
{t:'pm',title:'The four functions of an asset manager',items:['Management','Acquisition','Financing','Disposition'],decoys:['Rent collection','Move-in inspections','Advertising']},
{t:'pm',title:'Powers a management agreement usually gives the manager',items:['Set and collect rents','Execute, extend or cancel leases','Make settlements with tenants','Hire, fire and supervise personnel','Spend property funds within limits'],decoys:['Sell the property','Refinance the mortgage','Change the zoning']},
{t:'pm',title:'Property manager tasks, in lease order',ordered:true,items:['Tenant selection','Lease negotiation','Move-in inspection','Rent collection','Move-out inspection','Security deposit return']},
{t:'res',title:'The five principal types of residential development',items:['Single-family detached houses','Single-family attached houses','Multifamily residences','Manufactured homes','Second homes'],decoys:['Office parks','Power centers','Industrial parks']},
{t:'res',title:'Types of attached housing (unit review)',items:['Townhome','Plex','Patio house'],decoys:['Cooperative','Manufactured home','Time-share']},
{t:'res',title:'Steps in a residential market analysis',ordered:true,items:['Delineate the market area','Analyze recent trends','Determine future demand','Analyze future supply']},
{t:'com',title:'Five characteristics of a shopping center',items:['Unified architecture managed as a unit','A site serving a particular trade area','On-site parking','Delivery facilities separate from shopping','Single ownership and management'],decoys:['A downtown location','Government ownership','A hotel on site']},
{t:'com',title:'Shopping centers, smallest to largest',ordered:true,items:['Neighborhood (convenience) center','Community center','Regional center','Super-regional center']},
{t:'com',title:'Shopping center milestones, oldest first',ordered:true,items:['Country Club Plaza, Kansas City','Northgate, Seattle (1950)','Southdale, near Minneapolis (1956)','Mall of America (1992)']},
{t:'com',title:'Shopping center feasibility steps',ordered:true,items:['Define the trade area','Determine the size of the market','Analyze existing and potential competition','Estimate the share of sales the center can capture']},
{t:'com',title:'Factors in choosing an industrial site',items:['Availability of land','Availability of utilities','Access to major transportation'],decoys:['Nearby shopping malls','School quality','Views']},
{t:'com',title:'Industrial site feasibility steps',ordered:true,items:['Determine existing or potential supply','Forecast demand for additional space','Estimate the absorption rate','Compare the site\'s competitiveness']},
{t:'com',title:'Types of transient hotels',items:['Commercial hotels','Highway or airport hotels','Resort hotels'],decoys:['Factory outlet hotels','Power hotels','Ground-lease hotels']},
{t:'com',title:'Sources of lodging demand',items:['Pleasure travelers','Business travelers','Conventioneers'],decoys:['Commuters','Industrial tenants','Farmers']},
{t:'mkt',title:'The six major space-market segments',items:['Residential','Industrial','Retail','Office','Agricultural','Lodging'],decoys:['Municipal','Financial','Educational']},
{t:'mkt',title:'Office space classes, best to worst',ordered:true,items:['Class A','Class B','Class C','Class D']},
{t:'mkt',title:'The three determinants of real estate asset prices',items:['Opportunity cost of capital','Growth expectations','Risk'],decoys:['Construction cost','Zoning','Number of brokers']},
{t:'mkt',title:'The three components of the real estate system',items:['Space market','Asset market','Development industry'],decoys:['Mortgage market','Appraisal industry','Brokerage industry']},
{t:'mkt',title:'The five basic inputs to market analysis',items:['Vacancy rate','Rent or price level','New construction started','New construction completed','Absorption of new space'],decoys:['Mortgage rates','Cap rates','Number of brokers']},
{t:'mkt',title:'Publicly traded assets (Figure 13.5)',items:['Stocks','REITs','Mutual funds','Bonds','MBS','Money instruments'],decoys:['Real property','Whole mortgages','Bank loans','Venture debt']},
{t:'mkt',title:'Retail space subcategories, smallest to largest',ordered:true,items:['Freestanding retail','Neighborhood center','Community center','Regional center','Super-regional center','Megamall']},
{t:'inv',title:'From PGI to NOI (Ch 19)',ordered:true,items:['Potential gross income','Minus vacancy & collection loss','Plus miscellaneous income','Effective gross income','Minus operating expenses','Minus capital expenditures','Net operating income']},
{t:'inv',title:'NOT included in operating expenses',items:['Mortgage payments','Tax depreciation','Capital expenditures'],decoys:['Property taxes','Utilities','Management fees']},
{t:'inv',title:'Capital expenditures (CAPX)',items:['Roof replacement','Additions','HVAC replacement','Resurfacing parking areas'],decoys:['Utilities','Hazard insurance','Laundry income']},
{t:'inv',title:'Fixed operating expenses',items:['Hazard insurance','Local property taxes'],decoys:['Utilities','Maintenance & supplies','Garbage collection']},
{t:'inv',title:'Miscellaneous income sources',items:['Garage rentals & parking fees','Laundry & vending machines','Clubhouse rentals'],decoys:['Base rent','Security deposits','Mortgage proceeds']},
{t:'inv',title:'Advantages of real estate investment',items:['Cash flow from operations','Appreciation','Portfolio diversification','Financial leverage'],decoys:['High liquidity','Low dollar amounts','Stable economy']},
{t:'inv',title:'Disadvantages of real estate investment',items:['High dollar amounts','Lack of liquidity','Changing economic environments'],decoys:['Depreciation','Tax-deductible interest','Diversification']},
{t:'inv',title:'DCF layout to before-tax cash flow',ordered:true,items:['Purchase price','Potential gross income','Other income','Vacancy & collection loss','Effective gross income','Operating expenses','Net operating income','Debt service','Before-tax cash flow']},
{t:'green',title:'LEED levels, lowest to highest',ordered:true,items:['Certified (40–49)','Silver (50–59)','Gold (60–79)','Platinum (80+)']},
{t:'green',title:'LEED timeline, oldest first',ordered:true,items:['Green rating idea (1993)','LEED v1.0 (1998)','LEED v2.0 + Greenbuild in Austin (2001)','LEED v2.1 (2003)','LEED v4.1 (2019)']},
{t:'green',title:'NAHB Green Building Standard levels, lowest first',ordered:true,items:['Bronze','Silver','Gold','Emerald']},
{t:'green',title:'Green Globes assessment dimensions',items:['Energy efficiency','Environmental impact','Health','Operation and management'],decoys:['Construction cost','Rent level','Zoning']},
{t:'green',title:'Living Building Challenge certifications',items:['Living Building Certification','Petal Certification','Zero Energy Certification'],decoys:['LEED Gold','Emerald','Green Associate']},
{t:'pm',title:'Emergencies allowing landlord entry without notice',items:['Smoke/fire','Water leak','Security system','Storm damage'],decoys:['Showing the unit','Routine inspection','Rent collection']},
{t:'pm',title:'IREM designations',items:['CPM (Certified Property Manager)','ARM (Accredited Resident Manager)','AMO (Accredited Management Organization)'],decoys:['RPA (Real Property Administrator)','MAI','CCIM']},
{t:'res',title:'The capital stack (slides)',items:['Senior debt','Junior debt','Mezzanine financing','Equity investors'],decoys:['Security deposits','CAM fees','Percentage rent']},
{t:'com',title:'Market Analysis Model inputs',items:['Market feasibility','Financial feasibility','Location/site feasibility'],decoys:['Zoning variance','Appraisal review','Tenant estoppel']},
{t:'mktm',title:'Building a months-supply estimate',ordered:true,items:['Add vacant space and space under construction','Find net absorption per month (annual ÷ 12)','Divide the total by monthly net absorption']},
{t:'annuity',title:'The six TVM formulas',items:['PV of a lump sum','FV of a lump sum','PV of an annuity','FV of an annuity','Sinking fund payment','Mortgage payment'],decoys:['Net present value','Cap rate','Months supply']},
{t:'npv',title:'Types of investment risk',items:['Business risk','Financial risk','Purchasing power risk','Liquidity risk'],decoys:['Amortization risk','Vacancy risk','Closing risk']},
{t:'pay',title:'Loan repayment structures',items:['Interest-only','Fully amortizing','Partially amortizing (balloon)'],decoys:['Net lease','Ground lease','Strict amortizing']},
{t:'bal',title:'Building one row of an amortization schedule',ordered:true,items:['Interest = beginning balance × periodic rate','Principal = payment − interest','Ending balance = beginning balance − principal']},
];
const DATES=[
['LEED v1.0 created','1998'],['First Greenbuild conference (Austin)','2001'],['LEED v4.1','2019'],['LEED Gold points','60–79'],['LEED Platinum points','80+'],['LEED Silver points','50–59'],['Green building ASTM standard','E2114-06a'],
['Slide pro forma NOI','$89,100'],['Slide pro forma EGI','$162,000'],['Slide pro forma operating expenses','$64,800'],['Management fee base (slides)','% of effective gross income'],['Landlord entry notice','12-hour lead time'],['Landlord entry hours','7:30 a.m.–8:00 p.m.'],
['Tenancy at will notice (slides)','30 days'],['Manufactured home cost (slides)','~$40/sq ft vs. $90 site-built'],['Asset manager fee, 1970s–80s','0.50%–1.50% of AUM'],['Corporate real estate owned','Over $2 trillion'],['Corporate RE share of industrial firms\' assets','25%–40%'],['Asset manager performance period','3–5 years'],
['Lease that must be in writing','Over 1 year'],['Max tenancy for a stated period','Up to 99 years'],['Typical ground lease length','Over 50 years'],['Property manager fee (direct hire)','4%–10% of gross income'],
['Neighborhood center typical GLA','50,000 sq ft'],['Community center typical GLA','150,000 sq ft'],['Regional center typical GLA','400,000 sq ft'],['Super-regional center typical GLA','1,000,000 sq ft'],
['Neighborhood center site','About 3 acres'],['Community center site','10–30 acres'],['Regional center site','30–50 acres'],['Super-regional center site','100+ acres'],
['Neighborhood center trade radius','1.5 miles'],['Community center trade radius','3–5 miles'],['Regional center trade radius (Unit 12)','8–10 miles'],['Super-regional draw','Over 50 miles'],
['Primary trade area share of sales','60–70%'],['Secondary trade area share of sales','15–20%'],['Secondary trade area drive time','15–20 minutes'],['Superstore GLA','60,000–200,000 sq ft'],
['Northgate (Seattle) opened','1950'],['Southdale (first enclosed mall) opened','1956'],['Mall of America opened','1992'],['Mall of America size','4.2 million sq ft'],['Mall of America visitors a year','Over 42 million'],['Factory outlet malls emerged','1980s'],
['Example vacancy rate (50 of 1,500)','3.3%'],['Example months supply (30/mo; 30 vacant; 90 building)','4 months'],['Study exercise 9 months supply','10.8 months'],['Al\'s Shoe Store rent','$2,160'],
['Lease example base rent','$3,880 a month'],['Lease example security deposit','$3,000'],['Lease example late fee','$300 after 5 days'],['Lease example CAM fee','$700 a month'],['Milford Hills total development cost','$2,287,050'],
];

/* drop lists for topics not on this exam */
for(let i=LISTS.length-1;i>=0;i--)if(!TOPIC[LISTS[i].t])LISTS.splice(i,1);
let GM={view:'menu'};
function recAtt(topic,ok){logAnswer(topic,ok,false,false);(S.att[topic]=S.att[topic]||[]).push(ok?1:0);if(S.att[topic].length>20)S.att[topic]=S.att[topic].slice(-20);save();renderHeader();}

function newMatch(src){
  let pairs=[],topic=null,title='';
  if(src==='dates'){title='Dates & numbers';const used=new Set();for(const p of shuffle(DATES)){if(pairs.length===6)break;if(used.has(p[1]))continue;used.add(p[1]);pairs.push({a:p[0],b:p[1]});}}
  else{const ch=+src;topic='kt'+ch;title='Key terms · '+chShort(ch);const used=new Set();for(const t of shuffle(TERMS.filter(x=>x.c===ch))){if(pairs.length===6)break;if(t.g>=0&&used.has(t.g))continue;if(t.g>=0)used.add(t.g);pairs.push({a:t.t,b:t.s});}}
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
    <div class="topic-grid g-grid">${CHS.map(c=>`<button class="tpick" data-gmatch="${c}"><span>Key terms · ${chShort(c)}</span>${chip(status('kt'+c))}</button>`).join('')}<button class="tpick" data-gmatch="dates"><span>Dates & numbers</span><span class="muted">All chapters</span></button></div></section>
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
