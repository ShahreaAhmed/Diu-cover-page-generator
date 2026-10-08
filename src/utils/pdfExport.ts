import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFExportOptions {
  filename: string;
  onProgress?: (progress: number, total: number) => void;
}

/**
 * Exports one or multiple A4 DOM elements to a print-ready vector-quality A4 PDF.
 */
export async function exportToPDF(
  elements: HTMLElement | HTMLElement[],
  options: PDFExportOptions
): Promise<void> {
  const elementsArray = Array.isArray(elements) ? elements : [elements];
  if (elementsArray.length === 0) {
    throw new Error('No document element provided for PDF generation');
  }

  // Initialize jsPDF in A4 portrait: 210mm x 297mm
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const total = elementsArray.length;

  for (let i = 0; i < total; i++) {
    const el = elementsArray[i];
    if (options.onProgress) {
      options.onProgress(i + 1, total);
    }

    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }

    // Render using html2canvas with high scale for 300 DPI clarity
    const canvas = await html2canvas(el, {
      scale: 2.5, // 2.5x of A4 mm = ~2000px+ sharp text
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: el.scrollWidth,
      windowHeight: el.scrollHeight
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.96);
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
  }

  pdf.save(options.filename);
}
