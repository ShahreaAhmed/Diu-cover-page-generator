import html2canvas from 'html2canvas';

export interface ImageExportOptions {
  filename: string;
  format?: 'png' | 'jpg';
  quality?: number; // 0.1 to 1.0, for jpg
}

/**
 * Downloads a canvas or data URL as a file in the browser
 */
function triggerDownload(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Renders an A4 DOM element into a crisp 300-DPI equivalent canvas (approx 2480 x 3508 px)
 */
export async function renderElementToCanvas(
  element: HTMLElement,
  scale: number = 3.0
): Promise<HTMLCanvasElement> {
  return await html2canvas(element, {
    scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight
  });
}

/**
 * Exports an A4 DOM element as a high-quality PNG or JPG image.
 */
export async function exportToImage(
  element: HTMLElement,
  options: ImageExportOptions
): Promise<void> {
  const format = options.format || 'png';
  const quality = options.quality ?? 0.95;

  const canvas = await renderElementToCanvas(element, 3.0);

  if (format === 'jpg') {
    const dataUrl = canvas.toDataURL('image/jpeg', quality);
    triggerDownload(dataUrl, options.filename);
  } else {
    const dataUrl = canvas.toDataURL('image/png');
    triggerDownload(dataUrl, options.filename);
  }
}

/**
 * Exports multiple pages sequentially as images
 */
export async function exportMultiplePagesToImages(
  elements: HTMLElement[],
  baseFilename: string,
  format: 'png' | 'jpg' = 'png',
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const total = elements.length;
  for (let i = 0; i < total; i++) {
    if (onProgress) {
      onProgress(i + 1, total);
    }
    const el = elements[i];
    const pageFilename = `${baseFilename}_Page_${i + 1}.${format}`;
    await exportToImage(el, { filename: pageFilename, format });
    // Small delay between downloads so browser doesn't block multi-download
    if (i < total - 1) {
      await new Promise(resolve => setTimeout(resolve, 400));
    }
  }
}
