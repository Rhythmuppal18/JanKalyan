/* ============================================================
   JANKALYAN — Main Script
   Features: API News Feed, Smart Filter, Quote Carousel,
             Counter Animation, Popup, Navbar Scroll
   ============================================================ */

// ═══════════════════════════════════════════════════════════════
// CONFIGURATION & DOM CACHE (CRITICAL - Must be at top!)
// ═══════════════════════════════════════════════════════════════

/**
 * Global configuration for animations, timings, and thresholds
 */
const CONFIG = {
  QUOTE_AUTO_ADVANCE_MS: 5000,           // Carousel auto-advance interval
  COUNTER_ANIMATION_MS: 2000,             // Counter animation duration
  COUNTER_ANIMATION_FRAME: 50,            // Counter animation frame rate
  COUNTER_REVEAL_THRESHOLD: 0.5,          // When to start counter animation
  SCROLL_REVEAL_DELAY_MS: 100,            // Stagger delay for scroll reveals
  SCROLL_REVEAL_THRESHOLD: 0.3,           // Intersection threshold for scroll reveals
};

/**
 * DOM element cache - initialized on page load
 * This prevents repeated DOM queries and improves performance
 */
const DOM = {
  // Initialize all DOM references
  init() {
    this.navbar = document.getElementById('navbar');
    this.navLinks = document.getElementById('navLinks');
    this.newsGrid = document.getElementById('newsGrid');
    this.tickerInner = document.getElementById('tickerInner');
    this.schemeSearch = document.getElementById('schemeSearch');
    this.schemeResults = document.getElementById('schemeResults');
    this.schemeFilters = document.querySelectorAll('.chip');
    this.statsSection = document.querySelector('.insights-section');
    this.quoteSlides = document.querySelectorAll('.quote-slide');
    this.quoteDots = document.querySelectorAll('.qdot');
    this.premiumModal = document.getElementById('premiumModal');
    this.planSelect = document.getElementById('planSelect');
    this.premiumForm = document.getElementById('premiumForm');
    this.revealElements = document.querySelectorAll('[data-reveal]');
  }
};

/**
 * Plan names mapping for modal display
 */
const PLAN_NAMES = {
  'free': 'Free',
  'pro': 'Professional',
  'enterprise': 'Enterprise'
};

/**
 * NewsModule - Wrapper for news functionality
 */
const NewsModule = {
  loadNews() {
    loadNews();
  }
};

/**
 * NavbarModule - Wrapper for navbar functionality
 */
const NavbarModule = {
  initScrollEffect() {
    // Already handled in the scroll listener below
  },
  updateLoginStatus() {
    checkAndUpdateLoginStatus();
  }
};

// ── Navbar Scroll Effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

function toggleMenu() {
  const nav = document.getElementById('navLinks');
  if (nav) nav.classList.toggle('open');
}

// ── Login Status Management ──────────────────────────────────
function checkAndUpdateLoginStatus() {
  const user = JSON.parse(localStorage.getItem('jankalyanUser'));
  const navLinks = document.getElementById('navLinks');
  
  if (navLinks && user && user.isLoggedIn) {
    // Find the login link and replace with profile
    const loginLink = navLinks.querySelector('a[href="login.html"]');
    if (loginLink) {
      loginLink.textContent = '👤 ' + (user.userType === 'citizen' ? 'Profile' : user.userType.toUpperCase());
      loginLink.href = 'javascript:void(0)';
      loginLink.onclick = function(e) {
        e.preventDefault();
        showProfileMenu(user);
      };
      loginLink.classList.add('btn-nav');
      loginLink.style.background = 'linear-gradient(135deg, #0d47a1, #0d9488)';
    }
  } else if (navLinks) {
    // Ensure login link is visible if not logged in
    const loginLink = navLinks.querySelector('a[href="login.html"]');
    if (loginLink) {
      loginLink.textContent = 'Login';
      loginLink.href = 'login.html';
      loginLink.onclick = null;
    }
  }
}

