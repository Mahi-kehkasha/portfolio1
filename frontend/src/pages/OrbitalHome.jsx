import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import OrbitalSystem from '../components/3d/OrbitalSystem';
import Navigation from '../components/overlay/Navigation';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { personalInfo, services, projects, skills, workExperience, testimonials, currentProject } from '../mock';
import { ArrowRight, Send, Mail, Phone, Code, TrendingUp, Share2, Target, Palette, Server, Briefcase, MapPin, Calendar, X, ChevronUp, Quote } from 'lucide-react';

const iconMap = { Code, TrendingUp, Share2, Target, Palette, Server };

const OrbitalHome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const locationRef = useRef(null);
  const ctaRef = useRef(null);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal state for "Get in Touch"
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Show "Go to Top" button state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
        setFormData({ name: '', email: '', message: '' }); // Reset form
        // Close modal if open
        if (isModalOpen) {
          setTimeout(() => setIsModalOpen(false), 2000);
        }
      } else {
        setFormStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setFormStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll listener for "Go to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Elegant fade-in animation
    const tl = gsap.timeline({ delay: 0.8 });
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo(locationRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(ctaRef.current.children,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' },
      '-=0.3'
    );
  }, []);

  return (
    <div className="relative w-full bg-[#0B0B1A]">
      {/* Fixed 3D Orbital System Background */}
      <OrbitalSystem />
      
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Scrollable Content Sections */}
      <div className="relative z-10">
        {/* SECTION 1: HERO - Orbital View */}
        <section 
          id="hero" 
          className="min-h-screen flex items-center justify-center px-6 relative"
        >
          <div className="text-center max-w-4xl relative z-20">
            <h1 
              ref={titleRef}
              className="orbital-title text-7xl md:text-8xl lg:text-9xl font-extrabold mb-4 opacity-0"
              style={{
                fontFamily: 'Outfit, sans-serif',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #C6B6FF 50%, #9D7BFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Maheen Kehkasha
            </h1>

            <p 
              ref={subtitleRef}
              className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-300 mb-6 opacity-0"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.01em' }}
            >
              {personalInfo.title}
            </p>

            <p 
              ref={locationRef}
              className="text-lg text-gray-500 mb-12 opacity-0"
            >
              {personalInfo.location} • {personalInfo.experience}
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Explore
                <ArrowRight size={22} />
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-10 py-4 border-2 border-purple-500 text-purple-400 rounded-lg font-semibold text-lg hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Get in Touch
                <Send size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: ABOUT */}
        <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-4xl">
            <h2 
              className="text-5xl md:text-6xl font-bold mb-8 text-white"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
            >
              About
            </h2>
            
            <div className="orbital-panel p-10 md:p-12">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-10">
                {personalInfo.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="orbital-panel p-6 bg-purple-500/5">
                  <div className="text-sm text-purple-400 mb-2 uppercase tracking-wide">Primary</div>
                  <div className="text-2xl font-semibold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {personalInfo.primarySkill}
                  </div>
                </div>
                <div className="orbital-panel p-6 bg-purple-500/5">
                  <div className="text-sm text-purple-400 mb-2 uppercase tracking-wide">Secondary</div>
                  <div className="text-2xl font-semibold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {personalInfo.secondarySkill}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WORK EXPERIENCE */}
        <section id="experience" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-5xl w-full">
            <h2 
              className="text-5xl md:text-6xl font-bold mb-16 text-white"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
            >
              Work Experience
            </h2>
            
            <div className="space-y-8">
              {workExperience.map((job) => (
                <div
                  key={job.id}
                  className="orbital-panel p-8 md:p-10 text-left"
                >
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {job.company}
                        </h3>
                        <div className="text-xl md:text-2xl font-semibold mb-3" style={{ color: job.color }}>
                          {job.position}
                        </div>
                      </div>
                      <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                        <span className="text-sm font-semibold text-purple-400">Current Role</span>
                      </div>
                    </div>
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-6 text-gray-400 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-purple-400" />
                        <span>{job.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-purple-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-purple-400" />
                        <a 
                          href={`https://${job.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-purple-400 transition-colors"
                        >
                          {job.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-3">
                    {job.responsibilities.map((responsibility, index) => (
                      <div key={index} className="flex gap-3 group">
                        <div className="mt-2 flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:scale-150 transition-transform"></div>
                        </div>
                        <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                          {responsibility}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: CURRENT PROJECT */}
        <section id="current-project" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-5xl w-full">
            <h2 
              className="text-5xl md:text-6xl font-bold mb-16 text-white"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
            >
              {currentProject.title}
            </h2>
            
            <div className="orbital-panel p-8 md:p-10 text-left">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {currentProject.company}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase size={18} className="text-purple-400" />
                  <a 
                    href={`https://${currentProject.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold hover:text-purple-400 transition-colors"
                    style={{ color: currentProject.color }}
                  >
                    {currentProject.website}
                  </a>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {currentProject.description}
                </p>
              </div>

              {/* Activities */}
              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-white mb-4">Key Activities:</h4>
                {currentProject.activities.map((activity, index) => (
                  <div key={index} className="flex gap-3 group">
                    <div className="mt-2 flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:scale-150 transition-transform"></div>
                    </div>
                    <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                      {activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: SERVICES */}
        <section id="services" className="min-h-[150vh] flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-7xl w-full">
            <h2 
              className="text-5xl md:text-6xl font-bold mb-16 text-white"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
            >
              Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = iconMap[service.icon === 'browser' ? 'Code' : service.icon === 'graph' ? 'TrendingUp' : service.icon === 'network' ? 'Share2' : service.icon === 'target' ? 'Target' : service.icon === 'palette' ? 'Palette' : 'Server'];
                return (
                  <div
                    key={service.id}
                    className="orbital-panel p-8 cursor-pointer group"
                  >
                    <div className="mb-6 inline-block p-4 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                      {Icon && <Icon size={36} style={{ color: service.color }} />}
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 6: PROJECTS */}
        <section id="projects" className="min-h-[150vh] flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-7xl w-full">
            <h2 
              className="text-5xl md:text-6xl font-bold mb-16 text-white"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
            >
              Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="orbital-panel p-0 group relative overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
                >
                  {/* Project Image with Premium Hover Effects */}
                  <div className="relative w-full h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    {/* Purple gradient overlay on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}60, rgba(0,0,0,0.7))`
                      }}
                    />
                    {/* Category badge */}
                    <div 
                      className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md border"
                      style={{
                        background: `${project.color}40`,
                        borderColor: `${project.color}80`,
                        color: '#fff'
                      }}
                    >
                      {project.category}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {project.name}
                    </h3>
                    
                    <div className="space-y-4 text-left mb-6">
                      <div>
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-semibold">Challenge</div>
                        <div className="text-sm text-gray-400 leading-relaxed">{project.problem}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-semibold">Approach</div>
                        <div className="text-sm text-gray-400 leading-relaxed">{project.strategy}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-semibold">Outcome</div>
                        <div className="text-sm font-medium leading-relaxed" style={{ color: project.color }}>{project.result}</div>
                      </div>
                    </div>

                    {/* Visit Website Button */}
                    <a
                      href={`https://${project.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 group/button"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      Visit Website
                      <ArrowRight size={18} className="group-hover/button:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: SKILLS */}
        <section id="skills" className="min-h-[150vh] flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-6xl w-full">
            <h2 
              className="text-5xl md:text-6xl font-bold mb-16 text-white"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
            >
              Skills
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="orbital-panel p-6 group"
                >
                  <div className="text-xl font-semibold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {skill.name}
                  </div>
                  <div className="text-4xl font-bold text-purple-400 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {skill.level}%
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    {skill.category === 'dev' ? 'Development' : 'Marketing'}
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: TESTIMONIALS */}
        <section id="testimonials" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-7xl w-full">
            <h2 
              className="text-5xl md:text-6xl font-bold mb-4 text-white"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
            >
              Client Testimonials
            </h2>
            <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
              Hear what my clients have to say about their experience working with me
            </p>
            
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>

        {/* SECTION 8: CONTACT */}
        <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-3xl w-full">
            <h2 
              className="text-5xl md:text-6xl font-bold mb-8 text-white"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
            >
              Let's Connect
            </h2>
            <p className="text-gray-400 text-xl mb-12">
              Ready to build something great together?
            </p>
            
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <a 
                href="tel:+917899275871"
                className="orbital-panel p-6 flex items-center gap-4 hover:bg-purple-500/10 transition-all duration-300 group"
              >
                <Phone size={32} className="text-purple-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-sm text-gray-500 mb-1">Phone</div>
                  <div className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                    +91 7899275871
                  </div>
                </div>
              </a>
              
              <a 
                href="mailto:connectmaheenk@gmail.com"
                className="orbital-panel p-6 flex items-center gap-4 hover:bg-purple-500/10 transition-all duration-300 group"
              >
                <Mail size={32} className="text-purple-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-sm text-gray-500 mb-1">Email</div>
                  <div className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                    connectmaheenk@gmail.com
                  </div>
                </div>
              </a>
            </div>
            
            <div className="orbital-panel p-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full orbital-panel px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all bg-transparent"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="w-full orbital-panel px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all bg-transparent"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows="5"
                  required
                  className="w-full orbital-panel px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none transition-all bg-transparent"
                />
                
                {/* Status Message */}
                {formStatus.message && (
                  <div className={`p-4 rounded-lg ${formStatus.type === 'success' ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                    <p className={`text-sm ${formStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {formStatus.message}
                    </p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={20} />
                </button>
              </form>

              <div className="mt-10 pt-10 border-t border-purple-500/20 flex flex-col sm:flex-row gap-6 justify-center">
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone size={20} className="text-purple-400" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail size={20} className="text-purple-400" />
                  <span>{personalInfo.email}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="py-8 text-center border-t border-purple-500/20">
          <p className="text-gray-500">© 2025 Maheen Kehkasha. All rights reserved.</p>
        </div>
      </div>

      {/* Contact Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="orbital-panel p-8 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Get in Touch
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className="w-full orbital-panel px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all bg-transparent"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
                className="w-full orbital-panel px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all bg-transparent"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                rows="5"
                required
                className="w-full orbital-panel px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none transition-all bg-transparent"
              />
              
              {/* Status Message */}
              {formStatus.message && (
                <div className={`p-4 rounded-lg ${formStatus.type === 'success' ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                  <p className={`text-sm ${formStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {formStatus.message}
                  </p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Go to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      {/* Scroll Indicator */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <div className="orbital-panel px-6 py-3">
          <div className="text-purple-400 text-sm font-medium">Scroll to explore</div>
        </div>
      </div>
    </div>
  );
};

export default OrbitalHome;
