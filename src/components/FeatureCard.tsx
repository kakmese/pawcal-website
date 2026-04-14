'use client';

import {
  Utensils, TrendingUp, Pill, Activity, MapPin, Users,
  type LucideIcon,
} from 'lucide-react';
import { type Feature } from '@/data/features';
import { type Locale } from '@/i18n/config';

const iconMap: Record<string, LucideIcon> = {
  Utensils,
  TrendingUp,
  Pill,
  Activity,
  MapPin,
  Users,
};

interface FeatureCardProps {
  feature: Feature;
  locale: Locale;
  detailed?: boolean;
}

export default function FeatureCard({ feature, locale, detailed = false }: FeatureCardProps) {
  const Icon = iconMap[feature.icon] ?? Activity;
  const title = feature.title[locale];
  const desc = detailed ? feature.longDesc[locale] : feature.shortDesc[locale];

  return (
    <div className="glass rounded-3xl p-6 hover:border-[#FF8F6B]/30 transition-all duration-300 hover:scale-[1.02] group">
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${feature.color}20` }}
      >
        <Icon className="w-6 h-6" style={{ color: feature.color }} />
      </div>

      <h3 className="font-display font-semibold text-lg text-[var(--foreground)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
