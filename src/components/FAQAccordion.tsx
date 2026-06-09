"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqData } from '../data/siteData';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding bg-offwhite">
      <div className="container-page">
        <div className="mx-auto max-w-[720px]">
          <div className="text-center">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently asked questions</h2>
            <p className="section-subtitle">
              Everything you need to know about Fearless Logic AI.
            </p>
          </div>

          <div className="mt-12 space-y-3">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-xl border bg-white transition-all duration-200 ${
                  openIndex === index ? 'border-blue/30 shadow-sm' : 'border-lightgray'
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-offwhite/50"
                >
                  <span className="text-sm font-medium text-navy">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-midgray transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="border-t border-lightgray px-6 py-4 text-sm text-darkgray/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
