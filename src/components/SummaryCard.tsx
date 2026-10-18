import React from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { CalculationResult } from '../types.ts';

interface SummaryCardProps {
  result: CalculationResult;
  onReset: () => void;
  onSetAllTo: (score: string) => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  result,
  onReset,
  onSetAllTo,
}) => {
  const { average, isPassed, passThreshold, validCount, totalSum, excludedGrades } = result;

  const hasData = average !== null;
  const delta = hasData ? Number((average - passThreshold).toFixed(2)) : 0;
  const progressPercent = hasData ? Math.min(Math.max(average, 0), 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8 flex flex-col justify-between">
      {/* Top Section: Title & Quick Actions */}
      <div>
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Sonuç Paneli
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Dönem Sonu Not Durumu
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Tüm notları temizle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>
          </div>
        </div>

        {/* Hero Score Display */}
        <div className="py-6">
          {hasData ? (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                {isPassed ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Öğrenci Sınıfı Geçti
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-rose-800 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Öğrenci Sınıfta Kaldı
                  </span>
                )}
              </div>

              {/* Big Numerical Average */}
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl lg:text-7xl font-extrabold font-mono tracking-tight tabular-nums text-slate-900">
                  {average.toFixed(2)}
                </span>
                <span className="text-xl font-semibold text-slate-400">/ 100</span>
              </div>

              {/* Status Banner */}
              <div className="mt-3">
                <p
                  className={`text-sm font-semibold ${
                    isPassed ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {isPassed
                    ? `Tebrikler! Geçme notu olan 55'in ${delta > 0 ? `+${delta}` : '0'} puan üstündesiniz.`
                    : `Geçme barajı olan 55 puana ulaşamadınız (${delta} puan eksik).`}
                </p>
              </div>

              {/* Progress Visualizer */}
              <div className="mt-6 max-w-md mx-auto">
                <div className="flex justify-between text-xs text-slate-600 font-mono mb-1.5">
                  <span>0</span>
                  <span className="font-semibold text-indigo-700">Geçme Barajı: 55</span>
                  <span>100</span>
                </div>

                <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  {/* Passing Threshold Marker Line at 55% */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10"
                    style={{ left: '55%' }}
                    title="Geçme Eşiği (55)"
                  />
                  {/* Bar Fill */}
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isPassed ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-800">
                Geçerli Not Bekleniyor
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Ortalamanın hesaplanabilmesi için lütfen en az bir derse 0 ile 100
                arasında geçerli bir not girin.
              </p>
            </div>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block mb-1">Geçerli Ders</span>
            <span className="text-xl font-bold font-mono text-slate-800 tabular-nums">
              {validCount} <span className="text-xs font-normal text-slate-400">/ 5</span>
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block mb-1">Puan Toplamı</span>
            <span className="text-xl font-bold font-mono text-slate-800 tabular-nums">
              {totalSum}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block mb-1">Kapsam Dışı</span>
            <span
              className={`text-xl font-bold font-mono tabular-nums ${
                excludedGrades.length > 0 ? 'text-amber-600' : 'text-slate-800'
              }`}
            >
              {excludedGrades.length}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block mb-1">Geçme Notu</span>
            <span className="text-xl font-bold font-mono text-indigo-600 tabular-nums">
              {passThreshold}
            </span>
          </div>
        </div>

        {/* Rule Alert Banner if Excluded items exist */}
        {excludedGrades.length > 0 && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Ödev Kuralı Devrede:</span>{' '}
              {excludedGrades.map((item, index) => (
                <span key={item.course.id}>
                  <strong>{item.course.name}</strong> ({item.rawValue} puan)
                  {index < excludedGrades.length - 1 ? ', ' : ' '}
                </span>
              ))}
              notları 0 ile 100 aralığı dışında olduğundan ortalamaya katılmamıştır.
            </div>
          </div>
        )}
      </div>

      {/* Bottom Batch Actions */}
      <div className="pt-5 mt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Hızlı Doldur:</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onSetAllTo('55')}
            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition-colors cursor-pointer"
          >
            Tümünü 55 Yap
          </button>
          <button
            type="button"
            onClick={() => onSetAllTo('80')}
            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition-colors cursor-pointer"
          >
            Tümünü 80 Yap
          </button>
          <button
            type="button"
            onClick={() => onSetAllTo('100')}
            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition-colors cursor-pointer"
          >
            Tümünü 100 Yap
          </button>
        </div>
      </div>
    </div>
  );
};
