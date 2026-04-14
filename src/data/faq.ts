export interface FAQItem {
  question: { tr: string; en: string };
  answer: { tr: string; en: string };
}

export interface FAQCategory {
  slug: string;
  title: { tr: string; en: string };
  icon: string;
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    slug: 'getting-started',
    title: { tr: 'Başlarken', en: 'Getting Started' },
    icon: 'Rocket',
    items: [
      {
        question: { tr: 'PawCal nedir?', en: 'What is PawCal?' },
        answer: {
          tr: 'PawCal, evcil hayvanınızın beslenme, sağlık ve aktivitesini takip etmenizi sağlayan akıllı bir iOS uygulamasıdır. Mama porsiyonlarından ilaç takvimlerine kadar tüm verileri tek bir platformda yönetebilirsiniz.',
          en: 'PawCal is a smart iOS app that lets you track your pet\'s nutrition, health, and activity. You can manage all data from meal portions to medication schedules on a single platform.',
        },
      },
      {
        question: { tr: 'Uygulamayı nasıl indiririm?', en: 'How do I download the app?' },
        answer: {
          tr: 'PawCal, App Store\'dan ücretsiz olarak indirilebilir. Arama çubuğuna "PawCal" yazmanız yeterli. iOS 16 ve üzeri sürümler desteklenmektedir.',
          en: 'PawCal is available for free on the App Store. Simply search for "PawCal". iOS 16 and above is supported.',
        },
      },
      {
        question: { tr: 'İlk evcil hayvanımı nasıl eklerim?', en: 'How do I add my first pet?' },
        answer: {
          tr: 'Uygulamayı açtıktan sonra "Evcil Hayvan Ekle" butonuna dokunun. İsim, cins, doğum tarihi ve fotoğraf gibi bilgileri girin. Profil oluşturulduktan sonra takibe başlayabilirsiniz.',
          en: 'After opening the app, tap "Add Pet". Enter details like name, breed, date of birth, and photo. Once the profile is created, you can start tracking.',
        },
      },
      {
        question: { tr: 'Veriler cihazda mı saklanıyor, bulutta mı?', en: 'Are data stored on device or in the cloud?' },
        answer: {
          tr: 'Verileriniz Supabase altyapısıyla güvenli bulut depolama kullanılarak saklanır. Bu sayede cihaz değiştirdiğinizde verileriniz kaybolmaz. Tüm bağlantılar şifreli (TLS) olarak gerçekleşir.',
          en: 'Your data is stored using secure cloud storage powered by Supabase. This means your data is safe even if you change devices. All connections are encrypted (TLS).',
        },
      },
    ],
  },
  {
    slug: 'nutrition',
    title: { tr: 'Beslenme', en: 'Nutrition' },
    icon: 'Utensils',
    items: [
      {
        question: { tr: 'Barkod tarama nasıl çalışır?', en: 'How does barcode scanning work?' },
        answer: {
          tr: 'Kamera butonuna dokunarak mama paketinin arkasındaki barkodu kameranıza gösterin. PawCal, Open Food Facts veritabanını kullanarak ürünü otomatik olarak tanır ve besin bilgilerini ekrana getirir.',
          en: 'Tap the camera button and show the barcode on the back of the food package to your camera. PawCal uses the Open Food Facts database to automatically identify the product and display its nutritional information.',
        },
      },
      {
        question: { tr: 'Mama bulamadım ne yapmalıyım?', en: 'What should I do if I can\'t find a pet food?' },
        answer: {
          tr: 'Ürün veritabanında yoksa manuel olarak ekleyebilirsiniz. İsim, kalori ve besin değerlerini kendiniz girerek özel bir ürün profili oluşturabilirsiniz. Bu veriler yalnızca hesabınızda saklanır.',
          en: 'If the product isn\'t in the database, you can add it manually. Create a custom product profile by entering the name, calories, and nutritional values yourself. This data is stored only in your account.',
        },
      },
      {
        question: { tr: 'Günlük kalori hedefi nasıl hesaplanıyor?', en: 'How is the daily calorie goal calculated?' },
        answer: {
          tr: 'PawCal, evcil hayvanınızın ağırlığı, yaşı, cinsiyeti ve aktivite düzeyine göre günlük kalori ihtiyacını hesaplar. Bu hesaplama genel veteriner rehberlerine dayanır. Veterinerinizin önerisi her zaman önceliklidir.',
          en: 'PawCal calculates the daily calorie requirement based on your pet\'s weight, age, sex, and activity level. This calculation is based on general veterinary guidelines. Your vet\'s recommendation always takes priority.',
        },
      },
      {
        question: { tr: 'Birden fazla öğün nasıl eklenir?', en: 'How do I add multiple meals?' },
        answer: {
          tr: '"Öğün Ekle" butonunu kullanarak günde istediğiniz kadar öğün kaydedebilirsiniz. Her öğün için saat, miktar ve mama türünü belirtebilirsiniz. Günlük toplam kalori otomatik güncellenir.',
          en: 'Use the "Add Meal" button to log as many meals as you want per day. For each meal, you can specify the time, amount, and food type. The daily total calories are updated automatically.',
        },
      },
    ],
  },
  {
    slug: 'health',
    title: { tr: 'Sağlık', en: 'Health' },
    icon: 'Heart',
    items: [
      {
        question: { tr: 'Kilo kaydını nasıl girerim?', en: 'How do I log a weight entry?' },
        answer: {
          tr: 'Sağlık sekmesindeki "Kilo Ekle" butonuna dokunun, tartı sonucunu girin ve kaydedin. Her kayıt grafiğe otomatik eklenir. Düzenli tartım için haftalık hatırlatıcı kurabilirsiniz.',
          en: 'Tap "Add Weight" in the Health tab, enter the scale result, and save. Every entry is automatically added to the chart. You can set a weekly reminder for regular weigh-ins.',
        },
      },
      {
        question: { tr: 'İlaç hatırlatıcı nasıl kurulur?', en: 'How do I set up a medication reminder?' },
        answer: {
          tr: '"İlaçlar" bölümünde "Yeni İlaç Ekle"ye dokunun. İlaç adı, dozu, başlangıç tarihi ve tekrar sıklığını belirtin. Belirtilen saatte bildirim alacaksınız. Hatırlatıcıyı dilediğinizde duraklatabilirsiniz.',
          en: 'In the "Medications" section, tap "Add New Medication". Enter the medication name, dosage, start date, and recurrence frequency. You\'ll receive a notification at the specified time. You can pause the reminder at any time.',
        },
      },
      {
        question: { tr: 'Veteriner raporu nasıl oluşturulur?', en: 'How do I generate a vet report?' },
        answer: {
          tr: 'Profil sayfasından "Rapor Oluştur" seçeneğini kullanın. İstediğiniz tarih aralığını seçin; kilo, beslenme, ilaç ve aktivite verileri otomatik olarak PDF formatında derlenir ve paylaşılabilir.',
          en: 'Use the "Generate Report" option from the profile page. Select your desired date range; weight, nutrition, medication, and activity data are automatically compiled into a shareable PDF.',
        },
      },
      {
        question: { tr: 'Aşı takvimi nasıl eklenir?', en: 'How do I add a vaccination schedule?' },
        answer: {
          tr: '"Sağlık" > "Aşılar" bölümünden yeni aşı kaydı ekleyebilirsiniz. Aşı adı, yapıldığı tarih ve bir sonraki tarih bilgilerini girin. Uygulama sizi otomatik olarak hatırlatacaktır.',
          en: 'You can add a new vaccination record from "Health" > "Vaccinations". Enter the vaccine name, date administered, and next due date. The app will automatically remind you.',
        },
      },
    ],
  },
  {
    slug: 'activity',
    title: { tr: 'Aktivite', en: 'Activity' },
    icon: 'Activity',
    items: [
      {
        question: { tr: 'Aktivite nasıl kaydedilir?', en: 'How do I log an activity?' },
        answer: {
          tr: '"Aktivite" sekmesindeki artı (+) butonuna dokunun. Aktivite türünü (yürüyüş, oyun, egzersiz), süreyi ve gerekirse notu girin. Kayıt anında günlük ilerleme çubuğuna yansır.',
          en: 'Tap the plus (+) button in the "Activity" tab. Enter the activity type (walk, play, exercise), duration, and optionally a note. The entry instantly reflects in the daily progress bar.',
        },
      },
      {
        question: { tr: 'Otomatik takip var mı?', en: 'Is there automatic tracking?' },
        answer: {
          tr: 'Şu an için aktiviteler manuel olarak kaydedilmektedir. Otomatik hareket takibi yaklaşan güncellemelerde planlanmaktadır. Yayınlandığında uygulama içi bildirimle haberdar edileceksiniz.',
          en: 'Currently, activities are logged manually. Automatic movement tracking is planned for upcoming updates. You will be notified via in-app notification when it\'s released.',
        },
      },
      {
        question: { tr: 'Hedefler nasıl belirlenir?', en: 'How do I set activity goals?' },
        answer: {
          tr: 'Profil ayarlarından haftalık aktivite hedeflerinizi özelleştirebilirsiniz. Cins ve yaşa göre önerilen süreler otomatik gösterilir, dilerseniz kendiniz de değiştirebilirsiniz.',
          en: 'You can customize your weekly activity goals from profile settings. Recommended durations by breed and age are shown automatically, but you can also change them yourself.',
        },
      },
      {
        question: { tr: 'Rozet sistemi nedir?', en: 'What is the badge system?' },
        answer: {
          tr: 'Aktivite hedeflerinizi tamamladıkça özel rozetler kazanırsınız. Rozetler "7 Gün Üst Üste Hedef" veya "İlk 100 Dakika" gibi kategorilerde verilir. Profilinizde görüntülenebilir.',
          en: 'You earn special badges as you complete your activity goals. Badges are awarded in categories like "7 Days in a Row Goal" or "First 100 Minutes". They can be displayed on your profile.',
        },
      },
    ],
  },
  {
    slug: 'community',
    title: { tr: 'Topluluk', en: 'Community' },
    icon: 'Users',
    items: [
      {
        question: { tr: 'Paylaşım yapmak zorunlu mu?', en: 'Is sharing mandatory?' },
        answer: {
          tr: 'Hayır, topluluk özelliği tamamen isteğe bağlıdır. Sadece takip özelliklerini kullanarak uygulamamızdan tam anlamıyla yararlanabilirsiniz. Topluluk bölümü isteyen kullanıcılar içindir.',
          en: 'No, the community feature is completely optional. You can get full benefit from our app using only the tracking features. The community section is for users who want it.',
        },
      },
      {
        question: { tr: 'Hesabımı gizli yapabilir miyim?', en: 'Can I make my account private?' },
        answer: {
          tr: 'Evet, ayarlar bölümünden hesabınızı gizli moda alabilirsiniz. Gizli hesaplarda paylaşımlarınız yalnızca takip ettiğiniz kişiler tarafından görülür.',
          en: 'Yes, you can set your account to private mode from the settings section. On private accounts, your posts are only visible to people you follow.',
        },
      },
      {
        question: { tr: 'Yorumları nasıl moderasyon yapıyorsunuz?', en: 'How do you moderate comments?' },
        answer: {
          tr: 'Topluluk kurallarını ihlal eden içerikler yapay zeka destekli ve manuel moderasyon ekibimiz tarafından incelenir. Zararlı içerikler 24 saat içinde kaldırılır. Kullanıcılar da içerikleri şikayet edebilir.',
          en: 'Content that violates community guidelines is reviewed by our AI-assisted and manual moderation team. Harmful content is removed within 24 hours. Users can also report content.',
        },
      },
      {
        question: { tr: 'Bir kullanıcıyı nasıl şikayet ederim?', en: 'How do I report a user?' },
        answer: {
          tr: 'İlgili gönderi veya yorumun yanındaki üç nokta (…) menüsüne dokunarak "Şikayet Et" seçeneğini kullanabilirsiniz. Şikayetiniz moderasyon ekibimize iletilir ve 24 saat içinde değerlendirilir.',
          en: 'You can use the "Report" option by tapping the three-dot (…) menu next to the relevant post or comment. Your report will be forwarded to our moderation team and reviewed within 24 hours.',
        },
      },
    ],
  },
  {
    slug: 'account-subscription',
    title: { tr: 'Hesap ve Abonelik', en: 'Account & Subscription' },
    icon: 'CreditCard',
    items: [
      {
        question: { tr: 'Ücretli bir plan var mı?', en: 'Is there a paid plan?' },
        answer: {
          tr: 'PawCal temel özellikleriyle ücretsiz kullanılabilir. İleri düzey analizler, sınırsız evcil hayvan profili ve öncelikli destek gibi özellikler için premium abonelik mevcuttur.',
          en: 'PawCal is available to use with basic features for free. A premium subscription is available for features like advanced analytics, unlimited pet profiles, and priority support.',
        },
      },
      {
        question: { tr: 'Premium özellikleri nelerdir?', en: 'What are the premium features?' },
        answer: {
          tr: 'Premium plan; sınırsız evcil hayvan profili, detaylı beslenme analizleri, PDF raporlama, aktivite geçmişi arşivi ve reklamlara maruz kalmama gibi özellikleri kapsar. Fiyatlandırma uygulama içinden görüntülenebilir.',
          en: 'The premium plan includes unlimited pet profiles, detailed nutrition analytics, PDF reporting, activity history archive, and an ad-free experience. Pricing can be viewed within the app.',
        },
      },
      {
        question: { tr: 'Hesabımı nasıl silerim?', en: 'How do I delete my account?' },
        answer: {
          tr: 'Ayarlar > Hesap > Hesabı Sil yolunu izleyerek hesabınızı kalıcı olarak silebilirsiniz. Silme talebinizi info@pawcal.net adresine de iletebilirsiniz. Tüm verileriniz 30 gün içinde sistemden kaldırılır.',
          en: 'You can permanently delete your account through Settings > Account > Delete Account. You can also send your deletion request to info@pawcal.net. All your data will be removed from the system within 30 days.',
        },
      },
      {
        question: { tr: 'Verilerimi nasıl dışa aktarırım?', en: 'How do I export my data?' },
        answer: {
          tr: 'Ayarlar > Verilerim > Dışa Aktar bölümünden tüm evcil hayvan ve sağlık verilerinizi JSON veya CSV formatında indirebilirsiniz. Dışa aktarma işlemi e-posta adresinize gönderilir.',
          en: 'From Settings > My Data > Export, you can download all your pet and health data in JSON or CSV format. The export will be sent to your email address.',
        },
      },
    ],
  },
];
