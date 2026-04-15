export interface Feature {
  id: number;
  icon: string;
  color: string;
  title: string;
  shortDesc: string;
  longDesc: string;
}

export const features: Feature[] = [
  {
    id: 1,
    icon: 'Utensils',
    color: '#FF8F6B',
    title: 'Akıllı Beslenme Takibi',
    shortDesc: 'Barkod tarayarak mama kaydı, porsiyon hesaplama, kalori takibi.',
    longDesc:
      'Market rafındaki her mamayı saniyeler içinde tarayın. PawCal porsiyonu otomatik hesaplar, günlük kalori hedefinizi takip eder ve beslenme geçmişini analiz eder. Open Food Facts veritabanından binlerce ürün desteklenir.',
  },
  {
    id: 2,
    icon: 'TrendingUp',
    color: '#4ADE80',
    title: 'Kilo ve Büyüme Grafikleri',
    shortDesc: 'Kilo değişimini interaktif grafiklerle izleyin, sağlıklı aralıkları görün.',
    longDesc:
      'Ayrık veri noktaları yerine gerçek trendleri görün. Her tartım kaydınız uzun vadeli grafiklere işlenir, yaş ve cins bazlı sağlıklı aralıklar gösterilir. Anormal değişimleri erken yakalayın.',
  },
  {
    id: 3,
    icon: 'Pill',
    color: '#FF6B9D',
    title: 'Akıllı İlaç Hatırlatıcı',
    shortDesc: 'Düzenli ilaçlar, aşılar ve parazit tedavileri için bildirimler.',
    longDesc:
      'Evcil hayvanınızın ilaç takvimini bir daha asla unutmayın. Günlük, haftalık veya aylık hatırlatıcılar kurun. Aşı ve parazit tedavisi takvimleri otomatik hatırlatılır. Veterinerinizle paylaşılabilir sağlık raporları oluşturun.',
  },
  {
    id: 4,
    icon: 'Activity',
    color: '#FBBF24',
    title: 'Aktivite ve Egzersiz Kaydı',
    shortDesc: 'Yürüyüş, oyun, egzersiz sürelerini kaydedin ve hedefler koyun.',
    longDesc:
      'Günlük aktivite hedeflerini belirleyin, tamamlandıkça rozetler kazanın. Cins ve yaşa göre önerilen egzersiz süreleri gösterilir. Hareketsiz günleri erken fark edin, obeziteyi önleyin.',
  },
  {
    id: 5,
    icon: 'MapPin',
    color: '#60A5FA',
    title: 'Yakındaki Veteriner ve Petshop',
    shortDesc:
      'Konumunuza en yakın veteriner kliniklerini ve petshopları harita üzerinde görün.',
    longDesc:
      'Acil bir durumda veya rutin ziyaretlerde yardımınıza koşar. Açık/kapalı bilgisi, puanlar, rota tarifi ve doğrudan arama tek dokunuşla. Seyahat halindeyken de işinize yarar.',
  },
  {
    id: 6,
    icon: 'Users',
    color: '#A78BFA',
    title: 'PawCal Topluluğu',
    shortDesc: 'Evcil hayvan sahipleriyle deneyimlerinizi paylaşın, öğrenin.',
    longDesc:
      'Binlerce evcil hayvan severle tanışın. Fotoğraflar paylaşın, tavsiye isteyin, başarı hikayelerinizi anlatın. Instagram tarzı hikayeler ve gönderilerle dostça bir ortam.',
  },
];
