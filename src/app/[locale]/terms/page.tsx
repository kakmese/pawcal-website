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
    title: locale === 'tr' ? 'Kullanım Şartları' : 'Terms of Service',
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });

  return (
    <section className="pt-32 pb-16">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
            {t('title')}
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mb-10">{t('lastUpdated')}</p>

          {locale === 'tr' ? <TermsTR /> : <TermsEN />}
        </div>
      </Container>
    </section>
  );
}

function TermsTR() {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-[#A0A4AE] prose-li:text-[#A0A4AE] prose-strong:text-white prose-a:text-[#FF8F6B]">
      <h2>1. Şartların Kabulü</h2>
      <p>PawCal mobil uygulamasını veya pawcal.net web sitesini kullanarak bu Kullanım Şartlarını kabul etmiş sayılırsınız. Bu şartları kabul etmiyorsanız hizmeti kullanmayınız. PawCal Studio, bu şartları önceden bildirimde bulunarak değiştirme hakkını saklı tutar.</p>

      <h2>2. Hizmetin Tanımı</h2>
      <p>PawCal; evcil hayvan beslenme takibi, kilo ve büyüme grafikleri, ilaç hatırlatıcıları, aktivite kaydı, yakındaki veteriner ve petshop keşfi ile topluluk paylaşımı özelliklerini sunan bir iOS mobil uygulamasıdır. Hizmet, bildirim yapılmaksızın değiştirilebilir veya sonlandırılabilir.</p>

      <h2>3. Kullanıcı Hesabı</h2>
      <p>Hesap oluşturmak için geçerli bir e-posta adresi gereklidir. Hesap güvenliğinizden ve gerçekleştirilen tüm işlemlerden siz sorumlusunuz. Hesap bilgilerinizi üçüncü kişilerle paylaşmayınız. Yetkisiz erişim durumunda derhal info@pawcal.net adresine bildiriniz.</p>

      <h2>4. İçerik Kuralları</h2>
      <p>Topluluk özelliğini kullanırken aşağıdaki içerikleri paylaşmak yasaktır:</p>
      <ul>
        <li>Hayvan istismarı veya şiddeti içeren içerikler</li>
        <li>Nefret söylemi, ayrımcılık veya taciz</li>
        <li>Yanıltıcı veya yanlış sağlık bilgileri</li>
        <li>Ticari spam veya izinsiz reklam</li>
        <li>Telif hakkı ihlali içeren materyaller</li>
      </ul>

      <h2>5. Yasaklı Kullanım</h2>
      <p>Aşağıdaki eylemler kesinlikle yasaktır:</p>
      <ul>
        <li>Hizmetin tersine mühendisliği veya kaynak kodunun elde edilmesi</li>
        <li>Otomatik araçlarla veri kazıma (scraping)</li>
        <li>Hizmetin güvenliğini tehdit eden girişimler</li>
        <li>Başka kullanıcıların deneyimini olumsuz etkileyen davranışlar</li>
        <li>Sahte hesap oluşturma veya kimlik taklidi</li>
      </ul>

      <h2>6. Fikri Mülkiyet</h2>
      <p>PawCal uygulaması, logosu, tasarımı, kodu ve içerikleri PawCal Studio'ya aittir ve Türkiye Cumhuriyeti ile uluslararası fikri mülkiyet yasaları kapsamında korunmaktadır. İzinsiz kopyalama, çoğaltma veya dağıtım yasaktır.</p>

      <h2>7. Feragat — Tıbbi Tavsiye Değildir</h2>
      <p><strong>ÖNEMLİ UYARI:</strong> PawCal bir evcil hayvan sağlık takip aracıdır ve veteriner tavsiyesinin yerini tutmaz. Uygulama içindeki hiçbir bilgi, öneri veya analiz tıbbi teşhis veya tedavi niteliği taşımaz. Evcil hayvanınızın sağlığıyla ilgili tüm tıbbi kararlar için mutlaka lisanslı bir veterinere başvurunuz. Uygulamanın sağladığı veriler yalnızca bilgilendirme amaçlıdır.</p>

      <h2>8. Sorumluluk Sınırlaması</h2>
      <p>PawCal Studio, hizmetin kesintisiz veya hatasız olacağını garanti etmez. Veri kaybı, hizmet kesintisi veya üçüncü taraf hizmetlerden kaynaklanan zararlardan PawCal Studio sorumlu tutulamaz. Yürürlükteki mevzuatın izin verdiği azami ölçüde sorumluluk sınırlandırılmıştır.</p>

      <h2>9. Sonlandırma</h2>
      <p>PawCal Studio, bu şartları ihlal eden kullanıcıların hesaplarını önceden bildirimde bulunmaksızın askıya alma veya sonlandırma hakkını saklı tutar. Kullanıcılar dilediği zaman hesabını silebilir.</p>

      <h2>10. Geçerli Hukuk</h2>
      <p>Bu şartlar Türkiye Cumhuriyeti yasalarına tabidir. Olası anlaşmazlıklarda Türkiye Cumhuriyeti mahkemeleri yetkilidir.</p>

      <h2>11. Değişiklikler</h2>
      <p>Bu şartlar gerektiğinde güncellenebilir. Önemli değişiklikler uygulama içi bildirim veya e-posta ile duyurulur. Güncel sürüm her zaman pawcal.net/terms adresinde yayımlanır.</p>

      <h2>12. İletişim</h2>
      <p>Kullanım şartlarıyla ilgili sorularınız için:<br />
      <strong>E-posta:</strong> info@pawcal.net<br />
      <strong>Lokasyon:</strong> Türkiye</p>
    </div>
  );
}

