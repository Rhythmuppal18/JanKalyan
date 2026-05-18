/* ============================================================
   SERVICE.JS — Essential Services & Employment Schemes Data
   आवश्यक सेवाएं और रोजगार योजनाओं का डेटा
   
   PURPOSE: Store all essential services schemes
   मकसद: सभी आवश्यक सेवा योजनाओं को store करना
   
   CATEGORIES:
   - Employment & Income (रोजगार और आय)
   - Food Security (खाद्य सुरक्षा)
   - Clean Cooking (स्वच्छ खाना पकाने)
   - Electricity (बिजली)
   - Water & Sanitation (पानी और स्वच्छता)
   - Social Security (सामाजिक सुरक्षा)
   - Agriculture Support (कृषि सहायता)
   
   EACH SCHEME HAS:
   - title: Official scheme name
   - tag: Category/type
   - description: What the scheme provides
   - benefit: Benefits or amount given
   - ministry: Government ministry running it
   - eligibility: Who can apply
   - income: Income limit (if applicable)
   - documents: Required documents
   - howToApply: Application process
   - applyLink: Official website
   
   THESE SCHEMES HELP WITH:
   - Employment opportunities (काम की सुविधा)
   - Free utilities (मुफ्त सुविधाएं)
   - Income support (आय सहायता)
   - Food subsidies (खाद्य सब्सिडी)
   - Pension benefits (पेंशन)
   ============================================================ */

