'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import CTASection from '@/components/CTASection';
import { Mail, HelpCircle, Clock, Send } from 'lucide-react';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  const infoItems = [
    {
      icon: Mail,
      title: 'E-posta Desteği',
      desc: 'Genellikle 24 saat içinde yanıt veriyoruz.',
      value: 'info@pawcal.net',
      href: 'mailto:info@pawcal.net',
    },
    {
      icon: HelpCircle,
      title: 'Yardım Merkezi',
      desc: 'Sık sorulan sorular ve rehberler.',
      value: 'Yardım Merkezi',
      href: '/help',
    },
    {
      icon: Clock,
      title: 'Ortalama Yanıt Süresi',
      desc: '',
      value: '24 saat',
      href: null,
    },
  ];

  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--bg-secondary)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="primary" className="mb-4">💬 Destek</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Yardıma mı{' '}
              <span className="text-gradient-primary">İhtiyacınız Var?</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg">
              Destek ekibimiz size yardımcı olmak için hazır. En kısa sürede dönüş yapıyoruz.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="space-y-4">
              {infoItems.map((item) => (
                <div key={item.title} className="glass rounded-2xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FF8F6B]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#FF8F6B]" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white mb-1">{item.title}</div>
                      {item.desc && (
                        <div className="text-xs text-[var(--text-secondary)] mb-1">{item.desc}</div>
                      )}
                      {item.href ? (
                        <a href={item.href} className="text-sm text-[#FF8F6B] hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-sm font-bold text-[#FF8F6B]">{item.value}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2 glass rounded-3xl p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="font-display font-semibold text-xl text-white mb-2">
                    Mesajınız alındı! En kısa sürede dönüş yapacağız.
                  </h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Adınız
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Adınızı girin"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8F6B] transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        E-posta Adresiniz
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="email@ornek.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8F6B] transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Konu
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Konuyu kısaca belirtin"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8F6B] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Mesajınız
                    </label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Sorununuzu veya geri bildiriminizi detaylı açıklayın..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF8F6B] transition-colors text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? 'Gönderiliyor...' : 'Gönder'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
