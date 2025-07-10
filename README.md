# Starlight PO Generator

A beautiful, modern web application for creating and managing purchase order requests. Built with React and designed with a focus on exceptional UI/UX.

## Features

✨ **Beautiful Modern UI** - Clean, professional design with animations and smooth interactions  
📋 **Comprehensive Forms** - Complete purchase order data collection  
🎯 **Form Validation** - Real-time validation with helpful error messages  
📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile  
🎨 **Starlight Theme** - Custom branding with gradient backgrounds and modern styling  
🎫 **Ticketing Integration** - Ready for integration with ticketing systems  
💫 **Smooth Animations** - Framer Motion powered transitions and micro-interactions  

## Screenshots

The application features:
- **Header**: Beautiful header with Starlight branding and system status
- **Form Sections**: Organized sections for requestor info, vendor details, order information, and items
- **Dynamic Items**: Add/remove items with automatic total calculations
- **Success Modal**: Confirmation modal with ticket number and order summary

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd "PO Creation"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

## Project Structure

```
starlight-po-generator/
├── public/
│   ├── index.html          # Main HTML template
│   └── manifest.json       # Web app manifest
├── src/
│   ├── components/
│   │   ├── Header.js       # Header component with branding
│   │   ├── POForm.js       # Main purchase order form
│   │   └── SuccessModal.js # Success confirmation modal
│   ├── App.js              # Main app component
│   └── index.js            # React entry point
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Form Fields

### Requestor Information
- Full Name (required)
- Email Address (required)
- Department (required)
- Manager/Approver (required)

### Vendor Information
- Vendor Name (required)
- Vendor Contact
- Vendor Email
- Vendor Phone

### Order Details
- Project/Cost Center
- Required By Date (required)
- Priority (required)
- Budget Code

### Items & Services
- Dynamic item list with description, quantity, unit price, and auto-calculated totals
- Add/remove items functionality
- Total amount calculation

### Additional Information
- Business Justification (required)
- Special Instructions

## Deployment to Render

This application is optimized for deployment on Render. Follow these steps:

### 1. Prepare for Deployment

Make sure your `package.json` has the correct build and serve commands:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "serve": "serve -s build -l 3000"
  }
}
```

### 2. Deploy to Render

1. **Connect to Render**
   - Go to [render.com](https://render.com) and sign up/login
   - Connect your GitHub repository

2. **Create a Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Choose the branch to deploy

3. **Configure the Service**
   - **Name**: `starlight-po-generator`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run serve`
   - **Auto-Deploy**: `Yes`

4. **Environment Variables** (if needed)
   Add any environment variables for ticketing system integration

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - You'll get a URL like `https://starlight-po-generator.onrender.com`

### 3. Custom Domain (Optional)

If you have a custom domain:
1. Go to your service settings in Render
2. Add your custom domain
3. Update your DNS records as instructed

## Ticketing System Integration

The application is designed to forward purchase order requests to a ticketing system. Currently, it:

1. **Collects comprehensive data** from the form
2. **Generates a ticket number** (format: PO-YYYYMMDD-XXXX)
3. **Displays success confirmation** with all submitted details

### To integrate with your ticketing system:

1. **Update the `handleFormSubmit` function** in `src/App.js`
2. **Add your ticketing API endpoint**
3. **Configure authentication** if required
4. **Handle API responses** and error states

Example integration:

```javascript
const handleFormSubmit = async (formData) => {
  try {
    const response = await fetch('/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      setSubmittedData(formData);
      setShowSuccessModal(true);
    }
  } catch (error) {
    console.error('Failed to submit ticket:', error);
    // Handle error state
  }
};
```

## Customization

### Styling
- Colors and themes can be adjusted in styled-components
- The application uses a purple-blue gradient theme that can be customized
- Font family is set to Inter for modern readability

### Branding
- Update the logo and company name in `src/components/Header.js`
- Modify colors in the styled-components throughout the application
- Update the manifest.json for PWA branding

### Form Fields
- Add or modify form fields in `src/components/POForm.js`
- Update validation rules as needed
- Customize the success modal to show relevant information

## Technologies Used

- **React 18** - Modern React with hooks
- **Styled Components** - CSS-in-JS styling solution
- **Framer Motion** - Animation library for smooth interactions
- **React Hook Form** - Form handling and validation
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is created for business use. Customize as needed for your organization.

## Support

For questions or customization requests, please provide more details about:
- Specific ticketing system integration requirements
- Additional form fields needed
- Custom branding requirements
- API endpoint specifications 