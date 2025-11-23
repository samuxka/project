import { useEffect, useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface Skill {
  name: string;
  proficiency: number;
  icon: string;
}

const skills: Skill[] = [
  { name: 'Adobe Photoshop', proficiency: 55, icon: '🎨' },
  //{ name: 'Adobe Illustrator', proficiency: 60, icon: '✏️' },
  { name: 'CorelDraw', proficiency: 85, icon: '📖' },
  { name: 'Typography', proficiency: 90, icon: '🔠' },
  { name: 'Color Theory', proficiency: 95, icon: '🎭' },
  { name: 'UI/UX Design', proficiency: 85, icon: '🖥️' },
  { name: 'Branding', proficiency: 86, icon: '🏷️' },
  { name: 'Motion Graphics', proficiency: 50, icon: '🎞️' },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { observeElements } = useScrollAnimation();
  
  useEffect(() => {
    if (sectionRef.current) {
      const elementsToAnimate = sectionRef.current.querySelectorAll('.scroll-watch');
      observeElements(elementsToAnimate);
      
      // Animate skill bars after they become visible
      const skillBars = sectionRef.current.querySelectorAll('.skill-bar');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target as HTMLDivElement;
            const width = bar.dataset.width;
            setTimeout(() => {
              bar.style.width = `${width}%`;
              bar.style.opacity = '1';
            }, 200);
          }
        });
      }, { threshold: 0.1 });
      
      skillBars.forEach(bar => observer.observe(bar));
      
      return () => observer.disconnect();
    }
  }, [observeElements]);
  
  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 bg-primary text-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 scroll-watch fade-in">
            My <span className="text-secondary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto scroll-watch fade-in delay-100"></div>
          <p className="text-white/80 max-w-2xl mx-auto mt-6 scroll-watch fade-in delay-200">
            I've developed expertise in various design tools and concepts throughout my career.
            Here's a snapshot of my technical and creative capabilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="bg-primary/40 backdrop-blur-sm p-6 rounded-lg hover:shadow-lg transition-all duration-300 scroll-watch fade-in"
              style={{ transitionDelay: `${(index % 6) * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{skill.icon}</span>
                <h3 className="text-lg font-semibold">{skill.name}</h3>
              </div>
              
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="skill-bar h-full bg-secondary rounded-full opacity-0"
                  style={{ width: '0%', transition: 'width 1s ease-in-out, opacity 0.5s ease-in-out' }}
                  data-width={skill.proficiency}
                ></div>
              </div>
              
              <div className="flex justify-between mt-2 text-sm text-white/70">
                <span>Beginner</span>
                <span>Advanced</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
