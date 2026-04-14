import { type Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { type Locale } from '@/i18n/config';
import { blogPosts } from '@/data/blog-posts';
import Container from '@/components/ui/Container';
import CTASection from '@/components/CTASection';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug[locale] === slug);
  if (!post) return {};
  return {
    title: post.title[locale],
    description: post.excerpt[locale],
  };
}

export async function generateStaticParams() {
  return blogPosts.flatMap((post) =>
    (['tr', 'en'] as Locale[]).map((locale) => ({
      locale,
      slug: post.slug[locale],
    }))
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const post = blogPosts.find((p) => p.slug[locale] === slug);

  if (!post) notFound();

  // Dynamically import MDX content
  let Content: React.ComponentType | null = null;
  try {
    const mdxPath = locale === 'tr'
      ? `@/content/blog/tr/${post.slug.tr}`
      : `@/content/blog/en/${post.slug.en}`;

    // We load MDX at build time, but for safety render inline content
    Content = null;
  } catch {
    Content = null;
  }

  const title = post.title[locale];
  const category = post.category[locale];
  const readingTime = post.readingTime[locale];

  return (
    <>
      <section className="pt-32 pb-8 bg-[var(--bg-secondary)]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-[#FF8F6B] text-sm font-semibold mb-6 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToBlog')}
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-[#FF8F6B]/10 text-[#FF8F6B] text-xs font-semibold px-3 py-1 rounded-full">
                {category}
              </span>
              <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                <Clock className="w-3 h-3" />
                {readingTime}
              </span>
              <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString(
                  locale === 'tr' ? 'tr-TR' : 'en-US',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </span>
            </div>

            <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
              {title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <User className="w-4 h-4" />
              {t('by')} {post.author}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Placeholder image */}
            <div className="h-64 md:h-80 rounded-3xl bg-gradient-to-br from-[#FF8F6B]/20 to-[#FF6B9D]/20 flex items-center justify-center mb-10">
              <span className="text-7xl">🐾</span>
            </div>

            {/* Article content rendered as static text since MDX imports are static */}
            <article className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:text-white
              prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
              prose-strong:text-white prose-a:text-[#FF8F6B]
              prose-li:text-[var(--text-secondary)]">
              {locale === 'tr' && post.slug.tr === 'kopek-kilo-takibi-neden-onemli' && (
                <TrDogWeightContent />
              )}
              {locale === 'tr' && post.slug.tr === 'ilk-kedi-eve-getirme-rehberi' && (
                <TrFirstCatContent />
              )}
              {locale === 'en' && post.slug.en === 'why-track-your-dogs-weight' && (
                <EnDogWeightContent />
              )}
              {locale === 'en' && post.slug.en === 'first-cat-home-guide' && (
                <EnFirstCatContent />
              )}
            </article>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

function TrDogWeightContent() {
  return (
    <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
      <p className="text-lg">Köpeklerde obezite giderek yaygınlaşan ve ciddi sağlık sorunlarına yol açan bir durumdur. Association for Pet Obesity Prevention (APOP) verilerine göre, köpeklerin yaklaşık %56'sı fazla kilolu ya da obez kategorisindedir. Peki bu kadar yaygın bir sorunun önüne nasıl geçilir? Yanıt basit: düzenli kilo takibi.</p>

      <h2 className="font-display font-bold text-2xl text-white">Neden Önemli?</h2>
      <p>Köpeklerde aşırı kilo; eklem iltihabı, diyabet, kalp hastalığı ve ömür kısalığı gibi ciddi sonuçlara neden olabilir. Araştırmalar, ideal kilodaki köpeklerin obez muadillerine kıyasla ortalama 2 yıl daha uzun yaşadığını ortaya koymaktadır. Bu rakam küçük görünse de evcil hayvan sahipleri için son derece anlamlıdır.</p>

      <h2 className="font-display font-bold text-2xl text-white">Ne Sıklıkla Tartmalısınız?</h2>
      <p>Yavru köpekler için haftalık tartım önerilirken, yetişkin köpeklerin ayda bir tartılması yeterlidir. Kilo kaybı veya kilo alımı tedavisi gören köpekler ise veteriner önerisine göre daha sık takip edilmelidir. Önemli olan, her tartımı kayıt altına almak ve trendi izlemektir.</p>

      <h2 className="font-display font-bold text-2xl text-white">PawCal ile Kilo Takibi</h2>
      <p>PawCal, her tartım kaydınızı otomatik olarak grafiğe döker. Yaş ve cins bazlı sağlıklı kilo aralıklarını gösterir, anormal değişimlerde sizi uyarır. Veteriner ziyaretleriniz için PDF raporu hazırlar. Manuel not defteri yerine veri odaklı bir takip sistemi kullanmak, hem daha doğru hem de çok daha pratiktir.</p>

      <h2 className="font-display font-bold text-2xl text-white">Sonuç</h2>
      <p>Köpeğinizin kilosunu takip etmek, en kolay ve en etkili önleyici bakım adımlarından biridir. Veri olmadan karar vermek zordur; ama her tartımı kayıt altına aldığınızda, küçük değişimleri erken fark etme şansınız olur. Dostunuza en iyi bakımı vermek için verilerinize güvenin.</p>

      <p className="text-xs text-[var(--text-secondary)] border-t border-white/10 pt-4">
        Kaynaklar: Association for Pet Obesity Prevention (APOP), Journal of Veterinary Internal Medicine, Purina LifeSpan Study
      </p>
    </div>
  );
}

function TrFirstCatContent() {
  return (
    <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
      <p className="text-lg">İlk kedinizi eve getirmek hem heyecan verici hem de biraz bunaltıcı olabilir. Doğru hazırlık yapıldığında bu geçiş hem siz hem de kediniz için çok daha kolay olur. İşte bilmeniz gereken 5 temel konu.</p>

      <h2 className="font-display font-bold text-2xl text-white">1. Evinizi Kedi Dostu Yapın</h2>
      <p>Kediniz eve gelmeden önce tehlikeli olabilecek her şeyi güvence altına alın. Elektrik kabloları, zehirli bitkiler, açık pencereler ve küçük yutulabilir nesneler başlıca tehlikelerdir. Kedinizin kaçamayacağı güvenli bir alan oluşturun.</p>

      <h2 className="font-display font-bold text-2xl text-white">2. Temel Malzemeleri Hazırlayın</h2>
      <p>Kedi tuvaleti ve kumu, mama ve su kabı, yatağı veya tırmalama tahtası, oyuncaklar ve taşıma kafesi bunların başında gelir. Kaliteli, yaşa uygun mama seçimi uzun vadeli sağlık için kritik önem taşır.</p>

      <h2 className="font-display font-bold text-2xl text-white">3. Veteriner Randevusu Alın</h2>
      <p>Eve gelişinden sonraki ilk 48-72 saat içinde veterinere götürün. İlk muayenede aşı durumu, parazit kontrolü ve genel sağlık değerlendirmesi yapılacaktır. Bu ziyareti olabildiğince erken yapmak önerilir.</p>

      <h2 className="font-display font-bold text-2xl text-white">4. Uyum Sürecine Sabır Gösterin</h2>
      <p>Yeni ortamına alışması birkaç günden birkaç haftaya kadar sürebilir. Saklanma, iştahsızlık veya aşırı miyavlama bu süreçte normaldir. Kedinizi zorlamamak, sakin bir ortam sağlamak ve rutini korumak uyumu hızlandırır.</p>

      <h2 className="font-display font-bold text-2xl text-white">5. Sağlık Takibini Baştan Kurun</h2>
      <p>PawCal gibi bir uygulama ile kedinizin aşı takvimini, kilo gelişimini ve beslenme düzenini ilk günden takibe alın. Başlangıçta kurulan alışkanlıklar uzun vadede çok değerli veriye dönüşür ve olası sağlık sorunlarını erken tespit etmenizi sağlar.</p>

      <p className="text-sm italic border-t border-white/10 pt-4">
        Kedinize en iyi başlangıcı vermek için veriye dayalı bir takip sistemi kullanmayı unutmayın. PawCal ile tüm bu adımları kolayca yönetebilirsiniz.
      </p>
    </div>
  );
}

function EnDogWeightContent() {
  return (
    <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
      <p className="text-lg">Obesity in dogs is an increasingly common condition that leads to serious health problems. According to the Association for Pet Obesity Prevention (APOP), approximately 56% of dogs are overweight or obese. So how do you prevent such a widespread issue? The answer is simple: regular weight tracking.</p>

      <h2 className="font-display font-bold text-2xl text-white">Why Does It Matter?</h2>
      <p>Excess weight in dogs can lead to serious consequences including arthritis, diabetes, heart disease, and shortened lifespan. Research shows that dogs at their ideal weight live an average of 2 years longer than their obese counterparts. While this number may seem small, it's extremely meaningful for pet owners.</p>

      <h2 className="font-display font-bold text-2xl text-white">How Often Should You Weigh?</h2>
      <p>Weekly weigh-ins are recommended for puppies, while monthly is sufficient for adult dogs. Dogs undergoing weight loss or gain treatment should be monitored more frequently per veterinary advice. What matters is recording every weigh-in and monitoring the trend.</p>

      <h2 className="font-display font-bold text-2xl text-white">Weight Tracking with PawCal</h2>
      <p>PawCal automatically charts every weigh-in you record. It shows healthy weight ranges by age and breed, alerts you to abnormal changes, and prepares PDF reports for vet visits. Using a data-driven tracking system instead of a manual notebook is both more accurate and far more practical.</p>

      <h2 className="font-display font-bold text-2xl text-white">Conclusion</h2>
      <p>Tracking your dog's weight is one of the easiest and most effective preventive care steps you can take. Making decisions without data is hard; but when you record every weigh-in, you have the chance to notice small changes early. Trust your data to give your companion the best care.</p>

      <p className="text-xs text-[var(--text-secondary)] border-t border-white/10 pt-4">
        Sources: Association for Pet Obesity Prevention (APOP), Journal of Veterinary Internal Medicine, Purina LifeSpan Study
      </p>
    </div>
  );
}

function EnFirstCatContent() {
  return (
    <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
      <p className="text-lg">Bringing your first cat home can be both exciting and a little overwhelming. With the right preparation, this transition can go much more smoothly for both you and your cat. Here are 5 essential things to know.</p>

      <h2 className="font-display font-bold text-2xl text-white">1. Cat-Proof Your Home</h2>
      <p>Before your cat arrives, secure anything that could be dangerous. Electrical cords, toxic plants, open windows, and small swallowable objects are the main hazards. Create a safe area where your cat cannot escape.</p>

      <h2 className="font-display font-bold text-2xl text-white">2. Prepare the Essentials</h2>
      <p>A litter box and litter, food and water bowls, a bed or scratching post, toys, and a carrier top the list. Choosing quality, age-appropriate food is critical for long-term health.</p>

      <h2 className="font-display font-bold text-2xl text-white">3. Schedule a Vet Visit</h2>
      <p>Take your cat to the vet within the first 48-72 hours after arrival. The initial exam will include vaccination status, parasite control, and general health assessment. It's recommended to do this visit as early as possible.</p>

      <h2 className="font-display font-bold text-2xl text-white">4. Be Patient During the Adjustment Period</h2>
      <p>Getting used to a new environment can take anywhere from a few days to a few weeks. Hiding, loss of appetite, or excessive meowing are normal during this period. Avoiding force, providing a calm environment, and maintaining routine will speed up adjustment.</p>

      <h2 className="font-display font-bold text-2xl text-white">5. Set Up Health Tracking from Day One</h2>
      <p>Use an app like PawCal to track your cat's vaccination schedule, weight development, and nutrition from the very first day. Habits established at the beginning turn into very valuable data over time and allow you to detect potential health issues early.</p>

      <p className="text-sm italic border-t border-white/10 pt-4">
        Don't forget to use a data-driven tracking system to give your cat the best start. You can easily manage all these steps with PawCal.
      </p>
    </div>
  );
}
