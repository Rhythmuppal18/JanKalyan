/* ============================================================
   JANKALYAN — Form Validation Utility / फॉर्म वेरिफाई करने के लिए
   
   PURPOSE: Validate user input before submitting forms
   मकसद: जब user कोई form भरे, उसे verify करना
   
   VALIDATION RULES:
   - Email format validation
   - Indian phone number (10 digits, starts with 6-9)
   - PAN format (India's tax ID)
   - Aadhaar number (12 digits)
   - Name validation (no numbers)
   - PIN code (6 digits)
   - Income, age, amount checks
   - Date format validation
   
   USAGE: Validators.email(value), Validators.phone(value), etc.
   ============================================================ */

// ── FORM VALIDATORS OBJECT ───────────────────────────────────
// यह एक object है जिसमें सभी validation functions हैं
// हर function एक rule को check करता है

const Validators = {
  // EMAIL VALIDATION
  // Email की format को check करता है (abc@xyz.com जैसा होना चाहिए)
  email: (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  },

  // PHONE VALIDATION - Indian format
  // भारतीय mobile number को verify करता है
  // Rules:
  // 1. Exactly 10 digits
  // 2. पहली digit 6-9 के बीच होनी चाहिए (क्योंकि Indian numbers ऐसे start होते हैं)
  phone: (value) => {
    // पहले spaces और dashes को remove करो
    const cleaned = value.replace(/[\s\-()]/g, '');
    
    // Check करो कि exactly 10 digits हैं या नहीं
    if (cleaned.length !== 10) {
      return false;
    }
    
    // Check करो कि सभी characters digits हैं
    if (!/^\d+$/.test(cleaned)) {
      return false;
    }
    
    // पहली digit 6, 7, 8, या 9 होनी चाहिए
    const firstDigit = parseInt(cleaned[0]);
    if (firstDigit < 6 || firstDigit > 9) {
      return false;
    }
    
    return true;
  },

  // PAN VALIDATION - Permanent Account Number (India)
  // Format: AAAAA0000A (5 letters, 4 numbers, 1 letter)
  pan: (value) => {
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return regex.test(value.toUpperCase());
  },

  // AADHAAR VALIDATION - Unique Identity Number (12 digits)
  // Aadhaar एक 12-digit unique ID है जो सभी Indians को दिया जाता है
  aadhaar: (value) => {
    const regex = /^\d{12}$/;
    return regex.test(value.replace(/[\s\-]/g, ''));
  },

  // NAME VALIDATION
  // नाम में कम से कम 3 characters होने चाहिए और कोई numbers नहीं
  name: (value) => {
    const regex = /^[a-zA-Z\s]{3,}$/;
    return regex.test(value.trim());
  },

  // PIN CODE VALIDATION - 6 digits
  // Postal Index Number - भारत के हर शहर को एक unique code दिया जाता है
  pincode: (value) => {
    const regex = /^\d{6}$/;
    return regex.test(value);
  },

  // INCOME VALIDATION
  // Income positive number होनी चाहिए
  income: (value) => {
    return /^\d+$/.test(value) && parseInt(value) > 0;
  },

  // AGE VALIDATION
  // Age 18 से 120 के बीच होनी चाहिए
  age: (value) => {
    const age = parseInt(value);
    return age >= 18 && age <= 120;
  },

  // AMOUNT VALIDATION - Donation के लिए
  // Minimum ₹100 donate करना जरूरी है
  amount: (value) => {
    const amount = parseInt(value);
    return amount >= 100;
  },

  // DATE VALIDATION - YYYY-MM-DD format में
  // Format को check करो और फिर valid date है या नहीं भी check करो
  date: (value) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(value)) return false;
    const date = new Date(value);
    return date instanceof Date && !isNaN(date);
  },

  // REQUIRED FIELD VALIDATION
  // Field को खाली नहीं छोड़ा जा सकता
  required: (value) => {
    return value && value.toString().trim().length > 0;
  },

  // MINIMUM LENGTH CHECK
  // Value में कम से कम X characters होने चाहिए
  minLength: (value, length) => {
    return value.toString().trim().length >= length;
  },

  // MAXIMUM LENGTH CHECK
  // Value में ज्यादा से ज्यादा X characters हो सकते हैं
  maxLength: (value, length) => {
    return value.toString().trim().length <= length;
  }
};

// ── Form Validator Class ──────────────────────────────────────

