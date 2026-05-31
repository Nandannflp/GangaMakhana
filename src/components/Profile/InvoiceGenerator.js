import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateInvoicePDF = async (order, formatPrice) => {
  // Create a temporary container for the invoice HTML
  const invoiceContainer = document.createElement('div');
  invoiceContainer.style.position = 'absolute';
  invoiceContainer.style.top = '-9999px';
  invoiceContainer.style.left = '-9999px';
  invoiceContainer.style.width = '800px';
  invoiceContainer.style.background = '#ffffff';
  invoiceContainer.style.color = '#000000';
  invoiceContainer.style.fontFamily = 'sans-serif';
  
  // Format items
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">
        <strong>${item.name || item.flavor}</strong><br/>
        <small style="color: #666;">${item.variant || ''}</small>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${formatPrice(item.price)}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${formatPrice(item.price * item.quantity)}</td>
    </tr>
  `).join('');

  invoiceContainer.innerHTML = `
    <div style="padding: 40px; box-sizing: border-box;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px;">
        <div>
          <h1 style="margin: 0; color: #1A4331; font-size: 28px;">Ganga Makhana</h1>
          <p style="margin: 4px 0; color: #666;">Premium Quality Foxnuts</p>
        </div>
        <div style="text-align: right;">
          <h2 style="margin: 0; font-size: 24px; color: #333;">INVOICE</h2>
          <p style="margin: 4px 0; color: #666;">Order #: ${order.orderId}</p>
          <p style="margin: 4px 0; color: #666;">Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
        <div>
          <h3 style="margin: 0 0 8px 0; color: #333;">Bill To:</h3>
          <p style="margin: 2px 0;"><strong>${order.fullName}</strong></p>
          <p style="margin: 2px 0;">${order.addressLine1}</p>
          ${order.addressLine2 ? `<p style="margin: 2px 0;">${order.addressLine2}</p>` : ''}
          <p style="margin: 2px 0;">${order.city}, ${order.state} - ${order.pincode}</p>
          <p style="margin: 2px 0;">Phone: ${order.phone}</p>
          <p style="margin: 2px 0;">Email: ${order.email}</p>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <thead>
          <tr style="background: #f8f8f8;">
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
            <th style="padding: 12px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
            <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
            <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <div style="display: flex; justify-content: flex-end;">
        <div style="width: 300px;">
          <div style="display: flex; justify-content: space-between; padding: 8px 0;">
            <span>Subtotal:</span>
            <span>${formatPrice(order.subtotal)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd;">
            <span>Shipping:</span>
            <span>${order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px 0; font-weight: bold; font-size: 18px; color: #1A4331;">
            <span>Total:</span>
            <span>${formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div style="margin-top: 60px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #eee; padding-top: 20px;">
        <p>Thank you for your business!</p>
        <p>Ganga Makhana • support@gangamakhana.com</p>
      </div>
    </div>
  `;

  document.body.appendChild(invoiceContainer);

  try {
    const canvas = await html2canvas(invoiceContainer, {
      scale: 2, // Higher resolution
      useCORS: true,
      logging: false
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${order.orderId}.pdf`);
  } finally {
    document.body.removeChild(invoiceContainer);
  }
};
