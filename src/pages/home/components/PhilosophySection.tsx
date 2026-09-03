export default function PhilosophySection() {
  return (
    <section className="bg-[#F4F6F8] py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
          <div className="w-full max-w-lg h-64 md:h-72 rounded-2xl overflow-hidden mb-12">
            <img
              src="https://readdy.ai/api/search-image?query=Abstract%20geometric%20illustration%20of%20connected%20workspace%20nodes%20forming%20a%20harmonious%20network%2C%20warm%20amber%20and%20cream%20tones%20with%20sage%20green%20accents%2C%20minimalist%20modern%20art%20style%2C%20soft%20gradients%2C%20clean%20composition%2C%20technology%20meets%20nature%20aesthetic&width=800&height=560&seq=philosophy-illustration&orientation=landscape"
              alt="Connected workspace illustration"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-sm text-foreground-500 font-medium tracking-wide uppercase mb-6">Our Philosophy</p>

          <p className="font-heading text-xl md:text-3xl font-medium text-foreground-900 leading-relaxed">
            We believe the best offices aren&rsquo;t the biggest — they&rsquo;re the <strong className="font-bold">smartest</strong>. Every square foot should earn its place. Every desk should serve a purpose. That&rsquo;s why we built HotDesk-Hub: to turn workspace data into <strong className="font-bold">better decisions</strong>, happier teams, and a <strong className="font-bold">lighter footprint</strong> for the planet.
          </p>
        </div>
      </div>
    </section>
  );
}