/* ===== Exam 3 content: Units 7, 10, 11, 12, 13 (Ch 17 and 18 reuse the Exam 2 material, which is word for word the same) ===== */
['fin','apc','k','brk','uw','apm','inc'].forEach(k=>{delete BANK[k];delete GEN[k];delete LESSONS[k];});
[7,10,11,12,13].forEach(ch=>{GEN['kt'+ch]=[()=>ktQ(ch)];});

/* ---------- Unit 7 lease math ---------- */
GEN.leasem=[
()=>{const B=ri(6,24)*250,p=ri(1,8),T=ri(4,40)*1000,S=T+ri(2,40)*1000,R=B+p/100*(S-T);
 return numQ('leasem',`A store has a percentage lease: base rent of ${$0(B)} a month plus ${p}% of monthly gross sales over ${$0(T)}. Gross sales this month are ${$0(S)}. What is the rent?`,R,'$',
 `<p class="eq">Sales over the breakpoint = ${$0(S)} − ${$0(T)} = ${$0(S-T)}<br>Percentage rent = ${p}% × ${$0(S-T)} = ${$m(p/100*(S-T))}<br>Total rent = ${$0(B)} + ${$m(p/100*(S-T))} = <b>${$m(R)}</b></p><p class="muted">Your notes' study exercise: Al's Shoe Store, $2,000 + 2% × ($18,000 − $10,000) = $2,160.</p>`,
 [B+p/100*S,p/100*(S-T),B+p/100*T]);},
()=>{const B=ri(20,80)*100,p=pick([2,3,4,5]),T=ri(3,10)*100000,S=T+ri(1,40)*10000,X=p/100*(S-T),tot=12*B+X;
 return numQ('leasem',`A restaurant pays monthly base rent of ${$0(B)} plus additional rent of ${p}% of annual gross sales above ${$0(T)}. Annual gross sales are ${$0(S)}. What is the total rent for the year?`,tot,'$',
 `<p class="eq">Base rent for the year = 12 × ${$0(B)} = ${$0(12*B)}<br>Percentage rent = ${p}% × (${$0(S)} − ${$0(T)}) = ${$m(X)}<br>Total = <b>${$m(tot)}</b></p><p class="muted">This mirrors the lease example in your notes: $3,880 a month plus 3% of gross sales over $500,000.</p>`,
 [12*B+p/100*S,X,B+X]);},
()=>{const R=ri(15,80)*100,g=pick([2,3,4,5]),n=ri(3,8),V=R*Math.pow(1+g/100,n-1);
 return numQ('leasem',`A graduated-rent (step-up) lease starts at ${$0(R)} a month in year 1, and the rent increases ${g}% each year. What is the monthly rent in year ${n}?`,V,'$',
 `<p>Year 1 has no increase, so year ${n} has ${n-1} increases.</p><p class="eq">Rent = ${$0(R)} × (1 + ${g/100})<sup>${n-1}</sup> = <b>${$m(V)}</b></p>`,
 [R*Math.pow(1+g/100,n),R*(1+g/100*(n-1)),R*(1+g/100)]);},
()=>{const sf=ri(2,40)*500,stop=rs(4,9,0.25),act=stop+rs(0.25,2.5,0.25),X=(act-stop)*sf;
 return numQ('leasem',`An office lease has an expense stop of ${$m(stop)} per square foot. This year operating expenses are ${$m(act)} per square foot. The tenant leases ${com(sf,0)} sq ft. How much of the operating expenses does the tenant pay this year?`,X,'$',
 `<p>An expense stop caps what the <b>landlord</b> pays. The tenant pays everything above the stop.</p><p class="eq">Excess = ${$m(act)} − ${$m(stop)} = ${$m(act-stop)} per sq ft<br>Tenant pays ${$m(act-stop)} × ${com(sf,0)} = <b>${$m(X)}</b></p>`,
 [act*sf,stop*sf,(act-stop)*sf/12]);},
()=>{const sf=ri(1,20)*500,G=ri(20,200)*1000,cam=ri(5,60)*5000,X=sf/G*cam;
 return numQ('leasem',`A tenant leases ${com(sf,0)} sq ft in a center with ${com(G,0)} sq ft of gross leasable area. Common area maintenance costs for the year are ${$0(cam)}. What is the tenant's pro rata share of CAM?`,X,'$',
 `<p class="eq">Share = ${com(sf,0)} ÷ ${com(G,0)} = ${(sf/G*100).toFixed(2)}%<br>CAM = ${(sf/G*100).toFixed(2)}% × ${$0(cam)} = <b>${$m(X)}</b></p>`,
 [cam/(G/sf)*2,cam*sf/1000,X*12]);},
()=>{const R=ri(20,120)*100,c=rs(1.5,6,0.5),V=R*(1+c/100);
 return numQ('leasem',`An index lease ties rent to the Consumer Price Index. Current rent is ${$0(R)} a month and the CPI rose ${c}% this year. What is the new monthly rent?`,V,'$',
 `<p class="eq">New rent = ${$0(R)} × (1 + ${dec(c)}) = <b>${$m(V)}</b></p>`,
 [R*c/100,R+c*100,R*(1+c/1000)]);},
()=>{const sf=ri(4,40)*500,r=rs(14,32,1),ox=rs(4,10,0.5),net=(r-ox)*sf;
 return numQ('leasem',`A landlord leases ${com(sf,0)} sq ft on a <b>gross lease</b> at ${$m(r)} per sq ft per year. The landlord's operating expenses (taxes, insurance, maintenance) are ${$m(ox)} per sq ft. What net income does the landlord keep each year?`,net,'$',
 `<p>In a gross lease the <b>landlord</b> pays the operating expenses.</p><p class="eq">Net = (${$m(r)} − ${$m(ox)}) × ${com(sf,0)} = <b>${$m(net)}</b></p><p class="muted">On a triple net lease the tenant would pay those expenses, so the landlord would keep the full rent.</p>`,
 [r*sf,ox*sf,(r+ox)*sf]);},
];

/* ---------- Unit 10 fee ---------- */
GEN.pm=[
()=>{const gi=ri(20,300)*5000,f=ri(4,10),F=gi*f/100;
 return numQ('pm',`A property manager hired directly by the owner earns ${f}% of gross income. The building collects ${$0(gi)} in gross income this year. What is the management fee?`,F,'$',
 `<p class="eq">Fee = ${f}% × ${$0(gi)} = <b>${$m(F)}</b></p><p class="muted">Your notes: fees are typically 4%–10% of gross income, depending on project size, the manager's duties and local competition.</p>`,
 [gi*f/1000,F/12,gi*(f+2)/100]);},
];

