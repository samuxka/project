import { useEffect, useRef, useState } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  images: string[];
  description: string;
  clientName: string;
  technologies: string[];
  year: string;
  link?: string;
}

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      setCurrentImageIndex(0);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };
  
  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div 
        ref={modalRef}
        className="modal-content relative bg-white rounded-xl shadow-xl max-w-4xl"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 text-primary hover:text-secondary transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        
        {/* Project Image Gallery */}
        <div className="relative aspect-[16/9] w-full">
          <img 
            src={project.images[currentImageIndex]} 
            alt={`${project.title} - image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover rounded-t-xl"
          />
          
          {project.images.length > 1 && (
            <>
              <button 
                onClick={prevImage} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {project.images.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  ></button>
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Project Details */}
        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-sm text-secondary font-medium">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold mt-1">{project.title}</h3>
            </div>
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors"
              >
                Visit Project <ExternalLink size={18} />
              </a>
            )}
          </div>
          
          <p className="text-muted mb-8">{project.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-2">Client</h4>
              <p className="text-muted">{project.clientName}</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Year</h4>
              <p className="text-muted">{project.year}</p>
            </div>
            <div className="md:col-span-2">
              <h4 className="font-bold mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="bg-light px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;