import { useState } from 'react';
import { pricingFAQs } from '@/mocks/billingData';

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-20 bg-background-100">
      <div className="max-w-[800px] mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">FAQ</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-4">Frequently asked questions</h2>
        </div>

        <div className="space-y-3">
          {pricingFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-background-50 border border-background-200/70 rounded-lg overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
              >
                <span className="text-sm font-semibold text-foreground-900 pr-4">{faq.question}</span>
                <i className={`ri-${openIndex === index ? 'subtract' : 'add'}-line text-foreground-500 text-lg flex-shrink-0 transition-transform`}></i>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-foreground-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}