/* ---------- Unit 13 market math ---------- */
GEN.mktm=[
()=>{const N=ri(20,300)*10,v=ri(1,Math.round(N*0.12)),V=v/N*100;
 return numQ('mktm',`A community has ${com(N,0)} apartments and ${v} of them are empty. What is the vacancy rate?`,V,'%',
 `<p class="eq">Vacancy rate = vacant ÷ total = ${v} ÷ ${com(N,0)} = <b>${V.toFixed(2)}%</b></p><p class="muted">Your notes: 50 empty out of 1,500 = 3.3%. Apartments are measured in units; commercial space in square feet.</p>`,
 [100-V,v/(N-v)*100,V*10]);},
()=>{const a=ri(5,60),vac=ri(1,8)*a,uc=ri(1,8)*a,M=(vac+uc)/a;
 return numQ('mktm',`An apartment market absorbs ${a} units a month. There are ${vac} vacant units and ${uc} units under construction. What is the months supply?`,M,'mo',
 `<p class="eq">Months supply = (vacant + under construction) ÷ net absorption per month<br>= (${vac} + ${uc}) ÷ ${a} = <b>${M.toFixed(1)} months</b></p><p class="muted">Your notes' example: (30 + 90) ÷ 30 = 4 months.</p>`,
 [vac/a,(vac+uc)/(a*12)*12+uc/a,uc/a]);},
()=>{const A=ri(6,24)*1000,vac=ri(4,30)*500,uc=ri(2,20)*500,M=(vac+uc)/(A/12);
 return numQ('mktm',`A warehouse market absorbed ${com(A,0)} sq ft last year. It has ${com(vac,0)} sq ft vacant and ${com(uc,0)} sq ft under construction. What is the months supply?`,M,'mo',
 `<p>Convert the annual absorption to a monthly figure first.</p><p class="eq">Monthly absorption = ${com(A,0)} ÷ 12 = ${com(A/12,1)} sq ft<br>Months supply = (${com(vac,0)} + ${com(uc,0)}) ÷ ${com(A/12,1)} = <b>${M.toFixed(1)} months</b></p><p class="muted">Study exercise 9: (6,000 + 3,000) ÷ (10,000 ÷ 12) = 10.8 months. A long supply means it's a poor time to start a new project.</p>`,
 [(vac+uc)/A,vac/(A/12),(vac+uc)/A*100]);},
()=>{const L=ri(20,200)*1000,Vc=ri(5,150)*1000,N=L-Vc;
 return numQ('mktm',`During the year, tenants in an office market leased ${com(L,0)} sq ft and vacated ${com(Vc,0)} sq ft. What was the net absorption?`,N,'sf',
 `<p class="eq">Net absorption = space leased − space vacated = ${com(L,0)} − ${com(Vc,0)} = <b>${com(N,0)} sq ft</b></p><p class="muted">Gross absorption would be the full ${com(L,0)} sq ft leased, ignoring move-outs.</p>`,
 [L,Vc,L+Vc].map(x=>x),true);},
()=>{const inv=ri(60,900),s=ri(10,Math.max(11,Math.floor(inv/3))),M=inv/s;
 return numQ('mktm',`There are ${inv} homes for sale in a town, and buyers have been purchasing about ${s} homes a month. At this absorption rate, how many months would it take to sell the current inventory?`,M,'mo',
 `<p class="eq">Months to sell out = inventory ÷ sales per month = ${inv} ÷ ${s} = <b>${M.toFixed(1)} months</b></p>`,
 [s/inv*100,inv/s/12,inv/(s*2)]);},
];

