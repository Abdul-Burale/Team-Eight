import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
  } from "lucide-react";
  
  export function Footer() {
    return (
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand */}
            <div>
              <h3 className="text-lg font-semibold mb-4">HomeMatch</h3>
              <p className="text-gray-400 text-sm">
                Your intelligent property search companion. Find your perfect home
                with AI-powered matching.
              </p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h4 className="text-md font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {["Property Search", "Market Intelligence", "Smart Alerts", "Profile"].map((item) => (
                  <li key={item}>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Legal */}
            <div>
              <h4 className="text-md font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                {["About Us", "Terms of Use", "Privacy Policy", "Cookies Policy"].map((item) => (
                  <li key={item}>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Social */}
            <div>
              <h4 className="text-md font-semibold mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <button
                    key={i}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
  
          {/* Bottom */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 HomeMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  