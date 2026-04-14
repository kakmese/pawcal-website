import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/config';
import Container from '@/components/ui/Container';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy',
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <section className="pt-32 pb-16">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
            {t('title')}
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mb-10">{t('lastUpdated')}</p>

          {locale === 'tr' ? <PrivacyTR /> : <PrivacyEN />}
        </div>
      </Container>
    </section>
  );
}

function PrivacyTR() {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-[#A0A4AE] prose-li:text-[#A0A4AE] prose-strong:text-white prose-a:text-[#FF8F6B]">
      <h2>1. Giriş</h2>
      <p>PawCal Studio olarak gizliliğinize değer veriyoruz. Bu Gizlilik Politikası, PawCal mobil uygulamasını ve pawcal.net web sitesini kullanırken toplanan, işlenen ve saklanan kişisel verileriniz hakkında sizi bilgilendirmek amacıyla hazırlanmıştır. Bu politikayı dikkatlice okumanızı öneririz.</p>

      <h2>2. Topladığımız Veriler</h2>
      <p>Hizmetlerimizi sunabilmek için aşağıdaki veriler toplanmaktadır:</p>
      <ul>
        <li><strong>Hesap Bilgileri:</strong> E-posta adresi ve kimlik doğrulama bilgileri (Supabase Auth aracılığıyla). Adınızı veya soyadınızı zorunlu tutmuyoruz.</li>
        <li><strong>Evcil Hayvan Verileri:</strong> Evcil hayvanınızın adı, cinsi, yaşı, kilosu, fotoğrafı ve sağlık kayıtları (ilaç, aşı, beslenme, aktivite geçmişi).</li>
        <li><strong>Konum Verileri:</strong> Yalnızca uygulama ön plandayken ve yalnızca "Yakındaki Veteriner ve Petshop" özelliği için kullanılır. Konum geçmişi sunucularımızda saklanmaz.</li>
        <li><strong>Kamera Erişimi:</strong> Yalnızca barkod tarama için kullanılır. Hiçbir görüntü kaydedilmez veya aktarılmaz.</li>
        <li><strong>Cihaz ve Kullanım Verileri:</strong> Anonim analitik veriler (uygulama sürümü, işletim sistemi sürümü, özellik kullanım istatistikleri). Kişisel kimliğinizle ilişkilendirilmez.</li>
      </ul>

      <h2>3. Verileri Nasıl Kullanıyoruz</h2>
      <ul>
        <li>Hizmeti sunmak, sürdürmek ve iyileştirmek</li>
        <li>Evcil hayvan sağlık takip özelliklerini kişiselleştirmek</li>
        <li>İlaç ve aşı hatırlatıcıları göndermek</li>
        <li>Teknik destek sağlamak</li>
        <li>Yasal yükümlülükleri yerine getirmek</li>
      </ul>
      <p><strong>Verilerinizi üçüncü taraflara satmıyoruz.</strong> Reklam amacıyla profil oluşturma yapmıyoruz.</p>

      <h2>4. Veri Saklama</h2>
      <p>Hesabınız aktif olduğu sürece verileriniz saklanır. Hesabınızı sildiğinizde, tüm kişisel verileriniz 30 gün içinde sistemlerimizden kalıcı olarak kaldırılır. Yasal zorunluluk gerektiren veriler bu süre için saklanabilir.</p>

      <h2>5. Üçüncü Taraf Servisler</h2>
      <ul>
        <li><strong>Supabase:</strong> Veritabanı ve kimlik doğrulama altyapısı. Verileriniz şifreli olarak saklanır.</li>
        <li><strong>Open Food Facts:</strong> Barkod ve ürün besin bilgileri. Açık kaynaklı, kişisel veri içermez.</li>
        <li><strong>Apple Push Notifications:</strong> Hatırlatıcı bildirimleri için Apple APNs kullanılır.</li>
        <li><strong>Google Maps:</strong> Yakındaki veteriner ve petshop harita görünümü için. Konum verisi Google'a aktarılır (Google Gizlilik Politikası geçerlidir).</li>
        <li><strong>Analytics:</strong> Anonim kullanım istatistikleri. Kişisel kimliğinizi belirleyecek bilgi içermez.</li>
      </ul>

      <h2>6. Çerezler</h2>
      <p>Web sitemiz temel işlevsellik ve analitik amaçlı çerezler kullanmaktadır. Çerez tercihlerinizi tarayıcınız üzerinden yönetebilirsiniz. Ayrıntılar için Çerez Politikamızı inceleyiniz.</p>

      <h2>7. Çocukların Gizliliği</h2>
      <p>Hizmetlerimiz 13 yaş altı bireylere yönelik değildir. 13 yaşından küçük bireylerden bilerek kişisel veri toplamıyoruz. 13 yaş altı bir çocuğun veri sağladığını fark etmemiz durumunda ilgili verileri derhal sileceğiz.</p>

      <h2>8. Haklarınız (KVKK ve GDPR)</h2>
      <p>Kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:</p>
      <ul>
        <li>Verilerinize erişim hakkı</li>
        <li>Verilerinizin düzeltilmesini talep etme hakkı</li>
        <li>Verilerinizin silinmesini talep etme hakkı</li>
        <li>Verilerinizin işlenmesine itiraz etme hakkı</li>
        <li>Verilerinizin taşınabilirlik hakkı</li>
      </ul>
      <p>Bu haklarınızı kullanmak için info@pawcal.net adresine yazabilirsiniz.</p>

      <h2>9. Veri Silme Talebi</h2>
      <p>Hesabınızı ve tüm ilişkili verilerinizi silmek için uygulama içinden (Ayarlar &gt; Hesabı Sil) veya info@pawcal.net adresine e-posta göndererek talepte bulunabilirsiniz. Talebiniz 30 gün içinde işleme konulur.</p>

      <h2>10. Değişiklikler</h2>
      <p>Bu politikayı zaman zaman güncelleyebiliriz. Önemli değişikliklerde uygulama içi bildirim veya e-posta yoluyla haberdar edilirsiniz. Güncel politika her zaman pawcal.net/privacy adresinde yayımlanır.</p>

      <h2>11. İletişim</h2>
      <p>Gizlilik ile ilgili sorularınız için:<br />
      <strong>E-posta:</strong> info@pawcal.net<br />
      <strong>Lokasyon:</strong> Türkiye</p>
    </div>
  );
}