function showProfileMenu(user) {
  const userTypes = {
    'citizen': '👤 Individual Citizen',
    'csc': '🏢 CSC Operator',
    'ngo': '🤝 NGO/Organization',
    'government': '🏛️ Government Official'
  };
  
  const message = `Logged In\n\nType: ${userTypes[user.userType] || user.userType}\n\n[Logout]`;
  if (confirm(message + '\n\nPress OK to logout')) {
    localStorage.removeItem('jankalyanUser');
    checkAndUpdateLoginStatus();
    window.location.reload();
  }
}

// Call on page load
window.addEventListener('DOMContentLoaded', checkAndUpdateLoginStatus);
window.addEventListener('load', checkAndUpdateLoginStatus);


// ── News API Integration ───────────────────────────────────────
const FALLBACK_NEWS = [
  {
    title: "Union Budget 2026: ₹1.2 Lakh Crore allocated for Rural Welfare Schemes",
    source: "Economic Times",
    url: "https://economictimes.indiatimes.com",
    image : "images/ruralbud.jpg"
  },
  {
    title: "Ayushman Bharat crosses 7 crore hospitalisation milestone — PM hails achievement",
    source: "The Hindu",
    url: "https://thehindu.com",
    image: "images/ayush.jpg"
  },
  {
    title: "PMAY Urban 2.0: 1 crore houses sanctioned in 100 days of new government",
    source: "Hindustan Times",
    url: "https://hindustantimes.com",
    image: "images/pmay.jpg"
  },
  {
    title: "Jal Jeevan Mission achieves 80% rural household tap coverage across India",
    source: "PIB India",
    url: "https://pib.gov.in",
    image: "images/jal.jpg"
  },
  {
    title: "PM YASASVI Scholarship: 1.5 lakh students to receive benefits this academic year",
    source: "Deccan Herald",
    url: "https://deccanherald.com",
    image: "images/pm.jpg"
  },
  {
    title: "PM-KISAN: 18th instalment released — ₹20,000 Crore transferred to 9.26 Cr farmers",
    source: "Business Standard",
    url: "https://business-standard.com",
    image: "images/kisan.jpg"
  }
];

async function loadNews() {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;

  // NewsData.io API - randomize query slightly to get different results
  const API_KEY = 'pub_8effb19c43ac4241b33f8c7d05cb5546';
  const queries = [
    'India government welfare scheme',
    'India social security schemes',
    'government assistance programs India',
    'welfare benefits India',
    'Indian government initiatives'
  ];
  const query = queries[Math.floor(Math.random() * queries.length)]; // Random query for variety
  const url = `https://newsdata.io/api/1/latest?q=${encodeURIComponent(query)}&language=en&apikey=${API_KEY}`;

  let articles = [];

  if (API_KEY) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log('API Response:', res.status, data);
      if (data.status === 'success' && data.results && data.results.length > 0) {
        articles = data.results.slice(0, 6).map(a => ({
          title: a.title,
          source: a.source_id || 'News',
          url: a.link,
          image: a.image_url,
          icon: '📰'
        }));
        console.log('✓ Live news loaded:', articles.length, 'articles');
      } else {
        console.warn('API returned no articles or error status:', data.status);
      }
    } catch (e) {
      console.error('News API failed:', e.message, '- Using fallback data.');
    }
  }

  // Use fallback if API not available or no results
  if (articles.length === 0) {
    articles = FALLBACK_NEWS;
  }

  renderNews(articles);
  updateTicker(articles);
}
  
function renderNews(articles) {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;

  grid.innerHTML = articles.map(a => `
    <div class="news-card">
      <div class="news-card-img">
        ${a.image
          ? `<img src="${a.image}" alt="${a.title}" loading="lazy" onerror="this.parentElement.innerHTML='${a.icon || '📰'}';">`
          : `<span style="font-size:2.5rem;">${a.icon || '📰'}</span>`}
      </div>
      <div class="news-card-body">
        <div class="news-source">${a.source}</div>
        <h4>${a.title.length > 90 ? a.title.slice(0, 90) + '…' : a.title}</h4>
        <a href="${a.url}" target="_blank" rel="noopener">Read more →</a>
      </div>
    </div>
  `).join('');
}

