'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { type FAQItem } from '@/data/faq';

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="glass rounded-2xl overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-medium text-[var(--foreground)] pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#FF8F6B] flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4">
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
