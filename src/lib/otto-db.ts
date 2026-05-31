import { neon } from '@neondatabase/serverless';

function getUrl(): string {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL_UNPOOLED;
  if (!url) throw new Error('DATABASE_URL tanımlı değil');
  return url;
}

export function getSql() {
  return neon(getUrl());
}

export function rastgeleKod(): string {
  const harf = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const blok = () => Array.from({length:4}, () => harf[Math.floor(Math.random()*harf.length)]).join('');
  return `OTTO-${blok()}-${blok()}`;
}
