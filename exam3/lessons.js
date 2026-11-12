/* ===== Lessons: plain-language explanations, formula cards, worked examples ===== */
const fc=(name,eq,vars,when,assume,mist)=>`<div class="fcard"><div class="fcard-h">${name}</div><div class="eq big">${eq}</div><dl>
<dt>Variables</dt><dd>${vars}</dd><dt>Use it when</dt><dd>${when}</dd>${assume?`<dt>Assumes</dt><dd>${assume}</dd>`:''}<dt>Common mistakes</dt><dd>${mist}</dd></dl></div>`;
const ex=(t,body)=>`<div class="example"><div class="example-h">Worked example · ${t}</div>${body}</div>`;
const flag=t=>`<div class="flag">${t}</div>`;

const LESSONS={
lump:`
<p>Money has a time value: a dollar today can be invested, so it is worth more than a dollar next year. <b>Compounding</b> moves money forward in time. <b>Discounting</b> moves it back. Every TVM problem starts with one question: <i>am I moving one amount, or a series of equal payments?</i> This topic is the one-amount case.</p>
${fc('Future value of a lump sum','FV = PV(1 + i)<sup>n</sup>','PV = amount today · i = rate per period · n = number of periods','One amount today grows to a future date (land appreciating, a deposit growing).','Constant rate; interest is reinvested every period.','Using a percent instead of a decimal (10 not 0.10); multiplying i × n (that is simple interest, not compound).')}
${fc('Present value of a lump sum','PV = FV / (1 + i)<sup>n</sup>','FV = future amount · i = discount (required) rate · n = periods','You know a future amount and want what it is worth today ("how much should I pay now?").','Same rate every period.','Multiplying instead of dividing; using the wrong n.')}
${fc('Monthly (or other) compounding','FV = PV(1 + i/m)<sup>n·m</sup>','m = compounding periods per year (12 for monthly) · n = years','Whenever the problem says "compounded monthly" or payments are monthly.','The stated rate is an annual nominal rate.','Dividing the rate by 12 but forgetting to multiply years by 12, or the reverse.')}
${ex('land appreciation (from your notes)',`<p>$70,000 of land growing 10% a year: year 1 = $77,000, year 2 = $84,700, year 3 = <b>$93,170</b>. Reverse it: PV of $93,170 in 3 years at 10% = $70,000.</p>`)}
<p><b>Uneven cash flows</b> ($500, $1,000, $1,500) are not an annuity. Discount each one separately and add them. On the TI-84: <code>npv(rate, 0, {500,1000,1500})</code>.</p>
<p><b>Solving for the rate:</b> i = (FV/PV)<sup>1/n</sup> − 1. On the TI-84, fill N, PV (negative), FV and solve I%.</p>
<div class="keys"><span class="keys-h">TI-84 setup</span>APPS → 1:Finance → 1:TVM Solver. Money you pay out is <b>negative</b>, money you receive is <b>positive</b>. Set P/Y and C/Y to the same number (1 for annual, 12 for monthly). Cursor on the unknown, then <kbd>ALPHA</kbd> <kbd>ENTER</kbd>.</div>`,

annuity:`
<p>An <b>annuity</b> is a series of <i>equal</i> payments at <i>regular</i> intervals: rent checks, loan payments, savings deposits. An <b>ordinary annuity</b> pays at the end of each period (the default). An <b>annuity due</b> pays at the beginning (rent on the 1st). On the TI-84, switch PMT:END to PMT:BEGIN, then switch back afterward.</p>
${fc('Present value of an annuity','PVA = A × [1 − 1/(1 + i)<sup>n</sup>] / i','A = payment per period · i = rate per period · n = number of payments','Value today of a stream of equal payments (a lease, an income stream, the amount you can borrow).','Equal payments, end of period, constant rate.','Using it for unequal payments; forgetting to convert to monthly i and n.')}
${fc('Future value of an annuity','FVA = A × [(1 + i)<sup>n</sup> − 1] / i','Same variables','How much a series of equal deposits grows to.','Deposits at the end of each period.','Confusing it with PVA. Ask: is the answer "today" or "at the end"?')}
${fc('Sinking fund payment','A = FVA × i / [(1 + i)<sup>n</sup> − 1]','FVA = target amount','How much to deposit each period to reach a future goal (roof replacement fund).','Deposits earn the stated rate.','Using the mortgage payment formula (that one starts from a present value).')}
${ex('Ng\'s income stream (study exercise 7)',`<p>$5,000 a year for 10 years at 10%: PVA = 5,000 × [1 − 1/1.1<sup>10</sup>]/0.10 = 5,000 × 6.144567 = <b>$30,722.84</b>.</p><div class="keys"><span class="keys-h">TI-84</span>N=10 · I%=10 · PV=? · PMT=5000 · FV=0 · P/Y=1 → solve PV = −30,722.84</div>`)}`,

npv:`
<p>Every investment decision compares what you give up with what you expect to get. <b>NPV</b> puts everything in today's dollars and subtracts the cost. <b>IRR</b> is the return the deal actually earns.</p>
${fc('Net present value','NPV = −CF<sub>0</sub> + Σ CF<sub>t</sub> / (1 + r)<sup>t</sup>','CF<sub>0</sub> = initial cost · CF<sub>t</sub> = cash flow in year t (the last year includes the sale price) · r = required return','Deciding whether to buy: accept if NPV &gt; 0, reject if NPV &lt; 0.','Cash flows arrive at year-end and r reflects the deal\'s risk.','Forgetting to subtract the price; leaving the sale proceeds out of the final year; discounting year 1 by 0 periods.')}
${fc('Internal rate of return','Find r so that NPV = 0','Same cash flows','Finding the actual return. Accept if IRR ≥ required return.','Cash flows are reinvested at the IRR.','Comparing IRR with the wrong benchmark. With uneven cash flows IRR can have more than one answer, which is why NPV is preferred when comparing deals.')}
${ex('your notes\' $10,000 deal',`<p>Cash flows $100, $1,600, $1,800, $450, $12,500 at a 12% required return. NPV ≈ <b>+$24.82</b>, so accept (barely). IRR = <b>12.0646%</b>, just above 12%. Both rules agree.</p><div class="keys"><span class="keys-h">TI-84</span>APPS → Finance → 7:npv( → <code>npv(12, −10000, {100,1600,1800,450,12500})</code><br>APPS → Finance → 8:irr( → <code>irr(−10000, {100,1600,1800,450,12500})</code></div>`)}
<h4>Risk and return</h4>
<p>Required return = <b>risk-free rate</b> (Treasuries) + <b>risk premium</b>. Investors are risk-averse, so more risk demands more return.</p>
<ul><li><b>Business risk</b>: the economy or market hurts the property's income.</li><li><b>Financial risk</b>: using debt raises the chance of default.</li><li><b>Purchasing power (inflation) risk</b>: inflation erodes real cash flows.</li><li><b>Liquidity risk</b>: you can't sell quickly at market value.</li></ul>
<p><i>Ex ante</i> = forward-looking expected return. <i>Ex post</i> = what actually happened.</p>`,

pay:`
<p>A mortgage payment is just an annuity solved for the payment: the loan amount is the present value of all the payments.</p>
${fc('Mortgage payment','A = PV × i / [1 − 1/(1 + i)<sup>n</sup>]<br><span class="muted">monthly: use i/12 and n×12</span>','PV = loan amount · i = rate per period · n = number of payments','Any fully amortizing fixed-rate loan.','Fixed rate, equal payments, paid off to zero.','Using the annual rate with monthly payments; computing the annual payment and dividing by 12 (that gives the wrong answer).')}
<h4>Three loan structures</h4>
<ul><li><b>Interest-only</b>: payment = loan × rate. The full principal is due as a balloon at maturity. Lowest payment, most total interest.</li><li><b>Fully amortizing</b>: each payment covers interest plus some principal; the balance reaches 0. Interest falls and principal rises with every payment.</li><li><b>Partially amortizing (balloon)</b>: amortized over a long schedule but due sooner, so a balloon pays off the rest.</li></ul>
<h4>Building an amortization schedule</h4>
<ol><li>Interest = beginning balance × rate per period</li><li>Principal = payment − interest</li><li>Ending balance = beginning balance − principal</li></ol>
${ex('$100,000, 10%, 10 years (from your notes)',`<p>Annual payments: <b>$16,274.54</b>. Year 1 interest = $10,000, principal = $6,274.54. Total interest over the loan = $62,745.40.<br>Monthly payments: <b>$1,321.51</b>; month 1 interest = $100,000 × 0.10/12 = $833.33.</p><p>Why isn't 12 × $1,321.51 = $16,274.54? Monthly payments retire principal sooner, so less interest builds up: 12 × 1,321.51 = $15,858.12.</p>`)}
<p><b>Maximum loan</b> from an affordable payment = PVA of that payment (solve PV on the TI-84).</p>`,

bal:`
<p>The single most useful rule in Chapter 18:</p>
<p class="rule">The balance on a loan at any time = the present value of the payments still left, discounted at the contract rate.</p>
${fc('Outstanding balance after k payments','Bal<sub>k</sub> = A × [1 − 1/(1 + i/m)<sup>nm − k</sup>] / (i/m)','A = monthly payment · i/m = monthly rate · nm − k = payments remaining','Prepayment, refinancing, or finding principal and interest in a given month or year.','No missed or extra payments.','Using payments made instead of payments remaining; using the original loan amount.')}
${flag('Your notes label this formula "Future value of an annuity," but the method they describe (and the answer $125,841.83) is the <b>present value of the remaining payments</b>. Use the PV version.')}
<ul><li><b>Interest in payment k+1</b> = Bal<sub>k</sub> × i/12. Principal = payment − interest.</li><li><b>Principal repaid in year y</b> = balance at start of the year − balance at end.</li><li><b>Interest paid in year y</b> = 12 × payment − principal repaid that year.</li></ul>
${ex('$133,000, 30 years, 7.5% (from your notes)',`<p>Payment = $929.96. Balance after 60 payments = PV of 300 remaining = <b>$125,841.83</b>. After 72 = $124,060.02.<br>Principal in year 6 = $1,781.81. Interest in year 6 = $11,159.52 − $1,781.81 = <b>$9,377.71</b>.<br>Interest in payment 61 = $125,841.83 × 0.075/12 = $786.51; principal = $143.45.</p><div class="keys"><span class="keys-h">TI-84</span>TVM Solver: N=360, I%=7.5, PV=133000, FV=0, P/Y=12 → solve PMT.<br>Then <code>bal(60)</code> → balance. <code>ΣPrn(61,72)</code> → principal in year 6. <code>ΣInt(61,72)</code> → interest in year 6. (All in APPS → Finance; results show as negative.)</div>`)}`,

refi:`
<p>Refinancing replaces the old loan's <b>current balance</b> with a new loan at a new rate. You can take the benefit two ways.</p>
<ol><li><b>Lower payment</b>: new PMT on the balance at the new rate over the remaining term.</li><li><b>Shorter term</b>: keep the old payment, solve for N at the new rate.</li></ol>
${ex('from your notes',`<p>Balance at month 60 = $125,841.83; new rate 6%; 300 months left.<br>Option 1: new payment = <b>$810.80</b>, saving $119.16 a month ($35,748 over 300 months).<br>Option 2: keep paying $929.96 → N = 226.34, so 227 payments, <b>73 months</b> sooner.</p><div class="keys"><span class="keys-h">TI-84</span>Option 1: N=300, I%=6, PV=125841.83, FV=0, P/Y=12 → solve PMT<br>Option 2: I%=6, PV=125841.83, PMT=−929.96, FV=0 → solve N</div>`)}
<p><b>Common mistakes:</b> refinancing the original loan amount instead of the current balance; using 360 months instead of the remaining term; forgetting that real decisions also count refinancing costs (the textbook examples leave them out).</p>`,

points:`
<p>Lenders charge <b>discount points</b> (to buy a lower rate) and <b>origination fees</b> (to cover costs). Each point = 1% of the loan, paid up front. Either way the borrower receives less cash but pays as if they borrowed the full amount, so the true cost is higher than the contract rate.</p>
${fc('Effective interest rate (IRR of the loan)','Net proceeds = PV of payments (+ PV of balance if prepaid)','Net proceeds = loan × (1 − points) · payment is on the <i>full</i> loan at the contract rate','Comparing loans with different rate/point combinations.','Rate is annualized as monthly IRR × 12.','Computing the payment on the net proceeds; forgetting the payoff balance when the loan is prepaid.')}
<ul><li>No points or fees → effective rate = contract rate.</li><li>The <b>sooner</b> you prepay, the <b>higher</b> the effective rate, because the up-front cost is spread over fewer months.</li><li>Points make sense for borrowers who keep the loan a long time.</li></ul>
${ex('Spider Savings (from your notes)',`<p>7.25% with 3 points. Held to maturity the effective rate is only a little above 7.25%. Prepaid early, it rises to about <b>8.125%</b>, worse than First Bank's 7.5% with no points.</p><div class="keys"><span class="keys-h">TI-84</span>Held to maturity: N=360, PV=net proceeds, PMT=−payment, FV=0, P/Y=12 → solve I%<br>Prepaid at month k: N=k, PV=net proceeds, PMT=−payment, FV=−balance at k → solve I%</div>`)}`,

arm:`
<p>Alternatives to the fixed-rate mortgage shift some interest rate risk to the borrower in exchange for a lower starting rate.</p>
<h4>Two-step mortgage</h4>
<p>A fixed rate for an initial period (often 5–7 years), then <b>one</b> reset to index (e.g., 10-year Treasury) + margin, sometimes capped. Good for borrowers who expect to move or refinance before the reset.</p>
<h4>Adjustable-rate mortgage (ARM)</h4>
<ul><li>Contract rate = <b>index + margin</b> (often the 1-year T-bill), adjusted periodically (usually yearly).</li><li><b>Teaser</b>: a discount off the first-year rate.</li><li><b>Annual cap</b>: limits how much the rate changes at each adjustment (often both up and down).</li><li><b>Lifetime cap</b>: limits the total change from the initial rate.</li></ul>
<h4>Method at every adjustment</h4>
<ol><li>Find the balance at the old rate (PV of remaining payments, or <code>bal(</code>).</li><li>Find the new rate: index + margin, then apply caps.</li><li>New payment = PMT on that balance at the new rate over the <b>remaining</b> months.</li></ol>
${ex('study exercise 6',`<p>$335,000, 30-year two-step at 5.5%, resets after year 5 to T-bond + 2%, capped at 5 points above the initial rate. T-bond = 7.5%.<br>Initial payment = $1,902.09. Balance after 60 payments = $309,743.02.<br>New rate = 7.5 + 2 = 9.5% (below the 10.5% cap). New payment for 300 months = <b>$2,706.21</b>.</p>`)}
${flag('Your notes don\'t show the ARM table from study exercise 7, so whether the lifetime cap is measured from the teaser rate or the fully indexed rate is unconfirmed. This guide measures it from the initial (year-1) contract rate, the usual textbook approach. Check your slides.')}`,

uw:`
<p>Underwriting asks two things: can the <b>borrower</b> repay, and is the <b>property</b> good collateral? Lenders follow Fannie Mae and Freddie Mac guidelines in three areas: LTV, down payment source and income ratios.</p>
${fc('Mortgage debt ratio (front-end)','MDR = (P&I + taxes + insurance) / gross monthly income','All monthly. Taxes and insurance are usually given per year, so divide by 12.','Residential qualifying. Conventional limit ≈ <b>28%</b>.','Uses gross (pre-tax) income.','Leaving out taxes and insurance; mixing annual and monthly numbers.')}
${fc('Total debt ratio (back-end)','TDR = (housing payment + other monthly debts) / gross monthly income','Other debts: car, cards, student loans','Conventional limit ≈ <b>36%</b>. FHA and VA allow higher ratios.','','Putting the car loan in the MDR (it only goes in the TDR).')}
${fc('Loan-to-value','LTV = loan / property value','Value = lesser of price or appraisal','Above 80% → PMI or FHA/VA. Conventional max ≈ 95–96.5%. VA up to 100%. Commercial ≈ 70%.','','Using the down payment instead of the loan.')}
${fc('Debt coverage ratio (commercial)','DCR = NOI / annual debt service','NOI = income after operating expenses (before debt) · DS = 12 × monthly payment','Commercial loans. Lenders typically require <b>≥ 1.20</b>.','','Comparing annual NOI with a monthly payment.')}
${ex('study exercise 18',`<p>Income $48,000 → $4,000/month. Housing = $1,040 + $1,200/12 = $1,140 → MDR = <b>28.5%</b> (over 28%). TDR = ($1,140 + $260)/$4,000 = <b>35%</b> (under 36%). She fails the conventional front-end ratio but would likely qualify FHA, which allows higher ratios.</p>`)}
${flag('Your notes say FHA/VA allow "higher" ratios but give no exact numbers. If the exam asks for specific FHA limits, check your slides.')}
<p><b>Down payment rules:</b> conventional loans over 80% LTV need at least 5% from the borrower's own funds. Gifts need a gift letter. FHA seller contributions over 6% count as an inducement and reduce the loan. Under ECOA, lenders decide within <b>30 days</b>.</p>`,

fin:`
<h4>How a mortgage works</h4>
<ul><li><b>Promissory note</b> = the promise to pay; makes the borrower personally liable. <b>Mortgage / deed of trust</b> = the security instrument pledging the property.</li><li><b>Title theory</b>: the lender holds title until payoff. <b>Lien theory</b>: the borrower holds title; the lender has a lien and must foreclose.</li><li>Note clauses: <b>prepayment</b> (pay early without penalty), <b>acceleration</b> (whole balance due on default), <b>due-on-sale</b> (whole balance due if sold).</li></ul>
<h4>Foreclosure</h4>
<ul><li><b>Judicial</b>: through the courts (lien-theory states). <b>Nonjudicial</b>: uses a power-of-sale clause and is faster. <b>Strict</b>: the lender simply takes title.</li><li><b>Deficiency judgment</b>: the borrower owes the shortfall if the sale doesn't cover the debt (not allowed in every state).</li><li><b>Deed of trust</b>: three parties (borrower, lender, trustee); the trustee can sell on default. <b>Deed in lieu</b>: the borrower hands the property back voluntarily.</li></ul>
<h4>Housing finance system</h4>
<table class="tbl"><tr><th>Entity</th><th>Role</th></tr>
<tr><td>FHA</td><td><b>Insures</b> loans; low down payments; up-front + annual premiums</td></tr>
<tr><td>VA</td><td><b>Guarantees</b> loans for veterans; up to 100% LTV</td></tr>
<tr><td>PMI</td><td>Private insurance on conventional loans over 80% LTV</td></tr>
<tr><td>Fannie Mae</td><td>Created to buy FHA loans; private GSE since 1968; buys loans and issues MBS; conservatorship in 2008</td></tr>
<tr><td>Ginnie Mae</td><td>1968, part of HUD; <b>guarantees</b> MBS backed by FHA/VA loans with full federal backing</td></tr>
<tr><td>Freddie Mac</td><td>1970; secondary market for <b>conventional</b> loans</td></tr></table>
<p><b>Originators:</b> mortgage bankers (borrow from banks, originate about half of loans, sell them and keep servicing), mortgage brokers (match borrowers and lenders, no own funds), commercial banks, savings institutions (thrifts), credit unions.</p>
<h4>Federal laws</h4>
<table class="tbl"><tr><th>Law</th><th>Remember</th></tr>
<tr><td>ECOA</td><td>No discrimination by race, color, religion, national origin, sex, marital status, age, public assistance; decision within 30 days</td></tr>
<tr><td>Truth-in-Lending</td><td>Disclose the APR and finance charges within 3 business days</td></tr>
<tr><td>RESPA</td><td>Settlement cost estimate within 3 business days; no kickbacks; right to see the closing statement; escrow limits</td></tr>
<tr><td>Flood Disaster Protection Act</td><td>Flood insurance required in flood hazard zones (NFIP)</td></tr>
<tr><td>FCRA</td><td>Accurate credit data; permission to pull credit; tell the applicant if the report caused a denial</td></tr>
<tr><td>Dodd-Frank</td><td>Post-2008; created the CFPB</td></tr></table>
<h4>Commercial capital</h4>
<p>Individual investors, life insurance companies and pension funds (long horizons), REITs (equity REITs most common; mortgage REITs about 20%), commercial banks (community under $500M, regional, money center; prefer short-term loans), CMBS, and TIF (future tax increases repay redevelopment).</p>
${flag('Your notes say REITs must distribute 95% of taxable income. Current U.S. law requires 90%. Go with whatever your textbook or professor says.')}`,

inc:`
<p>The <b>income approach</b> values a property by what it will earn. It rests on the <b>principle of anticipation</b>: buyers pay today for the cash flows and resale they expect in the future. Use it for income-producing property such as apartment complexes, office buildings and shopping malls.</p>
<p class="rule">Two steps: (1) estimate the property's future income, then (2) convert that income into a present value.</p>
<h4>From rent roll to NOI</h4>
<table class="tbl"><tr><th>Line</th><th>What it means</th></tr>
<tr><td>Potential gross income (PGI)</td><td>All rent if 100% leased at market rent</td></tr>
<tr><td>− Vacancy &amp; collection loss</td><td>Empty units and tenants who don't pay</td></tr>
<tr><td>+ Other income</td><td>Parking, laundry, fees</td></tr>
<tr><td>= Effective gross income (EGI)</td><td>What the property actually collects</td></tr>
<tr><td>− Operating expenses</td><td>Taxes, insurance, utilities, maintenance, management</td></tr>
<tr><td>= <b>Net operating income (NOI)</b></td><td>Income before any mortgage payments</td></tr></table>
<p><b>Never subtract debt service</b> (mortgage payments) to get NOI. The property's value doesn't depend on how the buyer finances it. Debt service is what the DCR in Chapter 16 compares NOI against.</p>
<h4>The three techniques (from the unit review)</h4>
${fc('1. Gross income multiplier (GIM)','GIM = sale price ÷ gross income &nbsp;→&nbsp; Value = GIM × subject gross income','Price and gross income from comparable sales','Quick valuation when comparable properties have <b>similar expenses</b>.','Expense and vacancy ratios are about the same across the comps.','Using it when expenses differ a lot; mixing monthly and annual income; dividing instead of multiplying for the subject.')}
${fc('2. Net income (direct) capitalization','R = NOI ÷ price (from comps) &nbsp;→&nbsp; Value = NOI ÷ R','R = capitalization rate (as a decimal) · NOI = one year of net operating income','Income property with stable income. Uses <b>net</b> income and a <b>rate</b>, not gross income and a multiplier.','The next year\'s NOI is representative and the comps have similar risk.','Using gross income; subtracting debt service; dividing by 9 instead of 0.09; multiplying NOI by R.')}
<p><b>3. Discounted cash flow (DCF):</b> forecast each year's cash flow and the resale price, then discount them to present value with the Chapter 17 tools. On the TI-84 this is <code>npv(</code>.</p>
${ex('your notes',`<p><b>GIM:</b> a property with $100,000 gross income sold for $1,000,000, so GIM = 10. A property with $9,000 gross income is worth about 10 × $9,000 = <b>$90,000</b>.</p><p><b>Cap rate:</b> a $1,000,000 property with $100,000 NOI gives R = 10%. A property expected to earn $105,000 NOI is worth $105,000 ÷ 0.10 = <b>$1,050,000</b>.</p>`)}
<h4>How value moves</h4>
<ul><li>Higher cap rate → <b>lower</b> value. Lower cap rate → higher value. (V = NOI ÷ R)</li><li>NOI up 5% at the same cap rate → value up 5%.</li><li>Riskier property → investors demand a higher return → higher cap rate → lower value (the Chapter 17 risk-return link).</li><li>Memory aid: <b>I = R × V</b> (Income = Rate × Value). Cover the one you need.</li></ul>
<h4>Where it fits</h4>
<p>It is one of the three approaches applied in step 4 of the appraisal process. In reconciliation it gets the most weight for investment property. A church leans on the cost approach, and a typical home on sales comparison.</p>
${flag('The GIM and cap-rate formulas in your notes were images that did not export. These are the standard forms and match your notes\' worked examples ($90,000 and $1,050,000). The EGI/NOI line items are standard textbook terms. Your notes only say NOI is "net income, not gross income," so check your slides if the exam asks about specific expense items.')}`,

apm:`
<p class="muted">GIM and cap-rate valuation now have their own topic: <b>Income approach</b>.</p>
<p>Appraisers estimate value three ways, then reconcile them.</p>
${fc('Cost approach','Value = site value + (replacement cost − accrued depreciation)','Site value from comparable land sales · depreciation = physical + functional + economic','New or special-purpose buildings (a church) where sales data is thin.','A buyer could build a substitute.','Depreciating the land (land doesn\'t depreciate); forgetting to add the site.')}
${flag('Your notes\' cost approach example says $150,000 + $567,500 = $718,000. The arithmetic gives <b>$717,500</b>. The $718,000 is probably rounded. Check the textbook.')}
${fc('Age-life depreciation','Depreciation % = effective age / total economic life','e.g., 15 / 60 = 25%','Estimating physical deterioration.','','Using remaining life instead of age.')}
${fc('Gross income multiplier','GIM = sale price / gross income &nbsp;→&nbsp; Value = GIM × gross income','From comparable sales','Quick income valuation when expenses are similar across properties.','Similar expense ratios.','Mixing monthly and annual income.')}
${fc('Direct capitalization','Value = NOI / R &nbsp;&nbsp; (R = NOI / price from comps)','NOI = gross income − vacancy & collection loss − operating expenses','Income-producing property.','Stable income.','Subtracting mortgage payments to get NOI; using 9 instead of 0.09.')}
${ex('your notes',`<p>GIM: $1,000,000 / $100,000 = 10 → a property with $9,000 gross income ≈ $90,000.<br>Cap rate: $100,000 / $1,000,000 = 10% → $105,000 NOI / 0.10 = <b>$1,050,000</b>.<br>Sales comparison lot: 9,600 sq ft × adjusted $2.95/sq ft = <b>$28,320</b>.</p>`)}
<p><b>Sales comparison adjustments:</b> always adjust the <i>comparable</i> toward the subject. Comp better than the subject → subtract. Comp worse → add. Work in price per sq ft for lots.</p>`,

apc:`
<h4>Regulation</h4>
<p><b>FIRREA (1989)</b>, after the S&amp;L crisis: federally related transactions need state-licensed or certified appraisers. The <b>Appraisal Foundation</b> (1987) runs the <b>AQB</b> (qualifications) and the <b>ASB</b> (writes <b>USPAP</b>: 15-hour course, 7-hour update every 2 years).</p>
<table class="tbl"><tr><th>Level</th><th>May appraise</th><th>Experience</th></tr>
<tr><td>Trainee</td><td>Under supervision</td><td>None (75 hrs education)</td></tr>
<tr><td>Licensed residential</td><td>1–4 units: non-complex under $1M, complex under $250K</td><td>2,000 hrs</td></tr>
<tr><td>Certified residential</td><td>1–4 units, any value</td><td>2,500 hrs</td></tr>
<tr><td>Certified general</td><td>Any property</td><td>3,000 hrs (1,500 non-residential)</td></tr></table>
<h4>Kinds of value</h4>
<ul><li><b>Market value</b>: most probable price in an open, competitive market (typical motivation, informed parties, reasonable exposure, cash-equivalent terms, no special concessions).</li><li><b>Investment value</b>: worth to one specific investor. <b>Price</b>: what was actually paid. <b>Assessed value</b>: for taxes. <b>Insurable value</b>: the destructible part only, so no land.</li></ul>
<h4>Four principles</h4>
<ul><li><b>Anticipation</b>: value = expected future benefits.</li><li><b>Change</b>: markets move, so values are date-specific.</li><li><b>Substitution</b>: no one pays more than an equal substitute costs (basis of all three approaches).</li><li><b>Contribution</b>: a feature is worth what it adds, not what it cost.</li></ul>
<h4>The appraisal process (in order)</h4>
<ol><li>Define the problem (type of value, property, rights, purpose, effective date)</li><li>Select and collect data</li><li>Highest and best use: legally permissible, physically possible, financially feasible, maximally productive</li><li>Apply the three approaches</li><li>Reconcile (a weighted judgment, not a simple average)</li><li>Report (URAR form for homes, narrative for complex properties)</li></ol>
<h4>Sales comparison</h4>
<p>3–6 recent arm's-length comps. Six elements of comparison: <b>property rights, conditions of sale, financing terms, market conditions, location, physical characteristics</b>.</p>
<h4>Cost approach details</h4>
<p><b>Reproduction</b> = exact replica; <b>replacement</b> = equal utility with modern materials (usually used). Cost methods: comparative-unit ($/sq ft), segregated-cost (by component), quantity-survey (every material, most accurate). Depreciation: <b>physical deterioration</b> (curable or incurable), <b>functional obsolescence</b> (bad design; curable or incurable), <b>economic obsolescence</b> (external; usually incurable).</p>`,

k:`
<h4>Valid contract checklist</h4>
<ol><li>Offer</li><li>Acceptance (must <b>mirror</b> the offer; any change makes it a <b>counteroffer</b> and the roles switch)</li><li>Consideration (each side gives up something; can be "love and affection")</li><li>Parties with capacity (minors and the mentally incompetent can void it)</li><li>Lawful purpose</li><li><b>Real estate only:</b> in writing (Statute of Frauds), with an adequate property description</li></ol>
<p>Exception to the writing rule: <b>partial performance</b> that shows the parties' intent.</p>
<h4>Breach and remedies</h4>
<p>A buyer can sue for <b>specific performance</b> (every property is unique), damages, or the return of earnest money. A seller rarely gets specific performance (buyers aren't unique) but usually keeps the earnest money and may seek damages.</p>
<h4>Contingencies</h4>
<p><b>Financing</b> (cancel if no loan in time; the buyer must try in good faith), <b>title</b> (cancel if title defects can't be cured), <b>inspection and repair</b> (the seller repairs up to a limit, or the buyer can cancel). Unconscionable conditions are unenforceable.</p>
<h4>Other contracts</h4>
<ul><li><b>Option to buy</b>: the optionee may buy but doesn't have to; the optionor must sell if exercised; the fee is nonrefundable.</li><li><b>Contract for deed</b> (land contract): the seller keeps legal title; the buyer is the equitable owner and pays taxes and maintenance; title passes after the final payment.</li></ul>
<h4>Before closing</h4>
<table class="tbl"><tr><th>Buyer</th><th>Seller</th></tr><tr><td>Get financing, examine title, survey, insurance binder, inspect, check zoning and leases</td><td>Prepare the deed, remove encumbrances (tax liens), pay off or arrange assumption of the loan (certificate of satisfaction), cooperate with inspectors, turn over leases</td></tr></table>
<h4>Closing costs</h4>
<table class="tbl"><tr><th>Buyer (paid in cash, ~2–6% of loan)</th><th>Seller (deducted from proceeds)</th></tr><tr><td>Origination fee (1–3%), discount points, appraisal, credit report, lender inspection, mortgage insurance, attorney, hazard insurance, recording the mortgage</td><td>Brokerage commission, attorney (deed), documentary stamp tax, recording the satisfaction of the old mortgage</td></tr></table>
<p><b>Prorations:</b> taxes, insurance, assumed-loan payments, service contracts, rents and heating oil are split by days of ownership. <b>Escrow closing:</b> a neutral agent holds the deed and the money; the parties needn't be present. <b>Sales contract essentials:</b> property description, price and payment terms, escrow arrangement, what happens if improvements are destroyed, closing date. "Time is of the essence" means deadlines are strict.</p>
<h4>Negotiation</h4><p>Not zero-sum: enlarge the pie with terms ("you name the price, I'll name the terms"), find common ground early, understand what the other side needs.</p>`,

brk:`
<h4>Sales process (5 steps)</h4><p>Listing → marketing and qualifying buyers → presentation and negotiation → contract → closing.</p>
<h4>Listing agreements (seller ↔ broker)</h4>
<table class="tbl"><tr><th>Type</th><th>Who gets paid</th></tr>
<tr><td>Open</td><td>Only the broker who brings the buyer; owner can sell commission-free; many brokers allowed</td></tr>
<tr><td>Exclusive-agency (exclusive-brokerage)</td><td>One broker; paid unless the <b>owner</b> sells it</td></tr>
<tr><td>Exclusive-right-to-sell</td><td>The broker is paid <b>no matter who</b> sells it (brokers' favorite)</td></tr>
<tr><td>Net</td><td>The broker keeps everything above the seller's amount. Illegal in many states (fraud incentive)</td></tr>
<tr><td>Limited-service</td><td>MLS entry and minimal service, lower fee</td></tr></table>
<p><b>Buyer representation:</b> exclusive-right-to-represent (paid whenever the buyer buys) vs. open (paid only for properties the broker found).</p>
<h4>Agency</h4>
<ul><li>Principal = client; agent = broker; the sales associate is the broker's agent and the client's <b>subagent</b>.</li><li>Fiduciary duties: <b>good faith, diligence, confidentiality</b> (continues after the agency ends), <b>loyalty</b>. The principal owes compensation.</li><li>Even a seller's agent must be honest with buyers and disclose material defects (e.g., flooding).</li><li><b>Fraud</b> = intentional falsehood. <b>Misrepresentation</b> = false statement even without intent.</li><li><b>Dual agent</b>: represents both sides (illegal in some states). <b>Transaction broker</b>: limited help to both, advocate for neither.</li><li>Disclose the agency relationship at first substantive contact.</li></ul>
<h4>Fair housing</h4><p>Protected: <b>sex, race, color, religion, national origin, disability, familial status</b>. Illegal: <b>steering</b> (guiding buyers by protected class) and <b>blockbusting</b> (scare tactics). Laws: Civil Rights Act of 1866; Fair Housing Act (enforced by HUD). Penalties up to $52,596 (first) / $105,194 (repeat within 7 years).</p>
<h4>Seven ways an agency ends</h4><ol><li>Transaction occurs</li><li>Term expires (no date given: "reasonable time," about 3 months residential, 6 commercial)</li><li>Mutual agreement</li><li>Breach by either party</li><li>Incapacity (death, insanity)</li><li>Destruction of the property</li><li>Eminent domain (no commission)</li></ol>
<h4>Compensation</h4><p>Commission is a % of price, paid at closing, negotiated individually (brokers agreeing on rates = antitrust violation). MLS splits, e.g., 6% split 50-50 = 3% each. Associates get a share of their broker's portion, rising with production. Desk-fee offices: keep about 100% for a monthly fee. Recovery funds and bonds cover uncollectible judgments. License required to collect any commission.</p>`,
};

const FORMULAS=[
 ['FV of a lump sum','One amount today → future','FV = PV(1 + i)<sup>n</sup>'],
 ['PV of a lump sum','One future amount → today','PV = FV / (1 + i)<sup>n</sup>'],
 ['Monthly compounding','Rate and periods per year m','FV = PV(1 + i/m)<sup>n·m</sup>'],
 ['PV of an annuity','Equal payments → today','PVA = A[1 − 1/(1+i)<sup>n</sup>] / i'],
 ['FV of an annuity','Equal deposits → future','FVA = A[(1+i)<sup>n</sup> − 1] / i'],
 ['Sinking fund payment','Deposit needed to reach a target','A = FVA × i / [(1+i)<sup>n</sup> − 1]'],
 ['Mortgage payment','Loan → equal payment','A = PV × i / [1 − 1/(1+i)<sup>n</sup>]'],
 ['Loan balance','Balance after k payments','PV of the nm − k remaining payments'],
 ['Interest in next payment','Payment k+1','Bal<sub>k</sub> × i/12'],
 ['Principal in a year','Year y','Bal<sub>start</sub> − Bal<sub>end</sub>'],
 ['NPV','Accept if > 0','−CF<sub>0</sub> + Σ CF<sub>t</sub>/(1+r)<sup>t</sup>'],
 ['IRR','Accept if ≥ required','Rate where NPV = 0'],
 ['Required return','Risk and return','Risk-free rate + risk premium'],
 ['Effective rate','Loan with points','Rate where net proceeds = PV of payments (+ balance)'],
 ['Net proceeds','After points','Loan × (1 − points%)'],
 ['ARM rate','Each adjustment','Index + margin, limited by annual and lifetime caps'],
 ['MDR (front-end)','≤ 28%','(P&I + taxes + insurance) / gross monthly income'],
 ['TDR (back-end)','≤ 36%','(housing + other debts) / gross monthly income'],
 ['LTV','> 80% needs PMI','Loan / value'],
 ['DCR','≥ 1.20 commercial','NOI / annual debt service'],
 ['Cost approach','Value','Site + (replacement cost − depreciation)'],
 ['Age-life depreciation','Physical deterioration','Effective age / economic life × cost'],
 ['GIM','Value from gross income','Price / gross income; V = GIM × GI'],
 ['Cap rate','Value from NOI','R = NOI / V; V = NOI / R'],
 ['NOI','Before debt','Gross income − vacancy − operating expenses'],
];
