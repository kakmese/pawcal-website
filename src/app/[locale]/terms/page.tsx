import type { Metadata } from 'next';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Kullanım Şartları',
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-16">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
            Kullanım Şartları
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mb-10">
            Son güncelleme: 14 Nisan 2026
          </p>

          <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-[#A0A4AE] prose-li:text-[#A0A4AE] prose-strong:text-white prose-a:text-[#FF8F6B]">
            <h2>1. Şartların Kabulü</h2>
            <p>PawCal mobil uygulamasını veya pawcal.net web sitesini kullanarak bu Kullanım Şartlarını kabul etmiş sayılırsınız.</p>

            <h2>2. Hizmetin Tanımı</h2>
            <p>PawCal; evcil hayvan beslenme takibi, kilo ve büyüme grafikleri, ilaç hatırlatıcıları, aktivite kaydı, yakındaki veteriner ve petshop keşfi ile topluluk paylaşımı özelliklerini sunan bir iOS mobil uygulamasıdır.</p>

            <h2>3. Kullanıcı Hesabı</h2>
            <p>Hesap oluşturmak için geçerli bir e-posta adresi gereklidir. Hesap güvenliğinizden siz sorumlusunuz. Yetkisiz erişim durumunda derhal info@pawcal.net adresine bildiriniz.</p>

            <h2>4. İçerik Kuralları</h2>
            <p>Topluluk özelliğini kullanırken aşağıdaki içerikleri paylaşmak yasaktır:</p>
            <ul>
              <li>Hayvan istismarı veya şiddeti içeren içerikler</li>
              <li>Nefret söylemi, ayrımcılık veya taciz</li>
              <li>Yanıltıcı veya yanlış sağlık bilgileri</li>
              <li>Ticari spam veya izinsiz reklam</li>
            </ul>

            <h2>5. Yasaklı Kullanım</h2>
            <ul>
              <li>Hizmetin tersine mühendisliği</li>
              <li>Otomatik araçlarla veri kazıma</li>
              <li>Hizmetin güvenliğini tehdit eden girişimler</li>
              <li>Sahte hesap oluşturma veya kimlik taklidi</li>
            </ul>

            <h2>6. Fikri Mülkiyet</h2>
            <p>PawCal uygulaması, logosu, tasarımı ve içerikleri PawCal Studio&apos;ya aittir.</p>

            <h2>7. Feragat — Tıbbi Tavsiye Değildir</h2>
            <p><strong>ÖNEMLİ UYARI:</strong> PawCal bir evcil hayvan sağlık takip aracıdır ve veteriner tavsiyesinin yerini tutmaz. Evcil hayvanınızın sağlığıyla ilgili tüm tıbbi kararlar için mutlaka lisanslı bir veterinere başvurunuz.</p>

            <h2>8. Sorumluluk Sınırlaması</h2>
            <p>PawCal Studio, hizmetin kesintisiz veya hatasız olacağını garanti etmez.</p>

            <h2>9. Sonlandırma</h2>
            <p>PawCal Studio, şartları ihlal eden kullanıcıların hesaplarını askıya alma veya sonlandırma hakkını saklı tutar.</p>

            <h2>10. Geçerli Hukuk</h2>
            <p>Bu şartlar Türkiye Cumhuriyeti yasalarına tabidir.</p>

            <h2>11. Değişiklikler</h2>
            <p>Bu şartlar gerektiğinde güncellenebilir. Güncel sürüm her zaman pawcal.net/terms adresinde yayımlanır.</p>

            <h2>12. İletişim</h2>
            <p><strong>E-posta:</strong> info@pawcal.net<br />
            <strong>Lokasyon:</strong> Türkiye</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
