export interface BlogPost {
  slug: { tr: string; en: string };
  title: { tr: string; en: string };
  excerpt: { tr: string; en: string };
  date: string;
  author: string;
  category: { tr: string; en: string };
  image: string;
  readingTime: { tr: string; en: string };
}

export const blogPosts: BlogPost[] = [
  {
    slug: {
      tr: 'kopek-kilo-takibi-neden-onemli',
      en: 'why-track-your-dogs-weight',
    },
    title: {
      tr: "Köpeğinizin Kilo Takibi Neden Önemli?",
      en: "Why Tracking Your Dog's Weight Matters",
    },
    excerpt: {
      tr: "Köpeklerde obezite, eklem problemleri ve kısa yaşam ömrüyle doğrudan bağlantılıdır. Verilerle desteklenmiş düzenli kilo takibi, dostunuzun sağlığını korumada kritik bir rol oynar.",
      en: "Obesity in dogs is directly linked to joint problems and shorter lifespans. Regular, data-backed weight tracking plays a critical role in maintaining your companion's health.",
    },
    date: '2026-04-01',
    author: 'PawCal Studio',
    category: { tr: 'Sağlık', en: 'Health' },
    image: '/images/blog/dog-weight.jpg',
    readingTime: { tr: '5 dk okuma', en: '5 min read' },
  },
  {
    slug: {
      tr: 'ilk-kedi-eve-getirme-rehberi',
      en: 'first-cat-home-guide',
    },
    title: {
      tr: 'İlk Kedinizi Eve Getirmeden Önce Bilmeniz Gereken 5 Şey',
      en: '5 Things to Know Before Bringing Your First Cat Home',
    },
    excerpt: {
      tr: "İlk kez kedi sahibi olmak heyecan verici ama hazırlıksız yakalanmak hem sizi hem de kedinizi strese sokar. Bu rehber, süreci pürüzsüz geçirmeniz için gereken her şeyi içeriyor.",
      en: "Becoming a cat owner for the first time is exciting, but being unprepared can stress both you and your cat. This guide covers everything you need to make the process smooth.",
    },
    date: '2026-04-05',
    author: 'PawCal Studio',
    category: { tr: 'Rehber', en: 'Guide' },
    image: '/images/blog/first-cat.jpg',
    readingTime: { tr: '6 dk okuma', en: '6 min read' },
  },
];
