import React from 'react';
import { BookOpenCheck, Check, X, ArrowRight, ShieldAlert } from 'lucide-react';
import { CalculationResult } from '../types.ts';

interface FormulaBreakdownProps {
  result: CalculationResult;
}

export const FormulaBreakdown: React.FC<FormulaBreakdownProps> = ({ result }) => {
  const { validGrades, excludedGrades, totalSum, validCount, average, isPassed, passThreshold } = result;

  return (
    <section id="formul" className="scroll-mt-20 bg-white rounded-2xl border border-slate-200 p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <BookOpenCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Ödev Hesaplama Mantığı & Matematiksel Formül
          </h2>
          <p className="text-xs text-slate-500">
            Adım adım filtreleme, geçerli notların toplamı ve geçme notu karşılaştırması
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Step 1: Rule & Filtering */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">1</span>
              Ödev Filtreleme Kuralı
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Kullanıcı tarafından girilen notlar öncelikle <code className="font-mono text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded">0 &le; Not &le; 100</code> şartına göre denetlenir. 
              0'dan küçük veya 100'den büyük notlar toplam ve ders adedi hesabına kesinlikle katılmaz.
            </p>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                <span className="text-slate-700 font-sans">Geçerli Kabul Edilen Dersler:</span>
                <span className="font-bold text-emerald-700">{validCount} ders</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                <span className="text-slate-700 font-sans">Kapsam Dışı / Filtrelenen:</span>
                <span className={`font-bold ${excludedGrades.length > 0 ? 'text-amber-700' : 'text-slate-500'}`}>
                  {excludedGrades.length} ders
                </span>
              </div>
            </div>
          </div>

          {/* List of included and excluded */}
          <div className="space-y-2 text-xs">
            {validGrades.length > 0 && (
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
                <span className="font-semibold text-emerald-900 block mb-1">
                  ✓ Ortalamaya Katılan Dersler ({validGrades.length}):
                </span>
                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                  {validGrades.map((item) => (
                    <span
                      key={item.course.id}
                      className="px-2 py-1 bg-white border border-emerald-300 rounded text-emerald-800"
                    >
                      {item.course.name}: <strong>{item.grade}</strong>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {excludedGrades.length > 0 && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="font-semibold text-amber-900 block mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                  Ortalamadan Çıkarılan Dersler ({excludedGrades.length}):
                </span>
                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                  {excludedGrades.map((item) => (
                    <span
                      key={item.course.id}
                      className="px-2 py-1 bg-white border border-amber-300 rounded text-amber-900 line-through"
                      title="0 ile 100 arasında olmadığı için dahil edilmedi"
                    >
                      {item.course.name}: {item.rawValue}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Math Formula with live substitution */}
        <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center font-mono">2</span>
              Formül ve Canlı Çözüm
            </h3>

            {/* Formula representation */}
            <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700 text-center font-mono mb-4">
              <div className="text-xs text-slate-400 mb-2 font-sans">Genel Aritmetik Ortalama Formülü:</div>
              <div className="inline-flex items-center gap-3 text-sm sm:text-base">
                <span className="text-indigo-300 font-bold">Ortalama</span>
                <span>=</span>
                <div className="flex flex-col items-center">
                  <span className="border-b border-slate-400 px-3 pb-1 text-emerald-400">
                    &sum; Geçerli Ders Notları
                  </span>
                  <span className="pt-1 text-sky-400">
                    Geçerli Ders Adedi
                  </span>
                </div>
              </div>
            </div>

            {/* Live calculation steps */}
            {validCount > 0 ? (
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-300 flex-wrap">
                  <span className="text-slate-400 font-sans">Değer Yerleştirme:</span>
                  <span>
                    ({validGrades.map((g) => g.grade).join(' + ')}) &divide; {validCount}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-slate-400 font-sans">İşlem:</span>
                  <span>
                    {totalSum} &divide; {validCount} ={' '}
                    <strong className="text-indigo-300 text-base">{average?.toFixed(2)}</strong>
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                  <span className="text-slate-400 font-sans">Karar (Baraj {passThreshold}):</span>
                  {isPassed ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      {average?.toFixed(2)} &ge; {passThreshold} &rarr; GEÇTİ
                    </span>
                  ) : (
                    <span className="text-rose-400 font-semibold flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {average?.toFixed(2)} &lt; {passThreshold} &rarr; KALDI
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                Hesaplama adımlarını görmek için lütfen geçerli ders notları giriniz.
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Enes Öztürk Ödevi</span>
            <span className="font-mono text-indigo-400">Baraj: 55 Puan</span>
          </div>
        </div>
      </div>
    </section>
  );
};
