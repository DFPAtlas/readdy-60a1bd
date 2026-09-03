import { aiFeatures } from '@/mocks/homeData';

const featureImages: Record<string, string> = {
  'feature-smart-match': 'https://readdy.ai/api/search-image?query=Abstract%20visualization%20of%20AI%20matching%20algorithm%20connecting%20people%20icons%20to%20desk%20icons%20on%20a%20clean%20grid%2C%20warm%20amber%20and%20cream%20color%20palette%2C%20minimalist%20infographic%20style%2C%20soft%20gradients%2C%20modern%20tech%20illustration%2C%20clean%20white%20background%2C%20professional%20yet%20friendly%20aesthetic&width=700&height=480&seq=feature-smart-match&orientation=landscape',
  'feature-occupancy': 'https://readdy.ai/api/search-image?query=Minimalist%20bar%20chart%20and%20line%20graph%20visualization%20showing%20office%20occupancy%20trends%20over%20time%2C%20warm%20amber%20accents%20on%20light%20cream%20background%2C%20clean%20data%20visualization%20design%2C%20modern%20dashboard%20widget%20style%2C%20simple%20elegant%20infographic%2C%20professional%20analytics%20aesthetic&width=500&height=380&seq=feature-occupancy&orientation=landscape',
  'feature-cost': 'https://readdy.ai/api/search-image?query=Abstract%20illustration%20of%20cost%20savings%20concept%20with%20declining%20graph%20line%20and%20currency%20symbol%2C%20warm%20terracotta%20and%20cream%20tones%2C%20minimalist%20clean%20design%2C%20modern%20financial%20infographic%20style%2C%20soft%20gradients%2C%20professional%20business%20illustration%2C%20light%20background&width=500&height=380&seq=feature-cost&orientation=landscape',
};

export default function FeatureGrid() {
  return (
    <section id="features" className="bg-background-50 py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10 mb-12 md:mb-16">
          <div className="flex-1">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground-950 leading-tight">
              AI That Actually<br />Understands Your Office
            </h2>
          </div>
          <div className="flex-1 flex items-end">
            <p className="text-sm md:text-base text-foreground-600 max-w-md">
              Our machine learning models analyse usage patterns across your workspace to deliver insights no other platform can match.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
          {aiFeatures.map((feature) => {
            const isLarge = feature.size === 'large';

            return (
              <div
                key={feature.title}
                className={`bg-background-100 rounded-lg overflow-hidden border border-background-200/70 flex flex-col ${
                  isLarge ? 'md:row-span-2' : ''
                }`}
              >
                {isLarge ? (
                  <>
                    <div className="h-64 md:h-72 overflow-hidden">
                      <img
                        src={featureImages[feature.imageSeq]}
                        alt={feature.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <h3 className="font-heading text-xl font-bold text-foreground-900 mb-3">{feature.title}</h3>
                      <p className="text-sm text-foreground-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-5 md:p-6">
                      <h3 className="font-heading text-lg font-bold text-foreground-900 text-center mb-4">{feature.title}</h3>
                    </div>
                    <div className="h-48 md:h-56 overflow-hidden">
                      <img
                        src={featureImages[feature.imageSeq]}
                        alt={feature.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-5 md:p-6">
                      <p className="text-sm text-foreground-600 leading-relaxed text-center">{feature.description}</p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}