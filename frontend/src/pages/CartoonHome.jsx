import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CartoonSceneManager from '../components/3d/CartoonSceneManager';
import Navigation from '../components/overlay/Navigation';
import { personalInfo, services, projects, skills } from '../mock';
import { ArrowRight, Send, Mail, Phone, Code, TrendingUp, Share2, Target, Palette, Server, Heart, Star, Sparkles } from 'lucide-react';

const iconMap = { Code, TrendingUp, Share2, Target, Palette, Server };

const CartoonHome = () => {
  const heroRef = useRef(null);
  const greetingRef = useRef(null);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const wavingHandRef = useRef(null);

  useEffect(() => {
    // PLAYFUL ENTRANCE ANIMATION
    const tl = gsap.timeline({ delay: 0.3 });
    
    // Greeting with bounce
    tl.fromTo(greetingRef.current,
      { opacity: 0, y: -50, scale: 0.5 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )
    // Name with bounce
    .fromTo(nameRef.current,
      { opacity: 0, x: -100, rotation: -10 },
      { opacity: 1, x: 0, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
      '-=0.3'
    )
    // Tagline
    .fromTo(taglineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    // CTAs with stagger
    .fromTo(ctaRef.current.children,
      { opacity: 0, scale: 0, rotation: 180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.7)' },
      '-=0.2'
    );

    // Waving hand animation
    gsap.to(wavingHandRef.current, {
      rotation: 20,
      duration: 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <div className="relative w-full" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 50%, #dfe6e9 100%)' }}>
      {/* Fixed 3D Canvas Background */}
      <CartoonSceneManager />
      
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Scrollable Content Sections */}
      <div className="relative z-10">
        {/* SECTION 1: HERO - Friendly Greeting */}
        <section 
          id="hero" 
          ref={heroRef}
          className="min-h-screen flex items-center justify-center px-6 relative"
        >
          <div className="text-center max-w-5xl relative z-20">
            {/* Greeting */}
            <div 
              ref={greetingRef}
              className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full border-4 border-purple-300 shadow-xl mb-6 opacity-0"
            >
              <span className="text-5xl" ref={wavingHandRef}>👋</span>
              <span className="text-3xl font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: '#6c5ce7' }}>
                Hey, I'm
              </span>
            </div>

            {/* Name */}
            <h1 
              ref={nameRef}
              className="hero-title text-7xl md:text-9xl font-extrabold mb-6 opacity-0"
              style={{
                fontFamily: 'Poppins, sans-serif',
                background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 50%, #fd79a8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 4px 12px rgba(108, 92, 231, 0.3))'
              }}
            >
              Maheen!
            </h1>

            {/* Tagline */}
            <div 
              ref={taglineRef}
              className="cartoon-card inline-block px-10 py-6 mb-10 opacity-0"
            >
              <p className="text-2xl md:text-4xl font-bold text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                ✨ I Build Websites & Grow Brands ✨
              </p>
              <p className="text-lg text-gray-600 mt-3">
                {personalInfo.location} • Digital Marketing + MERN Stack
              </p>
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-3 pulse-glow"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Star className="group-hover:rotate-180 transition-transform duration-500" size={24} />
                See My Work
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
              </button>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white border-4 border-purple-400 text-purple-600 rounded-full font-bold text-xl shadow-xl hover:bg-purple-50 transition-all duration-300 flex items-center gap-3"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Heart className="text-pink-500" size={24} />
                Let's Connect
              </button>
            </div>

            {/* Floating decorations */}
            <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">💜</div>
            <div className="absolute top-20 right-20 text-6xl opacity-20 float-animation">✨</div>
            <div className="absolute bottom-10 left-20 text-6xl opacity-20 float-animation" style={{ animationDelay: '1s' }}>🎨</div>
          </div>
        </section>

        {/* SECTION 2: ABOUT */}
        <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-5xl">
            <div className="inline-flex items-center gap-3 mb-8 bounce-enter">
              <Sparkles className="text-yellow-500" size={40} />
              <h2 
                className="text-5xl md:text-7xl font-extrabold"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  background: 'linear-gradient(135deg, #6c5ce7, #fd79a8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                About Me
              </h2>
              <Sparkles className="text-yellow-500" size={40} />
            </div>
            
            <div className="cartoon-card p-12 max-w-3xl mx-auto">
              <p className="text-2xl text-gray-700 leading-relaxed mb-8" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {personalInfo.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="cartoon-card p-8 bg-gradient-to-br from-purple-100 to-purple-50">
                  <div className="text-sm text-purple-600 mb-2 font-bold uppercase">🎯 Primary Superpower</div>
                  <div className="text-2xl font-bold text-purple-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {personalInfo.primarySkill}
                  </div>
                </div>
                <div className="cartoon-card p-8 bg-gradient-to-br from-pink-100 to-pink-50">
                  <div className="text-sm text-pink-600 mb-2 font-bold uppercase">💻 Secondary Superpower</div>
                  <div className="text-2xl font-bold text-pink-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
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
              className="text-5xl md:text-7xl font-extrabold mb-4"
              style={{
                fontFamily: 'Poppins, sans-serif',
                background: 'linear-gradient(135deg, #55efc4, #00b894)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              What I Do 🚀
            </h2>
            <p className="text-xl text-gray-600 mb-16">Fun things I create for awesome people!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon === 'browser' ? 'Code' : service.icon === 'graph' ? 'TrendingUp' : service.icon === 'network' ? 'Share2' : service.icon === 'target' ? 'Target' : service.icon === 'palette' ? 'Palette' : 'Server'];
                const bgColors = [
                  'from-blue-100 to-blue-50',
                  'from-green-100 to-green-50',
                  'from-purple-100 to-purple-50',
                  'from-pink-100 to-pink-50',
                  'from-yellow-100 to-yellow-50',
                  'from-indigo-100 to-indigo-50'
                ];
                
                return (
                  <div
                    key={service.id}
                    className={`cartoon-card p-8 bg-gradient-to-br ${bgColors[index % 6]} group cursor-pointer`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="mb-6 inline-flex p-5 bg-white rounded-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {Icon && <Icon size={48} style={{ color: service.color }} />}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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
              className="text-5xl md:text-7xl font-extrabold mb-4"
              style={{
                fontFamily: 'Poppins, sans-serif',
                background: 'linear-gradient(135deg, #74b9ff, #0984e3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              My Adventures 🎨
            </h2>
            <p className="text-xl text-gray-600 mb-16">Projects I'm proud of!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="cartoon-card p-8 group"
                  style={{ 
                    background: `linear-gradient(135deg, ${project.color}20, ${project.color}10)`,
                    animationDelay: `${index * 0.15}s`
                  }}
                >
                  <h3 className="text-3xl font-bold mb-2 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {project.name} ✨
                  </h3>
                  <div className="text-sm font-bold mb-6" style={{ color: project.color }}>
                    {project.category}
                  </div>
                  
                  <div className="space-y-4 text-left">
                    <div className="cartoon-card p-4 bg-white/50">
                      <div className="text-xs font-bold text-gray-600 mb-1">🎯 Challenge</div>
                      <div className="text-sm text-gray-700">{project.problem}</div>
                    </div>
                    <div className="cartoon-card p-4 bg-white/50">
                      <div className="text-xs font-bold text-gray-600 mb-1">💡 Solution</div>
                      <div className="text-sm text-gray-700">{project.strategy}</div>
                    </div>
                    <div className="cartoon-card p-4 bg-white/50">
                      <div className="text-xs font-bold text-gray-600 mb-1">🎉 Result</div>
                      <div className="text-sm font-semibold" style={{ color: project.color }}>{project.result}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="cartoon-card p-4 bg-white/70 text-center">
                      <div className="text-3xl font-bold" style={{ color: project.color, fontFamily: 'Poppins, sans-serif' }}>
                        {project.metrics.traffic}
                      </div>
                      <div className="text-xs text-gray-600">Traffic</div>
                    </div>
                    <div className="cartoon-card p-4 bg-white/70 text-center">
                      <div className="text-3xl font-bold" style={{ color: project.color, fontFamily: 'Poppins, sans-serif' }}>
                        {project.metrics.leads}
                      </div>
                      <div className="text-xs text-gray-600">Leads</div>
                    </div>
                    <div className="cartoon-card p-4 bg-white/70 text-center">
                      <div className="text-3xl font-bold" style={{ color: project.color, fontFamily: 'Poppins, sans-serif' }}>
                        {project.metrics.conversion}
                      </div>
                      <div className="text-xs text-gray-600">Success</div>
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
              className="text-5xl md:text-7xl font-extrabold mb-4"
              style={{
                fontFamily: 'Poppins, sans-serif',
                background: 'linear-gradient(135deg, #ff6b9d, #c44569)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              My Superpowers 💪
            </h2>
            <p className="text-xl text-gray-600 mb-16">Skills I've mastered!</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="cartoon-card p-6 bg-gradient-to-br from-white to-purple-50 group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {skill.name}
                  </div>
                  <div className="text-5xl font-extrabold text-purple-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {skill.level}%
                  </div>
                  <div className="text-xs text-gray-600 uppercase font-bold">
                    {skill.category === 'dev' ? '💻 Dev' : '📈 Marketing'}
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
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
              className="text-5xl md:text-7xl font-extrabold mb-6"
              style={{
                fontFamily: 'Poppins, sans-serif',
                background: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Let's Create Magic! ✨
            </h2>
            <p className="text-2xl text-gray-700 mb-12" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Ready to build something amazing together? 🚀
            </p>
            
            <div className="cartoon-card p-10 bg-gradient-to-br from-purple-50 to-pink-50">
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name 😊"
                  className="w-full cartoon-card px-8 py-5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all"
                  style={{ fontFamily: 'Nunito, sans-serif', fontSize: '18px' }}
                />
                <input
                  type="email"
                  placeholder="Your Email 📧"
                  className="w-full cartoon-card px-8 py-5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all"
                  style={{ fontFamily: 'Nunito, sans-serif', fontSize: '18px' }}
                />
                <textarea
                  placeholder="Tell me about your dream project... 💭"
                  rows="5"
                  className="w-full cartoon-card px-8 py-5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-300 resize-none transition-all"
                  style={{ fontFamily: 'Nunito, sans-serif', fontSize: '18px' }}
                />
                <button
                  type="submit"
                  className="w-full px-10 py-6 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 pulse-glow flex items-center justify-center gap-3"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <Send size={24} />
                  Send Message
                  <Heart className="text-yellow-300" size={24} />
                </button>
              </form>

              <div className="mt-10 pt-10 border-t-4 border-purple-200 space-y-4">
                <div className="cartoon-card inline-flex items-center gap-3 px-6 py-4 bg-white">
                  <Phone size={24} className="text-purple-500" />
                  <span className="text-lg font-semibold text-gray-700">{personalInfo.phone}</span>
                </div>
                <div className="cartoon-card inline-flex items-center gap-3 px-6 py-4 bg-white ml-4">
                  <Mail size={24} className="text-pink-500" />
                  <span className="text-lg font-semibold text-gray-700">{personalInfo.email}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="py-10 text-center">
          <p className="text-gray-600 text-lg">Made with 💜 by Maheen Kehkasha</p>
          <p className="text-gray-500 mt-2">Let's create something wonderful together!</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none animate-bounce">
        <div className="cartoon-card px-6 py-3 bg-white">
          <div className="text-purple-600 text-sm font-bold flex items-center gap-2">
            Scroll to explore
            <span className="text-2xl">👇</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartoonHome;
