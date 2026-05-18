/* ============================================================
   HEALTH.JS — Health & Medical Schemes Data
   स्वास्थ्य और चिकित्सा योजनाओं का डेटा
   
   PURPOSE: Store all health-related government schemes
   मकसद: सभी स्वास्थ्य संबंधित योजनाओं को store करना
   
   CATEGORIES:
   - Health Insurance (स्वास्थ्य बीमा)
   - Maternal Health (माता और बाल स्वास्थ्य)
   - Immunization (टीकाकरण)
   - Mental Health (मानसिक स्वास्थ्य)
   - Free Treatment (मुफ्त इलाज)
   
   EACH SCHEME HAS:
   - title: Official scheme name
   - tag: Category/type
   - description: What the scheme offers
   - benefit: Health coverage or benefits
   - ministry: Government ministry in charge
   - eligibility: Who can avail this scheme
   - income: Income criteria (if any)
   - documents: Papers needed to apply
   - howToApply: Application process
   - applyLink: Official website
   ============================================================ */

// सभी स्वास्थ्य योजनाएं इस array में हैं
let healthSchemes = [
  {
    title: "Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (PMJAY)",
    tag: "Health Insurance",
    description: "World's largest health assurance scheme providing ₹5 lakh per family per year for secondary and tertiary hospitalisation at empanelled hospitals.",
    benefit: "₹5 Lakh/year health cover",
    ministry: "Ministry of Health & Family Welfare",
    eligibility: "Families identified based on SECC 2011 database (rural & urban poor). All citizens aged 70+ are now covered regardless of income.",
    income: "Generally below ₹10,000/month (rural)",
    documents: ["Aadhaar Card", "Ration Card", "SECC family ID", "Mobile number for OTP"],
    howToApply: "Visit nearest Ayushman Mitra at empanelled hospitals or Common Service Centre. Check eligibility at pmjay.gov.in.",
    applyLink: "https://pmjay.gov.in"
  },
  {
    title: "Janani Suraksha Yojana (JSY)",
    tag: "Maternal Health",
    description: "Cash assistance to pregnant women from BPL households to encourage institutional delivery and reduce maternal and infant mortality.",
    benefit: "₹1,400 (rural) / ₹1,000 (urban)",
    ministry: "Ministry of Health & Family Welfare",
    eligibility: "Pregnant women from BPL families or SC/ST category delivering at government or accredited private health facilities.",
    income: "BPL / SC / ST households",
    documents: ["Aadhaar Card", "BPL/Ration Card", "ANC registration card", "Bank passbook", "Delivery discharge certificate"],
    howToApply: "Register at nearest Anganwadi / ASHA worker or government health centre during pregnancy. Cash transferred after institutional delivery.",
    applyLink: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309"
  },
  {
    title: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    tag: "Maternity Benefit",
    description: "Provides ₹5,000 as maternity benefit for the first live birth to compensate pregnant and lactating women for wage loss during maternity.",
    benefit: "₹5,000 cash benefit",
    ministry: "Ministry of Women & Child Development",
    eligibility: "Pregnant & lactating women aged 19+ for first live birth (except those employed in Central/State Government).",
    income: "All categories (preferably BPL)",
    documents: ["Aadhaar Card", "Bank passbook", "MCP card (Mother & Child Protection)", "Husband's Aadhaar"],
    howToApply: "Register at nearest Anganwadi Centre or health facility. Apply through PMMVY-CAS software handled by AWW/ASHA workers.",
    applyLink: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana"
  },
  {
    title: "National Health Mission (NHM)",
    tag: "Rural Health",
    description: "Strengthens healthcare delivery in rural and urban areas including free medicines, diagnostics, ambulance services, and maternal-child health programmes.",
    benefit: "Free medicines & diagnostics",
    ministry: "Ministry of Health & Family Welfare",
    eligibility: "All citizens, especially rural populations and those below poverty line across all states.",
    income: "All income groups (free services for BPL)",
    documents: ["Aadhaar Card", "BPL card (for free medicines)", "Referral slip from health worker"],
    howToApply: "Access services at nearest Primary Health Centre (PHC), Community Health Centre (CHC) or District Hospital. No formal application needed.",
    applyLink: "https://nhm.gov.in"
  },
  {
    title: "Rashtriya Swasthya Bima Yojana (RSBY)",
    tag: "Health Cover – BPL",
    description: "Smart card-based cashless health insurance for BPL families providing hospitalisation coverage up to ₹30,000 per family per year.",
    benefit: "₹30,000 hospitalisation cover",
    ministry: "Ministry of Labour & Employment",
    eligibility: "BPL families identified by State Governments. Covers head of family plus up to 4 other members.",
    income: "Below Poverty Line (BPL)",
    documents: ["BPL card / Ration card", "Aadhaar Card", "Family photograph"],
    howToApply: "Enroll through district-level enrollment camps. Smart card issued on the spot for cashless treatment at empanelled hospitals.",
    applyLink: "https://labour.gov.in/rsby"
  },
  {
    title: "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)",
    tag: "Antenatal Care",
    description: "Provides free antenatal check-ups on the 9th of every month to all pregnant women including blood tests, ultrasound, and specialist consultations.",
    benefit: "Free ANC & specialist services",
    ministry: "Ministry of Health & Family Welfare",
    eligibility: "All pregnant women in their second or third trimester can avail free check-ups on the 9th of every month.",
    income: "No income restriction",
    documents: ["Aadhaar Card", "MCP (Mother-Child Protection) card or ANC registration"],
    howToApply: "Visit the nearest government health facility on the 9th of any month. No prior appointment or registration needed.",
    applyLink: "https://pmsma.nhp.gov.in"
  },
  {
    title: "Mission Indradhanush",
    tag: "Immunisation",
    description: "Intensified immunisation programme to vaccinate all unvaccinated and partially vaccinated children under 2 years and pregnant women across India.",
    benefit: "Free vaccines for 12 diseases",
    ministry: "Ministry of Health & Family Welfare",
    eligibility: "All children aged 0–2 years and pregnant women, especially those in remote, difficult-to-reach, and urban slum areas.",
    income: "No income restriction",
    documents: ["Birth certificate / Aadhaar (child)", "Mother's Aadhaar Card"],
    howToApply: "Contact nearest ASHA worker or Anganwadi Centre. Vaccination drives are held periodically — no advance application needed.",
    applyLink: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1043&lid=391"
  },
  {
    title: "National Mental Health Programme (NMHP)",
    tag: "Mental Health",
    description: "Provides free mental health services through District Mental Health Programmes including counseling, medication, and rehabilitation for mental health patients.",
    benefit: "Free mental health services",
    ministry: "Ministry of Health & Family Welfare",
    eligibility: "All citizens requiring mental health care. Priority to persons with severe mental disorders from economically weaker sections.",
    income: "All income groups",
    documents: ["Aadhaar Card", "BPL card (for priority services)", "Referral letter (if applicable)"],
    howToApply: "Visit nearest District Hospital or government mental health facility. Services available free of charge at all government health centres.",
    applyLink: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1043&lid=391"
  }
];

function openModal(index) {
  const s = healthSchemes[index];
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
  for (let i = 0; i < healthSchemes.length; i++) {
    let s = healthSchemes[i];
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
