import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="bg-background-100 py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-full max-w-3xl rounded-2xl overflow-hidden mb-10 md:mb-14">
            <img
              src="https://readdy.ai/api/search-image?query=Warm%20inviting%20modern%20office%20interior%20with%20natural%20light%2C%20clean%20wooden%20desks%20neatly%20arranged%2C%20lush%20green%20plants%2C%20comfortable%20ergonomic%20chairs%2C%20sleek%20minimalist%20design%2C%20warm%20beige%20and%20cream%20palette%2C%20slight%20film%20grain%20texture%20for%20artistic%20feel%2C%20architectural%20photography%20style%2C%20airy%20and%20spacious%2C%20aspirational%20workplace%20atmosphere&width=1200&height=600&seq=cta-workspace-01&orientation=landscape"
              alt="Modern workspace interior"
              className="w-full h-auto"
            />
          </div>

          <p className="font-heading text-2xl md:text-4xl font-semibold text-foreground-950 leading-snug max-w-2xl">
            The office isn&rsquo;t <em className="not-italic text-foreground-400 font-light">disappearing</em> — it&rsquo;s becoming <strong className="font-bold">smarter</strong>. Let your workspace adapt to your team, not the other way around.
          </p>

          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-primary-500 text-background-50 font-semibold text-sm px-8 py-4 rounded-full mt-10 hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Start Your Free Trial
            <i className="ri-arrow-right-line"></i>
          </Link>
          <p className="text-xs text-foreground-400 mt-4">No commitment. Cancel anytime.</p>
        </div>
      </div>
    </section>
  );
}