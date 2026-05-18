
let housingSchemes = [
  {
    title: "Pradhan Mantri Awas Yojana – Gramin (PMAY-G)",
    tag: "Rural Housing",
    description: "Provides financial assistance to rural households to construct or enhance their houses. Beneficiaries receive ₹1.20 lakh in plains and ₹1.30 lakh in hilly regions.",
    benefit: "₹1.20–1.30 Lakh grant",
    ministry: "Ministry of Rural Development",
    eligibility: "Rural households without pucca house or living in kutcha/dilapidated structure as per SECC 2011 data. Priority to SC/ST, minorities, and disabled.",
    income: "Up to ₹15,000/month",
    documents: ["Aadhaar Card", "BPL/SECC card", "Land ownership/possession proof", "Bank passbook", "Job card (MGNREGS)"],
    howToApply: "Apply through Gram Panchayat or Block Development Officer. Beneficiaries selected from SECC 2011 data with Gram Sabha approval.",
    applyLink: "https://pmayg.nic.in"
  },
  {
    title: "Pradhan Mantri Awas Yojana – Urban (PMAY-U)",
    tag: "Urban Housing",
    description: "Provides affordable housing to urban poor including slum dwellers, EWS, LIG, and MIG categories through credit-linked subsidy and direct construction support.",
    benefit: "Up to ₹2.67 Lakh subsidy",
    ministry: "Ministry of Housing & Urban Affairs",
    eligibility: "Urban poor without pucca house. EWS (income < ₹3L), LIG (₹3–6L), MIG-I (₹6–12L), MIG-II (₹12–18L) categories.",
    income: "EWS < ₹3L | LIG ₹3–6L | MIG ₹6–18L",
    documents: ["Aadhaar Card", "Income certificate", "Property documents", "Bank statements", "Self-declaration of no pucca house"],
    howToApply: "Apply online at pmaymis.gov.in or through your urban local body / municipality. Also available via banks for CLSS component.",
    applyLink: "https://pmaymis.gov.in"
  },
  {
    title: "Credit Linked Subsidy Scheme (CLSS)",
    tag: "Home Loan",
    description: "Interest subsidy on home loans for EWS (up to ₹3L), LIG (₹3L–6L), MIG-I (₹6L–12L), and MIG-II (₹12L–18L) annual income categories.",
    benefit: "Interest subsidy 3–6.5%",
    ministry: "Ministry of Housing & Urban Affairs",
    eligibility: "First-time homebuyers in urban areas. EWS/LIG: subsidy on loan up to ₹6L at 6.5%. MIG-I: 4% on ₹9L. MIG-II: 3% on ₹12L.",
    income: "Up to ₹18 Lakh/year",
    documents: ["Aadhaar Card", "PAN Card", "Income proof", "Property documents", "Bank loan sanction letter"],
    howToApply: "Apply through Primary Lending Institutions (banks, HFCs) empanelled under PMAY. Subsidy credited directly to loan account.",
    applyLink: "https://pmaymis.gov.in"
  },
  {
    title: "Rajiv Awas Yojana (RAY)",
    tag: "Slum Rehabilitation",
    description: "Aims to make India slum-free by upgrading existing slums, relocating slums in untenable locations, and preventing new slum formation.",
    benefit: "Free/subsidised housing",
    ministry: "Ministry of Housing & Urban Affairs",
    eligibility: "Slum dwellers identified by State/ULB surveys. Priority to those in untenable locations or notified slums.",
    income: "BPL / Low-income slum residents",
    documents: ["Aadhaar Card", "Proof of slum residence", "Voter ID", "Photograph"],
    howToApply: "Contact your Municipal Corporation or Urban Local Body (ULB). Registration done through survey-based beneficiary identification.",
    applyLink: "https://mohua.gov.in"
  },
  {
    title: "Indira Awaas Yojana (IAY)",
    tag: "BPL Households",
    description: "Financial assistance to Below Poverty Line households in rural areas to construct new houses or upgrade existing kutcha/dilapidated structures.",
    benefit: "₹70,000–75,000 grant",
    ministry: "Ministry of Rural Development",
    eligibility: "BPL rural households with kutcha or dilapidated houses as per BPL list prepared by Gram Panchayat.",
    income: "Below Poverty Line",
    documents: ["BPL card", "Aadhaar Card", "Land possession certificate", "Bank passbook"],
    howToApply: "Apply through Gram Panchayat. Selection from BPL list approved by Gram Sabha. Funds transferred directly to beneficiary's bank.",
    applyLink: "https://pmayg.nic.in"
  },
  {
    title: "National Urban Livelihood Mission – Shelter",
    tag: "Urban Homeless",
    description: "Provides permanent shelters for urban homeless with basic amenities including water, sanitation, health, and skill development facilities.",
    benefit: "Free shelter facilities",
    ministry: "Ministry of Housing & Urban Affairs",
    eligibility: "Urban homeless individuals living on streets, footpaths, railway stations, etc. No ownership of any property required.",
    income: "Urban homeless (no income criteria)",
    documents: ["Any identity proof (Aadhaar/Voter ID)", "Self-declaration of homelessness"],
    howToApply: "Approach nearest Urban Local Body / Municipal Corporation or Night Shelter facility. Registration done by social workers or ULB officials.",
    applyLink: "https://nulm.gov.in"
  },
  {
    title: "PM SVANidhi – Street Vendor Loans",
    tag: "Micro-Enterprise",
    description: "Provides collateral-free working capital loans to street vendors to help restart their businesses with amounts from ₹10,000 to ₹50,000.",
    benefit: "Loans up to ₹50,000",
    ministry: "Ministry of Housing & Urban Affairs",
    eligibility: "Street vendors who were vending before 24th March 2020 with Certificate of Vending or Letter of Recommendation from ULB.",
    income: "Street vendors (no income limit)",
    documents: ["Aadhaar Card", "Certificate of Vending or LoR from ULB", "Bank account details", "Vendor registration"],
    howToApply: "Apply online at pmsvanidhi.mohua.gov.in or at any scheduled commercial bank, microfinance institution, or SHG bank branch.",
    applyLink: "https://pmsvanidhi.mohua.gov.in"
  },
  {
    title: "Housing for SC/ST Beneficiaries",
    tag: "SC/ST Welfare",
    description: "Special allocation within PMAY-G for Scheduled Castes and Scheduled Tribes to ensure equitable access to safe pucca housing with basic amenities.",
    benefit: "Priority allocation",
    ministry: "Ministry of Rural Development",
    eligibility: "SC/ST households without pucca house in rural areas. Selected from SECC 2011 data with mandatory SC/ST category inclusion.",
    income: "SECC 2011 identified households",
    documents: ["Aadhaar Card", "SC/ST caste certificate", "BPL/SECC card", "Land possession certificate", "Bank passbook"],
    howToApply: "Apply through Gram Panchayat. SC/ST beneficiaries are given priority in PMAY-G waitlists by Gram Sabha.",
    applyLink: "https://pmayg.nic.in"
  }
];

