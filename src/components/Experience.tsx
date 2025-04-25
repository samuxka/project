import { useEffect, useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { Calendar, Building, Award } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education';
}

const experienceItems: ExperienceItem[] = [
  {
    title: "Designer Gráfico e Programador",
    company: "Blend Store",
    period: "2024 - 2024",
    description: "Criei a logo e o site do e-commerce Blend Store, também fiz outros serviços para a mesma pessoa como criação de anúncios",
    type: "work"
  },
  {
    title: "Designer Gráfico",
    company: "Murilo Moura",
    period: "2024 - 2024",
    description: "Fiz todo serviço de design para um fitoterapeuta, criei logo, site e outras coisas",
    type: "work"
  },
  {
    title: "Designer Gráfico",
    company: "KMK Modas",
    period: "2024 - 2024",
    description: "Fiz o rebrand da loja kmk modas, criei a logo, fachada entre outros serviços",
    type: "education"
  },
  {
    title: "Designer Gráfico",
    company: "Espetinho Expresso",
    period: "2023 - 2023",
    description: "Trabalhei na área de marketing desse estabelecimento, no tempo que trabalhei lá criava os posts para o instagram, stories e etc",
    type: "work"
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { observeElements } = useScrollAnimation();
  
  useEffect(() => {
    if (sectionRef.current) {
      const elementsToAnimate = sectionRef.current.querySelectorAll('.scroll-watch');
      observeElements(elementsToAnimate);
    }
  }, [observeElements]);
  
  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 scroll-watch fade-in">
            Experience & <span className="text-secondary">Education</span>
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto scroll-watch fade-in delay-100"></div>
          <p className="text-muted max-w-2xl mx-auto mt-6 scroll-watch fade-in delay-200">
            My professional journey and educational background that have shaped my design expertise.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-light transform md:translate-x-px"></div>
          
          <div className="relative">
            {experienceItems.map((item, index) => (
              <div 
                key={index}
                className={`mb-12 scroll-watch ${index % 2 === 0 ? 'md:pr-16 md:text-right md:self-end md:slide-in-left' : 'md:pl-16 md:self-start md:slide-in-right'} ${
                  index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:ml-0 md:mr-auto'
                }`}
              >
                <div className={`flex items-start gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline bullet point */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-secondary rounded-full border-4 border-white"></div>
                  
                  {/* Mobile timeline bullet */}
                  <div className="flex md:hidden shrink-0 w-12 h-12 bg-light rounded-full items-center justify-center">
                    {item.type === 'work' ? (
                      <Building className="text-secondary" size={20} />
                    ) : (
                      <Award className="text-secondary" size={20} />
                    )}
                  </div>
                  
                  {/* Content card */}
                  <div className={`bg-light rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                    index % 2 === 0 ? 'md:text-right' : ''
                  } md:max-w-lg w-full`}>
                    <div className="flex items-center gap-2 mb-2 text-sm text-secondary font-medium">
                      <Calendar size={16} />
                      <span>{item.period}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-primary/80 font-medium mb-3">{item.company}</p>
                    <p className="text-muted">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;