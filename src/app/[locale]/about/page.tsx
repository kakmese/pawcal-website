import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import CTASection from '@/components/CTASection';
import { Database, Microscope, Shield, MapPin, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hakkında',
  description:
    "PawCal Studio hakkında bilgi edinin. Türkiye'den dünyaya evcil hayvan sağlık takibi.",
};

const values = [
  {
    icon: Database,
    title: 'Veri Odaklı',
    desc: 'Her karar veriyle desteklenir, tahminlere değil gerçek verilere dayanır.',
    color: '#FF8F6B',
  },
  {
    icon: Microscope,
    title: 'Bilimsel Temel',
    desc: 'Veteriner bilimi rehberlerimizin temelini oluşturur.',
    color: '#4ADE80',
  },
  {
    icon: Shield,
    title: 'Gizlilik Önce',
    desc: 'Verileriniz yalnızca sizin ve evcil hayvanınızın iyiliği için kullanılır.',
    color: '#A78BFA',
  },
];

const storyParagraphs = [
  "PawCal, 2026 yılında evcil hayvan sahiplerinin karşılaştığı gerçek bir sorundan doğdu: Dostlarımızın sağlığıyla ilgili günlük verileri takip etmek zor, dağınık ve unutkanlığa dayanıklı değil. Bir not defteri, bir takvim, bir hesap makinesi ve hafızamız — hepsi aynı anda çalışmalı.",
  "Biz PawCal Studio olarak bu dağınıklığa bir son vermek istedik. Modern takip uygulamalarının insan sağlığı için yaptığını evcil hayvanlar için yapıyoruz: Veri odaklı, bilimsel temelli, ama kullanıcı dostu bir deneyim.",
  "PawCal Studio, evcil hayvan sahiplerinin evcil dostlarıyla daha bilinçli, daha sağlıklı bir yaşam sürmesini hedefleyen bağımsız bir yazılım stüdyosudur. Türkiye'den dünyaya.",
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--bg-secondary)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-6">🐾 Hikayemiz</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-8">
              PawCal Studio Hakkında
            </h1>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="glass rounded-3xl p-8 md:p-12 mb-12">
              {storyParagraphs.map((para, i) => (
                <p key={i} className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </div>

            <div className="bg-gradient-primary rounded-3xl p-8 mb-12 text-center">
              <h2 className="font-display font-bold text-2xl text-white mb-3">
                Misyon
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Evcil hayvan sahiplerinin dostlarıyla daha bilinçli, daha sağlıklı bir yaşam sürmesini sağlamak.
              </p>
            </div>

            <h2 className="font-display font-bold text-2xl text-white mb-6 text-center">
              Değerlerimiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {values.map((value) => (
                <div key={value.title} className="glass rounded-3xl p-6 text-center">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${value.color}20` }}
                  >
                    <value.icon className="w-6 h-6" style={{ color: value.color }} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{value.desc}</p>
                </div>
              ))}
            </div>

            <div className="glass rounded-3xl p-6 flex flex-col sm:flex-row gap-6 items-center justify-center">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#FF8F6B]" />
                <span className="text-[var(--text-secondary)]">Türkiye</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#FF8F6B]" />
                <a href="mailto:info@pawcal.net" className="text-[#FF8F6B] hover:underline">
                  info@pawcal.net
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
