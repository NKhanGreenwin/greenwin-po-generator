import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_greenwin_po'; // You'll need to set this up in EmailJS
const EMAILJS_TEMPLATE_ID = 'template_po_request'; // You'll need to create this template
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // You'll need to get this from EmailJS

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendPurchaseOrderEmail = async (formData) => {
  try {
    // Format the items for email
    const itemsText = formData.items && formData.items.length > 0 
      ? formData.items.map((item, index) => {
          const qty = parseFloat(item.qty) || 1;
          const unitPrice = parseFloat(item.unitPrice) || 0;
          const total = qty * unitPrice;
          
          return `Item ${index + 1}:
Description: ${item.description || 'N/A'}
Quantity: ${qty}
Unit Price: $${unitPrice.toFixed(2)}
GL Code: ${item.glCode || 'N/A'}
Expense Type: ${item.expenseType || 'N/A'}
Total: $${total.toFixed(2)}`;
        }).join('\n\n')
      : 'No items specified';

    // Format the date
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // Generate ticket number
    const generateTicketNumber = () => {
      const prefix = 'PO';
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `${prefix}-${date}-${random}`;
    };

    const ticketNumber = generateTicketNumber();

    // Prepare email template parameters
    const templateParams = {
      to_email: 'Starlight_Po@greenwin.freshservice.com',
      ticket_number: ticketNumber,
      subject: `Purchase Order Request - ${ticketNumber}`,
      
      // Requestor Information
      requestor_name: formData.requesterName || 'N/A',
      requestor_email: formData.requesterEmail || 'N/A',
      
      // Property & Work Details
      property: formData.property || 'N/A',
      property_code: formData.propertyCode || 'N/A',
      unit_number: formData.unitNumber || 'N/A',
      required_date: formatDate(formData.requiredDate),
      priority: formData.priority || 'N/A',
      description_of_work: formData.descriptionOfWork || 'N/A',
      
      // Vendor Information
      vendor_name: formData.vendorName || 'N/A',
      
      // Items & Pricing
      items_list: itemsText,
      subtotal: formData.subtotal ? `$${parseFloat(formData.subtotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '$0.00',
      hst: formData.hst ? `$${parseFloat(formData.hst).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '$0.00',
      total: formData.totalWithHST ? `$${parseFloat(formData.totalWithHST).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '$0.00',
      
      // Metadata
      submitted_at: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }),
      
      // Full email body
      email_body: `
PURCHASE ORDER REQUEST - ${ticketNumber}

=====================================
REQUESTOR INFORMATION
=====================================
Name: ${formData.requesterName || 'N/A'}
Email: ${formData.requesterEmail || 'N/A'}

=====================================
PROPERTY & WORK DETAILS
=====================================
Property: ${formData.property || 'N/A'}
Property Code: ${formData.propertyCode || 'N/A'}
Unit Number: ${formData.unitNumber || 'N/A'}
Required By Date: ${formatDate(formData.requiredDate)}
Priority: ${formData.priority || 'N/A'}
Description of Work: ${formData.descriptionOfWork || 'N/A'}

=====================================
VENDOR INFORMATION
=====================================
Vendor/Supplier Name: ${formData.vendorName || 'N/A'}

=====================================
ITEMS & PRICING
=====================================
${itemsText}

=====================================
PRICING SUMMARY
=====================================
Subtotal: ${formData.subtotal ? `$${parseFloat(formData.subtotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '$0.00'}
HST (13%): ${formData.hst ? `$${parseFloat(formData.hst).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '$0.00'}
TOTAL: ${formData.totalWithHST ? `$${parseFloat(formData.totalWithHST).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '$0.00'}

=====================================
SUBMISSION DETAILS
=====================================
Ticket Number: ${ticketNumber}
Submitted At: ${new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })}

This is an automated purchase order request from the Greenwin PO Generator system.
      `
    };

    // Send email using EmailJS
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', result);
    return {
      success: true,
      ticketNumber,
      message: 'Purchase order request sent successfully!'
    };

  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      error: error.message || 'Failed to send email',
      message: 'Failed to send purchase order request. Please try again.'
    };
  }
};

// Alternative direct email sending function (fallback)
export const sendDirectEmail = async (formData) => {
  try {
    const ticketNumber = `PO-${Date.now().toString().slice(-6)}`;
    
    // For now, we'll use a simple approach that works without EmailJS configuration
    // This creates a mailto link that opens the user's email client
    const emailSubject = `Purchase Order Request - ${ticketNumber}`;
    const emailBody = encodeURIComponent(`
PURCHASE ORDER REQUEST - ${ticketNumber}

REQUESTOR INFORMATION:
Name: ${formData.requesterName || 'N/A'}
Email: ${formData.requesterEmail || 'N/A'}

PROPERTY & WORK DETAILS:
Property: ${formData.property || 'N/A'}
Property Code: ${formData.propertyCode || 'N/A'}
Unit Number: ${formData.unitNumber || 'N/A'}
Required By Date: ${formData.requiredDate || 'N/A'}
Priority: ${formData.priority || 'N/A'}
Description of Work: ${formData.descriptionOfWork || 'N/A'}

VENDOR INFORMATION:
Vendor/Supplier Name: ${formData.vendorName || 'N/A'}

ITEMS & PRICING:
${formData.items && formData.items.length > 0 
  ? formData.items.map((item, index) => `Item ${index + 1}: ${item.description || 'N/A'} - Qty: ${item.qty || 1} - Price: $${(parseFloat(item.unitPrice) || 0).toFixed(2)}`).join('\n')
  : 'No items specified'
}

TOTAL AMOUNT: $${formData.totalWithHST || '0.00'}

Submitted at: ${new Date().toLocaleString()}
    `);

    const mailtoLink = `mailto:Starlight_Po@greenwin.freshservice.com?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`;
    
    // Open the user's email client
    window.open(mailtoLink, '_blank');
    
    return {
      success: true,
      ticketNumber,
      message: 'Email client opened. Please send the email to complete your request.'
    };
    
  } catch (error) {
    console.error('Failed to open email client:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to open email client. Please contact support.'
    };
  }
}; 