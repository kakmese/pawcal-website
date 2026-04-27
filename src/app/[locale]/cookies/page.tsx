import type { Metadata } from 'next';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Çerez Politikası',
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CookiesPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <section className="pt-32 pb-16">
      <Container>
        <div className="max-w-3xl mx-auto">
          {locale === 'en' && (
            <div className="bg-[#FF8F6B]/10 border border-[#FF8F6B]/20 rounded-2xl p-4 mb-8 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                📄 This page is currently available in Turkish only, as PawCal Studio operates from Turkey.
              </p>
            </div>
          )}

          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
            Çerez Politikası
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mb-10">
            Son güncelleme: 14 Nisan 2026
          </p>

          <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-[#A0A4AE] prose-li:text-[#A0A4AE] prose-strong:text-white prose-a:text-[#FF8F6B]">
            <h2>Çerez Nedir?</h2>
            <p>Çerezler, web sitesi ziyaretiniz sırasında tarayıcınıza yerleştirilen küçük metin dosyalarıdır.</p>

            <h2>Kullandığımız Çerez Türleri</h2>

            <h3>Zorunlu Çerezler</h3>
            <p>Web sitesinin temel işlevleri için gereklidir. Dil tercihi, oturum bilgileri ve çerez onay durumu bu kategoriye girer.</p>

            <h3>Analitik Çerezler</h3>
            <p>Ziyaretçilerin web sitesini nasıl kullandığını anlamamıza yardımcı olur. Toplanan veriler anonimleştirilmiş olup kişisel kimliğinizi belirlemez.</p>

            <h3>Fonksiyonel Çerezler</h3>
            <p>Tema tercihi (açık/koyu mod) gibi kişiselleştirme ayarlarınızı hatırlar.</p>

            <h2>KVKK ve GDPR Uyumu</h2>
            <p>Zorunlu olmayan çerezlerin kullanımı için açık rızanızı almaktayız.</p>

            <h2>Çerezleri Nasıl Yönetirsiniz?</h2>
            <ul>
              <li><strong>Chrome:</strong> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler</li>
              <li><strong>Firefox:</strong> Ayarlar &gt; Gizlilik ve Güvenlik</li>
              <li><strong>Safari:</strong> Tercihler &gt; Gizlilik</li>
            </ul>

            <h2>İletişim</h2>
            <p>Çerez politikamız hakkında sorularınız için: <a href="mailto:info@pawcal.net">info@pawcal.net</a></p>
          </div>
        </div>
      </Container>
    </section>
  );
}
