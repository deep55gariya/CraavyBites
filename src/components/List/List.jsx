import React, { useState, Suspense, lazy, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiCake3Fill, RiRestaurant2Fill } from "react-icons/ri";
import { GiNoodles } from "react-icons/gi";
import { IoWater } from "react-icons/io5";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Lazy load the components
const DessertMenu = lazy(() => import("../MenuCategories/DessertMenu"));
const MainCourseMenu = lazy(() => import("../MenuCategories/MainCourseMenu"));
const NoodlesMenu = lazy(() => import("../MenuCategories/NoodlesMenu"));
const BeveragesMenu = lazy(() => import("../MenuCategories/BeveragesMenu"));

const cuisineData = [
  {
    name: "Desserts",
    icon: <RiCake3Fill style={{ fontSize: "3.5rem", color: "#FFB6C1" }} />,
    link: "/desserts",
    description: "Indulge in heavenly sweet creations that tantalize your taste buds.",
    aosDelay: "0",
    component: <DessertMenu />,
    bgImage: "/api/placeholder/400/320",
    accentColor: "#FFB6C1",
    hoverColor: "#FF69B4"
  },
  {
    name: "Main Course",
    icon: <RiRestaurant2Fill style={{ fontSize: "3.5rem", color: "#90EE90" }} />,
    link: "/main-course",
    description: "Savor our chef's signature dishes crafted with the finest ingredients.",
    aosDelay: "200",
    component: <MainCourseMenu />,
    bgImage: "/api/placeholder/400/320",
    accentColor: "#90EE90",
    hoverColor: "#32CD32"
  },
  {
    name: "Noodles",
    icon: <GiNoodles style={{ fontSize: "3.5rem", color: "#FFA500" }} />,
    link: "/noodles",
    description: "Experience authentic hand-pulled noodles with rich, aromatic broths.",
    aosDelay: "400",
    component: <NoodlesMenu />,
    bgImage: "/api/placeholder/400/320",
    accentColor: "#FFA500",
    hoverColor: "#FF8C00"
  },
  {
    name: "Beverages",
    icon: <IoWater style={{ fontSize: "3.5rem", color: "#87CEEB" }} />,
    link: "/beverages",
    description: "Refresh with our artisanal drinks, from exotic teas to craft cocktails.",
    aosDelay: "600",
    component: <BeveragesMenu />,
    bgImage: "/api/placeholder/400/320",
    accentColor: "#87CEEB",
    hoverColor: "#1E90FF"
  }
];

