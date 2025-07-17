import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Joyride from 'react-joyride';
import { 
  ShoppingCart, 
  Building, 
  User, 
  Calendar, 
  DollarSign, 
  FileText, 
  Send,
  Plus,
  Trash2,
  Store,
  Download,
  Loader2
} from 'lucide-react';
import { downloadPDF } from '../utils/pdfGenerator';

const FormContainer = styled.div`
  padding: 2.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  line-height: 1.5;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: #0f5132;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  line-height: 1.6;
  font-weight: 400;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled(motion.div)`
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.375rem;
  font-weight: 600;
  color: #0f5132;
  letter-spacing: -0.015em;
  margin: 0;
`;

const FieldGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0; /* Prevents grid overflow */
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
  letter-spacing: 0.01em;
  text-transform: none;
`;

const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 400;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #198754;
    box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }
`;

const Select = styled.select`
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 400;
  transition: all 0.2s ease;
  background: white;
  cursor: pointer;
  height: auto;
  min-height: 50px; /* Match input field height */

  &:focus {
    outline: none;
    border-color: #198754;
    box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.1);
  }

  option {
    padding: 0.5rem;
    font-size: 0.9375rem;
    font-weight: 400;
  }
`;

const GLCodeSelect = styled.select`
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.8125rem;
  font-weight: 400;
  transition: all 0.2s ease;
  background: white;
  cursor: pointer;
  height: auto;
  min-height: 50px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #198754;
    box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.1);
  }

  option {
    padding: 0.5rem;
    font-size: 0.8125rem;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const TextArea = styled.textarea`
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.5;
  transition: all 0.2s ease;
  background: white;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #198754;
    box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemRow = styled.div`
  padding: 1.25rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemTopRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 0.8fr 1.2fr auto;
  gap: 1rem;
  align-items: end;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: stretch;
  }
`;

const ItemBottomRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const RemoveButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
  }
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #198754 0%, #20c997 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.875rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(25, 135, 84, 0.3);
  }
`;

