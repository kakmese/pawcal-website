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

export const blogPosts: BlogPost[] = [
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
];
