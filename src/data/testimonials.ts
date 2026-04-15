export interface Testimonial {
  id: number;
  name: string;
  pet: string;
  avatar: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ayşe K.',
    pet: 'Golden Retriever, 3 yaş',
    avatar: '🐕',
    quote:
      'Köpeğimin kilo takibini manuel yapmaktan yoruldum. PawCal sayesinde grafikler otomatik çıkıyor, veterinere giderken rapor bile hazır.',
  },
  {
    id: 2,
    name: 'Mehmet T.',
    pet: 'British Shorthair, 5 yaş',
    avatar: '🐈',
    quote:
      'İlaç hatırlatıcı özelliği hayat kurtarıcı. Kedimin tiroid ilacını artık asla unutmuyorum. Bildirim saatlerinde sesli uyarı da var.',
  },
  {
    id: 3,
    name: 'Elif Y.',
    pet: 'Pomeranian, 2 yaş',
    avatar: '🦴',
    quote:
      'Mama markalarını barkodla taramak harika. Kaloriler, protein oranı hepsi otomatik geliyor. Porsiyon hesaplaması da çok doğru.',
  },
];
