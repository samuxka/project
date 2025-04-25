import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    
    const handleMouseDown = () => {
      setClicked(true);
    };
    
    const handleMouseUp = () => {
      setClicked(false);
    };
    
    const handleMouseEnterLink = () => {
      setLinkHovered(true);
    };
    
    const handleMouseLeaveLink = () => {
      setLinkHovered(false);
    };
    
    const handleMouseLeave = () => {
      setHidden(true);
    };
    
    const handleMouseEnter = () => {
      setHidden(false);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Add event listeners to all links and buttons
    const links = document.querySelectorAll('a, button, .project-card, input, textarea');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnterLink);
      link.addEventListener('mouseleave', handleMouseLeaveLink);
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnterLink);
        link.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
    };
  }, []);
  
  // Apply cursor position with spring animation effect
  useEffect(() => {
    if (cursorRef.current) {
      const smoothing = 0.12; // Adjust for more or less smoothing
      let currentX = position.x;
      let currentY = position.y;
      
      const animate = () => {
        if (cursorRef.current) {
          const dx = position.x - currentX;
          const dy = position.y - currentY;
          
          currentX += dx * smoothing;
          currentY += dy * smoothing;
          
          cursorRef.current.style.transform = `translate(${currentX - 12}px, ${currentY - 12}px)`;
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  }, [position]);
  
  useEffect(() => {
    // Add event listeners for all links and buttons after initial render
    const updateLinkListeners = () => {
      const links = document.querySelectorAll('a, button, .project-card, input, textarea');
      
      const handleMouseEnterLink = () => setLinkHovered(true);
      const handleMouseLeaveLink = () => setLinkHovered(false);
      
      links.forEach(link => {
        link.addEventListener('mouseenter', handleMouseEnterLink);
        link.addEventListener('mouseleave', handleMouseLeaveLink);
      });
      
      return () => {
        links.forEach(link => {
          link.removeEventListener('mouseenter', handleMouseEnterLink);
          link.removeEventListener('mouseleave', handleMouseLeaveLink);
        });
      };
    };
    
    const cleanup = updateLinkListeners();
    
    // Set up a mutation observer to detect DOM changes
    const observer = new MutationObserver(updateLinkListeners);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    return () => {
      cleanup();
      observer.disconnect();
    };
  }, []);
  
  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);
  
  return (
    <>
      <div 
        ref={cursorRef}
        className={`custom-cursor ${clicked ? 'scale-75' : ''} ${linkHovered ? 'scale-150' : ''} ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          backgroundColor: linkHovered ? 'var(--secondary)' : 'var(--primary)' 
        }}
      ></div>
      <div 
        ref={cursorDotRef}
        className={`cursor-dot ${clicked ? 'opacity-0' : ''} ${linkHovered ? 'opacity-0' : 'opacity-100'} ${hidden ? 'opacity-0' : ''}`}
      ></div>
    </>
  );
};

export default CustomCursor;