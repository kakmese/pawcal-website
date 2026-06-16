'use client';

import { useState } from 'react';

const COMMANDS = {
  connect: 'adb connect 192.168.0.205:5555',
  perm1:
    'adb shell pm grant com.wildcardstudio.aracveri android.permission.BYDAUTO_STATISTIC_COMMON',
  perm2:
    'adb shell pm grant com.wildcardstudio.aracveri android.permission.BYDAUTO_GEARBOX_COMMON',
  perm3:
    'adb shell pm grant com.wildcardstudio.aracveri android.permission.BYDAUTO_BODYWORK_COMMON',
} as const;

type CmdKey = keyof typeof COMMANDS;

export default function OttoKurulumPage() {
  const [copied, setCopied] = useState<Record<CmdKey, boolean>>({
    connect: false,
    perm1: false,
    perm2: false,
    perm3: false,
  });

  async function kopyala(key: CmdKey) {
    try {
      await navigator.clipboard.writeText(COMMANDS[key]);
      setCopied((s) => ({ ...s, [key]: true }));
      setTimeout(() => {
        setCopied((s) => ({ ...s, [key]: false }));
      }, 1500);
    } catch {}
  }

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
            <StepCard number="1" title="Aynı ağa bağlanın">
              <p className="text-slate-300 text-sm leading-relaxed">
                Bilgisayarınız ve aracınız aynı Wi-Fi ağında olmalı. Aracın IP
                adresini ekrandan öğrenin: Ayarlar → Wi-Fi → bağlı ağ → IP
                adresi (örn. 192.168.0.205).
              </p>
            </StepCard>

            <StepCard number="2" title="Araca bağlanın">
              <p className="text-slate-300 text-sm leading-relaxed">
                Bilgisayarda komut penceresi açın ve aracın IP&apos;siyle
                bağlanın:
              </p>
              <CommandBox
                command={COMMANDS.connect}
                copied={copied.connect}
                onCopy={() => kopyala('connect')}
              />
            </StepCard>

            <StepCard number="3" title="İzinleri verin">
              <p className="text-slate-300 text-sm leading-relaxed">
                Aşağıdaki üç komutu sırayla çalıştırın:
              </p>
              <CommandBox
                command={COMMANDS.perm1}
                copied={copied.perm1}
                onCopy={() => kopyala('perm1')}
              />
              <CommandBox
                command={COMMANDS.perm2}
                copied={copied.perm2}
                onCopy={() => kopyala('perm2')}
              />
              <CommandBox
                command={COMMANDS.perm3}
                copied={copied.perm3}
                onCopy={() => kopyala('perm3')}
              />
            </StepCard>

            <StepCard number="✓" title="Uygulamayı yeniden başlatın" success>
              <p className="text-slate-300 text-sm leading-relaxed">
                Otto&apos;yu kapatıp tekrar açın. Araç verileri artık görünmeye
                başlayacak.
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

function CommandBox({
  command,
  copied,
  onCopy,
}: {
  command: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div
      className="flex items-stretch gap-2 rounded-lg overflow-hidden"
      style={{
        backgroundColor: '#05080B',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="flex-1 min-w-0 px-3 py-2.5 overflow-x-auto"
        style={{
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          color: '#7CFFB2',
          fontSize: 12.5,
          lineHeight: 1.5,
          whiteSpace: 'pre',
        }}
      >
        {command}
      </div>
      <button
        onClick={onCopy}
        className="flex-shrink-0 px-3 text-xs font-medium transition-colors"
        style={{
          backgroundColor: copied
            ? 'rgba(34,197,94,0.18)'
            : 'rgba(43,111,255,0.18)',
          color: copied ? '#7CFFB2' : '#5AA9FF',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          minWidth: 92,
        }}
      >
        {copied ? 'Kopyalandı ✓' : 'Kopyala'}
      </button>
    </div>
  );
}
