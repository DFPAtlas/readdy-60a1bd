import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { legalPages } from '@/mocks/legalData';

export default function PrivacyPolicy() {
  const page = legalPages.privacyPolicy;
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background-50">
          <div className="max-w-[800px] mx-auto px-4 md:px-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-amber-700 font-medium">
                This is a placeholder document. Final legal text must be reviewed and approved by qualified legal counsel before launch.
              </p>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-2">{page.title}</h1>
            <p className="text-sm text-foreground-500 mb-10">Last updated: {page.lastUpdated}</p>

            <div className="space-y-8">
              {page.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-heading text-lg font-bold text-foreground-900 mb-3">{section.heading}</h2>
                  <p className="text-sm text-foreground-600 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}