import { Footer } from "@/components/Footer";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
        
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">2. Use License</h2>
          <p className="mb-4">
            Permission is granted to temporarily download one copy of the materials (information or software) on InsightX's website for personal, non-commercial transitory viewing only.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">3. Disclaimer</h2>
          <p className="mb-4">
            The materials on InsightX's website are provided on an 'as is' basis. InsightX makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">4. Limitations</h2>
          <p className="mb-4">
            In no event shall InsightX or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on InsightX's website.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-4">5. Revisions and Errata</h2>
          <p className="mb-4">
            The materials appearing on InsightX's website could include technical, typographical, or photographic errors. InsightX does not warrant that any of the materials on its website are accurate, complete or current.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}