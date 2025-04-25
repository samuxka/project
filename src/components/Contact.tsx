import { useState, useEffect, useRef, FormEvent } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { Mail, Phone, MapPin, Send, Check, AlertTriangle } from 'lucide-react';
import { Icon } from "@iconify/react";

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { observeElements } = useScrollAnimation();
  
  useEffect(() => {
    if (sectionRef.current) {
      const elementsToAnimate = sectionRef.current.querySelectorAll('.scroll-watch');
      observeElements(elementsToAnimate);
    }
  }, [observeElements]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }
    
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-light"
    >
      <div className="container mx-auto px-4 md:px-6 ">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 scroll-watch fade-in">
            Get In <span className="text-secondary">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto scroll-watch fade-in delay-100"></div>
          <p className="text-muted max-w-2xl mx-auto mt-6 scroll-watch fade-in delay-200">
            Have a project in mind or want to discuss potential collaborations? 
            I'd love to hear from you!
          </p>
        </div>
        
        <div className="gap-12 flex items-center justify-center">
          {/* Contact Info */}
          <div className="lg:col-span-2 scroll-watch slide-in-left">
            <div className="bg-white p-8 rounded-lg shadow-sm h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-muted">samukactto@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-muted">+55 75 988098306 <span>(Only Whatsapp)</span></p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-muted">Torres Vedras, Portugal</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="font-semibold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://www.behance.net/samuxka#"
                    target='_blank' 
                    className="w-10 h-10 rounded-full bg-light flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors duration-300"
                    aria-label="Behance"
                  >
                    <Icon icon="fa6-brands:square-behance" width={30} color='#0055ff' />
                  </a>
                  <a 
                    href="https://dribbble.com/samuxka"
                    target='_blank' 
                    className="w-10 h-10 rounded-full bg-light flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors duration-300"
                    aria-label="Dribbble"
                  >
                    <Icon icon="icon-park-outline:dribble" width={30} color='#ffabe7' />
                  </a>
                  <a 
                    href="https://linkedin.com/in/samuxka"
                    target='_blank' 
                    className="w-10 h-10 rounded-full bg-light flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors duration-300"
                    aria-label="LinkedIn"
                    >
                    <Icon icon="logos:linkedin-icon" width={30} />
                  </a>
                  <a 
                    href="https://instagram.com/samukajj" 
                    target='_blank' 
                    className="w-10 h-10 rounded-full bg-light flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <Icon icon="skill-icons:instagram" width={30} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          {/* <div className="lg:col-span-3 scroll-watch slide-in-right">
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-sm"
            >
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    Your Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Your Email <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Project inquiry"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                  Message <span className="text-error">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-textarea resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={formStatus === 'submitting' || formStatus === 'success'}
                className={`btn ${
                  formStatus === 'success' 
                    ? 'bg-success text-white' 
                    : formStatus === 'error'
                      ? 'bg-error text-white'
                      : 'btn-primary'
                } w-full flex items-center justify-center gap-2`}
              >
                {formStatus === 'idle' && (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
                {formStatus === 'submitting' && (
                  <>
                    Sending...
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </>
                )}
                {formStatus === 'success' && (
                  <>
                    Message Sent <Check size={18} />
                  </>
                )}
                {formStatus === 'error' && (
                  <>
                    Error Sending <AlertTriangle size={18} />
                  </>
                )}
              </button>
              
              {formStatus === 'success' && (
                <p className="text-success text-center mt-4 flex items-center justify-center gap-2">
                  <Check size={16} /> Your message has been sent successfully. I'll get back to you soon!
                </p>
              )}
              
              {formStatus === 'error' && (
                <p className="text-error text-center mt-4 flex items-center justify-center gap-2">
                  <AlertTriangle size={16} /> There was an error sending your message. Please try again later.
                </p>
              )}
            </form>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Contact;