const BaseButton = styled(motion.button)`
  background: linear-gradient(135deg, #198754 0%, #0f5132 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.875rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(25, 135, 84, 0.25);
  min-width: 200px;
  height: 48px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(25, 135, 84, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SubmitButton = styled(BaseButton)``;

const PDFButton = styled(BaseButton)`
  background: linear-gradient(135deg, #198754 0%, #0f5132 100%);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.8125rem;
  font-weight: 400;
  margin-top: 0.25rem;
`;

const TotalsContainer = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border: 1px solid #e2e8f0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
  
  &.final-total {
    background: linear-gradient(135deg, #198754 0%, #0f5132 100%);
    color: white;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 0.5rem;
    font-weight: 700;
    font-size: 1.0625rem;
  }
`;

const TotalRowLabel = styled.span`
  font-size: 0.9375rem;
  font-weight: 500;
  color: #374151;
  
  .final-total & {
    color: white;
  }
`;

const TotalRowValue = styled.span`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #0f5132;
  
  .final-total & {
    color: white;
  }
`;

function POForm({ onSubmit, isSubmitting = false, runTour = false, onTourEnd }) {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const [items, setItems] = useState([{ description: '', qty: '', unitPrice: '', glCode: '', expenseType: '' }]);
  const [tourRunning, setTourRunning] = useState(runTour);
  const scenario = "Let's create a PO for new office chairs for the 2360 Weston Road property!";
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    if (runTour) setTourRunning(true);
  }, [runTour]);

  const quizQuestions = [
    {
      question: 'What information does the Priority field help determine?',
      options: ['Delivery cost', 'Processing urgency and approval workflow', 'Vendor selection'],
      answer: 1
    },
    {
      question: 'Why should you be specific in item descriptions?',
      options: ['To increase the price', 'To speed up approvals and ensure correct delivery', 'To confuse vendors'],
      answer: 1
    },
    {
      question: 'How much HST is automatically calculated?',
      options: ['10%', '13%', '15%'],
      answer: 1
    },
    {
      question: 'What happens when you select a property?',
      options: ['The property code auto-fills', 'The form resets', 'Nothing changes'],
      answer: 0
    },
    {
      question: 'Which field helps with budget tracking and financial reporting?',
      options: ['Special Instructions', 'GL Code', 'Vendor Name'],
      answer: 1
    },
    {
      question: 'How long should you typically allow for PO processing?',
      options: ['1-2 days', '5-10 business days', '1 month'],
      answer: 1
    }
  ];

  const handleQuizAnswer = (idx) => {
    if (idx === quizQuestions[quizStep].answer) setQuizScore(s => s + 1);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(s => s + 1);
    } else {
      setQuizComplete(true);
      setTimeout(() => setShowQuiz(false), 2000);
    }
  };

  const tourSteps = [
    {
      target: 'body',
      placement: 'center',
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2>👋 Welcome to PO Generator!</h2>
          <p><strong>Scenario:</strong> You need to order 6 ergonomic office chairs for your team at 2360 Weston Road</p>
          <p>This comprehensive tour covers every feature - from basic fields to advanced tips!</p>
          <p><em>🎯 Completion time: ~3 minutes</em></p>
        </div>
      ),
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      target: '[data-tour="requesterName"]',
      content: (
        <div>
          <b>👤 Full Name</b><br/>
          Enter your full legal name as it appears in company records.<br/>
          <span style={{color:'#198754'}}>✅ Tip: Use your full legal name for approval tracking</span><br/>
          <span style={{color:'#dc3545'}}>❌ Avoid: Nicknames, abbreviations, or informal names</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="requesterEmail"]',
      content: (
        <div>
          <b>📧 Email Address</b><br/>
          Your work email for notifications and approval workflows.<br/>
          <span style={{color:'#198754'}}>✅ Required for automated email notifications</span><br/>
          <span style={{color:'#f39c12'}}>⚠️ Double-check spelling - typos delay processing!</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="department"]',
      content: (
        <div>
          <b>🏢 Department</b><br/>
          Select your department for budget allocation and approval routing.<br/>
          <span style={{color:'#198754'}}>📊 This determines your budget limits and approver</span><br/>
          <span style={{color:'#17a2b8'}}>💡 Not sure? Check with HR or your manager</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="manager"]',
      content: (
        <div>
          <b>👔 Manager/Approver</b><br/>
          Who will approve this purchase? Enter their full name.<br/>
          <span style={{color:'#198754'}}>🎯 Tip: Use the exact name from the company directory</span><br/>
          <span style={{color:'#f39c12'}}>⚡ This person will receive the approval email</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="property"]',
      content: (
        <div>
          <b>🏢 Property Selection</b><br/>
          Select <strong>2360 Weston Road</strong> for our scenario.<br/>
          <span style={{color:'#198754'}}>🔄 Watch the property code auto-populate below!</span><br/>
          <span style={{color:'#17a2b8'}}>📍 This determines delivery address and budget allocation</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="requiredDate"]',
      content: (
        <div>
          <b>📅 Required By Date</b><br/>
          When do you need this delivered? Be realistic with timing.<br/>
          <span style={{color:'#198754'}}>⏰ Tip: Allow 5-10 business days for processing</span><br/>
          <span style={{color:'#dc3545'}}>🚨 Rush orders may require additional approvals</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="priority"]',
      content: (
        <div>
          <b>🔥 Priority Level</b><br/>
          Set priority based on business impact and urgency.<br/>
          <span style={{color:'#dc3545'}}>🔴 High: Critical business operations</span><br/>
          <span style={{color:'#f39c12'}}>🟡 Medium: Important but can wait</span><br/>
          <span style={{color:'#198754'}}>🟢 Low: Nice to have, flexible timing</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="budgetCode"]',
      content: (
        <div>
          <b>💼 Budget Code</b><br/>
          Optional: Specify which budget line this purchase charges to.<br/>
          <span style={{color:'#198754'}}>📊 Helps with financial tracking and reporting</span><br/>
          <span style={{color:'#17a2b8'}}>💡 Ask your finance team if unsure</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="vendorName"]',
      content: (
        <div>
          <b>🏪 Vendor/Supplier</b><br/>
          Type "Staples" and see the autocomplete in action!<br/>
          <span style={{color:'#198754'}}>🔍 Start typing to filter from approved vendors</span><br/>
          <span style={{color:'#f39c12'}}>❓ Vendor missing? Contact procurement team</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="itemDescription"]',
      content: (
        <div>
          <b>🪑 Item Description</b><br/>
          Enter: <strong>"Ergonomic Office Chair - Black"</strong><br/>
          <span style={{color:'#198754'}}>✅ Be specific: Brand, model, color, size</span><br/>
          <span style={{color:'#17a2b8'}}>🎯 Good descriptions speed up approvals</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="quantity"]',
      content: (
        <div>
          <b>🔢 Quantity</b><br/>
          Enter <strong>6</strong> for our scenario.<br/>
          <span style={{color:'#198754'}}>📦 How many units do you need?</span><br/>
          <span style={{color:'#f39c12'}}>💡 Consider future needs to bulk order efficiently</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="unitPrice"]',
      content: (
        <div>
          <b>💰 Unit Price</b><br/>
          Enter <strong>299.99</strong> per chair.<br/>
          <span style={{color:'#198754'}}>💵 Price per individual item (excluding tax)</span><br/>
          <span style={{color:'#17a2b8'}}>🔄 Total will auto-calculate below!</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="glCode"]',
      content: (
        <div>
          <b>📋 GL Code</b><br/>
          Select the appropriate accounting code for this expense type.<br/>
          <span style={{color:'#198754'}}>📊 For office furniture, try "Office and Supplies"</span><br/>
          <span style={{color:'#f39c12'}}>🤔 Unsure? Your finance team can help</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="totalsSection"]',
      content: (
        <div>
          <b>🧮 Automatic Calculations</b><br/>
          Watch totals update automatically as you enter items!<br/>
          <span style={{color:'#198754'}}>💰 Subtotal + 13% HST = Final Total</span><br/>
          <span style={{color:'#17a2b8'}}>✨ No manual math required!</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="addItemButton"]',
      content: (
        <div>
          <b>➕ Add Another Item</b><br/>
          Need multiple items? Click here to add more rows.<br/>
          <span style={{color:'#198754'}}>📝 Combine related items in one PO for efficiency</span><br/>
          <span style={{color:'#dc3545'}}>🗑️ Use the trash icon to remove unwanted items</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="businessJustification"]',
      content: (
        <div>
          <b>📝 Business Justification</b><br/>
          Explain why this purchase is necessary.<br/>
          <span style={{color:'#198754'}}>✅ Example: "Current chairs cause employee back pain, affecting productivity"</span><br/>
          <span style={{color:'#f39c12'}}>💡 Strong justifications speed approvals</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="specialInstructions"]',
      content: (
        <div>
          <b>📋 Special Instructions</b><br/>
          Optional delivery notes, setup requirements, etc.<br/>
          <span style={{color:'#198754'}}>📦 Example: "Deliver to 3rd floor conference room"</span><br/>
          <span style={{color:'#17a2b8'}}>🎯 Help vendors fulfill your request perfectly</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '.header-section',
      content: (
        <div>
          <b>🔧 Header Tools</b><br/>
          <span style={{color:'#198754'}}>💾 Save Draft: Keep your progress</span><br/>
          <span style={{color:'#f39c12'}}>🔄 Clear Form: Start over</span><br/>
          <span style={{color:'#17a2b8'}}>❓ Help: Get additional support</span><br/>
          <span style={{color:'#dc3545'}}>🔔 Notifications: System alerts</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="exportPDF"]',
      content: (
        <div>
          <b>📄 Export as PDF</b><br/>
          Download a copy for your records before submitting.<br/>
          <span style={{color:'#198754'}}>🗂️ Great for expense reports and filing</span><br/>
          <span style={{color:'#17a2b8'}}>💡 PDF includes all details and calculations</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '[data-tour="submitButton"]',
      content: (
        <div>
          <b>🚀 Submit Your PO</b><br/>
          Final step! This sends your request for approval.<br/>
          <span style={{color:'#198754'}}>✅ Email goes to your manager and procurement</span><br/>
          <span style={{color:'#f39c12'}}>⚡ You'll get a confirmation with tracking number</span>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: 'body',
      placement: 'center',
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2>🎉 Tour Complete!</h2>
          <p><strong>Pro Tips Summary:</strong></p>
          <ul style={{ textAlign: 'left', margin: '1rem 0' }}>
            <li>✅ Fill all required fields to avoid delays</li>
            <li>💰 Check budgets before large purchases</li>
            <li>📞 Contact procurement for vendor questions</li>
            <li>⏰ Allow realistic timeframes</li>
            <li>💾 Save drafts for complex orders</li>
          </ul>
          <p>Ready for a quick knowledge check?</p>
          <button onClick={() => { 
              setShowQuiz(true); 
              setQuizStep(0); 
              setQuizScore(0); 
              setQuizComplete(false);
              setTourRunning(false); // Close the tour modal
              if (onTourEnd) onTourEnd(); // Trigger tour end callback
              // Scroll to bottom of page to show the quiz
              setTimeout(() => {
                window.scrollTo({ 
                  top: document.body.scrollHeight, 
                  behavior: 'smooth' 
                });
              }, 100); // Small delay to ensure quiz renders first
            }} 
                  style={{background:'#198754', color:'white', padding:'10px 20px', border:'none', borderRadius:'8px', cursor:'pointer'}}>
            Start Quiz 🧠
          </button>
        </div>
      ),
      spotlightClicks: true,
    },
  ];

  // Property code mapping
  const propertyCodeMapping = {
    "2360 Weston Road": "west2360",
    "2450 & 2460 Weston Road": "west2450", 
    "255 & 265 Westwood Road": "west0255",
    "2200 Roche Court": "roch2200",
    "57 Forest Avenue": "fore0057",
    "772 Paisley Road, 4 Ryde Road and 3 Candlewood Drive": "pais0772",
    "160 Market Street": "mark0160",
    "145 Cosburn Avenue": "cosb0145",
    "151 Hughson Street South": "hugh0151",
    "294 Chandler Drive": "chan0286"
  };

  // GL Code options with expense types
  const glCodeOptions = [
    // Repairs & Maintenance
    { code: "5000-0100", name: "Repairs & Maintenance", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0101", name: "InSuite - Cleaning", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0103", name: "InSuite - Electrical Repairs and Supplies", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0104", name: "InSuite - Flooring Repairs", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0105", name: "InSuite - Painting & Plastering", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0106", name: "InSuite - Appliance Repairs", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0107", name: "InSuite - Maintenance Chargeback", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0108", name: "InSuite - Pest Control", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0109", name: "InSuite - Plumbing", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0300", name: "Non Contract - Repair & Maintenance", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0301", name: "Non Contract - Boiler/HVAC and Electrical", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0302", name: "Non Contract - Cleaning", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0306", name: "Non Contract - Elevator", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0307", name: "Non Contract - Fire and Life Safety", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0309", name: "Non Contract - Landscaping", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0310", name: "Non Contract - Painting and Plastering", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0312", name: "Non Contract - Parking and Garage", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0313", name: "Non Contract - Pest Control", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0314", name: "Non Contract - Plumbing Repairs", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0316", name: "Non Contract - Amenities", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0318", name: "Non Contract - Roof Repairs", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0321", name: "Non Contract - Snow Removal", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0322", name: "Non Contract - Building Supplies", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0323", name: "Non Contract - Elevator and Intercom - Telephone", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0324", name: "Non Contract - Waste Disposal", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0325", name: "Non Contract - Doors and Windows", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0327", name: "Non Contract - Security", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0335", name: "Non Contract - Property owned Vehicle costs", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0350", name: "Non Contract - Generator (Fuel & Repair)", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-0400", name: "Contract - Boiler/HVAC and Electrical", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0401", name: "Contract - Cleaning", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0403", name: "Contract - Elevator", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0404", name: "Contract - Fire and Life Safety", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0405", name: "Contract - Landscaping", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0406", name: "Contract - Pest Control", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0407", name: "Contract - Pool", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0408", name: "Contract - Snow Removal", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0409", name: "Contract - Waste Disposal", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0410", name: "Contract - Security", expenseType: "PMC Opex (Contract)" },
    { code: "5000-0411", name: "Contract - Generator", expenseType: "PMC Opex (Contract)" },
    
    // Advertising
    { code: "5000-1706", name: "Marketing Leasing Costs", expenseType: "PMC - Opex (Marketing)" },
    { code: "5000-1800", name: "Advertising and Promotion", expenseType: "PMC - Opex (Marketing)" },
    { code: "5000-1806", name: "Marketing Materials", expenseType: "PMC - Opex (Marketing)" },
    
    // General and Administration
    { code: "5000-1702", name: "Office and Supplies", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-1712", name: "Computer Licensing", expenseType: "PMC Opex (Non-Contract)" },
    { code: "5000-1717", name: "Resident and Employee events", expenseType: "PMC Opex (Non-Contract)" },
    
    // CAPEX Work
    { code: "8000-1000", name: "In-Suite Capital Cost", expenseType: "CAPEX Work" },
    { code: "8000-1001", name: "Common Area Capital Cost", expenseType: "CAPEX Work" },
    
    // Accounts for Vacant Unit Suite Turns
    { code: "8000-1200", name: "PMC - Suite Turnover - First Turn", expenseType: "Accounts for Vacant Unit Suite Turns" },
    { code: "8000-1201", name: "PMC - Suite Turnover -second/Custom Turn", expenseType: "Accounts for Vacant Unit Suite Turns" },
    { code: "8000-1202", name: "PMC - Suite Turnover -Submetering Refresh", expenseType: "Accounts for Vacant Unit Suite Turns" },
    { code: "8000-1203", name: "PMC - Suite Turnover -Suite Turnover Turn", expenseType: "Accounts for Vacant Unit Suite Turns" },
    { code: "8000-1206", name: "PMC - Suite Turnover -Standard Turns", expenseType: "Accounts for Vacant Unit Suite Turns" }
  ];



  // Watch for property changes and auto-populate property code
  const selectedProperty = watch("property");
  useEffect(() => {
    if (selectedProperty && propertyCodeMapping[selectedProperty]) {
      setValue("propertyCode", propertyCodeMapping[selectedProperty]);
    }
  }, [selectedProperty, setValue]);



  const addItem = () => {
    setItems([...items, { description: '', qty: '', unitPrice: '', glCode: '', expenseType: '' }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    
    // Auto-populate expense type when GL code is selected
    if (field === 'glCode' && value) {
      const selectedGLCode = glCodeOptions.find(option => option.code === value);
      if (selectedGLCode) {
        newItems[index]['expenseType'] = selectedGLCode.expenseType;
      }
    }
    
    setItems(newItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      const qty = parseFloat(item.qty) || 1;
      const price = parseFloat(item.unitPrice) || 0;
      return sum + (qty * price);
    }, 0);
  };

  const calculateHST = (subtotal) => {
    return subtotal * 0.13;
  };

  const calculateTotal = (subtotal, hst) => {
    return subtotal + hst;
  };

  // Format currency with commas
  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const onFormSubmit = (data) => {
    const subtotal = calculateSubtotal();
    const hst = calculateHST(subtotal);
    const total = calculateTotal(subtotal, hst);
    
    const formData = {
      ...data,
      items: items.filter(item => item.description.trim() !== ''),
      subtotal: subtotal.toFixed(2),
      hst: hst.toFixed(2),
      totalWithHST: total.toFixed(2),
      submittedAt: new Date().toISOString()
    };
    
    onSubmit(formData);
  };

  const handlePDFExport = () => {
    const formData = watch(); // Get current form values
    const subtotal = calculateSubtotal();
    const hst = calculateHST(subtotal);
    const total = calculateTotal(subtotal, hst);
    
    const pdfData = {
      ...formData,
      items: items.filter(item => item.description.trim() !== ''),
      subtotal: subtotal.toFixed(2),
      hst: hst.toFixed(2),
      totalWithHST: total.toFixed(2),
      submittedAt: new Date().toISOString()
    };
    
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `greenwin-po-request-${timestamp}.pdf`;
    downloadPDF(pdfData, filename);
  };

  return (
    <FormContainer>
      <Joyride
        steps={tourSteps}
        run={tourRunning}
        continuous
        showProgress
        showSkipButton
        styles={{ options: { zIndex: 2000 } }}
        callback={data => {
          if (data.status === 'finished' || data.status === 'skipped') {
            setTourRunning(false);
            if (onTourEnd) onTourEnd();
          }
        }}
      />
      <FormHeader>
        <Title>Create Purchase Order Request</Title>
        <Subtitle>
          Quick and easy form to submit your purchase order request
        </Subtitle>
      </FormHeader>

      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader>
            <User size={24} color="#198754" />
            <SectionTitle>Requestor Information</SectionTitle>
          </SectionHeader>
          
          <FieldGroup>
            <Field>
              <Label>Full Name *</Label>
              <Input
                {...register("requesterName", { required: "Name is required" })}
                placeholder="Enter your full name"
                data-tour="requesterName"
              />
              {errors.requesterName && <ErrorText>{errors.requesterName.message}</ErrorText>}
            </Field>
            
            <Field>
              <Label>Email Address *</Label>
              <Input
                type="email"
                {...register("requesterEmail", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="your.email@company.com"
                data-tour="requesterEmail"
              />
              {errors.requesterEmail && <ErrorText>{errors.requesterEmail.message}</ErrorText>}
            </Field>
          </FieldGroup>
        </Section>

        <Section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SectionHeader>
            <Building size={24} color="#198754" />
            <SectionTitle>Property & Work Details</SectionTitle>
          </SectionHeader>
          
          <FieldGroup>
            <Field>
              <Label>Property *</Label>
              <Select {...register("property", { required: "Property selection is required" })} data-tour="property">
                <option value="">Select Property</option>
                <option value="2360 Weston Road">2360 Weston Road</option>
                <option value="2450 & 2460 Weston Road">2450 & 2460 Weston Road</option>
                <option value="255 & 265 Westwood Road">255 & 265 Westwood Road</option>
                <option value="2200 Roche Court">2200 Roche Court</option>
                <option value="57 Forest Avenue">57 Forest Avenue</option>
                <option value="772 Paisley Road, 4 Ryde Road and 3 Candlewood Drive">772 Paisley Road, 4 Ryde Road and 3 Candlewood Drive</option>
                <option value="160 Market Street">160 Market Street</option>
                <option value="145 Cosburn Avenue">145 Cosburn Avenue</option>
                <option value="151 Hughson Street South">151 Hughson Street South</option>
                <option value="294 Chandler Drive">294 Chandler Drive</option>
              </Select>
              {errors.property && <ErrorText>{errors.property.message}</ErrorText>}
            </Field>

            <Field>
              <Label>Property Code (Auto-populated)</Label>
              <Input
                {...register("propertyCode")}
                placeholder="Select property above to auto-fill"
                readOnly
                style={{
                  backgroundColor: '#f8fafc',
                  color: '#64748b',
                  cursor: 'not-allowed'
                }}
              />
            </Field>

            <Field>
              <Label>Unit Number</Label>
              <Input
                {...register("unitNumber")}
                placeholder="Enter unit number"
              />
            </Field>
            
            <Field>
              <Label>Required By Date *</Label>
              <Input
                type="date"
                {...register("requiredDate", { required: "Required date is needed" })}
                data-tour="requiredDate"
              />
              {errors.requiredDate && <ErrorText>{errors.requiredDate.message}</ErrorText>}
            </Field>
            
            <Field>
              <Label>Priority *</Label>
              <Select {...register("priority", { required: "Priority is required" })} data-tour="priority">
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </Select>
              {errors.priority && <ErrorText>{errors.priority.message}</ErrorText>}
            </Field>
          </FieldGroup>

          <Field style={{ marginTop: '1.5rem' }}>
            <Label>Description of Work *</Label>
            <TextArea
              {...register("descriptionOfWork", { required: "Description of work is required" })}
              style={{ minHeight: '120px' }}
            />
            {errors.descriptionOfWork && <ErrorText>{errors.descriptionOfWork.message}</ErrorText>}
          </Field>
        </Section>

        <Section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <SectionHeader>
            <Store size={24} color="#198754" />
            <SectionTitle>Vendor Information</SectionTitle>
          </SectionHeader>
          
          <Field>
            <Label>Vendor/Supplier Name *</Label>
            <Input
              {...register("vendorName", { required: "Vendor/Supplier name is required" })}
              placeholder="Name of vendor or supplier"
              data-tour="vendorName"
            />
            {errors.vendorName && <ErrorText>{errors.vendorName.message}</ErrorText>}
          </Field>
        </Section>

        <Section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionHeader>
            <DollarSign size={24} color="#198754" />
            <SectionTitle>Items & Pricing</SectionTitle>
          </SectionHeader>
          
          <ItemsContainer>
            {items.map((item, index) => (
              <ItemRow key={index}>
                <ItemTopRow>
                  <Field>
                    <Label>Item Description *</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      placeholder="Describe the item or service"
                      required
                      data-tour={index === 0 ? "itemDescription" : undefined}
                    />
                  </Field>

                  <Field>
                    <Label>Qty</Label>
                    <Input
                      type="number"
                      min="1"
                      max="999"
                      value={item.qty}
                      onChange={(e) => updateItem(index, 'qty', e.target.value)}
                      placeholder="1"
                      style={{ minWidth: '80px' }}
                      data-tour={index === 0 ? "quantity" : undefined}
                    />
                  </Field>
                  
                  <Field>
                    <Label>Estimated Cost</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
                      placeholder="0.00"
                      data-tour={index === 0 ? "unitPrice" : undefined}
                    />
                  </Field>

                  {items.length > 1 && (
                    <RemoveButton type="button" onClick={() => removeItem(index)}>
                      <Trash2 size={16} />
                    </RemoveButton>
                  )}
                </ItemTopRow>

                <ItemBottomRow>
                  <Field>
                    <Label>GL Code</Label>
                    <GLCodeSelect
                      value={item.glCode}
                      onChange={(e) => updateItem(index, 'glCode', e.target.value)}
                      data-tour={index === 0 ? "glCode" : undefined}
                    >
                      <option value="">Select GL Code</option>
                      {glCodeOptions.map((option) => (
                        <option key={option.code} value={option.code}>
                          {option.code} - {option.name}
                        </option>
                      ))}
                    </GLCodeSelect>
                  </Field>

                  <Field>
                    <Label>Expense Type</Label>
                    <Input
                      value={item.expenseType}
                      readOnly
                      placeholder="Auto-populated from GL Code"
                      style={{
                        backgroundColor: '#f8fafc',
                        color: '#64748b',
                        cursor: 'not-allowed'
                      }}
                    />
                  </Field>
                </ItemBottomRow>
              </ItemRow>
            ))}
            
            <AddButton type="button" onClick={addItem} data-tour="addItemButton">
              <Plus size={16} />
              Add Another Item
            </AddButton>
          </ItemsContainer>

          <TotalsContainer data-tour="totalsSection">
            <TotalRow>
              <TotalRowLabel>Subtotal:</TotalRowLabel>
              <TotalRowValue>${formatCurrency(calculateSubtotal())}</TotalRowValue>
            </TotalRow>
            <TotalRow>
              <TotalRowLabel>HST (13%):</TotalRowLabel>
              <TotalRowValue>${formatCurrency(calculateHST(calculateSubtotal()))}</TotalRowValue>
            </TotalRow>
            <TotalRow className="final-total">
              <TotalRowLabel>Total:</TotalRowLabel>
              <TotalRowValue>${formatCurrency(calculateTotal(calculateSubtotal(), calculateHST(calculateSubtotal())))}</TotalRowValue>
            </TotalRow>
          </TotalsContainer>
        </Section>

        <ButtonContainer>
          <PDFButton
            type="button"
            onClick={handlePDFExport}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-tour="exportPDF"
          >
            <Download size={16} />
            Export as PDF
          </PDFButton>
          
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
            data-tour="submitButton"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Sending Email...
              </>
            ) : (
              <>
                <Send size={16} />
                Submit Purchase Order Request
              </>
            )}
          </SubmitButton>
        </ButtonContainer>
      </Form>
      {showQuiz && (
        <div style={{ background: '#fffbe6', borderRadius: 12, padding: 24, marginTop: 32, textAlign: 'center' }}>
          <h3>Quiz</h3>
          {!quizComplete ? (
            <>
              <p>{quizQuestions[quizStep].question}</p>
              {quizQuestions[quizStep].options.map((opt, idx) => (
                <button key={opt} onClick={() => handleQuizAnswer(idx)} style={{ margin: 8, padding: '8px 18px', borderRadius: 6, border: 'none', background: '#198754', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>{opt}</button>
              ))}
            </>
          ) : (
            <div>
              <h4>Quiz Complete!</h4>
              <p>Your Score: {quizScore} / {quizQuestions.length}</p>
              {quizScore === quizQuestions.length && <div style={{ color: '#198754', fontWeight: 700, fontSize: 18 }}>🏅 Perfect Score! You’re a PO Pro!</div>}
            </div>
          )}
        </div>
      )}
    </FormContainer>
  );
}

export default POForm; 