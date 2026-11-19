/* ===== From the lecture slides: Ch 19, Sustainable Development, and slide-only details for Units 7, 10–13 ===== */

/* ---------- Ch 19 and sustainability key terms (from the slides' own definitions) ---------- */
[
['Investment','Present sacrifice in anticipation of expected future benefit.'],
['Wealth Maximization Objective','Investors choose only projects whose expected benefits exceed their costs, especially those whose benefits exceed costs by the largest amount.'],
['Net Present Value (NPV)','The present value of cash inflows less the present value of cash outflows, discounted at the investor\'s required rate of return.'],
['Internal Rate of Return (IRR)','The discount rate that makes the NPV exactly equal to zero.'],
['Hurdle Rate','Another name for the discount rate (the investor\'s required rate of return) that the IRR is compared against.'],
['Discounted Cash Flow Model (DCF)','A valuation model that incorporates the initial investment, forecasted cash flows over the holding period, and the forecasted sale price at reversion.'],
['After-Tax Cash Flow (ATCF)','The money in the investor\'s wallet at the end of each year from operating the property.'],
['After-Tax Equity Reversion (ATER)','The return of the money invested in the property plus the change in its value, received at sale.'],
['Financial Leverage','Using other people\'s money ("OPM") to amplify the investor\'s returns; it can be positive, negative or neutral and adds default and foreclosure risk.'],
['Portfolio Diversification','Maximizing investment returns while spreading risk across different types of investments, such as property type and geography.'],
['Potential Gross Income (PGI)','Rental income assuming 100% occupancy; sometimes called potential gross revenue (PGR).'],
['Vacancy & Collection Loss (VC)','Income lost to empty space and unpaid rent, estimated from the property\'s history, competing properties and the natural vacancy rate.'],
['Natural Vacancy Rate','The vacancy rate expected in a stable or equilibrium market.'],
['Miscellaneous Income (MI)','Income beyond rent, such as garage rentals and parking fees, laundry and vending machines, and clubhouse rentals.'],
['Effective Gross Income (EGI)','Potential gross income minus vacancy and collection loss plus miscellaneous income.'],
['Operating Expenses (OE)','Ordinary and regular expenditures necessary to keep a property functioning competitively; they exclude mortgage payments, tax depreciation and capital expenditures.'],
['Fixed Expenses','Operating expenses that do not vary with occupancy, at least in the short run, such as hazard insurance and local property taxes.'],
['Variable Expenses','Operating expenses that tend to vary with occupancy, such as utilities and maintenance and supplies.'],
['Capital Expenditures (CAPX)','Non-recurring expenditures that increase the value of the structure or prolong its useful life, such as roof replacement, additions, HVAC replacement and resurfacing parking areas.'],
['Net Operating Income (NOI)','The property\'s "dividend": effective gross income minus operating expenses and capital expenditures, and the fundamental determinant of the property\'s value.'],
['Direct Capitalization','The first income valuation method: value equals next year\'s NOI divided by the overall cap rate, V = NOI₁ ÷ Rₒ.'],
['Overall Cap Rate (Ro)','The rate used to convert one year of NOI into value; it is a cap rate, NOT a discount rate.'],
['Before-Tax Cash Flow (BTCF)','Net operating income minus debt service.'],
].forEach(([t,d])=>TERMS.push({c:19,t,d,s:d,g:t==='Internal Rate of Return (IRR)'||t==='Hurdle Rate'?101:t==='Fixed Expenses'||t==='Variable Expenses'?102:t==='Direct Capitalization'||t==='Overall Cap Rate (Ro)'?103:-1}));
[
['Sustainability','The ability to endure.'],
['Sustainable Development','Development that meets the needs of the present without compromising the ability of future generations to meet their own needs (Brundtland Report).'],
['Brundtland Report','The World Commission on Environment and Development (WCED) report that defined sustainable development, named for commission chair G.H. Brundtland.'],
['Green Building','A building that provides the specified performance requirements while minimizing disturbance to and improving the functioning of local, regional and global ecosystems during and after construction (ASTM Standard E2114-06a).'],
['Green Washing','Marketing a product, building or company as environmentally friendly without substance behind the claim.'],
['U.S. Green Building Council (USGBC)','An organization whose members span the construction industry (owners, designers, contractors) and that sponsors the LEED rating systems.'],
['LEED','Leadership in Energy and Environmental Design: the USGBC green building rating system, created in 1998.'],
['BREEAM / Green Globes','A voluntary green building rating system developed in the UK that assesses existing commercial buildings on energy efficiency, environmental impact, health, and operation and management.'],
['Living Building Challenge','A framework for buildings that generate more energy than they use, capture and treat all water on site, and use healthy materials.'],
['Petal Certification','A Living Building Challenge certification requiring at least three of the seven Petals, one of which must be Water, Energy or Materials.'],
['Zero Energy Certification','A Living Building Challenge certification requiring a project to generate all of its energy on site without combustion.'],
['NAHB Green Building Standard','A home builders\' green rating with Bronze, Silver, Gold and Emerald levels.'],
['LEED Green Associate','The entry-level LEED credential; LEED Accredited Professionals (AP) add a specialty such as BD+C or O+M.'],
].forEach(([t,d])=>TERMS.push({c:20,t,d,s:d,g:t==='Petal Certification'||t==='Zero Energy Certification'?104:t==='Sustainability'||t==='Sustainable Development'?105:-1}));
TERMS.forEach(o=>{if(o.c>=19){const base=o.t.replace(/\s*\(.*?\)/g,'');let m=o.d;[o.t,base].concat((o.t.match(/\((.*?)\)/g)||[]).map(x=>x.slice(1,-1))).filter(w=>w.length>=3).sort((a,b)=>b.length-a.length).forEach(w=>{m=m.replace(new RegExp('\\b'+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(s|es)?\\b','gi'),'____');});o.s=m;}});
[19,20].forEach(ch=>{GEN['kt'+ch]=[()=>ktQ(ch)];});
/* where the TA's key-term definitions differ from the professor's slides, use the slides */
[['Net Lease','A lease where the tenant pays base rent plus utilities, while the owner pays the real estate taxes and insurance (per the lecture slides).'],
 ['Net-Net Lease (Double Net Lease)','A lease where the tenant pays rent plus utilities and insurance, while the owner still pays the real estate taxes (per the lecture slides).'],
 ['Super-Regional Center','The largest retail center, starting at 750,000 square feet of gross leasable area and typically exceeding 1 million, with at least three anchor department stores.']
].forEach(([t,d])=>{const o=TERMS.find(x=>x.t===t);if(o){o.d=d;o.s=d.replace(/\bnet-net lease\b|\bnet lease\b|super-regional center/gi,'____');}});

/* ---------- Ch 19 math ---------- */
GEN.invm=[
()=>{const P=ri(10,80)*10000,v=pick([5,7,8,10]),mi=ri(0,8)*1000,E=P*(1-v/100)+mi;
 return numQ('invm',`An apartment property has potential gross income of ${$0(P)}, ${v}% vacancy and collection loss, and ${$0(mi)} of miscellaneous income (laundry, parking). What is effective gross income?`,E,'$',
 `<p class="eq">EGI = PGI − VC + MI = ${$0(P)} − ${$0(P*v/100)} + ${$0(mi)} = <b>${$m(E)}</b></p><p class="muted">Slide example: $180,000 − $18,000 (10%) + $0 = $162,000.</p>`,
 [P-P*v/100,P+mi,P*(1-v/100)-mi]);},
()=>{const P=ri(10,60)*10000,v=pick([5,8,10]),E=P*(1-v/100),fx=Math.round(P*rs(0.1,0.16,0.01)/100)*100,vr=Math.round(P*rs(0.15,0.25,0.01)/100)*100,cx=Math.round(P*rs(0.03,0.06,0.005)/100)*100,N=E-fx-vr-cx;
 return numQ('invm',`Pro forma: PGI ${$0(P)}; vacancy and collection loss ${v}%; fixed expenses (taxes, insurance) ${$0(fx)}; variable expenses (utilities, repairs, management) ${$0(vr)}; reserve for capital expenditures ${$0(cx)}. Treating CAPX "above the line" as appraisers do, what is NOI?`,N,'$',
 `<p class="eq">EGI = ${$0(P)} × (1 − ${v/100}) = ${$0(E)}<br>Total OE = ${$0(fx)} + ${$0(vr)} = ${$0(fx+vr)}<br>NOI = EGI − OE − CAPX = ${$0(E)} − ${$0(fx+vr)} − ${$0(cx)} = <b>${$m(N)}</b></p><p class="muted">Slide pro forma: $162,000 − $64,800 − $8,100 = $89,100.</p>`,
 [E-fx-vr,P-fx-vr-cx,E-fx-cx]);},
()=>{const N=ri(5,80)*5000,R=rs(5,10,0.25),V=N/(R/100);
 return numQ('invm',`A property is expected to earn NOI of ${$0(N)} next year. Comparable sales indicate an overall cap rate (Rₒ) of ${R}%. What is its value by direct capitalization?`,V,'$',
 `<p class="eq">V = NOI₁ ÷ Rₒ = ${$0(N)} ÷ ${dec(R)} = <b>${$m(V)}</b></p><p class="muted">Rₒ is a cap rate, NOT a discount rate.</p>`,
 [N*R/100,N/R*10,N*(1+R/100)]);},
()=>{const N=ri(5,80)*5000,R=rs(5,10,0.25),P=Math.round(N/(R/100)/1000)*1000,r=N/P*100;
 return numQ('invm',`An office building with NOI of ${$0(N)} sold for ${$0(P)}. What overall cap rate does the sale indicate?`,r,'%',
 `<p class="eq">Rₒ = NOI ÷ price = ${$0(N)} ÷ ${$0(P)} = <b>${r.toFixed(2)}%</b></p>`,
 [P/N,r*1.15,r-1.2]);},
()=>{const N=ri(8,60)*5000,L=Math.round(N/0.08*rs(0.6,0.75,0.05)/10000)*10000,r=rs(5,8,0.25),A=PMT(L,r/1200,360),DS=12*A,B=N-DS;
 return numQ('invm',`A property's NOI is ${$0(N)}. It is financed with a ${$0(L)}, 30-year mortgage at ${r}% (monthly payments). What is before-tax cash flow for the year?`,B,'$',
 `<p class="eq">Monthly payment = ${$m(A)}; debt service = 12 × ${$m(A)} = ${$m(DS)}<br>BTCF = NOI − DS = ${$0(N)} − ${$m(DS)} = <b>${$m(B)}</b></p>`+tvm({N:360,'I%':r,PV:L,PMT:null,FV:0,PY:12,solve:'PMT'}),
 [N-A,N-L*r/100,N+DS*0.1],true);},
()=>{const E=ri(10,60)*10000,oe=Math.round(E*rs(0.3,0.45,0.01)/100)*100,cx=Math.round(E*rs(0.03,0.06,0.005)/100)*100,N=E-oe;
 return numQ('invm',`Effective gross income is ${$0(E)}, operating expenses are ${$0(oe)}, and capital expenditures are ${$0(cx)}. An institutional investor treats CAPX "below the line." What is NOI?`,N,'$',
 `<p>Below the line: EGI − OE = NOI, then NOI − CAPX = net cash flow.</p><p class="eq">NOI = ${$0(E)} − ${$0(oe)} = <b>${$m(N)}</b><br>Net cash flow = ${$m(N)} − ${$0(cx)} = ${$m(N-cx)}</p>`,
 [N-cx,E-cx,E-oe+cx]);},
()=>{const items={taxes:ri(8,25)*500,insurance:ri(4,15)*500,utilities:ri(10,30)*500,repairs:ri(4,12)*500,maintenance:ri(8,25)*500,management:ri(6,16)*500,mortgage:ri(30,90)*1000,depreciation:ri(20,60)*1000},oe=items.taxes+items.insurance+items.utilities+items.repairs+items.maintenance+items.management;
 return numQ('invm',`A property's annual costs: property taxes ${$0(items.taxes)}, insurance ${$0(items.insurance)}, utilities ${$0(items.utilities)}, repairs ${$0(items.repairs)}, maintenance ${$0(items.maintenance)}, management ${$0(items.management)}, mortgage payments ${$0(items.mortgage)}, tax depreciation ${$0(items.depreciation)}. What are total operating expenses?`,oe,'$',
 `<p>Operating expenses do <b>not</b> include mortgage payments, tax depreciation or capital expenditures.</p><p class="eq">OE = taxes + insurance (fixed) + utilities + repairs + maintenance + management (variable) = <b>${$m(oe)}</b></p>`,
 [oe+items.mortgage,oe+items.depreciation,oe+items.mortgage+items.depreciation]);},
];

/* ---------- Ch 19 and sustainability concept banks ---------- */
BANK.inv=[
['Which is NOT one of the three ways one real estate investment makes money, per the slides?',['Return from tax refunds','Return "on" your money','Return "of" your money','Renters pay off your loan'],'Other benefits: depreciation, and mortgage interest is tax deductible.'],
['After-tax cash flow (ATCF) is best described as…',['The money in the investor\'s wallet at the end of each year','The sale price minus the loan','Potential gross income','The cap rate times value'],'It comes from rent checks (cash flow from operations).'],
['After-tax equity reversion (ATER) is…',['The return of the money invested plus the change in value, at sale','Annual rent collected','The mortgage balance','Vacancy loss'],'Appreciation: real estate values typically grow at least at the rate of inflation.'],
['Financial leverage is often called…',['OPM: other people\'s money','Equity reversion','Natural vacancy','Cap rate compression'],'It can amplify returns and can be positive, negative or neutral.'],
['What is the main risk of financial leverage, per the slides?',['Default and foreclosure','Higher vacancy','Lower rents','Higher property taxes'],'Debt magnifies losses as well as gains.'],
['Which is a disadvantage of real estate investment listed in the slides?',['Lack of liquidity','Tax-deductible interest','Portfolio diversification','Depreciation'],'Also high dollar amounts and changing economic environments.'],
['Portfolio diversification means…',['Spreading risk across property types, geography and other investments while maximizing return','Buying only one property type','Borrowing as much as possible','Holding only cash'],'One of the advantages of real estate.'],
['An investment is defined in the slides as…',['A present sacrifice in anticipation of expected future benefit','A loan to a tenant','Any purchase of land','A guaranteed return'],'Wealth maximization: choose projects whose benefits exceed costs by the most.'],
['In the NPV rule, the discount rate is…',['The investor\'s required rate of return','The cap rate','The mortgage rate','The vacancy rate'],'NPV = PV of inflows − PV of outflows.'],
['Per the slides, if the IRR equals the discount rate, the investment is…',['Good','Great','Bad','Impossible to judge'],'IRR > discount rate: great. IRR < discount rate: bad.'],
['Another name for the discount rate compared with IRR is the…',['Hurdle rate','Cap rate','Teaser rate','Natural vacancy rate'],'The IRR must clear the hurdle.'],
['A discounted cash flow model incorporates…',['The initial investment, forecasted cash flows over the holding period, and the forecasted sale price at reversion','Only next year\'s NOI','Only the purchase price','Only the cap rate'],'It values the whole holding period, unlike direct capitalization.'],
['Potential gross income assumes…',['100% occupancy','Average market vacancy','Zero rent','Only miscellaneous income'],'Also called potential gross revenue (PGR).'],
['Vacancy and collection loss is estimated from…',['The property\'s history, competing properties and the natural vacancy rate','The mortgage rate','The purchase price','Tax depreciation'],'Natural vacancy = the rate expected in a stable market.'],
['Which is miscellaneous income?',['Laundry and vending machines','Property taxes','Roof replacement','Mortgage payments'],'Also garage rentals, parking fees and clubhouse rentals.'],
['Which is a fixed operating expense?',['Local property taxes','Utilities','Maintenance and supplies','Garbage collection'],'Fixed expenses don\'t vary with occupancy in the short run; hazard insurance is the other example.'],
['Which is a variable operating expense?',['Utilities','Hazard insurance','Property taxes','Mortgage interest'],'Variable expenses tend to vary with occupancy.'],
['Which is NOT included in operating expenses?',['Mortgage payments','Property taxes','Utilities','Management fees'],'Also excluded: tax depreciation and capital expenditures.'],
['Which is a capital expenditure (CAPX)?',['HVAC replacement','Monthly utilities','Property tax payment','Laundry income'],'Also roof replacement, additions and resurfacing parking areas.'],
['How do most appraisers treat CAPX?',['"Above the line": EGI − OE − CAPX = NOI','"Below the line": subtracted after NOI','They ignore it','As income'],'Institutional investors usually treat it below the line: NOI − CAPX = net cash flow.'],
['NOI is called the property\'s "dividend." Why isn\'t it the investor\'s dividend?',['Debt service must still be paid out of it','It includes taxes owed by tenants','It is paid to the appraiser','It is before rent is collected'],'NOI must cover the mortgage and give the equity investor an acceptable return.'],
['The fundamental determinant of a property\'s value is…',['Its projected stream of NOI','Its construction cost','Its assessed value','Its age'],'From the NOI slide.'],
['In V = NOI₁ ÷ Rₒ, the slides warn that Rₒ is…',['A cap rate, NOT a discount rate','A discount rate','The mortgage rate','The IRR'],'Direct capitalization is the first income valuation method.'],
['In the DCF slide, before-tax cash flow equals…',['NOI minus debt service','EGI minus vacancy','PGI minus operating expenses','NOI plus CAPX'],'Purchase price → PGI → other income → (VCL) → EGI → (OE) → NOI → (DS) → BTCF.'],
['According to the cap-rate chart (since 1996), which property type generally had the lowest cap rates by 2012?',['Apartments','Regional malls','CBD office','They were identical'],'Data from the Real Estate Research Corporation (RERC) Real Estate Report; high-quality properties.'],
['In the slide pro forma, what was NOI?',['$89,100','$162,000','$64,800','$180,000'],'PGI $180,000 − VC $18,000 = EGI $162,000; − OE $64,800; − CAPX reserves $8,100.'],
['Mortgage interest on an investment property is…',['Tax deductible','Never deductible','Added to NOI','A capital expenditure'],'One of the "other benefits" on the advantages slide, along with depreciation.'],
];
BANK.green=[
['Sustainability is defined in the slides as…',['The ability to endure','Using only solar power','Building with recycled materials','Earning LEED certification'],'Simple definition from the first slide.'],
['The Brundtland Report defined sustainable development as development that…',['Meets present needs without compromising future generations\' ability to meet theirs','Uses no natural resources','Maximizes current profit','Avoids all construction'],'From the World Commission on Environment and Development (WCED).'],
['The Brundtland Report is named after…',['Commission chair G.H. Brundtland','A Norwegian city','The first LEED building','A U.S. senator'],'It came from the WCED.'],
['Per the Brundtland Report, sustainable development implies…',['Limits imposed by technology, social organization and the biosphere\'s ability to absorb human activity','Absolute limits on all growth','No limits at all','Limits set by zoning'],'"Not absolute limits."'],
['"Green washing" refers to…',['Claiming to be environmentally friendly without real substance','Cleaning buildings with eco products','Painting buildings green','LEED recertification'],'The slides use a Dunkin\' Donuts "green" store opening as an example to discuss.'],
['Which organization\'s standard (E2114-06a) defines a green building?',['ASTM (American Society of Testing and Materials)','USGBC','NAHB','BREEAM'],'Minimizes disturbance to and improves local, regional and global ecosystems.'],
['Who sponsors the LEED rating system?',['U.S. Green Building Council (USGBC)','EPA','NAHB','ASTM'],'Members include owners, designers and contractors.'],
['LEED stands for…',['Leadership in Energy and Environmental Design','Legal Energy and Efficiency Documentation','Low Emission Energy Development','Licensed Environmental Engineering Design'],'Created in 1998 (v1.0).'],
['When was LEED v1.0 created?',['1998','1993','2001','2019'],'1993: rating system idea; 2001: v2.0 and Greenbuild conference in Austin; 2003: v2.1; 2019: v4.1.'],
['Where was the first Greenbuild International Conference (2001)?',['Austin','Chicago','New York','Seattle'],'Alongside LEED v2.0.'],
['How many points earn LEED Gold?',['60–79','40–49','50–59','80+'],'Certified 40–49 · Silver 50–59 · Gold 60–79 · Platinum 80+.'],
['LEED Platinum requires…',['80+ points','60–79 points','100 points','50–59 points'],'The highest LEED level.'],
['LEED BD+C stands for…',['Building Design and Construction','Basic Design and Certification','Building Durability and Comfort','Bonus Design Credits'],'Others: ID+C, O+M, ND, Homes, Cities and Communities, Recertification, Zero.'],
['The entry-level LEED credential is…',['LEED Green Associate','LEED AP BD+C','LEED Platinum','LEED Zero'],'LEED APs add a specialty.'],
['Green Globes / BREEAM was developed in…',['The United Kingdom','The United States','Canada only','Germany'],'A voluntary rating system for existing commercial buildings.'],
['Which is NOT one of the four Green Globes assessment dimensions?',['Construction cost','Energy efficiency','Environmental impact','Health'],'The fourth is operation and management.'],
['The BREEAM Green Leaf program (2000) was meant to give owners…',['A self-assessment tool for designing new buildings','A tax credit','A mortgage discount','A LEED shortcut'],'Green Globes offers self-assessment and certification.'],
['The Living Building Challenge aims for buildings that…',['Generate more energy than they use, treat all water on site and use healthy materials','Use only recycled steel','Have no windows','Score 80+ LEED points'],'It reconnects occupants with nature.'],
['Petal Certification requires at least three of seven Petals, including one of…',['Water, Energy or Materials','Beauty, Equity or Health','Site, Place or Equity','Any three'],'Plus Imperatives 01 (Limits to Growth) and 20 (Inspiration + Education).'],
['Zero Energy Certification requires a project to…',['Generate all its energy on site without combustion','Buy renewable credits','Use no electricity','Score LEED Gold'],'A Living Building Challenge certification.'],
['What are the NAHB Green Building Standard levels, from lowest?',['Bronze, Silver, Gold, Emerald','Certified, Silver, Gold, Platinum','Bronze, Silver, Gold, Platinum','Green, Blue, Gold, Diamond'],'LEED uses Certified–Silver–Gold–Platinum.'],
['Which building is shown in the slides\' examples?',['One Bryant Park','Empire State Building','Willis Tower','The Pentagon'],'Also Seaside, FL, a net-zero historic home and a LEED Platinum building at the University of Pennsylvania.'],
];

/* ---------- slide-only details added to existing topics ---------- */
BANK.lease=BANK.lease.filter(x=>!/negative renewal clause|double net \(net-net\)/i.test(x[0]));
BANK.lease.push(
['Per the lecture slides, a negative renewal clause…',['Assumes automatic renewal','Does not assume automatic renewal','Forbids renewal','Requires a new appraisal'],'Slides: negative = assumes automatic renewal; positive = doesn\'t assume automatic renewal. This guide follows the professor\'s slides.'],
['Per the lecture slides, under a net-net lease the owner still pays…',['Real estate taxes','Utilities','Insurance','Nothing'],'Slide table (what owners pay): gross = taxes, utilities, insurance; net = taxes, insurance; net-net = taxes; net-net-net = nothing.'],
['Under a gross lease, the owner pays…',['Real estate taxes, utilities and insurance','Only taxes','Only insurance','Nothing'],'From the "What Owners Pay" slide.'],
['Under a net lease (single net), the owner pays…',['Real estate taxes and insurance; the tenant pays utilities','Only utilities','Everything','Nothing'],'From the "What Owners Pay" slide.'],
['Per the slides, a tenancy at will generally requires reasonable notice of…',['30 days','12 hours','1 year','No notice'],'Either party may end it at any time.'],
['With a tenancy at sufferance, many states require the landlord to…',['Give the tenant notice to quit before starting eviction','Renew the lease automatically','Return double the deposit','Sell the property'],'The tenant has no right to the property.'],
['A build-to-suit lease is one where…',['The owner builds a building for the tenant, similar to a ground lease','The tenant builds on unimproved land','Rent rises with the CPI','The tenant pays a percentage of sales'],'Both save the tenant from buying land.'],
['Per the slides, a benefit of a ground lease or build-to-suit for the tenant is…',['Cheaper development (no land purchase) and fully deductible lease payments','Ownership of the land','No rent','Automatic renewal'],'Lease payments count as an ordinary expense.'],
['Per the slides, a graduated-rent lease protects the owner against…',['Inflation','Vacancy','Foreclosure','Tenant default'],'Rent steps up at set intervals.'],
['After subleasing, per the slides, the original tenant…',['Is not relieved of the obligation to pay rent','Is released from the lease','Becomes the landlord','Pays no rent'],'The landlord may reserve the right to approve any sublessee.'],
['Per the slides, a security deposit protects the landlord if the tenant…',['Damages the property, moves out early or fails to pay rent','Asks for a renewal','Pays a percentage of sales','Assigns the lease'],'A cleaning fee is also possible.'],
['Which is listed in the slides as a tenant right/landlord obligation?',['Protection against criminal acts','Free parking','A rent cap','Guaranteed renewal'],'Also maintenance of common areas.'],
['The Figure 7.1 lease example is for…',['A pub in a shopping center (retail property)','An apartment','A warehouse','An office tower'],'Key issues: base rent, percentage rent, expense passthroughs, use, signage, landlord rules, estoppel, subordination.'],
['Per the slides, must every lease be in writing?',['It should be, but not all leases are','Yes, every lease must be','Only residential leases','Only leases under 30 days'],'Your notes add: a lease over one year must be in writing to be enforceable.'],
);
BANK.pm.push(
['Per the slides, decisions about day-to-day operations are ___ management; decisions about the physical, financial or ownership structure are ___ management.',['Property; asset','Asset; property','Facility; portfolio','Leasing; development'],'"Is property management different than asset management? Yes!"'],
['Why are commercial real estate IRRs usually maximized by holding longer?',['Going-in and going-out transaction costs are high','Rents always rise','Taxes fall over time','Mortgages get cheaper'],'Compared with stocks and bonds.'],
['Per the slides, most real estate returns come from…',['Periodic net rental income, not price appreciation','Price appreciation','Tax refunds','Selling fees'],'So how well properties are managed significantly affects returns.'],
['Per the slides, property management fees are based on a percentage of…',['Effective gross income (typically 4%–10%)','The sale price','Net operating income only','Assessed value'],'Your notes say "gross income"; the slides say effective gross income.'],
['Who can market and lease space in an office building or shopping center, per the slides?',['An independent broker, an in-house leasing agent or the property manager','Only the owner','Only the lender','Only the tenants'],'Independent brokers are usually paid a commission equal to a % of the face amount of the lease.'],
['What do the slides say about "credit tenants"?',['The vast majority of potential tenants are not credit tenants','Every tenant is a credit tenant','Credit tenants pay no rent','Only apartments have them'],'Tenant selection hinges on willingness and ability to pay.'],
['The Fair Housing Act cited in the slides is from…',['1988','1866','1968 only','2008'],'It prohibits discrimination by race, color, national origin, religion, sex, familial status or physical disability.'],
['Per the slides, the objective of repairing and maintaining property is…',['Maximizing market value','Minimizing all spending','Pleasing the lender','Avoiding inspections'],'Treat maintenance as an investment decision: PV of benefits vs. cost.'],
['Per the slides, a landlord may enter a unit to…',['Make repairs, inspect or show the unit','Collect personal items','Change the locks without notice','Hold a party'],'With reasonable notice.'],
['What reasonable notice for landlord entry do the slides give?',['12-hour lead time, between 7:30 a.m. and 8:00 p.m.','24 hours, any time','No notice ever','30 days'],'No notice is needed for emergencies.'],
['Which is an emergency allowing landlord entry without notice?',['A water leak','Showing the unit to a buyer','A routine inspection','Rent collection'],'Also smoke/fire, security system and storm damage.'],
['Per the slides, a management contract makes the manager\'s words and actions…',['Binding on the owner (agency relationship)','Binding only on tenants','Advisory only','Void'],'The manager is the owner\'s fiduciary with a legal duty of care.'],
['Which IREM designation is awarded to management companies?',['AMO (Accredited Management Organization)','CPM','ARM','RPA'],'CPM: Certified Property Manager. ARM: apartment specialists.'],
['The ARM designation is for those specializing in…',['Apartment buildings','Office buildings','Industrial parks','Hotels'],'Accredited Resident Manager, from IREM.'],
['BOMA\'s Real Property Administrator (RPA) designation targets…',['Office building owners and managers','Apartment managers','Hotel managers','Appraisers'],'BOMA: Building Owners & Managers Association International.'],
['Which professional association is NOT listed in the slides?',['National Association of Home Builders','IREM','BOMA','International Facilities Management Association'],'Also listed: the National Association of Residential Property Managers.'],
['Why do commercial banks hire property managers, per the IREM list?',['To manage properties obtained in foreclosure','To appraise loans','To sell mortgages','To run branches'],'Other employers: developers, REITs, corporations, government, insurers, colleges, the military, nonprofits.'],
['Before the 1970s, most commercial real estate was held by…',['Wealthy families and private partnerships (LPs)','Pension funds','REITs','Insurance companies'],'LPs were run by a "managing equity investor."'],
['Institutional investors entered commercial real estate in the 1970s mainly because of its value as…',['A diversifier','A tax shelter only','A short-term trade','A government mandate'],'This created third-party asset managers (investment advisors).'],
['In the 1970s–80s, asset managers were typically paid…',['0.50%–1.50% of assets under management','4%–10% of effective gross income','A flat salary','Nothing until sale'],'That created an agency problem: an incentive to acquire and hold assets.'],
['The recent trend in asset manager pay is…',['Performance-based fees tied to portfolio results','Higher AUM percentages','Commission per lease','Hourly billing'],'Performance is typically evaluated over a 3–5 year contract.'],
['Non-real-estate corporations own about how much real estate, per the slides?',['More than $2 trillion','$2 billion','$200 billion','$20 trillion'],'It is often 25%–40% of the total assets of large industrial firms.'],
['Corporate real estate often makes up what share of large industrial firms\' total assets?',['25%–40%','1%–5%','60%–80%','Over 90%'],'Historically little effort went into managing it.'],
['Before a property is acquired, an asset manager…',['Finds assets, arranges financing, negotiates price and oversees due diligence and closing','Collects rent','Shows apartments','Repairs roofs'],'Because investors end up with controlling interests in whole assets, unlike stock portfolios.'],
);
BANK.res.push(
['Per the slides, a pro of single-family detached homes is…',['Privacy, elbow room and often the best resale value','The lowest cost per unit','No yard work','Highest density'],'Examples include patio/zero-lot-line, traditional, modern and ranch homes.'],
['Which is a pro of single-family attached housing, per the slides?',['Lower development cost per unit and shorter utility lines','More privacy','Larger yards','Best resale value'],'Also higher density, less road frontage, lower ecological impact, less yard work.'],
['Per the slides, a pro of multifamily rental living is…',['No down payment and tenants can move easily','Building equity fastest','Private yards','Lowest density'],'Also living in areas you couldn\'t afford to buy in, with no maintenance.'],
['Per the slides, which is real property?',['A condominium','A cooperative share','Both','Neither'],'Condo = real property; co-op ≠ real property.'],
['A "wrap" style apartment (like West Village in McKinney, TX) is nicknamed the…',['"Texas Donut"','"Podium"','"Garden"','"Tower"'],'Apartments wrap around a central parking garage. Podium style: Windrose Tower in Plano.'],
['Per the slides, manufactured homes average about what cost per square foot vs. site-built?',['$40 vs. $90','$90 vs. $40','$150 vs. $200','$10 vs. $30'],'Economies of scale make them affordable.'],
['Per the slides, lenders often treat manufactured homes as…',['Personal property, with 10–15 year loans about 2% above conventional rates','Commercial property','Tax-exempt property','Real property with 40-year loans'],'Other cons: reputation, typically decrease in value, hard to zone in cities.'],
['Which is a manufactured-home trend from the slides?',['Owner-occupied manufactured-home subdivisions with 30-year FHA-insured loans','Rising interest rates on all loans','Banning double-wides','Converting to time-shares'],'Better lending standards.'],
['Manufactured homes come as single-, double- and triple-wides, typically how wide?',['24\'–36\'','10\'–12\'','50\'–60\'','100\''],'From the manufactured-home slide.'],
['Which time-share company is named in the slides?',['RCI','Marriott Bonvoy','Airbnb','Vrbo'],'Second homes are mainly for leisure near amenities.'],
['Per the slides, demand factors to forecast include…',['Employment, disposable income, population, household characteristics, absorption rate','Only interest rates','Only construction cost','Zoning only'],'Step 3 of the market analysis.'],
['Why does analyzing future supply matter so much, per the slides?',['Development has a long gestation period, so check the pipeline','Supply never changes','Supply is set by the government','Only demand matters'],'Step 4.'],
['Financial feasibility on the slides analyzes profitability with…',['Unleveraged and leveraged IRR and NPV','Only the cap rate','Only the vacancy rate','Only the sale price'],'Also sources of capital and the timing of cash flows.'],
['"Capital stacking" refers to…',['Layering senior debt, junior debt, mezzanine financing and equity','Building taller apartments','Adding parking decks','Combining two leases'],'Equity vs. debt sources of capital.'],
['"Junk in, junk out" on the slides warns that…',['A financial feasibility analysis is only as good as its market analysis','Old buildings should be demolished','Lenders reject old data','Garbage collection is an expense'],'Market analysis inputs drive everything.'],
['Which house type appears in the slides\' list of single-family detached types?',['Barndominium (housebarn)','Podium apartment','Power center','Townhome'],'Also hut, bungalow, cottage, ranch, I-house, gablefront, split-level, tower house, long house, igloo.'],
);
BANK.com.push(
['Per the slides, a regional center is sometimes labeled a…',['Super center or power center','Strip center','Factory outlet','Discount shopping center'],'Slide table labels: neighborhood (strip center), community (discount shopping center), regional (super center, power center), super-regional (factory outlet).'],
['Per the slide table, a neighborhood center is also called a…',['Strip center','Power center','Factory outlet','Lifestyle center'],'Parking is typically in front of the stores.'],
['Which stores are examples of power-center tenants in the slides?',['Walmart, Target, Lowe\'s, Home Depot, Sam\'s, Costco','Tiffany, Gucci, Prada','Local diners','Hospitals'],'Category killers, warehouse clubs and discount stores.'],
['Per the slides, analyzing the competition uses a…',['SWOT analysis','Cap rate','Months supply','Pro forma'],'Strengths, weaknesses, opportunities, threats.'],
['Key features of shopping center development in the slides are…',['Visibility, signage and accessibility','Height, color and age','Taxes, zoning and permits','Rent, CAM and deposits'],'Accessibility includes the "A.M./P.M. side of the road."'],
['The "A.M./P.M. side of the road" refers to…',['Which side of the commute a store is on, affecting access','Store hours','Parking fees','Delivery schedules'],'A coffee shop wants the morning-commute side.'],
['Which lifestyle centers are named in the slides?',['Arlington Highlands and The Domain in Austin','Mall of America and Southdale','Northgate and Country Club Plaza','Times Square and Union Square'],'Deadmalls.com is also mentioned.'],
['Per the slides, office activity locates near…',['CBDs, office parks, hospitals, universities, shopping centers and government installations','Only farmland','Only airports','Only highways'],'Products range from small multi-tenant buildings to skyscrapers.'],
['Which industrial development is linked in the slides?',['Alliance Airport','O\'Hare','JFK','Hartsfield'],'Industrial parks sit near transportation, water and power.'],
['Resort hotels are also called…',['Destination or seasonal hotels','Airport hotels','Commercial hotels','Extended-stay hotels'],'They cater to vacationing individuals and families.'],
['What three feasibility pieces feed the go/no-go decision in the slides\' Market Analysis Model?',['Market, financial and location/site feasibility','Zoning, permits and taxes','Rent, CAM and deposits','Land, labor and capital'],'The decision: go, no-go, or go with modifications.'],
['What are the possible outcomes of the Market Analysis Model decision?',['Go, no-go, or go with modifications','Buy, sell, or hold','Lease, sublease, or assign','Approve or deny only'],'From the last Ch 12 slide.'],
['Per the slide table, what typical market radius is listed for a regional center?',['50 miles','8–10 miles','1.5 miles','3–5 miles'],'Slide table: neighborhood 1.5 · community 3–5 · regional 50 · super-regional 50+ miles. The guide uses these figures.'],
);
BANK.mkt.push(
['Per the slides, space markets are categorized by…',['Property usage and geographic boundaries','Price only','Lender type','Tenant credit score'],'Users (demand) pay for space; suppliers (owners) sell the right to use it.'],
['In the space market, the "users" are…',['People, firms and others willing to pay to use space','Lenders','Appraisers','Brokers only'],'Suppliers are property owners selling the right to use space.'],
['Class C office space serves tenants who are…',['Not image-conscious and want cost-effective space','Seeking prestige','Government only','Banks only'],'Physically acceptable, fewer amenities.'],
['Per the slides, developers build new space when…',['Property values are at least equal to the cost of production, including a reasonable profit','Vacancy is rising','Rents are falling','Interest rates rise'],'This ties the asset market to the space market.'],
['A higher vacancy rate indicates…',['Less demand relative to supply','More demand relative to supply','Rising rents','Low absorption is impossible'],'From the market analysis inputs slide.'],
['If the months supply is much greater than the construction time for new projects…',['A new project will likely hit the market when supply exceeds demand','The project will be well received','Rents will spike','Vacancy will fall to zero'],'If months supply ≤ construction time, a new project will likely be well received.'],
['Gross absorption, per the slides, is…',['The total new space that became occupied during a period','The net change in occupied space','Vacant space ÷ total','Space under construction'],'Net absorption is the net change in occupied space.'],
['Which lodging demand driver do the slides add?',['Tourism receipts','Shipping volume','Office employment','Household formation'],'Along with air passengers, highway traffic and visitors.'],
['Which market research sources are linked in the Ch 13 slides?',['Wells Fargo CRE Chartbook and CBRE Market Research','Zillow and Redfin','Bloomberg and Reuters','Moody\'s and S&P'],'Your notes list Torto Wheaton, LaSalle and RREEF.'],
['The slides list price determinants in the asset market as opportunity cost of capital, growth expectations and…',['Risk','Zoning','Commissions','Vacancy'],'Same three as your notes.'],
);

/* ---------- lessons ---------- */
const lec=t=>`<div class="lecture"><div class="lecture-h">From the lecture slides</div>${t}</div>`;
LESSONS.lease+=lec(`<ul><li><b>What owners pay</b> (slide table): <b>gross</b> = taxes, utilities, insurance · <b>net</b> = taxes, insurance · <b>net-net</b> = taxes only · <b>net-net-net</b> = nothing.</li>
<li><b>Renewal clauses:</b> <b>negative</b> = assumes automatic renewal; <b>positive</b> = doesn't assume automatic renewal.</li>
<li>Tenancy at will: reasonable notice is generally <b>30 days</b>. Tenancy at sufferance: many states require a <b>notice to quit</b> before eviction.</li>
<li><b>Build-to-suit:</b> like a ground lease, but the owner builds the building for the tenant. Tenant benefits of both: cheaper to develop (no land purchase) and lease payments are fully deductible as an ordinary expense.</li>
<li>Graduated-rent leases protect the owner against <b>inflation</b>. After subleasing, the tenant is <b>not</b> relieved of paying rent, and the landlord may approve the sublessee.</li>
<li>Security deposits cover damage, moving out early or unpaid rent; a cleaning fee is possible. Other rights: common-area maintenance, protection against criminal acts.</li>
<li>Leases should be in writing, but not all are.</li></ul>`)+flag('This guide follows the professor\'s slides wherever the TA\'s notes differ: a <b>negative</b> renewal clause assumes automatic renewal (positive doesn\'t), and under a <b>net-net</b> lease the owner still pays real estate taxes. The key-term definitions for net and net-net leases were updated to match.');
LESSONS.pm+=lec(`<ul><li>Property management = day-to-day operations; asset management = physical, financial and ownership structure.</li>
<li>High going-in/going-out transaction costs mean IRRs are maximized by holding longer, and most returns come from <b>net rental income</b>, not appreciation, so management quality drives returns.</li>
<li>Leasing can be done by an independent broker (commission = % of the lease's face amount), an in-house leasing agent or the property manager. Most tenants are <b>not credit tenants</b>; weigh willingness and ability to pay, and tenant mix.</li>
<li>Maintenance aims to <b>maximize market value</b>; treat it as an investment decision (PV of benefits vs. cost).</li>
<li><b>Landlord entry:</b> to repair, inspect or show, with reasonable notice (<b>12-hour lead time, 7:30 a.m.–8:00 p.m.</b>). No notice for emergencies: smoke/fire, water leak, security system, storm damage.</li>
<li>Management fees: <b>4%–10% of effective gross income</b>. Designations: IREM's <b>CPM</b>, <b>ARM</b> (apartments) and <b>AMO</b> (companies); BOMA's <b>RPA</b> (office). Other groups: NARPM, IFMA.</li>
<li>Employers of property managers (IREM): developers, full-service firms, management firms, REITs, banks (foreclosures), corporations, government, insurers, colleges, the military, nonprofits.</li>
<li><b>Asset management history:</b> before the 1970s, wealthy families and LPs held CRE; in the 1970s institutions entered for diversification, creating third-party asset managers. Pay was 0.50%–1.50% of AUM (an agency problem), moving to performance-based fees judged over 3–5 years.</li>
<li><b>Corporate real estate:</b> over <b>$2 trillion</b>, often <b>25%–40%</b> of large industrial firms' assets. Issues: site analysis, buy vs. lease, acquisitions and dispositions, refinancing, facility management, property tax appeals, sale-leasebacks.</li></ul>`)+flag('Your notes say management fees are a percentage of "gross income"; the slides say <b>effective</b> gross income.');
LESSONS.res+=lec(`<ul><li><b>Detached pros:</b> privacy, elbow room, best resale. House types range from bungalow and ranch to split-level, I-house and the "barndominium."</li>
<li><b>Attached pros:</b> lower cost per unit, higher density, less road frontage, shorter utility lines, lower ecological impact, less yard work.</li>
<li><b>Multifamily forms:</b> garden, mid-rise, high-rise, <b>wrap</b> ("Texas Donut," West Village in McKinney) and <b>podium</b> (Windrose Tower, Plano). Pros of renting: no down payment, live where you couldn't buy, no maintenance, easy to move. <b>Condo = real property; co-op ≠ real property.</b></li>
<li><b>Manufactured homes:</b> single/double/triple-wide (24'–36'); about <b>$40/sq ft vs. $90</b> site-built; trend to owner-occupied subdivisions with 30-year FHA loans. Cons: reputation, usually lose value, often financed as personal property (10–15 years at ~2% higher rates), hard to zone in cities.</li>
<li>Financial feasibility: unleveraged and leveraged IRR and NPV; sources of capital ("capital stacking": senior debt, junior debt, mezzanine, equity); timing of cash flows. "Junk in, junk out."</li></ul>`);
LESSONS.com+=lec(`<ul><li>The slide's shopping-center table adds a <b>typical market radius</b>: 1.5 miles (neighborhood), 3–5 (community), <b>50</b> (regional), 50+ (super-regional). It also labels them strip center, discount shopping center, super/power center and factory outlet.</li>
<li>Power center tenants: Walmart, Target, Lowe's, Home Depot, Sam's, Costco.</li>
<li>Development process adds a <b>SWOT analysis</b> of competitors. Key site features: <b>visibility, signage, accessibility</b> (the "A.M./P.M. side of the road").</li>
<li>Lifestyle centers: Arlington Highlands, The Domain (Austin). Industrial: Alliance Airport. Offices also cluster near hospitals, universities, shopping and government.</li>
<li><b>Market Analysis Model:</b> market feasibility + financial feasibility + location/site feasibility → go, no-go, or go with modifications.</li></ul>`);
LESSONS.mkt+=lec(`<ul><li>Space markets are categorized by <b>usage</b> and <b>geography</b>. Users (demand) pay to use space; suppliers (owners) sell the right to use it.</li>
<li>Developers build when property values ≥ cost of production (including a reasonable profit).</li>
<li>Higher vacancy = less demand relative to supply.</li>
<li><b>Months supply rule:</b> if it is much greater than construction time, a new project will arrive when supply exceeds demand; if it is ≤ construction time, the project will likely be well received.</li>
<li>Sources: Wells Fargo CRE Chartbook, CBRE Market Research.</li></ul>`);
LESSONS.inv=`
<p>Chapter 19 asks one question: is this income property worth buying, and for how much?</p>
<h4>Why invest in real estate</h4>
<ul><li><b>Three ways to make money from one investment:</b> return <b>on</b> your money, return <b>of</b> your money, and renters <b>paying off</b> your loan. Other benefits: depreciation and tax-deductible mortgage interest.</li>
<li><b>Cash flow from operations</b> (rent checks) → after-tax cash flow (<b>ATCF</b>), the money in your wallet each year.</li>
<li><b>Appreciation</b> (values typically grow at least with inflation) → after-tax equity reversion (<b>ATER</b>): the return of your investment plus the change in value.</li>
<li><b>Portfolio diversification</b> (property type, geography) and <b>financial leverage</b> ("OPM": positive, negative or neutral; risk of default and foreclosure).</li>
<li><b>Disadvantages:</b> high dollar amounts, lack of liquidity, changing economic environments.</li></ul>
<h4>Decision rules</h4>
<p>An <b>investment</b> is a present sacrifice for expected future benefit. <b>Wealth maximization:</b> take only projects whose benefits exceed costs, preferably by the most.</p>
<ul><li><b>NPV</b> = PV of inflows − PV of outflows, discounted at the investor's required return.</li><li><b>IRR</b> = the rate that makes NPV = 0. IRR &gt; discount (<b>hurdle</b>) rate: great · equal: good · less: bad.</li><li><b>DCF</b> uses the initial investment, forecast cash flows over the holding period, and the forecast sale price at reversion.</li></ul>
<h4>Estimating NOI</h4>
<table class="tbl"><tr><td></td><td>PGI</td><td>Potential gross income (100% occupancy; also PGR)</td></tr><tr><td>−</td><td>VC</td><td>Vacancy & collection loss (history, competitors, natural vacancy rate)</td></tr><tr><td>+</td><td>MI</td><td>Misc. income: parking, laundry, vending, clubhouse</td></tr><tr><td>=</td><td>EGI</td><td>Effective gross income</td></tr><tr><td>−</td><td>OE</td><td>Operating expenses: fixed (insurance, property taxes) + variable (utilities, maintenance, supplies)</td></tr><tr><td>−</td><td>CAPX</td><td>Capital expenditures: roof, additions, HVAC, parking resurfacing</td></tr><tr><td>=</td><td>NOI</td><td>Net operating income</td></tr></table>
<p><b>Operating expenses never include</b> mortgage payments, tax depreciation or capital expenditures.</p>
<p><b>CAPX placement:</b> most appraisers put it <b>above the line</b> (EGI − OE − CAPX = NOI). Institutional investors put it <b>below the line</b> (EGI − OE = NOI; NOI − CAPX = net cash flow). Watch NOI vs. NCF.</p>
<p><b>NOI is the property's "dividend,"</b> not the investor's, because it must first service the mortgage and then give the equity investor an acceptable return. The projected NOI stream is the fundamental determinant of value.</p>
${fc('Direct capitalization','V = NOI<sub>1</sub> ÷ R<sub>o</sub>','NOI<sub>1</sub> = next year\'s NOI · R<sub>o</sub> = overall cap rate from comparable sales','The first income valuation method.','Stable income; comps of similar risk.','Treating R<sub>o</sub> as a discount rate. <b>It is a cap rate, NOT a discount rate.</b>')}
<p><b>DCF layout (slide):</b> purchase price → PGI → other income → (vacancy & collection loss) → EGI → (operating expenses) → NOI → (debt service) → <b>before-tax cash flow</b>.</p>
<p><b>Cap rate chart (RERC, 1996–2012):</b> cap rates on high-quality apartments, CBD office and regional malls mostly fell from about 8.5%–9.5% to about 5.5%–6.5%, with a spike around 2009; apartments ended lowest.</p>`;
LESSONS.invm=`
${ex('slide pro forma',`<table class="tbl"><tr><td>Potential gross income</td><td>$180,000</td></tr><tr><td>− Vacancy & collection (10%)</td><td>18,000</td></tr><tr><td>= Effective gross income</td><td>162,000</td></tr><tr><td>− Fixed: taxes $15,900 + insurance $9,200</td><td>25,100</td></tr><tr><td>− Variable: utilities $12,800, garbage $1,000, supplies $3,000, repairs $5,200, maintenance $10,500, management $7,200</td><td>39,700</td></tr><tr><td>= Total operating expenses</td><td>64,800</td></tr><tr><td>− CAPX reserves: roof/exterior $4,900 + tenant improvements $3,200</td><td>8,100</td></tr><tr><td><b>= Net operating income</b></td><td><b>$89,100</b></td></tr></table><p class="muted">Management here is $7,200 ÷ $162,000 ≈ 4.4% of EGI, inside the 4%–10% range.</p>`)}
${fc('Effective gross income','EGI = PGI − VC + MI','','First step of every pro forma.','','Forgetting miscellaneous income, or applying vacancy to it.')}
${fc('Net operating income','NOI = EGI − OE − CAPX (above the line)','OE excludes mortgage payments, depreciation and CAPX','Valuation and DCR.','','Subtracting debt service or depreciation.')}
${fc('Direct capitalization','V = NOI₁ ÷ Rₒ &nbsp;·&nbsp; Rₒ = NOI ÷ price','','Valuing income property from one year of NOI.','','Multiplying instead of dividing; calling Rₒ a discount rate.')}
${fc('Before-tax cash flow','BTCF = NOI − debt service','Debt service = 12 × monthly mortgage payment','The investor\'s cash before income taxes.','','Using the monthly payment against annual NOI.')}`;
LESSONS.green=`
<p><b>Sustainability</b> = the ability to endure. <b>Green washing</b> = claiming to be green without substance (the slides use a Dunkin' Donuts "green" store opening as a discussion example).</p>
<p><b>Sustainable development</b> (Brundtland Report, from the World Commission on Environment and Development, chaired by G.H. Brundtland): meeting "the needs of the present without compromising the ability of future generations to meet their own needs." It implies limits: not absolute ones, but those set by technology, social organization and the biosphere's ability to absorb human activity.</p>
<p><b>Green building</b> (ASTM Standard E2114-06a): meets the required building performance while minimizing disturbance to and improving the functioning of local, regional and global ecosystems, during and after construction.</p>
<h4>LEED (U.S. Green Building Council)</h4>
<p>USGBC members span the construction industry (owners, designers, contractors). Timeline: <b>1993</b> idea → <b>1998</b> LEED v1.0 → <b>2001</b> v2.0 and the first Greenbuild conference (Austin) → <b>2003</b> v2.1, "green building explosion" → <b>2019</b> v4.1.</p>
<p>Rating systems: BD+C (Building Design + Construction), ID+C (Interior Design + Construction), O+M (Operations + Maintenance), ND (Neighborhood Development), Homes, Cities and Communities, Recertification, Zero.</p>
<table class="tbl"><tr><th>Level</th><th>Points</th></tr><tr><td>Certified</td><td>40–49</td></tr><tr><td>Silver</td><td>50–59</td></tr><tr><td>Gold</td><td>60–79</td></tr><tr><td>Platinum</td><td>80+</td></tr></table>
<p>Credentials: <b>LEED Green Associate</b>, then LEED AP with a specialty (BD+C, O+M, ID+C, ND, Homes).</p>
<h4>Other systems</h4>
<ul><li><b>BREEAM / Green Globes</b> (UK, voluntary): rates existing commercial buildings on energy efficiency, environmental impact, health, and operation and management. The Green Leaf program (2000) gave owners a self-assessment tool for new buildings.</li>
<li><b>Living Building Challenge:</b> buildings that make more energy than they use, treat all water on site, use healthy materials. Living Building Certification (all Imperatives) · <b>Petal</b> (3 of 7 Petals, one being Water, Energy or Materials, plus Imperatives 01 and 20) · <b>Zero Energy</b> (all energy on site, no combustion).</li>
<li><b>NAHB Green Building Standard:</b> Bronze, Silver, Gold, Emerald.</li></ul>
<p class="muted">Video examples in the slides: One Bryant Park, a net-zero historic home, 12 steps to net zero (Clifton), Seaside FL, and a University of Pennsylvania LEED Platinum building.</p>`;

FORMULAS.push(['EGI','Ch 19','PGI − VC + MI'],['NOI','Ch 19','EGI − OE − CAPX (above the line)'],['Direct capitalization','Ch 19','V = NOI₁ ÷ Rₒ (Rₒ is a cap rate, not a discount rate)'],['Before-tax cash flow','Ch 19','NOI − debt service'],['IRR rule','Ch 19','IRR > hurdle: great · = : good · < : bad']);
