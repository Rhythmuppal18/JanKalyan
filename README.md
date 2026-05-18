# JanKalyan
Frontend sme2 project using html css javascript


*Deployed Link :-* https://jankalyanwelfare.netlify.app/

⚖️ Disclaimer
JanKalyan is an informational concept portal developed for educational  demonstration contexts. It is not owned, operated, or endorsed by any municipal, state, or central government body of India.


## 🎯 PROJECT OVERVIEW / प्रोजेक्ट का अवलोकन

### What is JANKALYAN?
**JANKALYAN** is a complete web application that helps Indian citizens discover and access government welfare schemes. It's a platform that brings together information about 480+ government programs across different categories.



## 📁 Project Structure 

jankalyan/
├── 📄 index.html             # Home page with search, live feed, and categories
├── 📄 student.html           # Student schemes database layout
├── 📄 health.html            # Health schemes database layout
├── 📄 housing.html           # Housing schemes database layout
├── 📄 service.html           # Service schemes database layout
├── 📄 about.html             # About the portal and its mission
├── 📄 eligibility.html       # Smart eligibility checker and screening logic
├── 📄 login.html             # User authentication gateway
├── 📄 donate.html            # Contribution page with verification hooks
├── 📄 schemes-by-state.html  # State-wise scheme matrix listings
│
├── 📁 css/
│   └── 🎨 style.css          # Main styling framework, color variables, and media rules
│
└── 📁 js/
    ├── ⚙️ script.js          # App controller, scroll animations, and search functions
    ├── ⚙️ validation.js      # Form validation logic (Email, Phone, Aadhaar, PAN)
    ├── ⚙️ student.js         # Student scheme database arrays
    ├── ⚙️ health.js          # Health scheme database arrays
    ├── ⚙️ housing.js         # Housing scheme database arrays
    └── ⚙️ service.js         # Service scheme database arrays

---

## 🏗️ TECHNOLOGY STACK / तकनीकें

### Frontend (User Interface)
- **HTML5** - Page structure (पृष्ठ संरचना)
- **CSS3** - Styling and design (स्टाइलिंग)
- **Vanilla JavaScript** - No frameworks needed (कोई framework नहीं)
- **LocalStorage** - User data storage (यूजर डेटा स्टोरेज)

### Design
- Responsive design (सभी devices पर काम करता है)
- Mobile-friendly (मोबाइल के लिए optimized)
- Modern UI/UX principles (आधुनिक डिजाइन)

---

## 📄 KEY FILES EXPLAINED / मुख्य फाइलों की व्याख्या

### 1. **index.html** - Home Page
- Navigation bar with menu
- Hero section with main tagline
- Live news ticker
- Search/filter functionality
- Category cards (4 main sections)
- Featured schemes section
- Quote carousel
- Footer with links

### 2. **style.css** - All Styling
- CSS variables for colors (रंगों के लिए variables)
- Responsive grid layouts
- Navbar styling with glassmorphism
- Card designs for schemes
- Mobile-first approach

### 3. **script.js** - Main Functionality
- Navbar scroll effect (जब page scroll हो तो navbar बदलता है)
- Login/logout management
- News API integration
- Scheme search & filtering
- Quote carousel rotation

### 4. **validation.js** - Form Validation
- Email validation
- Phone number check (Indian format - 10 digits)
- Aadhaar validation (12 digits)
- PAN validation
- Income, age, amount checks
- Date validation

### 5. **student.js, health.js, housing.js, service.js**
- Data arrays containing scheme information
- Each scheme has: title, benefits, eligibility, documents needed
- Used to display schemes on respective pages

---

## 🎓 SCHEME CATEGORIES / योजना श्रेणियां

### 1. **Student Welfare** (छात्र कल्याण)
- Scholarships (छात्रवृत्ति)
- Education loans (शिक्षा ऋण)
- Fellowships (फेलोशिप)
- Skill development (कौशल विकास)

### 2. **Health & Medical** (स्वास्थ्य)
- Ayushman Bharat (₹5 lakh health cover)
- Maternal care (माता देखभाल)
- Immunization (टीकाकरण)
- Free treatment (मुफ्त इलाज)

