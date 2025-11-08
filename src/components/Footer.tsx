import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="mb-4">HomeMatch</h3>
            <p className="text-gray-400 text-sm">
              Your intelligent property search companion. Find your perfect home with AI-powered matching.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('search')} className="text-gray-400 hover:text-white transition-colors">
                  Property Search
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('market')} className="text-gray-400 hover:text-white transition-colors">
                  Market Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('alerts')} className="text-gray-400 hover:text-white transition-colors">
                  Smart Alerts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profile')} className="text-gray-400 hover:text-white transition-colors">
                  Profile
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Terms of Use
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Cookies Policy
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 HomeMatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
