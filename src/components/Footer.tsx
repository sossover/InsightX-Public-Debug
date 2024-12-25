import { Facebook, Linkedin, Youtube, Twitter, Instagram, MessageSquare, Accessibility } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";

export const Footer = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Black Friday Banner */}
      <div className="w-full bg-primary text-white py-3 text-center animate-pulse">
        🎉 Black Friday Sale - 60% Off All Plans! Limited Time Only 🎉
      </div>

      <footer className="bg-white border-t border-gray-200 w-full">
        <div className="w-full px-4 py-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Company */}
              <div>
                <h3 className="font-semibold text-primary mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">About Yoad</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Careers</Link></li>
                  <li><Link to="/privacy-policy" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms-of-use" className="text-gray-600 hover:text-primary transition-colors">Terms of Use</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Contact Us</Link></li>
                </ul>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-primary mb-4">Features</h3>
                <ul className="space-y-3">
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Campaign Analytics</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Geographic Insights</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Performance Metrics</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">AI-Powered Analysis</Link></li>
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="font-semibold text-primary mb-4">Solutions</h3>
                <ul className="space-y-3">
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Enterprise Analytics</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Agency Dashboard</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Marketing Teams</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Consultants</Link></li>
                </ul>
              </div>

              {/* Learn */}
              <div>
                <h3 className="font-semibold text-primary mb-4">Learn</h3>
                <ul className="space-y-3">
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Blog</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Documentation</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Case Studies</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Resources</Link></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold text-primary mb-4">Support</h3>
                <ul className="space-y-3">
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Help Center</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">API Documentation</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Community</Link></li>
                  <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Status</Link></li>
                </ul>
              </div>
            </div>

            {/* Social Media & Copyright */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-600 mb-4 md:mb-0">
                  © 2024 Yoad Analytics. All rights reserved.
                  <span className="mx-2">|</span>
                  <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                  <span className="mx-2">|</span>
                  <Link to="/terms-of-use" className="hover:text-primary transition-colors">Terms of Use</Link>
                </div>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    <Youtube className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chatbot Button */}
        <Button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-primary hover:bg-primary/90 text-white shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>

        {/* Accessibility Button */}
        <Button
          className="fixed bottom-4 left-4 rounded-full w-12 h-12 bg-primary hover:bg-primary/90 text-white shadow-lg"
        >
          <Accessibility className="h-6 w-6" />
        </Button>

        {/* Simple Chat Window (you can expand this) */}
        {isChatOpen && (
          <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-primary">Chat Support</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChatOpen(false)}
              >
                ×
              </Button>
            </div>
            <div className="h-72 overflow-y-auto border-t border-b">
              {/* Chat messages would go here */}
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}
      </footer>
    </>
  );
};
