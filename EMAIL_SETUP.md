# Email Setup Instructions

## Current Implementation

✅ **READY TO USE**: The form now automatically opens the user's email client with a pre-filled email to `Starlight_Po@greenwin.freshservice.com` when submitted.

## How It Works

When someone clicks "Submit Purchase Order Request":

1. **Form Validation**: All required fields are validated
2. **Email Preparation**: A detailed email is formatted with all purchase order information
3. **Email Client Opens**: The user's default email client opens with:
   - **To**: Starlight_Po@greenwin.freshservice.com
   - **Subject**: Purchase Order Request - [Ticket Number]
   - **Body**: Complete purchase order details including:
     - Requestor information
     - Property & work details
     - Vendor information
     - Items & pricing breakdown
     - Total amounts with HST
     - Unique ticket number

4. **User Sends Email**: User clicks "Send" in their email client to complete the request

## Advanced Email Setup (Optional)

For fully automated email sending without user interaction, you can set up EmailJS:

### 1. Create EmailJS Account
- Go to [EmailJS.com](https://www.emailjs.com/)
- Create a free account
- Create a new service (Gmail, Outlook, etc.)

### 2. Create Email Template
- Create a new template in EmailJS dashboard
- Use these template variables:
  - `{{to_email}}` - Recipient email
  - `{{subject}}` - Email subject
  - `{{email_body}}` - Full formatted email content
  - `{{ticket_number}}` - Unique ticket number

### 3. Update Configuration
In `src/utils/emailService.js`, update these values:
```javascript
const EMAILJS_SERVICE_ID = 'your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';  
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
```

### 4. Switch to Advanced Mode
In `src/App.js`, change the email function:
```javascript
// Change this line:
const emailResult = await sendDirectEmail(formData);

// To this:
const emailResult = await sendPurchaseOrderEmail(formData);
```

## Benefits of Current Setup

✅ **No Configuration Required**: Works immediately  
✅ **No External Dependencies**: Uses built-in email client  
✅ **User Control**: User can review before sending  
✅ **Reliable**: Works with any email client  
✅ **Professional**: Formatted email with all details  

## Email Format

The generated email includes:
- **Header**: Purchase Order Request with ticket number
- **Requestor Information**: Name, email
- **Property Details**: Property, code, unit, date, priority
- **Work Description**: Detailed description of work needed
- **Vendor Information**: Vendor/supplier name
- **Items & Pricing**: Complete breakdown with GL codes
- **Pricing Summary**: Subtotal, HST, and total
- **Submission Details**: Timestamp and ticket number

## Troubleshooting

**Email client doesn't open?**
- Ensure you have a default email client set up
- Try a different browser
- Check if pop-ups are blocked

**Want to change recipient email?**
- Edit the email address in `src/utils/emailService.js`
- Look for `Starlight_Po@greenwin.freshservice.com`

**Need multiple recipients?**
- Modify the `sendDirectEmail` function
- Add CC/BCC parameters to the mailto link 