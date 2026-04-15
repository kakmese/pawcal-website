export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  slug: string;
  title: string;
  icon: string;
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    slug: 'getting-started',
    title: 'Başlarken',
    icon: 'Rocket',
    items: [
      {
        question: 'PawCal nedir?',
        answer:
          'PawCal, evcil hayvanınızın beslenme, sağlık ve aktivitesini takip etmenizi sağlayan akıllı bir iOS uygulamasıdır. Mama porsiyonlarından ilaç takvimlerine kadar tüm verileri tek bir platformda yönetebilirsiniz.',
      },
      {
        question: 'Uygulamayı nasıl indiririm?',
        answer:
          'PawCal, App Store\'dan ücretsiz olarak indirilebilir. Arama çubuğuna "PawCal" yazmanız yeterli. iOS 16 ve üzeri sürümler desteklenmektedir.',
      },
      {
        question: 'İlk evcil hayvanımı nasıl eklerim?',
        answer:
          'Uygulamayı açtıktan sonra "Evcil Hayvan Ekle" butonuna dokunun. İsim, cins, doğum tarihi ve fotoğraf gibi bilgileri girin. Profil oluşturulduktan sonra takibe başlayabilirsiniz.',
      },
      {
        question: 'Veriler cihazda mı saklanıyor, bulutta mı?',
        answer:
          'Verileriniz Supabase altyapısıyla güvenli bulut depolama kullanılarak saklanır. Bu sayede cihaz değiştirdiğinizde verileriniz kaybolmaz. Tüm bağlantılar şifreli (TLS) olarak gerçekleşir.',
      },
    ],
  },
  {
    slug: 'nutrition',
    title: 'Beslenme',
    icon: 'Utensils',
    items: [
      {
        question: 'Barkod tarama nasıl çalışır?',
        answer:
          'Kamera butonuna dokunarak mama paketinin arkasındaki barkodu kameranıza gösterin. PawCal, Open Food Facts veritabanını kullanarak ürünü otomatik olarak tanır ve besin bilgilerini ekrana getirir.',
      },
      {
        question: 'Mama bulamadım ne yapmalıyım?',
        answer:
          'Ürün veritabanında yoksa manuel olarak ekleyebilirsiniz. İsim, kalori ve besin değerlerini kendiniz girerek özel bir ürün profili oluşturabilirsiniz.',
      },
      {
        question: 'Günlük kalori hedefi nasıl hesaplanıyor?',
        answer:
          'PawCal, evcil hayvanınızın ağırlığı, yaşı, cinsiyeti ve aktivite düzeyine göre günlük kalori ihtiyacını hesaplar. Bu hesaplama genel veteriner rehberlerine dayanır. Veterinerinizin önerisi her zaman önceliklidir.',
      },
      {
        question: 'Birden fazla öğün nasıl eklenir?',
        answer:
          '"Öğün Ekle" butonunu kullanarak günde istediğiniz kadar öğün kaydedebilirsiniz. Her öğün için saat, miktar ve mama türünü belirtebilirsiniz. Günlük toplam kalori otomatik güncellenir.',
      },
    ],
  },
  {
    slug: 'health',
    title: 'Sağlık',
    icon: 'Heart',
    items: [
      {
        question: 'Kilo kaydını nasıl girerim?',
        answer:
          'Sağlık sekmesindeki "Kilo Ekle" butonuna dokunun, tartı sonucunu girin ve kaydedin. Her kayıt grafiğe otomatik eklenir. Düzenli tartım için haftalık hatırlatıcı kurabilirsiniz.',
      },
      {
        question: 'İlaç hatırlatıcı nasıl kurulur?',
        answer:
          '"İlaçlar" bölümünde "Yeni İlaç Ekle"ye dokunun. İlaç adı, dozu, başlangıç tarihi ve tekrar sıklığını belirtin. Belirtilen saatte bildirim alacaksınız.',
      },
      {
        question: 'Veteriner raporu nasıl oluşturulur?',
        answer:
          'Profil sayfasından "Rapor Oluştur" seçeneğini kullanın. İstediğiniz tarih aralığını seçin; kilo, beslenme, ilaç ve aktivite verileri otomatik olarak PDF formatında derlenir.',
      },
      {
        question: 'Aşı takvimi nasıl eklenir?',
        answer:
          '"Sağlık" > "Aşılar" bölümünden yeni aşı kaydı ekleyebilirsiniz. Aşı adı, yapıldığı tarih ve bir sonraki tarih bilgilerini girin. Uygulama sizi otomatik olarak hatırlatacaktır.',
      },
    ],
  },
  {
    slug: 'activity',
    title: 'Aktivite',
    icon: 'Activity',
    items: [
      {
        question: 'Aktivite nasıl kaydedilir?',
        answer:
          '"Aktivite" sekmesindeki artı (+) butonuna dokunun. Aktivite türünü (yürüyüş, oyun, egzersiz), süreyi ve gerekirse notu girin. Kayıt anında günlük ilerleme çubuğuna yansır.',
      },
      {
        question: 'Otomatik takip var mı?',
        answer:
          'Şu an için aktiviteler manuel olarak kaydedilmektedir. Otomatik hareket takibi yaklaşan güncellemelerde planlanmaktadır.',
      },
      {
        question: 'Hedefler nasıl belirlenir?',
        answer:
          'Profil ayarlarından haftalık aktivite hedeflerinizi özelleştirebilirsiniz. Cins ve yaşa göre önerilen süreler otomatik gösterilir.',
      },
      {
        question: 'Rozet sistemi nedir?',
        answer:
          'Aktivite hedeflerinizi tamamladıkça özel rozetler kazanırsınız. Rozetler "7 Gün Üst Üste Hedef" veya "İlk 100 Dakika" gibi kategorilerde verilir.',
      },
    ],
  },
  {
    slug: 'community',
    title: 'Topluluk',
    icon: 'Users',
    items: [
      {
        question: 'Paylaşım yapmak zorunlu mu?',
        answer:
          'Hayır, topluluk özelliği tamamen isteğe bağlıdır. Sadece takip özelliklerini kullanarak uygulamamızdan tam anlamıyla yararlanabilirsiniz.',
      },
      {
        question: 'Hesabımı gizli yapabilir miyim?',
        answer:
          'Evet, ayarlar bölümünden hesabınızı gizli moda alabilirsiniz. Gizli hesaplarda paylaşımlarınız yalnızca takip ettiğiniz kişiler tarafından görülür.',
      },
      {
        question: 'Yorumları nasıl moderasyon yapıyorsunuz?',
        answer:
          'Topluluk kurallarını ihlal eden içerikler yapay zeka destekli ve manuel moderasyon ekibimiz tarafından incelenir. Zararlı içerikler 24 saat içinde kaldırılır.',
      },
      {
        question: 'Bir kullanıcıyı nasıl şikayet ederim?',
        answer:
          'İlgili gönderi veya yorumun yanındaki üç nokta (…) menüsüne dokunarak "Şikayet Et" seçeneğini kullanabilirsiniz.',
      },
    ],
  },
  {
    slug: 'account-subscription',
    title: 'Hesap ve Abonelik',
    icon: 'CreditCard',
    items: [
      {
        question: 'Ücretli bir plan var mı?',
        answer:
          'PawCal temel özellikleriyle ücretsiz kullanılabilir. İleri düzey analizler, sınırsız evcil hayvan profili ve öncelikli destek gibi özellikler için premium abonelik mevcuttur.',
      },
      {
        question: 'Premium özellikleri nelerdir?',
        answer:
          'Premium plan; sınırsız evcil hayvan profili, detaylı beslenme analizleri, PDF raporlama, aktivite geçmişi arşivi ve reklamlara maruz kalmama gibi özellikleri kapsar.',
      },
      {
        question: 'Hesabımı nasıl silerim?',
        answer:
          'Ayarlar > Hesap > Hesabı Sil yolunu izleyerek hesabınızı kalıcı olarak silebilirsiniz. Silme talebinizi info@pawcal.net adresine de iletebilirsiniz.',
      },
      {
        question: 'Verilerimi nasıl dışa aktarırım?',
        answer:
          'Ayarlar > Verilerim > Dışa Aktar bölümünden tüm evcil hayvan ve sağlık verilerinizi JSON veya CSV formatında indirebilirsiniz.',
      },
    ],
  },
];
