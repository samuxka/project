import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import { ArrowUpCircle } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="relative">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        {/* <section id="quote" className="py-20 bg-light">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 scroll-watch fade-in">
                Solicitar <span className="text-secondary">Orçamento</span>
              </h2>
              <div className="w-20 h-1 bg-secondary mx-auto scroll-watch fade-in delay-100"></div>
              <p className="text-muted max-w-2xl mx-auto mt-6 scroll-watch fade-in delay-200">
                Conte-me sobre seu projeto e vamos trabalhar juntos para criar algo incrível.
              </p>
            </div>
            <QuoteForm />
          </div>
        </section> */}
        <Contact />
      </main>
      <Footer />
      
      <button 
        onClick={scrollToTop} 
        className={`fixed right-8 bottom-8 z-50 p-2 bg-primary text-white rounded-full transition-all duration-300 ease-in-out ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUpCircle size={24} />
      </button>
    </div>
  );
}

export default App;