function openModal(index) {
  const s = housingSchemes[index];
  document.getElementById('modal-tag').textContent         = s.tag;
  document.getElementById('modal-title').textContent       = s.title;
  document.getElementById('modal-ministry').textContent    = s.ministry;
  document.getElementById('modal-benefit').textContent     = s.benefit;
  document.getElementById('modal-income').textContent      = s.income;
  document.getElementById('modal-eligibility').textContent = s.eligibility;
  document.getElementById('modal-how').textContent         = s.howToApply;
  document.getElementById('modal-apply-btn').href          = s.applyLink;
  document.getElementById('modal-docs').innerHTML = s.documents.map(d => '<li>' + d + '</li>').join('');
  document.getElementById('scheme-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('scheme-modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', function(e) {
  if (e.target.id === 'scheme-modal') closeModal();
});

function displaySchemes() {
  let grid = document.getElementById("schemesGrid");
  let html = "";
  for (let i = 0; i < housingSchemes.length; i++) {
    let s = housingSchemes[i];
    html += '<div class="scheme-card">';
    html += '<span class="scheme-tag">' + s.tag + '</span>';
    html += '<h3>' + s.title + '</h3>';
    html += '<p>' + s.description + '</p>';
    html += '<div class="scheme-meta">';
    html += '<span class="scheme-benefit">✓ ' + s.benefit + '</span>';
    html += '<span class="scheme-learn" onclick="openModal(' + i + ')" style="cursor:pointer;">Apply Now →</span>';
    html += '</div></div>';
  }
  grid.innerHTML = html;
}

displaySchemes();
