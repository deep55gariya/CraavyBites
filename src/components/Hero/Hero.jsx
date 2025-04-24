import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSprings, animated, config } from "react-spring";

const Hero = ({ theme }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

  // Premium dishes data
  const dishes = [
    {
      id: 1,
      name: "Truffle Infused Risotto",
      chef: "Executive Chef Marco",
      image: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&q=85&w=1690",
      description: "Arborio rice slow-cooked with aged Parmesan and black truffle shavings"
    },
    {
      id: 2,
      name: "Seared Wagyu Perfection",
      chef: "Chef de Cuisine Eliza",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=85&w=1688",
      description: "A5 Japanese Wagyu beef with caramelized vegetables and red wine reduction"
    },
    {
      id: 3,
      name: "Deconstructed Tiramisu",
      chef: "Pastry Chef Giovanni",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=85&w=1664",
      description: "Espresso-soaked sponge with mascarpone spheres and cocoa dust"
    }
  ];

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate dishes
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % dishes.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [dishes.length]);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    if (containerRef.current && !isMobile) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

  // Check if user is logged in
  const isUserLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };

  // Handle navigation
  const handleExploreClick = () => {
    if (isUserLoggedIn()) {
      navigate("/menu");
    } else {
      navigate("/login");
    }
  };

  // Animated index indicators
  const [springs, setSprings] = useSprings(dishes.length, i => ({
    scale: i === activeIndex ? 1.5 : 1,
    opacity: i === activeIndex ? 1 : 0.5,
    width: i === activeIndex ? 30 : 10,
    config: config.gentle
  }));

  useEffect(() => {
    setSprings(i => ({
      scale: i === activeIndex ? 1.5 : 1,
      opacity: i === activeIndex ? 1 : 0.5,
      width: i === activeIndex ? 30 : 10
    }));
  }, [activeIndex, setSprings]);

  // Parallax calculation
  const getParallaxStyle = (depth) => {
    if (isMobile) return {};
    
    const x = (mousePosition.x - 0.5) * depth * -20;
    const y = (mousePosition.y - 0.5) * depth * -20;
    
    return {
      transform: `translate3d(${x}px, ${y}px, 0)`
    };
  };

  // Utility functions for style calculation
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

  return (
    <div 
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: getBgColor(),
        color: getTextColor(),
        overflow: "hidden",
        transition: "background 0.5s ease, color 0.5s ease",
      }}
    >
      {/* Animated background particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [Math.random() * 100, Math.random() * 100 - 50],
            y: [Math.random() * 100, Math.random() * 100 - 50],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            position: "absolute",
            width: 100 + Math.random() * 150,
            height: 100 + Math.random() * 150,
            borderRadius: "50%",
            background: getAccentColor(),
            filter: "blur(80px)",
            opacity: 0.07,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            zIndex: 0,
          }}
        />
      ))}

      {/* Diagonal divider */}
      <div style={{
        position: "absolute",
        width: "150%",
        height: isMobile ? "100%" : "150%",
        background: getAccentColor(),
        opacity: 0.02,
        transform: isMobile ? "none" : "rotate(-35deg) translateX(-30%) translateY(-20%)",
        top: 0,
        left: 0,
        zIndex: 1,
      }} />

      {/* Main content container */}
      <div style={{
        maxWidth: "1600px",
        margin: "0 auto",
        padding: isMobile ? "2rem 1rem" : isTablet ? "3rem 2rem" : "4rem",
        height: "100vh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        zIndex: 2,
      }}>
        {/* Left side - Text content */}
        <div style={{
          flex: "1 1 50%",
          maxWidth: isMobile ? "100%" : "50%",
          paddingRight: isMobile ? 0 : isTablet ? "2rem" : "4rem",
          marginBottom: isMobile ? "2rem" : 0,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ ...getParallaxStyle(1) }}
          >
            <div style={{
              display: "inline-block",
              padding: "0.5rem 1rem",
              background: `${getAccentColor()}15`,
              borderLeft: `3px solid ${getAccentColor()}`,
              borderRadius: "0 4px 4px 0",
              marginBottom: "1.5rem",
            }}>
              <span style={{
                fontSize: isMobile ? "0.9rem" : "1rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                color: getAccentColor(),
                textTransform: "uppercase",
              }}>
                Extraordinary Culinary Experience
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? "2.5rem" : isTablet ? "3.5rem" : "4.5rem",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              position: "relative",
            }}>
              <span style={{
                display: "block",
                marginBottom: "0.5rem",
              }}>Savor the</span>
              <span style={{
                display: "block",
                color: getAccentColor(),
                position: "relative",
              }}>
                Extraordinary
                <svg style={{
                  position: "absolute",
                  bottom: "-10px",
                  left: "0",
                  width: "100%",
                  height: "8px",
                  zIndex: -1,
                }}>
                  <motion.path
                    d="M0,0 Q50,15 100,0 T200,0 T300,0 T400,0"
                    fill="none"
                    stroke={getAccentColor()}
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </svg>
              </span>
            </h1>

            <p style={{
              fontSize: isMobile ? "1rem" : "1.15rem",
              lineHeight: 1.7,
              color: getSubTextColor(),
              marginBottom: "2.5rem",
              maxWidth: "540px",
            }}>
              Where culinary artistry meets innovation. Each dish tells a story of passion, 
              meticulous craftsmanship, and the finest seasonal ingredients sourced from 
              artisanal producers worldwide.
            </p>

            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "1rem" : "1.5rem",
              alignItems: isMobile ? "stretch" : "center",
            }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleExploreClick}
                style={{
                  background: getAccentColor(),
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 600,
                  padding: "1.2rem 2rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: `0 10px 20px ${getAccentColor()}25`,
                }}
              >
                <span>Explore Our Menu</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <motion.path
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "transparent",
                  color: getTextColor(),
                  fontSize: "1rem",
                  fontWeight: 500,
                  padding: "1.2rem 2rem",
                  borderRadius: "0.5rem",
                  border: `1px solid ${getTextColor()}20`,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
                onClick={() => navigate("/reservation")}
              >
                <span>Book a Table</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </div>

            {/* Rating & Awards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem",
                marginTop: "3rem",
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="18" height="18" viewBox="0 0 24 24" fill={getAccentColor()}>
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
                <div>
                  <strong style={{ color: getTextColor() }}>4.9</strong>
                  <span style={{ 
                    color: getSubTextColor(),
                    fontSize: "0.85rem",
                    marginLeft: "0.3rem" 
                  }}>
                    (2.4k Reviews)
                  </span>
                </div>
              </div>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={getAccentColor()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
                <div>
                  <strong style={{ color: getTextColor() }}>Michelin</strong>
                  <span style={{ 
                    color: getSubTextColor(),
                    fontSize: "0.85rem",
                    marginLeft: "0.3rem" 
                  }}>
                    Star Restaurant
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side - Rotating dishes showcase */}
        <div style={{
          flex: "1 1 50%",
          maxWidth: isMobile ? "100%" : "50%",
          height: isMobile ? "360px" : isTablet ? "450px" : "600px",
          position: "relative",
          borderRadius: "1rem",
          overflow: "hidden",
        }}>
          {/* Circular background accent */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              position: "absolute",
              width: "150%",
              height: "150%",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${getAccentColor()}20 0%, transparent 70%)`,
              top: "-25%",
              left: "-25%",
              zIndex: 0,
            }}
          />

          {/* Dishes carousel */}
          <div style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "1rem",
            overflow: "hidden",
            boxShadow: `0 25px 50px -12px ${theme === "dark" ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.15)"}`,
            zIndex: 1,
          }}>
            <AnimatePresence mode="wait">
              {dishes.map((dish, index) => (
                index === activeIndex && (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {/* Image */}
                    <div style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                    }}>
                      <motion.div
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        style={{
                          width: "100%",
                          height: "100%",
                          ...getParallaxStyle(2),
                        }}
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Dish info overlay */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
                        padding: isMobile ? "1.5rem" : isTablet ? "2rem" : "3rem",
                        color: "#ffffff",
                      }}
                    >
                      <span style={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        opacity: 0.9,
                        marginBottom: "0.5rem",
                        display: "block",
                      }}>
                        {dish.chef}
                      </span>
                      <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: isMobile ? "1.5rem" : "2rem",
                        fontWeight: 700,
                        marginBottom: "0.5rem",
                      }}>
                        {dish.name}
                      </h3>
                      <p style={{
                        fontSize: "0.95rem",
                        opacity: 0.8,
                        maxWidth: "90%",
                      }}>
                        {dish.description}
                      </p>
                    </motion.div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* Navigation dots */}
            <div style={{
              position: "absolute",
              bottom: isMobile ? "8rem" : "10rem",
              right: isMobile ? "1rem" : "3rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              zIndex: 10,
            }}>
              {springs.map((props, i) => (
                <animated.div
                  key={i}
                  style={{
                    ...props,
                    height: 8,
                    backgroundColor: "white",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setActiveIndex(i);
                    clearInterval(intervalRef.current);
                    intervalRef.current = setInterval(() => {
                      setActiveIndex((prevIndex) => (prevIndex + 1) % dishes.length);
                    }, 5000);
                  }}
                />
              ))}
            </div>
          </div>

          {/* 3D floating elements */}
          {!isMobile && (
            <>
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  position: "absolute",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: getAccentColor(),
                  opacity: 0.2,
                  top: "10%",
                  left: "-5%",
                  filter: "blur(20px)",
                  zIndex: 0,
                }}
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  position: "absolute",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: getAccentColor(),
                  opacity: 0.15,
                  bottom: "5%",
                  right: "-8%",
                  filter: "blur(25px)",
                  zIndex: 0,
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Scrolling indicator */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={getSubTextColor()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </motion.div>
          <span style={{
            fontSize: "0.8rem",
            color: getSubTextColor(),
            marginTop: "0.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}>
            Scroll to explore
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default Hero;