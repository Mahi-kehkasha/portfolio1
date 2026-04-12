import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SceneManager from '../components/3d/SceneManager';
import Navigation from '../components/overlay/Navigation';
import { personalInfo, services, projects, skills } from '../mock';
import { ArrowRight, Send, Mail, Phone, Code, TrendingUp, Share2, Target, Palette, Server } from 'lucide-react';

const iconMap = { Code, TrendingUp, Share2, Target, Palette, Server };

const Home3D = () => {
  const heroRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const locationRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // CINEMATIC HERO ANIMATION
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(titleLine1Ref.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(titleLine2Ref.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(locationRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(ctaRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      '-=0.4'
    );
  }, []);

  return (
    <div className="relative w-full bg-[#0B0B1A]">
      {/* Fixed 3D Canvas Background */}
      <SceneManager />
      
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Scrollable Content Sections */}
      <div className="relative z-10">
        {/* SECTION 1: HERO - PREMIUM CINEMATIC */}
        <section 
          id="hero" 
          ref={heroRef}
          className="min-h-screen flex items-center justify-center px-6 relative"
          style={{ paddingTop: '5vh', paddingBottom: '5vh' }}
        >
          <div className="text-center max-w-6xl relative z-20">
            {/* Glowing background orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="relative">
              {/* Hero Title - Line 1 */}
              <h1 
                ref={titleLine1Ref}
                className="hero-title text-6xl md:text-8xl lg:text-9xl font-bold mb-3 opacity-0"
                style={{
                  background: 'linear-gradient(135deg, #C6B6FF 0%, #9D7BFF 50%, #6C4DF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 80px rgba(108, 77, 246, 0.5)',
                  filter: 'drop-shadow(0 0 30px rgba(157, 123, 255, 0.4))'
                }}
              >
                Hi, I'm Maheen
              </h1>
              
              {/* Hero Title - Line 2 */}
              <h1 
                ref={titleLine2Ref}
                className="hero-title text-6xl md:text-8xl lg:text-9xl font-bold mb-8 opacity-0"
                style={{
                  background: 'linear-gradient(135deg, #C6B6FF 0%, #9D7BFF 50%, #6C4DF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 80px rgba(108, 77, 246, 0.5)',
                  filter: 'drop-shadow(0 0 30px rgba(157, 123, 255, 0.4))'
                }}
              >
                Kehkasha
              </h1>

              {/* Subtitle */}
              <p 
                ref={subtitleRef}
                className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 opacity-0"
                style={{
                  fontFamily: 'Clash Display, sans-serif',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.2'
                }}
              >
                {personalInfo.tagline}
              </p>

              {/* Location */}
              <p 
                ref={locationRef}
                className="text-lg md:text-xl text-gray-400 mb-12 opacity-0"
                style={{ letterSpacing: '0.02em' }}
              >
                {personalInfo.location} • {personalInfo.experience}
              </p>

              {/* CTAs */}
              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/60"
                  style={{
                    boxShadow: '0 0 40px rgba(108, 77, 246, 0.4)',
                    animation: 'pulse 3s ease-in-out infinite'
                  }}
                >
                  {/* Reflection sweep effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative flex items-center gap-3">
                    Explore Work
                    <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-10 py-5 border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40 backdrop-blur-sm"
                >
                  <span className="flex items-center gap-3">
                    Let's Connect
                    <div className="w-2 h-2 rounded-full bg-purple-400 group-hover:animate-ping" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ABOUT */}
        <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-5xl">
            <h2 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
              style={{
                fontFamily: 'Clash Display, sans-serif',
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #C6B6FF 0%, #9D7BFF 50%, #6C4DF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              About Me
            </h2>
            <div className="glass rounded-3xl p-10 md:p-16 glow-on-hover">
              <p className="text-xl md:text-3xl text-gray-300 leading-relaxed mb-10" style={{ letterSpacing: '-0.01em' }}>
                {personalInfo.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass rounded-2xl p-8 glow-on-hover">
                  <div className="text-sm text-purple-400 mb-2 uppercase tracking-wider">Primary</div>
                  <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                    {personalInfo.primarySkill}
                  </div>
                </div>
                <div className="glass rounded-2xl p-8 glow-on-hover">
                  <div className="text-sm text-purple-400 mb-2 uppercase tracking-wider">Secondary</div>
                  <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                    {personalInfo.secondarySkill}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SERVICES */}
        <section id="services" className="min-h-[150vh] flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-7xl w-full">
            <h2 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16"
              style={{
                fontFamily: 'Clash Display, sans-serif',
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #C6B6FF 0%, #9D7BFF 50%, #6C4DF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = iconMap[service.icon === 'browser' ? 'Code' : service.icon === 'graph' ? 'TrendingUp' : service.icon === 'network' ? 'Share2' : service.icon === 'target' ? 'Target' : service.icon === 'palette' ? 'Palette' : 'Server'];
                return (
                  <div
                    key={service.id}
                    className="glass rounded-3xl p-8 transition-all duration-500 hover:scale-105 glow-on-hover cursor-pointer group"
                  >
                    <div className="mb-6 inline-flex p-4 bg-purple-500/20 rounded-2xl group-hover:bg-purple-500/30 transition-colors">
                      {Icon && <Icon size={40} style={{ color: service.color }} />}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Clash Display, sans-serif', letterSpacing: '-0.02em' }}>
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

        {/* SECTION 4: PROJECTS */}
        <section id="projects" className="min-h-[150vh] flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-7xl w-full">
            <h2 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16"
              style={{
                fontFamily: 'Clash Display, sans-serif',
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #C6B6FF 0%, #9D7BFF 50%, #6C4DF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="glass rounded-3xl p-8 transition-all duration-500 hover:scale-105 glow-on-hover group"
                >
                  <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Clash Display, sans-serif', letterSpacing: '-0.02em' }}>
                    {project.name}
                  </h3>
                  <div className="text-sm text-purple-400 mb-6 uppercase tracking-wider">{project.category}</div>
                  <div className="space-y-4 mb-6 text-left">
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Problem</div>
                      <div className="text-sm text-gray-400 leading-relaxed">{project.problem}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Strategy</div>
                      <div className="text-sm text-gray-400 leading-relaxed">{project.strategy}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Result</div>
                      <div className="text-sm text-purple-300 font-semibold leading-relaxed">{project.result}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-purple-500/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-1" style={{ color: project.color, fontFamily: 'Clash Display, sans-serif' }}>
                        {project.metrics.traffic}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Traffic</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-1" style={{ color: project.color, fontFamily: 'Clash Display, sans-serif' }}>
                        {project.metrics.leads}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Leads</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-1" style={{ color: project.color, fontFamily: 'Clash Display, sans-serif' }}>
                        {project.metrics.conversion}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Conversion</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: SKILLS */}
        <section id="skills" className="min-h-[150vh] flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-6xl w-full">
            <h2 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16"
              style={{
                fontFamily: 'Clash Display, sans-serif',
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #C6B6FF 0%, #9D7BFF 50%, #6C4DF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="glass rounded-3xl p-8 transition-all duration-500 hover:scale-110 glow-on-hover group"
                >
                  <div className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                    {skill.name}
                  </div>
                  <div className="text-4xl font-bold text-purple-400 mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                    {skill.level}%
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    {skill.category === 'dev' ? 'Development' : 'Marketing'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: CONTACT */}
        <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-3xl w-full">
            <h2 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
              style={{
                fontFamily: 'Clash Display, sans-serif',
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #C6B6FF 0%, #9D7BFF 50%, #6C4DF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Let's Build & Grow Your Brand
            </h2>
            <p className="text-gray-400 text-xl mb-16 leading-relaxed">
              Ready to create something amazing together?
            </p>
            
            <div className="glass rounded-3xl p-10 glow-on-hover">
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-black/50 border border-purple-500/30 rounded-2xl px-8 py-5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-black/50 border border-purple-500/30 rounded-2xl px-8 py-5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20"
                />
                <textarea
                  placeholder="Tell me about your project..."
                  rows="5"
                  className="w-full bg-black/50 border border-purple-500/30 rounded-2xl px-8 py-5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20 resize-none"
                />
                <button
                  type="submit"
                  className="group relative w-full px-10 py-5 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/60"
                  style={{ boxShadow: '0 0 40px rgba(108, 77, 246, 0.4)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center gap-3">
                    Send Message
                    <Send size={20} />
                  </span>
                </button>
              </form>

              <div className="mt-10 pt-10 border-t border-purple-500/20 space-y-4">
                <div className="flex items-center justify-center gap-3 text-gray-400 hover:text-purple-400 transition-colors">
                  <Phone size={20} className="text-purple-400" />
                  <span className="text-lg">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-400 hover:text-purple-400 transition-colors">
                  <Mail size={20} className="text-purple-400" />
                  <span className="text-lg">{personalInfo.email}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Spacing */}
        <div className="h-20" />
      </div>

      {/* Scroll Indicator - Only visible on hero */}
      <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none opacity-60 animate-bounce">
        <div className="flex flex-col items-center gap-3">
          <div className="text-purple-400 text-sm font-medium tracking-wide">Scroll to explore</div>
          <div className="w-7 h-12 border-2 border-purple-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-4 bg-purple-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(108, 77, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 60px rgba(108, 77, 246, 0.7);
          }
        }
      `}</style>
    </div>
  );
};

export default Home3D;
