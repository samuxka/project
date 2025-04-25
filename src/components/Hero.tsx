import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const typingTextRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current) return;
      
      const scrollY = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
        const parallaxValue = (scrollY - sectionTop) * 0.4;
        imageRef.current.style.transform = `translateY(${parallaxValue}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (!typingTextRef.current) return;
    
    typingTextRef.current.classList.add('animate-typing');
    
    // Animate elements sequentially
    const elements = sectionRef.current?.querySelectorAll('.animate-on-load');
    elements?.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-in');
      }, 200 + (index * 200));
    });
  }, []);
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-secondary"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-accent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            <p className="text-secondary font-semibold animate-on-load opacity-0">Hello, I am</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-on-load opacity-0">
              Samuel <span className="text-secondary">Oliveira</span>
            </h1>
            <div className="h-12 overflow-hidden">
              <h2 
                ref={typingTextRef}
                className="text-xl md:text-2xl text-muted overflow-hidden whitespace-nowrap border-r-4 border-secondary animate-on-load opacity-0"
              >
                Graphic Designer
              </h2>
            </div>
            <p className="text-lg text-muted max-w-lg animate-on-load opacity-0">
              Creating visual experiences that communicate, inspire, and engage through thoughtful design and creative solutions.
            </p>
            <div className="flex gap-4 pt-4 animate-on-load opacity-0">
              <button 
                onClick={scrollToAbout}
                className="btn btn-primary"
              >
                Explore My Work
              </button>
              <a 
                href="#quote" 
                className="btn btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Request Quote
              </a>
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="w-full md:w-1/2 relative animate-on-load opacity-0"
          >
            <div className="relative w-full aspect-square rounded-full bg-light overflow-hidden">
              <img
                src="/profile.jpg"
                alt="Samuel Oliveira"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="text-primary" size={32} />
      </button>
    </section>
  );
};

export default Hero;