// सभी सेवा योजनाएं इस array में हैं
let serviceSchemes = [
  {
    title: "Mahatma Gandhi NREGA (MGNREGS)",
    tag: "Employment",
    description: "Guarantees 100 days of wage employment per financial year to adult members of rural households who demand unskilled manual work.",
    benefit: "100 days employment/year",
    ministry: "Ministry of Rural Development",
    eligibility: "Any adult member of a rural household willing to do unskilled manual work. Must have a Job Card issued by Gram Panchayat.",
    income: "All rural households",
    documents: ["Aadhaar Card", "Job Card (from Gram Panchayat)", "Bank passbook", "Ration Card"],
    howToApply: "Apply for Job Card at Gram Panchayat. After receiving Job Card, submit written application for work. Work to be provided within 15 days.",
    applyLink: "https://nrega.nic.in"
  },
  {
    title: "National Food Security Act – Ration Card",
    tag: "Food Security",
    description: "Provides subsidised food grains (5 kg/month) to up to 75% of rural and 50% of urban population through the Public Distribution System.",
    benefit: "5 kg grain/month at ₹2-3",
    ministry: "Ministry of Consumer Affairs, Food & Public Distribution",
    eligibility: "Households identified under NFSA – Priority Households (PHH) and Antyodaya Anna Yojana (AAY) families.",
    income: "Below Poverty Line / Low income",
    documents: ["Aadhaar Card", "Family photograph", "Proof of residence", "Income certificate (if applicable)"],
    howToApply: "Apply at District Food & Civil Supplies Office or online through state government portal. Required documents verified by local authority.",
    applyLink: "https://dfpd.gov.in"
  },
  {
    title: "Pradhan Mantri Ujjwala Yojana (PMUY)",
    tag: "Clean Cooking",
    description: "Provides free LPG connections to women from Below Poverty Line households to replace unclean cooking fuels and reduce household air pollution.",
    benefit: "Free LPG connection",
    ministry: "Ministry of Petroleum & Natural Gas",
    eligibility: "Women members of BPL households aged 18+ not already having an LPG connection. SECC 2011 beneficiaries given priority.",
    income: "Below Poverty Line",
    documents: ["Aadhaar Card", "BPL/Ration Card", "Bank passbook", "Passport-size photograph"],
    howToApply: "Apply at nearest LPG distributorship or online at pmuy.gov.in. Fill KYC form and submit with required documents.",
    applyLink: "https://pmuy.gov.in"
  },
  {
    title: "Saubhagya – Household Electrification",
    tag: "Electricity",
    description: "Provides free electricity connections to all un-electrified households in rural areas and poor households in urban areas.",
    benefit: "Free electricity connection",
    ministry: "Ministry of Power",
    eligibility: "All unelectrified rural households and urban BPL households without electricity connection.",
    income: "BPL (urban) / All rural unelectrified",
    documents: ["Aadhaar Card", "BPL card (for urban)", "Proof of residence", "Photograph"],
    howToApply: "Contact local electricity distribution company (DISCOM) or register at saubhagya.gov.in. Camps organized at village level for rural areas.",
    applyLink: "https://saubhagya.gov.in"
  },
  {
    title: "Jal Jeevan Mission",
    tag: "Clean Water",
    description: "Aims to provide safe and adequate drinking water through household tap connections (Har Ghar Jal) to every rural household.",
    benefit: "Piped water connection",
    ministry: "Ministry of Jal Shakti",
    eligibility: "All rural households in India without a functional household tap connection. Implementation by state/UT governments.",
    income: "All rural households",
    documents: ["Aadhaar Card", "Proof of residence", "Land/house ownership proof"],
    howToApply: "No individual application needed. Implementation is demand-driven through Gram Panchayat / Village Water & Sanitation Committee. Contact local Panchayat.",
    applyLink: "https://jaljeevanmission.gov.in"
  },
  {
    title: "PM Kisan Samman Nidhi (PM-KISAN)",
    tag: "Agriculture",
    description: "Provides income support of ₹6,000 per year in three equal instalments of ₹2,000 every four months to all land-holding farmer families.",
    benefit: "₹6,000/year to farmers",
    ministry: "Ministry of Agriculture & Farmers' Welfare",
    eligibility: "All landholding farmer families with cultivable land. Excludes institutional landholders, constitutional post holders, and income tax payers.",
    income: "All landholding farmers",
    documents: ["Aadhaar Card", "Land ownership documents (Khasra/Khatauni)", "Bank passbook", "Mobile number"],
    howToApply: "Register at pmkisan.gov.in or through nearest CSC (Common Service Centre). Self-registration available online with Aadhaar and land records.",
    applyLink: "https://pmkisan.gov.in"
  },
  {
    title: "Atal Pension Yojana (APY)",
    tag: "Social Security",
    description: "Government-backed pension scheme for unorganised sector workers providing guaranteed monthly pension of ₹1,000–₹5,000/month after age 60.",
    benefit: "₹1,000–₹5,000/month pension",
    ministry: "Ministry of Finance (PFRDA)",
    eligibility: "Indian citizens aged 18–40 with a savings bank account. Not covered under any statutory social security scheme.",
    income: "All income groups (non-tax payers)",
    documents: ["Aadhaar Card", "Savings bank account", "Mobile number linked to bank"],
    howToApply: "Visit your bank branch or apply through net banking / mobile banking. Fill APY subscription form with nominee details and auto-debit mandate.",
    applyLink: "https://npscra.nsdl.co.in/scheme-details.php"
  },
  {
    title: "PM Jeevan Jyoti Bima Yojana",
    tag: "Life Insurance",
    description: "Life insurance scheme with annual premium of only ₹436 offering coverage of ₹2 lakh for death due to any cause for persons aged 18–50.",
    benefit: "₹2 Lakh life cover",
    ministry: "Ministry of Finance",
    eligibility: "Indian citizens aged 18–50 with a savings bank account and Aadhaar linked. Annual renewal required.",
    income: "All income groups",
    documents: ["Aadhaar Card", "Savings bank account", "Mobile number"],
    howToApply: "Enroll through your bank branch, internet banking, or mobile banking app. Premium auto-debited from bank account on 31st May each year.",
    applyLink: "https://financialservices.gov.in/insurance-divisions/Government-Sponsored-Socially-Oriented-Insurance-Schemes/Pradhan-Mantri-Jeevan-Jyoti-Bima-Yojana(PMJJBY)"
  }
];

function openModal(index) {
  const s = serviceSchemes[index];
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
  for (let i = 0; i < serviceSchemes.length; i++) {
    let s = serviceSchemes[i];
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
