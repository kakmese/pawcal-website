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
    title: locale === 'tr' ? 'Çerez Politikası' : 'Cookie Policy',
  };
}

export default async function CookiesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cookies' });

  return (
    <section className="pt-32 pb-16">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
            {t('title')}
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mb-10">{t('lastUpdated')}</p>

          {locale === 'tr' ? <CookiesTR /> : <CookiesEN />}
        </div>
      </Container>
    </section>
  );
}

function CookiesTR() {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-[#A0A4AE] prose-li:text-[#A0A4AE] prose-strong:text-white prose-a:text-[#FF8F6B]">
      <h2>Çerez Nedir?</h2>
      <p>Çerezler, web sitesi ziyaretiniz sırasında tarayıcınıza yerleştirilen küçük metin dosyalarıdır. Web sitelerinin düzgün çalışmasına, kullanıcı tercihlerinin hatırlanmasına ve kullanım istatistiklerinin toplanmasına yardımcı olurlar.</p>

      <h2>Kullandığımız Çerez Türleri</h2>

      <h3>Zorunlu Çerezler</h3>
      <p>Web sitesinin temel işlevleri için gereklidir. Bu çerezler devre dışı bırakılamaz çünkü site bunlar olmadan düzgün çalışmaz. Dil tercihi, oturum bilgileri ve çerez onay durumu bu kategoriye girer.</p>

      <h3>Analitik Çerezler</h3>
      <p>Ziyaretçilerin web sitesini nasıl kullandığını anlamamıza yardımcı olur. Toplanan veriler anonimleştirilmiş olup kişisel kimliğinizi belirlemez. En çok ziyaret edilen sayfalar, ziyaret süresi ve hata raporları bu yolla izlenir.</p>

      <h3>Fonksiyonel Çerezler</h3>
      <p>Tema tercihi (açık/koyu mod) ve dil seçimi gibi kişiselleştirme ayarlarınızı hatırlar. Bu çerezler olmadan her ziyarette tercihlerinizi yeniden ayarlamanız gerekir.</p>

      <h2>KVKK ve GDPR Uyumu</h2>
      <p>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve AB Genel Veri Koruma Yönetmeliği (GDPR) kapsamında, zorunlu olmayan çerezlerin kullanımı için açık rızanızı almaktayız. İlk ziyaretinizde gösterilen çerez banner'ı aracılığıyla tercihlerinizi belirleyebilirsiniz.</p>

      <h2>Çerezleri Nasıl Yönetirsiniz?</h2>
      <p>Tarayıcınızın ayarlar bölümünden çerezleri yönetebilir, engelleyebilir veya silebilirsiniz. Zorunlu çerezlerin engellenmesi web sitesinin işlevselliğini olumsuz etkileyebilir.</p>

      <ul>
        <li><strong>Chrome:</strong> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler</li>
        <li><strong>Firefox:</strong> Ayarlar &gt; Gizlilik ve Güvenlik</li>
        <li><strong>Safari:</strong> Tercihler &gt; Gizlilik</li>
      </ul>

      <h2>Üçüncü Taraf Çerezleri</h2>
      <p>Web sitemiz anonim analitik için üçüncü taraf araçlar kullanabilir. Bu araçların çerez politikaları kendi web sitelerinde mevcuttur. Kişisel verileriniz bu araçlarla paylaşılmaz.</p>

      <h2>İletişim</h2>
      <p>Çerez politikamız hakkında sorularınız için: <a href="mailto:info@pawcal.net">info@pawcal.net</a></p>
    </div>
  );
}

function CookiesEN() {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-[#A0A4AE] prose-li:text-[#A0A4AE] prose-strong:text-white prose-a:text-[#FF8F6B]">
      <h2>What Are Cookies?</h2>
      <p>Cookies are small text files placed in your browser during your website visit. They help websites function properly, remember user preferences, and collect usage statistics.</p>

      <h2>Types of Cookies We Use</h2>

      <h3>Essential Cookies</h3>
      <p>Required for the basic functions of the website. These cookies cannot be disabled because the site won't work properly without them. Language preference, session information, and cookie consent status fall into this category.</p>

      <h3>Analytics Cookies</h3>
      <p>Help us understand how visitors use the website. Collected data is anonymized and does not identify you personally. Most visited pages, visit duration, and error reports are tracked this way.</p>

      <h3>Functional Cookies</h3>
      <p>Remember your personalization settings such as theme preference (light/dark mode) and language selection. Without these cookies, you would need to reset your preferences on every visit.</p>

      <h2>KVKK and GDPR Compliance</h2>
      <p>Under Turkey's Personal Data Protection Law (KVKK) and the EU General Data Protection Regulation (GDPR), we obtain your explicit consent for non-essential cookies. You can set your preferences through the cookie banner shown on your first visit.</p>

      <h2>How to Manage Cookies</h2>
      <p>You can manage, block, or delete cookies from your browser's settings section. Blocking essential cookies may negatively affect website functionality.</p>

      <ul>
        <li><strong>Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies</li>
        <li><strong>Firefox:</strong> Settings &gt; Privacy & Security</li>
        <li><strong>Safari:</strong> Preferences &gt; Privacy</li>
      </ul>

      <h2>Third-Party Cookies</h2>
      <p>Our website may use third-party tools for anonymous analytics. The cookie policies of these tools are available on their respective websites. Your personal data is not shared with these tools.</p>

      <h2>Contact</h2>
      <p>For questions about our cookie policy: <a href="mailto:info@pawcal.net">info@pawcal.net</a></p>
    </div>
  );
}
