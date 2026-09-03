import { useState } from 'react';
import { testimonials } from '@/mocks/homeData';

const avatarImages: Record<string, string> = {
  'avatar-sarah': 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20woman%20in%20her%2030s%20with%20warm%20smile%2C%20clean%20cream%20background%2C%20business%20casual%20attire%2C%20soft%20natural%20lighting%2C%20corporate%20portrait%20photography%20style&width=200&height=200&seq=avatar-sarah&orientation=squarish',
  'avatar-james': 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20Black%20man%20in%20his%2040s%20with%20confident%20expression%2C%20clean%20cream%20background%2C%20business%20casual%20blazer%2C%20soft%20natural%20lighting%2C%20corporate%20portrait%20photography%20style&width=200&height=200&seq=avatar-james&orientation=squarish',
  'avatar-emma': 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20woman%20in%20her%2040s%20with%20friendly%20professional%20expression%2C%20clean%20cream%20background%2C%20business%20attire%2C%20soft%20natural%20lighting%2C%20corporate%20portrait%20photography%20style&width=200&height=200&seq=avatar-emma&orientation=squarish',
};

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const testimonial = testimonials[current];

  const goNext = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="bg-[#F7F7F5] py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground-950 text-center mb-12">
          What Our <span className="font-light italic">(happy)</span> Clients Say
        </h2>

        <div className="max-w-2xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-foreground-900 text-background-50 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <i className="ri-star-fill text-primary-400 text-sm"></i>
            <span>{testimonial.rating} / 5.0</span>
          </div>

          <blockquote className="font-heading text-lg md:text-xl text-foreground-800 leading-relaxed mb-8">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={avatarImages[testimonial.avatarSeq]}
                alt={testimonial.author}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-semibold text-sm text-foreground-900">{testimonial.author}</div>
              <div className="text-xs text-foreground-500">{testimonial.role}</div>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 flex gap-2">
            <button
              onClick={goPrev}
              className="w-10 h-10 flex items-center justify-center rounded-md border border-background-300/60 bg-background-50 text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <i className="ri-arrow-left-line"></i>
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 flex items-center justify-center rounded-md bg-foreground-900 text-background-50 hover:bg-foreground-800 transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}