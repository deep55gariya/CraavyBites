import React from "react";
import Hero from "./Hero/Hero";
import Services from "./Services/Services";
import Testimonial from "./Testimonial/Testimonial";
// import AppStoreBanner from "./AppStoreBanner/AppStoreBanner";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";
import List from "./List/List";

const HomePage = ({ theme }) => {
  return (
    <>
      <Hero theme={theme} />
      <About />
      <List />
      <Services />
      <Testimonial />
      {/* <AppStoreBanner /> */}
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;
