/**
 * Academic Date Utilities and Strict DIU Performance Date Validation Rules
 */

export interface DateValidationResult {
  isValid: boolean;
  error?: string;
  clearedPerformanceDate?: boolean;
}

/**
 * Format a YYYY-MM-DD date string to formal academic English:
 * e.g. "2026-10-25" -> "25 October 2026"
 */
export function formatAcademicDate(dateStr?: string): string {
  if (!dateStr || typeof dateStr !== 'string' || !dateStr.trim()) {
    return '';
  }

  const parts = dateStr.split('-');
  if (parts.length !== 3) {
    return dateStr;
  }

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return dateStr;
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (month < 0 || month > 11) {
    return dateStr;
  }

  const paddedDay = day < 10 ? `0${day}` : `${day}`;
  return `${paddedDay} ${monthNames[month]} ${year}`;
}

/**
 * Given a Submission Date (YYYY-MM-DD), calculates the maximum allowed Performance Date (one day prior).
 * Returns YYYY-MM-DD or undefined if no valid submission date is supplied.
 */
export function getMaxPerformanceDate(submissionDate?: string): string | undefined {
  if (!submissionDate || !submissionDate.trim()) {
    return undefined;
  }

  const [yearStr, monthStr, dayStr] = submissionDate.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return undefined;
  }

  // Create date and subtract 1 day
  const date = new Date(year, month, day);
  date.setDate(date.getDate() - 1);

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  return `${y}-${m}-${d}`;
}

/**
 * Validates if performance date is strictly earlier than submission date.
 * Returns true if valid or if performanceDate is empty (optional).
 */
export function isPerformanceDateValid(
  performanceDate: string,
  submissionDate: string
): { isValid: boolean; reason?: string } {
  // Performance date is optional
  if (!performanceDate || !performanceDate.trim()) {
    return { isValid: true };
  }

  // If performance date is present, submission date is mandatory
  if (!submissionDate || !submissionDate.trim()) {
    return {
      isValid: false,
      reason: 'Submission Date must be selected before specifying Performance Date.'
    };
  }

  // Both are in YYYY-MM-DD format, string comparison works identically to date comparison
  if (performanceDate >= submissionDate) {
    return {
      isValid: false,
      reason: 'Performance Date must be strictly earlier than the Submission Date.'
    };
  }

  return { isValid: true };
}

/**
 * Handles the change of Submission Date and checks if existing Performance Date must be cleared.
 */
export function handleSubmissionDateChange(
  newSubmissionDate: string,
  currentPerformanceDate: string
): {
  newPerformanceDate: string;
  wasCleared: boolean;
  message?: string;
} {
  if (!currentPerformanceDate || !currentPerformanceDate.trim()) {
    return {
      newPerformanceDate: '',
      wasCleared: false
    };
  }

  // If submission date is cleared, performance date must be cleared as well
  if (!newSubmissionDate || !newSubmissionDate.trim()) {
    return {
      newPerformanceDate: '',
      wasCleared: true,
      message: 'Performance Date was cleared because Submission Date was removed.'
    };
  }

  // If existing performance date is equal to or later than the new submission date
  if (currentPerformanceDate >= newSubmissionDate) {
    return {
      newPerformanceDate: '',
      wasCleared: true,
      message: 'Performance Date was cleared because it must be earlier than the Submission Date.'
    };
  }

  return {
    newPerformanceDate: currentPerformanceDate,
    wasCleared: false
  };
}