### 3. **Housing & Shelter** (आवास)
- PMAY Rural (ग्रामीण आवास)
- PMAY Urban (शहरी आवास)
- Home loan subsidy (गृह ऋण सब्सिडी)
- Slum rehabilitation (झुग्गी पुनर्वास)

### 4. **Essential Services** (आवश्यक सेवाएं)
- MGNREGA Employment (100 दिन का रोजगार)
- Food security / Ration (राशन)
- Electricity (Saubhagya)
- Water (Jal Jeevan Mission)
- LPG connection (PMUY)

---

## 👥 USER TYPES / उपयोगकर्ता के प्रकार

1. **Individual Citizen** - आम नागरिक
2. **CSC Operator** - Common Service Centre चलाने वाले
3. **NGO/Organization** - गैर-लाभकारी संगठन
4. **Government Official** - सरकारी कर्मचारी

---

## 🔄 HOW IT WORKS / यह कैसे काम करता है

### User Journey:
1. User विजिट करता है **index.html** (homepage)
2. Navbar से scheme category चुनता है
3. JavaScript data को **[category].js** से load करता है
4. Schemes को cards में display करता है
5. User एक scheme पर click करता है
6. Detailed information दिखता है


## ✨ KEY FEATURES / मुख्य विशेषताएं

### 1. **Search & Filter** (खोज करें)
- Real-time scheme search
- Filter by category
- Filter by benefits

### 2. **Eligibility Checker** (पात्रता जांच)
- Form-based eligibility check
- Income criteria matching
- Category-based filtering

### 3. **Responsive Design** (सभी डिवाइस पर)
- Desktop view
- Tablet view
- Mobile view (hamburger menu)

### 4. **User Authentication**
- Multiple user types
- LocalStorage-based session
- Profile menu

### 5. **News & Updates** 
- Live news ticker
- API integration
- Fallback news data

---

## 📊 DATA STRUCTURE / डेटा संरचना

### Each Scheme Object:
```javascript
{
  title: "Scheme Name",            
  tag: "Category/Type",      
  description: "What it offers",        
  benefit: "₹X amount or benefit",
  ministry: "Ministry Name",          
  eligibility: "Criteria",                 
  income: "Income limit",                 
  documents: ["doc1", "doc2"],            
  howToApply: "Steps",                   
  applyLink: "URL"                      
}
```

---

## 🎨 DESIGN SYSTEM / डिजाइन सिस्टम

### Colors Used:
- **Navy Blue** (#0F1F3D) - Main text
- **Emerald Green** (#0D7A5F) - Accent
- **Saffron** (#FF9933) - Highlight (India's flag)
- **White** (#FFFFFF) - Clean space
- **Cream** (#F8F5F0) - Light background

### Typography:
- **Fraunces** - Headings 
- **DM Sans** - Body text 


---

## 🔒 DATA STORAGE / डेटा स्टोरेज

### LocalStorage Usage:
```javascript
// User login data को store करता है
localStorage.setItem('jankalyanUser', JSON.stringify({
  isLoggedIn: true,
  userType: 'citizen',
  name: 'User Name'
}));

// Pop-up status track करता है
sessionStorage.setItem('popupDismissed', 'true');
```

---



## 🎯 Learning Outcomes / सीखने के फायदे

इस project से आपने सीखा:
1. ✅ HTML5 - Semantic markup
2. ✅ CSS3 - Responsive design, Grid, Flexbox
3. ✅ JavaScript - DOM manipulation, Events
4. ✅ Data structures - Arrays, Objects
5. ✅ Form validation - User input checks
6. ✅ LocalStorage - Browser data persistence
7. ✅ API Integration - News API usage
8. ✅ UX/UI Principles - User-centered design

---

## 🔗 Important Links / महत्वपूर्ण लिंक्स

- **Home**: index.html
- **Student Schemes**: student.html
- **Health Schemes**: health.html
- **Housing Schemes**: housing.html
- **Services**: service.html
- **Eligibility Check**: eligibility.html
- **Login**: login.html
- **About**: about.html
- **Donate**: donate.html

---

