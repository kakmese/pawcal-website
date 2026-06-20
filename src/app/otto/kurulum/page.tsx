export default function OttoKurulumPage() {
  return (
    <main
      className="relative min-h-screen w-full"
      style={{ backgroundColor: '#0E1419' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,20,25,0.55) 0%, rgba(14,20,25,0.95) 100%)',
        }}
      />

      <div className="relative z-10 min-h-screen flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="flex flex-col items-center text-center">
            <div
              className="flex items-center justify-center overflow-hidden"
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: '#f1ede3',
                boxShadow:
                  '0 8px 22px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/otto-logo.svg"
                alt="Otto"
                width={48}
                height={48}
                style={{ display: 'block' }}
              />
            </div>

            <h1
              className="mt-4 text-white font-bold lowercase tracking-tight"
              style={{ fontSize: 30, lineHeight: 1.1 }}
            >
              otto
            </h1>

            <h2
              className="mt-6 text-white font-semibold"
              style={{ fontSize: 20 }}
            >
              Araç Verisi Kurulumu
            </h2>

            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-lg">
              Otto&apos;nun aracınızdan veri okuyabilmesi için tek seferlik bir
              izin kurulumu gerekir. Aşağıdaki adımları sırayla uygulayın.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <div
              className="p-5 sm:p-6"
              style={{
                backgroundColor: 'rgba(43,111,255,0.08)',
                border: '1px solid rgba(43,111,255,0.35)',
                borderLeft: '3px solid #2B6FFF',
                borderRadius: 14,
              }}
            >
              <div
                className="text-white font-bold mb-2"
                style={{ fontSize: 15 }}
              >
                Neden bu izinler gerekli?
              </div>
              <p
                className="text-slate-300"
                style={{ fontSize: 13, lineHeight: 1.5 }}
              >
                Otto&apos;nun aracınızın verilerini (menzil, hız, tüketim, şarj
                durumu, vites ve daha fazlası) gösterebilmesi için araç
                ayarlarından gerekli izinleri vermeniz gerekir. İzin verilmezse
                uygulama çalışır ancak bazı veriler eksik kalır.
              </p>
            </div>

            <StepCard number="1" title="Araç ayarlarını açın">
              <p className="text-slate-300 text-sm leading-relaxed">
                Araç ekranında ayarlar menüsüne (araç ikonu) girin.
              </p>
            </StepCard>

            <StepCard number="2" title="Uygulamalar bölümüne girin">
              <p className="text-slate-300 text-sm leading-relaxed">
                Ayarlar içinden uygulama yönetimi / uygulamalar menüsüne girin.
              </p>
            </StepCard>

            <StepCard number="3" title="İzinler bölümüne girin">
              <p className="text-slate-300 text-sm leading-relaxed">
                İzinler (yetkiler) bölümünü açın. Burada her veri türü için
                hangi uygulamaların erişebileceği listelenir.
              </p>
            </StepCard>

            <StepCard number="4" title="Tüm izinleri Otto'ya açın">
              <p className="text-slate-300 text-sm leading-relaxed">
                Listedeki izinleri tek tek açıp Otto uygulamasını aktif edin:
                gösterge bilgileri, şarj bilgileri, motor bilgileri, şanzıman
                bilgileri, konum, mikrofon ve sistem ayarları gibi tüm izinler.
                Her birinde Otto&apos;yu işaretleyin.
              </p>
            </StepCard>

            <StepCard number="✓" title="Uygulamayı yeniden başlatın" success>
              <p className="text-slate-300 text-sm leading-relaxed">
                İzinleri verdikten sonra Otto&apos;yu kapatıp tekrar açın. Tüm
                araç verileri artık görünecektir.
              </p>
            </StepCard>
          </div>

          <p className="mt-10 text-center text-slate-400 text-sm">
            Sorun mu yaşıyorsunuz?{' '}
            <a
              href="mailto:info@pawcal.net"
              style={{ color: '#5AA9FF' }}
              className="hover:underline"
            >
              info@pawcal.net
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

function StepCard({
  number,
  title,
  success,
  children,
}: {
  number: string;
  title: string;
  success?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 14,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="flex items-center justify-center text-white font-bold"
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            backgroundColor: success ? '#22C55E' : '#2B6FFF',
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          {number}
        </div>
        <div className="text-white font-semibold text-base">{title}</div>
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