function updateTicker(articles) {
  const inner = document.getElementById('tickerInner');
  if (!inner) return;
  inner.textContent = articles.map(a => `● ${a.title}   `).join('    ');
}


// ═══════════════════════════════════════════════════════════════
// SCHEMES MODULE
// ═══════════════════════════════════════════════════════════════

/**
 * @typedef {Object} SchemeType
 * @property {string} title - Official scheme name
 * @property {string} tag - Category/type label
 * @property {'student'|'health'|'housing'|'service'} category - Scheme category
 * @property {string} description - Scheme description
 * @property {string} link - Reference link
 */

const ALL_SCHEMES = [
  // STUDENT SCHEMES (15)
  { title: 'PM Scholarship Scheme (PMSS)', tag: 'Central Scheme', category: 'student', description: 'Financial assistance to dependents of Ex-Servicemen for professional degree courses.', link: 'student.html' },
  { title: 'NMMS Scholarship', tag: 'Class 9-12', category: 'student', description: 'Awards ₹12,000/year to economically weaker section students from Class 9 to 12.', link: 'student.html' },
  { title: 'Central Sector Scholarship', tag: 'Higher Education', category: 'student', description: 'Supports meritorious students with family income below ₹4.5L pursuing UG/PG.', link: 'student.html' },
  { title: 'Post-Matric Scholarship for SC Students', tag: 'SC/ST Welfare', category: 'student', description: 'Financial assistance to SC students at post-matriculation stage.', link: 'student.html' },
  { title: 'Pragati Scholarship for Girls', tag: 'Girls Education', category: 'student', description: 'Up to ₹50,000/year for girl students in technical education.', link: 'student.html' },
  { title: 'PM YASASVI Scheme', tag: 'OBC/EBC/DNT', category: 'student', description: 'Up to ₹1.25 lakh/year for OBC, EBC & DNT students in Class 9–12.', link: 'student.html' },
  { title: 'Skill India — PMKVY', tag: 'Skill Development', category: 'student', description: 'Free industry-relevant skill training + ₹8,000 reward for youth aged 15–45.', link: 'student.html' },
  { title: 'Vidyalakshmi Education Loan', tag: 'Education Loan', category: 'student', description: 'Single window for education loans from multiple banks up to ₹7.5 Lakhs.', link: 'student.html' },
  { title: 'Post-Doctoral Fellowships (PDF)', tag: 'Research', category: 'student', description: 'Support for post-doctoral researchers in science & technology fields.', link: 'student.html' },
  { title: 'INSPIRE Scholarship', tag: 'Higher Education', category: 'student', description: '₹80,000/year scholarships for top 1% of science graduates pursuing research.', link: 'student.html' },
  { title: 'Babu Jagjivan Ram Schemes', tag: 'SC Students', category: 'student', description: 'Pre-matric and post-matric scholarships for SC student welfare.', link: 'student.html' },
  { title: 'Top Class Scholarship Scheme', tag: 'Meritorious Girls', category: 'student', description: 'Full tuition fees + living allowance for top 100 girls per state in Class 12.', link: 'student.html' },
  { title: 'Begum Hazrat Mahal National Scholarship', tag: 'Minority Students', category: 'student', description: 'Scholarships for girl students from minority communities.', link: 'student.html' },
  { title: 'Dr. Ambedkar Scholarship', tag: 'Research', category: 'student', description: 'Support for doctoral research in philosophy and social sciences.', link: 'student.html' },
  { title: 'National Apprenticeship Programme', tag: 'Vocational', category: 'student', description: 'Paid on-job training opportunity for diploma/degree holders.', link: 'student.html' },

  // HEALTH SCHEMES (15)
  { title: 'Ayushman Bharat – PMJAY', tag: 'Health Insurance', category: 'health', description: '₹5 lakh/year health cover for secondary and tertiary hospitalisation.', link: 'health.html' },
  { title: 'Janani Suraksha Yojana (JSY)', tag: 'Maternal Health', category: 'health', description: 'Cash assistance to pregnant BPL women for institutional delivery.', link: 'health.html' },
  { title: 'Pradhan Mantri Matru Vandana Yojana', tag: 'Maternity Benefit', category: 'health', description: '₹5,000 cash benefit for pregnant women for first live birth.', link: 'health.html' },
  { title: 'National Health Mission (NHM)', tag: 'Rural Health', category: 'health', description: 'Free medicines, diagnostics, ambulance services for rural populations.', link: 'health.html' },
  { title: 'Mission Indradhanush', tag: 'Immunisation', category: 'health', description: 'Free vaccines for 12 diseases for children under 2 and pregnant women.', link: 'health.html' },
  { title: 'National Mental Health Programme', tag: 'Mental Health', category: 'health', description: 'Free mental health services through district mental health programmes.', link: 'health.html' },
  { title: 'Poshan Abhiyaan', tag: 'Nutrition', category: 'health', description: 'Nutrition support programme targeting undernourished children & pregnant women.', link: 'health.html' },
  { title: 'RCH Programme (Reproductive & Child Health)', tag: 'Family Planning', category: 'health', description: 'Maternal health, child health, contraceptive & family planning services.', link: 'health.html' },
  { title: 'National Cancer Registry Programme', tag: 'Cancer Care', category: 'health', description: 'Free cancer detection & treatment through designated centres.', link: 'health.html' },
  { title: 'NRHM – Rural Health Centres', tag: 'Rural Healthcare', category: 'health', description: 'Establishment of primary health centres in rural areas.', link: 'health.html' },
  { title: 'Revised National TB Control Programme', tag: 'TB Control', category: 'health', description: 'Free TB diagnosis, treatment & monitoring support nationwide.', link: 'health.html' },
  { title: 'Integrated Disease Surveillance Program', tag: 'Disease Prevention', category: 'health', description: 'Disease monitoring & outbreak response across India.', link: 'health.html' },
  { title: 'Community Health Volunteer Scheme', tag: 'Health Workers', category: 'health', description: 'Stipend & training for village health volunteers.', link: 'health.html' },
  { title: 'Rashtriya Swasthya Bima Yojana', tag: 'Health Insurance', category: 'health', description: '₹30,000 health cover for unorganised sector workers.', link: 'health.html' },
  { title: 'Pradhan Mantri National Dialysis Programme', tag: 'Dialysis Care', category: 'health', description: 'Free dialysis treatment for kidney patients in government hospitals.', link: 'health.html' },

  // HOUSING SCHEMES (10)
  { title: 'PMAY – Gramin (Rural)', tag: 'Rural Housing', category: 'housing', description: '₹1.20–1.30 Lakh grant for rural households to construct pucca houses.', link: 'housing.html' },
  { title: 'PMAY – Urban 2.0', tag: 'Urban Housing', category: 'housing', description: 'Affordable housing for urban poor — EWS, LIG, MIG categories.', link: 'housing.html' },
  { title: 'Credit Linked Subsidy Scheme', tag: 'Home Loan', category: 'housing', description: 'Interest subsidy 3–6.5% on home loans for income-eligible buyers.', link: 'housing.html' },
  { title: 'PM SVANidhi – Street Vendor Loans', tag: 'Micro-Enterprise', category: 'housing', description: 'Collateral-free working capital loans up to ₹50,000 for street vendors.', link: 'housing.html' },
  { title: 'Pradhan Mantri Awas Yojana – Subsidy', tag: 'Home Ownership', category: 'housing', description: 'Interest rate subsidy on home loans for first-time homebuyers.', link: 'housing.html' },
  { title: 'CLSS for EWS & LIG', tag: 'Affordable Housing', category: 'housing', description: 'Interest subsidy for housing loans to economically weaker sections.', link: 'housing.html' },
  { title: 'IAY – Indira Awas Yojana', tag: 'Rural House Build', category: 'housing', description: 'Grant for construction of permanent houses for BPL families.', link: 'housing.html' },
  { title: 'National Urban Housing Mission', tag: 'Slum Housing', category: 'housing', description: 'In-situ upgradation of slum settlements with dignity & resilience.', link: 'housing.html' },
  { title: 'Rural Housing Infrastructure Grant', tag: 'Infrastructure', category: 'housing', description: 'Grants for infrastructure in rural housing projects.', link: 'housing.html' },
  { title: 'PMAY – Affordable Housing', tag: 'Housing For All', category: 'housing', description: 'Low-cost affordable housing units for vulnerable sections.', link: 'housing.html' },

  // SERVICES SCHEMES (10+)
  { title: 'Mahatma Gandhi NREGA (MGNREGS)', tag: 'Employment', category: 'service', description: 'Guaranteed 100 days of employment/year for rural households.', link: 'service.html' },
  { title: 'Pradhan Mantri Ujjwala Yojana', tag: 'Clean Cooking', category: 'service', description: 'Free LPG connections to BPL women to replace unclean cooking fuels.', link: 'service.html' },
  { title: 'Saubhagya – Electrification', tag: 'Electricity', category: 'service', description: 'Free electricity connections to all un-electrified rural households.', link: 'service.html' },
  { title: 'Jal Jeevan Mission', tag: 'Clean Water', category: 'service', description: 'Safe drinking water through household tap connections for rural households.', link: 'service.html' },
  { title: 'PM Kisan Samman Nidhi', tag: 'Agriculture', category: 'service', description: '₹6,000/year income support in 3 instalments to landholding farmer families.', link: 'service.html' },
  { title: 'Atal Pension Yojana', tag: 'Social Security', category: 'service', description: '₹1,000–₹5,000/month guaranteed pension for unorganised sector workers.', link: 'service.html' },
  { title: 'National Food Security Act – Ration Card', tag: 'Food Security', category: 'service', description: '5 kg grain/month at ₹2-3 for up to 75% of rural & 50% of urban population.', link: 'service.html' },
  { title: 'PM Jeevan Jyoti Bima Yojana', tag: 'Life Insurance', category: 'service', description: '₹2 lakh life cover at just ₹436/year for citizens aged 18–50.', link: 'service.html' },
  { title: 'Pradhan Mantri Shram Yogi Mandhan', tag: 'Unorganised Workers', category: 'service', description: 'Fixed ₹3,000/month pension for informal sector workers after 60 years.', link: 'service.html' },
  { title: 'Pradhan Mantri Mudra Yojana', tag: 'Business Loans', category: 'service', description: 'Non-collateral loans up to ₹10 lakhs for micro-enterprises & small businesses.', link: 'service.html' },
];

