import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Import icons (alternatively you can use your own custom SVGs)
import { FaUtensils, FaWineGlass, FaConciergeBell } from "react-icons/fa";

const CulinaryJourneySteps = ({ theme = "light" }) => {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.25,
    triggerOnce: false,
  });

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Trigger animations when section comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Utility functions for styling
  const getBgColor = () => {
    return theme === "dark" 
      ? "rgba(18, 18, 20, 1)" 
      : "rgba(248, 249, 250, 1)";
  };

  const getAccentColor = () => {
    return theme === "dark" 
      ? "rgba(255, 135, 65, 1)" 
      : "rgba(225, 75, 0, 1)";
  };

  const getTextColor = () => {
    return theme === "dark" 
      ? "rgba(240, 240, 245, 1)" 
      : "rgba(28, 29, 31, 1)";
  };

  const getSubTextColor = () => {
    return theme === "dark" 
      ? "rgba(190, 190, 200, 1)" 
      : "rgba(90, 90, 95, 1)";
  };

  // Step data
  const steps = [
    {
      id: 1,
      icon: <FaUtensils />,
      title: "Select Your Experience",
      description: "Choose from our seasonal menu featuring locally-sourced ingredients crafted by award-winning chefs.",
      gradient: `linear-gradient(135deg, ${getAccentColor()}40 0%, ${getAccentColor()}10 100%)`,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1770"
    },
    {
      id: 2,
      icon: <FaWineGlass />,
      title: "Customize Your Dining",
      description: "Personalize your experience with wine pairings, dietary preferences, and special requests for a bespoke meal.",
      gradient: `linear-gradient(135deg, ${getAccentColor()}40 0%, ${getAccentColor()}10 100%)`,
      image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&q=80&w=1770"
    },
    {
      id: 3,
      icon: <FaConciergeBell />,
      title: "Immerse & Indulge",
      description: "Arrive and surrender to our culinary artistry in a meticulously crafted ambiance tailored to your senses.",
      gradient: `linear-gradient(135deg, ${getAccentColor()}40 0%, ${getAccentColor()}10 100%)`,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1770"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 50, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const titleVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  // Line connector between steps
  const StepConnector = ({ isLast }) => {
    if (isLast) return null;
    
    return (
      <div style={{
        display: isMobile ? "none" : "block",
        position: "relative",
        width: "100px",
        height: "2px",
        background: `${getAccentColor()}25`,
        margin: "0 -10px",
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            background: getAccentColor(),
          }}
        />
      </div>
    );
  };

  return (
    <div 
      ref={ref}
      style={{
        position: "relative",
        padding: isMobile ? "4rem 1.5rem" : "8rem 4rem",
        background: getBgColor(),
        color: getTextColor(),
        overflow: "hidden",
        transition: "background 0.5s ease, color 0.5s ease",
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `radial-gradient(${getAccentColor()}10 1px, transparent 1px), 
                          radial-gradient(${getAccentColor()}10 1px, transparent 1px)`,
        backgroundSize: "30px 30px",
        backgroundPosition: "0 0, 15px 15px",
        opacity: 0.5,
        zIndex: 0,
      }} />

      {/* Background accents */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${getAccentColor()}10 0%, transparent 70%)`,
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />

      <motion.div
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-15%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${getAccentColor()}15 0%, transparent 70%)`,
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <div 
        ref={containerRef}
        style={{
          position: "relative",
          maxWidth: "1400px",
          margin: "0 auto",
          zIndex: 1,
        }}
      >
        {/* Section heading */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={titleVariants}
          style={{
            textAlign: "center",
            marginBottom: isMobile ? "3rem" : "5rem",
          }}
        >
          <div style={{
            display: "inline-block",
            padding: "0.5rem 1.5rem",
            background: `${getAccentColor()}15`,
            borderRadius: "2rem",
            marginBottom: "1rem",
          }}>
            <span style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              color: getAccentColor(),
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}>
              Our Culinary Journey
            </span>
          </div>
          
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? "2.2rem" : "3rem",
            fontWeight: 700,
            position: "relative",
            display: "inline-block",
            marginBottom: "1.5rem",
          }}>
            The Perfect Dining Experience
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                position: "absolute",
                bottom: "-10px",
                left: "0",
                height: "3px",
                background: getAccentColor(),
                borderRadius: "2px",
              }}
            />
          </h2>
          
          <p style={{
            maxWidth: "700px",
            margin: "0 auto",
            fontSize: isMobile ? "1rem" : "1.1rem",
            lineHeight: 1.6,
            color: getSubTextColor(),
          }}>
            Every detail has been carefully orchestrated to create moments of culinary bliss, 
            from your first interaction to the final delectable bite.
          </p>
        </motion.div>

        {/* Steps section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: isMobile ? "center" : "stretch",
            gap: isMobile ? "4rem" : "0",
          }}
        >
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <motion.div
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{
                  position: "relative",
                  width: isMobile ? "100%" : "340px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "2rem",
                  borderRadius: "1rem",
                  background: hoveredStep === step.id 
                    ? `${getAccentColor()}10` 
                    : "transparent",
                  transition: "all 0.3s ease",
                  zIndex: 1,
                }}
              >
                {/* Step number */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: isMobile ? "auto" : "1rem",
                  left: isMobile ? "1rem" : "auto",
                  transform: "translateY(-50%)",
                  fontSize: "5rem",
                  fontWeight: 800,
                  opacity: 0.08,
                  color: getAccentColor(),
                  zIndex: -1,
                }}>
                  {step.id}
                </div>

                {/* Icon container with pulsing effect */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: step.gradient,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                    fontSize: "2.5rem",
                    color: getAccentColor(),
                    boxShadow: `0 10px 30px ${getAccentColor()}25`,
                    overflow: "hidden",
                  }}
                >
                  {/* Pulsing circles */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 0, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: `2px solid ${getAccentColor()}`,
                    }}
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      delay: 0.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: `2px solid ${getAccentColor()}`,
                    }}
                  />
                  {step.icon}
                </motion.div>

                {/* Step title */}
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  textAlign: "center",
                }}>
                  {step.title}
                </h3>

                {/* Step description */}
                <p style={{
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  color: getSubTextColor(),
                  textAlign: "center",
                }}>
                  {step.description}
                </p>

                {/* Image preview on hover/mobile */}
                <AnimatePresence>
                  {(hoveredStep === step.id || isMobile) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        marginTop: "1.5rem",
                        width: "100%",
                        height: "140px",
                        borderRadius: "0.75rem",
                        overflow: "hidden",
                        boxShadow: `0 15px 30px ${getAccentColor()}15`,
                      }}
                    >
                      <img 
                        src={step.image} 
                        alt={step.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Connector between steps */}
              {!isMobile && <StepConnector isLast={index === steps.length - 1} />}
            </React.Fragment>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 1, duration: 0.8 }
            }
          }}
          style={{
            marginTop: "4rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.03,
              boxShadow: `0 10px 25px ${getAccentColor()}30`
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: getAccentColor(),
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 600,
              padding: "1rem 2.5rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              boxShadow: `0 10px 20px ${getAccentColor()}20`,
            }}
          >
            <span>Reserve Your Table</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default CulinaryJourneySteps;