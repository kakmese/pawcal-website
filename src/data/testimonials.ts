export interface Testimonial {
  id: number;
  name: { tr: string; en: string };
  pet: { tr: string; en: string };
  avatar: string;
  quote: { tr: string; en: string };
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: { tr: 'Ayşe K.', en: 'Aysha K.' },
    pet: { tr: 'Golden Retriever, 3 yaş', en: 'Golden Retriever, 3 years' },
    avatar: '🐕',
    quote: {
      tr: 'Köpeğimin kilo takibini manuel yapmaktan yoruldum. PawCal sayesinde grafikler otomatik çıkıyor, veterinere giderken rapor bile hazır.',
      en: "I was tired of tracking my dog's weight manually. With PawCal, the charts are automatic, and I even have a report ready for the vet visit.",
    },
  },
  {
    id: 2,
    name: { tr: 'Mehmet T.', en: 'Mehmet T.' },
    pet: { tr: 'British Shorthair, 5 yaş', en: 'British Shorthair, 5 years' },
    avatar: '🐈',
    quote: {
      tr: 'İlaç hatırlatıcı özelliği hayat kurtarıcı. Kedimin tiroid ilacını artık asla unutmuyorum. Bildirim saatlerinde sesli uyarı da var.',
      en: "The medication reminder is a lifesaver. I never forget my cat's thyroid meds anymore. It even has sound alerts at notification times.",
    },
  },
  {
    id: 3,
    name: { tr: 'Elif Y.', en: 'Elif Y.' },
    pet: { tr: 'Pomeranian, 2 yaş', en: 'Pomeranian, 2 years' },
    avatar: '🦴',
    quote: {
      tr: 'Mama markalarını barkodla taramak harika. Kaloriler, protein oranı hepsi otomatik geliyor. Porsiyon hesaplaması da çok doğru.',
      en: 'Scanning pet food barcodes is amazing. Calories, protein ratios, everything comes automatically. The portion calculation is very accurate.',
    },
  },
];
