import React, { useEffect, useRef, useState } from "react";

// Remove dependencies that might not be installed
// Create a simplified version without external libraries

const testimonialData = [
  {
    name: "Isabella Montenegro",
    role: "Food Critic",
    image: "/api/placeholder/150/150",
    description: "The culinary artistry displayed in each dish is nothing short of extraordinary. Every flavor is perfectly balanced and the presentation is museum-worthy.",
    rating: 5,
    featured: true,
    cuisine: "Fine Dining"
  },
  {
    name: "James Chen",
    role: "Master Chef",
    image: "/api/placeholder/150/150",
    description: "As someone who's worked in Michelin-starred kitchens, I can attest that the attention to detail and ingredient quality here rivals the world's best restaurants.",
    rating: 4.5,
    featured: false,
    cuisine: "Contemporary"
  },
  {
    name: "Sophie Laurent",
    role: "Food Blogger",
    image: "/api/placeholder/150/150",
    description: "Each bite tells a story of passion and tradition. The ambiance perfectly complements the exquisite menu, creating a truly immersive dining experience.",
    rating: 5,
    featured: false,
    cuisine: "French Fusion"
  },
  {
    name: "Miguel Rodriguez",
    role: "Culinary Influencer",
    image: "/api/placeholder/150/150",
    description: "The innovative flavor combinations and artistic presentation have made this my go-to recommendation for anyone seeking an extraordinary culinary adventure.",
    rating: 5,
    featured: false,
    cuisine: "Latin Fusion"
  },
  {
    name: "Aisha Patel",
    role: "Restaurant Reviewer",
    image: "/api/placeholder/150/150",
    description: "The chef's tasting menu was a transcendent experience that took me on a journey through textures and flavors I never imagined could exist together.",
    rating: 4.5,
    featured: false,
    cuisine: "Modern Indian"
  }
];

const GourmetTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const intervalRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // Function to render rating stars
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} style={{ color: "#FFD700" }}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half-star" style={{ color: "#FFD700" }}>★</span>);
    }
    
    return stars;
  };

  // Handle slide navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (autoplay) {
      clearInterval(intervalRef.current);
      startAutoplay();
    }
  };

  // Next slide handler
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Previous slide handler
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1
    );
  };

  // Start autoplay function
  const startAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (!isHovering) {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 5000);
  };

  // Handle mouse events
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (autoplay) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (autoplay) {
      startAutoplay();
    }
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
  };

  useEffect(() => {
    // Initialize autoplay
    if (autoplay) {
      startAutoplay();
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay]);

  return (
    <div 
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #0D0D0D, #141414)",
        color: "#ffffff",
        overflow: "hidden",
        padding: "100px 0",
        zIndex: 1,
        fontFamily: "'Arial', sans-serif"
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px"
        }}
      >
        {/* Header Section */}
        <div 
          style={{
            textAlign: "center",
            marginBottom: "80px",
            position: "relative"
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              color: "#ffffff"
            }}
          >
            <span style={{ color: "#FFD700" }}>Culinary</span> Testimonials
          </h2>
          <div
            style={{
              height: "4px",
              background: "linear-gradient(90deg, transparent, #FFD700, transparent)",
              width: "80px",
              margin: "15px auto",
              borderRadius: "2px"
            }}
          />
          <p
            style={{
              fontSize: "1.1rem",
              color: "#e0e0e0",
              maxWidth: "700px",
              margin: "20px auto 0",
              lineHeight: 1.7
            }}
          >
            Discover what our esteemed patrons have to say about their extraordinary dining experiences with us. From food critics to culinary enthusiasts, our guests celebrate our commitment to excellence.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div
          style={{
            position: "relative",
            maxWidth: "900px",
            margin: "0 auto",
            padding: "30px 0"
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Large decorative quote icon */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: "-35px",
              fontSize: "80px",
              opacity: 0.2,
              color: "#FFD700",
              zIndex: 1
            }}
          >
            "
          </div>

          {/* Testimonial Slides */}
          <div
            style={{
              position: "relative",
              height: "370px",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                padding: "20px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.05)",
                transition: "transform 0.5s ease, opacity 0.5s ease",
                opacity: 1
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  position: "relative",
                  zIndex: 2
                }}
              >
                {/* Featured badge if applicable */}
                {testimonialData[currentIndex].featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "20px",
                      background: "linear-gradient(135deg, #FFD700, #FFA500)",
                      padding: "5px 15px",
                      borderRadius: "30px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      boxShadow: "0 5px 15px rgba(255,215,0,0.3)"
                    }}
                  >
                    Featured
                  </div>
                )}

                {/* Special cuisine tag */}
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "20px",
                    background: "rgba(255,255,255,0.1)",
                    padding: "5px 15px",
                    borderRadius: "30px",
                    fontSize: "0.8rem",
                    fontWeight: "500",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  {testimonialData[currentIndex].cuisine}
                </div>

                {/* Guest image with ring effect */}
                <div
                  style={{
                    position: "relative",
                    marginBottom: "20px"
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "4px solid rgba(255,215,0,0.3)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                      position: "relative"
                    }}
                  >
                    <img
                      src={testimonialData[currentIndex].image}
                      alt={testimonialData[currentIndex].name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                </div>

                {/* Rating stars */}
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    fontSize: "1.5rem",
                    marginBottom: "15px"
                  }}
                >
                  {renderRating(testimonialData[currentIndex].rating)}
                </div>

                {/* Testimonial text with quotation marks */}
                <div
                  style={{
                    position: "relative",
                    maxWidth: "700px",
                    textAlign: "center",
                    padding: "0 30px",
                    marginBottom: "20px"
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-15px",
                      left: "0",
                      fontSize: "30px",
                      color: "rgba(255,215,0,0.3)"
                    }}
                  >
                    "
                  </div>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      lineHeight: 1.7,
                      color: "#f0f0f0",
                      fontStyle: "italic"
                    }}
                  >
                    {testimonialData[currentIndex].description}
                  </p>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-15px",
                      right: "0",
                      fontSize: "30px",
                      color: "rgba(255,215,0,0.3)"
                    }}
                  >
                    "
                  </div>
                </div>

                {/* Guest name and role */}
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    color: "#FFD700",
                    marginBottom: "5px"
                  }}
                >
                  {testimonialData[currentIndex].name}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "#e0e0e0",
                    opacity: 0.8
                  }}
                >
                  {testimonialData[currentIndex].role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "50px",
              marginTop: "40px",
              alignItems: "center"
            }}
          >
            {/* Previous button */}
            <button
              onClick={prevSlide}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                color: "#ffffff"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,215,0,0.2)";
                e.currentTarget.style.borderColor = "rgba(255,215,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              {"<"}
            </button>

            {/* Pagination Dots */}
            <div
              style={{
                display: "flex",
                gap: "10px"
              }}
            >
              {testimonialData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: index === currentIndex ? "30px" : "10px",
                    height: "10px",
                    borderRadius: "10px",
                    background: index === currentIndex ? "#FFD700" : "rgba(255,255,255,0.2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: index === currentIndex ? "0 0 10px rgba(255,215,0,0.5)" : "none"
                  }}
                ></button>
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={nextSlide}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                color: "#ffffff"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,215,0,0.2)";
                e.currentTarget.style.borderColor = "rgba(255,215,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              {">"}
            </button>
          </div>

          {/* Autoplay toggle */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px"
            }}
          >
            <button
              onClick={toggleAutoplay}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                border: "none",
                color: autoplay ? "#FFD700" : "#ffffff",
                fontSize: "0.9rem",
                cursor: "pointer",
                opacity: 0.7,
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.7; }}
            >
              <span>{autoplay ? "Pause Autoplay" : "Start Autoplay"}</span>
              {autoplay ? "⏸" : "▶"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GourmetTestimonials;