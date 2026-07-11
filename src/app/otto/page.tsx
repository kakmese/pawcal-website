'use client';

import Link from 'next/link';
import { useState } from 'react';
import OttoTelegramPopup from '../../components/OttoTelegram';

const EKRAN_SAYISI = 4;

function Galeri() {
  const [aktif, setAktif] = useState(0);

  const onceki = () => setAktif((a) => (a - 1 + EKRAN_SAYISI) % EKRAN_SAYISI);
  const sonraki = () => setAktif((a) => (a + 1) % EKRAN_SAYISI);

  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      {/* Büyük görsel + yan oklar */}
      <div
        style={{
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.04)',
          boxShadow: '0 22px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/otto-ekran-${aktif + 1}.png`}
          alt={`Otto ekran görüntüsü ${aktif + 1}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* Sol ok */}
        <button
          onClick={onceki}
          aria-label="Önceki"
          style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(0,0,0,0.55)',
            color: '#fff',
            fontSize: 22,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
        >
          ‹
        </button>

        {/* Sağ ok */}
        <button
          onClick={sonraki}
          aria-label="Sonraki"
          style={{
            position: 'absolute',
            right: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(0,0,0,0.55)',
            color: '#fff',
            fontSize: 22,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
        >
          ›
        </button>

        {/* Sayaç (1/4) */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            background: 'rgba(0,0,0,0.55)',
            color: '#fff',
            padding: '5px 12px',
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 600,
            backdropFilter: 'blur(4px)',
          }}
        >
          {aktif + 1} / {EKRAN_SAYISI}
        </div>
      </div>

      {/* Noktalar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 10,
          marginTop: 20,
        }}
      >
        {Array.from({ length: EKRAN_SAYISI }).map((_, i) => (
          <button
            key={i}
            onClick={() => setAktif(i)}
            aria-label={`Görsel ${i + 1}`}
            style={{
              width: i === aktif ? 28 : 10,
              height: 10,
              borderRadius: 5,
              border: 'none',
              background: i === aktif ? '#2B6FFF' : 'rgba(255,255,255,0.25)',
              cursor: 'pointer',
              transition: 'all 0.25s',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function OttoTanitim() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0E1419',
        color: '#fff',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <OttoTelegramPopup />
      {/* Arka plan görseli + gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/otto-genel.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(14,20,25,0.7) 0%, rgba(14,20,25,0.95) 60%, #0E1419 100%)',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 960,
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* HERO */}
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: 72,
            paddingBottom: 56,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 22,
              background: '#f1ede3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 18px 48px rgba(0,0,0,0.5)',
              marginBottom: 24,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/otto-logo.svg"
              alt="Otto"
              style={{ width: 60, height: 60 }}
            />
          </div>
          <h1
            style={{
              fontSize: 52,
              fontWeight: 800,
              margin: 0,
              letterSpacing: '-1px',
            }}
          >
            otto
          </h1>
          <p
            style={{
              fontSize: 20,
              color: '#AEB9C4',
              margin: '12px 0 0',
              maxWidth: 520,
              lineHeight: 1.5,
            }}
          >
            BYD Sealion 7 için akıllı yol bilgisayarı. Tüketim, sürüş analizi,
            şarj istasyonları ve daha fazlası — hepsi tek ekranda.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 14,
              marginTop: 32,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link
              href="/otto/indir"
              style={{
                background: '#2B6FFF',
                color: '#fff',
                padding: '15px 34px',
                borderRadius: 14,
                fontSize: 16,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 14px 32px rgba(43,111,255,0.45)',
              }}
            >
              Uygulamayı İndir
            </Link>
            <Link
              href="/otto/kod"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#fff',
                padding: '15px 34px',
                borderRadius: 14,
                fontSize: 16,
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.18)',
              }}
            >
              Erişim Kodu Al
            </Link>
          </div>
        </section>

        {/* ÖZELLİKLER */}
        <section style={{ paddingBottom: 56 }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              textAlign: 'center',
              margin: '0 0 8px',
            }}
          >
            Neler Yapabilir?
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: '#8A94A0',
              margin: '0 0 36px',
              fontSize: 15,
            }}
          >
            Aracınızın verilerini anlamlı bilgiye dönüştürür.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {OZELLIKLER.map((o) => (
              <div
                key={o.baslik}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  padding: '24px 22px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  style={{
                    marginBottom: 14,
                    display: 'flex',
                    alignItems: 'center',
                    height: 28,
                  }}
                >
                  {o.ikon}
                </div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    margin: '0 0 8px',
                  }}
                >
                  {o.baslik}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: '#9AA5B1',
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {o.aciklama}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* EKRAN GÖRÜNTÜLERİ - carousel (tek büyük + noktalar) */}
        <section style={{ paddingBottom: 56 }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              textAlign: 'center',
              margin: '0 0 8px',
            }}
          >
            Uygulamadan Görünümler
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: '#8A94A0',
              margin: '0 0 28px',
              fontSize: 14,
            }}
          >
            Otto&apos;nun ekranlarına göz atın.
          </p>

          <Galeri />
        </section>

        {/* KURULUM ÖZETİ */}
        <section style={{ paddingBottom: 56 }}>
          <div
            style={{
              background: 'rgba(43,111,255,0.08)',
              border: '1px solid rgba(43,111,255,0.25)',
              borderRadius: 18,
              padding: '32px 28px',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                margin: '0 0 10px',
              }}
            >
              Kuruluma Hazır mısınız?
            </h2>
            <p
              style={{
                color: '#AEB9C4',
                margin: '0 0 24px',
                fontSize: 15,
                lineHeight: 1.6,
              }}
            >
              Uygulamayı indirip USB bellek ile aracınıza kolayca
              kurabilirsiniz. Adım adım kurulum rehberimiz size yol gösterir.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 14,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/otto/indir"
                style={{
                  background: '#2B6FFF',
                  color: '#fff',
                  padding: '13px 28px',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                İndir
              </Link>
              <Link
                href="/otto/kurulum"
                style={{
                  background: 'transparent',
                  color: '#5AA9FF',
                  padding: '13px 28px',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: 'none',
                  border: '1px solid rgba(90,169,255,0.4)',
                }}
              >
                Kurulum Rehberi
              </Link>
            </div>
          </div>
        </section>

        {/* ALT */}
        <footer
          style={{
            textAlign: 'center',
            paddingBottom: 48,
            color: '#5A6470',
            fontSize: 14,
          }}
        >
          <p style={{ margin: '0 0 8px' }}>
            Sorularınız için:{' '}
            <a
              href="mailto:info@pawcal.net"
              style={{ color: '#5AA9FF', textDecoration: 'none' }}
            >
              info@pawcal.net
            </a>
          </p>
          <p style={{ margin: 0, opacity: 0.7 }}>
            otto · Wildcard Studio
          </p>
        </footer>
      </div>
    </div>
  );
}

const OZELLIKLER = [
  {
    ikon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5AA9FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="16" height="10" rx="2" />
        <line x1="22" y1="11" x2="22" y2="13" />
        <line x1="6" y1="10" x2="6" y2="14" />
      </svg>
    ),
    baslik: 'Anlık Durum',
    aciklama:
      'Batarya, menzil, kalan enerji, vites, hız, güç, tüketim ve batarya sıcaklığı — tek bakışta.',
  },
  {
    ikon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5AA9FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="20" x2="4" y2="12" />
        <line x1="10" y1="20" x2="10" y2="4" />
        <line x1="16" y1="20" x2="16" y2="9" />
        <line x1="22" y1="20" x2="22" y2="14" />
      </svg>
    ),
    baslik: 'Sürüş Analizi',
    aciklama:
      'Sıfırlanabilir tüketim takibi, günlük/haftalık/aylık periyotlar, verim ve sürüş skoru.',
  },
  {
    ikon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5AA9FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    baslik: 'Şarj İstasyonları',
    aciklama:
      'Yakındaki şarj istasyonlarını fiyat, güç ve durum bilgisiyle listeler. Google Maps ile yol tarifi.',
  },
  {
    ikon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5AA9FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17h14M6 17l1.5-5h9L18 17M7 12l1-4h8l1 4" />
        <circle cx="7.5" cy="17" r="1.5" />
        <circle cx="16.5" cy="17" r="1.5" />
      </svg>
    ),
    baslik: 'Sürüş Modları',
    aciklama:
      'Normal, Eco ve Sport modları için ayrı tüketim ve maliyet takibi. Hangi mod ne kadar verimli görün.',
  },
  {
    ikon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5AA9FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 3 3 5-6" />
      </svg>
    ),
    baslik: 'Grafikler',
    aciklama:
      '30 günlük tüketim grafiği ile sürüş alışkanlıklarınızı ve verimliliğinizi takip edin.',
  },
  {
    ikon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5AA9FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
    ),
    baslik: 'Yedekleme & Güncelleme',
    aciklama:
      'Verilerinizi yedekleyip geri yükleyin. Otomatik güncelleme ile her zaman en son sürümde kalın.',
  },
];
