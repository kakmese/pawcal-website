export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readingTime: string;
}

export const blogPostsByLocale: {
  tr: BlogPost[];
  en: BlogPost[];
} = {
  tr: [
    {
      slug: 'kopek-kilo-takibi-neden-onemli',
      title: 'Köpeğinizin Kilo Takibi Neden Önemli?',
      excerpt:
        'Köpeklerde obezite, eklem problemleri ve kısa yaşam ömrüyle doğrudan bağlantılıdır. Verilerle desteklenmiş düzenli kilo takibi, dostunuzun sağlığını korumada kritik bir rol oynar.',
      date: '2026-04-01',
      author: 'PawCal Studio',
      category: 'Sağlık',
      image: '/images/blog/dog-weight.jpg',
      readingTime: '5 dk okuma',
    },
    {
      slug: 'ilk-kedi-eve-getirme-rehberi',
      title: 'İlk Kedinizi Eve Getirmeden Önce Bilmeniz Gereken 5 Şey',
      excerpt:
        'İlk kez kedi sahibi olmak heyecan verici ama hazırlıksız yakalanmak hem sizi hem de kedinizi strese sokar. Bu rehber, süreci pürüzsüz geçirmeniz için gereken her şeyi içeriyor.',
      date: '2026-04-05',
      author: 'PawCal Studio',
      category: 'Rehber',
      image: '/images/blog/first-cat.jpg',
      readingTime: '6 dk okuma',
    },
  ],
  en: [
    {
      slug: 'kopek-kilo-takibi-neden-onemli',
      title: "Why Tracking Your Dog's Weight Matters",
      excerpt:
        'Obesity in dogs is directly linked to joint problems, disease, and a shorter lifespan. Regular, data-backed weight tracking plays a critical role in keeping your companion healthy.',
      date: '2026-04-01',
      author: 'PawCal Studio',
      category: 'Health',
      image: '/images/blog/dog-weight.jpg',
      readingTime: '5 min read',
    },
    {
      slug: 'ilk-kedi-eve-getirme-rehberi',
      title: '5 Things to Know Before Bringing Home Your First Cat',
      excerpt:
        'Getting your first cat is exciting, but being unprepared can stress both you and your new companion. This guide covers everything you need to make the transition smooth.',
      date: '2026-04-05',
      author: 'PawCal Studio',
      category: 'Guide',
      image: '/images/blog/first-cat.jpg',
      readingTime: '6 min read',
    },
  ],
};

export function getBlogPosts(locale: string): BlogPost[] {
  return locale === 'en' ? blogPostsByLocale.en : blogPostsByLocale.tr;
}
