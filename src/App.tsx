import React, { useState, useMemo } from 'react';
import { Header } from './components/Header.tsx';
import { CourseCard } from './components/CourseCard.tsx';
import { SummaryCard } from './components/SummaryCard.tsx';
import { FormulaBreakdown } from './components/FormulaBreakdown.tsx';
import { CodeViewer } from './components/CodeViewer.tsx';
import { SignatureCard } from './components/SignatureCard.tsx';
import { COURSES, PASSING_THRESHOLD, PRESET_SCENARIOS } from './data/courses.ts';
import { CalculationResult } from './types.ts';
import {
  GraduationCap,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Info,
  Layers,
  Printer
} from 'lucide-react';

export default function App() {
  // Initial state with scenario 2 (demonstrating the homework rule with out-of-range grades)
  const [grades, setGrades] = useState<Record<string, string>>({
    matematik: '70',
    fizik: '120', // Out of range (>100)
    turkce: '80',
    kimya: '-15', // Out of range (<0)
    muzik: '60',
  });

  const handleGradeChange = (courseId: string, value: string) => {
    setGrades((prev) => ({
      ...prev,
      [courseId]: value,
    }));
  };

  const handleApplyPreset = (presetValues: Record<string, string>) => {
    setGrades(presetValues);
  };

  const handleReset = () => {
    const emptyGrades: Record<string, string> = {};
    COURSES.forEach((c) => {
      emptyGrades[c.id] = '';
    });
    setGrades(emptyGrades);
  };

  const handleSetAllTo = (val: string) => {
    const next: Record<string, string> = {};
    COURSES.forEach((c) => {
      next[c.id] = val;
    });
    setGrades(next);
  };

  // Perform Calculation respecting the Homework Rule:
  // "Eğer girilen ders notları 0 veya 100 arasında değil ise ortalamaya katılmasın."
  const result: CalculationResult = useMemo(() => {
    const validGrades: { course: typeof COURSES[0]; grade: number }[] = [];
    const excludedGrades: { course: typeof COURSES[0]; rawValue: number }[] = [];
    let emptyCount = 0;

    COURSES.forEach((course) => {
      const raw = grades[course.id] ?? '';
      if (raw.trim() === '') {
        emptyCount++;
        return;
      }

      const num = Number(raw);
      if (isNaN(num)) {
        emptyCount++;
        return;
      }

      // Check range 0 <= not <= 100
      if (num >= 0 && num <= 100) {
        validGrades.push({ course, grade: num });
      } else {
        excludedGrades.push({ course, rawValue: num });
      }
    });

    const totalSum = validGrades.reduce((sum, item) => sum + item.grade, 0);
    const validCount = validGrades.length;
    const average = validCount > 0 ? totalSum / validCount : null;
    const isPassed = average !== null ? average >= PASSING_THRESHOLD : null;

    return {
      validGrades,
      excludedGrades,
      emptyCount,
      totalSum,
      validCount,
      average,
      isPassed,
      passThreshold: PASSING_THRESHOLD,
    };
  }, [grades]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navigation */}
      <Header onPrint={handlePrint} />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Homework Hero & Rule Overview */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  Ödev Çalışması
                </span>
                <span aria-hidden="true">·</span>
                <span>Hazırlayan: <strong>Enes Öztürk</strong></span>
                <span aria-hidden="true">·</span>
                <span>Geçme Notu: <strong>55</strong></span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
                Ders Notu ve Ortalama Hesaplama
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Bu sistemde <strong>Matematik, Fizik, Türkçe, Kimya ve Müzik</strong> derslerinin notları girilir. 
                Ödev kuralı gereğince, <span className="font-semibold text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  0 veya 100 arasında olmayan ders notları ortalamaya dahil edilmez
                </span>. Ortalama <strong>55 ve üzeri</strong> olduğunda öğrenci geçer, aksi halde sınıfta kalır.
              </p>
            </div>

            {/* Quick Summary Pill Island Replacement / Clear Fact Card */}
            <div className="shrink-0 p-5 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-2.5 min-w-[260px]">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Ödev Parametreleri
              </div>
              <div className="text-sm space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Geçme Notu:</span>
                  <span className="text-emerald-400 font-bold">55</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Ders Sayısı:</span>
                  <span className="text-white font-bold">5 Ders</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Geçerli Aralık:</span>
                  <span className="text-indigo-300 font-bold">0 &le; Not &le; 100</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800">
                  <span className="text-slate-400 font-sans">İmza:</span>
                  <span className="text-amber-300 font-medium font-sans">Enes Öztürk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preset Scenarios Selector */}
          <div id="senaryolar" className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-600">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Hızlı Test Senaryoları:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {PRESET_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleApplyPreset(scenario.values)}
                  className="text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-xs group cursor-pointer"
                >
                  <strong className="font-semibold text-slate-900 block group-hover:text-indigo-700">
                    {scenario.title}
                  </strong>
                  <span className="text-slate-500 line-clamp-2 mt-0.5">
                    {scenario.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Workspace: Split into Left Input Deck & Right Summary Deck */}
        <div id="hesaplama" className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Zone: Course Inputs (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Ders Not Girişleri
                </h2>
                <p className="text-xs text-slate-500">
                  Derslerin notlarını girin. 0-100 dışındakiler anında kapsam dışı bırakılır.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Toplam 5 Ders
              </span>
            </div>

            <div className="space-y-3">
              {COURSES.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  value={grades[course.id] ?? ''}
                  onChange={(val) => handleGradeChange(course.id, val)}
                />
              ))}
            </div>
          </div>

          {/* Right Zone: Summary Result Panel (5 cols on desktop, sticky) */}
          <div className="lg:col-span-5 sticky top-20">
            <SummaryCard
              result={result}
              onReset={handleReset}
              onSetAllTo={handleSetAllTo}
            />
          </div>
        </div>

        {/* Step-by-Step Formula & Live Math Proof */}
        <FormulaBreakdown result={result} />

        {/* Programming Code Implementation */}
        <CodeViewer />

        {/* Assignment Signature & Verification Document */}
        <SignatureCard result={result} />
      </main>

      {/* Official Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Not Ortalaması Hesaplama Ödevi · Hazırlayan: <strong>Enes Öztürk</strong></span>
          </div>

          <div className="flex items-center gap-4">
            <span>Geçme Notu: 55</span>
            <span aria-hidden="true">·</span>
            <span>0-100 Kuralı Aktif</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={handlePrint}
              className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Yazdır
            </button>
          </div>
        </div>
      </footer>

      {/* Print-Only Template (Visible when user uses print or Save to PDF) */}
      <div className="hidden print-only p-8 text-black">
        <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">ÖĞRENCİ NOT ORTALAMASI VE GEÇME DURUM RAPORU</h1>
            <p className="text-sm text-gray-600">Dersler: Matematik, Fizik, Türkçe, Kimya, Müzik | Geçme Notu: 55</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Ödev Sahibi: Enes Öztürk</p>
            <p className="text-xs text-gray-500">{new Date().toLocaleDateString('tr-TR')}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-base font-bold mb-2">1. Ders Notları Tablosu</h2>
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2 text-left">Ders Adı</th>
                <th className="border border-gray-400 p-2 text-center">Girilen Not</th>
                <th className="border border-gray-400 p-2 text-center">Ödev Kuralı Durumu</th>
                <th className="border border-gray-400 p-2 text-center">Hesaba Katıldı Mı?</th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map((course) => {
                const raw = grades[course.id];
                const num = raw !== '' ? Number(raw) : null;
                const isValid = num !== null && !isNaN(num) && num >= 0 && num <= 100;
                return (
                  <tr key={course.id}>
                    <td className="border border-gray-400 p-2 font-medium">{course.name}</td>
                    <td className="border border-gray-400 p-2 text-center font-mono">
                      {raw !== '' ? raw : 'Girilmedi'}
                    </td>
                    <td className="border border-gray-400 p-2 text-center">
                      {isValid ? 'Geçerli (0-100)' : num !== null ? 'Kapsam Dışı (<0 veya >100)' : 'Boş'}
                    </td>
                    <td className="border border-gray-400 p-2 text-center font-bold">
                      {isValid ? 'EVET' : 'HAYIR'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 border border-black rounded mb-6">
          <h2 className="text-base font-bold mb-2">2. Hesaplama ve Karar Özeti</h2>
          <p className="text-sm">Geçerli Ders Adedi: <strong>{result.validCount}</strong></p>
          <p className="text-sm">Geçerli Notların Toplamı: <strong>{result.totalSum}</strong></p>
          <p className="text-sm">Genel Ortalama: <strong>{result.average !== null ? result.average.toFixed(2) : 'Hesaplanamadı'}</strong></p>
          <p className="text-sm">Geçme Notu Barajı: <strong>55</strong></p>
          <p className="text-lg font-bold mt-2">
            Sonuç: {result.isPassed ? 'GEÇTİ (Başarılı)' : 'KALDI (Başarısız)'}
          </p>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-300 flex justify-between items-end">
          <div>
            <p className="text-xs text-gray-500">
              Not: 0 ve 100 arasında olmayan ders notları ödev şartnamesi uyarınca ortalamaya katılmamıştır.
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-serif" style={{ fontFamily: "'Caveat', cursive" }}>
              Enes Öztürk
            </div>
            <p className="text-xs border-t border-black pt-1">Öğrenci İmzası</p>
          </div>
        </div>
      </div>
    </div>
  );
}
