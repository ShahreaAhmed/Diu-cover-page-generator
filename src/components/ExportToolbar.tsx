import React, { useState } from 'react';
import { FileDown, ImageDown, Printer, Loader2, ChevronDown, Check } from 'lucide-react';

interface ExportToolbarProps {
  onExportPDF: () => Promise<void>;
  onExportImage: (format: 'png' | 'jpg') => Promise<void>;
  onPrint: () => void;
  totalPages?: number;
  isMultiPage?: boolean;
}

export const ExportToolbar: React.FC<ExportToolbarProps> = ({
  onExportPDF,
  onExportImage,
  onPrint,
  totalPages = 1,
  isMultiPage = false
}) => {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [imageFormat, setImageFormat] = useState<'png' | 'jpg'>('png');
  const [showImageDropdown, setShowImageDropdown] = useState(false);

  const handlePDF = async () => {
    if (isExportingPDF || isExportingImage) return;
    setIsExportingPDF(true);
    try {
      await onExportPDF();
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleImage = async (format: 'png' | 'jpg') => {
    if (isExportingPDF || isExportingImage) return;
    setImageFormat(format);
    setShowImageDropdown(false);
    setIsExportingImage(true);
    try {
      await onExportImage(format);
    } finally {
      setIsExportingImage(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-xs no-print">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Export Document:
        </span>
        {isMultiPage && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            {totalPages} A4 {totalPages === 1 ? 'Page' : 'Pages'}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* PDF Download Button */}
        <button
          type="button"
          onClick={handlePDF}
          disabled={isExportingPDF || isExportingImage}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-lg shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isExportingPDF ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <FileDown className="w-4 h-4" />
              <span>Download PDF</span>
            </>
          )}
        </button>

        {/* Image Download with Format Options */}
        <div className="relative inline-flex rounded-lg shadow-xs">
          <button
            type="button"
            onClick={() => handleImage(imageFormat)}
            disabled={isExportingPDF || isExportingImage}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-l-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isExportingImage ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
                <span>Generating {imageFormat.toUpperCase()}...</span>
              </>
            ) : (
              <>
                <ImageDown className="w-4 h-4 text-emerald-700" />
                <span>Download {imageFormat.toUpperCase()}</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setShowImageDropdown(!showImageDropdown)}
            disabled={isExportingPDF || isExportingImage}
            className="px-2 py-2 text-slate-600 bg-white border-y border-r border-slate-300 hover:bg-slate-50 rounded-r-lg transition-all disabled:opacity-50 cursor-pointer"
            aria-label="Select image format"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {showImageDropdown && (
            <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-slate-200 rounded-lg shadow-lg z-30 py-1 text-xs">
              <button
                type="button"
                onClick={() => handleImage('png')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-slate-700 hover:bg-slate-100 cursor-pointer text-left"
              >
                <span>PNG (Crisp 300 DPI)</span>
                {imageFormat === 'png' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
              <button
                type="button"
                onClick={() => handleImage('jpg')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-slate-700 hover:bg-slate-100 cursor-pointer text-left"
              >
                <span>JPG (High Quality)</span>
                {imageFormat === 'jpg' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            </div>
          )}
        </div>

        {/* Print Button */}
        <button
          type="button"
          onClick={onPrint}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4 text-slate-600" />
          <span>Print</span>
        </button>
      </div>
    </div>
  );
};
