import { DocumentType } from '../types';

/**
 * Generates clean, standardized academic filenames for DIU documents
 */
export function generateFilename(
  docType: DocumentType,
  studentName?: string,
  extension: 'pdf' | 'png' | 'jpg' = 'pdf',
  pageIndex?: number
): string {
  const typeMap: Record<DocumentType, string> = {
    assignment: 'Assignment_Cover',
    lab_report: 'Lab_Report_Cover',
    final_lab_report: 'Final_Lab_Report',
    lab_index: 'Lab_Report_Index'
  };

  const docLabel = typeMap[docType] || 'Cover_Page';

  let sanitizedName = '';
  if (studentName && studentName.trim()) {
    sanitizedName = studentName
      .trim()
      .replace(/[^a-zA-Z0-9\s_-]/g, '')
      .replace(/\s+/g, '_');
  }

  let baseName = '';
  if (docType === 'lab_index' && pageIndex !== undefined) {
    if (sanitizedName) {
      baseName = `DIU_${docLabel}_${sanitizedName}_Page_${pageIndex + 1}`;
    } else {
      baseName = `DIU_Lab_Index_Page_${pageIndex + 1}`;
    }
  } else if (sanitizedName) {
    baseName = `DIU_${docLabel}_${sanitizedName}`;
  } else {
    baseName = `DIU_${docLabel}`;
  }

  return `${baseName}.${extension}`;
}