const CuisineCategories = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const categoriesRef = useRef(null);
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Authentication check
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
      return;
    }

    // Header animation
    gsap.from(".category-header", {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Staggered card animations
    gsap.fromTo(
      cardsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 80%"
        }
      }
    );

    // Subtle background parallax effect
    gsap.to(".parallax-bg", {
      backgroundPosition: "50% 30%",
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-bg",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, [navigate]);

  const handleSelection = (component) => {
    // Smooth transition when selecting a category
    gsap.to(window, {
      scrollTo: { y: ".menu-showcase", offsetY: 50 },
      duration: 1,
      ease: "power3.inOut"
    });
    
    setSelectedItem(component);
  };

  const handleHover = (index) => {
    setHoveredItem(index);
    
    // Card hover animation
    gsap.to(cardsRef.current[index], {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      duration: 0.3
    });
  };

  const handleHoverExit = (index) => {
    setHoveredItem(null);
    
    // Card hover exit animation
    gsap.to(cardsRef.current[index], {
      scale: 1,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      duration: 0.3
    });
  };

  // Add card to refs collection
  const addToRefs = (el, index) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <>
      <span id="cuisine-categories"></span>
      <div 
        className="parallax-bg"
        style={{
          backgroundImage: "url('/api/placeholder/800/600')",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundAttachment: "fixed",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div 
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            padding: "100px 0",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div 
            ref={categoriesRef}
            style={{
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 20px"
            }}
          >
            <div 
              className="category-header"
              style={{
                marginBottom: "60px",
                textAlign: "center"
              }}
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "700",
                  color: "#ffffff",
                  fontFamily: "'Playfair Display', serif",
                  position: "relative",
                  display: "inline-block"
                }}
              >
                <span style={{ color: "#FFD700" }}>Culinary</span> Experiences
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  style={{
                    position: "absolute",
                    height: "4px",
                    background: "linear-gradient(90deg, #FFD700, transparent)",
                    bottom: "-10px",
                    left: 0,
                    borderRadius: "2px"
                  }}
                />
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{
                  fontSize: "1.2rem",
                  color: "#f0f0f0",
                  maxWidth: "700px",
                  margin: "30px auto 0",
                  lineHeight: 1.6,
                  fontFamily: "'Montserrat', sans-serif"
                }}
              >
                Embark on a gastronomic journey through our exquisite menu curated by world-renowned chefs.
                Each dish tells a story of tradition, innovation, and passion.
              </motion.p>
            </div>

            <div 
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "30px",
                margin: "0 auto"
              }}
            >
              {cuisineData.map((cuisine, index) => (
                <motion.div
                  key={cuisine.name}
                  ref={(el) => addToRefs(el, index)}
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                  style={{
                    background: hoveredItem === index 
                      ? `linear-gradient(135deg, ${cuisine.hoverColor}22, ${cuisine.hoverColor}44)`
                      : `linear-gradient(135deg, #ffffff05, #ffffff10)`,
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    transition: "all 0.4s ease",
                    border: hoveredItem === index 
                      ? `2px solid ${cuisine.accentColor}`
                      : "2px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    position: "relative"
                  }}
                  onClick={() => handleSelection(cuisine.component)}
                  onMouseEnter={() => handleHover(index)}
                  onMouseLeave={() => handleHoverExit(index)}
                >
                  <div
                    style={{
                      height: "160px",
                      overflow: "hidden",
                      position: "relative"
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${cuisine.bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "brightness(0.7)",
                        transition: "transform 0.5s ease",
                        transform: hoveredItem === index ? "scale(1.1)" : "scale(1)"
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(to top, ${cuisine.accentColor}99, transparent)`,
                        opacity: hoveredItem === index ? 0.8 : 0.5,
                        transition: "opacity 0.3s ease"
                      }}
                    />
                  </div>

                  <div
                    style={{
                      padding: "25px",
                      textAlign: "center",
                      position: "relative"
                    }}
                  >
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: hoveredItem === index 
                          ? cuisine.hoverColor 
                          : cuisine.accentColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "-65px auto 20px",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                        transition: "all 0.3s ease",
                        transform: hoveredItem === index ? "scale(1.1)" : "scale(1)"
                      }}
                    >
                      {cuisine.icon}
                    </div>

                    <h2
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: "700",
                        color: "#ffffff",
                        marginBottom: "15px",
                        fontFamily: "'Playfair Display', serif",
                        transition: "color 0.3s ease"
                      }}
                    >
                      {cuisine.name}
                    </h2>

                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#e0e0e0",
                        lineHeight: 1.6,
                        marginBottom: "25px",
                        fontFamily: "'Montserrat', sans-serif"
                      }}
                    >
                      {cuisine.description}
                    </p>

                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "12px 25px",
                        borderRadius: "30px",
                        background: hoveredItem === index 
                          ? cuisine.hoverColor 
                          : "transparent",
                        border: `2px solid ${cuisine.accentColor}`,
                        color: "#ffffff",
                        fontWeight: "600",
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        fontFamily: "'Montserrat', sans-serif",
                        boxShadow: hoveredItem === index 
                          ? `0 5px 15px ${cuisine.accentColor}88` 
                          : "none"
                      }}
                    >
                      Explore Menu
                      <motion.svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{ x: hoveredItem === index ? 5 : 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        style={{ marginLeft: "8px" }}
                      >
                        <path 
                          d="M5 12H19M19 12L12 5M19 12L12 19" 
                          stroke="white" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu showcase section */}
      <div className="menu-showcase">
        <Suspense 
          fallback={
            <div style={{
              padding: "100px 0",
              textAlign: "center", 
              background: "#0D0D0D",
              width: "100%"
            }}>
              <div style={{
                display: "inline-block",
                position: "relative",
                width: "80px",
                height: "80px"
              }}>
                <div style={{
                  position: "absolute",
                  border: "4px solid #FFD700",
                  opacity: 0.1,
                  borderRadius: "50%",
                  animation: "ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite",
                  width: "100%",
                  height: "100%"
                }}></div>
                <div style={{
                  animationDelay: "-0.5s",
                  position: "absolute",
                  border: "4px solid #FFD700",
                  opacity: 0.1,
                  borderRadius: "50%",
                  animation: "ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite",
                  width: "100%",
                  height: "100%"
                }}></div>
                <style>
                  {`
                    @keyframes ripple {
                      0% {
                        transform: scale(0);
                        opacity: 1;
                      }
                      100% {
                        transform: scale(1);
                        opacity: 0;
                      }
                    }
                  `}
                </style>
                <div style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#FFD700",
                  fontSize: "16px",
                  fontWeight: "600"
                }}>
                  Loading...
                </div>
              </div>
            </div>
          }
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              padding: "80px 0",
              background: "#0D0D0D",
              minHeight: "500px"
            }}
          >
            {selectedItem ? (
              selectedItem
            ) : (
              <div style={{
                textAlign: "center",
                maxWidth: "700px",
                margin: "0 auto",
                padding: "0 20px"
              }}>
                <img 
                  src="/api/placeholder/400/320" 
                  alt="Select a cuisine" 
                  style={{
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "30px",
                    border: "5px solid rgba(255,215,0,0.3)"
                  }}
                />
                <h2 style={{
                  fontSize: "2.5rem",
                  color: "#ffffff",
                  fontFamily: "'Playfair Display', serif",
                  marginBottom: "20px"
                }}>
                  Discover Our <span style={{ color: "#FFD700" }}>Signature</span> Dishes
                </h2>
                <p style={{
                  fontSize: "1.1rem",
                  color: "#e0e0e0",
                  lineHeight: 1.7,
                  fontFamily: "'Montserrat', sans-serif"
                }}>
                  Select a category above to explore our carefully crafted menu. Each dish is prepared with locally-sourced ingredients and passion for culinary excellence.
                </p>
              </div>
            )}
          </motion.div>
        </Suspense>
      </div>

      {/* CSS for animations and transitions */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            font-family: 'Montserrat', sans-serif;
            background-color: #0D0D0D;
            color: #ffffff;
          }
          
          .parallax-bg {
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
          
          @media (max-width: 768px) {
            .parallax-bg {
              background-attachment: scroll;
            }
          }
        `}
      </style>
    </>
  );
};

export default CuisineCategories;