function PrivacyEN() {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-[#A0A4AE] prose-li:text-[#A0A4AE] prose-strong:text-white prose-a:text-[#FF8F6B]">
      <h2>1. Introduction</h2>
      <p>At PawCal Studio, we value your privacy. This Privacy Policy is prepared to inform you about the personal data collected, processed, and stored while using the PawCal mobile application and the pawcal.net website. We recommend reading this policy carefully.</p>

      <h2>2. Data We Collect</h2>
      <p>The following data is collected to provide our services:</p>
      <ul>
        <li><strong>Account Information:</strong> Email address and authentication data (via Supabase Auth). We do not require your first or last name.</li>
        <li><strong>Pet Data:</strong> Your pet's name, breed, age, weight, photo, and health records (medications, vaccinations, nutrition, activity history).</li>
        <li><strong>Location Data:</strong> Used only while the app is in the foreground and only for the "Nearby Vets & Pet Stores" feature. Location history is not stored on our servers.</li>
        <li><strong>Camera Access:</strong> Used only for barcode scanning. No images are recorded or transmitted.</li>
        <li><strong>Device and Usage Data:</strong> Anonymous analytics data (app version, OS version, feature usage statistics). Not associated with your personal identity.</li>
      </ul>

      <h2>3. How We Use Data</h2>
      <ul>
        <li>To provide, maintain, and improve the service</li>
        <li>To personalize pet health tracking features</li>
        <li>To send medication and vaccination reminders</li>
        <li>To provide technical support</li>
        <li>To fulfill legal obligations</li>
      </ul>
      <p><strong>We do not sell your data to third parties.</strong> We do not create advertising profiles.</p>

      <h2>4. Data Retention</h2>
      <p>Your data is retained as long as your account is active. When you delete your account, all personal data will be permanently removed from our systems within 30 days. Data required by legal obligation may be retained for that period.</p>

      <h2>5. Third-Party Services</h2>
      <ul>
        <li><strong>Supabase:</strong> Database and authentication infrastructure. Your data is stored encrypted.</li>
        <li><strong>Open Food Facts:</strong> Barcode and product nutritional information. Open source, contains no personal data.</li>
        <li><strong>Apple Push Notifications:</strong> Apple APNs is used for reminder notifications.</li>
        <li><strong>Google Maps:</strong> For nearby vet and pet store map view. Location data is passed to Google (Google Privacy Policy applies).</li>
        <li><strong>Analytics:</strong> Anonymous usage statistics. Contains no information that would identify you personally.</li>
      </ul>

      <h2>6. Cookies</h2>
      <p>Our website uses cookies for basic functionality and analytics. You can manage your cookie preferences through your browser. See our Cookie Policy for details.</p>

      <h2>7. Children's Privacy</h2>
      <p>Our services are not directed at individuals under 13 years of age. We do not knowingly collect personal data from children under 13. If we become aware that a child under 13 has provided data, we will immediately delete the relevant data.</p>

      <h2>8. Your Rights (KVKK and GDPR)</h2>
      <p>You have the following rights regarding your personal data:</p>
      <ul>
        <li>Right to access your data</li>
        <li>Right to request correction of your data</li>
        <li>Right to request deletion of your data</li>
        <li>Right to object to processing of your data</li>
        <li>Right to data portability</li>
      </ul>
      <p>To exercise these rights, you may write to info@pawcal.net.</p>

      <h2>9. Data Deletion Request</h2>
      <p>To delete your account and all associated data, you may request through the app (Settings &gt; Delete Account) or by sending an email to info@pawcal.net. Your request will be processed within 30 days.</p>

      <h2>10. Changes</h2>
      <p>We may update this policy from time to time. You will be notified of significant changes via in-app notification or email. The current policy is always published at pawcal.net/privacy.</p>

      <h2>11. Contact</h2>
      <p>For privacy-related questions:<br />
      <strong>Email:</strong> info@pawcal.net<br />
      <strong>Location:</strong> Turkey</p>
    </div>
  );
}
