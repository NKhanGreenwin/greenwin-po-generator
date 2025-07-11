import jsPDF from 'jspdf';

export const generatePDF = (formData) => {
  const doc = new jsPDF();
  
  // Set up document properties
  doc.setProperties({
    title: 'Purchase Order Request',
    subject: 'Greenwin Corp Purchase Order',
    author: 'Greenwin Corp',
    creator: 'PO Generator'
  });

  // Colors
  const primaryColor = [15, 81, 50]; // #0f5132
  const lightGray = [248, 250, 252]; // #f8fafc
  const darkGray = [55, 65, 81]; // #374151

  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 220, 25, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('GREENWIN CORP', 20, 15);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Purchase Order Request', 140, 15);

  // Reset text color
  doc.setTextColor(...darkGray);

  let yPosition = 40;

  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Purchase Order Request', 20, yPosition);
  yPosition += 15;

  // Date and PO Number
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const currentDate = new Date().toLocaleDateString();
  doc.text(`Date: ${currentDate}`, 20, yPosition);
  doc.text(`PO Request #: GW-${Date.now().toString().slice(-6)}`, 140, yPosition);
  yPosition += 15;

  // Requestor Information Section
  yPosition = addSection(doc, yPosition, 'REQUESTOR INFORMATION', [
    ['Name:', formData.requesterName || 'N/A'],
    ['Email:', formData.requesterEmail || 'N/A']
  ]);

  // Property & Work Details Section
  yPosition = addSection(doc, yPosition, 'PROPERTY & WORK DETAILS', [
    ['Property:', formData.property || 'N/A'],
    ['Property Code:', formData.propertyCode || 'N/A'],
    ['Unit Number:', formData.unitNumber || 'N/A'],
    ['Work Description:', formData.descriptionOfWork || 'N/A'],
    ['Priority:', formData.priority || 'N/A'],
    ['Required Date:', formData.requiredDate || 'N/A']
  ]);

  // Vendor Information Section
  yPosition = addSection(doc, yPosition, 'VENDOR INFORMATION', [
    ['Vendor/Supplier Name:', formData.vendorName || 'N/A']
  ]);

  // Check if we need a new page for items
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }

  // Items & Pricing Section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('ITEMS & PRICING', 20, yPosition);
  yPosition += 10;

  // Items table header
  doc.setFillColor(...lightGray);
  doc.rect(20, yPosition, 170, 8, 'F');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Description', 22, yPosition + 5);
  doc.text('Qty', 100, yPosition + 5);
  doc.text('Unit Price', 120, yPosition + 5);
  doc.text('GL Code', 145, yPosition + 5);
  doc.text('Total', 175, yPosition + 5);
  yPosition += 12;

  // Items
  doc.setFont('helvetica', 'normal');
  if (formData.items && formData.items.length > 0) {
    formData.items.forEach((item, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      const qty = parseFloat(item.qty) || 1;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      const total = qty * unitPrice;

      doc.text(item.description.substring(0, 35) || 'N/A', 22, yPosition);
      doc.text(qty.toString(), 100, yPosition);
      doc.text(`$${unitPrice.toFixed(2)}`, 120, yPosition);
      doc.text(item.glCode || 'N/A', 145, yPosition);
      doc.text(`$${total.toFixed(2)}`, 175, yPosition);
      
      yPosition += 8;
      
      // Add expense type on next line if available
      if (item.expenseType) {
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Expense Type: ${item.expenseType}`, 22, yPosition);
        doc.setFontSize(9);
        doc.setTextColor(...darkGray);
        yPosition += 6;
      }
    });
  }

  yPosition += 5;

  // Totals
  const subtotal = parseFloat(formData.subtotal) || 0;
  const hst = parseFloat(formData.hst) || 0;
  const total = parseFloat(formData.totalWithHST) || 0;

  doc.setFont('helvetica', 'bold');
  doc.text('Subtotal:', 140, yPosition);
  doc.text(`$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 175, yPosition);
  yPosition += 8;

  doc.text('HST (13%):', 140, yPosition);
  doc.text(`$${hst.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 175, yPosition);
  yPosition += 8;

  doc.setFillColor(...primaryColor);
  doc.rect(135, yPosition - 3, 55, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL:', 140, yPosition + 3);
  doc.text(`$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 175, yPosition + 3);

  // Footer
  doc.setTextColor(...darkGray);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Generated on ${currentDate} | Page ${i} of ${pageCount}`, 20, 285);
    doc.text('Greenwin Corp - Purchase Order System', 140, 285);
  }

  return doc;
};

// Helper function to add sections
const addSection = (doc, yPosition, title, fields) => {
  // Section title
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 20, yPosition);
  yPosition += 10;

  // Fields
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  fields.forEach(([label, value]) => {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.text(label, 22, yPosition);
    doc.setFont('helvetica', 'normal');
    
    // Handle long text wrapping
    const maxWidth = 130;
    const textLines = doc.splitTextToSize(value || 'N/A', maxWidth);
    
    if (textLines.length > 1) {
      textLines.forEach((line, index) => {
        doc.text(line, 70, yPosition + (index * 5));
      });
      yPosition += (textLines.length * 5) + 3;
    } else {
      doc.text(value || 'N/A', 70, yPosition);
      yPosition += 8;
    }
  });

  return yPosition + 10;
};

export const downloadPDF = (formData, filename = 'purchase-order-request.pdf') => {
  const doc = generatePDF(formData);
  doc.save(filename);
};

export const openPDFInNewTab = (formData) => {
  const doc = generatePDF(formData);
  const pdfBlob = doc.output('blob');
  const url = URL.createObjectURL(pdfBlob);
  window.open(url, '_blank');
}; 