import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { IoRestaurantOutline, IoTimeOutline, IoLeafOutline } from "react-icons/io5";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    name: "Gourmet Excellence",
    icon: <IoRestaurantOutline style={{ fontSize: "3.5rem" }} />,
    link: "#",
    description: "Our award-winning chefs craft each dish with premium ingredients and artistic presentation.",
    accentColor: "#FFD700",
    hoverGradient: "linear-gradient(135deg, #FFD700, #FFA500)",
    delay: 0
  },
  {
    name: "Farm to Table Fresh",
    icon: <IoLeafOutline style={{ fontSize: "3.5rem" }} />,
    link: "#",
    description: "We source ingredients from local organic farms to ensure peak freshness and flavor in every bite.",
    accentColor: "#4CAF50",
    hoverGradient: "linear-gradient(135deg, #4CAF50, #8BC34A)",
    delay: 0.2
  },
  {
    name: "Culinary Innovation",
    icon: <IoTimeOutline style={{ fontSize: "3.5rem" }} />,
    link: "#",
    description: "Experience bold fusion flavors and creative techniques that push culinary boundaries.",
    accentColor: "#E91E63",
    hoverGradient: "linear-gradient(135deg, #E91E63, #FF9800)",
    delay: 0.4
  },
];

const CulinaryFeatures = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  // Card hover animation handler
  const handleHover = (index) => {
    gsap.to(cardsRef.current[index], {
      y: -15,
      scale: 1.03,
      boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
      duration: 0.4,
      ease: "power2.out"
    });
    
    // Animate icon
    const iconEl = cardsRef.current[index].querySelector(".feature-icon");
    gsap.to(iconEl, {
      rotateY: "+=180",
      scale: 1.2,
      duration: 0.6,
      ease: "back.out(1.7)"
    });
  };

  // Card hover exit handler
  const handleHoverExit = (index) => {
    gsap.to(cardsRef.current[index], {
      y: 0,
      scale: 1,
      boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
      duration: 0.4,
      ease: "power2.out"
    });
    
    // Animate icon back
    const iconEl = cardsRef.current[index].querySelector(".feature-icon");
    gsap.to(iconEl, {
      rotateY: "-=180",
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)"
    });
  };

  // Add card to refs collection
  const addToRefs = (el, index) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current[index] = el;
    }
  };

  useEffect(() => {
    // Trigger animations when component comes into view
    if (inView) {
      controls.start("visible");
    }

    // Header reveal animation
    gsap.from(".features-header", {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".features-header",
        start: "top 80%",
      }
    });

    // Animated background
    gsap.to(".animated-bg", {
      backgroundPosition: "0% 50%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Decorative elements animation
    const decorElements = document.querySelectorAll('.decorative-element');
    decorElements.forEach(elem => {
      gsap.to(elem, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(20, 30)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Cards staggered animation
    gsap.fromTo(
      cardsRef.current,
      { 
        y: 100,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%"
        }
      }
    );
  }, [controls, inView]);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div 
      className="culinary-features animated-bg"
      style={{
        position: "relative",
        background: "linear-gradient(120deg, #0D0D0D, #1A1A1A)",
        backgroundSize: "200% 200%",
        padding: "100px 0",
        overflow: "hidden",
        color: "#ffffff"
      }}
    >
      {/* Decorative elements */}
      <div 
        className="decorative-element"
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle, rgba(255,215,0,0.08) 0%, rgba(255,215,0,0) 70%)",
          borderRadius: "50%",
          zIndex: 1
        }}
      ></div>
      <div 
        className="decorative-element"
        style={{
          position: "absolute",
          bottom: "15%",
          right: "8%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(233,30,99,0.08) 0%, rgba(233,30,99,0) 70%)",
          borderRadius: "50%",
          zIndex: 1
        }}
      ></div>
      <div 
        className="decorative-element"
        style={{
          position: "absolute",
          top: "60%",
          left: "15%",
          width: "120px",
          height: "120px",
          background: "radial-gradient(circle, rgba(76,175,80,0.08) 0%, rgba(76,175,80,0) 70%)",
          borderRadius: "50%",
          zIndex: 1
        }}
      ></div>

      {/* Fork and knife decorative lines */}
      <svg 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.03,
          zIndex: 0
        }}
      >
        <pattern 
          id="pattern" 
          x="0" 
          y="0" 
          width="40" 
          height="40" 
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(30)"
        >
          <path d="M0 20 L40 20" stroke="#FFD700" strokeWidth="0.5" />
          <path d="M20 0 L20 40" stroke="#FFD700" strokeWidth="0.5" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
      </svg>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px"
        }}
      >
        <div 
          className="features-header"
          ref={ref}
          style={{
            marginBottom: "80px",
            textAlign: "center"
          }}
        >
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={controls}
            style={{
              position: "relative",
              display: "inline-block"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-30px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "80px",
                fontFamily: "'Playfair Display', serif",
                opacity: 0.07,
                color: "#FFD700",
                whiteSpace: "nowrap"
              }}
            >
              Culinary Excellence
            </div>
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "700",
                color: "#ffffff",
                fontFamily: "'Playfair Display', serif",
                position: "relative",
                display: "inline-block"
              }}
            >
              Why <span style={{ color: "#FFD700" }}>Choose</span> Us
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                position: "absolute",
                height: "4px",
                background: "linear-gradient(90deg, transparent, #FFD700, transparent)",
                bottom: "-15px",
                left: "10%",
                borderRadius: "2px"
              }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              fontSize: "1.1rem",
              color: "#e0e0e0",
              maxWidth: "700px",
              margin: "40px auto 0",
              lineHeight: 1.7,
              fontFamily: "'Montserrat', sans-serif"
            }}
          >
            At our establishment, we combine culinary artistry with exceptional service to create unforgettable dining experiences. Our commitment to quality and innovation sets us apart.
          </motion.p>
        </div>

        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            margin: "0 auto",
            perspective: "1000px"
          }}
        >
          {featuresData.map((feature, index) => (
            <div
              key={feature.name}
              ref={(el) => addToRefs(el, index)}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                transition: "all 0.4s ease",
                border: "1px solid rgba(255,255,255,0.05)",
                position: "relative",
                transform: `perspective(1000px) rotateY(${index % 2 === 0 ? -5 : 5}deg)`,
                transformStyle: "preserve-3d"
              }}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHoverExit(index)}
            >
              {/* Glowing accent corner */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "150px",
                  height: "150px",
                  background: `radial-gradient(circle at top right, ${feature.accentColor}33, transparent 70%)`,
                  zIndex: 0
                }}
              ></div>

              {/* Content container */}
              <div
                style={{
                  padding: "40px 30px",
                  position: "relative",
                  zIndex: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center"
                }}
              >
                {/* Icon with circular background */}
                <div
                  className="feature-icon"
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "25px",
                    boxShadow: `0 10px 20px rgba(0,0,0,0.1), 0 0 0 2px ${feature.accentColor}33`,
                    position: "relative",
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Pulsing ring animation */}
                  <div
                    style={{
                      position: "absolute",
                      borderRadius: "50%",
                      border: `2px solid ${feature.accentColor}`,
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      animation: `pulseRing 2s infinite ${feature.delay + 1}s`
                    }}
                  ></div>
                  
                  {/* Icon with color */}
                  <div style={{ color: feature.accentColor, transform: "translateZ(20px)" }}>
                    {feature.icon}
                  </div>
                </div>

                {/* Feature name */}
                <h2
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "700",
                    color: "#ffffff",
                    marginBottom: "15px",
                    fontFamily: "'Playfair Display', serif",
                    position: "relative"
                  }}
                >
                  {feature.name}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-8px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "40px",
                      height: "2px",
                      background: feature.accentColor,
                      borderRadius: "1px"
                    }}
                  ></span>
                </h2>

                {/* Feature description */}
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#e0e0e0",
                    lineHeight: 1.6,
                    marginBottom: "30px",
                    fontFamily: "'Montserrat', sans-serif",
                    flex: 1
                  }}
                >
                  {feature.description}
                </p>

                {/* Learn more button */}
                <a
                  href={feature.link}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 25px",
                    borderRadius: "30px",
                    background: "transparent",
                    border: `2px solid ${feature.accentColor}`,
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                    fontFamily: "'Montserrat', sans-serif",
                    textDecoration: "none",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = feature.hoverGradient;
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.boxShadow = `0 10px 20px ${feature.accentColor}33`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = feature.accentColor;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span>Discover More</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for animations and transitions */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
          
          @keyframes pulseRing {
            0% {
              transform: scale(0.8);
              opacity: 0.3;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.1;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
          
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0px);
            }
          }
          
          .hover-trigger:hover .hover-scale {
            transform: scale(1.05);
          }
          
          @media (max-width: 768px) {
            .culinary-features {
              padding: 60px 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CulinaryFeatures;