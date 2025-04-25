import { useState, useEffect, useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import ProjectModal from './ProjectModal';
import { ExternalLink } from 'lucide-react';

// Project types
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

const projects: Project[] = [
  {
    id: 1,
    title: "Blend Store",
    category: "Branding",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/d09d73196644387.6628288458788.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/d09d73196644387.6628288458788.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/f7506f196644387.6628288458e9d.jpg",
      "https://i.imgur.com/14X0fyz.png"
    ],
    description: "Eu fiz completamente a criação do visual e da loja online Blend Store",
    clientName: "Blend Store.",
    technologies: ["CorelDraw", "Photoshop", "NuvemShop"],
    year: "2024",
    link: "https://www.behance.net/gallery/196644387/Briefing-Blend-store"
  },
  {
    id: 2,
    title: "Rebranding Kmk Modas",
    category: "Branding",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/7c5dbc197400155.662fe79f8f984.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/7c5dbc197400155.662fe79f8f984.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/398acf197400155.662fe79f8e9cf.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/3d5c26197400155.662fe79f8c6a4.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/55ebb9197400155.662fe79f8d97c.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/9be68f197400155.662fe79f8e1b8.jpg"
    ],
    description: "Eu fiz o rebranding da loja de roupas kmk modas, fazendo toda parte de logotipo, fachada e etc",
    clientName: "Kmk Modas",
    technologies: ["Photoshop"],
    year: "2024",
    link: "https://www.behance.net/gallery/197400155/Brienfing-KMK-modas"
  },
  {
    id: 3,
    title: "Murilo Moura",
    category: "Branding",
    thumbnail: "https://i.imgur.com/W2l5DxM.png",
    images: [
      "https://i.imgur.com/W2l5DxM.png",
      "https://i.imgur.com/O8OGwtv.png",
    ],
    description: "Criei toda parte visual para o fitoterapeuta Murilo Moura",
    clientName: "Murilo Moura",
    technologies: ["Photoshop", "CorelDraw"],
    year: "2024",
    link: "https://www.behance.net/gallery/195096339/Murilo-Logo"
  },
  // {
  //   id: 4,
  //   title: "Packaging Design Collection",
  //   category: "Packaging",
  //   thumbnail: "https://images.pexels.com/photos/4397820/pexels-photo-4397820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   images: [
  //     "https://images.pexels.com/photos/4397820/pexels-photo-4397820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     "https://images.pexels.com/photos/5946068/pexels-photo-5946068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  //   ],
  //   description: "A sustainable packaging design collection for an organic skincare brand. The project focused on eco-friendly materials, minimalist design, and brand storytelling through packaging.",
  //   clientName: "Pure Organic",
  //   technologies: ["Illustrator", "Photoshop", "Dimension"],
  //   year: "2022"
  // },
  // {
  //   id: 5,
  //   title: "Mobile App UI Design",
  //   category: "UI/UX",
  //   thumbnail: "https://images.pexels.com/photos/3194519/pexels-photo-3194519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   images: [
  //     "https://images.pexels.com/photos/3194519/pexels-photo-3194519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     "https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  //   ],
  //   description: "A comprehensive UI design for a fitness tracking mobile application. The project included user research, wireframing, prototyping, and final UI design with a focus on usability and visual appeal.",
  //   clientName: "FitTrack",
  //   technologies: ["Figma", "Sketch", "After Effects"],
  //   year: "2023",
  //   link: "https://example.com/project5"
  // },
  // {
  //   id: 6,
  //   title: "Annual Report Design",
  //   category: "Print",
  //   thumbnail: "https://images.pexels.com/photos/3182752/pexels-photo-3182752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   images: [
  //     "https://images.pexels.com/photos/3182752/pexels-photo-3182752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  //   ],
  //   description: "A visually compelling annual report design for a financial institution. The project involved data visualization, corporate photography direction, and premium print production.",
  //   clientName: "Global Finance",
  //   technologies: ["InDesign", "Illustrator", "Excel"],
  //   year: "2022"
  // }
];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { observeElements } = useScrollAnimation();
  
  // Get unique categories
  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
  
  // Filter projects based on category
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  useEffect(() => {
    if (sectionRef.current) {
      const elementsToAnimate = sectionRef.current.querySelectorAll('.scroll-watch');
      observeElements(elementsToAnimate);
    }
  }, [observeElements, filter]);
  
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 scroll-watch fade-in">
            My <span className="text-secondary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto scroll-watch fade-in delay-100"></div>
          <p className="text-muted max-w-2xl mx-auto mt-6 scroll-watch fade-in delay-200">
            Explore my latest work across various design disciplines. Each project represents 
            a unique challenge and creative solution.
          </p>
        </div>
        
        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 scroll-watch fade-in delay-300">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                filter === category 
                  ? 'bg-secondary text-white' 
                  : 'bg-light text-primary hover:bg-secondary/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card scroll-watch fade-in"
              style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
            >
              <div className="project-card-image aspect-[4/3]">
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="project-card-overlay">
                  <button 
                    onClick={() => openModal(project)}
                    className="btn btn-primary"
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="p-6">
                <span className="text-sm text-secondary font-medium">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-3">
                  {project.title}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted">{project.year}</span>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-secondary/80 transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </section>
  );
};

export default Projects;