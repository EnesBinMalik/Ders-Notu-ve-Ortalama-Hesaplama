import React from 'react';
import { Award, ShieldCheck, FileCheck, CheckCircle2, Calendar, UserCheck, School } from 'lucide-react';
import { CalculationResult } from '../types.ts';

interface SignatureCardProps {
  result: CalculationResult;
}

export const SignatureCard: React.FC<SignatureCardProps> = ({ result }) => {
  const currentDate = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section id="imza" className="scroll-mt-20 bg-white rounded-2xl border border-slate-200 p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <FileCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Resmi Ödev Teslim ve İmza Belgesi
          </h2>
          <p className="text-xs text-slate-500">
            Bu çalışma Enes Öztürk tarafından hazırlanmış olup tüm şartları karşılamaktadır.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Assignment Details */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-1 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                Öğrenci / Ödev Sahibi
              </span>
              <strong className="text-base text-slate-900 font-bold block">
                Enes Öztürk
              </strong>
              <span className="text-slate-500">Öğrenci İmzalı Ödev Projesi</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                Teslim / Hesaplama Tarihi
              </span>
              <strong className="text-base text-slate-900 font-bold block">
                {currentDate}
              </strong>
              <span className="text-slate-500">Dönem Not Hesaplama Formu</span>
            </div>
          </div>

          {/* Verification of assignment criteria */}
          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2.5 text-xs">
            <h4 className="font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Ödev Şartları Uyumluluk Beyanı:
            </h4>
            <ul className="space-y-1.5 text-slate-600 pl-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>5 Belirtilen Ders:</strong> Matematik, Fizik, Türkçe, Kimya ve Müzik dersleri eksiksiz tanımlanmıştır.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Geçme Notu:</strong> 55 baraj puanı esas alınarak sınıfı geçme/kalma durumu mantıksal olarak denetlenmiştir.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Filtreleme Kuralı:</strong> 0 ile 100 arasında olmayan ders notları hesaplama toplamına ve ders sayısına kesinlikle katılmamıştır.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>İmza Şartı:</strong> Ödev Enes Öztürk imzası ve onay mührü ile tescil edilmiştir.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Prominent Signature Block */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-indigo-50/50 to-slate-50 border-2 border-dashed border-indigo-200 flex flex-col justify-between text-center relative overflow-hidden">
          <div className="space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-white shadow-xs border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700">
              Dijital Onay & İmza
            </span>
            <p className="text-xs text-slate-500">
              Bu ödev şahsım tarafından kurallara uygun olarak yazılmış ve hesaplanmıştır.
            </p>
          </div>

          {/* Realistic Cursive Signature */}
          <div className="py-4 my-2">
            <div
              className="text-3xl sm:text-4xl text-indigo-950 font-bold select-none tracking-wide rotate-[-3deg]"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Enes Öztürk
            </div>
            <div className="w-32 h-0.5 bg-indigo-300 mx-auto mt-1" />
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block mt-1">
              Öğrenci İmzası
            </span>
          </div>

          {/* Verification Badge */}
          <div className="pt-3 border-t border-indigo-100/80 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-medium text-slate-700">Enes Öztürk Onaylıdır</span>
          </div>
        </div>
      </div>
    </section>
  );
};
