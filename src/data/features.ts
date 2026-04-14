export interface Feature {
  id: number;
  icon: string;
  color: string;
  title: { tr: string; en: string };
  shortDesc: { tr: string; en: string };
  longDesc: { tr: string; en: string };
}

export const features: Feature[] = [
  {
    id: 1,
    icon: 'Utensils',
    color: '#FF8F6B',
    title: {
      tr: 'Akıllı Beslenme Takibi',
      en: 'Smart Nutrition Tracking',
    },
    shortDesc: {
      tr: 'Barkod tarayarak mama kaydı, porsiyon hesaplama, kalori takibi.',
      en: 'Scan barcodes for instant meal logging, portion calculation, calorie tracking.',
    },
    longDesc: {
      tr: 'Market rafındaki her mamayı saniyeler içinde tarayın. PawCal porsiyonu otomatik hesaplar, günlük kalori hedefinizi takip eder ve beslenme geçmişini analiz eder. Open Food Facts veritabanından binlerce ürün desteklenir.',
      en: 'Scan any pet food from the shelf in seconds. PawCal automatically calculates portions, tracks your daily calorie goals, and analyzes nutrition history. Thousands of products supported via Open Food Facts database.',
    },
  },
  {
    id: 2,
    icon: 'TrendingUp',
    color: '#4ADE80',
    title: {
      tr: 'Kilo ve Büyüme Grafikleri',
      en: 'Weight & Growth Charts',
    },
    shortDesc: {
      tr: 'Kilo değişimini interaktif grafiklerle izleyin, sağlıklı aralıkları görün.',
      en: 'Monitor weight changes with interactive charts, see healthy ranges.',
    },
    longDesc: {
      tr: 'Ayrık veri noktaları yerine gerçek trendleri görün. Her tartım kaydınız uzun vadeli grafiklere işlenir, yaş ve cins bazlı sağlıklı aralıklar gösterilir. Anormal değişimleri erken yakalayın.',
      en: 'See real trends instead of isolated data points. Every weigh-in feeds into long-term charts with healthy ranges by age and breed. Catch abnormal changes early.',
    },
  },
  {
    id: 3,
    icon: 'Pill',
    color: '#FF6B9D',
    title: {
      tr: 'Akıllı İlaç Hatırlatıcı',
      en: 'Smart Medication Reminders',
    },
    shortDesc: {
      tr: 'Düzenli ilaçlar, aşılar ve parazit tedavileri için bildirimler.',
      en: 'Notifications for regular meds, vaccines, and parasite treatments.',
    },
    longDesc: {
      tr: 'Evcil hayvanınızın ilaç takvimini bir daha asla unutmayın. Günlük, haftalık veya aylık hatırlatıcılar kurun. Aşı ve parazit tedavisi takvimleri otomatik hatırlatılır. Veterinerinizle paylaşılabilir sağlık raporları oluşturun.',
      en: 'Never miss your pet\'s medication schedule again. Set daily, weekly, or monthly reminders. Automatic alerts for vaccinations and parasite treatments. Generate shareable health reports for your vet.',
    },
  },
  {
    id: 4,
    icon: 'Activity',
    color: '#FBBF24',
    title: {
      tr: 'Aktivite ve Egzersiz Kaydı',
      en: 'Activity & Exercise Log',
    },
    shortDesc: {
      tr: 'Yürüyüş, oyun, egzersiz sürelerini kaydedin ve hedefler koyun.',
      en: 'Log walks, play, and exercise times with customizable goals.',
    },
    longDesc: {
      tr: 'Günlük aktivite hedeflerini belirleyin, tamamlandıkça rozetler kazanın. Cins ve yaşa göre önerilen egzersiz süreleri gösterilir. Hareketsiz günleri erken fark edin, obeziteyi önleyin.',
      en: 'Set daily activity goals, earn badges as you complete them. See recommended exercise durations by breed and age. Spot inactive days early, prevent obesity.',
    },
  },
  {
    id: 5,
    icon: 'MapPin',
    color: '#60A5FA',
    title: {
      tr: 'Yakındaki Veteriner ve Petshop',
      en: 'Nearby Vets & Pet Stores',
    },
    shortDesc: {
      tr: 'Konumunuza en yakın veteriner kliniklerini ve petshopları harita üzerinde görün.',
      en: 'Find the nearest veterinary clinics and pet stores on an interactive map.',
    },
    longDesc: {
      tr: 'Acil bir durumda veya rutin ziyaretlerde yardımınıza koşar. Açık/kapalı bilgisi, puanlar, rota tarifi ve doğrudan arama tek dokunuşla. Seyahat halindeyken de işinize yarar.',
      en: 'Helpful during emergencies or routine visits. Open/closed status, ratings, directions, and one-tap calling. Works when you\'re traveling too.',
    },
  },
  {
    id: 6,
    icon: 'Users',
    color: '#A78BFA',
    title: {
      tr: 'PawCal Topluluğu',
      en: 'PawCal Community',
    },
    shortDesc: {
      tr: 'Evcil hayvan sahipleriyle deneyimlerinizi paylaşın, öğrenin.',
      en: 'Share experiences with other pet owners, learn together.',
    },
    longDesc: {
      tr: 'Binlerce evcil hayvan severle tanışın. Fotoğraflar paylaşın, tavsiye isteyin, başarı hikayelerinizi anlatın. Instagram tarzı hikayeler ve gönderilerle dostça bir ortam.',
      en: 'Meet thousands of pet lovers. Share photos, ask for advice, tell your success stories. Instagram-style stories and posts in a friendly environment.',
    },
  },
];
