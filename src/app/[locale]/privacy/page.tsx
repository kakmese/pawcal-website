import type { Metadata } from 'next';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-16">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
            Gizlilik Politikası
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mb-10">
            Son güncelleme: 14 Nisan 2026
          </p>

          <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-[#A0A4AE] prose-li:text-[#A0A4AE] prose-strong:text-white prose-a:text-[#FF8F6B]">
            <h2>1. Giriş</h2>
            <p>PawCal Studio olarak gizliliğinize değer veriyoruz. Bu Gizlilik Politikası, PawCal mobil uygulamasını ve pawcal.net web sitesini kullanırken toplanan, işlenen ve saklanan kişisel verileriniz hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.</p>

            <h2>2. Topladığımız Veriler</h2>
            <p>Hizmetlerimizi sunabilmek için aşağıdaki veriler toplanmaktadır:</p>
            <ul>
              <li><strong>Hesap Bilgileri:</strong> E-posta adresi ve kimlik doğrulama bilgileri (Supabase Auth aracılığıyla). Adınızı veya soyadınızı zorunlu tutmuyoruz.</li>
              <li><strong>Evcil Hayvan Verileri:</strong> Evcil hayvanınızın adı, cinsi, yaşı, kilosu, fotoğrafı ve sağlık kayıtları.</li>
              <li><strong>Konum Verileri:</strong> Yalnızca uygulama ön plandayken ve yalnızca &quot;Yakındaki Veteriner ve Petshop&quot; özelliği için kullanılır.</li>
              <li><strong>Kamera Erişimi:</strong> Yalnızca barkod tarama için kullanılır. Hiçbir görüntü kaydedilmez veya aktarılmaz.</li>
              <li><strong>Cihaz ve Kullanım Verileri:</strong> Anonim analitik veriler.</li>
            </ul>

            <h2>3. Verileri Nasıl Kullanıyoruz</h2>
            <ul>
              <li>Hizmeti sunmak, sürdürmek ve iyileştirmek</li>
              <li>Evcil hayvan sağlık takip özelliklerini kişiselleştirmek</li>
              <li>İlaç ve aşı hatırlatıcıları göndermek</li>
              <li>Teknik destek sağlamak</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
            </ul>
            <p><strong>Verilerinizi üçüncü taraflara satmıyoruz.</strong></p>

            <h2>4. Veri Saklama</h2>
            <p>Hesabınız aktif olduğu sürece verileriniz saklanır. Hesabınızı sildiğinizde, tüm kişisel verileriniz 30 gün içinde sistemlerimizden kalıcı olarak kaldırılır.</p>

            <h2>5. Üçüncü Taraf Servisler</h2>
            <ul>
              <li><strong>Supabase:</strong> Veritabanı ve kimlik doğrulama altyapısı.</li>
              <li><strong>Open Food Facts:</strong> Barkod ve ürün besin bilgileri.</li>
              <li><strong>Apple Push Notifications:</strong> Hatırlatıcı bildirimleri için.</li>
              <li><strong>Google Maps:</strong> Yakındaki veteriner ve petshop harita görünümü için.</li>
            </ul>

            <h2>6. Çerezler</h2>
            <p>Web sitemiz temel işlevsellik ve analitik amaçlı çerezler kullanmaktadır. Ayrıntılar için Çerez Politikamızı inceleyiniz.</p>

            <h2>7. Çocukların Gizliliği</h2>
            <p>Hizmetlerimiz 13 yaş altı bireylere yönelik değildir.</p>

            <h2>8. Haklarınız (KVKK ve GDPR)</h2>
            <p>Kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz: erişim, düzeltme, silme, itiraz ve taşınabilirlik. Bu haklarınızı kullanmak için info@pawcal.net adresine yazabilirsiniz.</p>

            <h2>9. Veri Silme Talebi</h2>
            <p>Hesabınızı ve tüm ilişkili verilerinizi silmek için uygulama içinden (Ayarlar &gt; Hesabı Sil) veya info@pawcal.net adresine e-posta göndererek talepte bulunabilirsiniz.</p>

            <h2>10. Değişiklikler</h2>
            <p>Bu politikayı zaman zaman güncelleyebiliriz. Güncel politika her zaman pawcal.net/privacy adresinde yayımlanır.</p>

            <h2>11. İletişim</h2>
            <p>Gizlilik ile ilgili sorularınız için:<br />
            <strong>E-posta:</strong> info@pawcal.net<br />
            <strong>Lokasyon:</strong> Türkiye</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
