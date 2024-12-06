import { Sparkles } from "lucide-react";

const testimonials = [
  {
    quote: "InsightX has transformed how we approach our marketing analytics. The insights we've gained have been invaluable.",
    author: "Sarah Johnson",
    role: "CMO at TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    quote: "The AI-powered insights have helped us increase our ROI by 300% in just three months.",
    author: "Michael Chen",
    role: "Marketing Director at GrowthCo",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    quote: "Best analytics platform we've ever used. The real-time insights are game-changing for our campaigns.",
    author: "Emma Williams",
    role: "Head of Digital at MediaPro",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-custom-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-custom-purple-500" />
            <span className="text-custom-purple-500 font-semibold">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by leading companies
          </h2>
          <p className="text-xl text-gray-600">
            See what our customers have to say about our platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="p-8 rounded-xl bg-white border border-gray-200 hover:border-custom-purple-500 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-center mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Sparkles key={star} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logos */}
        <div className="mt-20">
          <p className="text-center text-gray-600 mb-8">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {['Google', 'Microsoft', 'Adobe', 'Shopify', 'Spotify'].map((company) => (
              <div key={company} className="text-xl font-bold text-gray-400">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}