import React from 'react';
import {
  Calculator,
  Atom,
  BookOpen,
  FlaskConical,
  Music,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';
import { Course } from '../types.ts';

interface CourseCardProps {
  course: Course;
  value: string;
  onChange: (value: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, value, onChange }) => {
  const numValue = value.trim() === '' ? null : Number(value);
  const isFilled = numValue !== null && !isNaN(numValue);
  const isValidRange = isFilled && numValue >= 0 && numValue <= 100;
  const isOutOfRange = isFilled && (numValue < 0 || numValue > 100);

  const renderIcon = () => {
    const iconClass = "w-5 h-5";
    switch (course.id) {
      case 'matematik':
        return <Calculator className={iconClass} />;
      case 'fizik':
        return <Atom className={iconClass} />;
      case 'turkce':
        return <BookOpen className={iconClass} />;
      case 'kimya':
        return <FlaskConical className={iconClass} />;
      case 'muzik':
        return <Music className={iconClass} />;
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  const handleAdjust = (delta: number) => {
    const current = numValue ?? 50;
    const next = current + delta;
    onChange(String(next));
  };

  return (
    <div
      className={`relative p-5 rounded-xl border transition-all duration-200 bg-white ${
        isOutOfRange
          ? 'border-amber-300 ring-1 ring-amber-200 bg-amber-50/20'
          : isValidRange
          ? 'border-slate-200 hover:border-indigo-300 shadow-xs'
          : 'border-slate-200'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              isOutOfRange
                ? 'bg-amber-100 text-amber-800'
                : isValidRange
                ? 'bg-indigo-50 text-indigo-700'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {renderIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-base leading-tight">
              {course.name}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-1">
              {course.description}
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="shrink-0 text-right">
          {isValidRange && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Dahil Edildi</span>
            </span>
          )}
          {isOutOfRange && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Kapsam Dışı</span>
            </span>
          )}
          {!isFilled && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Girilmedi</span>
            </span>
          )}
        </div>
      </div>

      {/* Input Field and Quick Steppers */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="0 - 100 arası not girin"
              className={`w-full px-3.5 py-2.5 text-lg font-mono font-semibold rounded-lg border outline-none transition-all tabular-nums ${
                isOutOfRange
                  ? 'border-amber-400 bg-white text-amber-900 focus:ring-2 focus:ring-amber-300'
                  : isValidRange
                  ? 'border-slate-300 bg-white text-slate-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100'
                  : 'border-slate-300 bg-slate-50/50 text-slate-800 focus:border-indigo-600 focus:bg-white'
              }`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 pointer-events-none">
              Puan
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleAdjust(-5)}
              title="5 Puan Düşür"
              className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleAdjust(5)}
              title="5 Puan Arttır"
              className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-slate-600 font-medium mr-1">Hızlı Not:</span>
          {[0, 50, 55, 75, 100].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(String(preset))}
              className={`text-xs px-2 py-1 rounded font-mono transition-colors cursor-pointer ${
                preset === 55
                  ? 'bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
              title={preset === 55 ? 'Geçme Notu (55)' : `${preset} Puan`}
            >
              {preset}
              {preset === 55 ? ' (Baraj)' : ''}
            </button>
          ))}
          {/* Rule Testing Button */}
          <button
            type="button"
            onClick={() => onChange('125')}
            title="Kural testi: 100 üstü geçersiz not"
            className="text-xs px-2 py-1 rounded font-mono bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            125 (Test)
          </button>
        </div>

        {/* Rule Context Message */}
        {isOutOfRange && (
          <div className="p-2.5 bg-amber-100/70 border border-amber-300 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
            <div>
              <strong className="font-semibold">Ödev Kuralı:</strong> Girilen{' '}
              <span className="font-mono font-bold">{numValue}</span> notu 0 ile 100 arasında
              olmadığı için <span className="underline font-medium">ortalamaya katılmayacaktır</span>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
