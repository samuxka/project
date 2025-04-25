import { useCallback } from 'react';

const useScrollAnimation = () => {
  const observeElements = useCallback((elements: NodeListOf<Element>) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // Add the appropriate animation class based on what's already on the element
          if (entry.target.classList.contains('fade-in')) {
            entry.target.classList.add('visible');
          } else if (entry.target.classList.contains('slide-in-left')) {
            entry.target.classList.add('visible');
          } else if (entry.target.classList.contains('slide-in-right')) {
            entry.target.classList.add('visible');
          }
          
          // Optionally unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
  
  return { observeElements };
};

export default useScrollAnimation;