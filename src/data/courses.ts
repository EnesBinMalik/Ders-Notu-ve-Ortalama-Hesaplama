import { Course } from '../types.ts';

export const PASSING_THRESHOLD = 55;

export const COURSES: Course[] = [
  {
    id: 'matematik',
    name: 'Matematik',
    icon: 'Calculator',
    description: 'Cebir, Geometri ve Sayısal Analiz',
    color: 'indigo',
  },
  {
    id: 'fizik',
    name: 'Fizik',
    icon: 'Atom',
    description: 'Mekanik, Termodinamik ve Dalgalar',
    color: 'sky',
  },
  {
    id: 'turkce',
    name: 'Türkçe',
    icon: 'BookOpen',
    description: 'Dil Bilgisi, Anlam ve Kompozisyon',
    color: 'emerald',
  },
  {
    id: 'kimya',
    name: 'Kimya',
    icon: 'FlaskConical',
    description: 'Maddenin Yapısı ve Kimyasal Tepkimeler',
    color: 'amber',
  },
  {
    id: 'muzik',
    name: 'Müzik',
    icon: 'Music',
    description: 'Solfej, Ritim ve Müzik Tarihi',
    color: 'rose',
  },
];

export const PRESET_SCENARIOS = [
  {
    id: 'balanced-pass',
    title: 'Örnek 1: Başarılı Notlar (Geçti)',
    description: 'Tüm notlar 0-100 aralığında ve ortalama 55 üstünde.',
    values: {
      matematik: '85',
      fizik: '70',
      turkce: '90',
      kimya: '65',
      muzik: '80',
    },
  },
  {
    id: 'homework-rule-demo',
    title: 'Örnek 2: Ödev Kuralı Testi (Kapsam Dışı Notlar)',
    description: 'Fizik (120) ve Kimya (-15) 0-100 dışı olduğu için ortalamaya katılmaz!',
    values: {
      matematik: '70',
      fizik: '120', // Out of range!
      turkce: '80',
      kimya: '-15', // Out of range!
      muzik: '60',
    },
  },
  {
    id: 'threshold-fail',
    title: 'Örnek 3: Sınır Altı (Kaldı)',
    description: 'Geçerli notlar mevcut ancak ortalama 55 altında kalıyor.',
    values: {
      matematik: '45',
      fizik: '50',
      turkce: '40',
      kimya: '52',
      muzik: '53',
    },
  },
  {
    id: 'exact-pass',
    title: 'Örnek 4: Tam Sınır (55 ile Geçti)',
    description: 'Ortalamanın tam 55 olduğu kritik sınır noktası.',
    values: {
      matematik: '55',
      fizik: '55',
      turkce: '55',
      kimya: '55',
      muzik: '55',
    },
  },
];
