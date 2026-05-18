/* ============================================================
   STUDENT.JS — Student Welfare & Education Schemes Data
   विद्यार्थी कल्याण और शिक्षा योजनाओं का डेटा
   
   PURPOSE: Store all student-related government schemes
   मकसद: सभी छात्र-संबंधित योजनाओं को store करना
   
   CATEGORIES:
   - Scholarships (छात्रवृत्ति)
   - Fellowships (फेलोशिप)
   - Education Loans (शिक्षा लोन)
   - Skill Development (कौशल विकास)
   - Research Support (अनुसंधान सहायता)
   
   EACH SCHEME HAS:
   - title: Official name of scheme (योजना का नाम)
   - tag: Category/type (श्रेणी)
   - description: What it offers (क्या दिया जाता है)
   - benefit: Amount/benefit (लाभ की राशि)
   - ministry: Which ministry runs it (कौन सी मंत्रालय चलाती है)
   - eligibility: Who can apply (कौन आवेदन कर सकता है)
   - income: Income limit (आय की सीमा)
   - documents: Required papers (जरूरी दस्तावेज)
   - howToApply: Steps to apply (आवेदन कैसे करें)
   - applyLink: Official website link (आधिकारिक वेबसाइट)
   ============================================================ */

// सभी छात्र योजनाएं इस array में store हैं
let studentSchemes = [
  {
    title: "PM Scholarship Scheme (PMSS)",
    tag: "Central Scheme",
    description: "Provides financial assistance to dependents of Ex-Servicemen and Ex-Coast Guard personnel for pursuing professional degree courses.",
    benefit: "Up to ₹30,000/year",
    ministry: "Ministry of Home Affairs",
    eligibility: "Dependents of Ex-Servicemen/Ex-Coast Guard personnel pursuing first professional degree (BE, MBBS, BDS, MBA, MCA, etc.)",
    income: "No specific income limit",
    documents: ["Aadhaar Card", "Ex-Serviceman's PPO / Discharge Certificate", "Academic marksheets", "Bank account details", "Bonafide certificate from institution"],
    howToApply: "Apply online through the National Scholarship Portal (scholarships.gov.in) during the application window (usually Aug–Nov).",
    applyLink: "https://scholarships.gov.in"
  },
  {
    title: "National Means-cum-Merit Scholarship (NMMS)",
    tag: "Class 9–12",
    description: "Awards ₹12,000 per annum to economically weaker section students from Class 9 to 12 to prevent dropout at Class 8 level.",
    benefit: "₹12,000 per year",
    ministry: "Ministry of Education",
    eligibility: "Students who passed Class 8 from a government school with at least 55% marks (50% for SC/ST). Family income below ₹3.5 lakh/year.",
    income: "Below ₹3.5 Lakh/year",
    documents: ["Aadhaar Card", "Class 8 marksheet", "Income certificate", "Caste certificate (if applicable)", "Bank passbook"],
    howToApply: "Apply through the State Liaison Officer. Shortlisted students appear for the NMMS Exam conducted by State Governments.",
    applyLink: "https://scholarships.gov.in"
  },
  {
    title: "Central Sector Scheme of Scholarship",
    tag: "Higher Education",
    description: "Supports meritorious students from families with annual income below ₹4.5 lakh. Provides ₹12,000–₹20,000 per year for UG and PG studies.",
    benefit: "₹12,000–₹20,000/year",
    ministry: "Ministry of Education",
    eligibility: "Students who scored above 80th percentile in Class 12 board exams and enrolled in regular degree courses. Family income below ₹4.5 lakh/year.",
    income: "Below ₹4.5 Lakh/year",
    documents: ["Aadhaar Card", "Class 12 marksheet", "Income certificate", "College admission proof", "Bank passbook"],
    howToApply: "Register on National Scholarship Portal (scholarships.gov.in) and apply online. Verification done by institution and state.",
    applyLink: "https://scholarships.gov.in"
  },
  {
    title: "Post-Matric Scholarship for SC Students",
    tag: "SC/ST Welfare",
    description: "Financial assistance to Scheduled Caste students studying at post-matriculation or post-secondary stage to enable them to complete their education.",
    benefit: "Up to ₹1,200/month",
    ministry: "Ministry of Social Justice & Empowerment",
    eligibility: "SC students pursuing post-matriculation studies. Family income must be below ₹2.5 lakh per annum.",
    income: "Below ₹2.5 Lakh/year",
    documents: ["Aadhaar Card", "Caste certificate (SC)", "Income certificate", "Previous year marksheet", "Bonafide certificate", "Bank passbook"],
    howToApply: "Apply through National Scholarship Portal. State nodal departments verify and disburse the scholarship via DBT.",
    applyLink: "https://scholarships.gov.in"
  },
  {
    title: "Ishan Uday Scholarship (North-East)",
    tag: "Regional Scheme",
    description: "Supports 10,000 fresh students from North-Eastern states every year for undergraduate level courses.",
    benefit: "₹5,400–₹7,800/month",
    ministry: "University Grants Commission (UGC)",
    eligibility: "Students domiciled in North-Eastern states, pursuing undergraduate studies for the first time. Family income below ₹4.5 lakh/year.",
    income: "Below ₹4.5 Lakh/year",
    documents: ["Aadhaar Card", "Domicile certificate (NE State)", "Income certificate", "Class 12 marksheet", "College enrollment proof", "Bank passbook"],
    howToApply: "Apply online at UGC's scholarship portal or National Scholarship Portal. Selection is done by lottery among eligible applicants.",
    applyLink: "https://scholarships.gov.in"
  },
  {
    title: "Pragati Scholarship for Girls",
    tag: "Girls Education",
    description: "Provides one-time annual academic fee up to ₹30,000 and ₹2,000/month for 10 months to girl students pursuing technical education.",
    benefit: "Up to ₹50,000/year",
    ministry: "AICTE (Ministry of Education)",
    eligibility: "Girl students (max 2 per family) admitted to 1st year of Degree or Diploma in AICTE-approved institution. Family income below ₹8 lakh/year.",
    income: "Below ₹8 Lakh/year",
    documents: ["Aadhaar Card", "Income certificate", "Admission letter from AICTE institution", "Class 12 / Class 10 marksheet", "Bank passbook"],
    howToApply: "Apply on the AICTE portal (aicte-pragati-saksham-gov.in) during the application window announced each academic year.",
    applyLink: "https://aicte-pragati-saksham-gov.in"
  },
  {
    title: "National Fellowship for SC Students (NF-SC)",
    tag: "Research",
    description: "Fellowship for Scheduled Caste students to pursue M.Phil and Ph.D. programmes in universities and institutions recognized by UGC.",
    benefit: "₹31,000/month (JRF)",
    ministry: "Ministry of Social Justice & Empowerment",
    eligibility: "SC students who have passed UGC-NET/CSIR-NET and are enrolled in M.Phil/Ph.D. at a UGC-recognized university.",
    income: "No income limit",
    documents: ["Aadhaar Card", "SC Caste certificate", "UGC-NET/CSIR-NET scorecard", "University enrollment letter", "Bank passbook"],
    howToApply: "Apply online through the NF-SC portal managed by AICTE or the Ministry. Applications open after NET results.",
    applyLink: "https://scholarships.gov.in"
  },
  {
    title: "PM YASASVI Scheme",
    tag: "OBC / EBC / DNT",
    description: "Covers tuition fees and hostel fees, up to ₹75,000/year for classes 9-10, and up to ₹1,25,000/year for classes 11-12.",
    benefit: "Up to ₹1,25,000/year",
    ministry: "Ministry of Social Justice & Empowerment",
    eligibility: "Students from OBC, EBC, and DNT categories in Class 9–12. Must have passed PM YASASVI entrance test. Family income below ₹2.5 lakh/year.",
    income: "Below ₹2.5 Lakh/year",
    documents: ["Aadhaar Card", "OBC/EBC/DNT certificate", "Income certificate", "YASASVI entrance exam scorecard", "School enrollment proof", "Bank passbook"],
    howToApply: "Appear for the PM YASASVI Entrance Test (YET) conducted by NTA. Apply via NTA website or National Scholarship Portal.",
    applyLink: "https://scholarships.gov.in"
  },
  {
    title: "Vidyalakshmi Education Loan Portal",
    tag: "Education Loan",
    description: "Single window platform for students to access education loans from multiple banks covering tuition, hostel, books, and living expenses.",
    benefit: "Loans up to ₹7.5 Lakhs",
    ministry: "Ministry of Finance & Ministry of Education",
    eligibility: "Indian citizen, secured admission to recognized institution in India or abroad, satisfactory academic performance.",
    income: "No strict income limit (bank-specific criteria)",
    documents: ["Aadhaar Card", "PAN Card", "Admission letter", "Fee structure", "Academic records", "Co-borrower income proof"],
    howToApply: "Register at vidyalakshmi.co.in, search and apply to multiple banks with a single application form.",
    applyLink: "https://www.vidyalakshmi.co.in"
  },
  {
    title: "AICTE Saksham Scholarship",
    tag: "Differently-Abled",
    description: "Provides scholarship to specially-abled students pursuing Degree or Diploma courses in AICTE approved institutions. Covers tuition fees and living expenses.",
    benefit: "₹50,000/year",
    ministry: "AICTE (Ministry of Education)",
    eligibility: "Students with at least 40% disability, admitted to Degree/Diploma in AICTE-approved institutions. Family income below ₹8 lakh/year.",
    income: "Below ₹8 Lakh/year",
    documents: ["Aadhaar Card", "Disability certificate (40%+)", "Income certificate", "Admission proof from AICTE institution", "Bank passbook"],
    howToApply: "Apply via AICTE Saksham portal (aicte-pragati-saksham-gov.in) during the annual application window.",
    applyLink: "https://aicte-pragati-saksham-gov.in"
  },
  {
    title: "Kishore Vaigyanik Protsahan Yojana (KVPY)",
    tag: "Science Research",
    description: "Fellowship programme to attract talented students to pursue a career in research and development in the field of basic sciences.",
    benefit: "₹5,000–₹7,000/month",
    ministry: "Department of Science & Technology",
    eligibility: "Students in Class 11, 12, or 1st year of undergraduate (Basic Sciences) with excellent academic record.",
    income: "No income limit",
    documents: ["Aadhaar Card", "Academic marksheets", "School/College enrollment certificate", "Bank passbook"],
    howToApply: "Register on the KVPY portal (kvpy.iisc.ac.in). Appear for KVPY Aptitude Test followed by an interview.",
    applyLink: "http://www.kvpy.iisc.ernet.in"
  },
  {
    title: "Skill India — PMKVY",
    tag: "Skill Development",
    description: "Pradhan Mantri Kaushal Vikas Yojana enables youth to take up industry-relevant skill training to secure a job or become self-employed.",
    benefit: "Free Training + ₹8,000 reward",
    ministry: "Ministry of Skill Development & Entrepreneurship",
    eligibility: "Any Indian youth aged 15–45 who is a school/college dropout or looking for skill up-gradation. Priority to SC/ST, women, and minorities.",
    income: "No income limit",
    documents: ["Aadhaar Card", "Bank passbook", "Educational qualification proof (if any)"],
    howToApply: "Locate nearest PMKVY Training Centre at pmkvyofficial.org or call the Skill India helpline 1800-123-9626.",
    applyLink: "https://www.pmkvyofficial.org"
  }
];

function openModal(index) {
  const s = studentSchemes[index];
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
  for (let i = 0; i < studentSchemes.length; i++) {
    let s = studentSchemes[i];
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
