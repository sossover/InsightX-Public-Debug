import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information that you provide directly to us, information we obtain automatically when you use our service, and information from third party sources.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect InsightX and our users.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">3. Information Sharing and Disclosure</h2>
          <p className="mb-4">
            We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes without your explicit consent.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">4. Data Security</h2>
          <p className="mb-4">
            We use reasonable security measures designed to protect your information. However, no security measures are 100% secure.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">5. Your Rights</h2>
          <p className="mb-4">
            You have the right to access, update, or delete your information and to opt out of certain uses of your information.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}