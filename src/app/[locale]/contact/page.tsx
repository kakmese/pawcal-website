import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import { Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'İletişim',
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--bg-secondary)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="primary" className="mb-4">📬 İletişim</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Bizimle{' '}
              <span className="text-gradient-primary">İletişime Geçin</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg">
              Sorularınız, önerileriniz veya iş birliği teklifleriniz için bize ulaşın.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="glass rounded-3xl p-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#FF8F6B]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#FF8F6B]" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-lg text-white mb-2">E-posta</h2>
                  <a href="mailto:info@pawcal.net" className="text-[#FF8F6B] hover:underline text-lg">
                    info@pawcal.net
                  </a>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#FF8F6B]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#FF8F6B]" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-lg text-white mb-2">Konum</h2>
                  <p className="text-[var(--text-secondary)]">Türkiye</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h2 className="font-display font-semibold text-lg text-white mb-2">Sosyal Medya</h2>
              <p className="text-[var(--text-secondary)] text-sm mb-4">Yakında tüm platformlarda</p>
              <div className="flex gap-3">
                {[
                  { label: 'IG', name: 'Instagram' },
                  { label: 'X', name: 'X / Twitter' },
                  { label: 'TK', name: 'TikTok' },
                ].map(({ label, name }) => (
                  <button
                    key={name}
                    disabled
                    aria-label={name}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30 cursor-not-allowed text-xs font-bold"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