/* ---------- concept banks ---------- */
BANK.lease=[
['A lease divides property interests into which two estates?',['Leased fee estate (landlord) and leasehold estate (tenant)','Fee simple and life estate','Freehold and easement','Equitable title and legal title'],'The landlord keeps the leased fee; the tenant holds the leasehold.'],
['How long can a lease run before it must be in writing to be enforceable?',['Over one year','Over 30 days','Over five years','Every lease must be oral'],'A lease for more than one year must be in writing.'],
['Which is NOT one of the basic elements of a lease?',['The tenant\'s credit score','Names of lessor and lessee','Identification of the premises','Rent amount and payment terms'],'Also: conveyance of premises, term, duties of both parties, signatures.'],
['A tenancy for a stated period can run up to about…',['99 years','1 year','5 years','30 days'],'Long ones may need to be publicly recorded to be enforceable.'],
['A month-to-month lease that renews automatically until someone gives notice is a…',['Tenancy from period to period','Tenancy for a stated period','Tenancy at will','Tenancy at sufferance'],'It requires proper notice to terminate.'],
['A lease that either party can end at any time with reasonable notice is a…',['Tenancy at will','Tenancy at sufferance','Tenancy for a stated period','Ground lease'],'No fixed end date.'],
['A tenant stays after the lease expires without the landlord\'s consent. This is a…',['Tenancy at sufferance','Tenancy at will','Tenancy from period to period','Sublease'],'A holdover without approval.'],
['Ground leases typically run for…',['Over 50 years','1–5 years','Month to month','Exactly 10 years'],'The tenant develops the land; improvements revert to the landowner.'],
['A tax advantage of a ground lease for the tenant is that…',['Lease payments are deductible, while land itself cannot be depreciated','The tenant owns the land','The tenant pays no property tax','Improvements never revert'],'Example from your notes: Manhattan office buildings on leased land.'],
['Ground leases are frequently used as a financing device for…',['Major office buildings','Single-family homes','Apartments rented month to month','Vacation time-shares'],'From the unit review.'],
['In a gross lease, who pays the operating expenses (taxes, utilities, insurance)?',['The landlord','The tenant','The lender','They split them 50/50'],'In a net lease the tenant pays them.'],
['In a triple net (net-net-net) lease, the tenant pays rent plus…',['Taxes, insurance and maintenance/operating expenses','Only utilities','Nothing else','Only property taxes'],'The landlord receives net rent.'],
['A double net (net-net) lease has the tenant pay rent plus…',['Property taxes and insurance','Only maintenance','All operating expenses and the mortgage','Nothing else'],'Per the key-term definition.'],
['A lease whose rent rises by specified percentages at stated intervals is a…',['Graduated-rent (step-up) lease','Reappraisal lease','Index lease','Fixed-rent lease'],'A reappraisal lease bases increases on a new appraisal.'],
['A lease whose rent changes based on periodic reappraisals of the property is a…',['Reappraisal lease','Index lease','Percentage lease','Gross lease'],'Rent follows property value.'],
['Rent tied to the Consumer Price Index describes a(n)…',['Index lease','Percentage lease','Graduated-rent lease','Ground lease'],'It adjusts for inflation.'],
['A percentage lease is most common for…',['Retail space','Single-family homes','Farmland','Apartments'],'Base rent plus a percentage of sales over a threshold.'],
['Renewal options mainly protect…',['Tenants from large rent increases at the end of the lease','Landlords from vacancies','Lenders from default','Brokers\' commissions'],'The renewal rent terms are set in advance.'],
['In commercial leases, tenants often pay a share of shared-space costs called…',['Common area maintenance (CAM) fees','Expense stops','Security deposits','Escrow fees'],'For hallways, parking lots, lobbies.'],
['An expense stop limits the expenses paid by…',['The landlord; the tenant pays the excess','The tenant; the landlord pays the excess','The lender','The property manager'],'Study exercise 6 asks exactly this.'],
['After an assignment, the original tenant…',['Remains liable unless released by the landlord','Is automatically released','Becomes the landlord','Must pay double rent'],'Assignment transfers all rights; a sublease transfers only part.'],
['A sublease transfers…',['Part of the tenant\'s rights to another party','All rights, with the tenant released','Ownership of the building','The landlord\'s leased fee'],'Subleasing for profit is possible unless the lease restricts it.'],
['From the landlord\'s view, a security deposit serves to…',['Protect against damage or unpaid rent','Pay the broker','Cover the first month\'s rent automatically','Fund property taxes'],'It is returned if the tenant complies with the lease.'],
['Why inspect the premises before and after occupancy?',['To document damage and hold the tenant accountable','To set the rent','To satisfy the lender','To calculate CAM'],'Photos and videos are common.'],
['Built-in bookcases a tenant installs generally…',['Stay with the property as fixtures','Must be removed by the landlord','Belong to the tenant automatically','Reduce the rent'],'Permanent improvements usually become part of the property.'],
['What do state statutes typically regulate in landlord-tenant law?',['Eviction processes and security deposit return deadlines','Commission rates','Mortgage rates','Zoning only'],'Rules vary significantly by state.'],
['The covenant of quiet enjoyment gives the tenant…',['Exclusive possession without interference during the lease','The right to make structural changes','Free utilities','The right to sublet without consent'],'The tenant can\'t be evicted unless the lease is violated.'],
['If the landlord fails to make needed repairs, your notes say the tenant can…',['Deduct repair costs from rent','Stop paying rent permanently','Sell the property','Change the locks on the landlord'],'Listed under tenant rights.'],
['The warranty of habitability requires the landlord to…',['Keep the property fit to live in (safety, sanitation, repairs)','Guarantee the tenant\'s business succeeds','Pay the tenant\'s utilities','Renew the lease'],'A landlord obligation.'],
['A negative renewal clause means…',['The tenant must vacate unless they give notice to renew','The lease renews unless the tenant gives notice to end it','Rent can never increase','The landlord can never renew'],'A positive renewal clause renews automatically unless the tenant gives termination notice.'],
['Residential leases usually…',['Prohibit commercial use','Require CAM fees','Run 99 years','Are percentage leases'],'They are governed by specific residential laws.'],
['In the lease example (Astor Pub), which party repairs the foundation, roof, outer walls and structure?',['The landlord','The tenant','The city','The lender'],'The tenant handles all other repairs at its own expense.'],
['In the lease example, the security deposit is returned within…',['30 days after the lease ends','10 days','1 year','It is never returned'],'Less any unpaid amounts owed.'],
['In the lease example, if the premises are totally destroyed by fire…',['The lease terminates on the date of destruction','The tenant must keep paying full rent','The tenant must rebuild','Rent doubles'],'If only partly damaged, rent abates in proportion to the lost use.'],
['The lease example\'s subordination clause makes the lease…',['Subject to any mortgages or deeds of trust on the property','Superior to all mortgages','Void if the property is sold','Transferable without consent'],'The lender\'s claim comes first.'],
['Under the lease example, an estoppel certificate is…',['A tenant statement, within 10 days of notice, that the lease is in full force','A late-payment notice','A building permit','A security deposit receipt'],'Lenders and buyers rely on it.'],
['Under the lease example, who is responsible for ADA compliance?',['The tenant','The landlord','The city','No one'],'The Americans with Disabilities Act of 1990.'],
['In the lease example, a tenant who pays rent more than 5 days late owes…',['A one-time $300 late fee','Nothing','10% of the rent','Double rent'],'Paragraph 1(c)5.'],
];
BANK.pm=[
['The primary duty of a property manager is to…',['Secure the highest net return for the owner over the property\'s useful life','Maximize the number of tenants','Minimize rents','Sell the property quickly'],'From the unit review.'],
['Cutting maintenance and repairs to boost short-term cash flow is called…',['Milking the property','Sale-and-leaseback','Value engineering','Disposition'],'It can hurt long-term value.'],
['The legal relationship between a property manager and owner is…',['Fiduciary (agency), created by the management agreement','Landlord and tenant','Lender and borrower','Independent buyer and seller'],'The manager is the owner\'s agent.'],
['Which is a professional property management designation?',['Certified Property Manager (CPM)','Certified General Appraiser','Chartered Financial Analyst','Realtor® Emeritus'],'Also Accredited Resident Manager (ARM). IREM and BOMA offer education.'],
['A management agreement is…',['Not affected by a change in property ownership during its term','Void when the property is sold','Always oral','Signed by the tenants'],'It sets the manager\'s powers, duties and pay.'],
['Which power does a property manager typically have?',['Execute, extend or cancel leases','Sell the property','Refinance the mortgage','Change the zoning'],'Also set and collect rents, settle with tenants, hire and fire, spend funds within limits.'],
['Property management employees are often required to be…',['Bonded','Licensed appraisers','Attorneys','CPAs'],'Because they handle owners\' money.'],
['A manager hired directly by the owner is usually paid…',['A percentage of gross income (about 4%–10%)','A percentage of the sale price','A flat 6% commission on leases only','Nothing until the property sells'],'Managers employed by a management firm usually get a fixed salary.'],
['What are the three functions of property management in the unit review?',['Administrative, marketing and physical management','Buying, selling and leasing','Appraisal, brokerage and lending','Acquisition, financing and disposition'],'Acquisition, financing and disposition are asset-manager functions.'],
['Why is rental space called a "perishable commodity"?',['An empty month\'s rent is lost forever, so space needs constant marketing','It wears out quickly','Leases expire daily','Buildings depreciate'],'Unrented time can\'t be recovered.'],
['For commercial properties, tenant selection often aims to…',['Create synergy among tenants to increase customer traffic','Find the most tenants at any price','Avoid all retail tenants','Fill space with one tenant only'],'Residential selection must follow the Fair Housing Act.'],
['Which task do your notes call one of the most challenging for property managers?',['Rent collection','Advertising','Move-in inspections','Bookkeeping'],'Steps: discuss, set a timeline, then evict if needed with due process.'],
['If a tenant pays late, can the manager shut off utilities to pressure them?',['No; eviction must follow legal process without threats or intimidation','Yes, after 5 days','Yes, if the lease allows it','Only in commercial leases'],'Evictions must comply with state and local laws.'],
['Why document the property\'s condition at move-in?',['So the tenant can be held accountable for damage at move-out','To raise the rent','To satisfy the lender','To get insurance discounts'],'Photos and videos are often used.'],
['Neglecting minor repairs usually leads to…',['Higher costs later','Lower costs overall','Higher rents','Better tenant retention'],'Maintenance preserves long-term value.'],
['When returning security deposits, deductions must…',['Follow state law, often with an explanation of charges','Be at the manager\'s discretion','Always be 50%','Never be made'],'Unused deposits are returned to the tenant.'],
['Asset managers oversee…',['Portfolios of income properties to maximize total return','Day-to-day repairs only','A single apartment\'s leasing','Mortgage underwriting'],'For high-net-worth individuals, private equity firms, corporations and others.'],
['What are the four functions of an asset manager?',['Management, acquisition, financing and disposition','Leasing, marketing, maintenance and collection','Appraisal, brokerage, lending and closing','Buying, renting, repairing and selling'],'Corporate asset managers often handle more complex duties than property managers.'],
['In a sale-and-leaseback, a firm…',['Sells its property to an investor and leases it back to free up capital','Buys a property and leases it to tenants','Leases land and builds on it','Sells a lease to another tenant'],'It keeps using the property.'],
['Deciding whether to lease or buy a facility is part of which asset-manager function?',['Financing','Disposition','Management','Acquisition only'],'Financing also looks for refinancing opportunities.'],
['Disposing of properties no longer needed through redevelopment, renovation or exchange is…',['Disposition','Acquisition','Administration','Marketing'],'Knowing when to hold or sell to maximize returns.'],
['An asset manager\'s "management" function goes beyond facilities to include…',['Strategic decisions like whether and when to make capital improvements','Collecting rent','Showing apartments','Cleaning common areas'],'Plus researching economic, financial and political risks.'],
['Which is a common advertising tool for rental space in your notes?',['Signs on the property','Billboards on the moon','Radio jingles only','Direct mail to lenders'],'Also flyers, bulletin boards, internet sites, leasing companies, newspaper ads, open houses.'],
];
BANK.res=[
['What are the five principal types of residential development?',['Single-family detached, single-family attached, multifamily, manufactured homes, second homes','Condos, co-ops, apartments, hotels, offices','Urban, suburban, rural, resort, industrial','Starter, move-up, luxury, retirement, rental'],'From the unit review.'],
['Which housing type has dominated U.S. markets for the past 50 years?',['Single-family detached homes','Condominiums','Manufactured homes','Time-shares'],'Rising land costs and environmental and energy concerns have made it less attractive than it once was.'],
['A house built from lot line to lot line, often L-shaped around a private patio, is a…',['Patio or zero-lot-line house','Plex','Townhouse','Cooperative'],'It maximizes the use of smaller lots.'],
['Which three types of attached housing does the unit review list?',['Townhome, plex and patio house','Condo, co-op and apartment','Duplex, triplex and fourplex','Detached, manufactured and second home'],'Note: the body of your notes lists patio houses under detached homes.'],
['A duplex, triplex or fourplex with separate entrances is a…',['Plex','Townhome','Co-op','Patio house'],'Each unit can be rented or owned.'],
['In a condominium, the owner holds…',['Individual ownership of a unit plus shared ownership of common areas','Shares in a corporation that owns the building','A lease from the developer','Rights to a week each year'],'In a co-op, the owner holds shares in a corporation with rights to a unit.'],
['In a cooperative, the resident owns…',['Shares in a corporation with rights to a particular unit','The unit outright','Nothing; they rent','The land only'],'Condos give direct unit ownership.'],
['Why are condominium and cooperative ownership increasing?',['Economic benefits, favorable demographics and declining profitability of rental housing','Lower property taxes for all','Government mandates','Falling land prices'],'Also tax deductions and an inflation hedge.'],
['Manufactured homes are built to which federal standard?',['The HUD code','USPAP','FIRREA','The UCC'],'They are built off-site and transported.'],
['Why are manufactured homes gaining acceptance?',['Better design and quality, available financing, and rising cost of conventional housing','They appreciate faster than all housing','They require no land','They are exempt from taxes'],'They will probably capture a growing share of the single-family market.'],
['The primary factor leading people to buy a second home is…',['Amenities (beaches, mountains, recreation)','Commuting distance','School districts','Lower property taxes'],'Many are also bought for investment potential.'],
['Renting a second home out part of the year can provide…',['Tax benefits','Free mortgage insurance','Homestead exemption','Automatic appreciation'],'Most owners can\'t occupy them year-round.'],
['A key benefit of time-sharing is that buyers…',['Protect a large part of future vacation costs from inflation','Own the whole property','Can live there year-round','Avoid all maintenance fees'],'They also share in any appreciation of their interest.'],
['What is the first step in analyzing the market for a residential project?',['Delineate the market area','Analyze future supply','Determine future demand','Run the financial feasibility'],'Then recent trends, future demand, future supply.'],
['In smaller communities, the market area is mainly determined by…',['Local employment','The school district','The highway system','County lines'],'In larger areas, commuting ranges and public transit matter.'],
['The market area for a residential project is largely determined by…',['Employment opportunities within commuting range','Property tax rates','The developer\'s preference','Zoning maps'],'From the unit review.'],
['According to your notes, misjudging (overestimating) future supply can lead to…',['High vacancy rates and financial losses','Higher rents','Faster absorption','Lower land prices'],'That is why step 4 analyzes competing projects and anticipated supply.'],
['A spike in housing demand from a new temporary employer means the analyst should…',['Check whether the cause is temporary before assuming long-term growth','Build as fast as possible','Ignore it','Lower prices'],'Understanding recent trends reveals underlying causes.'],
['How can construction delays hurt a development?',['Interest costs rise and the project may miss market demand','They reduce taxes','They lower land costs','They improve absorption'],'Timing completion with demand is critical.'],
['According to your notes, the primary factor in real estate development is…',['Market conditions','Architecture','The developer\'s reputation','Interest rates alone'],'Overlooking the market can lead to failure.'],
['A financial feasibility analysis projects…',['The probable cash flow and profit or loss of the project','The appraised value only','The buyer\'s credit','The zoning variance'],'Its purpose is to judge the project\'s probable success.'],
['In the Milford Hills example, what were total projected development expenses?',['$2,287,050','$825,000','$1,213,594','$450,000'],'Land and house $825,000 was the biggest single item.'],
['In the Milford Hills pro forma, cumulative cash flow first turns positive in…',['Quarter 10','Quarter 3','Quarter 6','Quarter 12'],'Cumulative cash flow is $313,594 in quarter 10 and $1,213,594 by quarter 12.'],
['Absorption rate measures…',['How fast available homes sell (or lease) in a market over a period','The vacancy rate','Construction costs','Mortgage rates'],'It shows how long current inventory would take to sell out.'],
['Multifamily residences mainly target…',['Urban populations, young couples and singles','Large families wanting yards','Farmers','Retirees wanting land'],'Lower maintenance and cost.'],
];
BANK.com=[
['Suburban shopping centers emerged mainly after…',['World War II, with more cars and suburban growth','The Civil War','The 2008 crisis','World War I only'],'Downtown shopping struggled with parking as car ownership grew in the 1920s.'],
['Which is NOT one of the five characteristics of a shopping center?',['Multiple owners for each store','Unified architecture managed as a unit','On-site parking','Delivery facilities separate from shopping areas'],'Also: a site serving a trade area, and single ownership and management.'],
['A neighborhood (convenience) center is anchored by…',['A supermarket or drugstore','Two or more department stores','A junior department store','Three or more department stores'],'Typical GLA 50,000 sq ft on about 3 acres.'],
['A community center is anchored by…',['A variety, discount or junior department store','A supermarket only','Three full-line department stores','A hotel'],'Typical GLA 150,000 sq ft on 10–30 acres.'],
['A regional center is anchored by…',['One or more (often two) full-line department stores','A supermarket','A discount store','A factory outlet'],'Typical GLA 400,000 sq ft (range 300,000–750,000) on 30–50 acres.'],
['A super-regional center has…',['Three or more full-line department stores and about 1 million sq ft or more','One supermarket','Under 100,000 sq ft','No anchors'],'100+ acres, often multilevel, draws from over 50 miles away.'],
['The typical GLA of a neighborhood center is…',['50,000 sq ft','150,000 sq ft','400,000 sq ft','1,000,000 sq ft'],'Range 30,000–100,000.'],
['The typical GLA of a community center is…',['150,000 sq ft','50,000 sq ft','400,000 sq ft','1,000,000 sq ft'],'Range 100,000–300,000.'],
['A neighborhood center serves roughly what radius?',['1.5 miles','3–5 miles','8–10 miles','50 miles'],'Population of about 2,500–40,000.'],
['A community center\'s primary trade area radius is about…',['3–5 miles','1.5 miles','8–10 miles','25 miles'],'Regional centers: 8–10 miles (unit review).'],
['The primary trade area typically produces what share of a center\'s sales?',['60–70%','15–20%','90–100%','30–40%'],'The secondary trade area adds 15–20%.'],
['The secondary trade area is typically within…',['A 15–20 minute drive','A 5-minute walk','An hour\'s flight','The same block'],'It adds 15–20% of sales.'],
['A center anchored by a discount store may be called a…',['Discount shopping center','Power center','Specialty center','Factory outlet center'],'A variation of the community center.'],
['A large strip center with several big-box "category killers" (like Best Buy) is a…',['Power center','Neighborhood center','Specialty center','Regional mall'],'It serves a trade area beyond a standard center.'],
['A very large discount store such as a Walmart Supercenter is a…',['Superstore','Power center','Specialty center','Community center'],'GLA 60,000–200,000 sq ft under one roof.'],
['Factory outlet centers emerged as purpose-built malls in the…',['1980s','1950s','1920s','2010s'],'Manufacturers sell directly to consumers.'],
['Which was one of the first suburban shopping centers?',['Country Club Plaza in Kansas City','Mall of America','Southdale Center','Northgate'],'It has stayed a top-ranked center for over 80 years.'],
['Which center (1950) was the first with a department store anchor and a central pedestrian mall?',['Northgate in Seattle','Southdale near Minneapolis','Country Club Plaza','Mall of America'],'Also separate delivery routes and big parking lots.'],
['The first fully enclosed, multilevel mall was…',['Southdale Center near Minneapolis (1956)','Northgate in Seattle','Mall of America','Country Club Plaza'],'Enclosed malls dominated the 1960s and 1970s.'],
['The Mall of America opened in…',['1992','1956','1950','2008'],'4.2 million sq ft, 525+ stores, over 42 million visitors a year.'],
['How are malls adapting to the loss of anchors like J.C. Penney?',['Food halls, pop-up shops, smaller retailers and entertainment','Building more department stores','Closing parking lots','Converting to farmland'],'New development focuses on refurbishing existing malls.'],
['What is the most important factor in selecting a shopping center site?',['Location (and access)','Drainage','Topography','Soil type'],'Size, shape, utilities and zoning also matter.'],
['Which is NOT a step in a shopping center feasibility analysis?',['Choose the architect','Define the trade area','Determine the size of the market','Estimate the share of sales the center can capture'],'Also analyze the competition.'],
['Anchor tenants are important because they…',['Draw customer traffic for the other stores','Pay no rent','Manage the center','Set the zoning'],'The tenant mix should complement the anchors.'],
['Demand for office space depends mainly on…',['Business activity and government employment','Retail sales','Population over 65','Hotel occupancy'],'Also growth of white-collar and service jobs.'],
['Which tenants traditionally choose downtown office locations?',['Financial institutions, corporate headquarters, law firms and government','Warehouses','Factories','Farms'],'Being near related businesses matters.'],
['Suburban office parks offer…',['Low-rise buildings in a campus setting near where workers live','High-rise towers downtown','Factory floors','Retail storefronts'],'Shorter commutes and a pleasant setting.'],
['What has reduced demand for office space recently?',['Remote work accelerated by COVID-19 and economic downturns','More white-collar jobs','Lower downtown rents','More government jobs'],'Telecommuting lowers costs for firms and workers.'],
['Which factors drive a firm\'s choice of industrial site?',['Available land, utilities and access to transportation','Nearby shopping malls','School quality','Office prestige'],'From the unit review.'],
['What is the first step in analyzing an industrial site?',['Determine existing or potential supply','Estimate absorption','Compare competitiveness','Forecast demand'],'Then forecast demand, estimate absorption, compare competitiveness.'],
['Which hotels target businesspeople and conventioneers, with occupancy that can drop on weekends?',['Commercial hotels','Resort hotels','Highway hotels','Extended-stay motels'],'They often rely on conventions.'],
['Highway hotels are also called…',['Airport hotels','Destination hotels','Convention hotels','Boutique hotels'],'They serve travelers in transit.'],
['Resort hotels are also known as…',['Destination hotels, often seasonal','Airport hotels','Commercial hotels','Transient motels'],'Golf courses, pools, scenic locations.'],
['Lodging revenues are…',['Highly sensitive to the economy, with rates that adjust quickly to inflation','Fixed by long leases','Unaffected by travel trends','Set by the government'],'Effective management is crucial.'],
['A major reason downtown shopping districts declined was…',['Limited parking as car ownership grew','Too many department stores','Lower taxes in cities','Government bans'],'Some CBDs became stagnant or specialized.'],
];
BANK.mkt=[
['A market is…',['The mechanism through which goods and services are traded between participants','A building where things are sold','The price of real estate','The government\'s housing policy'],'Supply and demand together set equilibrium prices.'],
['If demand increases and supply is unchanged, the equilibrium price…',['Rises','Falls','Stays the same','Becomes zero'],'Prices move directly with demand.'],
['If supply increases and demand is unchanged, the equilibrium price…',['Falls','Rises','Stays the same','Doubles'],'Prices move inversely with supply.'],
['Mortgage rates rise, all else equal. Owner-occupied home prices will likely…',['Fall, because demand decreases','Rise, because demand increases','Rise, because supply falls','Not change'],'Study exercise 1.'],
['Population grows and construction costs fall at the same time. Home prices will…',['Depend on which shift is larger (demand up, supply up)','Definitely rise','Definitely fall','Stay exactly the same'],'Simultaneous shifts: the result depends on relative magnitudes.'],
['If supply and demand increase proportionately, the equilibrium price…',['Remains unchanged','Rises sharply','Falls sharply','Drops to zero'],'If the changes are unequal, the price shifts.'],
['A small supply increase and a large demand increase lead to…',['A higher equilibrium price','A lower equilibrium price','No price change','Zero vacancy'],'Figure 13.4.'],
['Fort Lauderdale is nicknamed…',['The "Venice of America"','The "Big Easy"','The "Magic City"','The "Gateway to the West"'],'For its canals.'],
['Why is Fort Lauderdale\'s supply curve so steep?',['Ocean-access lots are already built on, so new homes require demolition','Land is free','There are no buyers','Construction is banned'],'Wealthy retirees drive demand.'],
['Commercial real estate markets divide into…',['The space market and the asset market','The primary and secondary markets','The stock and bond markets','The rental and mortgage markets'],'Space = landlords and tenants; asset = ownership and rights to rent.'],
['The real estate space market involves transactions between…',['Landlords and tenants (or owner-users)','Lenders and borrowers','Investors and REITs only','Appraisers and assessors'],'It is highly segmented by use and location.'],
['The real estate asset market focuses on…',['Rights to the cash flows that properties generate','The physical layout of buildings','Rent negotiations','Building permits'],'Participants compare real estate with stocks and bonds.'],
['Which is NOT one of the six major space-market segments?',['Municipal','Residential','Industrial','Lodging'],'The six: residential, industrial, retail, office, agricultural, lodging.'],
['Class A office space has…',['High rents due to superior quality and location','Few amenities and poor condition','Basic function at low cost','No tenants'],'Class D has few amenities and poor physical condition.'],
['Class C office space is…',['Functional and cost-effective with few amenities','Top quality','Unusable','Always downtown'],'Class B lacks certain attributes but is still desirable.'],
['In Unit 13, regional centers serve an area within about…',['7–12 miles','1.5 miles','3–5 miles','50+ miles'],'Unit 12\'s review says 8–10 miles; know both.'],
['Which is an example of a publicly traded equity asset?',['REIT shares','Bank loans','Whole mortgages','Private real property'],'Figure 13.5: stocks, REITs, mutual funds.'],
['Which is an example of a privately traded debt asset?',['Whole mortgages','MBS','Bonds','Stocks'],'Also bank loans and venture debt.'],
['Mortgage-backed securities are…',['Publicly traded debt assets','Privately traded equity','Publicly traded equity','Space-market assets'],'Bonds and money instruments are in the same box.'],
['Compared with public markets, private real estate markets have…',['Less frequent trades, higher transaction costs and harder valuation','More frequent trades','Prices that reflect all information instantly','Lower transaction costs'],'Whole assets are sold, not shares.'],
['Compared with equity assets, debt assets generally have…',['Lower risk','Higher risk','Higher expected returns','No cash flows'],'Equity holders are paid after debt holders.'],
['What are the three main determinants of real estate asset prices?',['Opportunity cost of capital, growth expectations and risk','Rents, taxes and zoning','Construction cost, land and labor','Interest, inflation and unemployment'],'Study exercise 4.'],
['If the cost of capital falls, real estate asset prices tend to…',['Rise','Fall','Not change','Become negative'],'Cheaper capital raises demand for assets.'],
['Investors pay less for higher-risk properties because…',['Lower prices compensate for more uncertain cash flows','Risky properties have no income','Lenders refuse to lend','Taxes are higher'],'Risk is a price determinant.'],
['What ties the space market and the asset market together?',['The development industry','The Federal Reserve','Property managers','Appraisers'],'It adds space when development is profitable.'],
['What are the three components of the real estate system?',['Space market, asset market and development industry','Buyers, sellers and brokers','Land, labor and capital','Lenders, appraisers and builders'],'Figure 13.6.'],
['Demand rises in a space market. How do the asset market and developers respond?',['Higher rents raise values and returns, so developers add new space','Developers stop building','Asset prices fall','Nothing changes'],'New buildings then add to space-market supply.'],
['Which is NOT one of the five basic inputs to market analysis?',['Mortgage rates','Vacancy rate','Rent or price level','Absorption of new space'],'Also construction started and construction completed.'],
['Vacancy is measured in units for apartments and in what for commercial space?',['Square feet','Dollars','Tenants','Acres'],'Rents: monthly for residential, annual per sq ft for commercial.'],
['Net absorption is…',['The net change in occupied space (leased minus vacated)','All space leased, ignoring move-outs','Vacant space divided by total','New construction completed'],'Gross absorption ignores space vacated.'],
['A high months-supply figure suggests…',['It is a poor time to start new construction','Space is scarce','Rents will soar','Vacancy is zero'],'Study exercise 9.'],
['Which is a key demand driver for office space?',['Employment in office occupations','Air passenger volume','Shipping volume','Per capita income only'],'Lodging: air passengers, traffic, visitors. Industrial: manufacturing and transport jobs.'],
['Which is a key demand driver for retail space?',['Per capita income, aggregate income and wealth','Manufacturing employment','Highway traffic only','Household formation only'],'Apartments: population, household formation, affordability, job growth.'],
['Which firm is named in your notes as a market research firm?',['Torto Wheaton Research','Moody\'s Analytics','Gallup','Nielsen'],'Also LaSalle Investment Advisors and RREEF Research.'],
['Existing homes come onto the market because of…',['Job changes, family size, finances or an owner\'s death','New zoning only','Mortgage rate caps','Appraisal requirements'],'New units are built when developers expect profitable prices.'],
['Which subcategory belongs to the agricultural space market?',['Perennial cropland','Warehouses','Extended-stay hotels','Freestanding retail'],'Also annual cropland and livestock/grazing land.'],
];

