import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog-posts';
import Container from '@/components/ui/Container';
import CTASection from '@/components/CTASection';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <>
      <section className="pt-32 pb-8 bg-[var(--bg-secondary)]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#FF8F6B] text-sm font-semibold mb-6 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Bloga Dön
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-[#FF8F6B]/10 text-[#FF8F6B] text-xs font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                <Clock className="w-3 h-3" />
                {post.readingTime}
              </span>
              <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <User className="w-4 h-4" />
              Yazar: {post.author}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="h-64 md:h-80 rounded-3xl bg-gradient-to-br from-[#FF8F6B]/20 to-[#FF6B9D]/20 flex items-center justify-center mb-10">
              <span className="text-7xl">🐾</span>
            </div>

            <article className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:text-white
              prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
              prose-strong:text-white prose-a:text-[#FF8F6B]
              prose-li:text-[var(--text-secondary)]">
              {post.slug === 'kopek-kilo-takibi-neden-onemli' && <DogWeightContent />}
              {post.slug === 'ilk-kedi-eve-getirme-rehberi' && <FirstCatContent />}
            </article>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

function DogWeightContent() {
  return (
    <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
      <p className="text-lg">Köpeklerde obezite giderek yaygınlaşan ve ciddi sağlık sorunlarına yol açan bir durumdur. Association for Pet Obesity Prevention (APOP) verilerine göre, köpeklerin yaklaşık %56'sı fazla kilolu ya da obez kategorisindedir. Peki bu kadar yaygın bir sorunun önüne nasıl geçilir? Yanıt basit: düzenli kilo takibi.</p>

      <h2 className="font-display font-bold text-2xl text-white">Neden Önemli?</h2>
      <p>Köpeklerde aşırı kilo; eklem iltihabı, diyabet, kalp hastalığı ve ömür kısalığı gibi ciddi sonuçlara neden olabilir. Araştırmalar, ideal kilodaki köpeklerin obez muadillerine kıyasla ortalama 2 yıl daha uzun yaşadığını ortaya koymaktadır.</p>

      <h2 className="font-display font-bold text-2xl text-white">Ne Sıklıkla Tartmalısınız?</h2>
      <p>Yavru köpekler için haftalık tartım önerilirken, yetişkin köpeklerin ayda bir tartılması yeterlidir. Önemli olan, her tartımı kayıt altına almak ve trendi izlemektir.</p>

      <h2 className="font-display font-bold text-2xl text-white">PawCal ile Kilo Takibi</h2>
      <p>PawCal, her tartım kaydınızı otomatik olarak grafiğe döker. Yaş ve cins bazlı sağlıklı kilo aralıklarını gösterir, anormal değişimlerde sizi uyarır. Veteriner ziyaretleriniz için PDF raporu hazırlar.</p>

      <h2 className="font-display font-bold text-2xl text-white">Sonuç</h2>
      <p>Köpeğinizin kilosunu takip etmek, en kolay ve en etkili önleyici bakım adımlarından biridir. Dostunuza en iyi bakımı vermek için verilerinize güvenin.</p>

      <p className="text-xs text-[var(--text-secondary)] border-t border-white/10 pt-4">
        Kaynaklar: Association for Pet Obesity Prevention (APOP), Journal of Veterinary Internal Medicine, Purina LifeSpan Study
      </p>
    </div>
  );
}

function FirstCatContent() {
  return (
    <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
      <p className="text-lg">İlk kedinizi eve getirmek hem heyecan verici hem de biraz bunaltıcı olabilir. Doğru hazırlık yapıldığında bu geçiş hem siz hem de kediniz için çok daha kolay olur. İşte bilmeniz gereken 5 temel konu.</p>

      <h2 className="font-display font-bold text-2xl text-white">1. Evinizi Kedi Dostu Yapın</h2>
      <p>Kediniz eve gelmeden önce tehlikeli olabilecek her şeyi güvence altına alın. Elektrik kabloları, zehirli bitkiler, açık pencereler ve küçük yutulabilir nesneler başlıca tehlikelerdir.</p>

      <h2 className="font-display font-bold text-2xl text-white">2. Temel Malzemeleri Hazırlayın</h2>
      <p>Kedi tuvaleti ve kumu, mama ve su kabı, yatağı veya tırmalama tahtası, oyuncaklar ve taşıma kafesi bunların başında gelir.</p>

      <h2 className="font-display font-bold text-2xl text-white">3. Veteriner Randevusu Alın</h2>
      <p>Eve gelişinden sonraki ilk 48-72 saat içinde veterinere götürün. İlk muayenede aşı durumu, parazit kontrolü ve genel sağlık değerlendirmesi yapılacaktır.</p>

      <h2 className="font-display font-bold text-2xl text-white">4. Uyum Sürecine Sabır Gösterin</h2>
      <p>Yeni ortamına alışması birkaç günden birkaç haftaya kadar sürebilir. Saklanma, iştahsızlık veya aşırı miyavlama bu süreçte normaldir.</p>

      <h2 className="font-display font-bold text-2xl text-white">5. Sağlık Takibini Baştan Kurun</h2>
      <p>PawCal gibi bir uygulama ile kedinizin aşı takvimini, kilo gelişimini ve beslenme düzenini ilk günden takibe alın.</p>

      <p className="text-sm italic border-t border-white/10 pt-4">
        Kedinize en iyi başlangıcı vermek için veriye dayalı bir takip sistemi kullanmayı unutmayın. PawCal ile tüm bu adımları kolayca yönetebilirsiniz.
      </p>
    </div>
  );
}