const SchemesModule = {
  activeFilter: 'all',

  /**
   * Set active filter category and re-render
   * @param {string} category - Filter category ('all', 'student', 'health', 'housing', 'service')
   * @param {Element} element - Clicked element for styling
   */
  setFilter(category, element) {
    this.activeFilter = category;
    document.querySelectorAll('.chip').forEach(chip => {
      chip.classList.remove('active');
    });
    if (element) {
      element.classList.add('active');
    }
    this.filterSchemes();
  },

  /**
   * Filter schemes based on active filter and search query
   */
  filterSchemes() {
    const searchValue = DOM.schemeSearch?.value || '';
    const query = searchValue.toLowerCase().trim();

    if (!DOM.schemeResults) return;

    const filteredSchemes = this.getFilteredSchemes(query);

    if (filteredSchemes.length === 0) {
      DOM.schemeResults.innerHTML = '<div class="no-results">No schemes found. Try a different search term or category.</div>';
      return;
    }

    this.renderSchemeResults(filteredSchemes);
  },

  /**
   * Get filtered schemes based on category and query
   * @param {string} query - Search query
   * @returns {Array}
   */
  getFilteredSchemes(query) {
    return ALL_SCHEMES.filter(scheme => {
      const matchesCategory = this.activeFilter === 'all' || scheme.category === this.activeFilter;
      const matchesQuery = !query || this.schemeMatchesQuery(scheme, query);
      return matchesCategory && matchesQuery;
    });
  },

  /**
   * Check if scheme matches search query
   * @param {Object} scheme - Scheme object
   * @param {string} query - Search query
   * @returns {boolean}
   */
  schemeMatchesQuery(scheme, query) {
    return scheme.title.toLowerCase().includes(query) ||
           scheme.description.toLowerCase().includes(query) ||
           scheme.tag.toLowerCase().includes(query);
  },

  /**
   * Render filtered schemes to results container
   * @param {Array} filteredSchemes - Schemes to render
   */
  renderSchemeResults(filteredSchemes) {
    const html = `
      <div class="scheme-results-grid">
        ${filteredSchemes.map(scheme => this.createSchemeCardHTML(scheme)).join('')}
      </div>
    `;
    if (DOM.schemeResults) {
      DOM.schemeResults.innerHTML = html;
    }
  },

  /**
   * Create HTML for a scheme result card
   * @param {Object} scheme - Scheme object
   * @returns {string}
   */
  createSchemeCardHTML(scheme) {
    return `
      <div class="result-card">
        <span class="result-tag">${scheme.tag}</span>
        <h4>${scheme.title}</h4>
        <p>${scheme.description}</p>
        <a href="${scheme.link}">View Details →</a>
      </div>
    `;
  }
};

