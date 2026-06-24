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

          <div className="mt-14 flex flex-col items-center text-center">
            <h2
              className="text-white font-semibold"
              style={{ fontSize: 20 }}
            >
              Sealion 7 APK Kurulum Rehberi
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-lg">
              Sealion 7 araçlarda uygulama mağazaları çalışmadığı için Otto ve
              diğer uygulamaları USB bellek üzerinden APK olarak yüklemeniz
              gerekir.
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
                Gereksinimler
              </div>
              <ul
                className="text-slate-300 list-disc pl-5 space-y-1"
                style={{ fontSize: 13, lineHeight: 1.6 }}
              >
                <li>Type-C&apos;li USB bellek veya Type-C çevirici</li>
                <li>16 GB veya 32 GB USB bellek</li>
                <li>
                  Kurulum şifresi:{' '}
                  <code
                    className="font-mono"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.10)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 6,
                      padding: '2px 8px',
                      color: '#5AA9FF',
                      fontSize: 12,
                    }}
                  >
                    BYD8155F
                  </code>
                </li>
              </ul>
            </div>

            <StepCard number="1" title="USB belleğe klasör oluşturun">
              <p className="text-slate-300 text-sm leading-relaxed">
                USB belleğinizde{' '}
                <code
                  className="font-mono"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 6,
                    padding: '2px 6px',
                    color: '#5AA9FF',
                    fontSize: 12,
                  }}
                >
                  Third Party Apps 90
                </code>{' '}
                adında bir klasör oluşturun.
              </p>
            </StepCard>

            <StepCard number="2" title="APK dosyalarını indirin">
              <p className="text-slate-300 text-sm leading-relaxed">
                Yüklemek istediğiniz APK dosyalarını PC&apos;nize indirin.
              </p>
            </StepCard>

            <StepCard number="3" title="APK'ları klasöre kopyalayın">
              <p className="text-slate-300 text-sm leading-relaxed">
                İndirdiğiniz tüm APK&apos;ları{' '}
                <code
                  className="font-mono"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 6,
                    padding: '2px 6px',
                    color: '#5AA9FF',
                    fontSize: 12,
                  }}
                >
                  Third Party Apps 90
                </code>{' '}
                klasörünün içine kopyalayın.
              </p>
            </StepCard>

            <StepCard number="4" title="USB belleği araca takın">
              <p className="text-slate-300 text-sm leading-relaxed">
                Hazırladığınız USB belleği aracın Type-C girişine takın.
              </p>
            </StepCard>

            <StepCard number="5" title="Şifreyi girin">
              <p className="text-slate-300 text-sm leading-relaxed">
                Araç sizden kurulum şifresini isteyecek. Aşağıdaki şifreyi
                girin:
              </p>
              <div
                className="flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(43,111,255,0.10)',
                  border: '1px solid rgba(43,111,255,0.35)',
                  borderRadius: 10,
                  padding: '10px 14px',
                }}
              >
                <code
                  className="font-mono text-white font-bold tracking-widest"
                  style={{ fontSize: 18 }}
                >
                  BYD8155F
                </code>
              </div>
            </StepCard>

            <StepCard number="6" title="Tüm dosyaları seçip yükleyin">
              <p className="text-slate-300 text-sm leading-relaxed">
                Şifreden sonra çıkan dosyaları seçip yükleyin.
              </p>
              <div
                className="p-3"
                style={{
                  backgroundColor: 'rgba(245,158,11,0.10)',
                  border: '1px solid rgba(245,158,11,0.35)',
                  borderLeft: '3px solid #F59E0B',
                  borderRadius: 10,
                }}
              >
                <p
                  className="text-amber-200"
                  style={{ fontSize: 13, lineHeight: 1.5 }}
                >
                  <strong className="text-amber-100">ÖNEMLİ:</strong> Ekranı
                  aşağı kaydırıp TÜM dosyaları seçmeyi unutmayın!
                </p>
              </div>
            </StepCard>

            <div
              className="p-5 sm:p-6"
              style={{
                backgroundColor: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.35)',
                borderLeft: '3px solid #F59E0B',
                borderRadius: 14,
              }}
            >
              <div
                className="text-white font-bold mb-2"
                style={{ fontSize: 15 }}
              >
                Önemli Notlar
              </div>
              <ul
                className="text-slate-300 list-disc pl-5 space-y-1"
                style={{ fontSize: 13, lineHeight: 1.6 }}
              >
                <li>
                  <code
                    className="font-mono"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.10)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 6,
                      padding: '1px 6px',
                      color: '#5AA9FF',
                      fontSize: 12,
                    }}
                  >
                    PackageInstaller Unlock
                  </code>{' '}
                  APK&apos;sını yüklemenize gerek yok.
                </li>
                <li>
                  Uygulama mağazaları çalışmaz — APK&apos;ları mutlaka USB ile
                  yüklemeniz gerekir.
                </li>
              </ul>
            </div>
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
