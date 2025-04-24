import { useState, useEffect, useRef } from 'react';
import { ChefHat, Award, Zap, Clock, Users, Star, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);
  const parallaxRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check if components are in viewport
      const elements = [aboutRef, parallaxRef, statsRef, timelineRef];
      elements.forEach(ref => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0) {
            ref.current.classList.add('in-view');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Show initial animation after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Experience timeline data
  const timeline = [
    { year: '2000', title: 'Started Career', description: 'Began as a junior web designer creating innovative interfaces' },
    { year: '2005', title: 'Senior Designer', description: 'Led design teams for major food industry clients' },
    { year: '2010', title: 'UI/UX Director', description: 'Pioneered user-centered design methodologies' },
    { year: '2015', title: 'Frontend Architect', description: 'Developed scalable design systems for global brands' },
    { year: '2020', title: 'Design Consultant', description: 'Advising premium culinary brands on digital presence' },
    { year: '2025', title: 'Personal Venture', description: 'Launching exclusive food-focused digital experiences' }
  ];

  // Expertise data
  const expertise = [
    { icon: <ChefHat />, title: 'Culinary UX', description: 'Specialized in crafting delightful digital experiences for food brands' },
    { icon: <Zap />, title: 'Interactive Design', description: 'Creating engaging animations and micro-interactions' },
    { icon: <Users />, title: 'User Research', description: 'Deep understanding of audience needs and behaviors' }
  ];

  return (
    <div className={`min-h-screen bg-black text-white font-sans overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        transition: 'opacity 1s ease-in-out',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)'
      }}>
      
      {/* Hero Section with 3D effect */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden" ref={aboutRef}>
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("/api/placeholder/1920/1080")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)'
          }}>
        </div>
        
        {/* 3D Parallax Layers */}
        <div className="relative w-full max-w-6xl mx-auto px-6 py-24 flex flex-col items-center z-10">
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-gradient-to-br from-amber-500 to-red-600 opacity-20 blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.08}px) rotate(${scrollY * 0.02}deg)` }}>
          </div>
          <div className="absolute -bottom-24 -right-12 w-80 h-80 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 opacity-15 blur-3xl"
            style={{ transform: `translateY(${-scrollY * 0.05}px) rotate(${-scrollY * 0.01}deg)` }}>
          </div>
          
          <div className="mb-6 relative transform" 
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: `translateY(${isVisible ? '0' : '30px'})`,
              transition: 'transform 1.2s ease-out, opacity 1.2s ease-out'
            }}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-500 to-amber-300 text-center leading-none mb-4"
              style={{ textShadow: '0 4px 12px rgba(255, 165, 0, 0.2)' }}>
              Culinary Vision
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-12 relative transform"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: `translateY(${isVisible ? '0' : '30px'})`,
              transition: 'transform 1.6s ease-out, opacity 1.6s ease-out',
              transitionDelay: '0.3s' 
            }}>
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-gray-300">
              25 Years of Crafting Digital <span className="text-amber-400">Culinary</span> Experiences
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              I transform gastronomic passion into premium digital experiences,
              where every pixel and interaction is crafted with the same attention
              to detail as a Michelin-starred dish.
            </p>
          </div>
          
          <button className="mt-8 bg-gradient-to-r from-amber-500 to-amber-700 px-8 py-4 rounded-full font-medium text-white flex items-center group relative overflow-hidden transform"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: `translateY(${isVisible ? '0' : '30px'})`,
              transition: 'all 1.8s ease-out',
              transitionDelay: '0.6s',
              boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)'
            }}>
            <span className="mr-2">Explore My Journey</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
        </div>

        {/* Scrolling indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          style={{ 
            opacity: isVisible ? 0.7 : 0, 
            transition: 'opacity 2s ease-in-out',
            transitionDelay: '1.5s'
          }}>
          <p className="text-sm text-gray-400 mb-2">Scroll to discover</p>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
            <div className="w-1 bg-amber-400 rounded-full animate-bounce" style={{height: '30%'}}></div>
          </div>
        </div>
      </div>

      {/* Parallax Quote Section */}
      <div className="relative py-32 px-6 overflow-hidden" ref={parallaxRef}>
        <div className="max-w-6xl mx-auto relative">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 opacity-10 blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.03}px)` }}>
          </div>
          
          <blockquote className="text-2xl md:text-4xl lg:text-5xl font-light italic text-center max-w-4xl mx-auto text-gray-200 leading-tight transform"
            style={{
              opacity: parallaxRef.current?.classList.contains('in-view') ? 1 : 0.3,
              transform: parallaxRef.current?.classList.contains('in-view') ? 'translateY(0)' : 'translateY(50px)',
              transition: 'opacity 1s ease-out, transform 1s ease-out'
            }}>
            <span className="text-6xl text-amber-500">"</span>
            Great design is like fine cuisine — it requires passion, precision, and a deep understanding of how to create memorable experiences.
            <span className="text-6xl text-amber-500">"</span>
          </blockquote>
        </div>
      </div>

      {/* Stats & Experience Section */}
      <div className="py-24 px-6 bg-gradient-to-b from-black/30 to-black/80 relative overflow-hidden" ref={statsRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
            A Quarter Century of Excellence
          </h2>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {[
              { icon: <Award size={32} />, number: "25+", label: "Years Experience" },
              { icon: <Star size={32} />, number: "300+", label: "Premium Projects" },
              { icon: <Users size={32} />, number: "150+", label: "Satisfied Clients" },
              { icon: <Clock size={32} />, number: "12K+", label: "Design Hours" }
            ].map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl shadow-xl group hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 border border-gray-800"
                style={{
                  opacity: statsRef.current?.classList.contains('in-view') ? 1 : 0,
                  transform: statsRef.current?.classList.contains('in-view') ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.8s ease-out, transform 0.8s ease-out, box-shadow 0.5s, border-color 0.5s`,
                  transitionDelay: `${index * 0.2}s`
                }}>
                <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full text-white mx-auto group-hover:scale-110 transition-transform duration-500">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-center text-white mb-2">{stat.number}</h3>
                <p className="text-center text-gray-400">{stat.label}</p>
                <div className="w-0 h-1 bg-amber-500 mx-auto mt-4 group-hover:w-12 transition-all duration-500 rounded-full"></div>
              </div>
            ))}
          </div>
          
          {/* Expertise Section */}
          <h3 className="text-3xl font-bold mb-16 text-center text-white">Areas of Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {expertise.map((item, index) => (
              <div key={index} className="group relative"
                style={{
                  opacity: statsRef.current?.classList.contains('in-view') ? 1 : 0,
                  transform: statsRef.current?.classList.contains('in-view') ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 1s ease-out, transform 1s ease-out',
                  transitionDelay: `${0.6 + index * 0.2}s`
                }}>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-amber-900/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                <div className="flex flex-col items-center p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-amber-800/50 transition-colors duration-500">
                  <div className="text-amber-500 mb-5 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white">{item.title}</h4>
                  <p className="text-center text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-32 px-6 relative overflow-hidden" ref={timelineRef}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-24 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
            Professional Journey
          </h2>
          
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-700 via-amber-500 to-amber-700 transform -translate-x-1/2"></div>
            
            {/* Timeline Items */}
            {timeline.map((item, index) => (
              <div key={index} className={`flex items-center mb-24 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                style={{
                  opacity: timelineRef.current?.classList.contains('in-view') ? 1 : 0.3,
                  transform: timelineRef.current?.classList.contains('in-view') 
                    ? 'translateX(0)' 
                    : `translateX(${index % 2 === 0 ? '-50px' : '50px'})`,
                  transition: 'opacity 1s ease-out, transform 1s ease-out',
                  transitionDelay: `${index * 0.2}s`
                }}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className="mb-2 text-amber-500 font-bold text-lg">{item.year}</div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center text-white border-4 border-gray-900">
                    {index + 1}
                  </div>
                  <div className="hidden md:block absolute w-12 h-1 bg-gradient-to-r from-transparent to-amber-500 top-1/2 -translate-y-1/2"
                    style={{ 
                      right: index % 2 === 0 ? '100%' : 'auto',
                      left: index % 2 === 1 ? '100%' : 'auto',
                    }}></div>
                </div>
                
                <div className={`w-1/2 ${index % 2 === 0 ? 'pl-12' : 'pr-12'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="py-24 px-6 bg-gradient-to-b from-black/50 to-black relative">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute -top-32 left-0 right-0 mx-auto w-96 h-96 rounded-full bg-gradient-to-br from-amber-600 to-red-600 opacity-10 blur-3xl"></div>
          
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Elevate Your Culinary Brand?</h2>
          <p className="text-lg text-gray-300 mb-12">
            Let's create a digital experience that reflects the premium quality and artistry of your food offerings.
          </p>
          
          <button className="bg-gradient-to-r from-amber-500 to-amber-700 px-10 py-5 rounded-full font-medium text-white flex items-center mx-auto group relative overflow-hidden transform hover:scale-105 transition-transform duration-300"
            style={{boxShadow: '0 4px 20px rgba(245, 158, 11, 0.3)'}}>
            <span className="mr-3">Start a Conversation</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>

      {/* Custom styles for animations and transitions */}
      <style jsx>{`
        .in-view {
          opacity: 1;
          transform: translateY(0) !important;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}