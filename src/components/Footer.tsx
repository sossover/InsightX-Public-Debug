import { Facebook, Linkedin, Youtube, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company */}
          <div>
            <h3 className="font-semibold text-google-gray mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">About Yoad</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Careers</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Contact Us</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-google-gray mb-4">Features</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Campaign Analytics</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Geographic Insights</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Performance Metrics</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">AI-Powered Analysis</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-google-gray mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Enterprise Analytics</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Agency Dashboard</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Marketing Teams</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Consultants</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-semibold text-google-gray mb-4">Learn</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Blog</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Documentation</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Case Studies</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Resources</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-google-gray mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Help Center</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">API Documentation</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Community</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-google-blue">Status</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              © 2024 Yoad Analytics. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-google-blue">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-google-blue">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-google-blue">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-google-blue">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-google-blue">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};