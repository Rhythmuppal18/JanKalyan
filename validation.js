

const Validators = {
  email: (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  },

  phone: (value) => {
    const cleaned = value.replace(/[\s\-()]/g, '');
    
    if (cleaned.length !== 10) {
      return false;
    }
    
    if (!/^\d+$/.test(cleaned)) {
      return false;
    }
    
    const firstDigit = parseInt(cleaned[0]);
    if (firstDigit < 6 || firstDigit > 9) {
      return false;
    }
    
    return true;
  },

  pan: (value) => {
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return regex.test(value.toUpperCase());
  },

  aadhaar: (value) => {
    const regex = /^\d{12}$/;
    return regex.test(value.replace(/[\s\-]/g, ''));
  },


  name: (value) => {
    const regex = /^[a-zA-Z\s]{3,}$/;
    return regex.test(value.trim());
  },


  pincode: (value) => {
    const regex = /^\d{6}$/;
    return regex.test(value);
  },


  income: (value) => {
    return /^\d+$/.test(value) && parseInt(value) > 0;
  },

  age: (value) => {
    const age = parseInt(value);
    return age >= 18 && age <= 120;
  },


  amount: (value) => {
    const amount = parseInt(value);
    return amount >= 100;
  },

  // DATE VALIDATION - YYYY-MM-DD 

  date: (value) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(value)) return false;
    const date = new Date(value);
    return date instanceof Date && !isNaN(date);
  },

  // REQUIRED FIELD VALIDATION
  required: (value) => {
    return value && value.toString().trim().length > 0;
  },

  // MINIMUM LENGTH CHECK
  minLength: (value, length) => {
    return value.toString().trim().length >= length;
  },

  // MAXIMUM LENGTH CHECK

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
