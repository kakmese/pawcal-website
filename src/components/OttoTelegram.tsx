'use client';

import { useEffect, useState } from 'react';

const TG_URL = 'https://t.me/OttoPlusM';
const SESSION_KEY = 'otto-tg-popup-kapandi';

function PlaneIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 22-7z" />
    </svg>
  );
}

export default function OttoTelegramPopup() {
  const [acik, setAcik] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(SESSION_KEY)) {
        const t = setTimeout(() => setAcik(true), 800);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  const kapat = () => {
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch {}
    setAcik(false);
  };

  if (!acik) return null;

  return (
    <div
      onClick={kapat}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(5,8,12,0.74)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 400, width: '94%',
          background: '#12161d',
          border: '1px solid rgba(184,146,255,0.35)',
          borderRadius: 22, padding: '30px 24px 24px',
          textAlign: 'center', position: 'relative',
          boxShadow: '0 24px 70px rgba(0,0,0,0.6)',
        }}
      >
        <button
          onClick={kapat}
          aria-label="Kapat"
          style={{
            position: 'absolute', top: 12, right: 14,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.45)', fontSize: 22, lineHeight: 1,
          }}
        >
          ×
        </button>
        <div
          style={{
            width: 62, height: 62, borderRadius: '50%',
            background: '#229ED9', margin: '0 auto 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(34,158,217,0.45)',
          }}
        >
          <PlaneIcon size={28} />
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
          Otto Topluluğuna Katıl!
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', marginTop: 10, lineHeight: 1.55 }}>
          Yeni özellikler, güncellemeler ve sürücü ipuçları — ilk önce Telegram kanalımızda.
        </div>
        <a
          href={TG_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={kapat}
          style={{
            display: 'block', marginTop: 20,
            background: '#229ED9', color: '#fff',
            fontWeight: 700, fontSize: 15,
            padding: '13px 20px', borderRadius: 14,
            textDecoration: 'none',
          }}
        >
          Telegram Kanalına Katıl
        </a>
        <button
          onClick={kapat}
          style={{
            marginTop: 12, background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.5)', fontSize: 13, cursor: 'pointer',
          }}
        >
          Belki daha sonra
        </button>
      </div>
    </div>
  );
}

export function TelegramSerit() {
  return (
    <section style={{ maxWidth: 900, margin: '26px auto 10px', padding: '0 20px' }}>
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
          background: 'rgba(34,158,217,0.10)',
          border: '1px solid rgba(34,158,217,0.35)',
          borderRadius: 16, padding: '16px 18px',
        }}
      >
        <div
          style={{
            width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
            background: '#229ED9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <PlaneIcon size={20} />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>Telegram kanalımıza katılın</div>
          <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.62)', marginTop: 2 }}>
            Duyurular, ipuçları ve destek — Otto topluluğu burada.
          </div>
        </div>
        <a
          href={TG_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#229ED9', color: '#fff', fontWeight: 700, fontSize: 13.5,
            padding: '10px 18px', borderRadius: 12, textDecoration: 'none', flexShrink: 0,
          }}
        >
          Katıl
        </a>
      </div>
    </section>
  );
}