// Export functions for inline handlers
function setFilter(category, element) {
  SchemesModule.setFilter(category, element);
}


// ═══════════════════════════════════════════════════════════════
// CAROUSEL MODULE (Quote Carousel)
// ═══════════════════════════════════════════════════════════════

const CarouselModule = {
  currentSlide: 0,
  autoAdvanceInterval: null,

  /**
   * Initialize carousel with auto-advance
   */
  init() {
    if (DOM.quoteSlides.length === 0) return;
    this.autoAdvanceInterval = setInterval(() => this.nextSlide(), CONFIG.QUOTE_AUTO_ADVANCE_MS);
  },

  /**
   * Go to specific slide
   * @param {number} index - Slide index
   */
  goToSlide(index) {
    if (DOM.quoteSlides.length === 0) return;

    // Remove active class from current slide and dot
    DOM.quoteSlides[this.currentSlide]?.classList.remove('active');
    DOM.quoteDots[this.currentSlide]?.classList.remove('active');

    // Update current slide and add active class
    this.currentSlide = index;
    DOM.quoteSlides[this.currentSlide]?.classList.add('active');
    DOM.quoteDots[this.currentSlide]?.classList.add('active');
  },

  /**
   * Advance to next slide
   */
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % DOM.quoteSlides.length;
    this.goToSlide(nextIndex);
  }
};

