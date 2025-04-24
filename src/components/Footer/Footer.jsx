import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaUtensils,
  FaClock
} from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { IoRestaurant } from "react-icons/io5";

const QuickLinks = [
  {
    title: "Our Menu",
    link: "/#menu",
  },
  {
    title: "Reservations",
    link: "/#reservations",
  },
  {
    title: "Special Events",
    link: "/#events",
  },
  {
    title: "Gift Cards",
    link: "/#gift-cards",
  },
];

const AboutLinks = [
  {
    title: "Our Story",
    link: "/#story",
  },
  {
    title: "Our Chefs",
    link: "/#chefs",
  },
  {
    title: "Press",
    link: "/#press",
  },
  {
    title: "Careers",
    link: "/#careers",
  },
];

const LegalLinks = [
  {
    title: "Privacy Policy",
    link: "/#privacy",
  },
  {
    title: "Terms of Service",
    link: "/#terms",
  },
  {
    title: "Cookies",
    link: "/#cookies",
  },
  {
    title: "Accessibility",
    link: "/#accessibility",
  },
];

const Footer = ({ theme }) => {
  return (
    <footer>
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-900 dark:border-t dark:border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <GiKnifeFork 
                  size={42} 
                  className="text-amber-500 transform rotate-12"
                  style={{
                    filter: theme === 'dark' ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))' : 'none'
                  }}
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h2 
              className="text-3xl md:text-4xl font-serif font-bold mb-4"
              style={{
                background: "linear-gradient(135deg, #ff7e00, #ff2a00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: theme === 'dark' ? "0 0 15px rgba(255,126,0,0.3)" : "none"
              }}
            >
              Join Our Culinary Community
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter for exclusive recipes, special offers, and invitations to members-only tasting events.
            </p>
            <form className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-5 py-3 rounded-full flex-grow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
              />
              <button 
                type="submit" 
                className="px-6 py-3 md:py-0 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
                style={{
                  boxShadow: theme === 'dark' ? "0 4px 20px rgba(245, 158, 11, 0.3)" : "0 4px 12px rgba(245, 158, 11, 0.2)"
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div 
        className="bg-white dark:bg-gray-900 dark:text-white"
        style={{
          backgroundImage: theme === 'dark' 
            ? "radial-gradient(circle at bottom right, rgba(245, 158, 11, 0.05), transparent 60%)"
            : "radial-gradient(circle at bottom right, rgba(245, 158, 11, 0.03), transparent 60%)"
        }}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Restaurant Info */}
            <div className="space-y-5">
              <div className="flex items-center">
                <div 
                  className="mr-2 text-amber-500"
                  style={{
                    filter: theme === 'dark' ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.3))' : 'none'
                  }}
                >
                  <GiKnifeFork size={32} />
                </div>
                <div>
                  <span 
                    className="text-2xl font-bold font-serif tracking-tight"
                    style={{
                      background: "linear-gradient(135deg, #ff7e00, #ff2a00)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: theme === 'dark' ? "0 0 15px rgba(255,126,0,0.3)" : "none"
                    }}
                  >
                    Gourmet
                  </span>
                  <span 
                    className="text-2xl font-light font-serif ml-1"
                    style={{
                      color: theme === 'dark' ? "#f0f0f0" : "#333",
                    }}
                  >
                    Society
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Elevating culinary experiences through artisanal creations and exceptional service. Our passion for fine cuisine drives us to create unforgettable dining moments.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-amber-500" />
                  </div>
                  <p>785 Gourmet Avenue, Culinary District</p>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <FaPhoneAlt className="text-amber-500" />
                  </div>
                  <p>+1 (555) 123-4567</p>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-amber-500" />
                  </div>
                  <p>reservations@gourmetsociety.com</p>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-amber-500" />
                  </div>
                  <div>
                    <p>Mon-Fri: 11am - 10pm</p>
                    <p>Sat-Sun: 10am - 11pm</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-serif font-bold mb-5 flex items-center gap-2">
                <IoRestaurant className="text-amber-500" /> 
                <span>Quick Links</span>
              </h3>
              <ul className="space-y-3">
                {QuickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.link} 
                      className="group flex items-center text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-300"
                    >
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">{link.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* About Us */}
            <div>
              <h3 className="text-lg font-serif font-bold mb-5 flex items-center gap-2">
                <FaUtensils className="text-amber-500" /> 
                <span>About Us</span>
              </h3>
              <ul className="space-y-3">
                {AboutLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.link} 
                      className="group flex items-center text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-300"
                    >
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">{link.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="text-lg font-serif font-bold mb-5 flex items-center gap-2">
                <GiKnifeFork className="text-amber-500" /> 
                <span>Legal</span>
              </h3>
              <ul className="space-y-3">
                {LegalLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.link} 
                      className="group flex items-center text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-300"
                    >
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">{link.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Social Links */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Follow Us</h4>
                <div className="flex items-center gap-4">
                  <a 
                    href="#" 
                    className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 transition-all duration-300"
                  >
                    <FaInstagram size={18} />
                  </a>
                  <a 
                    href="#" 
                    className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 transition-all duration-300"
                  >
                    <FaFacebook size={18} />
                  </a>
                  <a 
                    href="#" 
                    className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 transition-all duration-300"
                  >
                    <FaTwitter size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-amber-50 dark:bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} <span className="text-amber-500 font-medium">Gourmet Society</span>. All rights reserved. 
              Crafted with <span className="text-red-500">♥</span> by{" "}
              <a 
                href="https://deep55gariya.github.io/" 
                className="text-amber-500 hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Deepak
              </a>
            </p>
            
            <div className="flex items-center gap-4">
              <img 
                src="/api/placeholder/40/25" 
                alt="Payment Method" 
                className="h-6 opacity-70 hover:opacity-100 transition-opacity duration-300" 
              />
              <img 
                src="/api/placeholder/40/25" 
                alt="Payment Method" 
                className="h-6 opacity-70 hover:opacity-100 transition-opacity duration-300" 
              />
              <img 
                src="/api/placeholder/40/25" 
                alt="Payment Method" 
                className="h-6 opacity-70 hover:opacity-100 transition-opacity duration-300" 
              />
              <img 
                src="/api/placeholder/40/25" 
                alt="Payment Method" 
                className="h-6 opacity-70 hover:opacity-100 transition-opacity duration-300" 
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;