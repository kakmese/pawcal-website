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

export const faqCategoriesByLocale: {
  tr: FAQCategory[];
  en: FAQCategory[];
} = {
  tr: [
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
  ],
  en: [
    {
      slug: 'getting-started',
      title: 'Getting Started',
      icon: 'Rocket',
      items: [
        {
          question: 'What is PawCal?',
          answer:
            "PawCal is a smart iOS app that helps you track your pet's nutrition, health, and activity. From meal portions to medication schedules, you can manage all your data in one platform.",
        },
        {
          question: 'How do I download the app?',
          answer:
            'PawCal is available for free on the App Store. Just search "PawCal" in the search bar. iOS 16 and above are supported.',
        },
        {
          question: 'How do I add my first pet?',
          answer:
            'After opening the app, tap "Add Pet". Enter details like name, breed, date of birth, and a photo. Once the profile is created, you\'re ready to start tracking.',
        },
        {
          question: 'Is my data stored on the device or in the cloud?',
          answer:
            'Your data is stored securely using Supabase cloud storage. This means your data is safe even if you switch devices. All connections are encrypted (TLS).',
        },
      ],
    },
    {
      slug: 'nutrition',
      title: 'Nutrition',
      icon: 'Utensils',
      items: [
        {
          question: 'How does barcode scanning work?',
          answer:
            'Tap the camera button and point your camera at the barcode on the pet food packaging. PawCal uses the Open Food Facts database to automatically identify the product and display its nutritional information.',
        },
        {
          question: "What if I can't find my pet food?",
          answer:
            "If the product isn't in the database, you can add it manually. Just enter the name, calories, and nutritional values to create a custom product profile.",
        },
        {
          question: 'How is the daily calorie goal calculated?',
          answer:
            "PawCal calculates your pet's daily calorie needs based on their weight, age, gender, and activity level. The calculation follows general veterinary guidelines. Your vet's recommendation always takes priority.",
        },
        {
          question: 'How do I log multiple meals?',
          answer:
            'Use the "Add Meal" button to log as many meals as you need throughout the day. For each meal, you can specify the time, amount, and food type. The daily calorie total updates automatically.',
        },
      ],
    },
    {
      slug: 'health',
      title: 'Health',
      icon: 'Heart',
      items: [
        {
          question: 'How do I log a weight entry?',
          answer:
            'Tap the "Add Weight" button in the Health tab, enter the scale reading, and save. Each entry is automatically added to the chart. You can set a weekly reminder for regular weigh-ins.',
        },
        {
          question: 'How do I set up a medication reminder?',
          answer:
            'In the "Medications" section, tap "Add New Medication". Enter the medication name, dose, start date, and frequency. You\'ll receive a notification at the specified time.',
        },
        {
          question: 'How do I generate a vet report?',
          answer:
            'Use the "Generate Report" option from the profile page. Select your desired date range and weight, nutrition, medication, and activity data will be automatically compiled into a PDF.',
        },
        {
          question: 'How do I add a vaccine schedule?',
          answer:
            'Go to "Health" > "Vaccines" to add a new vaccine record. Enter the vaccine name, date administered, and the next due date. The app will remind you automatically.',
        },
      ],
    },
    {
      slug: 'activity',
      title: 'Activity',
      icon: 'Activity',
      items: [
        {
          question: 'How do I log an activity?',
          answer:
            'Tap the plus (+) button in the "Activity" tab. Enter the activity type (walk, play, exercise), duration, and an optional note. The entry is instantly reflected on your daily progress bar.',
        },
        {
          question: 'Is there automatic activity tracking?',
          answer:
            'Activities are currently logged manually. Automatic motion tracking is planned for upcoming updates.',
        },
        {
          question: 'How do I set activity goals?',
          answer:
            'You can customize your weekly activity goals in the profile settings. Recommended durations based on breed and age are shown automatically.',
        },
        {
          question: 'What is the badge system?',
          answer:
            'You earn special badges as you complete your activity goals. Badges are awarded for milestones like "7-Day Streak" or "First 100 Minutes".',
        },
      ],
    },
    {
      slug: 'community',
      title: 'Community',
      icon: 'Users',
      items: [
        {
          question: 'Is sharing required?',
          answer:
            'No, the community feature is completely optional. You can get full value from the app using only the tracking features.',
        },
        {
          question: 'Can I make my account private?',
          answer:
            'Yes, you can switch to private mode from the settings. In private mode, your posts are only visible to people you follow.',
        },
        {
          question: 'How do you moderate comments?',
          answer:
            'Content that violates community guidelines is reviewed by our AI-assisted and manual moderation team. Harmful content is removed within 24 hours.',
        },
        {
          question: 'How do I report a user?',
          answer:
            'Tap the three-dot (…) menu next to the relevant post or comment and select "Report".',
        },
      ],
    },
    {
      slug: 'account-subscription',
      title: 'Account & Subscription',
      icon: 'CreditCard',
      items: [
        {
          question: 'Is there a paid plan?',
          answer:
            'PawCal is free to use with its core features. A premium subscription is available for advanced analytics, unlimited pet profiles, and priority support.',
        },
        {
          question: 'What are the premium features?',
          answer:
            'The premium plan includes unlimited pet profiles, detailed nutrition analytics, PDF reporting, activity history archive, and an ad-free experience.',
        },
        {
          question: 'How do I delete my account?',
          answer:
            'Go to Settings > Account > Delete Account to permanently delete your account. You can also send a deletion request to info@pawcal.net.',
        },
        {
          question: 'How do I export my data?',
          answer:
            'Go to Settings > My Data > Export to download all your pet and health data in JSON or CSV format.',
        },
      ],
    },
  ],
};

export function getFAQCategories(locale: string): FAQCategory[] {
  return locale === 'en' ? faqCategoriesByLocale.en : faqCategoriesByLocale.tr;
}