function TermsEN() {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-[#A0A4AE] prose-li:text-[#A0A4AE] prose-strong:text-white prose-a:text-[#FF8F6B]">
      <h2>1. Acceptance of Terms</h2>
      <p>By using the PawCal mobile application or the pawcal.net website, you are deemed to have accepted these Terms of Service. If you do not accept these terms, please do not use the service. PawCal Studio reserves the right to modify these terms with prior notice.</p>

      <h2>2. Service Description</h2>
      <p>PawCal is an iOS mobile application offering pet nutrition tracking, weight and growth charts, medication reminders, activity logging, nearby vet and pet store discovery, and community sharing features. The service may be modified or discontinued without notice.</p>

      <h2>3. User Account</h2>
      <p>A valid email address is required to create an account. You are responsible for your account security and all activities performed. Do not share your account credentials with third parties. In the event of unauthorized access, notify info@pawcal.net immediately.</p>

      <h2>4. Content Rules</h2>
      <p>When using the community feature, sharing the following content is prohibited:</p>
      <ul>
        <li>Content containing animal abuse or violence</li>
        <li>Hate speech, discrimination, or harassment</li>
        <li>Misleading or false health information</li>
        <li>Commercial spam or unauthorized advertising</li>
        <li>Materials containing copyright infringement</li>
      </ul>

      <h2>5. Prohibited Use</h2>
      <p>The following actions are strictly prohibited:</p>
      <ul>
        <li>Reverse engineering the service or obtaining source code</li>
        <li>Data scraping using automated tools</li>
        <li>Attempts to compromise the security of the service</li>
        <li>Behaviors that negatively affect other users' experience</li>
        <li>Creating fake accounts or identity impersonation</li>
      </ul>

      <h2>6. Intellectual Property</h2>
      <p>The PawCal application, logo, design, code, and content belong to PawCal Studio and are protected under the Republic of Turkey and international intellectual property laws. Unauthorized copying, reproduction, or distribution is prohibited.</p>

      <h2>7. Disclaimer — Not Veterinary Advice</h2>
      <p><strong>IMPORTANT NOTICE:</strong> PawCal is a pet health tracking tool and does not replace veterinary advice. No information, recommendation, or analysis within the application constitutes medical diagnosis or treatment. For all medical decisions regarding your pet's health, always consult a licensed veterinarian. Data provided by the application is for informational purposes only.</p>

      <h2>8. Limitation of Liability</h2>
      <p>PawCal Studio does not guarantee that the service will be uninterrupted or error-free. PawCal Studio cannot be held liable for data loss, service interruptions, or damages arising from third-party services. Liability is limited to the maximum extent permitted by applicable law.</p>

      <h2>9. Termination</h2>
      <p>PawCal Studio reserves the right to suspend or terminate accounts of users who violate these terms without prior notice. Users may delete their account at any time.</p>

      <h2>10. Governing Law</h2>
      <p>These terms are governed by the laws of the Republic of Turkey. Turkish courts have jurisdiction for any potential disputes.</p>

      <h2>11. Changes</h2>
      <p>These terms may be updated as needed. Significant changes will be announced via in-app notification or email. The current version is always published at pawcal.net/terms.</p>

      <h2>12. Contact</h2>
      <p>For questions about the terms of service:<br />
      <strong>Email:</strong> info@pawcal.net<br />
      <strong>Location:</strong> Turkey</p>
    </div>
  );
}
