'use client';

import {
  Utensils, TrendingUp, Pill, Activity, MapPin, Users,
  type LucideIcon,
} from 'lucide-react';
import { type Feature } from '@/data/features';

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
  detailed?: boolean;
}

export default function FeatureCard({ feature, detailed = false }: FeatureCardProps) {
  const Icon = iconMap[feature.icon] ?? Activity;
  const desc = detailed ? feature.longDesc : feature.shortDesc;

  return (
    <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:border-[#FF8F6B]/30 transition-all duration-300 hover:scale-[1.02] group">
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${feature.color}20` }}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: feature.color }} />
      </div>

      <h3 className="font-display font-semibold text-sm sm:text-lg text-[var(--foreground)] mb-1 sm:mb-2 leading-tight">
        {feature.title}
      </h3>
      <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
        {desc}
      </p>
    </div>
  );
}
