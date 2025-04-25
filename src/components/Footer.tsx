import { HeartIcon } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <a 
            href="#home" 
            className="text-3xl font-bold mb-6"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Samuel<span className="text-secondary">.</span>
          </a>
          
          <div className="flex gap-8 mb-8">
            <a 
              href="https://www.behance.net/samuxka#" 
              className="text-white/80 hover:text-secondary transition-colors duration-300"
              aria-label="Behance"
            >
              Behance
            </a>
            <a 
              href="https://dribbble.com/samuxka" 
              className="text-white/80 hover:text-secondary transition-colors duration-300"
              aria-label="Dribbble"
            >
              Dribbble
            </a>
            <a 
              href="https://linkedin.com/in/samuxka" 
              className="text-white/80 hover:text-secondary transition-colors duration-300"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a 
              href="https://instagram.com/samukajj" 
              className="text-white/80 hover:text-secondary transition-colors duration-300"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
          
          <div className="w-24 h-0.5 bg-white/20 mb-8"></div>
          
          <p className="text-white/60 text-center flex items-center gap-2">
            Designed with <HeartIcon size={16} className="text-secondary" /> by Samuel Oliveira © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;