// Export function for inline handlers
function goToQuote(index) {
  CarouselModule.goToSlide(index);
}

// ═══════════════════════════════════════════════════════════════
// COUNTER ANIMATION MODULE
// ═══════════════════════════════════════════════════════════════

const CounterModule = {
  /**
   * Animate all counters on page
   */
  animateAllCounters() {
    const counters = document.querySelectorAll('.insight-number[data-target]');
    counters.forEach(counter => this.animateCounter(counter));
  },

  /**
   * Animate a single counter
   * @param {Element} counterElement - Counter element with data-target
   */
  animateCounter(counterElement) {
    const targetValue = parseInt(counterElement.dataset.target, 10);
    const suffix = counterElement.dataset.suffix || '';
    const prefix = counterElement.dataset.prefix || '';
    const stepSize = targetValue / (CONFIG.COUNTER_ANIMATION_MS / CONFIG.COUNTER_ANIMATION_FRAME);
    let currentValue = 0;

    const updateCounter = () => {
      currentValue = Math.min(currentValue + stepSize, targetValue);
      const displayValue = this.formatCounterDisplay(currentValue, targetValue);
      counterElement.textContent = prefix + displayValue + suffix + this.getSuffix(targetValue, currentValue);

      if (currentValue < targetValue) {
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  },

  /**
   * Format counter display value
   * @param {number} current - Current counter value
   * @param {number} target - Target counter value
   * @returns {string}
   */
  formatCounterDisplay(current, target) {
    if (target > 9999) {
      return current >= 10000 ? '10,000+' : Math.floor(current).toLocaleString('en-IN');
    }
    return Math.floor(current);
  },

  /**
   * Get suffix for counter (+ sign)
   * @param {number} target - Target value
   * @param {number} current - Current value
   * @returns {string}
   */
  getSuffix(target, current) {
    return target >= 100 && current >= target ? '+' : '';
  },

  /**
   * Initialize counter animation when section is visible
   */
  initViewportObserver() {
    if (!DOM.statsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateAllCounters();
          observer.disconnect();
        }
      });
    }, { threshold: CONFIG.COUNTER_REVEAL_THRESHOLD });

    observer.observe(DOM.statsSection);
  }
};

