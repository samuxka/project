import { useEffect, useRef } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const About = () => {
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
      id="about"
      ref={sectionRef}
      className="py-20 bg-light"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 scroll-watch fade-in">
            About <span className="text-secondary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto scroll-watch fade-in delay-100"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 scroll-watch slide-in-left">
            <div className="relative">
              <div className="w-full aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/profile.jpg"
                  alt="Samuel Oliveira"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-lg flex items-center justify-center text-zinc-100 text-5xl">S</div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-white rounded-lg"></div>
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6 scroll-watch slide-in-right">
            <h3 className="text-2xl font-bold">
              Designer Gráfico e Artista Visual
            </h3>
            <p className="text-muted">
              Com mais de 3 anos de experiência em design gráfico, sou especialista em criar
              histórias visuais envolventes que conectam marcas com seus públicos. Minha abordagem
              combina criatividade com pensamento estratégico para entregar designs que não apenas
              sejam bonitos, mas também alcancem objetivos de negócios.
            </p>
            <p className="text-muted">
              Sou apaixonado por tipografia, teoria da cor e psicologia do design.
              Meu trabalho abrange branding, design gráfico, mídia digital e ilustração, sempre
              com foco na criação de experiências visuais coesas que gerem identificação com o público.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <h4 className="font-bold">Name:</h4>
                <p>Samuel Oliveira</p>
              </div>
              <div>
                <h4 className="font-bold">Email:</h4>
                <p>samukactto@gmail.com</p>
              </div>
              <div>
                <h4 className="font-bold">Location:</h4>
                <p>Lisbon, Portugal</p>
              </div>
              <div>
                <h4 className="font-bold">Availability:</h4>
                <p>Freelance & Full-time</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {/* <a
                href="#quote"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Request Quote
              </a> */}
              <a
                href="#contact"
                className="btn btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
