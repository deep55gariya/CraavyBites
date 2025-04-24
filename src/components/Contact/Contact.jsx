import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";

const Contact = ({ theme }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      {/* Background Pattern/Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute -right-[300px] -top-[300px] w-[600px] h-[600px] rounded-full opacity-10" 
          style={{ 
            background: "radial-gradient(circle, rgba(251,146,60,0.4) 0%, rgba(251,146,60,0.1) 50%, rgba(251,146,60,0) 70%)",
          }}
        ></div>
        <div 
          className="absolute -left-[200px] -bottom-[200px] w-[500px] h-[500px] rounded-full opacity-10" 
          style={{ 
            background: "radial-gradient(circle, rgba(251,146,60,0.4) 0%, rgba(251,146,60,0.1) 50%, rgba(251,146,60,0) 70%)",
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div 
                className="inline-block p-3 rounded-full bg-amber-50 dark:bg-amber-900/20"
                style={{
                  boxShadow: theme === 'dark' ? "0 0 25px rgba(245, 158, 11, 0.15)" : "0 0 15px rgba(245, 158, 11, 0.1)"
                }}
              >
                <GiKnifeFork 
                  size={36} 
                  className="text-amber-500"
                  style={{
                    filter: theme === 'dark' ? 'drop-shadow(0 0 5px rgba(245, 158, 11, 0.5))' : 'none'
                  }}
                />
              </div>
            </div>
            <h2 
              className="text-4xl sm:text-5xl font-serif font-bold mb-6"
              style={{
                background: "linear-gradient(135deg, #ff7e00, #ff2a00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: theme === 'dark' ? "0 0 15px rgba(255,126,0,0.3)" : "none"
              }}
            >
              Reserve Your Culinary Experience
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Let our expert chefs create an unforgettable gastronomic journey for you and your guests. 
              Book your table today or inquire about our private dining experiences.
            </p>
          </motion.div>

          {/* Main Content Container */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 overflow-hidden rounded-2xl shadow-xl"
          >
            {/* Contact Methods - Left Side */}
            <div className="lg:col-span-2 bg-amber-50 dark:bg-gray-900 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-serif font-bold mb-6 text-gray-800 dark:text-white">
                  Get in Touch
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                      <FaPhoneAlt className="text-amber-500" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Call Us</p>
                      <a 
                        href="tel:+15551234567" 
                        className="text-gray-800 dark:text-white font-medium hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                      >
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-amber-500" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email Us</p>
                      <a 
                        href="mailto:reservations@gourmetsociety.com"
                        className="text-gray-800 dark:text-white font-medium hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                      >
                        reservations@gourmetsociety.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                      <FaCalendarAlt className="text-amber-500" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Hours</p>
                      <p className="text-gray-800 dark:text-white font-medium">
                        Mon-Fri: 11am - 10pm <br />
                        Sat-Sun: 10am - 11pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  {["facebook", "instagram", "twitter", "pinterest"].map((social, index) => (
                    <a 
                      key={index}
                      href="#" 
                      className="w-10 h-10 rounded-full border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300"
                    >
                      <img 
                        src={`/api/placeholder/15/15`} 
                        alt={social} 
                        className="opacity-70 hover:opacity-100 transition-opacity" 
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact Form - Right Side */}
            <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-8 sm:p-10">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-500 transition-all" 
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-500 transition-all" 
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-500 transition-all" 
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Number of Guests
                    </label>
                    <select 
                      id="guests" 
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-500 transition-all"
                    >
                      <option value="1-2">1-2 Guests</option>
                      <option value="3-4">3-4 Guests</option>
                      <option value="5-8">5-8 Guests</option>
                      <option value="9+">9+ Guests</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Date & Time
                  </label>
                  <input 
                    type="datetime-local" 
                    id="date" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-500 transition-all" 
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Special Requests
                  </label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-500 transition-all" 
                    placeholder="Tell us about any dietary restrictions or special occasions..."
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 relative overflow-hidden group"
                    style={{
                      boxShadow: theme === 'dark' ? "0 4px 20px rgba(245, 158, 11, 0.3)" : "0 4px 12px rgba(245, 158, 11, 0.2)"
                    }}
                  >
                    <span className="relative z-10">Make Reservation</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
          
          {/* Map or Location Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="bg-gray-100 dark:bg-gray-900 p-4 text-center">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Find Us
              </h3>
            </div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 relative">
              <img 
                src="/api/placeholder/1200/400" 
                alt="Restaurant Location Map" 
                className="w-full h-full object-cover opacity-90" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
                  <h4 className="font-serif font-bold text-lg mb-2 text-center">Gourmet Society</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    785 Gourmet Avenue, Culinary District<br />
                    New York, NY 10001
                  </p>
                  <div className="mt-3 text-center">
                    <a 
                      href="#" 
                      className="text-sm text-amber-500 hover:text-amber-600 font-medium inline-flex items-center gap-1"
                    >
                      <span>Get Directions</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;