/* ---------- lessons ---------- */
LESSONS.lease=`
<p>A <b>lease</b> transfers the right to use and possess property in exchange for rent. It splits ownership into the <b>leased fee estate</b> (the landlord's interest) and the <b>leasehold estate</b> (the tenant's). A lease longer than <b>one year</b> must be in writing.</p>
<h4>Elements of a lease</h4><p>Names of lessor and lessee · identification of premises · conveyance · term · rent and payment terms · duties of both parties · signatures.</p>
<h4>Four leasehold estates by duration</h4>
<table class="tbl"><tr><th>Estate</th><th>Key feature</th></tr>
<tr><td>Tenancy for a stated period</td><td>Fixed start and end, up to 99 years; may need recording</td></tr>
<tr><td>Tenancy from period to period</td><td>Renews automatically (e.g., month to month) until notice</td></tr>
<tr><td>Tenancy at will</td><td>No end date; either party can end it with reasonable notice</td></tr>
<tr><td>Tenancy at sufferance</td><td>Tenant holds over after expiration without consent</td></tr></table>
<h4>By use</h4><p><b>Residential</b> leases prohibit commercial use. <b>Ground leases</b> are long-term land leases (typically over 50 years): the tenant builds, improvements revert to the landowner, lease payments are deductible (land can't be depreciated). Example: Manhattan office buildings on leased land. Often a financing device for major office buildings.</p>
<h4>By who pays expenses and how rent changes</h4>
<table class="tbl"><tr><th>Lease</th><th>What it means</th></tr>
<tr><td>Gross</td><td>Landlord pays operating expenses</td></tr>
<tr><td>Net</td><td>Tenant pays operating expenses; landlord gets net rent</td></tr>
<tr><td>Net-net (double net)</td><td>Tenant also pays insurance (key term: taxes + insurance)</td></tr>
<tr><td>Net-net-net (triple net)</td><td>Tenant pays taxes, insurance and operating expenses</td></tr>
<tr><td>Fixed-rent</td><td>Rent constant for the term</td></tr>
<tr><td>Graduated / step-up</td><td>Rent rises by set percentages at set times</td></tr>
<tr><td>Reappraisal</td><td>Rent changes with property reappraisals</td></tr>
<tr><td>Percentage</td><td>Base rent + % of sales over a threshold (retail)</td></tr>
<tr><td>Index</td><td>Rent tied to an index such as the CPI</td></tr></table>
<h4>Key provisions</h4>
<ul><li><b>Renewal options</b> protect tenants from big increases. <b>Negative</b> renewal clause: tenant leaves unless it gives renewal notice. <b>Positive</b>: lease renews unless the tenant gives termination notice.</li>
<li><b>Expenses:</b> residential landlords usually pay maintenance, taxes and insurance; commercial tenants often pay <b>CAM</b> fees. An <b>expense stop</b> caps the landlord's share; tenants pay the excess.</li>
<li><b>Assignment</b> transfers all of the tenant's rights, but the tenant stays liable unless released. A <b>sublease</b> transfers part; subleasing for profit is allowed unless the lease forbids it.</li>
<li><b>Security deposits</b> protect against damage and unpaid rent; inspect before and after occupancy. State law sets return deadlines and eviction rules.</li>
<li><b>Improvements</b>: permanent ones (fixtures like built-in bookcases) usually stay with the property.</li></ul>
<h4>Rights and duties</h4>
<p><b>Tenant:</b> covenant of quiet enjoyment (exclusive possession; no eviction unless the lease is violated; can deduct repair costs from rent if the landlord doesn't fix problems). <b>Landlord:</b> warranty of habitability, safety codes, protect tenants from negligence-related harm (e.g., lock repairs), no unauthorized alterations.</p>
${ex('Figure 7.1: Astor Pub lease',`<p>Tenant Astor Pub; landlord MTA Investments; Suite A-112, The Shoppes of Elan Center, Charleston SC; July 1, 2011 – June 30, 2016; a neighborhood bar and grill. Base rent $3,880/month rising 3% a year; plus 3% of gross sales over $500,000; CAM $700/month; $300 late fee after 5 days; $3,000 security deposit returned within 30 days. Landlord repairs foundation, roof, outer walls and structure; tenant does everything else. No assignment or sublease without consent. Estoppel certificate within 10 days. Lease is subordinate to mortgages. Tenant handles ADA compliance. Total destruction ends the lease; partial damage reduces rent. Time is of the essence.</p>`)}`;
LESSONS.leasem=`
<p>Lease questions on a multiple-choice exam usually turn on one calculation. Learn the five below.</p>
${fc('Percentage lease','Rent = base rent + % × (sales − breakpoint)','Breakpoint = the sales threshold in the lease','Retail leases that share in the tenant\'s sales.','Only sales <b>above</b> the threshold count.','Applying the percentage to all sales; forgetting the base rent.')}
${ex('study exercise 10',`<p>Al's Shoe Store: $2,000 base + 2% × ($18,000 − $10,000) = $2,000 + $160 = <b>$2,160</b>.</p>`)}
${fc('Graduated (step-up) rent','Rent in year n = year-1 rent × (1 + g)<sup>n − 1</sup>','g = annual increase','A lease that rises by a set percentage each year (the example lease: 3%).','Increases compound.','Raising to the power n instead of n − 1.')}
${fc('Expense stop','Tenant pays (actual expenses − stop) × square feet','Stop = the expense level the landlord covers','Office leases where the landlord caps its expense exposure.','','Thinking the stop limits the tenant; it limits the landlord.')}
${fc('CAM pro rata share','Tenant\'s share = tenant sq ft ÷ total GLA × CAM cost','GLA = gross leasable area','Shopping center and office common areas.','','Dividing by the wrong total.')}
${fc('Index lease','New rent = rent × (1 + CPI change)','CPI = Consumer Price Index','Inflation-adjusted leases.','','Adding the CPI percentage as dollars.')}
<p><b>Gross vs. net:</b> in a gross lease the landlord's net income = rent − operating expenses. In a triple net lease the tenant pays those expenses, so the landlord keeps the full rent.</p>
${flag('Your notes give the percentage-lease example and the lease-example terms but no worked formulas for expense stops, CAM shares or index leases. Those calculations follow directly from the key-term definitions.')}`;
LESSONS.pm=`
<p>A <b>property manager</b> runs the day-to-day operation of a property for an owner who lacks the time, skill or desire. The primary duty: secure the <b>highest net return over the property's useful life</b>. Cutting maintenance for short-term cash is "<b>milking the property</b>."</p>
<ul><li>The manager is a <b>fiduciary</b> (agent) of the owner, under a written <b>management agreement</b> that sets powers, duties, pay and term. A change of owner doesn't end it.</li>
<li>May need a broker or property management license (varies by state). Designations: <b>CPM</b> (Certified Property Manager), <b>ARM</b> (Accredited Resident Manager). Groups: IREM, BOMA.</li>
<li>Powers: set and collect rents; execute, extend or cancel leases; settle with tenants; hire, fire and supervise; spend funds within limits. Employees are often <b>bonded</b>.</li>
<li>Pay: hired directly by the owner → <b>4%–10% of gross income</b> (depends on size, duties, local competition). Employed by a management firm → fixed salary.</li></ul>
<h4>Three functions (unit review)</h4><p><b>Administrative</b> (rents, records, reports) · <b>Marketing</b> (leasing space profitably) · <b>Physical</b> (maintenance, rehab, renovation).</p>
<h4>Day-to-day tasks</h4><p>Administration · marketing and advertising (rental space is <b>perishable</b>) · tenant selection (Fair Housing Act; commercial tenant synergy) · lease negotiation · move-in inspection (photos and video) · maintenance (skipping small repairs costs more later) · rent collection (one of the hardest tasks; eviction needs due process, no threats or intimidation, no shutting off utilities) · move-out inspection · security deposit returns (deductions per state law).</p>
<h4>Asset managers</h4><p>They oversee <b>portfolios</b> to maximize total return. Four functions: <b>management</b> (strategic, e.g., capital improvements), <b>acquisition</b>, <b>financing</b> (lease vs. buy, refinancing, <b>sale-and-leaseback</b> to free capital), and <b>disposition</b> (sell, redevelop, renovate or exchange).</p>`;
LESSONS.res=`
<h4>Five types of residential development</h4>
<ol><li><b>Single-family detached</b>: most sought-after; dominated for 50 years, though land costs and environmental and energy concerns weigh on it. <b>Patio / zero-lot-line</b> houses use the lot line to lot line, often L-shaped around a private patio.</li>
<li><b>Single-family attached</b>: <b>townhomes</b> (shared walls, own entrances, small yards) and <b>plexes</b> (duplex, triplex, fourplex). The unit review lists townhome, plex and patio house.</li>
<li><b>Multifamily</b>: apartments and condos for urban dwellers, young couples and singles. <b>Condominium</b> = own your unit plus a share of common areas. <b>Cooperative</b> = own shares in a corporation with rights to a unit. Growing because of economic benefits (tax deductions, inflation hedge), demographics and declining rental profitability.</li>
<li><b>Manufactured homes</b>: factory-built to the HUD code; lower cost per square foot; acceptance rising with better design, financing and higher conventional housing costs.</li>
<li><b>Second homes</b>: bought mainly for <b>amenities</b>; tax benefits if rented part of the year; often investment-driven. <b>Time-sharing</b> sells use for a set period each year, protecting future vacation costs from inflation.</li></ol>
<h4>Market analysis: four steps</h4>
<ol><li><b>Delineate the market area</b> (employment within commuting range; local employment in small towns)</li><li><b>Analyze recent trends</b> (vacancy and <b>absorption</b> rates; is a demand spike temporary?)</li><li><b>Determine future demand</b></li><li><b>Analyze future supply</b> (competing projects; misjudging supply causes high vacancy and losses)</li></ol>
<p>Delays add interest cost, and timing completion with demand is critical. The <b>primary factor in development is market conditions</b>. A <b>financial feasibility analysis</b> then projects cash flow and profit or loss to judge probable success.</p>
${ex('Milford Hills (Tables 11.1–11.2)',`<p>Development expenses total <b>$2,287,050</b> (land and house $825,000; clearing and grading $368,550; curb, gutter, paving $516,900; water and sewer $357,500; landscaping $86,100; engineering, permits, survey $133,000). Lot sales of $300,000 a quarter (quarters 3–7), then $450,000 (8–12). Cumulative cash flow bottoms at −$1,873,625 in quarter 2, turns positive in <b>quarter 10</b> ($313,594) and ends at <b>$1,213,594</b>.</p>`)}`;
LESSONS.com=`
<h4>Shopping centers</h4>
<p>Suburban centers grew after World War II with car ownership (parking downtown was a problem from the 1920s). Five characteristics: unified architecture managed as a unit · a site serving a trade area · on-site parking · separate delivery areas · single ownership and management.</p>
<table class="tbl"><tr><th>Type</th><th>Anchor</th><th>Typical GLA</th><th>GLA range</th><th>Acres</th><th>Min. support</th></tr>
<tr><td>Neighborhood (convenience)</td><td>Supermarket or drugstore</td><td>50,000</td><td>30,000–100,000</td><td>3</td><td>2,500–40,000</td></tr>
<tr><td>Community</td><td>Variety, discount or junior department store</td><td>150,000</td><td>100,000–300,000</td><td>10–30</td><td>40,000–100,000</td></tr>
<tr><td>Regional</td><td>One or more full-line department stores</td><td>400,000</td><td>300,000–750,000</td><td>30–50</td><td>150,000+</td></tr>
<tr><td>Super-regional</td><td>Three or more full-line department stores</td><td>1,000,000</td><td>750,000–1,500,000</td><td>100+</td><td>200,000+</td></tr></table>
<p><b>Trade areas:</b> primary = 60–70% of sales (about 1.5 miles neighborhood, 3–5 community, 8–10 regional); secondary = another 15–20%, within a 15–20 minute drive. Super-regional centers draw from 50+ miles.</p>
<p><b>Variations:</b> superstore (60,000–200,000 sq ft, e.g., Walmart Supercenter, Target) · power center (big-box category killers like Best Buy) · specialty center (niche or upscale) · discount center (community center with a discount anchor) · factory outlet center (purpose-built in the 1980s).</p>
<p><b>History:</b> Country Club Plaza, Kansas City (one of the first; top-ranked 80+ years) → Northgate, Seattle, 1950 (first department-store anchor and pedestrian mall) → Southdale, near Minneapolis, 1956 (first enclosed, multilevel) → Mall of America, 1992 (4.2M sq ft, 525+ stores, 42M visitors a year). Today: anchors like J.C. Penney leaving; food halls, pop-ups, entertainment.</p>
<p><b>Development process:</b> market and feasibility analysis → define the trade area → size the market (census, income) → analyze competition → estimate capture → site (location and access matter most; also size, shape, topography, drainage, utilities, zoning) → tenant selection (anchors plus a complementary mix).</p>
<h4>Office</h4><p>Demand comes from business activity, government employment and white-collar/service growth. Downtown: financial institutions, headquarters, law firms, government. Also "uptown" nodes along major roads and suburban <b>office parks</b> (low-rise, campus-like). Remote work and COVID-19 have reduced demand. Buildings may be single- or multi-tenant, investor-owned or office condos.</p>
<h4>Industrial</h4><p>Site choice: available land, utilities, transportation access. Feasibility: (1) existing or potential supply, (2) forecast demand, (3) estimate absorption, (4) compare competitiveness.</p>
<h4>Lodging</h4><p>Demand from pleasure, business and convention travelers. <b>Commercial hotels</b> (business, conventions; weekend dips) · <b>highway/airport hotels</b> (in transit) · <b>resort/destination hotels</b> (vacationers, amenities, seasonal). Revenues are economy-sensitive and rates adjust fast to inflation; management makes or breaks them.</p>
${flag('Your notes disagree on two numbers: the regional trade area is 8–10 miles in Unit 12\'s review but 7–12 miles in Unit 13, and the super-regional key term says "often exceeding 800,000 sq ft" while Unit 12 says over 750,000 (typically 1 million). Know both.')}`;
LESSONS.mkt=`
<p>A <b>market</b> is the mechanism through which goods and services are traded. Supply and demand together set the <b>equilibrium</b> price.</p>
<h4>How prices move</h4>
<ul><li>Demand ↑ → price ↑. Demand ↓ → price ↓. (Prices move <b>directly</b> with demand.)</li><li>Supply ↑ → price ↓. Supply ↓ → price ↑. (Prices move <b>inversely</b> with supply.)</li><li>Both shift at once → the result depends on which shift is bigger. Proportional increases in supply and demand leave the price unchanged; a small supply increase plus a big demand increase raises the price.</li></ul>
<p><b>Examples:</b> higher mortgage rates → demand falls → home prices fall. Population growth (demand up) plus cheaper construction (supply up) → price could go either way. <b>Fort Lauderdale</b> ("Venice of America"): ocean-access lots are built out, so new homes need demolition (steep supply curve), and wealthy retirees keep demand high.</p>
<h4>Space market vs. asset market</h4>
<p><b>Space market</b>: landlords and tenants (or owner-users) trade the use of space. Segmented by use and location: residential, industrial, retail, office, agricultural, lodging. Office classes: <b>A</b> (top quality and rent), <b>B</b> (missing some features), <b>C</b> (functional, few amenities), <b>D</b> (few amenities, poor condition).</p>
<p><b>Asset market</b>: trades rights to a property's cash flows; part of the broader capital market.</p>
<table class="tbl"><tr><th></th><th>Public</th><th>Private</th></tr><tr><td>Equity</td><td>Stocks, REITs, mutual funds</td><td>Real property, private firms, oil and gas partnerships</td></tr><tr><td>Debt</td><td>Bonds, MBS, money instruments</td><td>Bank loans, whole mortgages, venture debt</td></tr></table>
<p>Public markets: frequent, high-volume trades; prices reflect available information. Private: whole assets, fewer trades, higher costs, harder to value. Debt is lower risk; equity is higher risk and return.</p>
<p><b>Asset prices depend on three things:</b> the <b>opportunity cost of capital</b> (cheaper capital → higher prices), <b>growth expectations</b>, and <b>risk</b> (more risk → lower price).</p>
<h4>The real estate system (Figure 13.6)</h4><p><b>Space market + asset market + development industry.</b> Rents and occupancy in the space market feed returns and values in the asset market. When values make building profitable, developers add space, which increases space-market supply. Economic conditions and capital markets push on both.</p>
<h4>Market analysis inputs</h4><p>(1) Vacancy rate · (2) rent or price level · (3) construction started · (4) construction completed · (5) absorption. Research firms: Torto Wheaton Research, LaSalle Investment Advisors, RREEF Research.</p>
<table class="tbl"><tr><th>Segment</th><th>Key demand drivers</th></tr><tr><td>Office</td><td>Office employment</td></tr><tr><td>Lodging</td><td>Air passengers, highway traffic, visitors</td></tr><tr><td>Retail</td><td>Per capita income, aggregate income, wealth</td></tr><tr><td>Industrial</td><td>Manufacturing and transportation jobs, shipping volume</td></tr><tr><td>Apartments</td><td>Population, household formation, affordability, job growth</td></tr><tr><td>Owner-occupied</td><td>Population, household formation, interest rates, job and income growth</td></tr></table>`;
LESSONS.mktm=`
${fc('Vacancy rate','Vacancy rate = vacant space ÷ total space','Units for apartments; square feet for commercial','Measuring market slack.','','Dividing by occupied space instead of total.')}
${ex('your notes',`<p>50 empty apartments out of 1,500 = <b>3.3%</b>.</p>`)}
${fc('Months supply','Months supply = (vacant space + space under construction) ÷ net absorption per month','Net absorption = occupied space gained per month','Judging whether to start a new project.','Absorption continues at the current pace.','Using annual absorption without dividing by 12; leaving out space under construction.')}
${ex('your notes and study exercise 9',`<p>30 units/month absorbed, 30 vacant, 90 under construction → (30 + 90) ÷ 30 = <b>4 months</b>.<br>Warehouses: 10,000 sq ft absorbed last year, 6,000 vacant, 3,000 under construction → 9,000 ÷ (10,000 ÷ 12) = <b>10.8 months</b>, a long supply, so it's not a great time to build.</p>`)}
${fc('Net vs. gross absorption','Net = space leased − space vacated &nbsp;·&nbsp; Gross = all space leased','','Measuring demand growth.','','Calling gross absorption "net."')}
<p><b>Absorption rate</b> (Unit 11): months to sell current inventory = homes for sale ÷ sales per month.</p>`;

FORMULAS.splice(0,FORMULAS.length,
 ['Percentage lease','Retail rent','Base rent + % × (sales − breakpoint)'],
 ['Graduated rent','Year n rent','Year-1 rent × (1 + g)<sup>n−1</sup>'],
 ['Expense stop','Tenant\'s share','(Actual expense − stop) × sq ft'],
 ['CAM share','Pro rata','Tenant sq ft ÷ total GLA × CAM cost'],
 ['Index lease','New rent','Rent × (1 + CPI change)'],
 ['Management fee','Direct hire','4%–10% × gross income'],
 ['Vacancy rate','Market slack','Vacant ÷ total space'],
 ['Months supply','Time to absorb','(Vacant + under construction) ÷ monthly net absorption'],
 ['Net absorption','Demand growth','Space leased − space vacated'],
 ['Absorption (homes)','Months to sell out','Inventory ÷ sales per month'],
 ['FV of a lump sum','One amount → future','FV = PV(1 + i)<sup>n</sup>'],
 ['PV of a lump sum','One amount → today','PV = FV / (1 + i)<sup>n</sup>'],
 ['Monthly compounding','m periods per year','FV = PV(1 + i/m)<sup>n·m</sup>'],
 ['PV of an annuity','Equal payments → today','PVA = A[1 − 1/(1+i)<sup>n</sup>] / i'],
 ['FV of an annuity','Equal deposits → future','FVA = A[(1+i)<sup>n</sup> − 1] / i'],
 ['Sinking fund payment','Deposit to reach a target','A = FVA × i / [(1+i)<sup>n</sup> − 1]'],
 ['Mortgage payment','Loan → payment','A = PV × i / [1 − 1/(1+i)<sup>n</sup>]'],
 ['Loan balance','After k payments','PV of the remaining payments'],
 ['Interest in next payment','Payment k+1','Balance<sub>k</sub> × i/12'],
 ['NPV','Accept if > 0','−CF<sub>0</sub> + Σ CF<sub>t</sub>/(1+r)<sup>t</sup>'],
 ['IRR','Accept if ≥ required','Rate where NPV = 0'],
 ['Effective rate','Loan with points','Rate where net proceeds = PV of payments (+ balance)'],
 ['ARM rate','Each adjustment','Index + margin, within annual and lifetime caps']
);
