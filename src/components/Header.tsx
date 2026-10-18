import React from 'react';
import { Printer, GraduationCap, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPrint }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand single text element */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <a href="#" className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-indigo-600 transition-colors">
              Not Ortalaması Sistemi
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#hesaplama" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Hesaplayıcı
            </a>
            <a href="#senaryolar" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Örnek Senaryolar
            </a>
            <a href="#formul" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Hesaplama Mantığı
            </a>
            <a href="#kod" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Ödev Kodları
            </a>
            <a href="#imza" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              İmza & Onay
            </a>
          </nav>

          {/* Zone 3: 1 Primary CTA Button */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 mr-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Enes Öztürk Ödevi</span>
            </div>
            <button
              onClick={onPrint}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Raporu Yazdır / PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