// ═══════════════════════════════════════════════════════════════
// MODAL MODULE (Premium Access)
// ═══════════════════════════════════════════════════════════════

const ModalModule = {
  /**
   * Open premium modal
   * @param {string} planType - Plan type ('pro', 'enterprise', 'free')
   */
  openModal(planType) {
    if (!DOM.premiumModal) return;

    DOM.premiumModal.classList.add('show');

    if (DOM.planSelect && planType !== 'free') {
      DOM.planSelect.value = planType;
    }
  },

  /**
   * Close premium modal
   */
  closeModal() {
    if (DOM.premiumModal) {
      DOM.premiumModal.classList.remove('show');
    }
  },

  /**
   * Initialize modal event listeners
   */
  initEventListeners() {
    // Close modal on outside click
    window.addEventListener('click', (event) => {
      if (event.target === DOM.premiumModal) {
        this.closeModal();
      }
    });

    // Handle form submission
    if (DOM.premiumForm) {
      DOM.premiumForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this.handleFormSubmit();
      });
    }
  },

  /**
   * Handle premium form submission
   */
  handleFormSubmit() {
    const selectedPlan = DOM.planSelect?.value || 'free';
    const planName = PLAN_NAMES[selectedPlan] || 'Free';

    const message = `✓ Application submitted successfully!\n\nPlan: ${planName}\n\nYou will receive a confirmation email shortly with next steps for premium features.`;
    alert(message);

    this.closeModal();
    DOM.premiumForm?.reset();
  }
};

// Export functions for inline handlers
function openPremiumModal(planType) {
  ModalModule.openModal(planType);
}

function closePremiumModal() {
  ModalModule.closeModal();
}

// ── Quote Carousel ─────────────────────────────────────────────


// ═══════════════════════════════════════════════════════════════
// ANIMATION MODULE (Scroll Reveal)
// ═══════════════════════════════════════════════════════════════

const AnimationModule = {
  /**
   * Initialize scroll reveal animations
   */
  initScrollReveal() {
    if (!DOM.revealElements || DOM.revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * CONFIG.SCROLL_REVEAL_DELAY_MS);

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: CONFIG.SCROLL_REVEAL_THRESHOLD });

    // Initialize all reveal elements with starting styles
    DOM.revealElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(24px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(element);
    });
  }
};

// ═══════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════

/**
 * Initialize all modules and event listeners
 */
function initializeApplication() {
  // Initialize DOM cache
  DOM.init();

  // Initialize navbar
  NavbarModule.initScrollEffect();
  window.addEventListener('DOMContentLoaded', () => {
    NavbarModule.updateLoginStatus();
  });
  window.addEventListener('load', () => {
    NavbarModule.updateLoginStatus();
  });

  // Initialize news module
  NewsModule.loadNews();

  // Initialize schemes module - show all schemes initially
  SchemesModule.filterSchemes();

  // Setup scheme search input listener
  if (DOM.schemeSearch) {
    DOM.schemeSearch.addEventListener('input', () => {
      SchemesModule.filterSchemes();
    });
  }

  // Initialize carousel
  CarouselModule.init();

  // Initialize counter animation
  CounterModule.initViewportObserver();

  // Initialize modal event listeners
  ModalModule.initEventListeners();

  // Initialize scroll reveal animations
  AnimationModule.initScrollReveal();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
  initializeApplication();
}