class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.errors = {};
    this.rules = {};
    this.messages = {};

    if (!this.form) {
      console.error(`Form with ID "${formId}" not found`);
    }
  }

  // Add validation rule
  addRule(fieldName, validator, message) {
    if (!this.rules[fieldName]) {
      this.rules[fieldName] = [];
      this.messages[fieldName] = [];
    }
    this.rules[fieldName].push(validator);
    this.messages[fieldName].push(message);
    return this;
  }

  // Validate single field
  validateField(fieldName) {
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    if (!field) return true;

    const value = field.value;
    const fieldRules = this.rules[fieldName];

    if (!fieldRules) {
      this.clearFieldError(fieldName);
      return true;
    }

    let isValid = true;
    const fieldMessages = this.messages[fieldName];

    for (let i = 0; i < fieldRules.length; i++) {
      const rule = fieldRules[i];
      let valid = false;

      if (typeof rule === 'function') {
        valid = rule(value);
      } else if (rule instanceof RegExp) {
        valid = rule.test(value);
      }

      if (!valid) {
        this.setFieldError(fieldName, fieldMessages[i]);
        isValid = false;
        break;
      }
    }

    if (isValid) {
      this.clearFieldError(fieldName);
    }

    return isValid;
  }

  // Validate all fields
  validate() {
    this.errors = {};
    let isValid = true;

    for (const fieldName in this.rules) {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    }

    return isValid;
  }

  // Set error message
  setFieldError(fieldName, message) {
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    if (!field) return;

    this.errors[fieldName] = message;

    // Add error class
    field.classList.add('form-error');

    // Create/update error message display
    let errorEl = field.parentElement.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'error-message';
      field.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  // Clear error message
  clearFieldError(fieldName) {
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    if (!field) return;

    delete this.errors[fieldName];
    field.classList.remove('form-error');

    const errorEl = field.parentElement.querySelector('.error-message');
    if (errorEl) {
      errorEl.remove();
    }
  }

  // Get all errors
  getErrors() {
    return this.errors;
  }

  // Check if has errors
  hasErrors() {
    return Object.keys(this.errors).length > 0;
  }
}

// ── Pre-built Validation Rulesets ─────────────────────────────

const ValidationRules = {
  // Donation form rules
  donation: (validator) => {
    validator
      .addRule('donor-name', (v) => Validators.name(v), '✓ Name should be at least 3 characters')
      .addRule('donor-email', (v) => Validators.email(v), '✓ Please enter a valid email address')
      .addRule('donor-pan', (v) => Validators.pan(v), '✓ PAN should be in format: ABCDE1234F')
      .addRule('cause', (v) => Validators.required(v), '✓ Please select a cause');
  },

  // Eligibility checker rules
  eligibility: (validator) => {
    validator
      .addRule('name', (v) => Validators.name(v), '✓ Name should be at least 3 characters')
      .addRule('dob', (v) => Validators.date(v), '✓ Please select a valid date of birth')
      .addRule('income', (v) => Validators.income(v), '✓ Income should be a positive number')
      .addRule('category', (v) => Validators.required(v), '✓ Please select a category')
      .addRule('state', (v) => Validators.required(v), '✓ Please select your state');
  },

  // Contact form rules
  contact: (validator) => {
    validator
      .addRule('contact-name', (v) => Validators.name(v), '✓ Name should be at least 3 characters')
      .addRule('contact-email', (v) => Validators.email(v), '✓ Please enter a valid email address')
      .addRule('contact-phone', (v) => Validators.phone(v), '✓ Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9')
      .addRule('contact-message', (v) => Validators.minLength(v, 10), '✓ Message should be at least 10 characters');
  }
};

// ── Real-time Validation Helper ───────────────────────────────

function setupRealtimeValidation(validator) {
  if (!validator.form) return;

  const fields = validator.form.querySelectorAll('[name]');
  fields.forEach(field => {
    ['blur', 'change', 'input'].forEach(event => {
      field.addEventListener(event, () => {
        const fieldName = field.name;
        if (validator.rules[fieldName]) {
          validator.validateField(fieldName);
        }
      });
    });
  });
}

// ── Success Message Display ───────────────────────────────────

function showSuccessMessage(message, duration = 3000) {
  const msgEl = document.createElement('div');
  msgEl.className = 'success-message';
  msgEl.innerHTML = `
    <span style="font-size: 1.2rem; margin-right: 0.5rem;">✓</span>
    ${message}
  `;
  document.body.appendChild(msgEl);

  setTimeout(() => msgEl.classList.add('show'), 10);

  setTimeout(() => {
    msgEl.classList.remove('show');
    setTimeout(() => msgEl.remove(), 300);
  }, duration);
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FormValidator, Validators, ValidationRules, setupRealtimeValidation, showSuccessMessage };
}
