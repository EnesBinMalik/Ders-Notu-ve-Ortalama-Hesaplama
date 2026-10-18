import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal } from 'lucide-react';

export const CodeViewer: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'python' | 'java' | 'c' | 'javascript'>('python');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    python: `# ==========================================================
# Ödev: Ders Notu ve Ortalama Hesaplama
# Hazırlayan: Enes Öztürk
# Kural: 0-100 arasında olmayan notlar ortalamaya katılmaz!
# Geçme Notu: 55
# ==========================================================

dersler = ["Matematik", "Fizik", "Türkçe", "Kimya", "Müzik"]
toplam = 0
gecerli_ders_sayisi = 0

for ders in dersler:
    try:
        not_degeri = float(input(f"{ders} notunu giriniz: "))
        
        # Ödev Kuralı: 0 ile 100 arasında ise dahil et
        if 0 <= not_degeri <= 100:
            toplam += not_degeri
            gecerli_ders_sayisi += 1
            print(f"-> {ders} notu ({not_degeri}) ortalamaya EKLENDİ.")
        else:
            print(f"-> UYARI: {not_degeri} geçerli aralıkta (0-100) olmadığı için DAHİL EDİLMEDİ!")
    except ValueError:
        print("Geçersiz giriş!")

# Ortalama Hesabı ve Karar
if gecerli_ders_sayisi > 0:
    ortalama = toplam / gecerli_ders_sayisi
    print("\\n" + "="*40)
    print(f"Hazırlayan: Enes Öztürk")
    print(f"Geçerli Ders Sayısı: {gecerli_ders_sayisi}")
    print(f"Ortalama: {ortalama:.2f}")
    
    if ortalama >= 55:
        print("Sonuç: TEBRİKLER, SINIFI GEÇTİNİZ!")
    else:
        print("Sonuç: MAALESEF, SINIFTA KALDINIZ!")
    print("="*40)
else:
    print("Ortalamaya katılacak geçerli not girilmedi!")
`,
    java: `/**
 * Ödev: Ders Notu ve Ortalama Hesaplama
 * Hazırlayan: Enes Öztürk
 * Geçme Notu: 55
 * Kural: 0 veya 100 arasında olmayan notlar ortalamaya katılmaz.
 */
import java.util.Scanner;

public class NotOrtalamasiEnesOzturk {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        String[] dersler = {"Matematik", "Fizik", "Türkçe", "Kimya", "Müzik"};
        
        double toplam = 0;
        int gecerliDersSayisi = 0;
        
        for (String ders : dersler) {
            System.out.print(ders + " notunu giriniz: ");
            double not = input.nextDouble();
            
            // 0 ile 100 aralığı kontrolü
            if (not >= 0 && not <= 100) {
                toplam += not;
                gecerliDersSayisi++;
            } else {
                System.out.println("-> " + not + " notu 0-100 dışı olduğu için ortalamaya katılmadı.");
            }
        }
        
        if (gecerliDersSayisi > 0) {
            double ortalama = toplam / gecerliDersSayisi;
            System.out.println("----------------------------------------");
            System.out.println("Ödev Sahibi : Enes Öztürk");
            System.out.println("Ortalama    : " + ortalama);
            
            if (ortalama >= 55) {
                System.out.println("Durum       : GEÇTİ");
            } else {
                System.out.println("Durum       : KALDI");
            }
            System.out.println("----------------------------------------");
        } else {
            System.out.println("Hesaplanacak geçerli bir ders bulunamadı.");
        }
        input.close();
    }
}
`,
    c: `/*
 * Ödev: Not Ortalaması Hesaplama (Geçme Notu: 55)
 * Hazırlayan: Enes Öztürk
 * Kural: 0 ile 100 arasında olmayan notlar ortalamaya katılmaz.
 */
#include <stdio.h>

int main() {
    char *dersler[5] = {"Matematik", "Fizik", "Turkce", "Kimya", "Muzik"};
    double notlar[5];
    double toplam = 0.0;
    int gecerliSayi = 0;
    
    printf("=== Enes Ozturk - Not Ortalamasi Odevi ===\\n");
    
    for(int i = 0; i < 5; i++) {
        printf("%s notunu giriniz: ", dersler[i]);
        scanf("%lf", &notlar[i]);
        
        // 0-100 aralığı filtresi
        if(notlar[i] >= 0.0 && notlar[i] <= 100.0) {
            toplam += notlar[i];
            gecerliSayi++;
        } else {
            printf("Uyari: %s notu (%.1f) 0-100 disinda, ortalamaya katilmiyor.\\n", dersler[i], notlar[i]);
        }
    }
    
    if(gecerliSayi > 0) {
        double ortalama = toplam / gecerliSayi;
        printf("\\n------------------------------\\n");
        printf("Gecerli Ders Adedi: %d\\n", gecerliSayi);
        printf("Not Ortalamasi   : %.2f\\n", ortalama);
        
        if(ortalama >= 55.0) {
            printf("Sonuc            : GECTI\\n");
        } else {
            printf("Sonuc            : KALDI\\n");
        }
        printf("------------------------------\\n");
    }
    return 0;
}
`,
    javascript: `// Ödev: Ders Notu ve Ortalama Hesaplama
// Hazırlayan: Enes Öztürk
// Geçme Notu: 55

const dersler = [
  { ad: 'Matematik', not: 85 },
  { ad: 'Fizik', not: 120 }, // Katılmaz!
  { ad: 'Türkçe', not: 75 },
  { ad: 'Kimya', not: -10 },  // Katılmaz!
  { ad: 'Müzik', not: 60 }
];

let toplam = 0;
let gecerliDersSayisi = 0;

dersler.forEach(({ ad, not }) => {
  // 0 veya 100 arasında değilse ortalamaya katma
  if (not >= 0 && not <= 100) {
    toplam += not;
    gecerliDersSayisi++;
    console.log(\`\${ad} (\${not}) ortalamaya dahil edildi.\`);
  } else {
    console.warn(\`\${ad} (\${not}) 0-100 aralığında değil! Ortalamaya katılmadı.\`);
  }
});

if (gecerliDersSayisi > 0) {
  const ortalama = toplam / gecerliDersSayisi;
  const gectiMi = ortalama >= 55;
  console.log({
    ogrenci: 'Enes Öztürk',
    toplamPuan: toplam,
    gecerliDersler: gecerliDersSayisi,
    ortalama: ortalama.toFixed(2),
    durum: gectiMi ? 'GEÇTİ' : 'KALDI'
  });
}
`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="kod" className="scroll-mt-20 bg-white rounded-2xl border border-slate-200 p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Ödevin Kaynak Kod Karşılığı
            </h2>
            <p className="text-xs text-slate-500">
              Üniversite ve lise programlama ödevlerinde istenen algoritmik kaynak kod çözümleri
            </p>
          </div>
        </div>

        {/* Language Tabs & Copy Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center p-1 bg-slate-100 rounded-lg">
            {(['python', 'java', 'c', 'javascript'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors capitalize cursor-pointer ${
                  activeLang === lang
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'javascript' ? 'JS' : lang}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kodu Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Container */}
      <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span className="font-mono">
              {activeLang === 'python' && 'not_hesaplama.py'}
              {activeLang === 'java' && 'NotOrtalamasiEnesOzturk.java'}
              {activeLang === 'c' && 'not_hesapla.c'}
              {activeLang === 'javascript' && 'not_hesaplama.js'}
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">
            İmza: Enes Öztürk · Geçme: 55
          </span>
        </div>

        <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">
          <code>{codeSnippets[activeLang]}</code>
        </pre>
      </div>
    </section>
  );
};
