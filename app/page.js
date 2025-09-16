// app/page.js
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import ProjectsShowcase from "./components/ProjectsShowcase";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ClientReviews from "./components/ClientReviews";


export default function Home() {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <Services/>
      <ProjectsShowcase/>
      <ClientReviews/>
      <ContactSection/>
      <Footer/>
      
    </div>
  )
}